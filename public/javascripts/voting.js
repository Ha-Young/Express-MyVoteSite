const indexLinkButton = document.querySelector(".index-link-button");
const ctx = document.querySelector(".chart");

const handleIndexLinkButton = (e) => {
  window.location.href = "/";
};

indexLinkButton.addEventListener("click", handleIndexLinkButton);

const myChart = new Chart(ctx, {
  type: "horizontalBar",

  data: {
    labels: Object.keys(options),
    datasets: [{
      label: "VOTE",
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      data: Object.values(options),
    }],
  },

  options: {
    responsive: false,
  },
});
