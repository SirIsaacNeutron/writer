import React from 'react';

import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Writer</title>
            </Helmet>
            
            <h1>Hello, creativity.</h1>
            <p>
                <i>Writer</i> is just what it sounds like: a place to write
                about whatever you want. <b>It's free, forever. </b>
            </p>
            <p>
                So what are you waiting for? Sign up now.
            </p>
        </>
    );
}

export default Home;