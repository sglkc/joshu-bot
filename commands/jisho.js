const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'jisho',
  description: 'Search [Jisho](https://jisho.org/) for English/Japanese ' +
    'word translation and definition',
  aliases: ['j'],
  usage: '<word>',
  args: true,
  async execute(message, args) {
    const word = args[0];
    const uri = `https://jisho.org/api/v1/search/words?keyword=${word}`;
    const response = await fetch(encodeURI(uri));
    const json = await response.json();
    const list = json.data
      .map((r, i) => {
        const titles = r.japanese.map((j) => `${j.word || ''} (${j.reading})`);
        const tags = [ ...r.is_common ? ['common'] : [], ...r.jlpt, ...r.tags];
        const senses = r.senses.map((s, i) => {
          return `${i + 1}) ${s.english_definitions.join(', ')} ` +
            `| _${s.parts_of_speech.join(', ')}_` +
            ( s.tags.length ? ` | ${s.tags.join(', ')}` : '');
        });

        return {
          name: titles.join(', '),
          value: (tags.length ? `> ${tags.join(', ')}\n` : '') +
          `${senses.join('\n')}`
        };
      });
    let page = 1;
    const total = Math.floor(list.length / 3) || 1;
    const embed = new MessageEmbed()
      .setColor('#71d0fc')
      .setTitle(`${word} (Total: ${list.length})`)
      .setFooter(`Page ${page} of ${total}`);

    if (!list.length) {
      embed.setDescription('No results.');
      return message.channel.send(embed);
    }

    embed.addFields([ ...list.slice(0, 3) ]);
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
      embed.spliceFields(0, 3, list.slice(page * 3 - 3, page * 3))
        .setFooter(`Page ${page} of ${total}`);

      sent.edit(embed);
    });

    reactions.on('end', () => {
      if (!sent.deleted) sent.reactions.removeAll();
    });
  }
}
