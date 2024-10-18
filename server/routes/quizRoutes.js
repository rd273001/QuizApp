const express = require( 'express' );
const router = express.Router();
const { createQuiz, getAllQuizTitles, getQuizById } = require( '../controllers/quizController' );
const auth = require( '../middleware/auth' );

// endpoint to create a new quiz
router.post( '/', auth, createQuiz );

// endpoint to retrieve all quiz titles
router.get( '/', auth, getAllQuizTitles );

// endpoint to retrieve a specific quiz by ID
router.get( '/:id', auth, getQuizById );

module.exports = router;