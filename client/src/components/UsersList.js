import React from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/users')
        .then(res => {
            this.setState({
                users: res.data.users
            })
        })
    }

    render() {
        const { users } = this.state;
        
        console.log(users);
        return (
            <>
                <h2>All Users</h2>
                { users.map(u => {
                    return (
                        <Link to={`/users/${u._id}`}>
                            <h3>{u.name}</h3>
                        </Link>
                    );
                }) }
            </>
        );
    }
}

export default UsersList;