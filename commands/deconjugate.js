const { MessageEmbed } = require('discord.js');
const conjugator = require('jp-verbs');
const { embedColor } = require('../config.json');

module.exports = {
  name: 'deconjugate',
  description: 'Try to deconjugate a conjugated Japanese verb',
  aliases: ['de'],
  usage: '<word>',
  args: true,
  async execute(message, args) {
    const word = args[0];
    const links = conjugator.GrammarLinkForWordType;
    const decon = conjugator.unconjugate(word);
    const added = [];
    const embed = new MessageEmbed()
      .setColor(embedColor)
      .setTitle(`_Possible_ Conjugations for ${word}`);

    decon.forEach(b => {
      if (added.includes(b.base)) return;

      const forms = b.derivationSequence.wordFormProgression.join(' **>** ');
      const derivations = b.derivationSequence.derivations.map(d => {
        return `[${d}](${links[d]})`;
      });

      added.push(b.base);
      embed.addField(
        `${added.length}. ${b.base}`,
        (forms && derivations.length)
        ? `${forms}\n${derivations.join(' **>** ')}`
        : 'Not a conjugated verb?'
      );
    });

    return message.channel.send(embed);
  }
}
