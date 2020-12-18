﻿//raw
let pulseTime = [];
let pulseValues = [];

//processed
let pulseProcessedDataTime = [];
let pulseAmplitude = [];
let pulseAmplitudeVariance = [];
let pulseFrequency = [];
let pulseFrequencyVariance = [];

// raw
let gsrTime = [];
let gsrValues = []; //Ω
let resistanceValues = []; //kΩ
let conductanceValues = []; //uS

// raw
let respiratoryRateTime = [];
let respiratoryRateValues = [];

//processed
let respiratoryRateProcessedDataTime = [];
let respiratoryRateAmplitude = [];
let respiratoryRateAmplitudeVariance = [];
let respiratoryRateFrequency = [];
let respiratoryRateFrequencyVariance = [];


let measurement = {
    heartRateAverage: 0,
    pulseValues: pulseValues,
    pulseTime: pulseTime,
    pulseProcessedDataTime: pulseProcessedDataTime,
    pulseAmplitude: pulseAmplitude,
    pulseAmplitudeVariance: pulseAmplitudeVariance,
    pulseFrequency: pulseFrequency,
    pulseFrequencyVariance: pulseFrequencyVariance,
    pulseFFTWindowSize: model.pulseFFTWindowSize,
    pulseFFTWindowSizeWithPadding: model.pulseFFTWindowSizeWithPadding,
    pulseFFTStepSize: model.pulseFFTStepSize,
    pulseProcessingMethod: model.pulseProcessingMethod,
    respiratoryRateFFTWindowSize: model.respiratoryRateFFTWindowSize,
    respiratoryRateFFTWindowSizeWithPadding: model.respiratoryRateFFTWindowSizeWithPadding,
    respiratoryRateFFTStepSize: model.respiratoryRateFFTStepSize,
    gsrValues: gsrValues,
    gsrTime: gsrTime,
    respiratoryRateValues: respiratoryRateValues,
    respiratoryRateTime: respiratoryRateTime,
    respiratoryRateProcessedDataTime: respiratoryRateProcessedDataTime,
    respiratoryRateAmplitude: respiratoryRateAmplitude,
    respiratoryRateAmplitudeVariance: respiratoryRateAmplitudeVariance,
    respiratoryRateFrequency: respiratoryRateFrequency,
    respiratoryRateFrequencyVariance: respiratoryRateFrequencyVariance,
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
    fftWindowSize: model.pulseFFTWindowSize,
    fftWindowSizeWithPadding: model.pulseFFTWindowSizeWithPadding,
    fftStepSize: model.pulseFFTStepSize,
    Fs: 1 / 0.035,
    f: [],
    pulseProcessingMethod: model.pulseProcessingMethod,
    meanPulseAmplitude: 0,
    meanPulseFrequency: 0,
    calcAmplitudeAndFrequency: function () {
        if (this.pulseProcessingMethod != "double mean")
            this.calcAmplitudeAndFrequency_findpeaks();
        else
            this.calcAmplitudeAndFrequency_doubleMean();
    },
    calcAmplitudeAndFrequency_findpeaks: function () {
        if (pulseValues.length == this.fftWindowSize ||
            pulseValues.length > this.fftWindowSize &&
            pulseValues.length % this.fftStepSize == 0
        ) {
            //console.log(pulseValues.length);
            let pulseWindow = pulseValues.slice(pulseValues.length - this.fftWindowSize, pulseValues.length);

            //console.log(pulseWindow.length);
            //console.log(time);

            mean_pulse = mean(pulseWindow);

            if (this.fftWindowSize < this.fftWindowSizeWithPadding) {
                for (let i = this.fftWindowSize; i < this.fftWindowSizeWithPadding; i++)
                    pulseWindow[i] = mean_pulse;
            }

            let zeros = new Array(pulseWindow.length).fill(0);

            let Y_real = [...pulseWindow]
            let Y_imag = [...zeros]
            transform(Y_real, Y_imag); // modifies FFT inputs to FFT outputs

            let L = pulseWindow.length;
            let P1 = [];

            if (pulseValues.length == this.fftWindowSize) {
                for (let i = 0; i < Math.floor((L / 2)) + 1; i++)
                    this.f[i] = this.Fs * i / L
            }

            for (let i = 0; i < Math.floor((L / 2)) + 1; i++) {
                if (i == 0) //DC term
                    //P1[i] = Math.sqrt(Y_real[i] ** 2 + Y_imag[i] ** 2) / L;
                    P1[i] = 0;
                else if (i == Math.floor((L / 2))) //Nyquist frequency
                    P1[i] = Math.sqrt(Y_real[i] ** 2 + Y_imag[i] ** 2) / this.fftWindowSize;
                else
                    P1[i] = 2 * Math.sqrt(Y_real[i] ** 2 + Y_imag[i] ** 2) / this.fftWindowSize;
            }

            //console.log(P1);

            let peaks = findpeaks(this.f, P1);
            //console.log(peaks);

            peaks.sort(function (a, b) {
                return b.P1 - a.P1;
            });

            //console.log(peaks);

            let top2Peaks = [];
            top2Peaks[0] = peaks[0];
            top2Peaks[1] = peaks[1];

            //console.log(top2Peaks);

            top2Peaks.sort(function (a, b) {
                return a.f - b.f;
            });

            //console.log(top2Peaks);

            let pulsePeak = top2Peaks[0];

            //console.log(pulsePeak);
            //console.log("END");

            let frequency = Math.round(1000 * pulsePeak.f) / 1000;
            let instantaneousHeartRate = Math.round(100 * 60 * frequency) / 100;

            pulseFrequency.push(frequency);
            let timeIndex = pulseValues.length - Math.floor(this.fftWindowSize / 2);
            let time = pulseTime[timeIndex];
            pulseProcessedDataTime.push(time);
            document.querySelector("#heart-rate-instantaneous").innerHTML = instantaneousHeartRate;
            document.querySelector("#heart-rate-frequency").innerHTML = frequency;
            this.calcFrequencyVariance();

            let amplitude = Math.round(100 * pulsePeak.P1) / 100;

            pulseAmplitude.push(amplitude);
            document.querySelector("#heart-rate-amplitude").innerHTML = amplitude;
            this.calcAmplitudeVariance();

        }

    },
    calcAmplitudeAndFrequency_doubleMean: function () {
        if (pulseValues.length == this.fftWindowSize ||
            pulseValues.length > this.fftWindowSize &&
            pulseValues.length % this.fftStepSize == 0
        ) {
            //console.log(pulseValues.length);
            let pulseWindow = pulseValues.slice(pulseValues.length - this.fftWindowSize, pulseValues.length);

            //console.log(pulseWindow.length);
            //console.log(time);

            let mean_pulse = mean(pulseWindow);


            for (let i = 0; i < pulseWindow.length; i++)
                if (pulseWindow[i] < mean_pulse) pulseWindow[i] = mean_pulse;


            mean_pulse = mean(pulseWindow);

            if (this.fftWindowSize < this.fftWindowSizeWithPadding) {
                for (let i = this.fftWindowSize; i < this.fftWindowSizeWithPadding; i++)
                    pulseWindow[i] = mean_pulse;
            }

            let zeros = new Array(pulseWindow.length).fill(0);

            let Y_real = [...pulseWindow]
            let Y_imag = [...zeros]
            transform(Y_real, Y_imag); // modifies FFT inputs to FFT outputs

            let L = pulseWindow.length;
            let P1 = [];

            if (pulseValues.length == this.fftWindowSize) {
                for (let i = 0; i < Math.floor((L / 2)) + 1; i++)
                    this.f[i] = this.Fs * i / L
            }

            for (let i = 0; i < Math.floor((L / 2)) + 1; i++) {
                if (i == 0) //DC term
                    //P1[i] = Math.sqrt(Y_real[i] ** 2 + Y_imag[i] ** 2) / L;
                    P1[i] = 0;
                else if (i == Math.floor((L / 2))) //Nyquist frequency
                    P1[i] = Math.sqrt(Y_real[i] ** 2 + Y_imag[i] ** 2) / this.fftWindowSize;
                else
                    P1[i] = 2 * Math.sqrt(Y_real[i] ** 2 + Y_imag[i] ** 2) / this.fftWindowSize;
            }

            //console.log(P1);

            //let frequencyIndex = P1.findIndex(el => el == Math.max(...P1.slice(this.startSearchIndex, this.stopSearchIndex + 1)));
            let frequencyIndex = P1.findIndex(el => el == Math.max(...P1));

            let frequency = Math.round(1000 * this.f[frequencyIndex]) / 1000;
            let instantaneousHeartRate = Math.round(100 * 60 * frequency) / 100;

            pulseFrequency.push(frequency);
            let timeIndex = pulseValues.length - Math.floor(this.fftWindowSize / 2);
            let time = pulseTime[timeIndex];
            pulseProcessedDataTime.push(time);
            document.querySelector("#heart-rate-instantaneous").innerHTML = instantaneousHeartRate;
            document.querySelector("#heart-rate-frequency").innerHTML = frequency;
            this.calcFrequencyVariance();

            let amplitude = Math.round(100 * P1[frequencyIndex]) / 100;

            pulseAmplitude.push(amplitude);
            document.querySelector("#heart-rate-amplitude").innerHTML = amplitude;
            this.calcAmplitudeVariance();
        }
    },
    calcAmplitudeVariance: function () {
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
    calcFrequencyVariance: function () {
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

// Respiratory Rate Calc
let respiratoryRate = {
    fftWindowSize: model.respiratoryRateFFTWindowSize,
    fftWindowSizeWithPadding: model.respiratoryRateFFTWindowSizeWithPadding,
    fftStepSize: model.respiratoryRateFFTStepSize,
    Fs: 1 / 0.035,
    f: [],
    meanRespiratoryRateAmplitude: 0,
    meanRespiratoryRateFrequency: 0,
    calcAmplitudeAndFrequency: function () {
        if (
            respiratoryRateValues.length == this.fftWindowSize ||
            respiratoryRateValues.length > this.fftWindowSize &&
            respiratoryRateValues.length % this.fftStepSize == 0
        ) {
            //console.log(respiratoryRateValues.length);
            let respiratoryRateWindow = respiratoryRateValues.slice(respiratoryRateValues.length - this.fftWindowSize, respiratoryRateValues.length);

            //console.log(respiratoryRateWindow.length);
            //console.log(time);

            if (this.fftWindowSize < this.fftWindowSizeWithPadding) {
                let mean_respiratoryRate = mean(respiratoryRateWindow);

                for (let i = this.fftWindowSize; i < this.fftWindowSizeWithPadding; i++)
                    respiratoryRateWindow[i] = mean_respiratoryRate;
            }

            let zeros = new Array(respiratoryRateWindow.length).fill(0);

            let Y_real = [...respiratoryRateWindow]
            let Y_imag = [...zeros]
            transform(Y_real, Y_imag); // modifies FFT inputs to FFT outputs

            let L = respiratoryRateWindow.length;
            let P1 = [];

            if (respiratoryRateValues.length == this.fftWindowSize) {
                for (let i = 0; i < Math.floor((L / 2)) + 1; i++)
                    this.f[i] = this.Fs * i / L
            }

            for (let i = 0; i < Math.floor((L / 2)) + 1; i++) {
                if (i == 0) //DC term
                    //P1[i] = Math.sqrt(Y_real[i] ** 2 + Y_imag[i] ** 2) / L;
                    P1[i] = 0;
                else if (i == Math.floor((L / 2))) //Nyquist frequency
                    P1[i] = Math.sqrt(Y_real[i] ** 2 + Y_imag[i] ** 2) / this.fftWindowSize;
                else
                    P1[i] = 2 * Math.sqrt(Y_real[i] ** 2 + Y_imag[i] ** 2) / this.fftWindowSize;
            }

            let frequencyIndex = P1.findIndex(el => el == Math.max(...P1));

            let frequency = Math.round(1000 * this.f[frequencyIndex]) / 1000;
            let instantaneousRespiratoryRate = Math.round(100 * 60 * frequency) / 100;

            respiratoryRateFrequency.push(frequency);   

            let timeIndex = respiratoryRateValues.length - Math.floor(this.fftWindowSize / 2);
            let time = respiratoryRateTime[timeIndex];
            respiratoryRateProcessedDataTime.push(time);
            document.querySelector("#respiratory-rate-instantaneous").innerHTML = instantaneousRespiratoryRate;
            document.querySelector("#respiratory-rate-frequency").innerHTML = frequency;
            this.calcFrequencyVariance();

            let amplitude = Math.round(100 * P1[frequencyIndex]) / 100;

            respiratoryRateAmplitude.push(amplitude);
            document.querySelector("#respiratory-rate-amplitude").innerHTML = amplitude;
            this.calcAmplitudeVariance();

        }

    },
    calcAmplitudeVariance: function () {
        let tmp = 0;
        for (let i = 0; i < respiratoryRateAmplitude.length; i++)
            tmp += respiratoryRateAmplitude[i];
        
        this.meanRespiratoryRateAmplitude = tmp / respiratoryRateAmplitude.length;
        tmp = 0;

        for (let i = 0; i < respiratoryRateAmplitude.length; i++)
            tmp += (respiratoryRateAmplitude[i] - this.meanRespiratoryRateAmplitude) ** 2;

        let respiratoryRateAmplitudeVariance_tmp = Math.round(100 * tmp / respiratoryRateAmplitude.length) / 100;
        respiratoryRateAmplitudeVariance.push(respiratoryRateAmplitudeVariance_tmp);
        document.querySelector("#respiratory-rate-amplitude-variance").innerHTML = respiratoryRateAmplitudeVariance_tmp;
    },
    calcFrequencyVariance: function () {
        let tmp = 0;
        for (let i = 0; i < respiratoryRateFrequency.length; i++)
            tmp += respiratoryRateFrequency[i];

        this.meanRespiratoryRateFrequency = tmp / respiratoryRateFrequency.length;
        tmp = 0;
        
        for (let i = 0; i < respiratoryRateFrequency.length; i++)
            tmp += (respiratoryRateFrequency[i] - this.meanRespiratoryRateFrequency) ** 2;

        let respiratoryRateFrequencyVariance_tmp = Math.round(10000 * tmp / respiratoryRateFrequency.length) / 10000;
        respiratoryRateFrequencyVariance.push(respiratoryRateFrequencyVariance_tmp);
        document.querySelector("#respiratory-rate-frequency-variance").innerHTML = respiratoryRateFrequencyVariance_tmp;
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
                label: "Pulse sensor voltage [mV]",
                lineTension: 0,

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
                label: "Resistance [kΩ] / Conductance [uS]",
                lineTension: 0,
            },
            {
                label: "Linear trend",
                lineTension: 0,
                backgroundColor: "rgba(0, 0, 255, 0.5)",
                borderColor: "rgba(0, 0, 255, 0.5)",
                fill: false
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
                        display: true
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
                label: "Respiratory Rate sensor voltage [mV]",
                lineTension: 0,
            }
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
                    },
                },
            ],
        },
    },
});

/***********************************************Paho.MQTT.Client*******************************************************/
let client = new Paho.MQTT.Client("localhost", 9001, "Browser_Measurement");

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
    client.subscribe("HealthyMan/Measurement");
    
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
    if (message.destinationName === "HealthyMan/Measurement") {
        //start = window.performance.now();
        //console.log(message.payloadString);
        let splitText = message.payloadString.split(":");
        //console.log(splitText);

        // Pulse

        let pulseTime_tmp = Number(splitText[0]);
        let pulseValue_tmp = Number(splitText[1]);
        pulseTime.push(pulseTime_tmp);
        pulseValues.push(pulseValue_tmp);
        pulseChart.data.datasets[0].data.push({ x: pulseTime_tmp, y: pulseValue_tmp });
        if (pulseTime_tmp > 7) pulseChart.data.datasets[0].data.shift();
        pulseChart.update(0);
        pulse.calcAmplitudeAndFrequency();

        // GSR

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


        // Respiratory Rate
        let respiratoryRateTime_tmp = Number(splitText[4]);
        let respiratoryRateValue_tmp = Number(splitText[5]);
        respiratoryRateTime.push(respiratoryRateTime_tmp);
        respiratoryRateValues.push(respiratoryRateValue_tmp);

        respiratoryRateChart.data.datasets[0].data.push({ x: respiratoryRateTime_tmp, y: respiratoryRateValue_tmp });

        if (respiratoryRateTime_tmp > 7) respiratoryRateChart.data.datasets[0].data.shift();

        respiratoryRateChart.update(0);
        respiratoryRate.calcAmplitudeAndFrequency();
        //stop = window.performance.now();
        //console.log(stop - start);
    }
}

/********************************************Buttons handling**********************************************************/

let btnStart = document.querySelector("#btn-start");
btnStart.addEventListener("click", function () {
    pulseChart.data.datasets[0].data.length = 0;
    gsrChart.data.datasets[0].data.length = 0;
    gsrChart.data.datasets[1].data.length = 0;
    pulseTime.length = 0;
    pulseValues.length = 0;
    gsrTime.length = 0;
    gsrValues.length = 0;
    resistanceValues.length = 0;
    conductanceValues.length = 0;
    respiratoryRateTime.length = 0;
    respiratoryRateValues.length = 0;
    respiratoryRateChart.data.datasets[0].data.length = 0;
    pulseAmplitude.length = 0;
    pulseProcessedDataTime.length = 0;
    pulseAmplitudeVariance.length = 0;
    pulseFrequency.length = 0;
    pulseFrequencyVariance.length = 0;
    respiratoryRateAmplitude.length = 0;
    respiratoryRateProcessedDataTime.length = 0;
    respiratoryRateAmplitudeVariance.length = 0;
    respiratoryRateFrequency.length = 0;
    respiratoryRateFrequencyVariance.length = 0;

    document.querySelector("#heart-rate-instantaneous").innerHTML = 0;
    document.querySelector("#heart-rate-frequency").innerHTML = 0;
    document.querySelector("#heart-rate-amplitude").innerHTML = 0;
    document.querySelector("#pulse-amplitude-variance").innerHTML = 0;
    document.querySelector("#pulse-frequency-variance").innerHTML = 0;

    document.querySelector("#respiratory-rate-instantaneous").innerHTML = 0;
    document.querySelector("#respiratory-rate-frequency").innerHTML = 0;
    document.querySelector("#respiratory-rate-amplitude").innerHTML = 0;
    document.querySelector("#respiratory-rate-amplitude-variance").innerHTML = 0;
    document.querySelector("#respiratory-rate-frequency-variance").innerHTML = 0;

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
