let values = [];
let time = [];
let pulseSpan = document.querySelector("#pulse");
let counter = document.querySelector("#counter");
let pulseMeasurement = {
    pulse: 0,
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
console.log(pulseMeasurement.timeStamp);
// Pulse Calc
let pulse = {
    value: 0,
    measurement: pulseMeasurement,
    counter: 0,
    enable1: false,
    enable2: false,
    calc: function () {
        if (
            this.measurement.values[this.measurement.values.length - 1] > 800 &&
            this.enable2 === true
        )
            this.enable1 = true;
        else if (this.measurement.values[this.measurement.values.length - 1] < 800)
            this.enable2 = true;

        if (this.enable1 === true) {
            this.counter++;

            this.value = Math.round((60 * this.counter) / this.measurement.time[this.measurement.time.length - 1]);


            this.enable1 = false;
            this.enable2 = false;
        }
    },
};




/**********************************************Chart.js********************************************************/
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: "line",
    data: {
        datasets: [
            {
                label: "Pulse",
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
                        labelString: "ADC code",
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
    client.subscribe("HealthyMan/Pulse/Data");
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
    pulse.calc();
    pulseSpan.innerHTML = pulse.value;
    counter.innerHTML = pulse.counter;
}

/********************************************Buttons handling**********************************************************/

let btnStart = document.querySelector("#btn-start");
btnStart.addEventListener("click", function () {
    myChart.data.datasets[0].data.length = 0;
    time.length = 0;
    values.length = 0;
    pulse.counter = 0;
    pulse.enable1 = false;
    pulse.enable2 = false;

    message = new Paho.MQTT.Message("1");
    message.destinationName = "HealthyMan/Pulse/Start";
    client.send(message);
});

let btnStop = document.querySelector("#btn-stop");
btnStop.addEventListener("click", function () {
    message = new Paho.MQTT.Message("1");
    message.destinationName = "HealthyMan/Pulse/Stop";
    client.send(message);
    pulseMeasurement.pulse = pulse.value;
});

let btnSend = document.querySelector("#btn-send");
btnSend.addEventListener("click", function () {
    pulseMeasurement.patient.firstName = document.querySelector("input#firstName").value;
    pulseMeasurement.patient.lastName = document.querySelector("input#lastName").value;
    pulseMeasurement.patient.birthDate = document.querySelector("input#birthDate").value;
    fetch("http://localhost:50757/api/PulseMeasurement", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pulseMeasurement)
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

