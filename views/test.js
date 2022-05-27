function onClickActBtn() {
  document.getElementById("lodingmsg").innerHTML = "데이터를 불러오는 중입니다";
  setTimeout(() => {
    printResult();
  }, 1000);
}

function printResult(text) {
  const inputArea = document.getElementById("test_resData_input_area");
  document.getElementById("lodingmsg").innerHTML = "";
  inputArea.innerHTML = test();
}

function test() {
  let result1, result2;
  var arr3 = [
    { num: 0, name: "홍길동" },
    { num: 1, name: "박보검" },
    { num: 2, name: "강호동" },
  ];

  result1 = arr3.find((list) => list.name === "강호동");
  result2 = arr3.findIndex((list) => list.name === "강호동");
  console.log(result1);
  console.log(result2);
  console.log(typeof result1);
  console.log(typeof result2);

    console.log(typeof arr3[2].name);

    function isPositibeNum(value) {
        console.log(this);
        return value.name == this;
    }
    const result3 = arr3.find(isPositibeNum, "강호동");
    console.log(result3);
    return `완료`;
}

function testFilter() {
  var arr = [
    { id: 15 },
    { id: -1 },
    { id: 0 },
    { id: 3 },
    { id: 12.2 },
    {},
    { id: null },
    { id: NaN },
    { id: "undefined" },
  ];

  var invalidEntries = 0;

  function isNumber(obj) {
    return obj !== undefined && typeof obj === "number" && !isNaN(obj);
  }

  function filterByID(item) {
    if (isNumber(item.id) && item.id !== 0) {
      return true;
    }
    invalidEntries++;
    return false;
  }

  var arrByID = arr.filter(filterByID);

}
