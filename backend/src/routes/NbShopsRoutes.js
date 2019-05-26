import {signUpUser, signInUser} from "../controllers/userController";
import {jwtMiddleware} from "../middlewares/jwtMiddleware";
import {
    addDislikedShop,
    addPreferredShop,
    getNearbyshops,
    getPreferedShops,
    removePreferredShop
} from "../controllers/shopController";



export default function routes(app) {
    app.route('/shops')
        .get(jwtMiddleware,getNearbyshops);

    app.route('/Preferred')
        .get(jwtMiddleware,getPreferedShops)
        .post(jwtMiddleware,addPreferredShop)
        .delete(jwtMiddleware,removePreferredShop);

    app.route('/dislike')
        .post(jwtMiddleware,addDislikedShop);

    app.route('/register')
        .post(signUpUser);

    app.route('/login')
        .post(signInUser);
}