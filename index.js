import mineflayer from "mineflayer";

const bot = mineflayer.createBot({
  host: "ip.السيرفر.هنا", // اكتب هنا IP السيرفر
  port: 25565, // غيّر المنفذ إذا السيرفر غير الافتراضي
  username: "Bot123", // اسم البوت (إذا السيرفر Cracked)
  version: false // اتركه false ليختار النسخة تلقائيًا
});

// عند الاتصال الناجح
bot.on("spawn", () => {
  console.log("✅ تم تسجيل الدخول بنجاح!");
});

// عند الطرد أو الخطأ
bot.on("end", () => {
  console.log("❌ تم الطرد! إعادة الاتصال خلال 10 ثواني...");
  setTimeout(() => {
    process.exit(); // يُعيد التشغيل (يشتغل تلقائيًا عند نشره)
  }, 10000);
});

bot.on("kicked", (reason) => console.log("⛔ طُرد:", reason));
bot.on("error", (err) => console.log("⚠️ خطأ:", err));