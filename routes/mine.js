const express = require('express')
const app = express.Router()
const db = require('../db')

db.init()
const { Game } = require('../db/models')

function generatePosition(row, col) {
    rowArr = []
    for (let i = 0; i < row; i++) {
        let colArr = []
        for (let j = 0; j < col; j++) {
            colArr.push(1)
        }
        rowArr.push(colArr)
    }
    return rowArr
}


function setMines(matrix, num) {

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
        matrix.arr = setMines(matrix.arr, 14)
        return matrix

    } else if (level == 'pro') {
        matrix.col = 30,
            matrix.row = 30,
            matrix.arr = generatePosition(matrix.row, matrix.col)
        matrix.arr = setMines(matrix.arr, 21)
        return matrix
    } else {
        matrix.arr = generatePosition(matrix.row, matrix.col)
        matrix.arr = setMines(matrix.arr, 7)
        return matrix
    }

}


app.post('/start', async (req, res) => {
    const matrix = generateGame(req.query.level)

    const game = await Game({
        play: matrix.arr,
        row: matrix.row,
        col: matrix.col,
        startTime: Date(),
        userId: req.query.userId,
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
    const row = req.body.row + 1
    const col = req.body.col + 1

    if (!row || !col) res.status(500).send({ message: 'Should specify row and column where to play'})
    
    const game = await Game.findById(req.body.id)
    
    if (game.isOver || game.pause) res.status(500).send({ message: 'The game is over or pause, you can not play'})
    

    value = game.play[row][col]

    if (!value) {
        game.isOver = true
        game.endTime = Date()
        const data = await game.save()
        res.send({ value, message: 'Game Over ', game: data })
    }
    value += 1
    game.play[row][col] = value
    await game.save()

    res.send({ value, message: 'Keep going !' })
})



app.put('/pause/:id', async (req, res) => {
    const id = req.params.id
    const game = await Game.findById(id)

    if (game.isOver)
        res.status(500).send({ message: 'Game is over, it can not be pause' })

    game.pause = !game.pause
    const updated = await game.save()

    res.send({ pause: updated.pause, id: updated._id })
})



app.put('/flag/:id', async (req, res) => {
    const id = req.params.id
    const  params = req.body
    
    if (!params.row || !params.col) res.status(500).send({ message: 'Should specify row and column where to play'})

    const game = await Game.findById(id)
    const play = [ ...game.play ]

    if (game.isOver || game.pause) res.status(500).send({ message: 'The game is over or pause, you can not play'})

    play[params.row - 1][params.col - 1] = '?'
    const value = play[params.row - 1][params.col - 1]
    game.play = play
    const updated = await game.save()


    res.send({ col: params.col, row: params.row, value })
})




app.get('/games/:userId', async (req, res) => {
    const userId = req.params.userId
    
    let games = await Game.find({ userId })
    games  = games.map(game => {
        let newGame = JSON.parse(JSON.stringify(game))
        delete newGame.play
        return newGame
    })

    res.send(games)
})

module.exports = app