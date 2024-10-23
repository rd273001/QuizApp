const express = require( 'express' );
const router = express.Router();
const { createQuiz, getAllQuizTitles, getQuizById, submitQuizAnswers } = require( '../controllers/quizController' );

// endpoint to create a new quiz
router.post( '/create', createQuiz );

// endpoint to retrieve all quiz titles
router.get( '/all', getAllQuizTitles );

// endpoint to retrieve a specific quiz by ID
router.get( '/:id', getQuizById );

// endpoint to submit answers for a specific quiz by ID
router.post( '/:id/submit', submitQuizAnswers );

module.exports = router;