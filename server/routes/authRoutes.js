const express = require('express');
const router = express.Router();
const { register, login } = require( '../controllers/authController' );

// endpoint for handling user registration
router.post( '/register', register );

// endpoint for handling user login
router.post( '/login', login );

module.exports = router;