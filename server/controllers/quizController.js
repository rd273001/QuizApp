const Quiz = require( '../models/Quiz' );

// Controller to create a new quiz
exports.createQuiz = async ( req, res ) => {
  try {
    const quiz = new Quiz( req.body );
    await quiz.save();
    res.status( 201 ).send( quiz );
  } catch ( error ) {
    res.status( 400 ).send( error );
  }
};

// Controller to retrieve all quiz titles
exports.getAllQuizTitles = async ( req, res ) => {
  try {
    const quizzes = await Quiz.find( {}, 'title' );
    res.send( quizzes );
  } catch ( error ) {
    res.status( 500 ).send( error );
  }
};

// Controller to retrieve a specific quiz by ID
exports.getQuizById = async ( req, res ) => {
  try {
    const quiz = await Quiz.findById( req.params.id );
    if ( !quiz ) {
      return res.status( 404 ).send();
    }
    res.send( quiz );
  } catch ( error ) {
    res.status( 500 ).send( error );
  }
};

// Controller to submit answers for a specific quiz by ID
exports.submitQuizAnswers = async ( req, res ) => {
  try {
    const quiz = await Quiz.findById( req.params.id );
    if ( !quiz ) {
      return res.status( 404 ).send();
    }
    const userAnswers = req.body.answers;
    // map through the quiz questions to determine which answers are correct
    const results = quiz.questions.map( ( q, index ) => ( {
      question: q.question,
      correct: q.correctAnswer === userAnswers[index],
    } ) );
    // calculate the score based on the number of correct answers
    const score = results.filter( r => r.correct ).length;
    res.send( { score, total: quiz.questions.length, results } );
  } catch ( error ) {
    res.status( 500 ).send( error );
  }
};