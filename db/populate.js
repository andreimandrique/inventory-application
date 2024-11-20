require("dotenv").config();

const { Client } = require("pg");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const SQL = `INSERT INTO items (item_name, item_description, item_quantity)
Values('pen', 'use to write', 5),('sword', 'sword that can cut anything', 1),('gun', 'brrrr', 69);`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
