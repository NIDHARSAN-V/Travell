const express = require("express");
const { get_guide_List } = require("../Userscontroller/GuidesListController");
const { book_guide } = require("../Userscontroller/BookGuideController");
const { authmiddle } = require("../middlewares/authmiddleware");

const TravelerRouter = express.Router()

TravelerRouter.get("/guide_list" , get_guide_List);
TravelerRouter.post("/book_guide",authmiddle ,book_guide )

module.exports = TravelerRouter