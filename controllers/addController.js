const db = require("../db/queries");
const { validationResult, body } = require("express-validator");

exports.addGet = (req, res) => {
  res.render("add");
};

const validateItem = [
  body("itemName").notEmpty().withMessage("item name cannot be empty"),
  body("itemDescription").optional(),
  body("itemQuantity")
    .notEmpty()
    .withMessage("item quantity cannot be empty")
    .isInt({ min: 0, max: 100 })
    .withMessage("item quantity must not be 0 and more than 100"),
];

exports.addItem = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("add", { errors: errors.array() });
    }
    const { itemName, itemDescription, itemQuantity } = req.body;
    try {
      await db.addItem(itemName, itemDescription, itemQuantity);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("cannot add item");
    }
  },
];
