const mysql = require('mysql');
const { dbConfig } = require('./config');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;