const { MessageAttachment } = require('discord.js');
const html2image = require('node-html-to-image');
const Kuroshiro = require("kuroshiro");
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");

module.exports = {
  name: 'furigana',
  description: 'Render a furigana image from the text provided',
  aliases: ['fr', 'f'],
  usage: '<text>',
  args: true,
  async execute(message, args) {
    const text = args.join(' ');
    const kuroshiro = new Kuroshiro();
    const options = {
      mode: 'furigana',
      to: 'hiragana'
    };
    const furigana = await kuroshiro.init(new KuromojiAnalyzer())
      .then(() => kuroshiro.convert(text, options));
    const image = await html2image({
      transparent: true,
      html: `${furigana}
      <style>
      body {
        color: #dcddde; font-family: 'Arial', sans-serif; font-size: 32px;
        height: fit-content; max-width: 480px; width: fit-content;
      }
      ruby { vertical-align: baseline; line-height: 64px; }
      </style>`
    });
    const attachment = new MessageAttachment(image, 'furigana.png');

    return message.channel.send(attachment);
  }
}
