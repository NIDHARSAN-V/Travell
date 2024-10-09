const express = require("express");
const { order_entry } = require("../controller/ordercontroller/OrderEntryall");

const orderRouter  = express.Router()

//OrderEntry Commercial
orderRouter.post("/orderentry/add" , order_entry)




module.exports = orderRouter
