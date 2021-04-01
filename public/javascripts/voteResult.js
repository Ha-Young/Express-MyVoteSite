const optionsTitle = document.querySelectorAll(".vote-result li .title");
const optionsCount = document.querySelectorAll(".vote-result li .count");

const optionsLabel = Array.prototype.slice.call(optionsTitle).map(title => title.textContent);
const optionsData = Array.prototype.slice.call(optionsCount).map(count => Number(count.textContent));

const context = document.querySelector("#vote-chart").getContext("2d");
const chart = new Chart(context, {
  type: "pie",
  data: {
    labels: optionsLabel,
    datasets: [{
      label: "# of Votes",
      data: optionsData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 0
    }]
  },
  options: {
    legend: {
      position: "left"
    }
  }
});
