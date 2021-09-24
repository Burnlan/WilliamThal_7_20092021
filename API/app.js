
//we import our modules
const express = require('express');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

//init app using express
const app = express();

//allows use of JSON with express
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

//allow use of cookie-parser
app.use(cookieParser());

//routes
const userRoutes = require('./routes/user.routes.js');
const path = require('path');

//allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//let server access the images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

//set up the sessions
//js uses ms so we have to convert our 24h expiration time in ms
const oneDay = 1000*60*60*24;

//we set up the sessions parameter
app.use(sessions({
    //we give a random key
    secret: "Uf148vnIdscfLSjeCbrjRx1eSOvVWb7cgdM8SzYB",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//what the server does on request, aka our routes
app.use('/api', userRoutes);

module.exports = app;