const express = require('express');
const router = express.Router();
const db = require('../../config/Database');
const passport = require('passport');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

// @route   GET api/profile
// @desc    Get Current User's profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    db.query('SELECT COUNT(*) AS cnt FROM profile WHERE userid = ? ', req.user.id, function(err, data){
        if(err) {
            console.log(err);
        } else {
            // Check User
            if(!data[0].cnt > 0) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }

            res.json(data[0]);
        }
    });
});

// @route   GET api/profile
// @desc    Create or Edit User profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {};
    profileFields.userid = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skills - Split into array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // Social Links
    const profileSocial = {};
    if(req.body.youtube) profileSocial.youtube = req.body.youtube;
    if(req.body.twitter) profileSocial.twitter = req.body.twitter;
    if(req.body.facebook) profileSocial.facebook = req.body.facebook;
    if(req.body.linkedin) profileSocial.linkedin = req.body.linkedin;
    if(req.body.instagram) profileSocial.instagram = req.body.instagram;

    // console.log(profileFields);

    db.query('SELECT COUNT(*) AS cnt FROM profile WHERE userid = ? ', req.user.id, function(err, data){
        if(err) {
            console.log(err);
        } else {
            // Edit Profile
            if(data[0].cnt > 0) {
                db.query('UPDATE profile SET ? WHERE userid = ?',[profileFields, req.user.id], function(err, result){
                    if(err) console.log(err);

                    res.json({'msg':'Profile Updated'})
                });
            } else {
                db.query('INSERT INTO profile SET ?', profileFields, function(err, result){
                    if(err) console.log(err);

                    res.json({'msg':'Profile Created'});
                });
            }
        }
    });
    
    db.query('SELECT COUNT(*) AS cnt FROM social WHERE userid = ? ', req.user.id, function(err, data){
        if(err) {
            console.log(err);
        } else {
            // Edit Profile
            if(data[0].cnt > 0) {
                db.query('UPDATE social SET ? WHERE userid = ?', [profileSocial, req.user.id], function(err, result){
                    if(err) console.log(err);

                    res.json({'msg':'Profile Updated'})
                });
            } else {
                db.query('INSERT INTO profile SET ? ', profileSocial, function(err, result){
                    if(err) console.log(err);

                    res.json({'msg':'Profile Created'});
                });
            }
        }
    });
});

module.exports = router;