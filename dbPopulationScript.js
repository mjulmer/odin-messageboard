#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const { PG_HOST, PG_DB_NAME, PG_USER, PG_PASS, DATABASE_URL } = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 25 ),
  message TEXT,
  date_added TIMESTAMP WITH TIME ZONE
);

INSERT INTO messages (username, message) 
VALUES
  ('Anora', 'High: finished the CSS module'),
  ('Thara', 'Low: got stuck trying to install Postman');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

console.log(DATABASE_URL);
console.log({ PG_HOST, PG_DB_NAME, PG_USER, PG_PASS, DATABASE_URL });
main();
