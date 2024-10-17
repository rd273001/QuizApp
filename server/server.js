const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );
const authRoutes = require( './routes/auth' );
const quizRoutes = require( './routes/quiz' );
require( 'dotenv' ).config();

const app = express();

// Middleware
app.use( cors() );
app.use( express.json() );

// Connect to MongoDB
mongoose.connect( process.env.MONGODB_URI )
  .then( () => console.log( 'MongoDB connected successfully... 🎉' ) )
  .catch( ( err ) => console.error( 'MongoDB connection error:', err ) );

// Routes
// app.use( '/api/auth', authRoutes );
// app.use( '/api/quiz', quizRoutes );

// Error handling middleware
app.use( ( err, req, res, next ) => {
  console.error( err.stack );
  res.status( 500 ).send( 'Something went wrong!' );
} );

const PORT = process.env.PORT || 5000;
// Start the server
app.listen( PORT, () =>
  console.log( `Server running on port ${ PORT }... 🛜` )
);