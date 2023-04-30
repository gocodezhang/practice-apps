const db = require("../db.js");

const addresses = {
  add: function (address) {
    return db.queryAsync(
      `INSERT INTO addresses SET ?`, address
    )
  },

  getOne: function (id) {
    return db.queryAsync(
      `SELECT * FROM addresses WHERE user_id = ${id}`
    )
  }
}

module.exports = addresses;