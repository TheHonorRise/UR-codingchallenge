import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import userReducer from "./reducers/userReducer";
import PrivateRoute from './middleware/privateRoute'
// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         // is logged
//         //     ? <Component {...props} />
//         //     : <Redirect to='/login' />
//     )} />
// )
const Index = ()=> {
    return <div>index</div> ;
};

const Login = ()=> {
    return <div>Login</div>;
};

const store = createStore(userReducer);

store.subscribe(() => {
    console.log("Store Updated!", store.getState());
});


const App = () => {
    return (
        <BrowserRouter>
            <h1>Webpack Working</h1>
            <Switch>
                <PrivateRoute exact path="/" component={Index}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </BrowserRouter>
    );
};


ReactDom.render(
    <Provider store={store}> <App/></Provider>
    , document.getElementById('root'));