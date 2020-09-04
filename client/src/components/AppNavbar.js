import React, { Component } from 'react';
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

import PropTypes from 'prop-types';

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
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-3">
                    <Container>
                        <NavbarBrand tag={RRNavLink} exact to="/">Writer</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default AppNavbar;