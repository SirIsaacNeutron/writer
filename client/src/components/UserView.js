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

        const postInfo = (
            <div className="row">
                {posts.map(p => {
                    const dateCreated = new Date(p.dateCreated);
                    let dateEdited = null;
                    if (p.dateEdited) { dateEdited = new Date(p.dateEdited); }
                    return (
                        <div key={p._id} className="col-lg-4 d-flex mb-2">
                            <div className="card flex-fill">
                                <div className="card-body">
                                    <Link className="card-title" to={`/posts/${p._id}`}><h3>{p.title}</h3></Link>
                                    <p className="mb-1 font-italic">{p.summary}</p>
                                    <p className="mb-1"> 
                                        { dateCreated.toLocaleString() }
                                    </p>
                                    { dateEdited ? <p>Updated on {dateEdited.toLocaleString()}.</p> : <p></p> }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
        // If there's just one Post on the bottom row and it wasn't edited,
        // then it will be a different size from the edited Posts on the row 
        // above. In short, the card sizes might be different for different rows.
        return (
            <>  
                <Helmet>
                    <title>{this.state.name}</title>
                </Helmet>

                <h2>{name}</h2>
                { postInfo }
            </>
        );
    }
}

export default UserView;