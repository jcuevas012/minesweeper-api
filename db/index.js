const mongoose = require('mongoose')
const chalk = require('chalk')
const { db } = require('../config')




mongoose.Promise = global.Promise

mongoose.connection.once('open', () => {
    console.log(`${chalk.green('minesweeper connected ')}`)
})

mongoose.connection.once('error', (e) => {
    console.log(`${chalk.red('minesweeper something went wrong ')}`)
    console.log(e)
})


function init() {
    let connectString = ''
    if(db.username){
        
        connectString = `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`    
    } else {
        connectString = `mongodb://${db.host}:${db.port}/${db.database}`
    }
    console.log(connectString)
    
    mongoose.connect(connectString)
}

function close(){
    mongoose.connection.close()
}

module.exports = {
    init,
    close
}