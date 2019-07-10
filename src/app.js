const express = require('express')
const yad2Api = require('./utils/yad2Api.js')

const app = express()



app.get('/data', (req, res) => {
    yad2Api().then((response) => {
        res.send(response)
    })
})

app.listen(3300)


