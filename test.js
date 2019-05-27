fetch('http://localhost:3030/login',{

    method: 'post',
    mode: 'no-cors',
    body: {
        email: 'abderafii.bel@gmail.com',
        password: 'myPassword'
    }
}).then(res=>res.json())
    .then(res=>console.log(res));