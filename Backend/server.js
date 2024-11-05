const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");


const userRouter = require("./routers/usersroute");
const connectDB = require("./config/db");
const { authmiddle } = require("./middlewares/authmiddleware");
const ProfileRoute = require("./routers/ProfileRoute");
const FeatureRouter = require("./routers/FeatureRoute");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',  
    methods: ['GET','POST'],
    credentials: true  
}));


app.use("/user", userRouter);
app.use("/profile" ,ProfileRoute )
app.use("/features" , FeatureRouter)

app.get("/", authmiddle, async (req, res) => {
    try {
        console.log("Home back");
        res.status(200).send({
            message: "Entered Home Success",
            success: true,
            userid: req.userid,
            section:req.section
        });
    } catch (error) {
        console.error("Error in home route:", error);
        res.status(500).send({
            message: "Internal Server Error",
            success: false
        });
    }
});

// Logout route
app.get("/logout", async (req, res) => {
    try {
        res.clearCookie('token'); // Clear the token cookie
        return res.status(200).send({
            message: "Logged Out",
            success: true
        });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).send({
            message: "Internal Server Error",
            success: false
        });
    }
});

// Server listening on port 5432
app.listen(8001, () => {
    console.log(`Server running on port 8001`);
});
