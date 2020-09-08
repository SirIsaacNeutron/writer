import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

class UserView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            posts: [],
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/users/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                name: res.data.user.name
            })
        })
        .catch(err => console.log(err));

        axios.get(`http://localhost:5000/api/users/${this.props.match.params.id}/posts`)
        .then(res => {
            this.setState({
                posts: res.data.posts
            })
        })
        .catch(err => console.log(err));
    }

    render() {
        const { name, posts } = this.state; 
        return (
            <>
                <h2>{name}</h2>
                {posts.map(p => {
                    return (
                        <Link key={p._id} to={`/posts/${p._id}`}><h3>{p.title}</h3></Link>
                    );
                })}
            </>
        );
    }
}

export default UserView;