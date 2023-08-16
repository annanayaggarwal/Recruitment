const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TestResult = require('../models/questionsmodel')

const questions = [
    { 
      id: 1, 
      question: "What is the largest planet in our solar system?", 
      options: ["Jupiter", "Saturn", "Mars", "Earth"], 
      answer: "Jupiter", 
      type: "JS", 
      selectedOption: null, 
      visited: false, 
      answered: false, 
    }, 
    { 
      id: 2, 
      question: "What is the capital of India?", 
      options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], 
      answer: "Delhi", 
      type: "HTML", 
      selectedOption: null, 
      visited: false, 
      answered: false, 
    }, 
    { 
      id: 3, 
      question: "What is the capital of Australia?", 
      options: ["Sydney", "Melbourne", "Canberra", "Perth"], 
      answer: "Canberra", 
      type: "CSS", 
      selectedOption: null, 
      visited: false, 
      answered: false, 
    }, 
    { 
      id: 4, 
      question: "What is the capital of China?", 
      options: ["Beijing", "Shanghai", "Hong Kong", "Shenzhen"], 
      answer: "Beijing", 
      type: "JS", 
      selectedOption: null, 
      visited: false, 
      answered: false, 
    }, 
    {
      id: 5,
      question: 'What is the capital of France?',
      type:'html',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      answer: 'Paris',
      selectedOption: null, 
      visited: false, 
      answered: false, 
    },
    {
      id:6,
      question: 'Which planet is known as the Red Planet?',
      type:'css',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Mars',
      selectedOption: null, 
      visited: false, 
      answered: false, 
    },
  ];

router.post('/submit', (req, res) => {
  const userAnswers = req.body.answers;
  const username =  req.body.name;
  let score = 0;

  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  const testResult = new TestResult({
    // userId: userid,
    name: username,
    answers: userAnswers,
    score: score
  });

  testResult.save()
    .then(() => {
      res.json({ score: score });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error saving test result' });
    });
});


router.get('/questions', (req, res) => {
  const questionsWithoutAnswers = questions.map(question => {
    return {
      id : question.id,
      type: question.type,
      question: question.question,
      options: question.options,
      selectedOption:question.selectedOption, 
      visited: question.visited, 
      answered:question.answered
    };
  });

  res.json(questionsWithoutAnswers);
});

module.exports = router;
