//this router uses express
const express = require('express');
const router = express.Router();

//we import the controller for the users and the auth middleware
const userCtrl = require('../controllers/user.controller.js');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');

//we set the routes for signup and login
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/checkSession', userCtrl.checkSession);
router.get('/disconnect', userCtrl.disconnect);
router.post('/updateprofilepicture', multer, userCtrl.updateProfilePicture);
router.get('/getgroups', userCtrl.getGroups);

//we export everything
module.exports = router;