const { Client } = require('pg');
require("dotenv").config();
const { INIT, DUMMY_PRODUCTS, DUMMY_MANU, DUMMY_CATS } = require('./dummyDataQueries');

async function init() {
  console.log("creating tables...");
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

async function populate() {
  console.log("filling tables with dummy data...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(DUMMY_MANU);
  await client.query(DUMMY_CATS);
  await client.query(DUMMY_PRODUCTS);
  await client.end();
  console.log("done");
}

if (process.argv[2]) {
  if (process.argv[2] === 'init') {
    console.log('Running db initialization...');
    init();
  } else if (process.argv[2] === 'fill') {
    console.log('Filling tables with dummy data...');
    populate();
  } else {
    console.log('Command not recognized');
  }
} else {
  console.log('no commands from commandline');
}
