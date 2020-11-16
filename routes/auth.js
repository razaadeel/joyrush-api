const express = require('express');
const router = express.Router();

//Controllers
const authController = require('../controllers/authController');
//Middlewares
const auth = require('../middlewares/auth');


//SignUp Route
router.post('/signup', auth.checkSignUp, authController.signup);
// SignIn Route
router.post('/signin', auth.checkSignIn, authController.signin)

module.exports = router;