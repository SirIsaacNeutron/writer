import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    NavLink,
    Alert
} from 'reactstrap';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import { LOGIN_FAIL } from '../../actions/types';

class LoginModal extends React.Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if (error.id === LOGIN_FAIL) {
                this.setState({
                    msg: error.msg.msg
                });
            }
            else {
                this.setState({ msg: null })
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // clearErrors() prevents the previous error message from showing up
        // when the modal is re-opened
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }
    // Using [e.target.name] allows onChange to be used with multiple state vars
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        
        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        this.props.login(user);
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#login">Login</NavLink>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input className="form-control"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your email"
                                required
                                onChange={this.onChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input className="form-control"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Your password"
                                required
                                onChange={this.onChange} />
                            </div>

                            <div className="form-group">
                                <button
                                type="submit"
                                className="btn btn-block btn-outline-success">Login</button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated, // from authReducer
    error: state.error
});

export default connect(
    mapStateToProps, 
    { login, clearErrors })(LoginModal);
