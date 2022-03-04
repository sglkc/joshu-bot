const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'example',
  description: 'Search [Massif](https://massif.la/ja) for example sentences',
  aliases: ['ex', 'x'],
  usage: '<word>',
  args: true,
  async execute(message, args) {
    const word = args[0];
    const uri = `https://massif.la/ja/search?q=${word}&fmt=json`;
    const response = await fetch(encodeURI(uri));
    const json = await response.json();
    const list = json.results
    //  .slice(0, 50)
      .map((r, i) => {
        const text = r.highlighted_html
          .replace(/<\/*em>/g, '__')
          .replace(/____/g, '');

        return `${i + 1}) ${text}`;
      });
    let page = 1;
    const total = Math.floor(list.length / 10) || 1;
    const embed = new MessageEmbed()
      .setColor('#71d0fc')
      .setTitle(`${word} (Total: ${list.length})`)
      .setDescription(list.length ? list.slice(0, 10) : 'No results.')
      .setFooter(`Page ${page} of ${total}`);

    if (!list.length) return message.channel.send(embed);

    message.channel.stopTyping();

    const sent = await message.channel.send(embed);
    const emojis = ['⬅', '➡'];

    for (const emoji of emojis) await sent.react(emoji);

    const reactions = sent.createReactionCollector(
      (reaction) => emojis.includes(reaction.emoji.name), { time: 15000 }
    );

    reactions.on('collect', (reaction) => {
      if (reaction.emoji.name === emojis[0]) {
        page = page - 1 > 0 ? page - 1 : total;
      } else if (reaction.emoji.name === emojis[1]) {
        page = page + 1 <= total ? page + 1 : 1;
      }

      reactions.resetTimer({ time: 15000 });
      embed.setDescription(list.slice(page * 10 - 10, page * 10))
        .setFooter(`Page ${page} of ${total}`);

      sent.edit(embed);
    });

    reactions.on('end', () => {
      if (!sent.deleted) sent.reactions.removeAll();
    });
  }
}
