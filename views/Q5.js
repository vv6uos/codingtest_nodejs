let responsedata = [];
let idsInResdata = [];
let total = 0;

function onClickActBtn() {
  document.getElementById("lodingmsg").innerHTML = "데이터를 불러오는 중입니다";
  get100response();
  setTimeout(() => {
    const countArr = chkRepeatNum(idsInResdata);
    const resultDataArr = makeResultArr(responsedata, countArr);
    const finArr = sortArr(resultDataArr);
    total === 100 ? printResult(finArr) : alert("다시 실행 부탁드립니다");
  }, 3500);
}

function get100response() {
  for (i = 0; i < 100; i++) {
    axios
      .get("/api/5")
      .then((result) => {
        const data = result.data.result;
        const res = { id: data.id, quote: data.quote };
        idsInResdata.push(data.id);
        responsedata.push(res);
      })
      .catch((err) => {
        console.log("서버통신실패");
      });
  }
}
//중복 개수 확인하기
function chkRepeatNum(arr) {
  const result = {};
  arr.forEach((x) => {
    result[x] = (result[x] || 0) + 1;
  });
  return result;
}

function makeResultArr(arr, list) {
  let newArr = [];
  for (key in list) {
    const findlist = arr.find((list) => list.id == key);
    newArr.push({
      count: list[key],
      id: findlist.id,
      quote: findlist.quote,
    });
    total += list[key];
  }
  return newArr;
}

function sortArr(arr) {
  const newArr = arr.sort((a, b) => {
    return b.count - a.count;
  });

  return newArr;
}

function printResult(arr) {
  const inputArea = document.getElementById("Q5_resData_input_area");
  document.getElementById("lodingmsg").innerHTML = "";

  for (i = 0; i < arr.length; i++) {
    let row = `<p>count : ${arr[i].count} { id : ${arr[i].id} , quote : ${arr[i].quote} }</p>`;
    inputArea.innerHTML += row;
  }
  document.getElementById(
    "Q5_resData_total"
  ).innerHTML = `Total Count:${total}`;
}
