const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '51.81.160.157',
  user: 'sxv3887_bookstore_user',
  password: 'bookstore@123',
  database: 'sxv3887_bookstore'
});

module.exports = pool;
