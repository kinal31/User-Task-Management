const Task = require('../Model/taskModel')
const User = require('../Model/userModel')

const addUser=async(req,res)=>{
    
    try {
        const user = req.body;
    const newUser = new User(user);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
const getUsers=async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users);
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}
const addTask= async(req,res)=>{
    const task = req.body;
    //const newTask = new Task(task)
    try {
        const user=await User.find({name:req.body.username})
        // console.log(user[0]._id)  // changed by kinal
        const newTask = new Task({...task,userId:user[0]._id}) //This line creates a new instance of the Task model/schema with the task data obtained from the request body. It also assigns the _id of the user found in the previous step as the userId field of the task.
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
const getTasks=async(req,res)=>{
    try {
        const tasks = await Task.find().populate('username')// get name only
        // console.log(tasks) //changed by kinal
        res.status(200).json(tasks);
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}
const deleUser = async (req,res) =>{
    const id = req.params.id
    try{
        const duser = await User.deleteOne({_id : id})
        res.status(200).json(duser)
        await Task.deleteMany({ userId: id });
    }catch (error) {
        res.status(401).json({message:error.message})
    }
    
}

const getTask= async(req,res) =>{
    const id = req.params.id
    try {
        const detail = await Task.find({userId : id})
        // console.log(detail);
        res.status(200).json(detail);
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}

module.exports ={
    addUser,
    getUsers,
    addTask,
    getTasks,
    deleUser,
    getTask
}