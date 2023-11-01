const Pessoa = require("../../schemas/Pessoa");
const COOLDOWN_TIME = 24 * 60 * 60 * 1000;

module.exports = {
  config: {
    name: "diaria",
    aliases: ["dia", "daily"],
  },
  run: async (bot, message, args, tools) => {
    const userId = message.author.id;
    const guildId = message.guild.id;

    // Verificar se o usuário já está registrado na guild
    Pessoa.findOne({ user_id: userId, guild_id: guildId })
      .then((result) => {
        if (!result) {
          message.reply(
            "Você não possui registro. Utilize o comando `registrar` para começar a receber recompensas diárias."
          );
        } else {
          const lastClaimedDate = result.last_claimed;
          const currentDate = new Date();

          const timeSinceLastClaimed = currentDate - lastClaimedDate;

          if (timeSinceLastClaimed >= COOLDOWN_TIME) {
            const newCoins = Math.max(Math.floor(Math.random() * 100) + 1, 20);
            const somaNewCoins = result.coins + newCoins;
            const newGems = Math.floor(Math.random() * 10) + 1;
            const somaNewGems = result.gems + newGems;

            // Atualizar os campos 'coins', 'gems' e 'last_claimed' no documento
            Pessoa.updateOne(
              { user_id: userId, guild_id: guildId },
              {
                coins: somaNewCoins,
                gems: somaNewGems,
                last_claimed: currentDate,
              }
            )
              .then(() => {
                message
                  .reply(
                    `${message.author.username} você acabou de receber **🔆 ${newCoins}** moedas sagradas e **${newGems}** gemas celestiais!`
                  )
                  .then((repliedMessage) => {
                    setTimeout(() => repliedMessage.delete(), 5000);
                    setTimeout(() => message.delete(), 5000);
                  });
              })
              .catch((error) => {
                console.error("Erro ao atualizar registro:", error);
              });
          } else {
            const remainingTime = COOLDOWN_TIME - timeSinceLastClaimed;
            const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
            const remainingMinutes = Math.floor(
              (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
            );

            message
              .reply(
                `você já coletou suas moedas sagradas hoje! Tente novamente em: ${remainingHours} horas e ${remainingMinutes} minutos.`
              )
              .then((repliedMessage) => {
                setTimeout(() => repliedMessage.delete(), 5000);
                setTimeout(() => message.delete(), 5000);
              });
          }
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar registro:", error);
      });
  },
};
