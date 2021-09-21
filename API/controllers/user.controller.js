//this controller requires the user model, bcrypt and json web token
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//function to sign a user up
exports.signup = (req, res, next) => {
    //first we hash the password
    bcrypt.hash(req.body.password, 10)
    //then we create a new user that has the inputted email and the hashed password
        .then( hash => {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            })
        console.log(user);
        //now we save the user in  the database
        User.create(user)
            .then(() => res.status(201).json({ message: 'New user created'}))
            .catch(error => res.status(400).json({ error }));
        
        })
};
