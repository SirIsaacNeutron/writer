import React from 'react';

import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

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
            wasDeleted: false
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
            <div className="d-flex">
                <button 
                type="button" 
                className="btn btn-outline-danger"
                onClick={this.onDelete}>Delete</button>
            </div>
        );

        dateCreated = new Date(dateCreated);
        
        return (
            <>
                <Helmet>
                    <title>{this.state.title}</title>
                </Helmet>

                <h2>{title}</h2>
                <p>
                    By <Link to={`/users/${user._id}`}>{user.name}</Link>.
                    Created on {dateCreated.toLocaleString()}.
                </p>
                <hr />
                <p><strong>Summary:</strong> {summary}</p>
                <hr />
                <p>{body}</p>
                { canControl ? controls : null }
            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(PostView);