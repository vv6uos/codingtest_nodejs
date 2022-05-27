function onClickSendBtn() {
  document.getElementById("loadingmsg").innerHTML = "3초 후 출력됩니다";
  const inputValue = document.forms[0].elements[0].value;
  axios
    .post("/api/2", { inputValue })
    .then((result) => {
      document.getElementById("loadingmsg").innerHTML = "";
      document.getElementById("response").innerHTML = result.data;
    })
    .catch((err) => {
      console.log("서버통신실패");
    });
}
