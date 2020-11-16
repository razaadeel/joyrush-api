const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        //  If User exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: 'failed',
                msg: 'Email already exists.',
            });
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
                res.json({
                    status: 'success',
                    token,
                });
            }
        )
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //  If User exists
        let user = await User.findOne({ email }).select('password');
        if (!user) {
            return res.status(400).json({
                status: 'failed',
                msg: 'Invalid Email/Password',
            });
        }

        //  Dencrypt Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                status: 'failed',
                msg: 'Invalid Email/Password',
            });
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
                res.json({
                    status: 'success',
                    token,
                });
            }
        )
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
}