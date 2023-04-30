const db = require("../db");

const sessions = {
  add: function(session) {
    return db.queryAsync(
      `INSERT INTO sessions (session_id, user_id) VALUES(?, ?)`, session
    )
  },

  getOne: function(id) {
    return db.queryAsync(
      `SELECT * FROM sessions WHERE session_id = ?`, id
    ).then((result) => (result[0][0]))
  }
}

module.exports = sessions;