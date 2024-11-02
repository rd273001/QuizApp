const jwt = require( 'jsonwebtoken' );
const User = require( '../models/User' );

const auth = async ( req, res, next ) => {
  try {
    // Extract the token from Authorization header
    const token = extractToken( req.header( 'Authorization' ) );
    // verify token using JWT_SECRET
    const decoded = jwt.verify( token, process.env.JWT_SECRET );
    // find user associated with the token
    const user = await User.findById( { _id: decoded._id }, '-password -id' );  // excluding password and id

    if ( !user ) {
      return res.status( 401 ).json( { error: 'Unauthorized: User not found' } );
    }
    // attach the token & user to the request object
    req.token = token;
    req.user = user;
    next();
  } catch ( error ) {
    res.status( 401 ).json( { message: 'Unauthorized', error } );
  }
};

const extractToken = ( authHeader ) => {
  if ( !authHeader || !authHeader.startsWith( 'Bearer ' ) ) {
    throw new Error( 'Authorization header is missing or malformed' );
  }
  return authHeader.replace( 'Bearer ', '' );
};

module.exports = auth;