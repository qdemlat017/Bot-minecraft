import mineflayer from "mineflayer";

function createBot() {
  const bot = mineflayer.createBot({
    host: "IP_السيرفر_هنا", // اكتب هنا IP السيرفر
    port: 25565, // غيّرها إذا السيرفر له منفذ مختلف
    username: "Bot123", // اسم البوت (إذا السيرفر Cracked)
    version: false // يختار النسخة تلقائيًا
  });

  bot.on("spawn", () => {
    console.log("✅ البوت دخل السيرفر بنجاح!");
  });

  bot.on("kicked", (reason) => {
    console.log("⛔ تم الطرد:", reason);
  });

  bot.on("error", (err) => {
    console.log("⚠️ خطأ:", err);
  });

  bot.on("end", () => {
    console.log("🔁 إعادة الاتصال خلال 10 ثواني...");
    setTimeout(createBot, 10000);
  });
}

createBot();