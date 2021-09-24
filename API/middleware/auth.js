//we need jswt
const jwt = require('jsonwebtoken');

//our authentification module.
module.exports = (req, res, next) => {
    try {
        //we get the id in the user session
        const sessionId = req.session.userData.id;

        //then we get the token the user is using using cookieParser
        const token = req.cookies['token'];
        //we decode the token using our random key
        const decodedToken = jwt.verify(token, "_7xx7sa4fcKoQ27nnuv3HZxWESHB2bweZoTG1QOw9SaBHE2EUNSTBbZGP0GaObFQLYor");
        //we get the user id from the decoded token
        const tokenId = decodedToken.userId;
        //we check that the userId in the token and the userId in the session are the same. If not we throw an error, if it's ok we allow the process to continue
        if (sessionId !== tokenId) {
            //if there is no match, we send a 401 response
            res.status(401).send();
        }
        else {
            //if everything is good we can proceed to the next function in route
            console.log("all is good");
            next();
        }
    } catch {
        res.status(401).json({ error: new Error('Invalid request')  });
    }
};