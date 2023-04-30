require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
// const db = require("./db/db");
const model = require("./model/model");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/****
 *
 *
 * Other routes here....
 *
 *
 */


/* ---------------- checkout routes -------------------- */

app.get('/checkout', (req, res) => {
  const session_id = req.session_id;
  model.sessions.getOne(session_id)
  .then((result) => {
    res.status(200).send(result === undefined)
  })
  .catch((err) => {
    console.log(err)
    res.status(400).send()
  })
})


/* ---------------- Users routes -------------------- */
app.post('/users', (req, res) => {
  const user = req.body
  const session_id = req.session_id;

  model.users.add(user)
  .then(([result]) => {
    model.sessions.add([session_id, result.insertId])
    .then(() => {
      const message = 'Successfully saved users in DB';
      res.status(201).send(message);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send();
  })
})

app.put('/users', (req, res) => {
  const phoneNumber = req.body.phone_number;
  const session_id = req.session_id;
  model.sessions.getOne(session_id)
  .then((result) => {
    model.users.updatePhoneNumber(result.user_id, phoneNumber)
    .then (() => {
      const message = 'Successfully updated phone number in DB'
      res.status(200).send(message)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send();
  })
})

/* ---------------- Address routes -------------------- */

app.post('/addresses', (req, res) => {
  const address = req.body
  const session_id = req.session_id
  model.sessions.getOne(session_id)
  .then((result) => {
    address.user_id = result.user_id
    model.addresses.add(address)
    .then(() => {
      const message = 'Successfully saved address in DB'
      res.status(200).send(message)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send();
  })
})

/* ---------------- Payments routes -------------------- */

app.post('/payments', (req, res) => {
  const payment = req.body
  const session_id = req.session_id
  model.sessions.getOne(session_id)
  .then((result) => {
    payment.user_id = result.user_id
    model.payments.add(payment)
    .then(() => {
      const message = 'Successfully saved payment in DB'
      res.status(200).send(message)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send();
  })
})

/* ---------------- Confirmation routes -------------------- */

app.get('/confirmation', (req, res) => {
  const session_id = req.session_id
  model.sessions.getOne(session_id)
  .then((result) => {
    const user_id = result.user_id
    model.confirmation(user_id)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send();
  })
})



app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
