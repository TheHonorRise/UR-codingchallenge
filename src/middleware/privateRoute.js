import {Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';
import React from 'react';

const PrivateRoute = ({ component: Component, ...props }) => {
    return (
        <Route
            {...props}
            render={innerProps =>
                props.user ?
                    <Component {...innerProps} />
                    :
                    <Redirect to="/login" />
            }
        />
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.isLogged,
    };
};


export default connect(mapStateToProps,null)(PrivateRoute);