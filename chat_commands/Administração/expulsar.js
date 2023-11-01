const { EmbedBuilder } = require("discord.js"); // puxando a livraria 'discord.js'
module.exports = {
  config: {
    name: "expulsar",
    aliases: [],
  },

  run: async (bot, message, args) => {
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return message.reply("Você não tem permissão para expulsar membros!");
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply(
        "Por favor, mencione um usuário válido para expulsar!"
      );
    }

    if (!member.kickable) {
      return message.reply(
        "Eu não posso expulsar esse usuário, talvez ele tenha um cargo mais alto que eu!"
      );
    }

    const reason = args.slice(1).join(" ") || "Sem motivo especificado";
    member
      .kick(reason)
      .then(() =>
        message.channel.send(
          `${member.user.tag} foi expulso do servidor! Motivo: ${reason}`
        )
      )
      .catch((error) =>
        message.reply(
          `Desculpe, ocorreu um erro ao expulsar o usuário: ${error}`
        )
      );
  },
};
