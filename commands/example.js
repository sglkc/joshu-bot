const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { paginate } = require('../util/pagination');

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
      .map((r, i) => {
        const text = r.highlighted_html
          .replace(/<\/*em>/g, '**')
          .replace(/\*{4}/g, '');

        return `${i + 1}) ${text}`;
      });
    const offset = 10;
    const embed = new MessageEmbed()
      .setColor('#71d0fc')
      .setURL(encodeURI(`https://massif.la/ja/search?q=${word}`))
      .setTitle(`${word} (Total: ${list.length})`)
      .setDescription(list.length ? list.slice(0, 10) : 'No results.');

    await paginate(message, embed, list.length, offset, (embed, index) => {
      return embed.setDescription(list.slice(index, index + offset));
    });
  }
}
