const express = require('express');
const router = express.Router();

//Controllers
const profileController = require('../controllers/profileController');
//Middlewares
const auth = require('../middlewares/auth');




// Getting user by id
router.get('/', auth.verifyToken, profileController.getProfile);

module.exports = router;