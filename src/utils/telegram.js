const chalk = require('chalk');
const Telegram = require('telegram-bot-api');
const bot = new Telegram({ token: '823158626:AAFrdjYf-UFBGN5uZRmnvU3MhI5JVY89GEk' })


bot.sendMessage({
    chat_id: '-371062059',
    text: 'Hiiiiiiii :eggplant:'
}).then(
    (res) => console.log(res),
    (err) => console.log(chalk.red(`Error ${err.error_code}: ${err.description}`))
)

