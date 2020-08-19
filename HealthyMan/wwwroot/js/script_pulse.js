let values = [];
let time = [];
let amplitude = 0;

let pulseMeasurement = {
    pulse: 0,
    peaksCounter: 0,
    variance: 0,
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

// Pulse Calc
let pulse = {
    pulseMeasurement: pulseMeasurement,
    enable1: false,
    enable2: false,
    mean: 0,
    calcPulse: function () {
        if (
            this.pulseMeasurement.values[this.pulseMeasurement.values.length - 1] > 800 &&
            this.enable2 === true
        )
            this.enable1 = true;
        else if (this.pulseMeasurement.values[this.pulseMeasurement.values.length - 1] < 800)
            this.enable2 = true;

        if (this.enable1 === true) {
            this.pulseMeasurement.peaksCounter++;

            this.pulseMeasurement.pulse = Math.round((60 * this.pulseMeasurement.peaksCounter) / this.pulseMeasurement.time[this.pulseMeasurement.time.length - 1]);

            this.enable1 = false;
            this.enable2 = false;
        }
    },
    calcVariance: function() {
        let tmp = 0;
        for (let i = 0; i < this.pulseMeasurement.values.length; i++)
            tmp += this.pulseMeasurement.values[i];

        this.mean = tmp / this.pulseMeasurement.values.length
        tmp = 0;

        for (let i = 0; i < this.pulseMeasurement.values.length; i++)
            tmp += (this.pulseMeasurement.values[i] - this.mean) ** 2;

        this.pulseMeasurement.variance = tmp / this.pulseMeasurement.values.length;
    }
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
    pulse.calcPulse();
    pulse.calcVariance();
    document.querySelector("#pulse").innerHTML = pulseMeasurement.pulse;
    document.querySelector("#peaks-counter").innerHTML = pulseMeasurement.peaksCounter;
    document.querySelector("#amplitude").innerHTML = value_tmp;
    document.querySelector("#variance").innerHTML = pulseMeasurement.variance;
}

/********************************************Buttons handling**********************************************************/

let btnStart = document.querySelector("#btn-start");
btnStart.addEventListener("click", function () {
    myChart.data.datasets[0].data.length = 0;
    time.length = 0;
    values.length = 0;
    pulseMeasurement.peaksCounter = 0;
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

