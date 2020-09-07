const express = require('express');
const router = express.Router();

const Post = require('../../models/Post');

// Create new post
router.post('/', auth, (req, res) => {
    const { title, summary, body, user } = req.body;

    const newPost = new Post({
        title,
        summary,
        body,
        user
    });

    newPost.save()
    .then(post => {
        res.json({ msg: 'Post successfully created.' });
    })
})

// Get specific Post
router.get('/post/:id', (req, res) => {
    Post.findById(req.params.id)
    .populate('user')
    .then(post => {
        if (!post) {
            res.json({ msg: "Post ID doesn't exist." });
        }
        res.json({
            post,
        })
    })
});