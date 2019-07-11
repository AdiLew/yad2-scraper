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

//Route
app.get('', (req, res) => {
    yad2Api().then((data) => {
        res.render('index', data)
    })
})

app.get('/credits', (req, res) => {
    res.render('credits', {})
})


app.get('/data', (req, res) => {
    yad2Api().then((response) => {
        res.send(response)
    })
})

app.listen(3300)


