const User = require( '../models/User' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );

// Controller for user registration
exports.register = async ( req, res ) => {
  try {
    const user = new User( req.body );
    await user.save();
    res.status( 201 ).send( { message: 'User registered successfully' } );
  } catch ( error ) {
    res.status( 400 ).send( error );
  }
};

// Controller for user login
exports.login = async ( req, res ) => {
  try {
    const user = await User.findOne( { username: req.body.username } );
    
    if ( !user || !( await bcrypt.compare( req.body.password, user.password ) ) ) {
      return res.status( 401 ).send( { message: 'Invalid username or password!' } );
    }
    const token = jwt.sign( { _id: user._id }, process.env.JWT_SECRET );
    res.send( { user, token } );
  } catch ( error ) {
    res.status( 400 ).send( error );
  }
};