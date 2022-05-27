const express = require("express");
const router = express.Router();
const weatherDB = require("../config/database2");

router.get("/", (req, res) => {
  weatherDB.query("SELECT * FROM weather ", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(`err : ${err}`);
      res.send(err);
    }
  });
  weatherDB.query("SELECT * FROM weather ", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(`err : ${err}`);
      res.send(err);
    }
  });
});

module.exports = router;
