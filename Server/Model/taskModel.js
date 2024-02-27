const mongoose = require('mongoose')
const User = require('./userModel')

const taskSchema = new mongoose.Schema({
    taskname: String,
    username: String,
    department: String,
    userId:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'User' }
})

const Task = mongoose.model('task',taskSchema)

module.exports = Task

