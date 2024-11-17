const express = require("express");
const deleteRouter = express.Router();

const deleteController = require("../controllers/deleteController");

deleteRouter.post("/:id", deleteController.deleteItem);

module.exports = deleteRouter;
