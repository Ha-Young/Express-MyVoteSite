const ctx = document.getElementById("voting-chart");
const optionList = document.querySelectorAll("voting-count");
console.log(options);

const chart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["January", "February", "March"],
    datasets: [{
      backgroundColor: ["#E7DAE8", "#E8E7DA", "#DAE8DD"],
      data: [4, 10, 5],
      borderColor: "rgba(0, 0, 0, 0)",
    }],
  },
  options: {
    maintainAspectRatio: false,
  },
});
