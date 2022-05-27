function onClickBtn() {
  document.getElementById("lodingmsg").innerHTML = "데이터를 불러오는 중입니다";
  axios
    .get("/api/3")
    .then((result) => {
      const data = result.data;
      document.getElementById("lodingmsg").innerHTML = "";
      makeTable(data);
    })
    .catch((err) => {
      document.getElementById("Q3_table").innerHTML =
        "서버와 연결이 끊겼습니다 재시도 부탁드립니다.";
    });
}

function makeTable(data) {
  //테이블 생성
  const table = document.getElementById("Q3_table_area");
  table.innerHTML = ` <table id="Q3_table">
            <thead>
              <tr id="Q3_thead"></tr>
            </thead>
            <tbody id="Q3_tbody"></tbody>
          </table>`;
  makeThead();
  makeTbody(data);
}

function makeThead() {
  const headlist = [
    "emp_no",
    "first_name",
    "last_name",
    "gender",
    "hire_date",
    "dept_name",
    "title",
    "max_salary",
  ];
  //테이블 헤드 생성
  const head = document.getElementById("Q3_thead");
  for (i = 0; i < headlist.length; i++) {
    let headrow = `<th>${headlist[i]}</th>`;
    head.innerHTML += headrow;
  }
}
function makeTbody(data) {
  //테이블 바디 데이터 출력
  const tbody = document.getElementById("Q3_tbody");
  for (i = 0; i < data.length; i++) {
    let hire_date = formatDate(data[i].hire_date);
    let row = `<tr>
                      <td>${data[i].emp_no}</td>
                      <td>${data[i].first_name}</td>
                      <td>${data[i].last_name}</td>
                      <td>${data[i].gender}</td>
                      <td>${hire_date}</td>
                      <td>${data[i].dept_name}</td>
                      <td>${data[i].title}</td>
                      <td>${data[i].salary}</td>
                     </tr>`;
    tbody.innerHTML += row;
  }
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
