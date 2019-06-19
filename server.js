const express = require('express');
const mysql = require('mysql'); 

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB Connect 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'dev_admin',
    password: '123456',
    database: 'devconnector'
});
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Mysql Connected...')
});

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('Hello World!'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port ${port}`));