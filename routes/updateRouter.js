const express = require("express");
const updateRouter = express.Router();

const updateController = require("../controllers/updateController");

updateRouter.get("/:id", updateController.updateItemGet);
updateRouter.post("/:id", updateController.updateItemPost);

module.exports = updateRouter;
