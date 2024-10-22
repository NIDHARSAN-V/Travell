const express = require("express")
const { authmiddle } = require("../middlewares/authmiddleware")
const { registerController } = require("../Userscontroller/Registercontroller");
const { loginController } = require("../Userscontroller/Logincontroller");
const { ProfileController } = require("../Userscontroller/ProfileController");

const userRouter = express.Router()


userRouter.post("/register",registerController);

userRouter.post("/login", loginController);

userRouter.post("/profile",ProfileController )


module.exports = userRouter