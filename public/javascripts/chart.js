// 우선 컨텍스트를 가져옵니다. 
const ctx = document.getElementById("myChart").getContext('2d');
const rawData = document.querySelectorAll('input[name="option"]');

const datas = [];
const labels = [];

rawData.forEach(node => datas.push(parseInt(node.dataset.count)));
rawData.forEach(node => labels.push(node.defaultValue));

var myDoughnutChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels,
    datasets: [{
      label: '# of Votes',
      data: datas,
      backgroundColor: palette('cb-Pastel1', datas.length).map(function(hex) {
        return '#' + hex;
      })
    }]
  },
  options: {
    maintainAspectRatio: true
  }
});
