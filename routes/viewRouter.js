const express = require("express");
const viewRouter = express.Router();

const viewController = require("../controllers/viewController");

viewRouter.get("/:id", viewController.viewGet);

module.exports = viewRouter;
