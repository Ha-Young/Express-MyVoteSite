new Chart(
  document.getElementById("chartjs-1"),
  {
    "type": "bar",
    "data": {
      "labels" : candidatesData.map(candidate => candidate.title),
      "datasets":[
        {
          "label" : subject,
          "data" : candidatesData.map(candidate => candidate.voters.length),
          "fill" :false,
          "backgroundColor" :[
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          "borderColor" :[
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          "borderWidth":1
        }
      ]
    },
    "options": {
      "layout" : {
        "padding": {
          top: 10
        }
      },
      "scales": {
        "yAxes": [
          {
            "ticks": {
              "beginAtZero":true,
              "precision": 0,
            }
          }
        ]
      }
    }
  }
);
