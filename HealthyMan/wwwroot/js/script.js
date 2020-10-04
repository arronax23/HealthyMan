let pulseValues = [];
let pulseTime = [];

let pulseThreshold = [model.initialThreshold];
let pulseThresholdTime = [0];

let heartBeatsValues = [];
let heartBeatsTime = [];

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
let movMeanRespiratoryRate = [];

for (let i = 0; i < (model.movMeanRespiratoryRateWindowLength - 1 / 2); i++)
    movMeanRespiratoryRate[i] = -1;

let measurement = {
    heartRateAverage: 0,
    peaksCounter: 0,
    //variance: 0,
    pulseValues: pulseValues,
    pulseTime: pulseTime,
    initialThreshold: model.initialThreshold,
    thresholdAmplitudePercentage: model.thresholdAmplitudePercentage,
    heartBeatsValues: heartBeatsValues,
    heartBeatsTime: heartBeatsTime,
    pulseThreshold: pulseThreshold,
    pulseThresholdTime: pulseThresholdTime,
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
    movMeanRespiratoryRate: movMeanRespiratoryRate,
    timeStamp: new Date(),
    // Patient
    patient: {
        firstName: "",
        lastName: "",
        birthDate: new Date()
    }
};

let movMeanRespiratoryRateCalc = {
    length: 0,
    index: 0,
    movMeanRespiratoryRateWindowLength: model.movMeanRespiratoryRateWindowLength,
    calc: function () {
        this.length = respiratoryRateTime.length;
        if (this.length >= this.movMeanRespiratoryRateWindowLength) {
            this.index = this.length - this.movMeanRespiratoryRateWindowLength + (this.movMeanRespiratoryRateWindowLength - 1) / 2;
            movMeanRespiratoryRate[this.index] = Math.round(mean(respiratoryRateValues.slice(this.length - this.movMeanRespiratoryRateWindowLength, this.length)));
        }
        
    }
}


// Pulse Calc
let pulse = {
    measurement: measurement,
    enable1: false,
    enable2: false,
    meanPulseAmplitude: 0,
    meanPulseFrequency: 0,
    max: 0,
    min: 3300,
    calcAmplitudePeaksCounter: 0,
    threshold: model.initialThreshold,
    calcPulse: function (time, value) {
        if (value > this.threshold && this.enable2 === true)
            this.enable1 = true;
        else if (value < this.threshold)
            this.enable2 = true;

        if (this.enable1 === true) {
            this.measurement.peaksCounter++;
            document.querySelector("#peaks-counter").innerHTML = this.measurement.peaksCounter;

            this.measurement.heartBeatsValues.push(value);
            this.measurement.heartBeatsTime.push(time);
            let frequency = Math.round(this.measurement.peaksCounter / time * 100) / 100;
            this.measurement.pulseFrequency.push(frequency);
            this.measurement.pulseFrequencyTime.push(time);
            this.measurement.heartRateAverage = Math.round(60 * frequency);
            document.querySelector("#frequency").innerHTML = frequency+" Hz";
            document.querySelector("#heart-rate-average").innerHTML = this.measurement.heartRateAverage;
            this.calcPulseFrequencyVariance();

            this.enable1 = false;
            this.enable2 = false;

            if (this.measurement.peaksCounter < 3) {
                this.measurement.pulseFrequency.shift();
                this.measurement.pulseFrequencyTime.shift();
                this.measurement.pulseFrequencyVariance.shift();
            }
        }

        this.calcAmplitude(time, value);
    },
    calcAmplitude: function (time, value) {
        if (this.measurement.peaksCounter > 1 && this.calcAmplitudePeaksCounter != this.measurement.peaksCounter) {
            this.calcAmplitudePeaksCounter = this.measurement.peaksCounter;
            let amplitude = this.max - this.min;
            this.threshold = this.min + amplitude * model.thresholdAmplitudePercentage / 100;
            this.measurement.pulseThreshold.push(this.threshold);
            this.measurement.pulseThresholdTime.push(time);
            this.measurement.pulseAmplitude.push(amplitude);
            this.measurement.pulseAmplitudeTime.push(time);
            document.querySelector("#amplitude").innerHTML = amplitude + "mV";

            this.calcPulseAmplitudeVariance();

            this.min = 3300;
            this.max = 0;
        }

        if (this.measurement.peaksCounter > 1 && value > this.max) {
            this.max = value     
        }
        if (this.measurement.peaksCounter > 1 && value < this.min) {
            this.min = value
        }
    },
    calcPulseAmplitudeVariance: function () {
        let tmp = 0;
        for (let i = 0; i < this.measurement.pulseAmplitude.length; i++)
            tmp += this.measurement.pulseAmplitude[i];

        this.meanPulseAmplitude = tmp / this.measurement.pulseAmplitude.length
        tmp = 0;

        for (let i = 0; i < this.measurement.pulseAmplitude.length; i++)
            tmp += (this.measurement.pulseAmplitude[i] - this.meanPulseAmplitude) ** 2;

        let pulseAmplitudeVariance = Math.round(100 * tmp / this.measurement.pulseAmplitude.length) / 100;
        this.measurement.pulseAmplitudeVariance.push(pulseAmplitudeVariance);
        document.querySelector("#pulse-amplitude-variance").innerHTML = pulseAmplitudeVariance;
    },
    calcPulseFrequencyVariance: function () {
        let tmp = 0;
        for (let i = 0; i < this.measurement.pulseFrequency.length; i++)
            tmp += this.measurement.pulseFrequency[i];

        this.meanPulseFrequency = tmp / this.measurement.pulseFrequency.length
        tmp = 0;

        for (let i = 0; i < this.measurement.pulseFrequency.length; i++)
            tmp += (this.measurement.pulseFrequency[i] - this.meanPulseFrequency) ** 2;

        let pulseFrequencyVariance = Math.round(10000 * tmp / this.measurement.pulseAmplitude.length) / 10000;
        this.measurement.pulseFrequencyVariance.push(pulseFrequencyVariance);
        document.querySelector("#pulse-frequency-variance").innerHTML = pulseFrequencyVariance;
    },
};

// GSR Trend Calc
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
        animation: false,
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
                        labelString: "Voltage [mV]",
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
        animation: false,
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
                        labelString: "Resistance [kΩ]/Conductance [uS]",
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
            {
                label: "Moving average",
                lineTension: 0,
                data: [
                    {
                        x: 0,
                        y: 0,
                    },
                ],
                backgroundColor: "rgba(0, 0, 0, 0)",
            },
        ],
    },
    options: {
        animation: false,
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
                        labelString: "Voltage [mV]",
                    },
                },
            ],
        },
    },
});

/***********************************************Paho.MQTT.Client*******************************************************/
let client = new Paho.MQTT.Client("localhost", 9001, "browser");

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

/*
let options = {
    useSSL: true,
    onSuccess: onConnect,
}
*/

client.connect({ onSuccess: onConnect});
//client.connect(options);

function onConnect() {
    console.log("Connected to MQTT Broker");
    client.subscribe("HealthyMan/Data");
    //client.subscribe("HealthyMan/Pulse/Data");
    //client.subscribe("HealthyMan/GSR/Data");
    //client.subscribe("HealthyMan/RespiratoryRate/Data");
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

/*
function onMessageArrived(message) {
    if (message.destinationName === "HealthyMan/Pulse/Data") {
        console.log(message.payloadString);
        let splitText = message.payloadString.split(":");
        //console.log(splitText);
        let time_tmp = Number(splitText[0]);
        let value_tmp = Number(splitText[1]);
        pulseTime.push(time_tmp);
        pulseValues.push(value_tmp);
        pulseChart.data.datasets[0].data.push({ x: time_tmp, y: value_tmp });
        if (time_tmp > 7) pulseChart.data.datasets[0].data.shift();
        pulseChart.update(0);
        //pulse.calcPulse(time_tmp, value_tmp);
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

        //gsrTrend.calc();
        gsrChart.data.datasets[1].data.length = 0;
        gsrChart.data.datasets[1].data.push(gsrTrend.startPoint);
        gsrChart.data.datasets[1].data.push(gsrTrend.endPoint);

        gsrChart.update(0);
            
    }
    else if (message.destinationName === "HealthyMan/RespiratoryRate/Data") {
        //console.log(message.payloadString);
        let splitText = message.payloadString.split(":");
        //console.log(splitText);
        let time_tmp = Number(splitText[0]);
        let value_tmp = Number(splitText[1]);
        respiratoryRateTime.push(time_tmp);
        respiratoryRateValues.push(value_tmp);

        respiratoryRateChart.data.datasets[0].data.push({ x: time_tmp, y: value_tmp });

        let length = respiratoryRateTime.length;
        let index = length - 41 + 20;
        if (length >= 41) {
            movMeanRespiraotryRate[index] = mean(respiratoryRateValues.slice(length - 41, length));
            respiratoryRateChart.data.datasets[1].data.push({ x: respiratoryRateTime[index], y: movMeanRespiraotryRate[index] });
        } 

        if (time_tmp > 7) {
            respiratoryRateChart.data.datasets[0].data.shift();
            respiratoryRateChart.data.datasets[1].data.shift();
        }
        respiratoryRateChart.update(0);
    }
}
*/

function onMessageArrived(message) {
    if (message.destinationName === "HealthyMan/Data") {
        console.log(message.payloadString);
        let splitText = message.payloadString.split(":");
        //console.log(splitText);
        let pulseTime_tmp = Number(splitText[0]);
        let pulseValue_tmp = Number(splitText[1]);
        pulseTime.push(pulseTime_tmp);
        pulseValues.push(pulseValue_tmp);
        pulseChart.data.datasets[0].data.push({ x: pulseTime_tmp, y: pulseValue_tmp });
        if (pulseTime_tmp > 7) pulseChart.data.datasets[0].data.shift();
        pulseChart.update(0);
        pulse.calcPulse(pulseTime_tmp, pulseValue_tmp);

        ////

        let GSRTime_tmp = Number(splitText[2]);
        let GSRValue_tmp = Number(splitText[3]);
        let resistance_tmp = GSRValue_tmp / 1000;
        let conductance_tmp = Math.round(1000 * 1000000 / GSRValue_tmp) / 1000;
        gsrTime.push(GSRTime_tmp);
        gsrValues.push(GSRValue_tmp);
        resistanceValues.push(resistance_tmp);
        conductanceValues.push(conductance_tmp);

        if (GSRTime_tmp > 7) gsrChart.data.datasets[0].data.shift();

        if (document.querySelector("input#om").checked) {
            gsrChart.data.datasets[0].data.push({ x: GSRTime_tmp, y: resistance_tmp });
            document.querySelector("#gsr-value").innerHTML = resistance_tmp + " kΩ";
        }
        else {
            gsrChart.data.datasets[0].data.push({ x: GSRTime_tmp, y: conductance_tmp });
            document.querySelector("#gsr-value").innerHTML = conductance_tmp + " uS";
        }

        gsrTrend.calc();
        gsrChart.data.datasets[1].data.length = 0;
        gsrChart.data.datasets[1].data.push(gsrTrend.startPoint);
        gsrChart.data.datasets[1].data.push(gsrTrend.endPoint);

        gsrChart.update(0);


        ////
        let respiratoryRateTime_tmp = Number(splitText[4]);
        let respiratoryRateValue_tmp = Number(splitText[5]);
        respiratoryRateTime.push(respiratoryRateTime_tmp);
        respiratoryRateValues.push(respiratoryRateValue_tmp);

        respiratoryRateChart.data.datasets[0].data.push({ x: respiratoryRateTime_tmp, y: respiratoryRateValue_tmp });

        movMeanRespiratoryRateCalc.calc();
        respiratoryRateChart.data.datasets[1].data.push({ x: respiratoryRateTime[movMeanRespiratoryRateCalc.index], y: movMeanRespiratoryRate[movMeanRespiratoryRateCalc.index] });
        /*
        let length = respiratoryRateTime.length;
        let index = length - 41 + 20;
        if (length >= 41) {
            movMeanRespiratoryRate[index] = Math.round(mean(respiratoryRateValues.slice(length - 41, length)));
            respiratoryRateChart.data.datasets[1].data.push({ x: respiratoryRateTime[index], y: movMeanRespiratoryRate[index] });
        }
        */

        if (respiratoryRateTime_tmp > 7) {
            respiratoryRateChart.data.datasets[0].data.shift();
            respiratoryRateChart.data.datasets[1].data.shift();
        }
        respiratoryRateChart.update(0);
    }
}

/********************************************Buttons handling**********************************************************/

let btnStart = document.querySelector("#btn-start");
btnStart.addEventListener("click", function () {
    pulseChart.data.datasets[0].data.length = 0;
    gsrChart.data.datasets[0].data.length = 0;
    respiratoryRateChart.data.datasets[0].data.length = 0;
    respiratoryRateChart.data.datasets[1].data.length = 0;
    pulseTime.length = 0;
    pulseValues.length = 0;
    heartBeatsValues.length = 0;
    heartBeatsTime.length = 0;
    pulseThreshold.length = 0;
    pulseThreshold.push(model.initialThreshold);
    pulseThresholdTime.length = 0;
    pulseThresholdTime.push(0);
    gsrTime.length = 0;
    gsrValues.length = 0;
    resistanceValues.length = 0;
    conductanceValues.length = 0;
    respiratoryRateTime.length = 0;
    respiratoryRateValues.length = 0;
    movMeanRespiratoryRate.length = 0;
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
                gsrChart.data.datasets[0].data[i].y = Math.round(1000 * 1000 / gsrChart.data.datasets[0].data[i].y) / 1000;
            }
            gsrTrend.calc();
            gsrChart.data.datasets[1].data.length = 0;
            gsrChart.data.datasets[1].data.push(gsrTrend.startPoint);
            gsrChart.data.datasets[1].data.push(gsrTrend.endPoint);
            gsrChart.update(0);
        }
    }
    else if (e.target.id == "om") {
        document.querySelector("#gsr-name").innerHTML = "<b>Resistance: </b>";
        if (gsrChart.data.datasets[0].data.length > 1) {
            document.querySelector("#gsr-value").innerHTML = resistanceValues[resistanceValues.length - 1] + " kΩ";
            for (let i = 0; i < gsrChart.data.datasets[0].data.length; i++) {
                gsrChart.data.datasets[0].data[i].y = Math.round(1000 * 1000 / gsrChart.data.datasets[0].data[i].y) / 1000;
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
