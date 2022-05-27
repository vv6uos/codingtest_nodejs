const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "..", "public", "sample.csv");
const csv = fs.readFileSync(csvPath, "utf-8");
const rows = csv.split("\r\n");
if (rows[rows.length - 1] === "") {
  rows.pop();
}
let results = [];
for (const i in rows) {
  const row = rows[i];
  const data = row.split(",");

  results.push(data);
}

router.get("/sample", (req, res) => {
  res.json(results);
});
module.exports = router;
