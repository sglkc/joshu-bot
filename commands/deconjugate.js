const { MessageEmbed } = require('discord.js');
const conjugator = require('jp-verbs');

module.exports = {
  name: 'deconjugate',
  description: 'Try to deconjugate a conjugated Japanese verb',
  aliases: ['de'],
  usage: '<word>',
  args: true,
  async execute(message, args) {
    const word = args[0];
    const decon = conjugator.unconjugate(word);
    const embed = new MessageEmbed()
      .setColor('#71d0fc')
      .setTitle(`_Possible_ Conjugations for ${word}`);

    decon.forEach((b, i) => {
      embed.addField(
        `${i + 1}. ${b.base}`,
        (!b.derivationSequence.derivations.length) ? 'Not a conjugated verb?' :
        `${b.derivationSequence.wordFormProgression.join(' **>** ')}\n` +
        `${b.derivationSequence.derivations.join(' **>** ')}`
      );
    });

    return message.channel.send(embed);
  }
}
