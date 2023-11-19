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
      name: "Junte-se ao discord de suporte.",
      type: ActivityType.Watching,
    },
    {
      name: "Me acompanhe: mrbatataz_",
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/mrbatataz_",
    },
  ];
  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status.name, { type: status.type, url: status.url });
  }, 10000);
};
