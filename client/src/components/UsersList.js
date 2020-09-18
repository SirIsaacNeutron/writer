import React from 'react';

import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import axios from 'axios';

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('/api/users')
        .then(res => {
            this.setState({
                users: res.data.users
            })
        })
    }

    render() {
        const { users } = this.state;
        
        return (
            <>
                <Helmet>
                    <title>Users</title>
                </Helmet>

                <h2>All Users</h2>
                <div className="row">
                    {users.map(u => {
                        return (
                            <div key={u._id} className="col-lg-2 col-md-3 col-sm-6 d-flex mb-2">
                                <Link to={`/users/${u._id}`}>
                                    <h3>{u.name}</h3>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

export default UsersList;