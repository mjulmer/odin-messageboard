require("dotenv").config();

// From https://neon.com/docs/guides/node

const { Pool } = require("pg");

const { PG_HOST, PG_DB_NAME, PG_USER, PG_PASS } = process.env;

const pool = new Pool({
  host: PG_HOST,
  database: PG_DB_NAME,
  username: PG_USER,
  password: PG_PASS,
  port: 5432,
  ssl: {
    require: true,
  },
});

async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT version()");
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}

getPgVersion();
