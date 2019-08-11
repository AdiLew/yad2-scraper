const Telegraf = require('telegraf');
const chalk = require('chalk');



const token = '823158626:AAFrdjYf-UFBGN5uZRmnvU3MhI5JVY89GEk'
const bot = new Telegraf(token)

bot.on('message', (ctx) => {
    const {
        message
    } = ctx.update;
    console.log('############Context#########')
    console.log(message);
    if (message.sticker) {
        ctx.reply(message.sticker.file_id)
    }
})



bot.command('/getreportnow', (ctx) => {
    console.log(ctx)
    ctx.reply('Working on it');

})

bot.hears('Love You', (ctx) => {
    console.log(chalk.red('Blaaaa'));
    ctx.reply('Love you too!')
    ctx.replyWithSticker('CAADAgADQgcAAowt_QdHeoWouiAFCBYE')
})
module.exports = bot;