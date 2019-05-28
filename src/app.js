import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import PrivateRoute from './middleware/privateRoute';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.css';

import PreferredShops from "./component/preferred/preferredShops";
import Login from "./component/login/login";
import Index from './component/index/index';
import SignUp from './component/signup/signUp';
import Cookies from "js-cookie";

console.log(Cookies.get('access-token'));

const redir = ()=>{
   return <Redirect to="/nearby"/>;
};
const Logout = ()=>{
    Cookies.remove('access-token');
    return <Redirect to="/login"/>;
};


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/" component={redir}/>
                <PrivateRoute exact path="/nearby" component={Index}/>
                <PrivateRoute exact path="/Preferred" component={PreferredShops}/>
                <Route exact path='/logout' component={Logout}/>
                <Route exact path="/signUp" component={SignUp}/>
                <Route exact path="/login" component={Login}/>

                <Route/>
            </Switch>
        </BrowserRouter>
    );
};


ReactDom.render(<App/>,
    document.getElementById('root')
);