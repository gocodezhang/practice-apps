const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

/*------------------------- Create Database and tables -------------------------------*/

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() => db.queryAsync(`DROP DATABASE ${process.env.DB_NAME}`))
  .then(() => db.queryAsync(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    )
  )
  .then(() => db.queryAsync(`USE ${process.env.DB_NAME}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS users (
        user_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(50),
        email VARCHAR(30),
        password VARCHAR(30),
        phone_number VARCHAR(15),
        PRIMARY KEY (user_id))`
    )
  )
  .then(() =>
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS addresses (
        address_id INT NOT NULL AUTO_INCREMENT,
        user_id INT,
        line_1 VARCHAR(100),
        line_2 VARCHAR(100),
        city VARCHAR(20),
        state VARCHAR(6),
        zip VARCHAR(5),
        PRIMARY KEY (address_id))`
    )
  )
  .then(() =>
  db.queryAsync(
    `CREATE TABLE IF NOT EXISTS payments (
      card_id INT NOT NULL AUTO_INCREMENT,
      user_id INT,
      card_number VARCHAR(30),
      expire_date VARCHAR(10),
      CVV INT,
      billing_zip VARCHAR(5),
      PRIMARY KEY (card_id))`
    )
  )
  .then(() =>
  db.queryAsync(
    `CREATE TABLE IF NOT EXISTS sessions (
      session_id VARCHAR(100),
      user_id INT,
      PRIMARY KEY (session_id))`
    )
  )

  .catch((err) => console.log(err));

module.exports = db;
