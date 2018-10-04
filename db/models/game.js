const mongoose = require('mongoose')
const { Schema } = mongoose



const gameSchema = new Schema({
    game: Array,
    startTime: {
        type: Date,
        required: true
    },
    pause: Boolean,
    userId: String,
})

// try {
//      gameSchema = mongoose.model('games', gameSchema)
// }
// catch(e){
//      gameSchema = mongoose.model('games')
// }



module.exports = mongoose.model('games', gameSchema)