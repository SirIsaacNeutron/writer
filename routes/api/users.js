const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const Post = require('../../models/Post');

// Create a new User
router.post('/', (req, res) => {
    if (!process.env.jwtSecret) { return res.status(500).json({ msg: 'jwtSecret not defined.' }); }
    const { name, email, password } = req.body;

    User.findOne({ email })
    .then(user => { 
        if (user) {
            return res.status(400).json({ msg: 'User already exists.' });
        }

        // If the email is indeed unique, then create the new user
        const newUser = new User({
            name,
            email,
            password
        });

        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) { throw err; }
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user.id },
                        process.env.jwtSecret,
                        { expiresIn: 3600 }, // expires in an hour
                        (err, token) => {
                            if (err) { throw err; }

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                });
            })
        });
    })
});

// Get list of all users
router.get('/', (req, res) => {
    User.find({})
    .select('-password -email -registrationDate')
    .then(users => {
        res.json({
            users,
        });
    })
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .select('name')
    .then(user => {
        res.json({ user });
    })
    .catch(err => console.log(err));
});

router.get('/:id/posts', (req, res) => {
    Post.find({ user: req.params.id })
    .sort({ dateCreated: -1 }) // To get the most recently created Posts first
    .then(posts => {
        res.json({ posts })
    })
    .catch(err => console.log(err));
})

module.exports = router;