import React from 'react';

import PropTypes from 'prop-types'

const PostForm = props => {
    return (
        <form onSubmit={props.onSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input 
                className="form-control form-control-lg" 
                type="text"
                name="title"
                id="title"
                placeholder="A nice title for your post."
                maxLength={300}
                required
                value={props.title}
                onChange={props.onChange} />
            </div>

            <div className="form-group">
                <label htmlFor="summary">Summary:</label>
                <input 
                className="form-control" 
                type="text"
                name="summary"
                id="summary"
                placeholder="A short summary of your post."
                maxLength={300}
                required
                value={props.summary}
                onChange={props.onChange} />
            </div>

            <div className="form-group">
                <label htmlFor="body">Body:</label>
                <textarea 
                className="form-control" 
                name="body"
                id="body"
                placeholder="Your post's content."
                required
                value={props.body}
                onChange={props.onChange} />
            </div>

            <div className="form-group">
                <button
                type="submit"
                className="btn btn-outline-success">{ props.edit ? 'Update Post' : 'Create Post' }</button>
            </div>
        </form>
    );
}

PostForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    edit: PropTypes.bool,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}

export default PostForm;