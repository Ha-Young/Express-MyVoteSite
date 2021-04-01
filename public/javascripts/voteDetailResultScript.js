/* eslint-disable no-undef */
const { vote_options: options } = window.app.vote;
const voteResult = options.map(option => {
  return { name: option.title, count: option.count };
});

const generateRandomColor = () => {
  const randomNumber = () => Math.floor(Math.random() * 150);

  return `rgba(${randomNumber()}, ${randomNumber()}, ${randomNumber()}, 0.7)`;
};

const labels = voteResult.map(option => option.name);
const data = voteResult.map(option => option.count);
const colors = voteResult.map(() => generateRandomColor());

const ctx = document.getElementById("myChart");
// eslint-disable-next-line
const myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
      minBarLength: 5,
    }],
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
    legend: {
      labels: {
        fontColor: '#fafafa',
      },
    },
  },
});
