//this router uses express
const express = require('express');
const router = express.Router();

//we import the controller for the users and the auth middleware
const userCtrl = require('../controllers/user.controller.js');
const auth = require('../middleware/auth.js');

//we set the routes for signup and login
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/checkSession', userCtrl.checkSession);

//we export everything
module.exports = router;