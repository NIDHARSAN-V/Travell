const express = require("express");
const { getProfileController } = require("../Userscontroller/UserProfileController");


const ProfileRoute  = express.Router()




ProfileRoute.post("/get_profile",getProfileController)




module.exports = ProfileRoute

