const db = require("../db");

const payments = {
  add: function (payment) {
    return db.queryAsync(
      `INSERT INTO payments SET ?`, payment
    )
  },

  getOne: function (id) {
    `SELECT * FROM payments WHERE user_id = ${id}`
  }
}

module.exports = payments;