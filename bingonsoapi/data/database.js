// database/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', // Địa chỉ máy chủ MySQL
    user: 'root',      // Tên người dùng MySQL
    password: '', // Mật khẩu MySQL
    database: 'bingo'   // Tên cơ sở dữ liệu
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;
