const { EmbedBuilder } = require("discord.js");
const { modouso } = require("../../configs/arquivos_json/modUso.json");
const { obterPrefixo } = require("../../configs/modulos_js/pegarPrefix");
const { verifADM } = require("../../configs/modulos_js/verifPerms");
const { confTime } = require("../../configs/modulos_js/conf")
module.exports = {
  config: {
    name: "enquete",
    aliases: ["enquete"]
  },
  run: async (bot, message, args) => {
    if (!verifADM(message)) {
      return confTime(message, "Esse comando é apenas para `Administradores`.");
    }
    if (args.length < 1) {
      const guildId = message.guild.id;
      return confTime(message,`\`\`\`${await obterPrefixo(guildId)}${modouso.pt.administracao.enquete}\`\`\``
      );
    }
    let canal = message.channel;
    let sugestao;

    if (message.mentions.channels.size > 0) {
      canal = message.mentions.channels.first();
      sugestao = args.slice(1).join(" ");
    } else {
      sugestao = args.join(" ");
    }
    if (!sugestao) {
      const guildId = message.guild.id;
      return confTime(message, `\`\`\`» Está faltando a sua frase da enquete, tente novamente! \n» ${await obterPrefixo(guildId)}${modouso.pt.administracao.enquete}\`\`\``);
    }
    if (canal) {
      let embed = new EmbedBuilder()
        .setTitle(`ENQUETE`)
        .setColor("#ff0066")
        .setDescription(`${sugestao}`)
        .setFooter({ text: `Clique em um emoji para deixar sua opinião!` })
        .setAuthor({
          name: `Comando executado por: ${message.author.username}`,
          iconURL: message.author.avatarURL(),
        });
      canal.send({ embeds: [embed] }).then(function (msg) {
        msg.react("<:CyclopsYesPillow:805298824725528586>");
        msg.react("<:CyclopsNoPillow:805298794714365952>");
      });
    } else {
      let embed = new EmbedBuilder()
        .setTitle(`ENQUETE`)
        .setColor("#ff0066")
        .setDescription(`${sugestao}`)
        .setFooter({ text: `Clique em um emoji para deixar sua opinião!` })
        .setAuthor({
          name: `Comando executado por: ${message.author.username}`,
          iconURL: message.author.avatarURL(),
        });
      message.channel.send({ embeds: [embed] }).then(function (msg) {
        msg.react("<:CyclopsYesPillow:805298824725528586>");
        msg.react("<:CyclopsNoPillow:805298794714365952>");
      });
    }
    message.delete();
  },
};
