const $optionText = document.getElementsByClassName('option-text');
const $optionCount = document.getElementsByClassName('option-count');

const text = [];
const count = [];

for (let i = 0; i < $optionText.length; i++) {
  text.push($optionText[i].getAttribute('name'));
  count.push($optionCount[i].getAttribute('name'));
}

const ctx = document.getElementById('vote-chart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: text,
        datasets: [{
            label: '# of Votes',
            data: count,
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
});
