const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host :'localhost',
    user:'root',
    password:"RootAdmin@123",
    database:'task_app'
});
module.exports =db;


