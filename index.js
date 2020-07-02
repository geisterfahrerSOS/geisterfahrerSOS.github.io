var ctx = document.getElementById("myChart").getContext("2d");
// ctx.height = 900;
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [1, 2, 3, 4],
    datasets: [
      {
        data: [1, 2, 3, 4],
        yAxisID: "A",
      },
    ],
  },

  options: {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        id: "A",
        display: false,
      },
    ],
    xAxes: [{
      ticks:{
        fontColor: "blue",
      },
      display: true,
    },]
    },
  },
});
