let values = [];
let time = [];

let GSRMeasurement = {
    values: values,
    time: time,
    timeStamp: new Date(),
    // Patient
    patient: {
        firstName: "",
        lastName: "",
        birthDate: new Date()
    }
};


/**********************************************Chart.js********************************************************/
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: "line",
    data: {
        datasets: [
            {
                label: "GSR",
                lineTension: 0,
                data: [
                    {
                        x: 0,
                        y: 0,
                    },
                ],
            },
        ],
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    type: "linear",
                    position: "bottom",
                    scaleLabel: {
                        display: true,
                        labelString: "Time [s]",
                    },
                },
            ],
            yAxes: [
                {
                    type: "linear",
                    scaleLabel: {
                        display: true,
                        labelString: "Resistance [Ω]",
                    },
                },
            ],
        },
    },
});
/***********************************************Paho.MQTT.Client*******************************************************/
let client = new Paho.MQTT.Client("192.168.8.100", 9001, "browserId");

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
    //console.log(splitText);
    let time_tmp = Number(splitText[0]);
    let value_tmp = Number(splitText[1]);
    time.push(time_tmp);
    values.push(value_tmp);
    myChart.data.datasets[0].data.push({ x: time_tmp, y: value_tmp });
    if (time_tmp > 7) myChart.data.datasets[0].data.shift();
    myChart.update(0);
    document.querySelector("#resistance").innerHTML = Math.round(value_tmp).toString() +" Ω";
}

/********************************************Buttons handling**********************************************************/

let btnStart = document.querySelector("#btn-start");
btnStart.addEventListener("click", function () {
    myChart.data.datasets[0].data.length = 0;
    time.length = 0;
    values.length = 0;

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
    GSRMeasurement.patient.firstName = document.querySelector("input#firstName").value;
    GSRMeasurement.patient.lastName = document.querySelector("input#lastName").value;
    GSRMeasurement.patient.birthDate = document.querySelector("input#birthDate").value;
    fetch("http://localhost:50757/api/GSRMeasurement", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(GSRMeasurement)
    }).then(function (response) {
        console.log("Response:");
        console.log(response);
        if (response.status === 200) {
            alert("Saved succesfully");
            location.reload();
        }
        else alert(`Saving failed\nStatus: ${response.status}`);
    });
});

