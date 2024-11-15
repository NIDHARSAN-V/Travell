const express = require("express");
const { getProfileController, editProfileController } = require("../Userscontroller/UserProfileController");
const { authmiddle } = require("../middlewares/authmiddleware");

const ProfileRoute  = express.Router()




ProfileRoute.post("/get_profile",getProfileController)
ProfileRoute.post("/update_profile",authmiddle,editProfileController)




module.exports = ProfileRoute

