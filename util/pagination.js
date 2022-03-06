module.exports = {
  async paginate(message, embed, length, offset, oncollect) {
    if (length <= offset) return message.channel.send(embed);

    let page = 1;
    const total = Math.ceil(length / offset) || 1;

    embed.setFooter(`Page ${page} of ${total}`);

    const sent = await message.channel.send(embed);
    const emojis = ['⬅', '➡'];

    for (const emoji of emojis) await sent.react(emoji);

    const reactions = sent.createReactionCollector(
      (reaction) => emojis.includes(reaction.emoji.name),
      { dispose: true, time: 30000 }
    );

    reactions.on('collect', (reaction) => {
      if (reaction.emoji.name === emojis[0]) {
        page = page - 1 > 0 ? page - 1 : total;
      } else if (reaction.emoji.name === emojis[1]) {
        page = page + 1 <= total ? page + 1 : 1;
      }

      reactions.resetTimer({ time: 30000 });
      embed = oncollect(embed, (page - 1) * offset)
        .setFooter(`Page ${page} of ${total}`);
      sent.edit(embed);
    });

    reactions.on('remove', reactions.handleCollect);
    reactions.on('end', () => {
      if (!sent.deleted) sent.reactions.removeAll();
    });
  }
}
