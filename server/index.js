const express = require('express'),
session = require('express-session'),
passport = require('passport'),
Auth0Strategy = require('passport-auth0');
require('dotenv').config();

const {
SERVER_PORT,
SESSION_SECRET,
DOMAIN,
CLIENT_ID,
CLIENT_SECRET,
CALLBACK_URL
} = process.env;

const app = express();


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    done(null, profile);
} ))

//serialize passes the user object to the session store
passport.serializeUser(function(profile, done) {
    done(null, profile);
})
//deserialize takes the user object from the session store and puts it on req.user
passport.deserializeUser(function(profile, done) {
    done(null, profile);
})

app.get('/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect:'http://localhost:3000/#/',
    failureRedirect: 'http://localhost:3000'
}));


app.listen(SERVER_PORT, () => {console.log(`listening on ${SERVER_PORT}`)});