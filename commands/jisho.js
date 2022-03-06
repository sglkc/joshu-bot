const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { paginate } = require('../util/pagination');

module.exports = {
  name: 'jisho',
  description: 'Search [Jisho](https://jisho.org/) for English/Japanese ' +
    'word translation and definition',
  aliases: ['j'],
  usage: '<word>',
  args: true,
  async execute(message, args) {
    const word = args.join(' ');
    const uri = `https://jisho.org/api/v1/search/words?keyword=${word}`;
    const response = await fetch(encodeURI(uri));
    const json = await response.json();
    const list = json.data
      .map((r, i) => {
        const titles = r.japanese.map((j) => {
          return (j.word || '') + (j.reading ? ` (${j.reading})` : '')
        });
        const tags = [ ...r.is_common ? ['common'] : [], ...r.jlpt, ...r.tags];
        const senses = r.senses.map((s, i) => {
          return `${i + 1}) ${s.english_definitions.join(', ')} ` +
            `| _${s.parts_of_speech.join(', ')}_` +
            ( s.tags.length ? ` | ${s.tags.join(', ')}` : '');
        });
        const raw = (tags.length ? `> ${tags.join(', ')}\n` : '') +
          `${senses.join('\n')}`;
        const text = raw.slice(0, 956) +
          ` [Read more...](https://jisho.org/word/${r.japanese[0].word})`;

        return {
          name: titles.join(', '),
          value: raw.length > 1024 ? text : raw
        };
      });
    const offset = 3;
    const embed = new MessageEmbed()
      .setColor('#71d0fc')
      .setURL(encodeURI(`https://jisho.org/search/${word}`))
      .setTitle(`${word} (Total: ${list.length})`);

    if (!list.length) embed.setDescription('No results.');

    embed.addFields([ ...list.slice(0, offset) ]);

    await paginate(message, embed, list.length, offset, (embed, index) => {
      return embed.spliceFields(0, offset, list.slice(index, index + offset));
    });
  }
}
