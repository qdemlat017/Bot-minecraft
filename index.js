const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = 5000;

const config = {
  host: process.env.MC_HOST || 'nika777.aternos.me',
  port: parseInt(process.env.MC_PORT || '44016'),
  username: process.env.MC_USERNAME || '7afozli9',
  version: process.env.MC_VERSION || false,
  auth: process.env.MC_AUTH || 'offline'
};

let bot;
let isConnected = false;
let lastActivity = Date.now();
let antiAFKInterval = null;
let isReconnecting = false;

function createBot() {
  console.log(`[Bot] Connecting to ${config.host}:${config.port} as ${config.username}...`);
  
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version,
    auth: config.auth
  });

  bot.on('login', () => {
    console.log('[Bot] Successfully logged in!');
    isConnected = true;
    lastActivity = Date.now();
  });

  bot.on('spawn', () => {
    console.log('[Bot] Bot spawned in the world');
    startAntiAFK();
  });

  bot.on('error', (err) => {
    console.error('[Bot] Error:', err.message);
    isConnected = false;
    reconnect();
  });

  bot.on('kicked', (reason) => {
    console.log('[Bot] Kicked from server:', reason);
    isConnected = false;
    stopAntiAFK();
    reconnect();
  });

  bot.on('end', () => {
    console.log('[Bot] Disconnected from server');
    isConnected = false;
    stopAntiAFK();
    reconnect();
  });

  bot.on('death', () => {
    console.log('[Bot] Bot died, respawning...');
  });

  bot.on('message', (message) => {
    console.log('[Chat]', message.toString());
  });
}

function reconnect() {
  if (isReconnecting) {
    return;
  }
  isReconnecting = true;
  console.log('[Bot] Reconnecting in 20 seconds...');
  setTimeout(() => {
    isReconnecting = false;
    createBot();
  }, 20000);
}

function stopAntiAFK() {
  if (antiAFKInterval) {
    clearInterval(antiAFKInterval);
    antiAFKInterval = null;
  }
}

function startAntiAFK() {
  stopAntiAFK();
  antiAFKInterval = setInterval(() => {
    if (bot && isConnected) {
      try {
        const movements = [
          () => bot.setControlState('forward', true),
          () => bot.setControlState('back', true),
          () => bot.setControlState('left', true),
          () => bot.setControlState('right', true),
          () => bot.look(bot.entity.yaw + Math.random() - 0.5, bot.entity.pitch + Math.random() - 0.5)
        ];

        const randomMovement = movements[Math.floor(Math.random() * movements.length)];
        randomMovement();

        setTimeout(() => {
          if (bot) {
            bot.clearControlStates();
          }
        }, 500);

        lastActivity = Date.now();
      } catch (err) {
        console.error('[AntiAFK] Error:', err.message);
      }
    }
  }, 30000);
}

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    botConnected: isConnected,
    lastActivity: new Date(lastActivity).toISOString(),
    uptime: process.uptime()
  });
});

app.get('/health', (req, res) => {
  if (isConnected) {
    res.status(200).json({ status: 'healthy', connected: true });
  } else {
    res.status(503).json({ status: 'unhealthy', connected: false });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Web] Health check server running on port ${PORT}`);
  console.log(`[Web] UptimeRobot endpoint: http://your-repl-url.replit.dev/health`);
  console.log('[Config] Server:', config.host);
  console.log('[Config] Port:', config.port);
  console.log('[Config] Username:', config.username);
  console.log('[Config] Auth:', config.auth);
  console.log('');
  createBot();
});
