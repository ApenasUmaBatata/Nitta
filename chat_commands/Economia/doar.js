const Pessoa = require("../../schemas/Pessoa");
const { default_prefix } = require("../../configs/config.json");

module.exports = {
  config: {
    name: "pagar",
    aliases: ["pay","doar"]
  },
  run: async (bot, message, args) => {
    if (args.length < 3) {
      return message.channel.send(`Uso correto: ${default_prefix} @membro <quantidade> [coins|gems]`);
    }
    const amount = parseInt(args[1]);
    const target = message.mentions.users.first();
    if (!target) return message.channel.send("Esse usuário não existe.");
    const currencyType = args[2].toLowerCase();

    if (isNaN(amount) || amount <= 0)
      return message.channel.send(
        "A quantidade a ser doada deve ser um número inteiro positivo."
      );
    if (currencyType !== "moedas" && currencyType !== "gemas") {
      return message.channel.send("Escolha entre doar 'coins' ou 'gems'.");
    }

    try {
      const targetData = await Pessoa.findOne({
        user_id: target.id,
        guild_id: message.guild.id,
      });
      if (!targetData)
        return message.channel.send(
          `Este usuário não existe no banco de dados.`
        );

      const currentCoins = targetData.moedas || 0;
      const currentGems = targetData.gemas || 0;
      const authorData = await Pessoa.findOne({
        user_id: message.author.id,
        guild_id: message.guild.id,
      });
      if (
        !authorData ||
        (currencyType === "moedas" && authorData.moedas < amount) ||
        (currencyType === "gemas" && authorData.gemas < amount)
      ) {
        return message.channel.send(
          "Você não tem moedas/gems suficientes para realizar essa operação."
        );
      }
      await Pessoa.updateOne(
        {
          user_id: target.id,
          guild_id: message.guild.id,
        },
        {
          [currencyType]:
            currencyType === "moedas"
              ? currentCoins + amount
              : currentGems + amount,
        }
      );
      await Pessoa.updateOne(
        {
          user_id: message.author.id,
          guild_id: message.guild.id,
        },
        {
          [currencyType]:
            currencyType === "moedas"
              ? authorData.moedas - amount
              : authorData.gemas - amount,
        }
      );

      return message.channel.send(
        `Este jogador recebeu ${amount} ${currencyType}!`
      );
    } catch (err) {
      console.error(err);
    }
  },
};
