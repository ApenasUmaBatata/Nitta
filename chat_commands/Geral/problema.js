const { EmbedBuilder } = require("discord.js");
module.exports = {
  config: {
    name: "reportar",
    aliases: ["rep"],
  },
  run: async (bot, message, args) => {
    let canal = bot.channels.cache.get("1176233810979983421");
    let problema = args.join(" ");

    if (!problema) {
      return message
        .reply("Especifique o problema encontrado!")
        .then((repliedMessage) => {
          setTimeout(() => repliedMessage.delete(), 5000);
          setTimeout(() => message.delete(), 5000);
        });
    }
    const ebd = new EmbedBuilder()
      .setColor("#ff0066")
      .addFields({
        name: "O seguinte problema foi reportado:",
        value: `\`${problema}\``,
      })
      .setFooter({ text: `Executado dia ` })
      .setTimestamp();
    canal.send({ embeds: [ebd] });
  },
};
