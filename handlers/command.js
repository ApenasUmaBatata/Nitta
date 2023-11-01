const { readdirSync } = require("fs");

module.exports = (bot) => {
  const load = (dir) => {
    const commands = readdirSync(`./chat_commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );

    for (const file of commands) {
      const command = require(`../chat_commands/${dir}/${file}`);
      bot.commands.set(command.config.name, command);

      if (command.config.aliases) {
        command.config.aliases.forEach((alias) => {
          bot.aliases.set(alias, command.config.name);
        });
      }

      // Adicione a descrição do comando ao bot
      bot.description.set(command.config.name, command.config.description || "Nenhuma descrição disponível.");
    }
  };

  const commandDirs = [
    "Administração",
    "Economia",
    "Entretenimento",
    "Geral",
    "Info",
    "Modificaveis"
  ];

  commandDirs.forEach((dir) => load(dir));
};
