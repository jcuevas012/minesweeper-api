const express = require('express')
const http = require('http')
const chalk  = require('chalk')
const mineRoute = require('./routes/mine')
const { api } = require('./config')


const app = express()
const server = http.createServer(app)

app.use('/', mineRoute)



server.listen(api.port, (req, res) => {
    console.log(chalk.green(`Minesweer-api started on port ${api.port}`))
})