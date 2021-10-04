//this router uses express
const express = require('express');
const router = express.Router();

//we import the controller for the users and the auth middleware
const userCtrl = require('../controllers/user.controller.js');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');

//we set the routes for anything related to a user session and/or profile
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/checkSession', userCtrl.checkSession);
router.get('/disconnect', userCtrl.disconnect);
router.post('/updateprofilepicture', auth, multer, userCtrl.updateProfilePicture);
router.get('/getgroups', auth, userCtrl.getGroups);
router.get('/delete', auth, userCtrl.delete);
router.get('/getallgroups', auth, userCtrl.getAllGroups);
router.post('/joingroup', auth, userCtrl.joinGroup);
router.post('/quitgroup', auth, userCtrl.quitGroup);
router.post('/isingroup', auth, userCtrl.inGroup);

//we export everything
module.exports = router;