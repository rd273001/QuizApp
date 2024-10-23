const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

const userSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
} );

// Middleware function to run before saving the user
userSchema.pre( 'save', async function ( next ) {
  // if password is new or modified then hash the password
  if ( this.isModified( 'password' ) ) {
    // Hash the password using bcrypt
    this.password = await bcrypt.hash( this.password, 8 );
  }
  next();   // move to next middleware
} );

module.exports = mongoose.model( 'User', userSchema );