const path = require('path');
const fs = require('fs');
const Telegraf = require('telegraf');
const moment = require('moment');
const chalk = require('chalk');
const yad2Api = require('./yad2Api');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const token = '823158626:AAFrdjYf-UFBGN5uZRmnvU3MhI5JVY89GEk'
const bot = new Telegraf(token)

const dataFileDir = path.join(__dirname, '..\\data');
const dataPath = path.join(dataFileDir, 'appartments.json')




bot.on('sticker', (ctx) => {
    const { file_id } = ctx.message.sticker
    ctx.reply(file_id)
})

bot.command('/getreportnow', (ctx) => {
    ctx.reply('Working on it');
    //yad2Api.getApptsList( {}, true)
    const { queryFilters, customFilters } = yad2Api.getDefaultFilters();
    yad2Api.getApptsList(queryFilters)
        .then(
            ({ appartments }) => {
                ctx.reply("I've got some data, let me clean it up for you");
                const prevQueryResultBuffer = fs.readFileSync(dataPath) || '';
                const prevQueryResultJson = prevQueryResultBuffer.toString();
                const prevResult = JSON.parse(prevQueryResultJson);

                const newAppts = appartments.filter(({ id }) => {
                    return !prevResult.some(a => a.id === id)
                })

                if (newAppts.length < 1) {
                    ctx.reply('Nothing New 😞')
                }
                else {
                    newAppts
                        .filter((appt) => {
                            return appt.kmFromOmris < 2;
                        })
                        .forEach((appt) => {

                            ctx.replyWithHTML(
                                `<a href="${appt.adUrl}">דירת ${appt.Rooms_text} חדרים ב${appt.street} ${appt.address_home_number}</a>: \n`
                                + `${appt.square_meters} מ"ר\n`
                                + `שכר דירה: <b>${appt.price}</b>\n`
                                + `פורסמה ${appt.added}\n`
                                + `<a href="https://www.google.com/maps/search/?api=1&query=${appt.street} ${appt.address_home_number} רמת גן">צפייה ב-Google Maps</a>`
                            )
                        })


                    fs.writeFileSync(dataPath, JSON.stringify(appartments))
                }



            },
            err => {
                const now = new moment();
                switch (err.type) {
                    case 'invalid-json':
                        ctx.reply('Yad 2 returned an invalid JSON 💩💩💩');
                    default: 
                        ctx.replyWithHTML(`<b>Error!</b> ☠️\nError Type: <code>${err.type}</code>\nError Description: <code>${err.message}</code>`)
                }
                
                console.log(`${now.format()}: ${err.type}\n-------------\n${err.message}`)
            }
        )


})

bot.command('/ping', (ctx) => {
    ctx.replyWithSticker('CAADAgADLgcAAowt_QfMJDtylnU7gxYE');
})

bot.command('/hefker', (ctx) => {
    ctx.replyWithSticker('CAADBAADlgAD9csoBWoiHhtQmQrtFgQ');
})


bot.hears('Love You', (ctx) => {
    ctx.reply('Love you too!')
    ctx.replyWithSticker('CAADAgADQgcAAowt_QdHeoWouiAFCBYE')
})

bot.hears('הפקר', (ctx) => {
    ctx.replyWithSticker('CAADBAADlgAD9csoBWoiHhtQmQrtFgQ')
})
module.exports = bot;