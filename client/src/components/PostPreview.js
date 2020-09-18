import React from 'react';

import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';

const PostPreview = props => {
    const text = (
        <>
            {props.body.split('\n').map((paragraph, index) => {
                return (
                    <div key={index}>
                        <p>{paragraph}</p>
                    </div>
                );
            })}
        </>
    );

    return (
        <>
            <h2>{props.title}</h2>
            <p>
                By <Link to={`/users/${props.user._id}`}>{props.user.name}</Link>.
                Created on {props.dateCreated.toLocaleString()}.
                { props.dateEdited ? ` Edited on ${props.dateEdited.toLocaleString()}.` : null}
            </p>
            <hr />
            <p><strong>Summary:</strong> {props.summary}</p>
            <hr />
            { text }
        </>
    );
}

PostPreview.propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    dateCreated: PropTypes.isRequired,
    user: PropTypes.isRequired
}

export default PostPreview;