const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost/glossary');

// 2. Set up any schema and models needed by the app
const wordSchema = mongoose.Schema({
  text: {type: String, unique: true},
  definition: String
})

const glossary = mongoose.model('glossary', wordSchema);

// 3. Implement add, delete and update methods to interact with DB

dbMethods = {
  getAll: function() {
    return glossary.find({}).exec()
  },

  getOnePage: function (pageNumber) {
    pageNumber = pageNumber || 1;
    const skipNumber = 10 * (pageNumber - 1);
    return glossary.find({}).sort({'text': 1}).skip(skipNumber).limit(10).exec()
  },

  getPageNumber: function () {
    return glossary.count({}).exec().then((count) => (Math.ceil(count / 10)))
  },

  add: function(words) {
    return glossary.create(words)
  },
  delete: function (word) {
    return glossary.findByIdAndDelete(word._id).exec()
  },
  update: function (word) {
    return glossary.findByIdAndUpdate(word._id, {definition: word.definition}).exec()
  }
}

// 4. Import the models into any modules that need them
module.exports = dbMethods;

