const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

const userSchema = new mongoose.Schema( {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
} );

// Middleware function to run before saving the user
userSchema.pre( 'save', async function ( next ) {
  if ( this.isModified( 'password' ) ) {
    // Hash the password using bcrypt
    this.password = await bcrypt.hash( this.password, 8 );
  }
  next();   // move to next middleware
} );

module.exports = mongoose.model( 'User', userSchema );