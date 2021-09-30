//this router uses express
const express = require('express');
const router = express.Router();

//we import the controller for the users and the auth middleware
const feedCtrl = require('../controllers/feed.controller.js');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');

//we set the routes for signup and login
router.post('/createpost', auth, feedCtrl.createPost);
router.post('/getposts', auth, feedCtrl.getPosts);
router.post('/archivepost', auth, feedCtrl.archivePost);
router.post('/reply', auth, feedCtrl.reply);

//we export everything
module.exports = router;