const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ThisTestResult = new Schema({
    userId: String,
    name:String,
    answers: [String],
    score: Number
  });

  module.exports = Question = mongoose.model('testresults',ThisTestResult);