import React from 'react';

import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import PostForm from './PostForm';

import axios from 'axios';

class PostView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            summary: '',
            body: '',
            user: {},
            dateCreated: '',
            dateEdited: '',
            wasDeleted: false,
            isEditing: false
        }
    }

    componentDidMount() {
        axios.get(`/api/posts/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                title: res.data.post.title,
                summary: res.data.post.summary,
                body: res.data.post.body,
                user: res.data.post.user,
                dateCreated: res.data.post.dateCreated
            })
            if (res.data.post.dateEdited) {
                this.setState({
                    dateEdited: res.data.post.dateEdited
                })
            }
        })
        .catch(err => console.log(err));
    }

    onDelete = e => {
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { user } = this.props.auth;
        if (!user) {
            this.setState({
                msg: "You must be logged in to delete posts."
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

        axios.delete(`/api/posts/${this.props.match.params.id}`, config)
        .then(res => {
            this.setState({
                wasDeleted: true
            })
        })
        .catch(err => console.log(err));
    }

    startEditing = () => {
        this.setState({
            isEditing: true,
        })
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
            dateEdited: Date.now()
        }

        const requestBody = JSON.stringify(newPost);

        axios.post(`/api/posts/${this.props.match.params.id}/update`, requestBody, config)
        .then(res => {
            this.setState({
                isEditing: false,
            })
        })
    }

    render() {
        if (this.state.wasDeleted) {
            return (
                <Redirect to="/" />
            );
        }

        const canControl = (this.props.auth.isAuthenticated 
            && this.props.auth.user.id === this.state.user._id);

        let { title, summary, body, user, dateCreated } = this.state;
        
        const controls = (
            <div className="d-flex mb-4">
                <button 
                type="button" 
                className="btn btn-outline-danger mr-3"
                onClick={this.onDelete}>Delete</button>
                <button 
                type="button"
                className="btn btn-outline-success"
                onClick={this.startEditing}>Edit</button>
            </div>
        );

        dateCreated = new Date(dateCreated);

        let dateEdited = '';
        if (this.state.dateEdited !== '') {
            dateEdited = new Date(this.state.dateEdited);
        }

        // Note: postView doesn't show dateEdited immediately after 
        // editing; the user has to visit the page again in order for it to
        // show.
        const postView = (
            <>
                <h2>{title}</h2>
                <p>
                    By <Link to={`/users/${user._id}`}>{user.name}</Link>.
                    Created on {dateCreated.toLocaleString()}.
                    { this.state.dateEdited ? ` Edited on ${dateEdited.toLocaleString()}.` : null}
                </p>
                <hr />
                <p><strong>Summary:</strong> {summary}</p>
                <hr />
                {body.split('\n').map((paragraph, index) => {
                    return (
                        <div key={index}>
                            <p>{paragraph}</p>
                        </div>
                    );
                })}
                { canControl ? controls : null }
            </>
        );
        
        return (
            <>
                <Helmet>
                    <title>{this.state.title}</title>
                </Helmet>

                { this.state.isEditing ? 
                <PostForm edit onSubmit={this.onSubmit} onChange={this.onChange}
                title={this.state.title} summary={this.state.summary} body={this.state.body} />
                : postView }
            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(PostView);