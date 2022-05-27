let dataTableArr = [
  ["1월", null, null],
  ["2월", null, null],
  ["3월", null, null],
  ["4월", null, null],
  ["5월", null, null],
  ["6월", null, null],
  ["7월", null, null],
  ["8월", null, null],
  ["9월", null, null],
  ["10월", null, null],
  ["11월", null, null],
  ["12월", null, null],
];

//월만 배열로 저장
let monthOfDTA = () => {
  let arr = [];
  for (i = 0; i < dataTableArr.length; i++) {
    arr.push = dataTableArr[i][0];
  }
  return arr;
};

function onClickStartBtn() {
  google.charts.load("current", { packages: ["line", "corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  makeForm();
  makeTable();
  //시작버튼 제거
  var startBtn = document.getElementById("Q4_start_btn");
  startBtn.parentNode.removeChild(startBtn);

  //차트 만드는게 오래 걸려서 아래로 빼줌
  drawChart();
}
function drawChart() {
  var chartDiv = document.getElementById("chart_div");

  var data = new google.visualization.DataTable();
  data.addColumn("string", "월");
  data.addColumn("number", "평균 기온");
  data.addColumn("number", "평균 습도");

  data.addRows(dataTableArr);

  var classicOptions = {
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 1 },
    },
    vAxes: {
      // Adds titles to each axis.
      0: { title: "평균 기온 (℃)" },
      1: { title: "평균 습도" },
    },
    hAxis: {
      ticks: monthOfDTA(),
    },
    vAxis: {
      viewWindow: {
        max: 80,
      },
    },
  };

  var classicChart = new google.visualization.LineChart(chartDiv);
  classicChart.draw(data, classicOptions);
}

function makeOptHTML() {
  const select = document.getElementById("Q4_select");
  for (i = 0; i < dataTableArr.length; i++) {
    let str = `<option>${dataTableArr[i][0]}</option>`;
    select.innerHTML += str;
  }
}

function makeForm() {
  const form = document.getElementById("Q4_form");
  form.innerHTML = `<select id="Q4_select"></select>
          <input id="Q4_input_temperature" type="number"/>
          <input id="Q4_input_humity" type="number" />
          <button id="Q4_enterBtn" type="button" onclick="onClickEnterBtn()">
            입력
          </button>`;
  makeOptHTML();
}

function makeTable() {
  makeThead();
  makeTbody();
}

function makeThead() {
  const thead = document.getElementById("Q4_table_head");
  let headrow = `<th></th><th>평균 기온</th><th>평균 습도</th>`;
  thead.innerHTML += headrow;
}
function makeTbody() {
  const tbody = document.getElementById("Q4_table_body");
  for (i = 0; i < dataTableArr.length; i++) {
    let tmpT = dataTableArr[i][1] === null ? "" : dataTableArr[i][1];
    let hmdT = dataTableArr[i][2] === null ? "" : dataTableArr[i][2];
    let row = `<tr class="tbody_row">
                      <td class="tbody_row">${dataTableArr[i][0]}</td>
                      <td class="tbody_row">${tmpT}</td>
                      <td class="tbody_row">${hmdT}</td>
                     </tr>`;
    tbody.innerHTML += row;
  }
}

//입력버튼
function onClickEnterBtn() {
  google.charts.load("current", { packages: ["line", "corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  const month = document.forms[0].elements[0].value;
  const tmp = document.forms[0].elements[1].value;
  const hmd = document.forms[0].elements[2].value;
  chkValid(month, tmp, hmd, updateDataTarr, updatePage);
}

//min max 속성 버그 때문에 따로 유효성검사를 하는 함수를 만들고 유효한 값일때 테이블을 만듬
function chkValid(month, tmp, hmd, cb1, cb2) {
  if (-50 > tmp || 50 < tmp) {
    alert("평균 기온을 다시 입력해주세요[-50~50]");
    document.forms[0].elements[1].value = null;
  } else if (0 > hmd || 100 < hmd) {
    alert("평균 습도를 다시 입력해주세요[0~100]");
    document.forms[0].elements[2].value = null;
  } else {
    cb1(month, tmp, hmd);
    cb2();
    document.forms[0].elements[1].value = null;
    document.forms[0].elements[2].value = null;
  }
}

function updateDataTarr(month, tmp, hmd) {
  // 일치하는 월이 있는 배열 인덱스 찾기
  let index;
  if (month === "1월") {
    index = 0;
  } else if (month === "2월") {
    index = 1;
  } else {
    for (i = 2; i < dataTableArr.length; i++) {
      if (-1 !== dataTableArr[i][0].indexOf(month)) {
        index = i;
      }
    }
    console.log(index);
  }

  //값 업데이트
  dataTableArr[index][1] = tmp;
  dataTableArr[index][2] = hmd;
}

function updatePage() {
  //테이블 제거
  document.getElementById("Q4_table_body").innerHTML = "";
  //테이블 재생성
  makeTbody();
}
