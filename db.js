const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'HOSTNAME',
  user: 'USERNAME',
  password: 'PASSWORD',
  database: 'DATABASE'
});

module.exports = pool;
