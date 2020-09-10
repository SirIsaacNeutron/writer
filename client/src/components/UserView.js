import React from 'react';

import axios from 'axios';

import { Helmet } from 'react-helmet';

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
        axios.get(`/api/users/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                name: res.data.user.name
            })
        })
        .catch(err => console.log(err));

        axios.get(`/api/users/${this.props.match.params.id}/posts`)
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
                <Helmet>
                    <title>{this.state.name}</title>
                </Helmet>

                <h2>{name}</h2>
                {posts.map(p => {
                    const dateCreated = new Date(p.dateCreated);
                    let dateEdited = null;
                    if (p.dateEdited) { dateEdited = new Date(p.dateEdited); }
                    return (
                        <div key={p._id} className="mb-1">
                            <Link to={`/posts/${p._id}`}><h3>{p.title}</h3></Link>
                            <p className="mb-1 font-italic">{p.summary}</p>
                            <p> 
                                { dateCreated.toLocaleString() }
                                { dateEdited ? `. Updated on ${dateEdited.toLocaleString()}` : null }
                            </p>
                        </div>
                    );
                })}
            </>
        );
    }
}

export default UserView;