import React from 'react';
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem
} from "reactstrap";

import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie';


const Header = () => {
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">UR-shops</NavbarBrand>
                <NavbarToggler/>
                <Collapse navbar>
                    { Cookies.get('access-token')? (
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
                                <NavLink to="/logout" activeClassName="is-active" className="nav-link">
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



export default Header