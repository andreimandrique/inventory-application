const pool = require("./pools");

async function addItem(itemName, itemDescription, itemQuantity) {
  await pool.query(
    "INSERT INTO items (item_name, item_description, item_quantity)Values($1, $2, $3);",
    [itemName, itemDescription, itemQuantity]
  );
}

async function getAllItem() {
  const { rows } = await pool.query("SELECT * FROM items;");
  return rows;
}

async function getItem(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = ($1);", [
    id,
  ]);
  return rows[0];
}

async function updateItem(id, itemName, itemDescription, itemQuantity) {
  await pool.query(
    "UPDATE items SET item_name = $2, item_description = $3, item_quantity = $4 WHERE id = $1;",
    [id, itemName, itemDescription, itemQuantity]
  );
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1;", [id]);
}

module.exports = {
  addItem,
  getAllItem,
  getItem,
  updateItem,
  deleteItem,
};
