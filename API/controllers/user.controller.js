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
        });
};

//function to log in, and give a token to keep the session active
exports.login = (req, res, next) => {
    //we search if a user with the given email exists
    User.findByMail(req.body.email, (err, foundUser) => {
        if (err) {
            //if it's unsuccessfull
        } else {
            //if the user exists, it's returned in an object
            //we use bcrypt to check if the request used the right password
            bcrypt.compare(req.body.password, foundUser.password)
                .then(valid => {
                    //if the password is invalid
                    if(!valid) {
                        return res.status(401).json({ error: "Wrong password !"});
                    }
                    //if the passwords match we create a token with the id
                    console.log("creating token for : "+foundUser.firstname);
                    let token = jwt.sign(
                            //the payload is the user id
                            { userId: foundUser.id },
                            //We used a randomly generated key to encrypt the data
                            "_7xx7sa4fcKoQ27nnuv3HZxWESHB2bweZoTG1QOw9SaBHE2EUNSTBbZGP0GaObFQLYor",
                            //the token will be valid for 12h
                            { expiresIn: "12h"}
                        )
                    //we store the token in a secure cookie
                    res.cookie("token", token, {httpOnly: true});
                    res.status(201).json();

                })
                .catch(error => res.status(500).json({ error: error }));
        }
    });
};

