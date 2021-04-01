const form = document.querySelector(".voting-form");
const messageBox = document.querySelector(".message-box");
const indexLinkButton = document.querySelector(".index-link-button");
const ctx = document.querySelector(".chart");

const setMessage = (message) => {
  messageBox.textContent = message;
};

const handleIndexLinkButton = (e) => {
  window.location.href = "/";
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const selectedOptions = [];
  const options = e.target.option;
  for (const option of options) {
    if (option.checked) {
      selectedOptions.push(option.value);
    }
  }

  try {
    await fetch(window.location.pathname, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "put",
      body: JSON.stringify(selectedOptions),
    });
  } catch (err) {
    setMessage("error!");
  } finally {
    window.location.reload();
  }
};

indexLinkButton.addEventListener("click", handleIndexLinkButton);
if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (ctx) {
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
      scales: {
        xAxes: [{
          ticks: {
            min: 0,
            precision: 0,
          }
        }]
      }
    },
  });
}
