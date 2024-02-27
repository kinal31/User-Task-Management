const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : String,
    age: Number,
    department : String
})

const User = mongoose.model('user',userSchema)

module.exports = User