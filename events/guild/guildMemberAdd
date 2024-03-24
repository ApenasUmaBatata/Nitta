const Pessoa = require("../../schemas/Pessoa");

module.exports = async (bot, member) => {
  if (member.user.bot) {
    console.log("Ignorando a criação de documento para bot.");
    return;
  }
  const userId = member.id;
  const guildId = member.guild.id;
  const fra = "A pessoa não deixou uma frase aqui!";

  // Verificar se o usuário já está registrado na guild
  try {
    // Verificar se o usuário já está registrado na guild
    const existingPerson = await Pessoa.findOne({
      user_id: userId,
      guild_id: guildId,
    });

    if (!existingPerson) {
      // Encontrar o número total de registros e incrementar para obter o próximo _id
      const count = await Pessoa.countDocuments({});
      const newId = count + 1;

      // Inserir um novo registro no MongoDB com o novo _id
      const novaPessoa = new Pessoa({
        _id: newId,
        user_id: userId,
        guild_id: guildId,
        moedas: 0,
        gemas: 0,
        xp: 0,
        frase: fra,
        last_claimed: new Date("1970-01-01T00:00:00"),
      });

      await novaPessoa.save();
      console.log("Usuário registrado com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao processar registro:", error);
  }
};
