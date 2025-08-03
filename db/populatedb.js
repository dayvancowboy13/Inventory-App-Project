const { Client } = require('pg');
require("dotenv").config();

// const SQL = `INSERT INTO messages (author, message, date_added) VALUES ('Chris', 'Wow! I have a new database!', CURRENT_DATE)`;
// const SQL = 'INSERT INTO  "my-table" (id, price) VALUES (2, 55)';
// const SQL = `CREATE TABLE IF NOT EXISTS new_table (
//   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   myNum INT)`;

// item_id | name | description | manufacturer_id | category_id | price | quantity | image

const INIT = `CREATE TABLE IF NOT EXISTS manufacturers(
manufacturer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(30),
location VARCHAR(30),
notes VARCHAR(200));

CREATE TABLE IF NOT EXISTS categories(
category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(30),
description VARCHAR(200));

CREATE TABLE IF NOT EXISTS items(
item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(30),
description VARCHAR(200),
manufacturer_id INT, CONSTRAINT fk_manufacturer FOREIGN KEY (manufacturer_id) 
REFERENCES manufacturers(manufacturer_id),
category_id INT, CONSTRAINT fk_category FOREIGN KEY (category_id)
REFERENCES categories(category_id),
price INT,
quantity INT,
image VARCHAR(22));
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(INIT);
  // let { rows } = await client.query(INIT);
  // console.log(rows);
  await client.end();
  console.log("done");
}

main();