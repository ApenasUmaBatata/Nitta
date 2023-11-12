const { EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
  config: {
    name: "enquete",
    aliases: ["enquete"],
  },
  run: async (bot, message, args) => {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      return message
        .reply(`Esse comando é apenas para \`Administradores\`.`)
        .then((repliedMessage) => {
          setTimeout(() => repliedMessage.delete(), 5000);
          setTimeout(() => message.delete(), 5000);
        });
    }
    if (args.length < 1) {
      const { modouso } = require("../../configs/arquivos_json/modUso.json");
      const pref = require("../../configs/modulos_js/pegarPrefix")
      const guildId = message.guild.id;
      return message.channel.send(`\`\`\`${await pref.obterPrefixo(guildId)}${modouso.pt.administracao.enquete}\`\`\``);
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
      return message
        .reply("você precisa escrever algo para enviar.")
        .then((repliedMessage) => {
          setTimeout(() => repliedMessage.delete(), 5000);
          setTimeout(() => message.delete(), 5000);
        });
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
