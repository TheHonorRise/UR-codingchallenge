const initialState = {
    isLogged: false,
    user: {}
};

 const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "login":
            state = {
                ...state,
                isLogged: true
            };
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