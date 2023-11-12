const { EmbedBuilder } = require("discord.js");
const { default_prefix } = require("../../configs/config.json");
const { modouso } = require("../../configs/arquivos_json/modUso.json");
const ServerConfig = require("../../schemas/serverConfig");

module.exports = {
  config: {
    name: "uso",
    aliases: ["moduso"],
  },
  run: async (bot, message, args) => {
    const guildId = message.guild.id;
    const serverConfig = await ServerConfig.findOne({ guildId });
    const prefix = serverConfig ? serverConfig.prefix : default_prefix;
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
            {
              name: "Administração",
              value: "`limpar`, `expulsar`, `enquete`",
              inline: true
            },
            { name: "ADM. Configuração", value: "`prefix`", inline: true },
            {
              name: "Modificaveis",
              value: "`frase`",
              inline: true
            },
            {
              name: "Economia",
              value: "`dia`, `pagar`, `perfil`",
              inline: true
            },
            {
              name: "Entretenimento",
              value: "`flip`, `falar`, `acao`",
              inline: true,
            },
            {
              name: "Geral",
              value: "`user`, `svinfo`, `uso`,`info`,`ajuda`",
              inline: true
            }
            
          )
          .setImage("https://data.whicdn.com/images/287575135/original.gif")
          .setFooter({
            text: `» Digite '${serverConfig.prefix}modouso <NomeComando>' para detalhes do comando! \n» Comando original Nitta`,
            iconURL: message.author.avatarURL(),
          });
        message.reply({ embeds: [embed] });
        break;
      }
      //#endregion
      //#region começo case modouso
      case "expulsar": {
        message.reply(
          `\`\`\`${prefix}${modouso.pt.administracao.expulsar}\`\`\``
        );
        break;
      }
      case "limpar": {
        message.reply(`\`\`\`${prefix}${modouso.pt.administracao.limpar}\`\`\``);
        break;
      }
      case "enquete": {
        message.reply(`\`\`\`${prefix}${modouso.pt.administracao.enquete}\`\`\``);
        break;
      }
      case "prefix": {
        message.reply(`\`\`\`${prefix}${modouso.pt.administracao.modificaveisadm.setprefix}\`\`\``);
        break;
      }
      case "perfil": {
        message.reply(`\`\`\`${prefix}${modouso.pt.economia.carteira}\`\`\``);
        break;
      }
      case "dia": {
        message.reply(`\`\`\`${prefix}${modouso.pt.economia.dia}\`\`\``);
        break;
      }
      case "pagar": {
        message.reply(`\`\`\`${prefix}${modouso.pt.economia.pagar}\`\`\``);
        break;
      }
      case "flip": {
        message.reply(`\`\`\`${prefix}${modouso.pt.entretenimento.flip}\`\`\``);
        break;
      }
      case "falar": {
        message.reply(`\`\`\`${prefix}${modouso.pt.entretenimento.falar}\`\`\``);
        break;
      }
      case "acao": {
        message.reply(`\`\`\`${prefix}${modouso.pt.entretenimento.ação}\`\`\``);
        break;
      }
      case "user": {
        message.reply(`\`\`\`${prefix}${modouso.pt.geral.user}\`\`\``);
        break;
      }
      case "svinfo": {
        message.reply(`\`\`\`${prefix}${modouso.pt.geral.svinfo}\`\`\``);
        break;
      }
      case "uso": {
        message.reply(`\`\`\`${prefix}${modouso.pt.geral.moduso}\`\`\``);
        break;
      }
      case "info": {
        message.reply(`\`\`\`${prefix}${modouso.pt.geral.info}\`\`\``);
        break;
      }
      case "ajuda": {
        message.reply(`\`\`\`${prefix}${modouso.pt.geral.ajuda}\`\`\``);
        break;
      }
      case "frase": {
        message.reply(`\`\`\`${prefix}${modouso.pt.modificaveis.frase}\`\`\``);
        break;
      }
      //#endregion
    }
  },
};
