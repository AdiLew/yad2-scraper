const path = require('path')
const express = require('express')
const hbs = require('hbs')
const yad2Api = require('./utils/yad2Api.js')
//const bot = require('./utils/telegram.js')
const bot = require('./utils/telegram2.js')


const app = express()
const port = process.env.PORT || 3300;
//Set directory cariables
const staticDir = path.join(__dirname, '../public')
const templatesDir = path.join(__dirname, '../templates')
const viewsDir = path.join(templatesDir, '/views')
const partialsDir = path.join(templatesDir, '/partials')



//Setup the application's directories
app.use(express.static(staticDir));
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

const qs = yad2Api.getDefaultFilters().queryFilters;



//Route
app.get('', (req, res) => {

    yad2Api.getApptsList(qs).then((data) => {
        res.render('index', data)
    })
})

app.get('/appt', (req, res) => {
    yad2Api.getApptDetails(req.query.apptId)
        .then((data) => {
            if (req.query.iframe) {
                data.iFrame = true;
            }
            return res.render('appartment', data)
        })
})

app.get('/api/appt', (req, res) => {
    yad2Api.getApptDetails(req.query.apptId)
        .then((data) => res.send(data))
})




app.get('/credits', (req, res) => {
    res.render('credits', {})
})


app.get('/api/data', (req, res) => {
    yad2Api.getApptsList(qs).then((response) => {
        res.send(response)
    })
})

app.get('/api/*', (req, res) => {
    res.send({ error: 'unfamiliar endpoint :(' })
})

app.get('*', (req, res) => {
    res.send({ error: 'Page Not Found' })
})


app.listen(port)
console.log(`App is up on port ${port}`)

/*bot.launch();
console.log('Telegram is up!')*/


// setInterval(() => {
//     yad2Api.getApptsList(qs)
//         .then(({ appartments }) => {
//             bot.apptReport(appartments, 1);
//         })
// }
//     , 3600000
// )



