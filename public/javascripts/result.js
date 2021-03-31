const ctx = document.getElementById("myChart");
const main = document.querySelector("main");
const deleteBtn = document.querySelector(".delete-btn");
const voteId = main.getAttribute("name");
const options = JSON.parse(ctx.getAttribute("optionTitle"));
const optionTitle = options.map(option => {
  return option.optionTitle;
});
const optionVotedResults = options.map(option => {
  return option.votedUsers.length;
});

const myChart = new Chart(ctx, { type: 'bar',
  data: {
    labels: optionTitle,
    datasets: [{
      label: '# of Votes',
      data: optionVotedResults,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
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
    }
  }
});

if (deleteBtn !== null) {
  deleteBtn.addEventListener("click", async () => {
    try {
      await fetch(`http://localhost:3000/votings/${voteId}`, {
        method: "DELETE",
      });
    } catch(e) {
      console.error(e);
    }

    window.location.href = "/";
  });
}
