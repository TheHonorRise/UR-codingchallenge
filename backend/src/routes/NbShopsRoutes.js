
function middle(req, res, next){
    console.log('trying middleware');
    next();
}

function getShops(req, res) {
    console.log('req handler');
    res.send('list of shops')
}

export default function routes(app) {
    app.route('/shops')
        .get(middle,getShops);





    app.route('/register')
        .post(signUpUser);

    app.route('/login')
        .post(signInUser)
}