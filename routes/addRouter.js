const express = require("express");
const addRouter = express.Router();

const addController = require("../controllers/addController");

addRouter.get("/", addController.addGet);
addRouter.post("/", addController.addItem);

module.exports = addRouter;
