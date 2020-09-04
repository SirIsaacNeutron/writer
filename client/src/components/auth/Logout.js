import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';

class Logout extends React.Component {
    render() {
        return (
            <>
                <NavLink onClick={this.props.logout} href='#'>Logout</NavLink>
            </>
        );
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout);