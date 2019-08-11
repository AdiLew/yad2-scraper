const path = require('path');
const fs = require('fs');
const Telegraf = require('telegraf');
const chalk = require('chalk');
const yad2Api = require('./yad2Api');

const token = '823158626:AAFrdjYf-UFBGN5uZRmnvU3MhI5JVY89GEk'
const bot = new Telegraf(token)

const dataFileDir = path.join(__dirname, '..\\data');
const dataPath = path.join(dataFileDir, 'appartments.json')




bot.on('sticker', (ctx) => {
    const {file_id} = ctx.message.sticker
    ctx.reply(file_id)
})



bot.command('/getreportnow', (ctx) => {
    console.log(ctx)
    ctx.reply('Working on it');
    //yad2Api.getApptsList( {}, true)
    const {queryFilters, customFilters} = yad2Api.getDefaultFilters();
    yad2Api.getApptsList(queryFilters)
        .then( 
            ({appartments}) =>{
                const prevQueryResultBuffer = fs.readFileSync(dataPath) ||'';
                const prevQueryResultJson = prevQueryResultBuffer.toString();
                const prevResult = JSON.parse(prevQueryResultJson);

                const newAppts = appartments.filter(({id})=>{
                    return !prevResult.some(a=> a.id === id)
                })
                const message = newAppts.map(apt=> apt.id)

                fs.writeFileSync( dataPath , JSON.stringify(appartments))

                return ctx.reply(message)
            },
            err =>console.log(err)
            )
    

})

bot.hears('Love You', (ctx) => {
    ctx.reply('Love you too!')
    ctx.replyWithSticker('CAADAgADQgcAAowt_QdHeoWouiAFCBYE')
})
module.exports = bot;