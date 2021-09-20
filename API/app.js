
const express = require('express');
const mysql = require('mysql');

//init app using express
const app = express();

//allows use of JSON with express
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

//routes
const path = require('path');


//connect to the database
const con = mysql.createConnection({
  host: "localhost",
  user: "Tester",
  password: "oraora",
  database: "elevage"
});

//connect or throw error if connectionw as unsuccessfull
con.connect( err => {
  if (err) throw err;
  console.log("connected !");
  con.query("select * from animal", (err, result, fields) => {
    if (err) throw err;
    console.log(result[5].nom);
  });
});

//allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//let server access the images folder
app.use('/images', express.static(path.join(__dirname, 'images')));


//what the server does on request, aka our routes
/*
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
*/
module.exports = app;