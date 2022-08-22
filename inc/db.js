const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'saboroso',
  password: '',
});

module.exports = connection;