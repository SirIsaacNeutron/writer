import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

class Logout extends React.Component {
    render() {
        return (
            <>
                <NavLink tag={RRNavLink} to="/" onClick={this.props.logout}>Logout</NavLink>
            </>
        );
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout);