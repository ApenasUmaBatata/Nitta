module.exports = {
  config: {
    name: "limpar",
    aliases: ["apagar"]
  },
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.reply(
        "Você não tem permissão para apagar mensagens neste canal."
      );
    }

    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return message.reply(
        "Você precisa fornecer um número válido de mensagens para apagar."
      );
    } else if (amount < 1 || amount > 100) {
      return message.reply(
        "Você só pode apagar entre 1 e 100 mensagens de uma vez."
      );
    }

    try {
      await message.channel.bulkDelete(amount);
      message.channel.send(`Apaguei ${amount} mensagens.`).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 3000);
      });
    } catch (err) {
      console.log(err);
      message.reply("Ocorreu um erro ao apagar mensagens.");
    }
  },
};
