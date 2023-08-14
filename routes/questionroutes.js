const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TestResult = require('../models/questionsmodel')

const questions = [
    {
      id:101,
      text: 'What is the capital of France?',
      type:'html',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctAnswer: 'B'
    },
    {
      id:201,
      text: 'Which planet is known as the Red Planet?',
      type:'css',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'B'
    },
  ];

router.post('/submit', (req, res) => {
  const userAnswers = req.body.answers;
  const username =  req.body.name;
  let score = 0;

  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === questions[i].correctAnswer) {
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
      text: question.text,
      options: question.options,
    };
  });

  res.json(questionsWithoutAnswers);
});

module.exports = router;
