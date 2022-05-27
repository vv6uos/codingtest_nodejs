var mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "vv6uos4anyone",
  password: "1234",
  database: "weather",
});

module.exports = conn;
