require("dotenv").config();
const express = require("express");
const path = require("path");
const dbMethods = require('./db.js');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

/* ---------------- Server Reponses Setup ---------------- */

// POST route
app.post('/words', (req, res) => {
  console.log('Server received POST');
  // Extract the data from request
  const words = req.body;
  // Save the data in DB
  dbMethods.add(words)
  .then(() => {
    // Send back response
    const message = 'Successfully saved in DB';
    res.status(201).send(message);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

// GET route - 1. Retrive results for currentPage
app.get('/words', (req, res) => {
  console.log('Server received GET');
  // Get the current Page
  const currentPage = req.query.currentPage
  // Retrieve data from DB
  dbMethods.getOnePage(currentPage)
  .then((data) => {
    // Send back response
    res.status(201).send(data);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

// GET route - 2. Retrive max page number in DB

app.get('/page', (req, res) => {
  console.log('Server received GET pagenumber');
  // Retrieve data from DB
  dbMethods.getPageNumber()
  .then((pageNumber) => {
    // Send back response
    res.status(201).json(pageNumber);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

// PUT route
app.put('/words', (req, res) => {
  console.log('Server received PUT')
  // Extract the data from request
  const word = req.body
  console.log(word);
  // Update the word in DB
  dbMethods.update(word)
  .then((data) => {
    // Send back response
    if (data) {
      const message = 'Successfully updated in DB';
      res.status(200).send(message);
    } else {
      const message = 'Record not found';
      res.status(400).send(message);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  })
})

// DELETE route to update
app.delete('/words', (req, res) => {
  console.log('Server received DELETE')
  // Extract the data from request
  const word = req.body
  // Update the word in DB
  console.log(word);
  dbMethods.delete(word)
  .then((data) => {
    // Send back response
    if (data) {
      const message = 'Successfully deleted in DB';
      res.status(200).send(message);
    } else {
      const message = 'Record not found';
      res.status(400).send(message);
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

/* ---------------- Server listens ---------------- */

const PORT = 3000;
app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);
