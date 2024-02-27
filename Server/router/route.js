const express = require('express')
// import { addTask, addUser, getTasks, getUsers } from '../controller/user-controller';
const { addTask, addUser, getTasks, getUsers,deleUser, getTask } = require('../Controller/userController')

const router = express.Router();

router.post('/addUser',addUser)
router.get('/allUser',getUsers)
router.post('/addTask',addTask)
router.get('/allTask',getTasks)
router.delete('/delete/:id',deleUser)
router.get('/task/:id',getTask)

module.exports = router