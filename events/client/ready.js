const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

module.exports = async (bot) => {
  console.log(
    `Bot acordou em ${bot.guilds.cache.size} servidores com ${bot.channels.cache.size} canais.`
  );
  let statuses = [
    {
      name: "Re:Zero - Starting Life in Another World",
      type: ActivityType.Watching,
    },
    {
      name: "Junte-se a nós: discord.gg/rafa7XjTxS",
      type: ActivityType.Watching,
    },
    {
      name: "discord.gg/rafa7XjTxS",
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/srbatatataz",
    },
  ];
  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status.name, { type: status.type, url: status.url });
  }, 10000);
  /*let imgs = [
    "nitta/perfilNITTA/Nitta1.jpg",
    "nitta/perfilNITTA/Nitta2.jpg",
    "nitta/perfilNITTA/Nitta3.jpg"
  ];
  setInterval(function () {
    let img = imgs[Math.floor(Math.random() * imgs.length)];
    bot.user.setAvatar(img);
  }, 1200000);*/
};
