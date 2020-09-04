import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
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
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome, ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </>
        );


        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-3">
                    <Container>
                        <NavbarBrand tag={RRNavLink} exact to="/">Writer</NavbarBrand>
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