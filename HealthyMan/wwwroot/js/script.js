let pulseValues = [];
let pulseTime = [];

let pulseAmplitude = [];
let pulseAmplitudeTime = [0];
let pulseAmplitudeVariance = [];
let pulseFrequency = [];
let pulseFrequencyTime = [0];
let pulseFrequencyVariance = [];

let gsrValues = []; //Ω
let gsrTime = [];
let resistanceValues = []; //kΩ
let conductanceValues = []; //uS

let respiratoryRateValues = [];
let respiratoryRateTime = [];
let movMean1RespiratoryRate = [];
let signValues = [];
let signTime = [];
let breathPeaksValues = [];
let breathPeaksTime = [];
let instantaneousRespiratoryRate = [];
let instantaneousRespiratoryRateTime = [];

/*
let P1 = [];
let f = [];
let Y;
let pulseWindow = [];
*/

let measurement = {
    heartRateAverage: 0,
    pulseValues: pulseValues,
    pulseTime: pulseTime,
    pulseAmplitude: pulseAmplitude,
    pulseAmplitudeTime: pulseAmplitudeTime,
    pulseAmplitudeVariance: pulseAmplitudeVariance,
    pulseFrequency: pulseFrequency,
    pulseFrequencyTime: pulseFrequencyTime,
    pulseFrequencyVariance: pulseFrequencyVariance,
    fftWindowSize: model.fftWindowSize,
    fftWindowSizeWithPadding: model.fftWindowSizeWithPadding,
    gsrValues: gsrValues,
    gsrTime: gsrTime,
    respiratoryRateValues: respiratoryRateValues,
    respiratoryRateTime: respiratoryRateTime,
    movMean1RespiratoryRate: movMean1RespiratoryRate,
    breathPeaksValues: breathPeaksValues,
    breathPeaksTime: breathPeaksTime,
    instantaneousRespiratoryRate: instantaneousRespiratoryRate,
    instantaneousRespiratoryRateTime: instantaneousRespiratoryRateTime,
    timeStamp: new Date(),
    // Patient
    patient: {
        firstName: "",
        lastName: "",
        birthDate: new Date()
    }
};

let movMean1RespiratoryRateCalc = {
    length: 0,
    index: 0,
    movMeanRespiratoryRateWindowLength: model.movMeanRespiratoryRateWindowLength,
    calc: function () {
        this.length = respiratoryRateTime.length;
        if (movMean1RespiratoryRate[0] == undefined && this.length >= this.movMeanRespiratoryRateWindowLength) {
            for (let i = 0; i < (this.movMeanRespiratoryRateWindowLength - 1) / 2; i++) {
                movMean1RespiratoryRate[i] = respiratoryRateValues[i];
                //
                if (respiratoryRateValues[i + 1] > respiratoryRateValues[i]) {
                    signValues.push(1);
                    signTime.push(respiratoryRateTime[i]);
                }
                else if (respiratoryRateValues[i + 1] < respiratoryRateValues[i]) {
                    signValues.push(-1);
                    signTime.push(respiratoryRateTime[i]);
                }
            }
                
        } 

        if (this.length >= this.movMeanRespiratoryRateWindowLength) {
            this.index = this.length - this.movMeanRespiratoryRateWindowLength + (this.movMeanRespiratoryRateWindowLength - 1) / 2;
            movMean1RespiratoryRate[this.index] = Math.round(100 * mean(respiratoryRateValues.slice(this.length - this.movMeanRespiratoryRateWindowLength, this.length))) / 100;
            respiratoryRateChart.data.datasets[1].data.push({ x: respiratoryRateTime[movMean1RespiratoryRateCalc.index], y: movMean1RespiratoryRate[movMean1RespiratoryRateCalc.index] });
        }
        
    }
}

let respiratoryRateDerivativeSign = {
    enable: false,
    calc: function () {   
        if (movMean1RespiratoryRate.length > (model.movMeanRespiratoryRateWindowLength - 1) / 2) {
            if (movMean1RespiratoryRate[movMean1RespiratoryRate.length - 1] > movMean1RespiratoryRate[movMean1RespiratoryRate.length - 2]) {
                signValues.push(1);
                signTime.push(respiratoryRateTime[movMean1RespiratoryRate.length - 2]);
                this.enable = true;
            }
            else if (movMean1RespiratoryRate[movMean1RespiratoryRate.length - 1] < movMean1RespiratoryRate[movMean1RespiratoryRate.length - 2]) {
                signValues.push(-1);
                signTime.push(respiratoryRateTime[movMean1RespiratoryRate.length - 2]);
                this.enable = true;
            }

        }

        if (signValues[signValues.length - 1] == -1 &&
            signValues[signValues.length - 2] == -1 &&
            signValues[signValues.length - 3] == -1 &&
            signValues[signValues.length - 4] == -1 &&
            signValues[signValues.length - 5] == -1 &&
            signValues[signValues.length - 6] == -1 &&
            signValues[signValues.length - 7] == -1 &&
            signValues[signValues.length - 8] == 1 &&
            signValues[signValues.length - 9] == 1 &&
            signValues[signValues.length - 10] == 1 &&
            signValues[signValues.length - 11] == 1 &&
            signValues[signValues.length - 12] == 1 &&
            signValues[signValues.length - 13] == 1 &&
            signValues[signValues.length - 14] == 1 &&
            this.enable == true
        ) {
            breathPeaksTime.push(Math.round(1000 * (signTime[signTime.length - 7] + signTime[signTime.length - 8]) / 2) / 1000);
            let index1 = respiratoryRateTime.findIndex(r => r == signTime[signTime.length - 8]);
            let index2 = respiratoryRateTime.findIndex(r => r == signTime[signTime.length - 7]);

            breathPeaksValues.push((movMean1RespiratoryRate[index2] + movMean1RespiratoryRate[index1]) / 2);
            respiratoryRateChart.data.datasets[2].data.push({ x: breathPeaksTime[breathPeaksTime.length - 1], y: breathPeaksValues[breathPeaksTime.length - 1] });

            if (breathPeaksTime.length >= 2) {
                respiratoryRate_tmp = Math.round(100 * 60 / (breathPeaksTime[breathPeaksTime.length - 1] - breathPeaksTime[breathPeaksTime.length - 2])) / 100;
                instantaneousRespiratoryRateTime.push(breathPeaksTime[breathPeaksTime.length - 1]);
                instantaneousRespiratoryRate.push(respiratoryRate_tmp);
                document.querySelector("#respiratory-rate").innerHTML = instantaneousRespiratoryRate[instantaneousRespiratoryRate.length - 1];
            }

            this.enable = false;
        }
    }
}


// Pulse Calc
let pulse = {
    fftWindowSize: model.fftWindowSize,
    fftWindowSizeWithPadding: model.fftWindowSizeWithPadding,
    startSearchIndex: 0,
    stopSearchIndex: 0,
    Fs: 1/0.0365,
    f: [],
    calcAmplitudeAndFrequency: function (time) {
        if (
            pulseValues.length % (this.fftWindowSize - 1) == 0 && pulseValues.length != (this.fftWindowSize - 1) ||
            pulseValues.length % this.fftWindowSize == 0 && pulseValues.length == this.fftWindowSize
        ) {

            let pulseWindow = pulseValues.slice(pulseValues.length - this.fftWindowSize, pulseValues.length);

            console.log(pulseWindow.length);
            console.log(time);

            if (this.fftWindowSize < this.fftWindowSizeWithPadding) {
                let mean_pulse = mean(pulseWindow);

                for (let i = this.fftWindowSize; i < this.fftWindowSizeWithPadding; i++)
                    pulseWindow[i] = mean_pulse;
            }

            let zeros = new Array(pulseWindow.length).fill(0);

            Y = fourier.dft(pulseWindow, zeros);

            let L = pulseWindow.length;
            let P1 = [];

            if (pulseValues.length == this.fftWindowSize) {
                for (let i = 0; i < Math.floor((L / 2)) + 1; i++) 
                    this.f[i] = this.Fs * i / L

                this.startSearchIndex = this.f.findIndex(el => el >= 0.5);
                this.stopSearchIndex = this.f.findIndex(el => el >= 3.33);
            }

            for (let i = 0; i < Math.floor((L / 2)) + 1; i++) {
                if (i == 0)
                    P1[i] = Math.sqrt(Y[0][i] ** 2 + Y[1][i] ** 2) / L;
                else
                    P1[i] = 2 * Math.sqrt(Y[0][i] ** 2 + Y[1][i] ** 2) / this.fftWindowSize;
            }

            let frequencyIndex = P1.findIndex(el => el == Math.max(...P1.slice(this.startSearchIndex, this.stopSearchIndex + 1)));

            let frequency = Math.round(1000 * this.f[frequencyIndex]) / 1000;
            let instantaneousHeartRate = Math.round(100 * 60 * frequency) / 100;

            pulseFrequency.push(frequency);
            pulseFrequencyTime.push(time);
            document.querySelector("#heart-rate-instantaneous").innerHTML = instantaneousHeartRate;
            document.querySelector("#frequency").innerHTML = frequency;
            this.calcPulseFrequencyVariance();

            let amplitude = Math.round(100 * P1[frequencyIndex]) / 100;

            pulseAmplitude.push(P1[frequencyIndex]);
            pulseAmplitudeTime.push(time);
            document.querySelector("#amplitude").innerHTML = amplitude;
            this.calcPulseAmplitudeVariance();

        }

    },
    calcPulseAmplitudeVariance: function () {
        let tmp = 0;
        for (let i = 0; i < pulseAmplitude.length; i++)
            tmp += pulseAmplitude[i];

        this.meanPulseAmplitude = tmp / pulseAmplitude.length
        tmp = 0;

        for (let i = 0; i < pulseAmplitude.length; i++)
            tmp += (pulseAmplitude[i] - this.meanPulseAmplitude) ** 2;

        let pulseAmplitudeVariance_tmp = Math.round(100 * tmp / pulseAmplitude.length) / 100;
        pulseAmplitudeVariance.push(pulseAmplitudeVariance_tmp);
        document.querySelector("#pulse-amplitude-variance").innerHTML = pulseAmplitudeVariance_tmp;
    },
    calcPulseFrequencyVariance: function () {
        let tmp = 0;
        for (let i = 0; i < pulseFrequency.length; i++)
            tmp += pulseFrequency[i];

        this.meanPulseFrequency = tmp / pulseFrequency.length
        tmp = 0;

        for (let i = 0; i < pulseFrequency.length; i++)
            tmp += (pulseFrequency[i] - this.meanPulseFrequency) ** 2;

        let pulseFrequencyVariance_tmp = Math.round(10000 * tmp / pulseFrequency.length) / 10000;
        pulseFrequencyVariance.push(pulseFrequencyVariance_tmp);
        document.querySelector("#pulse-frequency-variance").innerHTML = pulseFrequencyVariance_tmp;
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
                label: "Moving average 1",
                lineTension: 0,
                data: [
                    {
                        x: 0,
                        y: 0,
                    },
                ],
                backgroundColor: "rgba(0, 0, 255, 0.5)",
            },
            {
                label: "Breath peaks",
                lineTension: 0,
                data: [
                    {
                        x: 0,
                        y: 0,
                    },
                ],
                backgroundColor: "rgba(255, 0, 0, 0.5)",
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


function onMessageArrived(message) {
    if (message.destinationName === "HealthyMan/Data") {
        //console.log(message.payloadString);
        let splitText = message.payloadString.split(":");
        //console.log(splitText);
        let pulseTime_tmp = Number(splitText[0]);
        let pulseValue_tmp = Number(splitText[1]);
        pulseTime.push(pulseTime_tmp);
        pulseValues.push(pulseValue_tmp);
        pulseChart.data.datasets[0].data.push({ x: pulseTime_tmp, y: pulseValue_tmp });
        if (pulseTime_tmp > 7) pulseChart.data.datasets[0].data.shift();
        pulseChart.update(0);
        pulse.calcAmplitudeAndFrequency(pulseTime_tmp);

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

        movMean1RespiratoryRateCalc.calc();
        respiratoryRateDerivativeSign.calc();

        if (respiratoryRateTime_tmp > 7) {
            respiratoryRateChart.data.datasets[0].data.shift();
            respiratoryRateChart.data.datasets[1].data.shift();
        }
        if (respiratoryRateChart.data.datasets[2].data[0] != undefined && respiratoryRateTime_tmp > respiratoryRateChart.data.datasets[2].data[0].x + 7)
            respiratoryRateChart.data.datasets[2].data.shift();

        respiratoryRateChart.update(0);
    }
}

/********************************************Buttons handling**********************************************************/

let btnStart = document.querySelector("#btn-start");
btnStart.addEventListener("click", function () {
    pulseChart.data.datasets[0].data.length = 0;
    gsrChart.data.datasets[0].data.length = 0;
    pulseTime.length = 0;
    pulseValues.length = 0;
    gsrTime.length = 0;
    gsrValues.length = 0;
    resistanceValues.length = 0;
    conductanceValues.length = 0;
    respiratoryRateTime.length = 0;
    respiratoryRateValues.length = 0;
    movMean1RespiratoryRate.length = 0;
    respiratoryRateChart.data.datasets[0].data.length = 0;
    respiratoryRateChart.data.datasets[1].data.length = 0;
    respiratoryRateChart.data.datasets[2].data.length = 0;
    instantaneousRespiratoryRate.length = 0;
    instantaneousRespiratoryRateTime.length = 0;
    signValues.length = 0;
    signTime.length = 0;
    breathPeaksTime.length = 0;
    breathPeaksValues.length = 0;
    pulseAmplitude.length = 0;
    pulseAmplitudeTime.length = 0;
    pulseAmplitudeTime.push(0);
    pulseAmplitudeVariance.length = 0;
    pulseFrequency.length = 0;
    pulseFrequencyTime.length = 0;
    pulseFrequencyTime.push(0);
    pulseFrequencyVariance.length = 0;
    pulse.enable1 = false;
    pulse.enable2 = false;

    document.querySelector("#heart-rate-instantaneous").innerHTML = 0;
    document.querySelector("#frequency").innerHTML = 0;
    document.querySelector("#amplitude").innerHTML = 0;
    document.querySelector("#pulse-amplitude-variance").innerHTML = 0;
    document.querySelector("#pulse-frequency-variance").innerHTML = 0;

    message = new Paho.MQTT.Message("1");
    message.destinationName = "HealthyMan/MeasurementEnable";
    client.send(message);
});

let btnStop = document.querySelector("#btn-stop");
btnStop.addEventListener("click", function () {
    message = new Paho.MQTT.Message("0");
    message.destinationName = "HealthyMan/MeasurementEnable";
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
