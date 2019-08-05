const chalk = require('chalk');
const Telegram = require('telegram-bot-api');
const emoji = require('node-emoji');
const bot = new Telegram({ token: '823158626:AAFrdjYf-UFBGN5uZRmnvU3MhI5JVY89GEk', updates: { enabled: true } })

const personalChat = 34238837;
const groupChat = -371062059


console.log(chalk.cyan('Telegram up'))

bot.apptReport = (appts, hoursSincePublished) => {

    const chat_id = groupChat;
    const relevantAppts = appts.filter((appt) => appt.hoursSinceAdded <= hoursSincePublished && appt.kmFromOmris < 2);
    if (relevantAppts.length > 0) {
        const messageText = `Hey there!\n${relevantAppts.length > 1 ? relevantAppts.length + 'appartments have' : '1 appartment has'} been uploaded in the last ${hoursSincePublished} hours.\nHave fun!`
        bot.sendMessage({ chat_id, text: messageText })
            .then(() =>
                relevantAppts.forEach(appt => {
                    const message = {
                        chat_id,
                        text: `<a href="${appt.adUrl}">דירת ${appt.Rooms_text} חדרים ב${appt.street} ${appt.address_home_number}</a>: \n`
                            + `${appt.square_meters} מ"ר\n`
                            + `שכר דירה: <b>${appt.price}</b>\n`
                            + `<a href="https://www.google.com/maps/search/?api=1&query=${appt.street} ${appt.address_home_number} רמת גן">צפייה ב-Google Maps</a>`

                        , parse_mode: 'HTML'


                    }
                    bot.sendMessage(message)
                })

            );

    }
}

bot.on('message', function (msg) {
    console.log(msg)
    // Received text message
    let res;
    if (msg.sticker) {
        res = `${msg.sticker.file_id}`
    }
    if (msg.animation) {
        res = `${msg.animation.file_id}`
    }
    console.log(res)
    if (res) {
        bot.sendMessage({ chat_id: msg.chat.id, text: res })
    }
});

//bot.getMe().then((res) => { console.log(res) })
// bot.getUpdates({ allowed_updates: 'message', offset: -20 }).then((res) => {

//     const stickers = res
//         .filter(({ message }) => message && message.sticker)
//         .map(({ message }) => {
//             const { set_name, emoji, file_id } = message.sticker
//             return { set_name, emoji, file_id }
//         })
//     console.log(stickers)
// })






//Rubi's sticker: CAADBAADDAAD1bvXGtPmMdvlTESzAg
// bot.on('new_chat_members', (res) => console.log(res))

//bot.sendSticker({ chat_id: personalChat, sticker: 'CAADBAADWQADdXEKAt2s9ftH0E-pAg' })

// bot.sendMessage({
//     chat_id: '-371062059',
//     text: emoji.emojify('Hi Noa! :heart:')
// }).then(
//     (res) => console.log(res),
//     (err) => console.log(chalk.red(`Error ${err.error_code}: ${err.description}`))
// )

// const updateExample = [{
//     "update_id": 609340638,
//     "message": {
//         "message_id": 9,
//         "from": {
//             "id": 34238837,
//             "is_bot": false,
//             "first_name": "Adi",
//             "last_name": "Lewenstein",
//             "username": "adilew",
//             "language_code": "en"
//         },

//         "chat": {
//             "id": 34238837,
//             "first_name": "Adi",
//             "last_name": "Lewenstein",
//             "username": "adilew",
//             "type": "private"
//         },
//         "date": 1564052879,
//         "sticker": {
//             "width": 291,
//             "height": 512,
//             "emoji": "🕺",
//             "set_name": "SirDror",
//             "thumb": {
//                 "file_id": "AAQEABNvQisbAASoCeW4C9FxvYkkAAIC",
//                 "file_size": 5510,
//                 "width": 182,
//                 "height": 320
//             },
//             "file_id": "CAADBAADWQADdXEKAt2s9ftH0E- pAg",
//             "file_size": 9396
//         }
//     }
// }]
module.exports = bot;