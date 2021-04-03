const votingChart = document.getElementById("voting-chart");

const chartData = {
  labels: [],
  data: [],
  backgroundColor: [],
};

options.forEach((content) => {
  chartData.labels.push(content.option);
  chartData.data.push(content.count);
  chartData.backgroundColor.push(generateRandomColor());
});

const { labels, data, backgroundColor } = chartData;

const chart = new Chart(votingChart, {
  type: "doughnut",
  data: {
    labels,
    datasets: [{
      backgroundColor,
      data,
      borderColor: "rgba(0, 0, 0, 0)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    responsive: false,
  },
});

function generateRandomColor() {
  const Char = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomColor = "";
  
  for(i = 0; i < 6; i++) {
    randomColor = randomColor + Char[Math.floor(Math.random() * 16)];
  }
  
  return "#" + randomColor;
}
