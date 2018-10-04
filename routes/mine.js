const express = require('express')
const app =  express.Router()
const db = require('../db')

db.init()

app.get('/start',  (req, res) => {
    res.send({ message: 'Game Start'})
})



module.exports = app