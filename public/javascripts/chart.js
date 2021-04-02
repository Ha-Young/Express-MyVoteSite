const ctx = document.getElementById("voting-chart");

const labels = options.map((content) => content.option);
const data = options.map((content) => content.count);
const backgroundColor = options.map(() => generateRandomColor());

function generateRandomColor() {
	const Char = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomColor = "";
	
	for(i = 0; i < 6; i++) {
		randomColor = randomColor + Char[Math.floor(Math.random() * 16)];
	}
	
  return "#" + randomColor;
}

const chart = new Chart(ctx, {
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
