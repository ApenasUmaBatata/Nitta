/**este registro é apenas para membros de chats em que o bot ja estava, membros que
adentraram após o evento de guildMemberAdd não precisam utilizar o comando */
//após a melhoria do messageCreate nao é mais necessário o comando de registro, a pessoa se registra ao enviar mensagem no servidor
const Pessoa = require("../../schemas/Pessoa");

module.exports = {
  config: {
    name: "registrar",
    aliases: ["registro"],
  },
  run: async (bot, message, args, tools) => {
    const userId = message.author.id;
    const guildId = message.guild.id;
    const coins = 0;
    const gems = 0;
    const xp = 0;

    Pessoa.findOne({ user_id: userId, guild_id: guildId })
      .then((result) => {
        if (!result) {
          const novaPessoa = new Pessoa({
            user_id: userId,
            guild_id: guildId,
            coins: coins,
            gems: gems,
            xp: xp,
            last_claimed: new Date("1970-01-01T00:00:00"),
          });

          novaPessoa
            .save()
            .then(() => {
              message
                .reply("Você acabou de realizar seu registro")
                .then((repliedMessage) => {
                  setTimeout(() => repliedMessage.delete(), 5000);
                  setTimeout(() => message.delete(), 5000);
                });
            })
            .catch((error) => {
              console.error("Erro ao salvar novo registro:", error);
            });
        } else {
          message
            .reply("Você já está registrada nesta guild.")
            .then((repliedMessage) => {
              setTimeout(() => repliedMessage.delete(), 5000);
              setTimeout(() => message.delete(), 5000);
            });
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar registro existente:", error);
      });
  },
};
