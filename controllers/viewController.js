const db = require("../db/queries");
const { param, validationResult } = require("express-validator");

const validateId = [
  param("id").notEmpty().isNumeric().withMessage("Id can not be empty."),
];

exports.viewGet = [
  validateId,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("error");
    }
    const { id } = req.params;
    try {
      const item = await db.getItem(id);
      res.render("view", { item: item });
    } catch (error) {
      res.status(500).send("cannot get item");
    }
  },
];
