const express = require('express'),
session = require('express-session'),
massive = require('massive'),
passport = require('passport'),
Auth0Strategy = require('passport-auth0');
require('dotenv').config();

const checkSession = require('./middleware/checkForSession');

const {
SERVER_PORT,
SESSION_SECRET,
DOMAIN,
CLIENT_ID,
CLIENT_SECRET,
CALLBACK_URL,
CONNECT_STR
} = process.env;

const app = express();

massive(CONNECT_STR).then( (db) => {
    console.log('db connected');
    app.set('db', db);
    // app.get('db').seed_file().then( () => {
    //     console.log('db seed planted');
    // } )
})


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 20000
    }
}));
//app.use(checkSession);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    let db = app.get('db');
    let {displayName, user_id, picture} = profile;
    db.find_user([user_id]).then( (foundUser) => {
        if (foundUser[0]) {
            done(null, foundUser[0].id);
        } else {
            db.create_user([displayName, user_id, picture]).then((user) => {
                done(null, user[0].id);
            })
        }
    })
    
} ))
//serialize passes the user object to the session store
passport.serializeUser(function(id, done) {
    done(null, id);
})
//deserialize takes the user object from the session store and puts it on req.user
passport.deserializeUser(function(id, done) {
    app.get('db').find_session_user([id]).then( user => {
        done(null, user[0]);
    })
})

app.get('/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect:'http://localhost:3000/#/medium',
    failureRedirect: 'http://localhost:3000/#/loginFailure'
}));

app.get('/auth/me', (req, res) => {
    if (req.user) {
        res.status(200).send(req.user)
    }  else {
        res.sendStatus(401);
    }
})



app.listen(SERVER_PORT, () => {console.log(`listening on ${SERVER_PORT}`)});