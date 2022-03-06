const { MessageAttachment } = require('discord.js');
const { pi } = require('../config.json');
const renderFurigana = require('render-furigana');

module.exports = {
  name: 'furigana',
  description: 'Render a furigana image from the text provided',
  aliases: ['fr', 'f'],
  usage: '<text>',
  args: true,
  async execute(message, args) {
    const text = args.join(' ');
    const kanjiFont = '32px sans-serif';
    const furiganaFont = '16px sans-serif';
    const options = {
      backgroundColor: 'transparent',
      textColor: '#dcddde',
      maxWidthInPixels: '500'
    };
    const image = await renderFurigana(text, kanjiFont, furiganaFont, options);
    const attachment = new MessageAttachment(image, 'furigana.png');

    return message.channel.send(attachment);
  }
}
