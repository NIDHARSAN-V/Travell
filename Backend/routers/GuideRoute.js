const express = require("express");
const { book_guide } = require("../Userscontroller/GuidePaymentController");
const { authmiddle } = require("../middlewares/authmiddleware");

const GuideRouter  = express.Router()


// GuideRouter.post("/add_profile" , "Add_GuideProfile_Controller")


GuideRouter.get("/payment_list",authmiddle,book_guide );

// GuideRouter.get("/get_guide_profile" , "Get_Guide_Profile")
module.exports =GuideRouter;



