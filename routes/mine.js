const express = require('express')

const app =  express.Router()


app.get('/start',  (req, res) => {
    res.send({ message: 'Game Start'})
})



module.exports = app