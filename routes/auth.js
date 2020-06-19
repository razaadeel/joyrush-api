const express = require('express');
const auth = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/User');

//SignUp Route
router.post('/signup',
    [
        check('name', 'Name is Required').not().isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Please Enter a password of 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const { name, email, password } = req.body;

        try {
            //  If User exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: [{ msg: 'Email already exists.' }] })
            }

            user = new User({
                name,
                email,
                password,
            });

            //  Encrypt Password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt)

            await user.save();

            // Return JSONWEBTOKEN
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            )
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('SERVER ERROR');
        }
    }
);

// Getting user by id
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// SignIn Route
router.post('/signin',
    [
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const { email, password } = req.body;

        try {
            //  If User exists
            let user = await User.findOne({ email }).select('password');
            if (!user) {
                return res.status(400).json({ error: [{ msg: 'Invalid Email/Password' }] })
            }

            //  Dencrypt Password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ error: [{ msg: 'Invalid Email/Password' }] })
            }

            // Return JSONWEBTOKEN
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            )
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('SERVER ERROR');
        }
    }
)

module.exports = router;