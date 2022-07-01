# <ruby>助手<rt>Joshu</rt></ruby> Bot</h1>

![Version](https://img.shields.io/github/package-json/v/sglkc/joshu-bot.svg)
![Discord.js](https://img.shields.io/badge/discord.js-v12.5.3-green.svg?logo=discord)
[![Issues](https://img.shields.io/github/issues/sglkc/joshu-bot.svg)](https://github.com/sglkc/joshu-bot/issues)
[![MIT License](https://img.shields.io/github/license/sglkc/joshu-bot.svg)](LICENSE)

A Discord bot with utilities to help with Japanese language

> Basically an inferior clone of [Kotoba Discord Bot](https://github.com/mistval/kotoba/tree/master/bot)

<a href="#commands"><strong>Commands »</strong></a>

<a href="https://github.com/sglkc/joshu-bot/issues">Report a Bug</a>
<strong>·</strong>
<a href="https://github.com/sglkc/joshu-bot/issues">Request a Feature</a>

## About The Project

It all started when I wanted to invite [Kotoba](https://github.com/mistval/kotoba/tree/master/bot) to my server, but inviting another bot will just make the server look more cluttered.
Because I already have my bot inside, I went the hard way to self-host the bot on my Raspberry Pi, until I looked at the configurations.
Well, instead of self-hosting the bot just for a small server, I finally decided to make my own clone from scratch with some basic features that I needed, which should be far more easier to maintain.
<strong>Built with [Discord.js v12](https://github.com/discordjs/discord.js/tree/v12)</strong>

## Getting Started

Follow the steps below to get the bot running on your local machine:

1. Clone the repo
  ```sh
  git clone https://github.com/sglkc/joshu-bot.git
  cd joshu-bot
  ```
2. Install npm dependencies
  ```sh
  npm install
  ```
3. Copy or rename `config.example.json` to `config.json`
4. Enter your [Discord Bot Token](https://www.writebots.com/discord-bot-token/) in `config.json` (You may also want to change the bot prefix and embed color here)
5. Run the start script or by using a daemon process manager (like [PM2](https://pm2.keymetrics.io/))
  ```sh
  npm run start
  ```

## Commands

The following are the commands currently available (more to come!) with their dependency library if you want to try it out for your own projects.

| Command Usage        | Description                                                                              | Library                            |
|----------------------|------------------------------------------------------------------------------------------|------------------------------------|
| help [command name]  | List every commands, or an information about specific command                            |                                    |
| deconjugate \<word\> | Try to deconjugate a conjugated Japanese verb                                            | [jp-verbs][jp-verbs]               |
| example \<word\>     | Search [Massif](https://massif.la/ja) for example sentences                              |                                    |
| furigana \<text\>    | Render a furigana image from the text provided                                           | [render-furigana][render-furigana] |
| jisho \<word\>       | Search [Jisho](https://jisho.org/) for English/Japanese word translation and definition  |                                    |
| okurigana \<word\>   | Add okurigana for kanji to the text provided                                             | [kuroshiro][kuroshiro]             |

## Contributing

Every contributions are **greatly appreciated**! You can start by forking this repository then create a pull request.

1. Fork the repository
2. Create your branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -m 'feat: add new command'`)
4. Push to the branch (`git push origin new-feature`)
5. Open a [pull request](https://github.com/sglkc/joshu-bot/pulls)

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

[kuroshiro]: https://github.com/hexenq/kuroshiro
[jp-verbs]: https://github.com/mistval/jp-verb-deconjugator
[render-furigana]: https://github.com/mistval/render-furigana
