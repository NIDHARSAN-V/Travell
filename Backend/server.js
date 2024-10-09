const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken")
// const bcrypt  = require("bcrypt")
const cookieParser = require("cookie-parser")


const dotenv = require("dotenv");
const orderRouter = require("./routers/order");
const userRouter = require("./routers/usersroute");
const connectDB = require("./config/db");
const { authmiddle } = require("./middlewares/authmiddleware");

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();
// connectDB();


//middlewares
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8081',  
    methods: ['GET', 'POST'],
    credentials: true
}));


app.use(cookieParser())

// app.use(moragan("dev"));


//router Middleware

app.use("/user" , userRouter)

app.get("/",authmiddle ,async function(req,res)
{
    console.log("Home back")
     res.status(201).send({ message: "Entered Home Success", success: true , userid:req.userid });
} )

app.get("/logout" , async function(req,res)
{
    res.clearCookie('token');
    return res.status(201).send({message:"Logged Out" , success:true})
})

//server 
app.listen(8000 , function()
{
    console.log(`Server running in 8000`)
})
