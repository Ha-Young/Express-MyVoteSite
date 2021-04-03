const $options = document.querySelectorAll(".option-radio");
const $optionsList = Array.from($options);
const $votingInfo = document.querySelector(".voting-info");
const $votingSubmitBtn = document.querySelector(".voting-submit-btn");
const $deleteButton = document.querySelector(".voting-delete-btn");

if ($votingSubmitBtn) {
  $votingSubmitBtn.addEventListener("click", handleVotingSubmit);
}

if ($deleteButton) {
  $deleteButton.addEventListener("click", handleDeleteBtnClick);
}

const optionData = $optionsList.map(option => ({
  title: option.value,
  count: Number(option.dataset.value),
}))

const myChart = document.getElementById("myChart").getContext("2d");
const optionChart = new Chart(myChart, {
  type: "doughnut",
  data: {
    labels: optionData.map(data => data.title),
    datasets: [{
      data: optionData.map(data => data.count),
        backgroundColor: [
          "rgba(255, 99, 30, 0.6)",
          "rgba(54, 30, 30, 0.6)",
          "rgba(100, 99, 15, 0.6)",
          "rgba(180, 99, 30, 0.6)"
        ],
        borderWidth: 4,
        borderColor: "#777",
        hoverBorderWidth: 3,
        hoverBorderColor: "#000"
    }]
  },
  options: {
    title: {
      display: true,
      text: "largest city",
      fontSize: 25,
    },
    legend: {
      display: false,
      position: "right",
      labels: {
        fontColor: "#000"
      }
    },
    layout: {
      padding: {
        left: 50,
        right: 0,
        bottom: 0,
        top: 0,
      }
    },
  },
});

async function handleVotingSubmit(e) {
  try {
    e.preventDefault();

    let selectedOptionValue = null;
    let selectedOptionId = null;

    for (let option of $optionsList) {
      if (option.checked) {
        selectedOptionValue = option.value;
        selectedOptionId = option.id;
        break;
      }
    }

    const originPath = window.location.origin;
    const votingPath = window.location.pathname;
    const totalPath = `${originPath}${votingPath}`;
    const votingId = votingPath.split("/").pop();

    if (!selectedOptionId || !selectedOptionValue) {
      const errorMessage = document.createElement("p");
      $votingInfo.appendChild(errorMessage);
      errorMessage.textContent = "please select at least one option";
      window.location.href = `${originPath}${votingPath}`;
    }

    const rawResponse = await fetch(
      totalPath,
      { method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votingId, selectedOptionValue, selectedOptionId }),
      }
    );

    const content = await rawResponse.json();

    switch (content) {
      case "no user":
        window.location.href = "/login"
        break;
      case "user exist":
        optionData.find(option => option.title === selectedOptionValue).count++;
        optionChart.data.datasets[0].data = optionData.map(option => option.count)
        optionChart.update();
        break;
      case "already voted":
        const errorMessage = document.createElement("p");
        $votingInfo.appendChild(errorMessage);
        errorMessage.textContent = "alraedy voted for this voting";
        window.location.href = totalPath;
        break;
      default: break;
    }
  } catch (error) {
    console.warn(error);
  }
}
