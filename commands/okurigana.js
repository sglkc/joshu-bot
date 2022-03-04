const { MessageAttachment } = require('discord.js');
const Kuroshiro = require("kuroshiro");
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");

module.exports = {
  name: 'okurigana',
  description: 'Add okurigana for kanji to the text provided',
  aliases: ['ok', 'o'],
  usage: '<text>',
  args: true,
  async execute(message, args) {
    const text = args.join(' ');
    const kuroshiro = new Kuroshiro();
    const options = {
      mode: 'okurigana',
      to: 'hiragana'
    };
    const okurigana = await kuroshiro.init(new KuromojiAnalyzer())
      .then(() => kuroshiro.convert(text, options));

    return message.channel.send('> ' + okurigana);
  }
}
