const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '51.81.160.154',
  user: 'lxv1537_bookstore_user',
  password: 'bookstore@123',
  database: 'lxv1537_bookstore'
});

module.exports = pool;
