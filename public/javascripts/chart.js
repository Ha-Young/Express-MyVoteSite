const ctx = document.getElementById('myChart').getContext('2d');
const rawData = document.querySelectorAll('input[name="option"]');

const datas = [];
const labels = [];

rawData.forEach(node => datas.push(parseInt(node.dataset.count)));
rawData.forEach(node => labels.push(node.defaultValue));

if (datas.every(node => node === 0)) {
  const contentPosition = document.querySelector('.chart-empty-alert');
  const alertNode = document.createElement('h2');
  const content = document.createTextNode('투표 결과가 존재하지 않습니다.');

  alertNode.appendChild(content);
  contentPosition.appendChild(alertNode);
} else {
  const myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        label: '# of Votes',
        data: datas,
        backgroundColor: palette('cb-Pastel1', datas.length).map(function (hex) {
          return '#' + hex;
        })
      }]
    },
    options: {
      maintainAspectRatio: true
    }
  });
}
