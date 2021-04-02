import { deleteVote } from "./common.js";

const backButton = document.querySelector("#backButton");

const optionsTitle = document.querySelectorAll(".vote-result li .title");
const optionsCount = document.querySelectorAll(".vote-result li .count");

const optionsLabel = Array.prototype.slice.call(optionsTitle).map(title => title.textContent);
const optionsData = Array.prototype.slice.call(optionsCount).map(count => Number(count.textContent));

const canvas = document.querySelector("#vote-chart");

if (canvas) {
  const chart = new Chart(canvas.getContext("2d"), {
    type: "pie",
    data: {
      labels: optionsLabel,
      datasets: [{
        data: optionsData,
        backgroundColor: [
          "rgba(90, 60, 255, 1)",
          "rgba(253, 255, 82, 1)",
          "rgba(232, 44, 94, 1)",
          "rgba(255, 170, 48, 1)",
          "rgba(100, 217, 209, 0.85)",
          "rgba(192, 48, 255, 1)",
          "rgba(255, 100, 90, 1)",
          "rgba(48, 255, 183, 1)"
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
}

backButton.addEventListener("click", () => {
  const previousUrl = document.referrer;
  window.location = previousUrl;
});

deleteVote();
