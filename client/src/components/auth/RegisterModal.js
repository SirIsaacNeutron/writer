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

import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { REGISTER_FAIL } from '../../actions/types';

class RegisterModal extends React.Component {
    state = {
        isOpen: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if (error.id === REGISTER_FAIL) {
                this.setState({
                    msg: error.msg.msg
                });
            }
            else {
                this.setState({ msg: null })
            }
        }

        // If authenticated, close modal
        if (this.state.isOpen) {
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
            isOpen: !this.state.isOpen
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

        const { name, email, password } = this.state;

        const newUser = {
            name, 
            email, 
            password
        };
        
        this.props.register(newUser);
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#register">Register</NavLink>

                <Modal
                isOpen={this.state.isOpen}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input className="form-control"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="A username"
                                required
                                onChange={this.onChange} />
                            </div>

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
                                className="btn btn-block btn-outline-success"
                                >Register</button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated, // from authReducer
    error: state.error
});

export default connect(
    mapStateToProps, 
    { register, clearErrors })(RegisterModal);
