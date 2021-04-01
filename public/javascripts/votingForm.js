const container = document.querySelector('.optionsContainer');
const addOptionBtn = document.querySelector('.addOptionBtn');

if (addOptionBtn) {
  addOptionBtn.addEventListener('click', event => {
    event.preventDefault();
    const newInput = document.createElement('input');
    newInput.value = '옵션을 추가하세요';
    // newInput.placeholder = '옵션을 추가하세요';
    newInput.name = 'options';
    container.appendChild(newInput);
  });
}

// function sendAjax(url, data) {
//   // 입력값을 변수에 담고 문자열 형태로 변환
//   const parsedData = JSON.stringify(data);

//   // content-type을 설정하고 데이터 송신
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', url);
//   xhr.setRequestHeader('Content-type', 'application/json');
//   xhr.send(parsedData);

//   // 데이터 수신이 완료되면 표시
//   // xhr.addEventListener('load', () => {
//   //   console.log(xhr.responseText);
//   // });
// }

// document.querySelector('.submitBtn').addEventListener('click', () => {
//   // 입력값 위치를 찾아 변수에 담고
//   const title = document.querySelector('input[name="title"]').value;
//   const description = document.querySelector('input[name="description"]').value;
//   const inProgress = document.querySelector('select[name="inProgress"]').value;
//   const optionList = document.querySelectorAll('input[name="options"]');
//   const options = [];
//   optionList.forEach(item => options.push(item.value));
//   console.log(options);
//   // console.log(title, description, inProgress);

//   // // sendAjax 함수를 만들고 URL과 data를 전달
//   sendAjax('http://localhost:3001/votings/new', {
//     title, description, inProgress, options,
//   });
// });
