module.exports = {
  config: {
    name: "flip",
    aliases: ["virar"]
  },
  run: async (bot, message) => {
    var list = ["cara", "coroa"];

    let altstatus = list[Math.floor(Math.random() * list.length)];

    message.channel.send(
      `Olá ${message.author} você jogou a moeda e caiu em: ${altstatus}`
    );
  },
};
