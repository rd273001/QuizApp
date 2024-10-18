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