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
            return res.status(401).json({ error: "No match" })
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
                    let token = jwt.sign(
                            //the payload is the user id
                            { userId: foundUser.id },
                            //We used a randomly generated key to encrypt the data
                            "_7xx7sa4fcKoQ27nnuv3HZxWESHB2bweZoTG1QOw9SaBHE2EUNSTBbZGP0GaObFQLYor",
                            //the token will be valid for 24h
                            { expiresIn: "24h"}
                        )
                    //we store the token in a secure cookie that's be used for authentification
                    res.cookie("token", token, { httpOnly: true });
                    //now we store relevant session info into a userData object
                    let userData = {
                        id: foundUser.id,
                        firstname: foundUser.firstname,
                        lastname: foundUser.lastname,
                        pictureUrl: foundUser.pictureUrl
                    }
                    //we pass userData in our user session
                    req.session.userData = userData;
                    //we save the new session data
                    req.session.save();
                    //we send a 200 ok status 
                    res.status(200).send();
                })
                .catch(error => res.status(500).json({ error: error }));
        }
    });
};

exports.checkSession = (req, res, next) => {
    //we check if a session has userData, if so it means that the user is connected.
    console.log(req.session.userData);
    if(req.session.userData) {
        //we send back the user data
        res.status(200).json(req.session.userData);
    } else {
        res.status(404).send();
    }
};

exports.disconnect = (req, res, next) => {
    //this destroys the user session
    req.session.destroy(() =>{
        res.status(200).send();
    });
};

exports.updateProfilePicture = (req, res, next) => {
    console.log(req.file);
    res.status(200).json({ "url": `${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
};