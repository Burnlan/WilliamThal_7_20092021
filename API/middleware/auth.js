//we need jswt
const jwt = require('jsonwebtoken');

//our authentification module.
module.exports = (req, res, next) => {
    try {
        //we get the id in the request
        const requestId = req.body.id;

        //then we get the token the user is using using cookieParser
        const token = req.cookies['token'];
        //we decode the token using our random key
        const decodedToken = jwt.verify(token, "_7xx7sa4fcKoQ27nnuv3HZxWESHB2bweZoTG1QOw9SaBHE2EUNSTBbZGP0GaObFQLYor");
        //we get the user id from the decoded token
        const tokenId = decodedToken.userId;
        //we check that the userId in the token is good. If not we throw an error, if it's ok we allow the process to continue
        if (requestId !== tokenId) {
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