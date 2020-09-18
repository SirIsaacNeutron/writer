import React from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import PostForm from './PostForm';

import PostPreview from './PostPreview';
import PostFormHelper from './PostFormHelper';

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
            <div className="d-flex mb-4 mt-4">
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

        let dateEdited = null;
        if (this.state.dateEdited !== '') {
            dateEdited = new Date(this.state.dateEdited);
        }

        const sampleDateEdited = new Date();

        // Note: postView doesn't show dateEdited immediately after 
        // editing; the user has to visit the page again in order for it to
        // show.
        const postView = (
            <>
                <PostPreview title={title} summary={summary} body={body}
                user={user} dateCreated={dateCreated} dateEdited={dateEdited}/>
                { canControl ? controls : null }
            </>
        );
        
        const postEditView = (
            <>
                { /*<a className="mb-2" target="_blank" href="https://guides.github.com/features/mastering-markdown/">Text Formatting Guide</a>
                <p>
                    <button className="btn btn-outline-primary" type="button" 
                    data-toggle="collapse" data-target="#preview" 
                    aria-expanded="false" 
                    aria-controls="preview">
                        Preview
                    </button>
                </p>
                <div className="collapse" id="preview">
                    <div className="card card-body">
                        <PostPreview title={this.state.title} summary={this.state.summary}
                        body={this.state.body} user={user} dateCreated={dateCreated} 
                        dateEdited={sampleDateEdited} />
                    </div>
                </div> */ } 
                <PostFormHelper title={this.state.title} summary={this.state.summary}
                body={this.state.body} user={user} dateCreated={dateCreated} 
                dateEdited={sampleDateEdited} />
                <PostForm edit onSubmit={this.onSubmit} onChange={this.onChange}
                title={this.state.title} summary={this.state.summary} body={this.state.body} />
            </>
        );

        return (
            <>
                <Helmet>
                    <title>{this.state.title}</title>
                </Helmet>

                { this.state.isEditing ?
                postEditView
                : postView }
            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(PostView);