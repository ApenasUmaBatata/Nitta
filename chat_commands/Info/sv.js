const { EmbedBuilder } = require("discord.js");
const allowedUserId = process.env.ID;


module.exports = {
  config: {
    name: "servidores",
    aliases: ["sv"],
  },
  run: async (bot, message, args) => {
    if (message.author.id !== allowedUserId) {
      return message
        .reply("Desculpe, você não tem permissão para executar este comando.")
        .then((repliedMessage) => {
          setTimeout(() => repliedMessage.delete(), 10000);
          setTimeout(() => message.delete(), 10000);
        });
    }

    const servers =
      `Estou em ${bot.guilds.cache.size} servidores \n` +
      bot.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .map((r) => r)
        .map((r, i) => `[**${i + 1}**][_membros ${r.memberCount}_] - ${r.name}`)
        .join("\n");
    let embed = new EmbedBuilder()
      .setColor("#b8860b")
      .setDescription(`${servers}`);

    message.reply({ embeds: [embed] }).then((repliedMessage) => {
      setTimeout(() => repliedMessage.delete(), 10000);
      setTimeout(() => message.delete(), 10000);
    });
  },
};
