const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 300,
    host: "",
    user: "",
    password: "",
    database: "",
});

pool.getConnection((err) => {
    if (err) {
        console.log("DATABASE ERROR");
        throw "Error occured: " + err;
    }
});

module.exports = pool;

