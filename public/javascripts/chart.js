const ctx = document.getElementById('myChart').getContext('2d');
const inputNodes = document.querySelectorAll('input[name="option"]');

const datas = [];
const labels = [];

inputNodes.forEach(node => datas.push(parseInt(node.dataset.count)));
inputNodes.forEach(node => labels.push(node.defaultValue));

if (datas.every(count => count === 0)) {
  const contentPosition = document.querySelector('.chart-empty-alert');
  const alertNode = document.createElement('h2');
  alertNode.textContent = '투표 결과가 존재하지 않습니다.';

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
