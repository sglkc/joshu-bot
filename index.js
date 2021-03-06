const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(
  file => file.endsWith('.js')
);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('助手ボットを走っている！');
});

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (command.args && !args.length) {
    return message.channel.send(
      `No argument provided. \`${prefix}${commandName} ${command.usage}\``
    );
  }

  try {
    message.channel.startTyping();
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
  }

  message.channel.stopTyping();
});

client.login(token);
