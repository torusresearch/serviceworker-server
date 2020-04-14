var express = require('express')
var app = express()
var fs = require('fs')
var cors = require('cors')
var https = require('https')
app.use(cors())
app.get('/serviceworker/sw.js', (req, res) => {
    res.write(fs.readFileSync('./public/sw.js'))
    res.status(200).end()
})
app.get('/serviceworker/redirect', (req, res) => {
    res.write(fs.readFileSync('./public/redirect.html'))
    res.status(200).end()
})
https.createServer({
    cert: fs.readFileSync('./ssl/server.crt'),
    key: fs.readFileSync('./ssl/server.key')
}, app).listen(3000)