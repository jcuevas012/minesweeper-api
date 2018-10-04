const mongoose = require('mongoose')
const { Schema } = mongoose



const gameSchema = new Schema({
    play: Array,
    row: Number,
    col: Number,
    startTime: {
        type: Date,
        required: true
    },
    endTime: Date,
    isOver: {
        type: Boolean,
        default: false
    },
    pause: {
        type: Boolean,
        default: false
    },
    userId: String,
})

// try {
//      gameSchema = mongoose.model('games', gameSchema)
// }
// catch(e){
//      gameSchema = mongoose.model('games')
// }



module.exports = mongoose.model('games', gameSchema)