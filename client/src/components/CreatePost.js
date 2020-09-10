import React from 'react';

import axios from 'axios';

import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import PostForm from './PostForm';

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
        }

        const requestBody = JSON.stringify(newPost);

        axios.post('/api/posts/', requestBody, config)
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
                <Helmet>
                    <title>Create Post</title>
                </Helmet>

                <h2>Create Post</h2>
                { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                <PostForm onSubmit={this.onSubmit} onChange={this.onChange}
                title={this.state.title} summary={this.state.summary} body={this.state.body} />
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