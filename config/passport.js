const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('./Database');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        // Find the user by email
        db.query('SELECT COUNT(*) AS cnt FROM users WHERE id = ? ', jwt_payload.id, (err, data) => {
            // Check User
            if(!data[0].cnt > 0) {
                return done(null, false);
            }
            db.query('SELECT * FROM users WHERE id = ?', jwt_payload.id, (err, data) => {
                return done(null, data[0]);
            })
        });
    }));
}