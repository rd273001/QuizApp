const Quiz = require( '../models/Quiz' );

// Controller to create a new quiz
exports.createQuiz = async ( req, res ) => {
  try {
    const quiz = new Quiz( req.body );
    await quiz.save();
    res.status( 201 ).json( { message: 'Quiz created successfully' } );
  } catch ( error ) {
    res.status( 500 ).json( { message: 'Failed to create quiz' } );
  }
};

// Controller to retrieve all quiz titles
exports.getAllQuizTitles = async ( req, res ) => {
  try {
    const quizzes = await Quiz.find( {}, 'title' );
    res.json( quizzes );
  } catch ( error ) {
    res.status( 500 ).json( error );
  }
};

// Controller to retrieve a specific quiz by ID
exports.getQuizById = async ( req, res ) => {
  try {
    const quiz = await Quiz.findById( req.params.id );
    if ( !quiz ) {
      return res.status( 404 ).json( { message: 'Quiz not found' } );
    }
    res.json( quiz );
  } catch ( error ) {
    res.status( 500 ).json( error );
  }
};

// Controller to submit answers for a specific quiz by ID
exports.submitQuizAnswers = async ( req, res ) => {
  try {
    const quiz = await Quiz.findById( req.params.id );
    if ( !quiz ) {
      return res.status( 404 ).json( { message: 'Quiz not found' } );
    }
    const userAnswers = req.body.answers;
    // map through the quiz questions to determine which answers are correct
    const results = quiz.questions.map( ( q, index ) => ( {
      question: q.question,
      correct: q.correctAnswer === userAnswers[index],
    } ) );
    // calculate the score based on the number of correct answers
    const score = results.filter( r => r.correct ).length;
    res.json( { score, total: quiz.questions.length, results } );
  } catch ( error ) {
    res.status( 500 ).json( error );
  }
};