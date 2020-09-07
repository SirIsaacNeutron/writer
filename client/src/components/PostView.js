import React from 'react';

import { Link } from 'react-router-dom';

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
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/posts/${this.props.match.params.id}`)
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

    render() {
        const { title, summary, body, user, dateCreated } = this.state;

        return (
            <>
                <h2>{title}</h2>
                <h5>{summary}</h5>
                <p>By <Link to={`/users/${user._id}`}>{user.name}</Link></p>
                <p>Created on {dateCreated}</p>
                <p>{body}</p>
            </>
        );
    }
}

export default PostView;