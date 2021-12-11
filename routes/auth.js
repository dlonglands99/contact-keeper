const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../models/User');
const { validateRequest } = require('./utils');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    // this only gets executed if the auth check passes
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error')
    }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
    check('email', 'Plase include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    validateRequest(req, res);
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({msg: 'Invalid user credentials!'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({msg: 'Invalid user credentials!'});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;