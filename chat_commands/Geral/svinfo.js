const { EmbedBuilder } = require("discord.js");
module.exports = {
  config: {
    name: "svinfo",
    aliases: ["serverinfo", "servidor"],
  },
  run: async (bot, message) => {
    let sicon = message.guild.iconURL();
    const { guild } = message;
    const serverCreatedAt = guild.createdAt.toLocaleDateString(
      guild.preferredLocale,
      {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        /*hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",*/
      }
    );
    let serverembed = new EmbedBuilder()
      .setColor("#ff0066")
      .setThumbnail(sicon)
      .addFields(
        {
          name: "Nome do servidor",
          value: `${message.guild.name}`,
          inline: true,
        },
        {
          name: "Dono",
          value: `${(await bot.users.fetch(message.guild.ownerId)).tag}`,
          inline: true,
        },
        {
          name: "Existe desde",
          value: `${serverCreatedAt}`,
          inline: true,
        },
        {
          name: "Bosters",
          value: `<a:nitroboost:878466316313456650> ${message.guild.premiumSubscriptionCount}`,
          inline: true,
        },
        {
          name: "Membros",
          value: `👥 ${message.guild.memberCount}`,
          inline: true,
        },
        {
          name: "Cargos",
          value: `${message.guild.roles.cache.size}`,
          inline: true,
        },
        {
          name: "Canais de texto",
          value: `<:chat:878466292020043776> ${message.guild.channels.cache.size}`,
          inline: true,
        }
      );

    message.reply({ embeds: [serverembed] }).then((repliedMessage) => {
      setTimeout(() => repliedMessage.delete(), 10000);
      setTimeout(() => message.delete(), 10000);
    });
  },
};
