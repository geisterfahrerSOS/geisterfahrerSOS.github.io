var ctx = document.getElementById("myChart").getContext("2d");
// ctx.height = 900;
var myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [1, 2, 3, 4],
        datasets: [{
            data: [1, 2, 3, 4],
        }, ],
    },

    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [],
        },
    },
});
let dataSets = [{
        label: "Temperatur",
        yAxisID: "A",
        // xAxisID: "Z",
        data: [],
        borderColor: "#C53815",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
    },
    {
        label: "Luftfeuchtigkeit",
        yAxisID: "B",
        data: [],
        borderColor: "#177469",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
    },
    {
        label: "Windgeschwindigkeit",
        yAxisID: "C",
        data: [],
        borderColor: "#D39E19",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
    },
    {
        label: "Windrichtung",
        yAxisID: "D",
        data: [],
        borderColor: "#E26D0D",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
    },
];
let yAxes = [{
        id: "A",
        type: "linear",
        position: "left",
        scaleLabel: {
            display: true,
            labelString: "Grad Celsius",
            fontColor: "#C53815",
        },
        color: "red",
        ticks: {
            fontColor: "#C53815",
            callback: function(value, index, values) {
                return value + "°C";
            },
        },
    },
    {
        id: "B",
        type: "linear",
        position: "left",
        ticks: {
            fontColor: "#177469",
            callback: function(value, index, values) {
                return value + "%";
            },
        },
        scaleLabel: {
            display: true,
            labelString: "Prozent Leftfeuchte",
            fontColor: "#177469",
        },
    },
    {
        id: "C",
        type: "linear",
        position: "right",
        ticks: {
            fontColor: "#D39E19",
            callback: function(value, index, values) {
                return value + " km/h";
            },
        },
        scaleLabel: {
            display: true,
            labelString: "Windgeschwindigkeit",
            fontColor: "#D39E19",
        },
    },
    {
        id: "D",
        type: "linear",
        position: "right",
        scaleLabel: {
            display: true,
            fontColor: "#E26D0D",
            labelString: "Windrichtung",
        },
        ticks: {
            fontColor: "#E26D0D",
            callback: function(value, index, values) {
                return value + "°";
            },
        },
    },
];
let monthArray = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "October",
    "November",
    "Dezember",
];
let weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
let smooth = 50;
let rawData = [];
let = daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let d = new Date();
document.getElementsByClassName("datePeriod")[0].innerHTML =
    weekDays[d.getDay()] +
    ", " +
    d.getDate() +
    ".  " +
    monthArray[d.getMonth()] +
    " " +
    (1900 + d.getYear());
initListeners();
getData();
refresh();

console.log(smoothData([1, 4, 6, 7, 8, 4, 8, 2, 5, 7, 8, 9, 0], 3));

function smoothData(dataArray, smoothness) {
    let backData = [];
    for (let i = 0; i < dataArray.length - smoothness; i++) {
        backData.push(
            dataArray
            .slice(i, i + smoothness)
            .reduce((accumulator, currentValue) => accumulator + currentValue) /
            smoothness
        );
    }
    for (let i = dataArray.length - smoothness; i < dataArray.length; i++) {
        backData.push(dataArray[i]);
    }
    return backData;
}

function getData() {
    //Hourly Data
    let tempArray = [];
    let humidArray = [];
    let windArray = [];
    let windDirArray = [];
    for (let i = 0; i < 8760; i++) {
        if (i === 0) {
            tempArray.push(20 + 5 * (Math.random() - 0.5));
            humidArray.push(70 + 10 * (Math.random() - 0.5));
            windArray.push(50 + 4 * (Math.random() - 0.5));
            windDirArray.push(Math.abs(100 + 30 * (Math.random() - 0.5)) % 360);
        } else {
            tempArray.push(tempArray[i - 1] + 2 * (Math.random() - 0.5));
            humidArray.push(humidArray[i - 1] + 10 * (Math.random() - 0.5));
            windArray.push(windArray[i - 1] + 5 * (Math.random() - 0.5));
            windDirArray.push(
                Math.abs(windDirArray[i - 1] + 20 * (Math.random() - 0.5)) % 360
            );
        }
    }
    rawData.push(tempArray);
    rawData.push(humidArray);
    rawData.push(windArray);
    rawData.push(windDirArray);
    dataSets[0].data = tempArray;
    dataSets[1].data = humidArray;
    dataSets[2].data = windArray;
    dataSets[3].data = windDirArray;
}

function initListeners() {
    // Initializing datePeriod
    let slider = document.getElementById("myRange");
    let sliderOutput = document.getElementsByClassName("sliderValue")[0];
    slider.oninput = function() {
        sliderOutput.innerHTML = this.value;
        smooth = this.value;
    };

    let currentDate;
    switch (getSelection().timeFrameValue) {
        case 0:
            currentDate =
                weekDays[d.getDay()] +
                ", " +
                d.getDate() +
                ".  " +
                monthArray[d.getMonth()] +
                " " +
                (1900 + d.getYear());
            document.getElementsByClassName("datePeriod")[0].innerHTML = currentDate;
            break;
        case 1:
            d.setDate(d.getDate() - 7);

            currentDate =
                weekDays[d.getDay()] +
                ", " +
                d.getDate() +
                ".  " +
                monthArray[d.getMonth()] +
                " " +
                (1900 + d.getYear());

            d.setDate(d.getDate() + 7);

            currentDate +=
                " - " +
                weekDays[d.getDay()] +
                ", " +
                d.getDate() +
                ".  " +
                monthArray[d.getMonth()] +
                " " +
                (1900 + d.getYear());
            d.setDate(d.getDate() - 7);
            document.getElementsByClassName("datePeriod")[0].innerHTML = currentDate;
            break;
        case 2:
            d.setMonth(d.getMonth() - 1);
            currentDate = monthArray[d.getMonth()] + " " + (1900 + d.getYear());
            document.getElementsByClassName("datePeriod")[0].innerHTML = currentDate;
        default:
            break;
    }
    document.getElementsByClassName("datePeriod")[0].innerHTML = currentDate;
    // Timeframe Eventlisteners
    let timeFrame = [];
    timeFrame.push(
        document.getElementsByClassName("timeFrameSwitch")[0].childNodes[1]
    );
    timeFrame.push(
        document.getElementsByClassName("timeFrameSwitch")[0].childNodes[3]
    );
    timeFrame.push(
        document.getElementsByClassName("timeFrameSwitch")[0].childNodes[5]
    );
    for (let i = 0; i < timeFrame.length; i++) {
        let item = timeFrame[i];
        item.addEventListener("click", (event) => {
            for (let count of timeFrame) {
                count.style.backgroundColor = "white";
                count.style.color = "black";
            }
            item.style.backgroundColor = "grey";
            item.style.color = "white";
            let currentDate;
            switch (getSelection().timeFrameValue) {
                case 0:
                    currentDate =
                        weekDays[d.getDay()] +
                        ", " +
                        d.getDate() +
                        ".  " +
                        monthArray[d.getMonth()] +
                        " " +
                        (1900 + d.getYear());
                    document.getElementsByClassName(
                        "datePeriod"
                    )[0].innerHTML = currentDate;
                    break;
                case 1:
                    currentDate =
                        weekDays[d.getDay()] +
                        ", " +
                        d.getDate() +
                        ".  " +
                        monthArray[d.getMonth()] +
                        " " +
                        (1900 + d.getYear());

                    d.setDate(d.getDate() + 7);

                    currentDate +=
                        " - " +
                        weekDays[d.getDay()] +
                        ", " +
                        d.getDate() +
                        ".  " +
                        monthArray[d.getMonth()] +
                        " " +
                        (1900 + d.getYear());
                    d.setDate(d.getDate() - 7);
                    document.getElementsByClassName(
                        "datePeriod"
                    )[0].innerHTML = currentDate;
                    break;
                case 2:
                    currentDate = monthArray[d.getMonth()] + " " + (1900 + d.getYear());
                    document.getElementsByClassName(
                        "datePeriod"
                    )[0].innerHTML = currentDate;
                default:
                    break;
            }
            document.getElementsByClassName("datePeriod")[0].innerHTML = currentDate;
        });
    }
    //Left Right Increments
    let arrows = [];
    for (let i = 1; i < 4; i += 2) {
        arrows.push(
            document.getElementsByClassName("changeDateWrapper")[0].childNodes[i]
        );
    }
    console.log(arrows);
    arrows[0].addEventListener("click", (event) => {
        let currentDate;
        switch (getSelection().timeFrameValue) {
            case 0:
                d.setDate(d.getDate() - 1);
                currentDate =
                    weekDays[d.getDay()] +
                    ", " +
                    d.getDate() +
                    ".  " +
                    monthArray[d.getMonth()] +
                    " " +
                    (1900 + d.getYear());
                document.getElementsByClassName(
                    "datePeriod"
                )[0].innerHTML = currentDate;
                break;
            case 1:
                d.setDate(d.getDate() - 7);

                currentDate =
                    weekDays[d.getDay()] +
                    ", " +
                    d.getDate() +
                    ".  " +
                    monthArray[d.getMonth()] +
                    " " +
                    (1900 + d.getYear());

                d.setDate(d.getDate() + 7);

                currentDate +=
                    " - " +
                    weekDays[d.getDay()] +
                    ", " +
                    d.getDate() +
                    ".  " +
                    monthArray[d.getMonth()] +
                    " " +
                    (1900 + d.getYear());
                d.setDate(d.getDate() - 7);
                document.getElementsByClassName(
                    "datePeriod"
                )[0].innerHTML = currentDate;
                break;
            case 2:
                d.setMonth(d.getMonth() - 1);
                currentDate = monthArray[d.getMonth()] + " " + (1900 + d.getYear());
                document.getElementsByClassName(
                    "datePeriod"
                )[0].innerHTML = currentDate;
            default:
                break;
        }
        document.getElementsByClassName("datePeriod")[0].innerHTML = currentDate;
    });
    arrows[1].addEventListener("click", (event) => {
        let currentDate;
        switch (getSelection().timeFrameValue) {
            case 0:
                d.setDate(d.getDate() + 1);
                currentDate =
                    weekDays[d.getDay()] +
                    ", " +
                    d.getDate() +
                    ".  " +
                    monthArray[d.getMonth()] +
                    " " +
                    (1900 + d.getYear());
                document.getElementsByClassName(
                    "datePeriod"
                )[0].innerHTML = currentDate;
                break;
            case 1:
                d.setDate(d.getDate() + 7);

                currentDate =
                    weekDays[d.getDay()] +
                    ", " +
                    d.getDate() +
                    ".  " +
                    monthArray[d.getMonth()] +
                    " " +
                    (1900 + d.getYear());

                d.setDate(d.getDate() + 7);

                currentDate +=
                    " - " +
                    weekDays[d.getDay()] +
                    ", " +
                    d.getDate() +
                    ".  " +
                    monthArray[d.getMonth()] +
                    " " +
                    (1900 + d.getYear());
                d.setDate(d.getDate() - 7);
                console.log(currentDate);
                document.getElementsByClassName(
                    "datePeriod"
                )[0].innerHTML = currentDate;
                break;
            case 2:
                d.setMonth(d.getMonth() + 1);
                currentDate = monthArray[d.getMonth()] + " " + (1900 + d.getYear());
                document.getElementsByClassName(
                    "datePeriod"
                )[0].innerHTML = currentDate;
            default:
                break;
        }
    });
}

function getSelection() {
    let checkBoxes = document.getElementsByClassName("checkBoxWrapper")[0]
        .childNodes;
    let checkBoxValues = [];
    for (let i = 1; i < 9; i += 2) {
        checkBoxValues.push(checkBoxes[i].getElementsByTagName("input")[0].checked);
    }
    let timeFrameValue;
    let timeFrame = [];
    timeFrame.push(
        document.getElementsByClassName("timeFrameSwitch")[0].childNodes[1]
    );
    timeFrame.push(
        document.getElementsByClassName("timeFrameSwitch")[0].childNodes[3]
    );
    timeFrame.push(
        document.getElementsByClassName("timeFrameSwitch")[0].childNodes[5]
    );
    for (let i = 0; i < timeFrame.length; i++) {
        if (timeFrame[i].style.backgroundColor === "grey") {
            timeFrameValue = i;
            break;
        }
    }

    return {
        checkBoxValues: checkBoxValues,
        timeFrameValue: timeFrameValue,
    };
}

function daysYearToDate() {
    let totalDays = 0;
    for (let i = 0; i < d.getMonth(); i++) {
        totalDays += daysInMonth[i];
    }
    totalDays += d.getDate() - 1;
    return totalDays;
}

function graphEditor(selection) {
    // Different Datasets´
    //Getting slice values; hours since beginning of the year; zero is Jan 1 2020
    let sliceObj = {
        start: 0,
        end: 10,
    };
    switch (selection.timeFrameValue) {
        case 0:
            sliceObj.start = 24 * daysYearToDate();
            sliceObj.end = sliceObj.start + 24;
            break;
        case 1:
            sliceObj.start = 24 * daysYearToDate();
            sliceObj.end = sliceObj.start + 24 * 7;
            break;
        case 2:
            let accumulator = 0;
            for (let i = 0; i < d.getMonth(); i++) {
                accumulator += daysInMonth[i];
            }
            sliceObj.start = 24 * accumulator;
            sliceObj.end = sliceObj.start + 24 * daysInMonth[d.getMonth()];
            break;
        default:
            break;
    }
    for (let i = 0; i < 4; i++) {
        dataSets[i].data = smoothData(rawData[i], parseInt(smooth)).slice(
            sliceObj.start,
            sliceObj.end
        );
    }
    let snapShots = document.getElementsByClassName("snapShotItem");
    //Giving snapshot data
    for (let i = 0; i < snapShots.length; i++) {
        let text = Math.floor(
            dataSets[i].data.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            ) / dataSets[i].data.length
        );
        switch (i) {
            case 0:
                text += "°C";
                break;
            case 1:
                text += "%";
                break;
            case 2:
                text += "Km/h";
                break;
            case 3:
                text += "°";
                break;
            default:
                break;
        }
        console.log(text);
        snapShots[i].childNodes[1].innerHTML = text;
    }
    while (myChart.data.datasets.length > 0) {
        myChart.options.scales.yAxes.pop();
        myChart.data.datasets.pop();
    }
    for (let i = 0; i < selection.checkBoxValues.length; i++) {
        if (selection.checkBoxValues[i]) {
            myChart.options.scales.yAxes.push(yAxes[i]);
            myChart.data.datasets.push(dataSets[i]);
        }
    }
    // Labels
    while (myChart.data.labels.length > 0) {
        myChart.data.labels.pop();
    }
    switch (selection.timeFrameValue) {
        case 0:
            for (let i = 0; i < 25; i++) {
                if (i / 10 >= 1) {
                    myChart.data.labels.push(i + ":00");
                } else {
                    myChart.data.labels.push("0" + i + ":00");
                }
            }
            break;
        case 1:
            for (let i = 1; i < 168; i++) {
                //change Date depending on month
                myChart.data.labels.push(weekDays[Math.floor(i / 24)]);
            }
            break;
        case 2:
            for (let i = 1; i < 24 * daysInMonth[d.getMonth()]; i++) {
                //change Date depending on month
                myChart.data.labels.push(Math.floor(i / 24) + "/" + (d.getMonth() + 1));
            }
            break;

        default:
            break;
    }
    myChart.update();
}

function getXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = xhttp.responseText;
            let totalValues = data.split(",");
        }
    };
    xhttp.open("GET", "text.txt", true);
    xhttp.send();
}

function refresh() {
    myChart.destroy();
    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [],
        },
        options: {
            scales: {
                yAxes: [],
                xAxes: [{
                    ticks: {
                        autoSkipPadding: 38,
                    }
                }]
            },
        },
    });
    graphEditor(getSelection());
}