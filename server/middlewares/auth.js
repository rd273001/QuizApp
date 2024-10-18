const jwt = require( 'jsonwebtoken' );
const User = require( '../models/User' );

const auth = async ( req, res, next ) => {
  try {
    // Extract the token from Authorization header
    const token = req.header( 'Authorization' ).replace( 'Bearer ', '' );
    // verify token using JWT_SECRET
    const decoded = jwt.verify( token, process.env.JWT_SECRET );
    // find user associated with the token
    const user = await User.findOne( { _id: decoded._id } );

    if ( !user ) {
      throw new Error();
    }
    // attach the token & user to the request object
    req.token = token;
    req.user = user;
    next();
  } catch ( error ) {
    res.status( 401 ).send( { error: 'Please authenticate.' } );
  }
};

module.exports = auth;