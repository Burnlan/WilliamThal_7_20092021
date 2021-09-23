//we need jswt
const jwt = require('jsonwebtoken');

//our authentification module.
module.exports = (req, res, next) => {
    //we place everything inside a try catch for ease of debugging
    try {
        //we get the token the user is using using cookieParser
        const token = req.cookies['token'];
        //we decode the token using our rendom key
        const decodedToken = jwt.verify(token, "_7xx7sa4fcKoQ27nnuv3HZxWESHB2bweZoTG1QOw9SaBHE2EUNSTBbZGP0GaObFQLYor");
        //we get the user id from the decoded token
        const userId = decodedToken.userId;
        //we check that the userId in the token is validate. If not we throw an error, if it's ok we allow the process to continue
        if (req.body.userId && req.body.userId !== userId) {
            //if there is no match, we send a 401 response
            res.status(401).send();
        }
        else {
            //if everything is good we give the userId to the next function that will retrieve relevant user data
            next();
        }
    } catch {
        res.status(401).json({ error: new Error('Invalid request')  });
    }
};