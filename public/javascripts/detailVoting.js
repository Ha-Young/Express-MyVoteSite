console.log("hi");

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["사과", "사과"],
    datasets: [
      {
        data: [12, 19],
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
