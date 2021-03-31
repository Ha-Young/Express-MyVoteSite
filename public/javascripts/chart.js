
  //투표진행상황보기가 클릭됐다는 플래그 만들어주기
  //여기서 결과물을 만들어두고
  //querySelector로 잡든 해서
  //그 다음에 이벤트 걸어서
  //클릭되면 이게 보여지는 방식으로 구현하기

const colorSchemes = ["#d63031", "#e84393", "#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#ffeaa7", "#fab1a0", "#ff7675", "#fd79a8", "#fdcb6e", "#e17055"];
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'polarArea',
  // The data for our dataset
  data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: '# of votes',
          backgroundColor: colorSchemes.splice(0, 7),
          data: [0, 10, 5, 2, 20, 30, 45],
      }]
  },
  // Configuration options go here
  options: {
  }
});

