import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    Container
} from 'reactstrap';

// See https://github.com/reactstrap/reactstrap/issues/1285 for
// how to use React Router with reactstrap
import { NavLink as RRNavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavbar extends React.Component {
    state = {
        isOpen: false // for the collapsible menu
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const guestLinks = (
            <>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/users">Users</NavLink>
                </NavItem>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </>
        );

        const authLinks = (
            <>
                <NavItem>
                    <span className="navbar-text text-white mr-3">
                        <strong>{user ? `Welcome, ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/create-post">Create Post</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/users">Users</NavLink>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </>
        );


        return (
            <div>
                <Navbar expand="sm" className="mb-3 my-navbar">
                    <Container>
                        <NavbarBrand tag={RRNavLink} exact to="/" 
                        className="my-navbar-brand">Writer</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                { isAuthenticated ? authLinks : guestLinks }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth // from rootReducer
});

export default connect(mapStateToProps, null)(AppNavbar);