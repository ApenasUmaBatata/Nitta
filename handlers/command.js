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
    }
  };

  const commandDirs = [
    "Administração",
    //"Economia",
    "Entretenimento",
    "Geral",
    //"Modificaveis",
    //"DungeonsAndDragons"
  ];

  commandDirs.forEach((dir) => load(dir));
};
