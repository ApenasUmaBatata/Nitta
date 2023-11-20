const { EmbedBuilder } = require("discord.js");
const { confTime } = require("../../configs/modulos_js/conf")

module.exports = {
  config: {
    name: "reportar",
    aliases: ["rep"],
  },
  run: async (bot, message, args) => {
    let canal = bot.channels.cache.get("1176233810979983421");
    let problema = args.join(" ");

    if (!problema) {
      return confTime(message, "Especifique o problema encontrado!");
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
    return confTime(message, { embeds: [ebd] });
  },
};
