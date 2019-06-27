const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require('../../config/Database');
const keys = require('../../config/keys');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route   GET api/users/register
// @desc    Register User
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors)
    }

    db.query('SELECT COUNT(*) AS cnt FROM users WHERE email = ? ', req.body.email, function(err, data){
        if(err) {
            console.log(err);
        } else {
            if(data[0].cnt > 0) {
                errors.email = 'Email alreay exists';
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                
                const userData = {
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    date: new Date()
                }
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(userData.password, salt, (err, hash) => {
                        if(err) console.log(err);
                        userData.password = hash;
                        db.query('INSERT INTO users SET ?', userData, function(err, result) {
                            if(err) {
                                console.log(err);
                            } else {
                                res.json(userData);
                            }
                        })
                    })
                })
            }
        }
    });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors)
    }

    // Find the user by email
    db.query('SELECT COUNT(*) AS cnt FROM users WHERE email = ? ', email, function(err, data){
        if(err) {
            console.log(err);
        } else {
            // Check User
            if(!data[0].cnt > 0) {
                errors.email = 'Email alreay exists';
                return res.status(404).json(errors);
            }

            // Fetch Password
            db.query('SELECT * FROM users WHERE email = ? ', email, function(err, data) {
                // Check Password
                bcrypt.compare(password, data[0].password)
                    .then(isMatch => {
                        if(isMatch) {
                            // User Matched

                            const payload = {id:data[0].id, name:data[0].name, avatar:data[0].avatar} // Create Payload
                            // Sign Token
                            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                        } else {
                            errors.password = 'Password Incorrect';
                            return res.status(400).json(errors);
                        }
                    })
            });

        }
    });
});

// @route   GET api/users/current
// @desc    Return Current User
// @access  private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;