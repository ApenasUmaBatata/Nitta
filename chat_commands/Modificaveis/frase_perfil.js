const Pessoa = require("../../schemas/Pessoa");
module.exports = {
  config: {
    name: "frase",
    aliases: ["setfrase"],
  },
  run: async (bot, message, args) => {
    const userId = message.author.id;
    const guildId = message.guild.id;
    const frase = args.join(" "); // Junte todos os argumentos para formar a frase

    if (!frase) {
      return message.channel.send("Por favor, forneça uma frase para definir em seu perfil.");
    }

    try {
      const userData = await Pessoa.findOne({
        user_id: userId,
        guild_id: guildId,
      });

      if (!userData) {
        return message.channel.send(
          "Você não está registrado no banco de dados. Utilize o comando `registrar` primeiro."
        );
      }

      // Atualize a frase no documento do usuário
      await Pessoa.updateOne(
        { user_id: userId, guild_id: guildId },
        { frase: frase }
      );

      return message.channel.send(
        `Sua frase de perfil foi definida como: "${frase}"`
      );
    } catch (err) {
      console.error(err);
      return message.channel.send(
        "Ocorreu um erro ao definir a sua frase de perfil."
      );
    }
  },
};
