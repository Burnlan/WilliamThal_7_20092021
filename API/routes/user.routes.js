//this router uses express
const express = require('express');
const router = express.Router();

//we import the controller for the users
const userCtrl = require('../controllers/user.controller.js');

//we set the routes for signup and login
router.post('/signup', userCtrl.signup);


//we export everything
module.exports = router;