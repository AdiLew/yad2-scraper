const path = require('path')
const express = require('express')
const hbs = require('hbs')
const yad2Api = require('./utils/yad2Api.js')


const app = express()
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

const qs = {
    cat: 2,
    subcat: 2,
    city: 8600,
    property: "1,3",
    rooms: "3--1",
    price: "-1-6000",
    //parking: 1,
    EnterDate: '1-10-2019'

}



//Route
app.get('', (req, res) => {

    yad2Api.getApptsList(qs).then((data) => {
        res.render('index', data)
    })
})

app.get('/appt', (req, res) => {
    yad2Api.getApptDetails(req.query.apptId)
    .then((data) => req.query.data ? res.send(data) : res.render('appartment',data))
})

app.get('/credits', (req, res) => {
    res.render('credits', {})
})


app.get('/data', (req, res) => {
    yad2Api.getApptsList(qs).then((response) => {
        res.send(response)
    })
})

app.listen(3300)


