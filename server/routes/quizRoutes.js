const express = require( 'express' );
const router = express.Router();
const { createQuiz, getAllQuizTitles, getQuizById, submitQuizAnswers } = require( '../controllers/quizController' );
const auth = require( '../middlewares/auth' );

// endpoint to create a new quiz
router.post( '/', auth, createQuiz );

// endpoint to retrieve all quiz titles
router.get( '/', auth, getAllQuizTitles );

// endpoint to retrieve a specific quiz by ID
router.get( '/:id', auth, getQuizById );

// endpoint to submit answers for a specific quiz by ID
router.post( '/:id/submit', auth, submitQuizAnswers );

module.exports = router;