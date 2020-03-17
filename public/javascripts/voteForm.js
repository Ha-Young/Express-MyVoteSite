var optionNum = 2;
function addOption() {
  console.log("옵션추가");
  //옵션을 최대 5개까지 추가합니다.
  if (optionNum < 5) {
    optionNum++;
    const optionWrapper = document.querySelector(".option-wrapper");
    const option = document.createElement('input');
    option.type = "text";
    option.placeholder = "선택지" + optionNum;
    console.log(option);
    optionWrapper.appendChild(option);
  } else {
  }
}
