const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// Authenticate user
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Check for existing user
    User.findOne({ email })
    .then(user => { 
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }
        
        // Validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });
            
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
        })
    })
});

// Get user data
router.get('/user/', auth, (req, res) => {
    // Our custom auth middleware will have added "user" to the request
    // by this point (unless there was no token)
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;