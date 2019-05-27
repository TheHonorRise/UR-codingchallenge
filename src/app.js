import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import userReducer from "./reducers/userReducer";
import PrivateRoute from './middleware/privateRoute';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.css';
import Header from "./component/header";
import PreferredShops from "./component/preferred/preferredShops";
import Login from "./component/login/login"
import Index from './component/index/index'


const store = createStore(userReducer);

store.subscribe(() => {
    console.log("Store Updated!", store.getState());
});

store.dispatch({type: 'logout'});

const redir = ()=>{
   return <Redirect to="/nearby"/>;
};
const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/" component={redir}/>
                <PrivateRoute exact path="/nearby" component={Index}/>
                <PrivateRoute exact path="/Preferred" component={PreferredShops}/>
                <Route exact path="/login" component={Login}/>
                <Route/>
            </Switch>
        </BrowserRouter>
    );
};


ReactDom.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
);