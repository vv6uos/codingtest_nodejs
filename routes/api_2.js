const express = require("express");
const router = express.Router();
const employeesDB = require("../config/database");

router.post("/", (req, res) => {
  const { inputValue } = req.body;
  setTimeout(() => {
    if (inputValue === "Ping") {
      res.send("Pong");
    } else {
      res.send(inputValue);
    }
  }, 3000);
});

module.exports = router;
