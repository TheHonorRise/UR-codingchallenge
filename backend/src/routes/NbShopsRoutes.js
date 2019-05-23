import {signUpUser, signInUser} from "../controllers/userController";

export default function routes(app) {
    // app.route('/shops')
    //     .get(middle,getShops);

    app.route('/register')
        .post(signUpUser);

    app.route('/login')
        .post(signInUser)
}