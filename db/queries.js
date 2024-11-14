const pool = require("./pools");

async function getAllItem() {
  const { rows } = await pool.query("SELECT * FROM items;");
  return rows;
}

module.exports = {
  getAllItem,
};
