
const initialState = {
            isLogged: false,
            loginError: '',
            user: null,
            location: null
};

 const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "login":
            fetch('http://localhost:3030/login',{
                method: 'post',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    email: action.payload.login,
                    password: action.payload.password
                })
            }).then(res=>res.json())
                .then( res=>{
                    return Object.assign(state, {isLogged: true, user: res})
                })
                .catch(e=>console.log(e));
            break;
        case "logout":
            state = {
                ...state,
                isLogged: false,
                user: {}
            };
            break;
    }
    return state;
};

 export default userReducer;