const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Post = require('../../models/Post');

// Create new post
router.post('/', auth, (req, res) => {
    const { title, summary, body } = req.body;

    const newPost = new Post({
        title,
        summary,
        body,
        user: req.user.id
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

router.post('/:id/update', auth, (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if (!post) { res.status(400).json({ msg: "Post doesn't exist." }); }
        // We need to use == instead of === here
        if (post.user == req.user.id) {
            const reqInfo = {
                title: req.body.title,
                summary: req.body.summary,
                body: req.body.body,
                dateEdited: req.body.dateEdited
            }
            Post.findByIdAndUpdate(post._id, reqInfo, { useFindAndModify: false })
            .then(newPost => {
                res.json({ newPost })
            })
        }
    })
    .catch(err => console.log(err));
});

router.delete('/:id', auth, (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if (!post) { res.status(400).json({ msg: "Post doesn't exist." }); }
        if (post.user == req.user.id) {
            Post.findByIdAndDelete(post._id)
            .then(deletedPost => {
                res.json({ deletedPost })
            })
        }
        else {
            res.status(400).json({ 
                msg: "You aren't authorized to delete this post.",
                post, 
                userID: req.user.id
            })
        }
    })
    .catch(err => console.log(err));
});

module.exports = router;