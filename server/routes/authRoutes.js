const express = require('express');
const router = express.Router();
const { register, login, restoreUser } = require( '../controllers/authController' );
const auth = require( '../middlewares/auth' );

// endpoint for handling user registration
router.post( '/register', register );

// endpoint for handling user login
router.post( '/login', login );

// endpoint to restore the user session
router.get( '/restore', auth, restoreUser );

module.exports = router;