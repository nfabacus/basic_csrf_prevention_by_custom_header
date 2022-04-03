const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session'); // require cookie session
// const { randomBytes } = require('crypto');

const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());

// set up the cookie for the session
app.use(cookieSession({
    name: 'session',                              // name of the cookie
    secret: 'MAKE_THIS_SECRET_SECURE',            // key to encode session
    maxAge: 24 * 60 * 60 * 1000,                  // cookie's lifespan
    sameSite: 'lax',                              // controls when cookies are sent
    path: '/',                                    // explicitly set this for security purposes
    secure: process.env.NODE_ENV === 'production',// cookie only sent on HTTPS
    httpOnly: true                                // cookie is not available to JavaScript (client)
}));

app.get('/', (req, res) => {
    req.session.userId = '123fdsafdsa';
    // const csrf_token = randomBytes(100).toString('base64');
    // res.render('index', { csrf_token });
    // res.append('csrf_token', csrf_token);  // just to show how to ad to header from server, but maybe not useful here.
    // res.cookie('x-csrf-token', csrf_token); // just to show how to add custom cookie for double submission technique.
    res.render('index');
});

app.post('/api/submit', (req, res) => {
    console.log('req.session.userId >> ', req.session.userId);
    // console.log('x-csrf-token from request header >> ', req.get('x-csrf-token'));
    // console.log('x-csrf-token from request header readable cookie', req.cookies['x-csrf-token']);
    console.log('req.body >> ', req.body.fname);
    if(req.get('x-csrf-token')) {
        res.json({ message: "success! csrf token received" });
    } else {
        res.status(401);
        res.json({ message: "failure! csrf token NOT received" });
    }
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})