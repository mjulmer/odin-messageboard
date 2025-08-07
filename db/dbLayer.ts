const pool = require("./pool.ts");

const tableName: string = "messages";

async function getAllMessages() {
  const { rows } = await pool.query(`SELECT * FROM ${tableName}`);
  console.log(rows);
  console.log(typeof rows);
  return rows;
}

async function addNewMessage({ username, message, dateAdded }) {
  await pool.query(
    "INSERT INTO " +
      tableName +
      " (username, message, date_added) VALUES ($1, $2, $3)",
    [username, message, dateAdded]
  );
}

module.exports = {
  getAllMessages,
  addNewMessage,
};
