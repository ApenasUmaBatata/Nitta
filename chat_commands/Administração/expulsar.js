const { EmbedBuilder } = require("discord.js");
const { modouso } = require("../../configs/arquivos_json/modUso.json");
const { obterPrefixo } = require("../../configs/modulos_js/pegarPrefix");
const { verifADM } = require("../../configs/modulos_js/verifPerms");
const { confTime } = require("../../configs/modulos_js/conf");
module.exports = {
  config: {
    name: "expulsar",
    aliases: []
  },
  run: async (bot, message, args) => {
    if (!verifADM(message)) {
      return confTime(message, "Esse comando é apenas para `Administradores`.");
    }
    if (args.length < 1) {
      const guildId = message.guild.id;
      return message.channel.send(`\`\`\`${await obterPrefixo(guildId)}${modouso.pt.administracao.expulsar}\`\`\``
      );
    }
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("Por favor, mencione um usuário válido para expulsar!");
    }

    if (!member.kickable) {
      return message.reply(
        "Eu não posso expulsar esse usuário, talvez ele tenha um cargo mais alto que eu!"
      );
    }

    const reason = args.slice(1).join(" ") || "Sem motivo especificado";
    const embed = new EmbedBuilder()
      .setAuthor({
        name: "Um usuário acaba de ser expulso.",
        iconURL: bot.user.avatarURL(),
      })
      .addFields(
        {
          name: "Usuário:",
          value: `\`${member.user.tag}\``,
          inline: true,
        },
        {
          name: "Motivo:",
          value: `\`${reason}\``,
          inline: true,
        }
      )
      .setColor("#ff0066")
      .setFooter({
        text: `» Um usuário acaba de ser expulso. \n» Comando original Nitta`,
        iconURL: message.author.avatarURL(),
      })
      .setTimestamp();
    member
      .kick(reason)
      .then(() => message.channel.send({ embeds: [embed] }))
      .catch((error) =>
        message.reply(
          `Desculpe, ocorreu um erro ao expulsar o usuário: ${error}`
        )
      );
  },
};
