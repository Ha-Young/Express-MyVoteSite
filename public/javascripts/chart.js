// 우선 컨텍스트를 가져옵니다. 
const ctx = document.getElementById("myChart").getContext('2d');
/*
- Chart를 생성하면서, 
- ctx를 첫번째 argument로 넘겨주고, 
- 두번째 argument로 그림을 그릴때 필요한 요소들을 모두 넘겨줍니다. 
*/

const data = document.querySelectorAll('input[name="option"]');
// console.log('in secript')
// console.log(data)
const labels = [];

// var myDoughnutChart = new Chart(ctx, {
//   type: 'doughnut',
//   data: data,
//   options: {
//     maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });
