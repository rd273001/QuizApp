const User = require( '../models/User' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );

// Controller for user registration
exports.register = async ( req, res ) => {
  const { email } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne( { email } );
    if ( existingUser ) {
      return res.status( 409 ).json( { message: 'Email  already exists' } );
    }
    const user = new User( req.body );
    // password will be hashed before saving User as pre() hook is applied on User schema for save
    await user.save();
    res.status( 201 ).json( { message: 'User registered successfully' } );
  } catch ( error ) {
    res.status( 500 ).json( error );
  }
};

// Controller for user login
exports.login = async ( req, res ) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne( { email } );
    // Check if the user does not exist or if the password is incorrect
    if ( !existingUser || !( await bcrypt.compare( password, existingUser.password ) ) ) {
      return res.status( 401 ).json( { message: 'Invalid email or password' } );
    }
    // If the user is valid, create a JWT token with the user's ID
    const token = jwt.sign( { _id: existingUser._id }, process.env.JWT_SECRET );
    res.json( { user: { name: existingUser.name, email: existingUser.email }, token } );
  } catch ( error ) {
    res.status( 500 ).json( error );
  }
};

// Controller for user restoration if token exists(when User did not logout before closing)
exports.restoreUser = async ( req, res ) => {
  try {
    const user = req.user; // The user will be attached by the auth middleware
    res.status( 200 ).json( { user: { name: user.name, email: user.email } } );
  } catch ( error ) {
    res.status( 500 ).json( { message: 'Failed to restore user session', error: error.message } );
  }
};