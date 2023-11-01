const Pessoa = require("../../schemas/Pessoa"); // Certifique-se de que o modelo Pessoa esteja importado corretamente
const { default_prefix } = require("../../configs/config.json");

module.exports = {
  config: {
    name: "pagar",
    aliases: ["pay"],
  },
  run: async (bot, message, args, tools) => {
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
    if (currencyType !== "coins" && currencyType !== "gems") {
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

      const currentCoins = targetData.coins || 0;
      const currentGems = targetData.gems || 0;

      // Verificar se o autor do comando tem moedas/gems suficientes
      const authorData = await Pessoa.findOne({
        user_id: message.author.id,
        guild_id: message.guild.id,
      });
      if (
        !authorData ||
        (currencyType === "coins" && authorData.coins < amount) ||
        (currencyType === "gems" && authorData.gems < amount)
      ) {
        return message.channel.send(
          "Você não tem moedas/gems suficientes para realizar essa operação."
        );
      }

      // Atualizar o campo de moedas ou gems no documento do alvo
      await Pessoa.updateOne(
        {
          user_id: target.id,
          guild_id: message.guild.id,
        },
        {
          [currencyType]:
            currencyType === "coins"
              ? currentCoins + amount
              : currentGems + amount,
        }
      );

      // Atualizar o campo de moedas ou gems no documento do autor
      await Pessoa.updateOne(
        {
          user_id: message.author.id,
          guild_id: message.guild.id,
        },
        {
          [currencyType]:
            currencyType === "coins"
              ? authorData.coins - amount
              : authorData.gems - amount,
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
