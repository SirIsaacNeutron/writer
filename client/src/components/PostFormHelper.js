import React from 'react';

import PropTypes from 'prop-types'

import PostPreview from './PostPreview';

const PostFormHelper = props => {
    return (
        <>
            <a target="_blank" href="https://guides.github.com/features/mastering-markdown/"
            rel="noopener noreferrer">Text Formatting Guide</a>
            <p className='mt-3'>
                <button className="btn btn-outline-primary" type="button" 
                data-toggle="collapse" data-target="#preview" 
                aria-expanded="false" 
                aria-controls="preview">
                    Preview
                </button>
            </p>
            <div className="collapse" id="preview">
                <div className="card card-body mb-2">
                    <PostPreview title={props.title} summary={props.summary}
                    body={props.body} user={props.user} dateCreated={props.dateCreated} 
                    dateEdited={props.dateEdited} />
                </div>
            </div> 
        </>
    );
}

PostFormHelper.propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default PostFormHelper;