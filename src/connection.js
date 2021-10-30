// Mysql connection
const mysql = require('mysql');
require('dotenv').config();

// mysql connection parameters
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// connect to Mysql
connection.connect((err) => {
    if (err) throw err;
    // console.log(`connected as id ${connection.threadId}`);
});

// export 
module.exports = connection;