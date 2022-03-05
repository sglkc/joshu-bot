const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
  name: 'help',
  description: 'List every commands, or an information about specific command',
  aliases: ['h'],
  usage: '[command name]',
  async execute(message, args) {
    const { commands } = message.client;
    const embed = new MessageEmbed().setColor('#71d0fc');

    if (!args.length) {
      embed.setTitle('Commands');

      commands.forEach((command) => {
        embed.addField(
          command.name,
          `${command.description}\n` +
          (command.usage ? `${prefix}${command.name} ${command.usage}` : '')
        );
      });

      return message.channel.send(embed);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name)
      || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.channel.send('Invalid command!');
    }

    embed.setTitle(`${prefix}${command.name}`)
      .setDescription(command.description)
      .addField('Usage', `${prefix}${command.name} ${command.usage || ''}`);

    if (command.aliases) embed.addField('Aliases', command.aliases.join(', '));

    return message.channel.send(embed);
  }
}
