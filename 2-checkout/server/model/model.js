const users = require("./users");
const payments = require("./payments");
const addresses = require("./addresses");
const sessions = require("./sessions");
const db = require("../db");

module.exports.users = users;
module.exports.payments = payments;
module.exports.addresses = addresses;
module.exports.sessions = sessions;
module.exports.confirmation = function (user_id) {
  return db.queryAsync(
    `SELECT * FROM users JOIN addresses
    ON users.user_id = addresses.user_id
    JOIN payments
    ON users.user_id = payments.user_id
    WHERE users.user_id = ?`, user_id
  ).then((result) => (result[0][0]))
}

