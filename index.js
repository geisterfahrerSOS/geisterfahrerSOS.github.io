let lol = [
    {
      label: "Temperatur",
      // xAxisID: "A",
    //   yAxisID: "A",
      data: [1, 3, 5, 6],
      borderWidth: 3,
      pointStyle: "cross",
      borderColor: "red",
      fill: true,
      showLine: true,
    },
    {
      label: "Luftfeuchtigkeit",
      yAxisID: "B",
      data: [],
      borderWidth: 1,
      borderColor: "yellow",
      fill: false,
    },
    {
      label: "Windgeschwindigkeit",
      yAxisID: "C",
      data: [],
      borderWidth: 1,
      borderColor: "blue",
      fill: false,
    },
    {
      label: "Windrichtung",
      yAxisID: "D",
      data: [],
      borderWidth: 1,
      borderColor: "green",
      fill: false,
    },
  ];

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [1, 2, 3, 4],
    datasets: [lol[0]],
  },
  options: {
    scales: {
      yAxes: [],
    },
  },
});