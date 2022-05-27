let numDataArr = [];
let notNumber = [];
let responsedataLen;

function onClickStartBtn() {
  const inputArea = document.getElementById("Q1_input_area");
  const msg = document.getElementById("Q1_loadingmsg");
  msg.innerHTML = "데이터를 받아오는 중입니다";
  getData();
  setTimeout(() => {
    msg.innerHTML = "";
    const values = caculateData(numDataArr);
    console.log(chkNullArr([1, 2, undefined, null]));
    inputArea.innerHTML = values;
  }, 3000);
}

function getData() {
  axios
    .get(`/api/1/sample`)
    .then((result) => {
      const data = result.data;
      const numberJ = /^[0-9]+$/;
      responsedataLen = data.length;

      for (i = 0; i < data.length; i++) {
        const lineOfData = data[i];
        const numberLines = [];

        for (j = 0; j < lineOfData.length; j++) {
          if (!numberJ.test(lineOfData[j])) {
            notNumber[j] = lineOfData[j];
          } else {
            lineOfData[j] = parseFloat(lineOfData[j]).toFixed(1) * 1;
            numberLines[j] = lineOfData[j];
          }
        }
        const noEmptyLines = chkNullArr(numberLines);
        if (lineOfData.length === noEmptyLines.length) {
          numDataArr.push(noEmptyLines);
        }
      }
    })
    .catch((err) => {
      console.log("csv파일이 읽히지 않습니다");
    });
}

function chkNullArr(arr) {
  const newarr = arr.filter(function (item) {
    return item !== null && item !== undefined && item !== "";
  });
  return newarr;
}
function caculateData(dArr) {
  let str = "";

  for (i = 0; i < dArr.length; i++) {
    const arr = dArr[i];

    const min = getMin(arr);
    const max = getMax(arr);
    const sum = getSum(arr);
    const avg = getAvg(sum);
    const SD = getSD(arr, avg);
    const mid = getMedian(arr);

    str += `<div>${min} ${max} ${sum} ${avg} ${SD} ${mid} </div>`;
  }
  str += `<div>-----------------------------------------------</div><div>The total number of lines : ${responsedataLen}</div><div>The calculated lines : ${dArr.length}</div><div>The error values : ${notNumber}</div>`;

  return str;
}
getMin = (array) => {
  let min = Math.min(...array);

  return min;
};

function getMax(array) {
  let max = Math.max(...array);

  return max;
}
function getSum(array) {
  const result = array.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  return result;
}

function getAvg(sumcl) {
  const sum = sumcl;
  const average = sum / 10;
  return average;
}

function getSD(array, avg) {
  let standardDeviation;
  const average = avg;
  const result = array.reduce(function add(sum, currValue) {
    const deviation = currValue - average;
    return Math.pow(deviation, 2);
  }, 0);
  standardDeviation = Math.sqrt(result / 10);
  return parseFloat(standardDeviation);
}

function swap(arr, left, right) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

function sortArr(items) {
  const array = items.sort(function (a, b) {
    return a - b;
  });
  return array;
}

function getMedian(items) {
  const sortItems = sortArr(items);
  const len = sortItems.length;
  let median;

  if (len % 2 == 0) {
    median = (sortItems[len / 2] + sortItems[len / 2 - 1]) / 2;
  } else {
    median = sortItems[Math.floor(len / 2)];
  }
  return parseFloat(median).toFixed(1);
}
