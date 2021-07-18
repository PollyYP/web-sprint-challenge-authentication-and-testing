const db = require("../../data/dbConfig");

function findByUsername(username) {
  return db("users")
    .where("username", username)
    .first("id", "username", "password");
}

async function add(user) {
  await db("users").insert(user);
  return findByUsername(user.username);
}

module.exports = { add, findByUsername };
