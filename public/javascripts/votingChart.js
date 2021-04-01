const chartContainer = document.querySelector('.chart-container');
const ctx = document.getElementById('myChart');

const options = JSON.parse(chartContainer.dataset.serverOptions);
const chartColors = Array(options.length).fill(null).map(el => randomColorGenerator(256));
const myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: options.map(el => el.option),
    datasets: [{
      label: '# of Votes',
      data: options.map(el => el.voters.length),
      backgroundColor: chartColors.map(el => el.backgroundColor),
      borderColor: chartColors.map(el => el.borderColor),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      labels: {
        fontColor: '#fafafa'
      }
    }
  }
});

function randomColorGenerator(max) {
  const r = Math.floor(Math.random() * max);
  const g = Math.floor(Math.random() * max);
  const b = Math.floor(Math.random() * max);

  return {
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.4)`,
    borderColor: `rgba(${r}, ${g}, ${b}, 1)`
  }
}
