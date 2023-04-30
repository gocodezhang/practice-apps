const db = require("../db");

const users = {
  getOne: function(id) {
    return db.queryAsync(
      `SELECT * FROM users WHERE user_id = ${id}`
    )
  },

  updatePhoneNumber: function(id, number) {
    return db.queryAsync(
      `UPDATE users SET phone_number = ${number} WHERE user_id = ${id}`
    )
  },

  add: function(user) {
    return db.queryAsync(
      `INSERT INTO users (name, email, password) VALUES(?, ?, ?);`, [user.name, user.email, user.password]
    )
  }
}

module.exports = users;