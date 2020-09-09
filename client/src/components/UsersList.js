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
                { users.map(u => {
                    return (
                        <Link key={u._id} to={`/users/${u._id}`}>
                            <h3>{u.name}</h3>
                        </Link>
                    );
                }) }
            </>
        );
    }
}

export default UsersList;