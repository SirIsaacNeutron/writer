import React from 'react';

import axios from 'axios';

import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class CreatePost extends React.Component {
    state = {
        msg: null,
        title: '',
        summary: '',
        body: '',
        wasPostCreated: false,
        newPostID: '',
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const { title, summary, body } = this.state;

        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { user } = this.props.auth;
        if (!user) {
            this.setState({
                msg: "You must be logged in to create posts."
            });
            return;
        }

        const token = this.props.auth.token;
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        else {
            return;
        }

        const newPost = {
            title,
            summary,
            body,
            user: user.id
        }

        const requestBody = JSON.stringify(newPost);

        axios.post('http://localhost:5000/api/posts/', requestBody, config)
        .then(res => {
            this.setState({
                wasPostCreated: true,
                newPostID: res.data.post._id
            });
        })
        .catch(err => {
            this.setState({
                msg: "Server unable to create post."
            });
        });
    }

    render() {
        if (this.state.wasPostCreated) {
            return (
                <Redirect to={`/posts/${this.state.newPostID}`} />
            );
        }

        return (
            <>
                <h2>Create Post</h2>
                { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input 
                        className="form-control form-control-lg" 
                        type="text"
                        name="title"
                        id="title"
                        placeholder="A nice title for your post."
                        maxLength={300}
                        required
                        onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="summary">Summary:</label>
                        <input 
                        className="form-control" 
                        type="text"
                        name="summary"
                        id="summary"
                        placeholder="A short summary of your post."
                        maxLength={300}
                        required
                        onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <textarea 
                        className="form-control" 
                        name="body"
                        id="body"
                        placeholder="Your post's content."
                        required
                        onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <button
                        type="submit"
                        className="btn btn-outline-success">Create Post</button>
                    </div>
                </form>
            </>
        );
    }
}

CreatePost.propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, null)(CreatePost);