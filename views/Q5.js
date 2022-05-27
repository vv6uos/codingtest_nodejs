let responsedata = [];
let idsInResdata = [];
let total = 0;

function onClickActBtn() {
  document.getElementById("lodingmsg").innerHTML = "데이터를 불러오는 중입니다";
  get100response();
  setTimeout(() => {
    const uniqueResArr = removeRpt(responsedata);
    const countArr = chkRepeatNum(idsInResdata);
    const makeArrInterface = makeArrIn_cnt_id_quote(countArr);
    const resultDataArr = insertQutValue(makeArrInterface, uniqueResArr);
    setTimeout(() => {
      total === 100
        ? printResult(resultDataArr)
        : alert("다시 실행 부탁드립니다.");
    }, 4000);
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
//중복 제거 데이터
function removeRpt(ObjArr) {
  const map = new Map();
  for (const character of ObjArr) {
    map.set(JSON.stringify(character), character);
  }
  const arrUnique = [...map.values()];
  console.log(arrUnique);

  return arrUnique;
}

// 결과 객체배열 인터페이스 만들기
function makeArrIn_cnt_id_quote(list) {
  let newArr = [];

  for (i = 0; i < Object.keys(list).length; i++) {
    let key = Object.keys(list)[i];
    let value = Object.values(list)[i];
    newArr.push({ count: value, id: Number(key), quote: "" });
  }

  console.log(newArr);
  return newArr;
}

function insertQutValue(arr, insertArr) {
  for (i = 0; i < arr.length; i++) {
    total += arr[i].count;
    for (j = 0; j < insertArr.length; j++) {
      if (arr[i].id === insertArr[j].id) {
        arr[i].quote = insertArr[j].quote;
      }
    }
  }
  return arr;
}

//정렬은 실패했습니다....
function sortArr(arr) {
  for (i = 0; i < arr.length; i++) {
    for (j = 1; j < arr.length; j++) {
      if (arr[i].count < arr[j].count) {
        let tmp = arr[j];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
  return arr;
}

function printResult(arr) {
  const inputArea = document.getElementById("Q5_resData_input_area");
  document.getElementById("lodingmsg").innerHTML = "";

  for (i = 0; i < arr.length; i++) {
    let row = `<p>count : ${arr[i].count}  { id : ${arr[i].id} , quote : ${arr[i].quote} }`;
    inputArea.innerHTML += row;
  }
  document.getElementById(
    "Q5_resData_total"
  ).innerHTML = `Total Count:${total}`;
}
