let options;
let dataTable;
let i = 0;
let chart;
let values = [];
let time = [];
let measurement = { values: values, time: time};

google.charts.load("current", { packages: ["corechart"] }).then(function () {
    document.querySelector(".container")
    options = {
        title: "Data visualization chart",
        pointSize: 5,
        hAxis: {
            title: "Time",
        },
        
        vAxis: {
            title: "GSR",
        },
        
        explorer: {},
    };

    dataTable = new google.visualization.DataTable();
    dataTable.addColumn("number", "Time");
    dataTable.addColumn("number", "GSR");

    chart = new google.visualization.LineChart(
        document.getElementById("curve_chart")
    );

    chart.draw(dataTable, options);

    ////////////////////////////////////////////////////////////////////////////////////////

    client = new Paho.MQTT.Client("192.168.8.100", 9001, "browserId");

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({ onSuccess: onConnect });

    function onConnect() {
        console.log("onConnect");
        client.subscribe("HealthyMan/GSR/Data");
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    function onMessageArrived(message) {
        console.log(message.payloadString);
        let splitText = message.payloadString.split(":");
        console.log(splitText);
        let time_tmp = Number(splitText[0]);
        let value_tmp = Number(splitText[1]);
        time.push(time_tmp);
        values.push(value_tmp);
        dataTable.addRow([time_tmp, value_tmp]);
        chart.draw(dataTable, options);
        i++;
    }

    ///////////////////////////////////////////////////////////////////////////////////////

    let btnStart = document.querySelector("#btn-start");
    btnStart.addEventListener("click", function () {
        dataTable = new google.visualization.DataTable();
        dataTable.addColumn("number", "Time");
        dataTable.addColumn("number", "ADCcode");
        values.length = 0;
        time.length = 0;
        message = new Paho.MQTT.Message("1");
        message.destinationName = "HealthyMan/GSR/Start";
        client.send(message);
    });

    let btnStop = document.querySelector("#btn-stop");
    btnStop.addEventListener("click", function () {
        message = new Paho.MQTT.Message("1");
        message.destinationName = "HealthyMan/GSR/Stop";
        client.send(message);
    });

    let btnSend = document.querySelector("#btn-send");
    btnSend.addEventListener("click", function () {
        fetch("http://localhost:50757/api/Measurement", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(measurement)
        });
    });
});
