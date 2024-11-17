const db = require("../db/queries");
const { param, validationResult, body } = require("express-validator");

const validateId = [
  param("id").trim().notEmpty().isNumeric().withMessage("Id can not be empty."),
];

exports.updateItemGet = [
  validateId,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("error");
    }
    const { id } = req.params;
    try {
      const item = await db.getItem(id);
      res.render("update", { item: item });
    } catch (error) {
      res.status(500).send("cannot get item");
    }
  },
];

const validateItem = [
  param("id").trim().notEmpty().isNumeric().withMessage("id cannot be empty."),
  body("itemName").notEmpty().withMessage("item name cannot be empty"),
  body("itemDescription").optional(),
  body("itemQuantity")
    .notEmpty()
    .withMessage("item quantity cannot be empty")
    .isInt({ min: 0, max: 100 })
    .withMessage("item quantity must not be 0 and more than 100"),
];

exports.updateItemPost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    if (!errors.isEmpty()) {
      console.log(errors);
      try {
        const item = await db.getItem(id);
        return res.render("update", { item: item, errors: errors.array() });
      } catch (error) {
        res.status(500).send("cannot get item");
      }
    }
    const { itemName, itemDescription, itemQuantity } = req.body;
    try {
      await db.updateItem(id, itemName, itemDescription, itemQuantity);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("error updating item");
    }
  },
];
