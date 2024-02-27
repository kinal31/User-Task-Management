const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require("body-parser")
const router = require("./router/route")

const PORT = 5000
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/',router)
//for server is running testing purpose
// app.get("/",(req,res)=>{
//     res.json({
//         mesaage : " server is running"
//     })
// })

mongoose.connect("mongodb://127.0.0.1:27017/usertask")
.then(()=>{
    console.log("MongoDB connected")
    app.listen(PORT, ()=> console.log("server is running"))
})
.catch((err)=> console.log(err))