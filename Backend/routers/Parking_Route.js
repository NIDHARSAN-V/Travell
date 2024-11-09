const express = require("express");
const { Add_parking_payment } = require("../Userscontroller/PaymentController");
const { authmiddle } = require("../middlewares/authmiddleware");


const ParkingRouter  = express.Router()


// GuideRouter.post("/add_profile" , "Add_GuideProfile_Controller")


ParkingRouter.post("/payment_add",Add_parking_payment );

// GuideRouter.get("/get_guide_profile" , "Get_Guide_Profile")
module.exports =ParkingRouter;



