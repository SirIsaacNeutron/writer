const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/api/users');

const app = express();

app.use(express.json());

const db = process.env.mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`Server started on port ${port}.`));