const Pessoa = require("../../schemas/Pessoa");
const COOLDOWN_TIME = 24 * 60 * 60 * 1000;
const { confTime } = require("../../configs/modulos_js/conf");

module.exports = {
  config: {
    name: "diaria",
    aliases: ["dia", "daily"]
  },
  run: async (bot, message) => {
    const userId = message.author.id;
    const guildId = message.guild.id;
    Pessoa.findOne({ user_id: userId, guild_id: guildId })
      .then((result) => {
        if (!result) {
          return confTime(
            message,
            "Você não possui registro. Utilize o comando `registrar` para começar a receber recompensas diárias."
          );
        } else {
          const lastClaimedDate = result.last_claimed;
          const currentDate = new Date();
          const timeSinceLastClaimed = currentDate - lastClaimedDate;
          if (timeSinceLastClaimed >= COOLDOWN_TIME) {
            const newCoins = Math.max(Math.floor(Math.random() * 100) + 1, 20);
            const somaNewCoins = result.moedas + newCoins;
            const newGems = Math.floor(Math.random() * 10) + 1;
            const somaNewGems = result.gemas + newGems;
            Pessoa.updateOne(
              { user_id: userId, guild_id: guildId },
              {
                moedas: somaNewCoins,
                gemas: somaNewGems,
                last_claimed: currentDate,
              }
            )
              .then(() => {
                return confTime(
                  message,
                  `${message.author.username} você acabou de receber **<a:GAL_MoedasSagradas:1175868539245187072> ${newCoins}** moedas sagradas e **<a:GAL_GameCelestial:1175866704706928710> ${newGems}** gemas celestiais!`
                );
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
            return confTime(
              message,
              `Você já realizou sua coleta diária! Tente novamente em: ${remainingHours} horas e ${remainingMinutes} minutos.`
            );
          }
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar registro:", error);
      });
  },
};
