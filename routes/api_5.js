const express = require("express");
const router = express.Router();
const axios = require("axios");

const randomAPI_URL = "http://codingtest.brique.kr:8080/random";
const getRdmData = async (request) => {
  let response;
  try {
    response = axios.get(randomAPI_URL);
  } catch (err) {
    console.log("브릭 랜덤 API 요청 실패");
  }
  return response;
};

router.get("/", (req, res) => {
  getRdmData(req)
    .then((result) => {
      res.json({ result: result.data });
    })
    .catch((err) => {
      console.log("브릭 랜덤 API 데이터 불러오기 실패");
    });
});
module.exports = router;
