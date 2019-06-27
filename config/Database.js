const mysql = require('mysql');

// DB Connect 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'dev_admin',
    password: '123456',
    database: 'devconnector'
});

module.exports = db;