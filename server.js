const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes/index");
const employeesDB = require("./config/database");
const weatherDB = require("./config/database2");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static("views"));
app.use(bodyParser.json());
app.use(express.json());
//API
app.use(router);

//페이지 렌더링
app.get("/", (req, res) => {
  res.render("index.html");
});
app.get("/1", (req, res) => {
  res.render("Q1.html");
});

app.get("/2", (req, res) => {
  res.render("Q2.html");
});
app.get("/3", (req, res) => {
  res.render("Q3.html");
});
app.get("/4", (req, res) => {
  res.render("Q4.html");
});
app.get("/5", (req, res) => {
  res.render("Q5.html");
});

app.get("/test", (req, res) => {
  res.render("test.html");
});

//서버가동
const server = app.listen(3000, () => {
  console.log("이송은 NODE 코딩테스트 서버 시작");
  console.log("localhost:3000으로 접속 바랍니다");
  employeesDB.connect();
  weatherDB.connect();
});
