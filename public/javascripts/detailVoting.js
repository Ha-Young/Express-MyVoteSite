const votingOptions = document.querySelectorAll(".detail-voting-option");
console.log("votingOption", votingOptions);

const chart = {
  labels: [],
  data: [],
};

for (const option of votingOptions) {
  console.log("option", option);
}

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["사과", "사과"],
    datasets: [
      {
        data: [25, 1],
        backgroundColor: getRandomColor(),
        borderWidth: 1,
      },
    ],
  },
});

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
