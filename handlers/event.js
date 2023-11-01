const { readdirSync } = require("fs");

module.exports = (bot) => {
  const loadEvents = (eventType) => {
    const eventFiles = readdirSync(`./events/${eventType}/`).filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const eventName = file.split(".")[0];
      const event = require(`../events/${eventType}/${file}`);

      bot.on(eventName, (...args) => event(bot, ...args));
    }
  };

  ["client", "guild"].forEach(loadEvents);
};
