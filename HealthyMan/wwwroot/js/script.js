let pulseValues = [];
let pulseTime = [];

let pulseAmplitude = [];
let pulseAmplitudeTime = [];
let pulseAmplitudeVariance = [];
let pulseFrequency = [];
let pulseFrequencyTime = [];
let pulseFrequencyVariance = [];

let gsrValues = []; //Ω
let gsrTime = [];
let resistanceValues = []; //kΩ
let conductanceValues = []; //uS

let respiratoryRateValues = [];
let respiratoryRateTime = [];

let measurement = {
    pulse: 0,
    peaksCounter: 0,
    //variance: 0,
    pulseValues: pulseValues,
    pulseTime: pulseTime,
    pulseAmplitude: pulseAmplitude,
    pulseAmplitudeTime: pulseAmplitudeTime,
    pulseAmplitudeVariance: pulseAmplitudeVariance,
    pulseFrequency: pulseFrequency,
    pulseFrequencyTime: pulseFrequencyTime,
    pulseFrequencyVariance: pulseFrequencyVariance,
    gsrValues: gsrValues,
    gsrTime: gsrTime,
    respiratoryRateValues: respiratoryRateValues,
    respiratoryRateTime: respiratoryRateTime,
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
    pulseMeasurement: measurement,
    enable1: false,
    enable2: false,
    meanPulseAmplitude: 0,
    meanPulseFrequency: 0,
    max: 0,
    min: 0,
    calcAmplitudePeaksCounter: 0,
    calcPulse: function (time) {
        if (
            this.pulseMeasurement.pulseValues[this.pulseMeasurement.pulseValues.length - 1] > 800 &&
            this.enable2 === true
        )
            this.enable1 = true;
        else if (this.pulseMeasurement.pulseValues[this.pulseMeasurement.pulseValues.length - 1] < 800)
            this.enable2 = true;

        if (this.enable1 === true) {
            this.pulseMeasurement.peaksCounter++;
            document.querySelector("#peaks-counter").innerHTML = this.pulseMeasurement.peaksCounter;

            let frequency = Math.round(this.pulseMeasurement.peaksCounter / this.pulseMeasurement.pulseTime[this.pulseMeasurement.pulseTime.length - 1] * 100) / 100;
            this.pulseMeasurement.pulseFrequency.push(frequency);
            this.pulseMeasurement.pulseFrequencyTime.push(time);
            this.pulseMeasurement.pulse = Math.round(60 * frequency);
            document.querySelector("#frequency").innerHTML = frequency+" Hz";
            document.querySelector("#pulse").innerHTML = this.pulseMeasurement.pulse;
            this.calcPulseFrequencyVariance();

            this.enable1 = false;
            this.enable2 = false;

            if (this.pulseMeasurement.peaksCounter < 3) {
                this.pulseMeasurement.pulseFrequency.shift();
                this.pulseMeasurement.pulseFrequencyTime.shift();
                this.pulseMeasurement.pulseFrequencyVariance.shift();
            }
        }

        this.calcAmplitude(time);
    },
    calcAmplitude: function (time) {
        if (this.calcAmplitudePeaksCounter != this.pulseMeasurement.peaksCounter) {
            this.calcAmplitudePeaksCounter = this.pulseMeasurement.peaksCounter;
            let amplitude = this.max - this.min;
            this.pulseMeasurement.pulseAmplitude.push(amplitude);
            this.pulseMeasurement.pulseAmplitudeTime.push(time);
            document.querySelector("#amplitude").innerHTML = amplitude;
            this.calcPulseAmplitudeVariance();
            if (this.calcAmplitudePeaksCounter < 2) {
                this.pulseMeasurement.pulseAmplitude.shift();
                this.pulseMeasurement.pulseAmplitudeTime.shift();
                this.pulseMeasurement.pulseAmplitudeVariance.shift();
            }
      
            this.min = 1024;
            this.max = 0;
        }

        if (this.pulseMeasurement.pulseValues[this.pulseMeasurement.pulseValues.length - 1] > this.max) {
            this.max = this.pulseMeasurement.pulseValues[this.pulseMeasurement.pulseValues.length - 1]      
        }
        else if (this.pulseMeasurement.pulseValues[this.pulseMeasurement.pulseValues.length - 1] < this.min) {
            this.min = this.pulseMeasurement.pulseValues[this.pulseMeasurement.pulseValues.length - 1]
        }
    },
    calcPulseAmplitudeVariance: function () {
        let tmp = 0;
        for (let i = 0; i < this.pulseMeasurement.pulseAmplitude.length; i++)
            tmp += this.pulseMeasurement.pulseAmplitude[i];

        this.meanPulseAmplitude = tmp / this.pulseMeasurement.pulseAmplitude.length
        tmp = 0;

        for (let i = 0; i < this.pulseMeasurement.pulseAmplitude.length; i++)
            tmp += (this.pulseMeasurement.pulseAmplitude[i] - this.meanPulseAmplitude) ** 2;

        let pulseAmplitudeVariance = Math.round(100 * tmp / this.pulseMeasurement.pulseAmplitude.length) / 100;
        this.pulseMeasurement.pulseAmplitudeVariance.push(pulseAmplitudeVariance);
        document.querySelector("#pulse-amplitude-variance").innerHTML = pulseAmplitudeVariance;
    },
    calcPulseFrequencyVariance: function () {
        let tmp = 0;
        for (let i = 0; i < this.pulseMeasurement.pulseFrequency.length; i++)
            tmp += this.pulseMeasurement.pulseFrequency[i];

        this.meanPulseFrequency = tmp / this.pulseMeasurement.pulseFrequency.length
        tmp = 0;

        for (let i = 0; i < this.pulseMeasurement.pulseFrequency.length; i++)
            tmp += (this.pulseMeasurement.pulseFrequency[i] - this.meanPulseFrequency) ** 2;

        let pulseFrequencyVariance = Math.round(10000 * tmp / this.pulseMeasurement.pulseAmplitude.length) / 10000;
        this.pulseMeasurement.pulseFrequencyVariance.push(pulseFrequencyVariance);
        document.querySelector("#pulse-frequency-variance").innerHTML = pulseFrequencyVariance;
    },
};

/*
let gsrTrend = {
    gsrTimeArray: [],
    gsrValuesArray: [],
    meanValue: 0,
    meanTime: 0,
    a: 0,
    b: 0,
    startPoint: {
        x: 0,
        y: 0,
    },
    endPoint: {
        x: 0,
        y: 0,
    },
    calc: function (gsrStartTime, gsrTime, gsrValue,shiftBool) {
        this.gsrTimeArray.push(gsrTime);
        this.gsrValuesArray.push(gsrValue);

        if (shiftBool) {
            this.gsrTimeArray.shift();
            this.gsrValuesArray.shift();
        }

        let tmp1 = 0;
        let tmp2 = 0;

        for (let i = 0; i < this.gsrValuesArray.length; i++) {
            tmp1 += this.gsrValuesArray[i];
            tmp2 += this.gsrTimeArray[i];
        }

        this.meanValue = tmp1 / this.gsrValuesArray.length;
        this.meanTime = tmp2 / this.gsrValuesArray.length;
        tmp1 = 0;
        tmp2 = 0;

        for (let i = 0; i < this.gsrValuesArray.length; i++) {
            tmp1 += (this.gsrTimeArray[i] - this.meanTime) * (this.gsrValuesArray[i] - this.meanValue);
            tmp2 += (this.gsrTimeArray[i] - this.meanTime) ** 2;
        }

        this.a = tmp1 / tmp2;
        this.b = this.meanValue - this.a * this.meanTime;

        this.endPoint.x = gsrTime;
        this.endPoint.y = Math.round(this.a * gsrTime + this.b);

        this.startPoint.x = gsrStartTime;
        this.startPoint.y = Math.round(this.a * gsrStartTime + this.b);
    }
}
*/
let gsrTrend = {
    meanValue: 0,
    meanTime: 0,
    a: 0,
    b: 0,
    startPoint: {
        x: 0,
        y: 0,
    },
    endPoint: {
        x: 0,
        y: 0,
    },
    calc: function () {
        let tmp1 = 0;
        let tmp2 = 0;

        for (let i = 0; i < gsrChart.data.datasets[0].data.length; i++) {
            tmp1 += gsrChart.data.datasets[0].data[i].y;
            tmp2 += gsrChart.data.datasets[0].data[i].x;
        }

        this.meanValue = tmp1 / gsrChart.data.datasets[0].data.length;
        this.meanTime = tmp2 / gsrChart.data.datasets[0].data.length;
        tmp1 = 0;
        tmp2 = 0;

        for (let i = 0; i < gsrChart.data.datasets[0].data.length; i++) {
            tmp1 += (gsrChart.data.datasets[0].data[i].x - this.meanTime) * (gsrChart.data.datasets[0].data[i].y - this.meanValue);
            tmp2 += (gsrChart.data.datasets[0].data[i].x - this.meanTime) ** 2;
        }

        this.a = tmp1 / tmp2;
        this.b = this.meanValue - this.a * this.meanTime;

        this.endPoint.x = gsrChart.data.datasets[0].data[gsrChart.data.datasets[0].data.length - 1].x;
        this.endPoint.y = Math.round(1000 * (this.a * gsrChart.data.datasets[0].data[gsrChart.data.datasets[0].data.length - 1].x + this.b)) /  1000;

        this.startPoint.x = gsrChart.data.datasets[0].data[0].x;
        this.startPoint.y = Math.round(1000 * (this.a * gsrChart.data.datasets[0].data[0].x + this.b)) / 1000;
    }
}

/**********************************************Chart.js Pulse********************************************************/
var pulseContext = document.getElementById("pulseChart").getContext("2d");
var pulseChart = new Chart(pulseContext, {
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
                        labelString: "Blood pressure",
                    },
                },
            ],
        },
    },
});

/***********************************************Chart.js GSR*******************************************************/

var gsrContext = document.getElementById("GSRChart").getContext("2d");
var gsrChart = new Chart(gsrContext, {
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
            {
                label: "Linear trend",
                lineTension: 0,
                data: [
                    {
                        x: 0,
                        y: 0,
                    },
                ],
                backgroundColor: "rgba(0, 0, 255, 0.5)",
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

/***********************************************Chart.js RespiratoryRate*******************************************************/

var respiratoryRateContext = document.getElementById("RespiratoryRateChart").getContext("2d");
var respiratoryRateChart = new Chart(respiratoryRateContext, {
    type: "line",
    data: {
        datasets: [
            {
                label: "Respiratory Rate",
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
                        labelString: "Chest circumference",
                    },
                },
            ],
        },
    },
});

/***********************************************Paho.MQTT.Client*******************************************************/
let client = new Paho.MQTT.Client("localhost", 9001, "browserId");

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({ onSuccess: onConnect });

function onConnect() {
    console.log("Connected to MQTT Broker");
    client.subscribe("HealthyMan/Pulse/Data");
    client.subscribe("HealthyMan/GSR/Data");
    client.subscribe("HealthyMan/RespiratoryRate/Data");
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    if (message.destinationName === "HealthyMan/Pulse/Data") {
        //console.log(message.payloadString);
        let splitText = message.payloadString.split(":");
        //console.log(splitText);
        let time_tmp = Number(splitText[0]);
        let value_tmp = Number(splitText[1]);
        pulseTime.push(time_tmp);
        pulseValues.push(value_tmp);
        pulseChart.data.datasets[0].data.push({ x: time_tmp, y: value_tmp });
        if (time_tmp > 7) pulseChart.data.datasets[0].data.shift();
        pulseChart.update(0);
        pulse.calcPulse(time_tmp);
    }
    else if (message.destinationName === "HealthyMan/GSR/Data") {
        //console.log(message.payloadString);
        let splitText = message.payloadString.split(":");
        //console.log(splitText);
        let time_tmp = Number(splitText[0]);
        let value_tmp = Number(splitText[1]);
        let resistance_tmp = value_tmp / 1000;
        let conductance_tmp = Math.round(1000 * 1000000 / value_tmp) / 1000;
        gsrTime.push(time_tmp);
        gsrValues.push(value_tmp);
        resistanceValues.push(resistance_tmp);
        conductanceValues.push(conductance_tmp);
        
        if (time_tmp > 7) gsrChart.data.datasets[0].data.shift();
 
        if (document.querySelector("input#om").checked) {
            gsrChart.data.datasets[0].data.push({ x: time_tmp, y: resistance_tmp });
            document.querySelector("#gsr-value").innerHTML = resistance_tmp + " kΩ";
        }
        else {
            gsrChart.data.datasets[0].data.push({ x: time_tmp, y: conductance_tmp });
            document.querySelector("#gsr-value").innerHTML = conductance_tmp + " uS";
        }

        gsrTrend.calc();
        gsrChart.data.datasets[1].data.length = 0;
        gsrChart.data.datasets[1].data.push(gsrTrend.startPoint);
        gsrChart.data.datasets[1].data.push(gsrTrend.endPoint);

        gsrChart.update(0);
            
    }
    else if (message.destinationName === "HealthyMan/RespiratoryRate/Data") {
        console.log(message.payloadString);
        let splitText = message.payloadString.split(":");
        //console.log(splitText);
        let time_tmp = Number(splitText[0]);
        let value_tmp = Number(splitText[1]);
        respiratoryRateTime.push(time_tmp);
        respiratoryRateValues.push(value_tmp);
        respiratoryRateChart.data.datasets[0].data.push({ x: time_tmp, y: value_tmp });
        if (time_tmp > 7) respiratoryRateChart.data.datasets[0].data.shift();
        respiratoryRateChart.update(0);
    }
}

/********************************************Buttons handling**********************************************************/

let btnStart = document.querySelector("#btn-start");
btnStart.addEventListener("click", function () {
    pulseChart.data.datasets[0].data.length = 0;
    gsrChart.data.datasets[0].data.length = 0;
    respiratoryRateChart.data.datasets[0].data.length = 0;
    pulseTime.length = 0;
    pulseValues.length = 0;
    gsrTime.length = 0;
    gsrValues.length = 0;
    resistanceValues.length = 0;
    conductanceValues.length = 0;
    respiratoryRateTime.length = 0;
    respiratoryRateValues.length = 0;
    measurement.peaksCounter = 0;
    pulseAmplitude.length = 0;
    pulseAmplitudeTime.length = 0;
    pulseAmplitudeVariance.length = 0;
    pulseFrequency.length = 0;
    pulseFrequencyTime.length = 0;
    pulseFrequencyVariance.length = 0;
    pulse.enable1 = false;
    pulse.enable2 = false;

    message = new Paho.MQTT.Message("1");
    message.destinationName = "HealthyMan/Start";
    client.send(message);
});

let btnStop = document.querySelector("#btn-stop");
btnStop.addEventListener("click", function () {
    message = new Paho.MQTT.Message("1");
    message.destinationName = "HealthyMan/Stop";
    client.send(message);
});

let radioButtons = document.querySelector(".radio-buttons");
radioButtons.addEventListener("change", function (e) {
    //console.log(e);
    if (e.target.id == "siemens") {
        document.querySelector("#gsr-name").innerHTML = "<b>Conductance: </b>";
        if (gsrChart.data.datasets[0].data.length > 1) {
            document.querySelector("#gsr-value").innerHTML = conductanceValues[conductanceValues.length - 1] + " uS";
            for (let i = 0; i < gsrChart.data.datasets[0].data.length; i++) {
                gsrChart.data.datasets[0].data[i].y = conductanceValues[i]; 
            }
            gsrTrend.calc();
            gsrChart.data.datasets[1].data.length = 0;
            gsrChart.data.datasets[1].data.push(gsrTrend.startPoint);
            gsrChart.data.datasets[1].data.push(gsrTrend.endPoint);
            gsrChart.update(0);
        }
    } 
    else if (e.target.id == "om"){
        document.querySelector("#gsr-name").innerHTML = "<b>Resistance: </b>";
        if (gsrChart.data.datasets[0].data.length > 1) {
            document.querySelector("#gsr-value").innerHTML = resistanceValues[resistanceValues.length - 1] + " kΩ";
            for (let i = 0; i < gsrChart.data.datasets[0].data.length; i++) {
                gsrChart.data.datasets[0].data[i].y = resistanceValues[i];
            }
            gsrTrend.calc();
            gsrChart.data.datasets[1].data.length = 0;
            gsrChart.data.datasets[1].data.push(gsrTrend.startPoint);
            gsrChart.data.datasets[1].data.push(gsrTrend.endPoint);
            gsrChart.update(0);
        }
    }
        
});

let btnSend = document.querySelector("#btn-send");
btnSend.addEventListener("click", function () {
    measurement.patient.firstName = document.querySelector("input#firstName").value;
    measurement.patient.lastName = document.querySelector("input#lastName").value;
    measurement.patient.birthDate = document.querySelector("input#birthDate").value;
    fetch("http://localhost:50757/api/MeasurementSave", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(measurement)
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
