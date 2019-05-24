import jwt from 'jsonwebtoken';
import config from './../../config'



export const jwtMiddleware = (req, res, next)=>{
    let token = req.headers['access_token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
            // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });next();
    }

};