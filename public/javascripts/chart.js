const optionData = document.querySelectorAll("input[type=radio]");

const countDatas = [];
const contentDatas = [];

for (let i = 0; i < optionData.length; i++) {
  countDatas.push(Number(optionData[i].dataset.count));
  contentDatas.push(optionData[i].dataset.content);
}

const colorSchemes = ["#d63031", "#e84393", "#55efc4", "#81ecec", "#74b9ff", "#a29bfe",
"#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#ffeaa7", "#fab1a0", "#ff7675", "#fd79a8",
"#fdcb6e", "#e17055"];

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: contentDatas,
    datasets: [{
      label: '# of votes',
      backgroundColor: colorSchemes.splice(0, contentDatas.length),
      data: countDatas,
    }],
  },
  options: {
    maintainAspectRatio: true,
  }
});
