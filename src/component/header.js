import React, {Component} from 'react';
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem
} from "reactstrap";

import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";


class Header extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">UR-shops</NavbarBrand>
                    <NavbarToggler/>
                    <Collapse navbar>
                            {this.props.isLogged ? (
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink to="/nearby" className="nav-link" activeClassName="is-active">Nearby
                                            Shops</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/preferred" activeClassName="is-active" className="nav-link">My
                                            preferred
                                            Shops</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/login" activeClassName="is-active" className="nav-link">
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            ) : (
                                <Nav className="ml-auto">
                                    <NavItem>
                                        <NavLink to="/login" activeClassName="is-active" className="nav-link">
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/signUp" activeClassName="is-active" className="nav-link">
                                            SignUp
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            )}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLogged: state.isLogged,
    };
};


export default connect(mapStateToProps, null)(Header);