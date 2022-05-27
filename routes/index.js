const express = require("express");
const router = express.Router();

const api_1 = require("./api_1");
const api_2 = require("./api_2");
const api_3 = require("./api_3");
const api_4 = require("./api_4");
const api_5 = require("./api_5");

router.use("/api/1", api_1);
router.use("/api/2", api_2);
router.use("/api/3", api_3);
router.use("/api/4", api_4);
router.use("/api/5", api_5);

module.exports = router;
