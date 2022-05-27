var mysql = require("mysql");

const conn = mysql.createConnection({
  host: "codingtest.brique.kr",
  port: "3306",
  user: "codingtest",
  password: "12brique!@",
  database: "employees",
});

module.exports = conn;
