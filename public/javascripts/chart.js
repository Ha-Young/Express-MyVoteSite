const { options } = window.app.vote;
const voteResult = options.map((option) => {
  return { name: option.name, count: option.voters.length };
});

const generateRandomColor = () => {
  const randomNumber = () => Math.floor(Math.random() * 150);

  return `rgba(${randomNumber()}, ${randomNumber()}, ${randomNumber()}, 0.7)`;
};

const labels = voteResult.map((option) => option.name);
const data = voteResult.map((option) => option.count);
const colors = voteResult.map(() => generateRandomColor());

const ctx = document.getElementById("myChart");
// eslint-disable-next-line
const myChart = new Chart(ctx, {
  type: "horizontalBar",
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
    legend: false,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  },
});
