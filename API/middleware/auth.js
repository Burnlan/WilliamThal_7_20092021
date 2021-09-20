//we need jswt
const jwt = require('jsonwebtoken');
const { validate } = require('../models/user');

//our authentification module.
module.exports = (req, res, next) => {
    //we place everything inside a try catch for ease of debugging
    try {
        //we get the token the user is using
        const token = req.headers.authorization.split(' ')[1];
        //we decode the token using our rendom key
        const decodedToken = jwt.verify(token, "ZAmBl5DDlQoPX7LOTSItxdCQs2BXvYZdh9aZ09g7PWLMPfm1lGHJGh1i6JspVP6");
        //we get the user id from the decoded token
        const userId = decodedToken.userId;
        //we check that the userId in the token is validate. If not we throw an error, if it's ok we allow the process to continue
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Unauthorized access : invalid token';
        }
        else {
            next();
        }
    } catch {
        res.status(401).json({ error: new Error('Invalid request')  });
    }
};