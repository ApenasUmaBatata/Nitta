const { EmbedBuilder } = require("discord.js");
const { ajuda } = require("../../configs/arquivos_json/ajuda.json");

module.exports = {
  config: {
    name: "ajuda",
    aliases: ["help"]
  },
  run: async (bot, message, args) => {
    const { obterPrefixo } = require("../../configs/modulos_js/pegarPrefix");
    const guildId = message.guild.id;
    switch (args[0]) {
      //#region inicioCase
      case undefined: {
        const embed = new EmbedBuilder()
          .setColor("#ff0066")
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
            text: `» Digite '${await obterPrefixo(guildId)}ajuda <NomeComando>' para informações do comando! \n» Comando original Nitta`,
            iconURL: message.author.avatarURL(),
          });
        message.reply({ embeds: [embed] });
        break;
      }
      //#endregion
      //#region começo case modouso
      case "expulsar": {
        message.reply(
          `\`\`\`${ajuda.pt.administracao.expulsar}\`\`\``
        );
        break;
      }
      case "limpar": {
        message.reply(`\`\`\`${ajuda.pt.administracao.limpar}\`\`\``);
        break;
      }
      case "enquete": {
        message.reply(`\`\`\`${ajuda.pt.administracao.enquete}\`\`\``);
        break;
      }
      case "prefix": {
        message.reply(`\`\`\`${ajuda.pt.administracao.modificaveisadm.setprefix}\`\`\``);
        break;
      }
      case "perfil": {
        message.reply(`\`\`\`${ajuda.pt.economia.carteira}\`\`\``);
        break;
      }
      case "dia": {
        message.reply(`\`\`\`${ajuda.pt.economia.dia}\`\`\``);
        break;
      }
      case "pagar": {
        message.reply(`\`\`\`${ajuda.pt.economia.pagar}\`\`\``);
        break;
      }
      case "flip": {
        message.reply(`\`\`\`${ajuda.pt.entretenimento.flip}\`\`\``);
        break;
      }
      case "falar": {
        message.reply(`\`\`\`${ajuda.pt.entretenimento.falar}\`\`\``);
        break;
      }
      case "acao": {
        message.reply(`\`\`\`${ajuda.pt.entretenimento.ação}\`\`\``);
        break;
      }
      case "user": {
        message.reply(`\`\`\`${ajuda.pt.geral.user}\`\`\``);
        break;
      }
      case "svinfo": {
        message.reply(`\`\`\`${ajuda.pt.geral.svinfo}\`\`\``);
        break;
      }
      case "uso": {
        message.reply(`\`\`\`${ajuda.pt.geral.moduso}\`\`\``);
        break;
      }
      case "info": {
        message.reply(`\`\`\`${ajuda.pt.geral.info}\`\`\``);
        break;
      }
      case "ajuda": {
        message.reply(`\`\`\`${ajuda.pt.geral.ajuda}\`\`\``);
        break;
      }
      case "frase": {
        message.reply(`\`\`\`${ajuda.pt.modificaveis.frase}\`\`\``);
        break;
      }
      //#endregion
    }
  },
};
