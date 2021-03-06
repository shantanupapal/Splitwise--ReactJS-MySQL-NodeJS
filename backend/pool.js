const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "splitwise-lab1.cjujexxer9yg.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "splitwise",
});

pool.getConnection((err) => {
    if (err) {
        console.log("DATABASE ERROR");
        throw "Error occured: " + err;
    }
});

module.exports = pool;
