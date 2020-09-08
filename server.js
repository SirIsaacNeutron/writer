const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const postRoutes = require('./routes/api/posts');

const app = express();

app.use(compression());

app.use(express.json());

const db = process.env.mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

// See https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
// for source of the whitelist code
/* const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function(origin, callback) {
        // See https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error(`${origin} not allowed by CORS`));
        }
    }
} */

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//app.use(cors(corsOptions));
app.use(helmet());
// Comment out the corsOptions line when testing using Postman
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(port, () => console.log(`Server started on port ${port}.`));