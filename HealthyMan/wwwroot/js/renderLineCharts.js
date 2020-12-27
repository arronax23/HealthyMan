console.log(model);

/** Pulse **/
var configuration = {
    type: "line",
    data: {
        datasets: [
            {
                label: "",
                lineTension: 0,
                /*
                fill: false,         
                backgroundColor: 'rgba(0, 0, 0, 1)',
                borderColor: 'rgba(0, 0, 0, 1)',
               */
                /*
                data: [
                    {
                        x: 0,
                        y: 0
                    }
                ], 
                */
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
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    enabled: true,
                    mode: 'x'
                }
            }
        },
    },

};
var pulse_chart_configuration = JSON.parse(JSON.stringify(configuration));
pulse_chart_configuration.data.datasets[0].label = "Pulse sensor voltage[mV]";

var pulse_chart_context = document.getElementById("pulse_chart").getContext("2d");
var pulse_chart = new Chart(pulse_chart_context, pulse_chart_configuration);


/***/
var instantaneous_heart_rate_chart_configuration = JSON.parse(JSON.stringify(configuration));
instantaneous_heart_rate_chart_configuration.data.datasets[0].label = "Heart rate [bpm - beats per minute]";


var instantaneous_heart_rate_chart_context = document.getElementById("instantaneous_heart_rate_chart").getContext("2d");
var instantaneous_heart_rate_chart = new Chart(instantaneous_heart_rate_chart_context, instantaneous_heart_rate_chart_configuration);


/***/
var pulse_frequency_chart_configuration = JSON.parse(JSON.stringify(configuration));
pulse_frequency_chart_configuration.data.datasets[0].label = "Pulse frequency [Hz]";

var pulse_frequency_chart_context = document.getElementById("pulse_frequency_chart").getContext("2d");
var pulse_frequency_chart = new Chart(pulse_frequency_chart_context, pulse_frequency_chart_configuration);



/***/
var pulse_frequency_variance_chart_configuration = JSON.parse(JSON.stringify(configuration));
pulse_frequency_variance_chart_configuration.data.datasets[0].label = "Pulse frequency variance [Hz\xB2]";

var pulse_frequency_variance_chart_context = document.getElementById("pulse_frequency_variance_chart").getContext("2d");
var pulse_frequency_variance_chart = new Chart(pulse_frequency_variance_chart_context, pulse_frequency_variance_chart_configuration);


/***/
var pulse_amplitude_chart_configuration = JSON.parse(JSON.stringify(configuration));
pulse_amplitude_chart_configuration.data.datasets[0].label = "Pulse amplitude [mV]";

var pulse_amplitude_chart_context = document.getElementById("pulse_amplitude_chart").getContext("2d");
var pulse_amplitude_chart = new Chart(pulse_amplitude_chart_context, pulse_amplitude_chart_configuration);



/***/
var pulse_amplitude_variance_chart_configuration = JSON.parse(JSON.stringify(configuration));
pulse_amplitude_variance_chart_configuration.data.datasets[0].label = "Pulse amplitude variance [mV\xB2]";

var pulse_amplitude_variance_chart_context = document.getElementById("pulse_amplitude_variance_chart").getContext("2d");
var pulse_amplitude_variance_chart = new Chart(pulse_amplitude_variance_chart_context, pulse_amplitude_variance_chart_configuration);



for (let i = 0; i < model.pulseValues.length; i++) {
    pulse_chart.data.datasets[0].data.push({ x: model.pulseTime[i], y: model.pulseValues[i] });
}
pulse_chart.update(0);

for (let i = 0; i < model.pulseProcessedDataTime.length; i++) {  
    //let middlePointTime = Math.round(1000 * (model.pulseFrequencyTime[i] + model.pulseFrequencyTime[i + 1]) / 2) / 1000;

    let instantaneousHeartRate = Math.round(100 * 60 * model.pulseFrequency[i]) / 100;
    instantaneous_heart_rate_chart.data.datasets[0].data.push({ x: model.pulseProcessedDataTime[i], y: instantaneousHeartRate });
    //instantaneous_heart_rate_chart.data.datasets[0].data.push({ x: middlePointTime, y: instantaneousHeartRate });
    //instantaneous_heart_rate_chart.data.datasets[0].data.push({ x: model.pulseFrequencyTime[i + 1], y: instantaneousHeartRate });


    pulse_frequency_chart.data.datasets[0].data.push({ x: model.pulseProcessedDataTime[i], y: model.pulseFrequency[i] });
    //pulse_frequency_chart.data.datasets[0].data.push({ x: middlePointTime, y: model.pulseFrequency[i] });
    //pulse_frequency_chart.data.datasets[0].data.push({ x: model.pulseFrequencyTime[i + 1], y: model.pulseFrequency[i] });

    pulse_frequency_variance_chart.data.datasets[0].data.push({ x: model.pulseProcessedDataTime[i], y: model.pulseFrequencyVariance[i] });
    //pulse_frequency_variance_chart.data.datasets[0].data.push({ x: middlePointTime, y: model.pulseFrequencyVariance[i] });
    //pulse_frequency_variance_chart.data.datasets[0].data.push({ x: model.pulseFrequencyTime[i + 1], y: model.pulseFrequencyVariance[i] });

}
instantaneous_heart_rate_chart.update(0);
pulse_frequency_chart.update(0);
pulse_frequency_variance_chart.update(0);

for (let i = 0; i < model.pulseProcessedDataTime.length; i++) {
    //let middlePointTime = Math.round(1000 * (model.pulseAmplitudeTime[i] + model.pulseAmplitudeTime[i + 1]) / 2) / 1000;


    pulse_amplitude_chart.data.datasets[0].data.push({ x: model.pulseProcessedDataTime[i], y: model.pulseAmplitude[i] });
    //pulse_amplitude_chart.data.datasets[0].data.push({ x: middlePointTime, y: model.pulseAmplitude[i] });
    //pulse_amplitude_chart.data.datasets[0].data.push({ x: model.pulseAmplitudeTime[i + 1], y: model.pulseAmplitude[i] });

    pulse_amplitude_variance_chart.data.datasets[0].data.push({ x: model.pulseProcessedDataTime[i], y: model.pulseAmplitudeVariance[i] });
    //pulse_amplitude_variance_chart.data.datasets[0].data.push({ x: middlePointTime, y: model.pulseAmplitudeVariance[i] });
    //pulse_amplitude_variance_chart.data.datasets[0].data.push({ x: model.pulseAmplitudeTime[i + 1], y: model.pulseAmplitudeVariance[i] });

}
pulse_amplitude_chart.update(0);
pulse_amplitude_variance_chart.update(0);

/** GSR **/

var resistance_chart_configuration = JSON.parse(JSON.stringify(configuration));
resistance_chart_configuration.data.datasets[0].label = "Resistance [kΩ]";

var resistance_chart_context = document.getElementById("resistance_chart").getContext("2d");
var resistance_chart = new Chart(resistance_chart_context, resistance_chart_configuration);

/***/

var conductance_chart_configuration = JSON.parse(JSON.stringify(configuration));
conductance_chart_configuration.data.datasets[0].label = "Conductance [uS]";

var conductance_chart_context = document.getElementById("conductance_chart").getContext("2d");
var conductance_chart = new Chart(conductance_chart_context, conductance_chart_configuration);

for (let i = 0; i < model.gsrValues.length; i++) {
    resistance_chart.data.datasets[0].data.push({ x: model.gsrTime[i], y: model.gsrValues[i] / 1000 });
    conductance_chart.data.datasets[0].data.push({ x: model.gsrTime[i], y: Math.round(1000 * 1000000 / model.gsrValues[i]) / 1000 });
}
resistance_chart.update(0);
conductance_chart.update(0);


/** Respiratory Rate **/
var respiratoryRate_chart_configuration = JSON.parse(JSON.stringify(configuration));
respiratoryRate_chart_configuration.data.datasets[0].label = "Respiratory Rate sensor voltage [mV]";

var respiratoryRate_chart_context = document.getElementById("respiratoryRate_chart").getContext("2d");
var respiratoryRate_chart = new Chart(respiratoryRate_chart_context, respiratoryRate_chart_configuration);

/***/

var instantaneous_respiratory_rate_chart_configuration = JSON.parse(JSON.stringify(configuration));
instantaneous_respiratory_rate_chart_configuration.data.datasets[0].label = "Respiratory Rate [bpm - breaths per minute]";

var instantaneous_respiratory_rate_chart_context = document.getElementById("instantaneous_respiratory_rate_chart").getContext("2d");
var instantaneous_respiratory_rate_chart = new Chart(instantaneous_respiratory_rate_chart_context, instantaneous_respiratory_rate_chart_configuration);

/***/
var respiratory_rate_frequency_chart_configuration = JSON.parse(JSON.stringify(configuration));
respiratory_rate_frequency_chart_configuration.data.datasets[0].label = "Respiratory Rate frequency [Hz]";

var respiratory_rate_frequency_chart_context = document.getElementById("respiratory_rate_frequency_chart").getContext("2d");
var respiratory_rate_frequency_chart = new Chart(respiratory_rate_frequency_chart_context, respiratory_rate_frequency_chart_configuration);

/***/
var respiratory_rate_frequency_variance_chart_configuration = JSON.parse(JSON.stringify(configuration));
respiratory_rate_frequency_variance_chart_configuration.data.datasets[0].label = "Respiratory Rate frequency variance [Hz\xB2]";

var respiratory_rate_frequency_variance_chart_context = document.getElementById("respiratory_rate_frequency_variance_chart").getContext("2d");
var respiratory_rate_frequency_variance_chart = new Chart(respiratory_rate_frequency_variance_chart_context, respiratory_rate_frequency_variance_chart_configuration);

/***/
var respiratory_rate_amplitude_chart_configuration = JSON.parse(JSON.stringify(configuration));
respiratory_rate_amplitude_chart_configuration.data.datasets[0].label = "Respiratory Rate amplitude[mV]";

var respiratory_rate_amplitude_chart_context = document.getElementById("respiratory_rate_amplitude_chart").getContext("2d");
var respiratory_rate_amplitude_chart = new Chart(respiratory_rate_amplitude_chart_context, respiratory_rate_amplitude_chart_configuration);

/***/
var respiratory_rate_amplitude_variance_chart_configuration = JSON.parse(JSON.stringify(configuration));
respiratory_rate_amplitude_variance_chart_configuration.data.datasets[0].label = "Respiratory Rate amplitude variance [mV\xB2]";

var respiratory_rate_amplitude_variance_chart_context = document.getElementById("respiratory_rate_amplitude_variance_chart").getContext("2d");
var respiratory_rate_amplitude_variance_chart = new Chart(respiratory_rate_amplitude_variance_chart_context, respiratory_rate_amplitude_variance_chart_configuration);

/***/

for (let i = 0; i < model.respiratoryRateValues.length; i++) {
    respiratoryRate_chart.data.datasets[0].data.push({ x: model.respiratoryRateTime[i], y: model.respiratoryRateValues[i] });
}
respiratoryRate_chart.update(0);


for (let i = 0; i < model.respiratoryRateProcessedDataTime.length; i++) {
    //let middlePointTime = Math.round(1000 * (model.respiratoryRateFrequencyTime[i] + model.respiratoryRateFrequencyTime[i + 1]) / 2) / 1000;

    let instantaneousRespiraotryRate = Math.round(100 * 60 * model.respiratoryRateFrequency[i]) / 100;
    instantaneous_respiratory_rate_chart.data.datasets[0].data.push({ x: model.respiratoryRateProcessedDataTime[i], y: instantaneousRespiraotryRate });
    //instantaneous_respiratory_rate_chart.data.datasets[0].data.push({ x: middlePointTime, y: instantaneousRespiraotryRate });
    //instantaneous_respiratory_rate_chart.data.datasets[0].data.push({ x: model.respiratoryRateFrequencyTime[i + 1], y: instantaneousRespiraotryRate });


    respiratory_rate_frequency_chart.data.datasets[0].data.push({ x: model.respiratoryRateProcessedDataTime[i], y: model.respiratoryRateFrequency[i] });
    //respiratory_rate_frequency_chart.data.datasets[0].data.push({ x: middlePointTime, y: model.respiratoryRateFrequency[i] });
    //respiratory_rate_frequency_chart.data.datasets[0].data.push({ x: model.respiratoryRateFrequencyTime[i + 1], y: model.respiratoryRateFrequency[i] });

    respiratory_rate_frequency_variance_chart.data.datasets[0].data.push({ x: model.respiratoryRateProcessedDataTime[i], y: model.respiratoryRateFrequencyVariance[i] });
    //respiratory_rate_frequency_variance_chart.data.datasets[0].data.push({ x: middlePointTime, y: model.respiratoryRateFrequencyVariance[i] });
    //respiratory_rate_frequency_variance_chart.data.datasets[0].data.push({ x: model.respiratoryRateFrequencyTime[i + 1], y: model.respiratoryRateFrequencyVariance[i] });

}
instantaneous_respiratory_rate_chart.update(0);
respiratory_rate_frequency_chart.update(0);
respiratory_rate_frequency_variance_chart.update(0);

for (let i = 0; i < model.respiratoryRateProcessedDataTime.length; i++) {
    //let middlePointTime = Math.round(1000 * (model.respiratoryRateAmplitudeTime[i] + model.respiratoryRateAmplitudeTime[i + 1]) / 2) / 1000;

    respiratory_rate_amplitude_chart.data.datasets[0].data.push({ x: model.respiratoryRateProcessedDataTime[i], y: model.respiratoryRateAmplitude[i] });
    //respiratory_rate_amplitude_chart.data.datasets[0].data.push({ x: middlePointTime, y: model.respiratoryRateAmplitude[i] });
    //respiratory_rate_amplitude_chart.data.datasets[0].data.push({ x: model.respiratoryRateAmplitudeTime[i + 1], y: model.respiratoryRateAmplitude[i] });

    respiratory_rate_amplitude_variance_chart.data.datasets[0].data.push({ x: model.respiratoryRateProcessedDataTime[i], y: model.respiratoryRateAmplitudeVariance[i] });
    //respiratory_rate_amplitude_variance_chart.data.datasets[0].data.push({ x: middlePointTime, y: model.respiratoryRateAmplitudeVariance[i] });
    //respiratory_rate_amplitude_variance_chart.data.datasets[0].data.push({ x: model.respiratoryRateAmplitudeTime[i + 1], y: model.respiratoryRateAmplitudeVariance[i] });

}
respiratory_rate_amplitude_chart.update(0);
respiratory_rate_amplitude_variance_chart.update(0);