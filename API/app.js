
const express = require('express');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

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


//what the server does on request, aka our routes
app.use('/api', userRoutes);

module.exports = app;