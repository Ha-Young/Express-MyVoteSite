const votingButtonBoard = document.querySelector(".detail-option-button-board");
const messageBoard = document.querySelector(".detail-message-board");
const deleteButton = document.querySelector(".voting-info-delete-link");
const votingOptionsHidden = document.querySelectorAll(
  ".detail-voting-option-info"
);
const votingId = document
  .querySelector(".detail-voting")
  .getAttribute("data-votingId");

const voterId = document
  .querySelector(".detail-voting")
  .getAttribute("data-userId");

const chartdatas = createChartData(votingOptionsHidden);
const dataColors = createChartColor(votingOptionsHidden.length);
const chart = {
  labels: Object.keys(chartdatas),
  data: Object.values(chartdatas),
};

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: chart.labels,
    datasets: [
      {
        data: chart.data,
        backgroundColor: dataColors,
        borderWidth: 1,
      },
    ],
  },
});

let isSelected = false;
votingButtonBoard.addEventListener("click", (e) => {
  if (isSelected) {
    return;
  }

  const optionName = e.target.getAttribute("data-optionName");
  const userClickedOption = {
    votingId,
    optionName,
    voterId,
    currentUrl: window.location.href,
  };

  fetchVoting(
    `http://localhost:3000/votings/voted/${votingId}`,
    userClickedOption,
    "POST"
  )
    .then((data) => {
      votingButtonBoard.classList.add("hidden");
      if (data.status === 401) {
        messageBoard.textContent = "로그인 창으로 이동합니다...";
        setTimeout(() => {
          window.location.href = "http://localhost:3000/logIn";
        }, 2000);
      } else {
        messageBoard.textContent = "투표 되었습니다!";
      }
    })
    .catch((error) => {
      messageBoard.textContent("다시 시도해 주세요!");
    });
  isSelected = true;
});

deleteButton.addEventListener("click", (e) => {
  fetchVoting(
    `http://localhost:3000/votings/delete/${votingId}`,
    { votingId },
    "DELETE"
  )
    .then((data) => {
      window.location.href = "http://localhost:3000/votings";
    })
    .catch((error) => {
      messageBoard.textContent("다시 시도해 주세요!");
    });
});

function getRandomColor() {
  const letters = "0123456789ABCDEF".split("");
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function fetchVoting(url = "", data = {}, type) {
  return fetch(url, {
    method: type,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  }).catch((response) => response.json());
}

function createChartData(options) {
  const optionsInfo = {};
  for (const option of options) {
    optionsInfo[option.getAttribute("data-optionName")] = Number(
      option.getAttribute("data-voteCount")
    );
  }

  return optionsInfo;
}

function createChartColor(optionsLength) {
  const chartColors = [];
  for (let i = 0; i < optionsLength; i++) {
    chartColors.push(getRandomColor());
  }

  return chartColors;
}
