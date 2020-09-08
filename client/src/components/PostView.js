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
        let { title, summary, body, user, dateCreated } = this.state;

        dateCreated = new Date(dateCreated);
        return (
            <>
                <h2>{title}</h2>
                <p>
                    By <Link to={`/users/${user._id}`}>{user.name}</Link>.
                    Created on {dateCreated.toLocaleString()}.
                </p>
                <hr />
                <p><strong>Summary:</strong> {summary}</p>
                <hr />
                <p>{body}</p>
            </>
        );
    }
}

export default PostView;