const express = require('express')
const app =  express.Router()
const db = require('../db')

db.init()
const { Game } = require('../db/models')

function generatePosition (row, col) {
    rowArr = []
    for (let i = 0; i < row; i++) {
        let colArr =[]
        for (let j = 0; j < col; j++) {
            value = Math.floor(Math.random() * 2) + 1              
            colArr.push(value)
        }
       rowArr.push(colArr)
    }
    return rowArr
}


function setBoom(matrix, num) {
    
    const row = matrix.length
    const col = matrix[0].length
    
    for (let i = 0; i < num; i++) {
        value = Math.floor(Math.random() * (col * row) + 1) + 1    
        let x = parseInt(value.toString().charAt(0))
        let y = parseInt(value.toString().charAt(1))
        matrix[x][y] = 0 
    }

    return matrix
}

function generateGame(level) {
    let matrix = {
        col: 10,
        row: 10
    }

    if (level == 'mid') {
        matrix.col = 20,
        matrix.row = 20,
        matrix.arr = generatePosition(matrix.row, matrix.col)
        matrix.arr = setBoom(matrix.arr, 14)
        return matrix

    } else if (level == 'pro') {
        matrix.col = 30,
        matrix.row = 30,
        matrix.arr = generatePosition(matrix.row, matrix.col)
        matrix.arr = setBoom(matrix.arr, 21)
        return matrix
    } else {
         matrix.arr = generatePosition(matrix.row, matrix.col)
         matrix.arr = setBoom(matrix.arr, 7)
         return matrix
    }
    
}


app.post('/start',  async (req, res) => {
    const matrix = generateGame(req.query.level)
    
    const game = await Game({
        play: matrix.arr,
        row: matrix.row,
        col: matrix.col,
        startTime: Date(),
        userId: 'sdd',
    }).save()

    const response = {
        id: game._id,
        col: game.col,
        row: game.row,
        startTime: game.startTime,
    }

    res.send(response)
})


app.post('/open', async (req, res) => {
    const params = req.body
    const data = await Game.findById(params.id)
    value = data.play[params.row][params.col]
    
    if (!value) {
        game.isOver = true
        game.endTime = Date()
        const data = await game.save()
        res.send({ value, message: 'Game Over ', game: game })  
    } 
    res.send({ value, message: 'Keep going !'})

})





module.exports = app