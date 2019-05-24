import {signUpUser, signInUser} from "../controllers/userController";
import {jwtMiddleware} from "../middlewares/jwtMiddleware";
import {getNearbyshops} from "../controllers/shopController";



export default function routes(app) {
    app.route('/shops')
        .get(jwtMiddleware,getNearbyshops);

    app.route('/register')
        .post(signUpUser);

    app.route('/login')
        .post(signInUser)
}