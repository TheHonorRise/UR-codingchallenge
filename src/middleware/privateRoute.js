import {Redirect, Route} from "react-router-dom";
import React from 'react';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, ...props }) => {
    return (
        <Route
            {...props}
            render={innerProps =>
                Cookies.get('access-token') ?
                    <Component {...innerProps} />
                    :
                    <Redirect to="/login" />
            }
        />
    );
};




export default PrivateRoute;