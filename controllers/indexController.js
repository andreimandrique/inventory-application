const db = require("../db/queries");

exports.indexGet = async (req, res) => {
  try {
    const items = await db.getAllItem();
    res.render("index", {
      items: items,
    });
  } catch (err) {
    res.status(500).send("Error fetching items");
  }
};
