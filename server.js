const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');

const app = express();

app.use(express.json());

const db = process.env.mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

// See https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
// for source of the whitelist code
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error(`${origin} not allowed by CORS`));
        }
    }
}

//app.use(cors(corsOptions));
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Server started on port ${port}.`));