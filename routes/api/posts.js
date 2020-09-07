const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

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
        res.json({ 
            post,
            msg: "Post successfully created."
         });
    })
    .catch(err => {
        console.log(err);
    })
})

// Get specific Post
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .populate('user', '_id name')
    .then(post => {
        if (!post) {
            res.json({ msg: "Post ID doesn't exist." });
        }
        res.json({
            post,
        })
    })
});

module.exports = router;