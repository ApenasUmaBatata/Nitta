const Pessoa = require("../../schemas/Pessoa");

module.exports = async (bot, member) => {
  const userId = member.id;
  const guildId = member.guild.id;
  const xp = 0;
  const fra = "A pessoa não deixou uma frase aqui!"

  // Verificar se o usuário já está registrado na guild
  Pessoa.findOne({ user_id: userId, guild_id: guildId })
    .then((result) => {
      if (!result) {
        // Inserir um novo registro no MongoDB
        const novaPessoa = new Pessoa({
          user_id: userId,
          guild_id: guildId,
          moedas: 0,
          gemas: 0,
          xp: xp,
          frase: fra,
          last_claimed: new Date("1970-01-01T00:00:00"),
        });

        novaPessoa
          .save()
          .then(() => {
            console.log("Usuário registrado com sucesso!");
          })
          .catch((error) => {
            console.error("Erro ao salvar novo registro:", error);
          });
      } else {
        console.log("Usuário já registrado nesta guild.");
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar registro existente:", error);
    });
};
