const { EmbedBuilder } = require("discord.js");
const { default_prefix } = require("../../configs/config.json");
const { modouso } = require("../../configs/arquivos_json/modo_uso.json");

module.exports = {
  config: {
    name: "uso",
    aliases: ["moduso"],
  },
  run: async (bot, message, args) => {
    switch (args[0]) {
      //#region inicioCase
      case undefined: {
        const embed = new EmbedBuilder()
          .setColor("#ff00c3")
          .setAuthor({
            name: "Sua ajuda chegou",
            iconURL: bot.user.avatarURL(),
          })
          .addFields(
            { name: "Administração", value: "`limpar`, `expulsar`" },
            {
              name: "Comandos gerais",
              value:
                "`ajuda`, `enquete`, `filme`, `falar`, `sorteio`, `usuario`",
            },
            {
              name: "Entretenimento",
              value: "`ação`, `calculo`, `d6`, `d20`, `jokenpo`",
            }
          )
          .setImage("https://data.whicdn.com/images/287575135/original.gif")
          .setFooter({
            text: `Digite '${default_prefix}modouso <CommandName>' para detalhes do comando!`,
            iconURL: message.author.avatarURL(),
          });
        message.reply({ embeds: [embed] });
        break;
      }
      //#endregion
      //#region começo case modouso
      case "expulsar": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.expulsar}\`\`\``);
        break;
      }
      case "limpar": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.limpar}\`\`\``);
        break;
      }
      case "ajuda": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.ajuda}\`\`\``);
        break;
      }
      case "enquete": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.enquete}\`\`\``);
        break;
      }
      case "filme": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.filme}\`\`\``);
        break;
      }
      case "falar": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.falar}\`\`\``);
        break;
      }
      case "sorteio": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.sorteio}\`\`\``);
        break;
      }
      case "usuario": {
        message.reply(`\`\`\`${default_prefix}${modouso.pt.usuario}\`\`\``);
        break;
      }
      //#endregion
    }
  },
};
