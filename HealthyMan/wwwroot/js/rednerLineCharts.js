google.charts.load("current", { packages: ["corechart"] }).then(function () {
    options = {
        //title: "Data visualization chart",
        //interpolateNulls: true,
        pointSize: 5,
        hAxis: {
            title: "Time [s]",
        },
        vAxis: {
            title: null,
        },
        explorer: {
            maxZoomIn: 40.0,
            maxZoomOut: 1.5,
            axis: "horizontal",
        },
        series: {
            0: { color: "#00cc00" },
            1: { color: "#0000cc" },
            2: { color: "#ff0000" }
        }
    };

    console.log(model);

    let pulseDataTable = new google.visualization.DataTable();
    pulseDataTable.addColumn("number", "Time");
    pulseDataTable.addColumn("number", "Voltage [mV]");
    pulseDataTable.addColumn("number", "Threshold [mV]");
    pulseDataTable.addColumn("number", "Heart beat [mV]");

    /*
    let pulseThresholdDataTable = new google.visualization.DataTable();
    pulseThresholdDataTable.addColumn("number", "Time");
    pulseThresholdDataTable.addColumn("number", "Threshold [mV]");

    let heartBeatsDataTable = new google.visualization.DataTable();
    heartBeatsDataTable.addColumn("number", "Time");
    heartBeatsDataTable.addColumn("number", "Heart beat [mV]");
    */

    let pulseAmplitudeDataTable = new google.visualization.DataTable();
    pulseAmplitudeDataTable.addColumn("number", "Time");
    pulseAmplitudeDataTable.addColumn("number", "Pulse amplitude [mV]");
        
    let pulseAmplitudeVarianceDataTable = new google.visualization.DataTable();
    pulseAmplitudeVarianceDataTable.addColumn("number", "Time");
    pulseAmplitudeVarianceDataTable.addColumn("number", "Pulse amplitude variance");

    let pulseFrequencyDataTable = new google.visualization.DataTable();
    pulseFrequencyDataTable.addColumn("number", "Time");
    pulseFrequencyDataTable.addColumn("number", "Pulse frequency [Hz]");

    let pulseFrequencyVarianceDataTable = new google.visualization.DataTable();
    pulseFrequencyVarianceDataTable.addColumn("number", "Time");
    pulseFrequencyVarianceDataTable.addColumn("number", "Pulse frequency variance");

    let resistanceDataTable = new google.visualization.DataTable();
    resistanceDataTable.addColumn("number", "Time");
    resistanceDataTable.addColumn("number", "Resistance [kΩ]");

    let conductanceDataTable = new google.visualization.DataTable();
    conductanceDataTable.addColumn("number", "Time");
    conductanceDataTable.addColumn("number", "Conductance [uS]");

    let respiratoryRateDataTable = new google.visualization.DataTable();
    respiratoryRateDataTable.addColumn("number", "Time");
    respiratoryRateDataTable.addColumn("number", "Voltage [mV]");
    respiratoryRateDataTable.addColumn("number", "Moving average [mV]");
    respiratoryRateDataTable.addColumn("number", "Breath peaks [mV]");

    let InstantaneousRespiratoryRateDataTable = new google.visualization.DataTable();
    InstantaneousRespiratoryRateDataTable.addColumn("number", "Time");
    InstantaneousRespiratoryRateDataTable.addColumn("number", "Respiratory Rate [bpm]");

    let diffDataTable = new google.visualization.DataTable();
    diffDataTable.addColumn("number", "Number");
    diffDataTable.addColumn("number", "Time difference");

    let sum = 0;
    let meanPulse = [];
    for (let i = 0; i < model.pulseTime.length; i++) {
        //sum += model.pulseValues[i];
        //meanPulse[i] = Math.round(sum / (i + 1));
        //console.log("time: " + model.pulseTime[i] + " mean: " + Math.round(sum / (i + 1)));
        pulseDataTable.addRow([model.pulseTime[i], model.pulseValues[i], null, null]);
    }

    if (model.pulseThreshold != null)
        for (let i = 0; i < model.pulseThreshold.length; i++) {
            pulseDataTable.addRow([model.pulseThresholdTime[i], null, model.pulseThreshold[i], null]);
            pulseDataTable.addRow([null, null, null, null]);
        }
        

    if (model.heartBeatsValues != null)
        for (let i = 0; i < model.heartBeatsValues.length; i++) {
            pulseDataTable.addRow([model.heartBeatsTime[i], null, null, model.heartBeatsValues[i]]);
            pulseDataTable.addRow([null, null, null, null]);
        }
           


    for (let i = 0; i < model.pulseAmplitudeTime.length; i++) {
        pulseAmplitudeDataTable.addRow([model.pulseAmplitudeTime[i], model.pulseAmplitude[i]]);
        pulseAmplitudeVarianceDataTable.addRow([model.pulseAmplitudeTime[i], model.pulseAmplitudeVariance[i]]);
    }

    for (let i = 0; i < model.pulseFrequencyTime.length; i++) {
        pulseFrequencyDataTable.addRow([model.pulseFrequencyTime[i], model.pulseFrequency[i]]);
        pulseFrequencyDataTable.addRow([(model.pulseFrequencyTime[i] + model.pulseFrequencyTime[i + 1]) / 2, model.pulseFrequency[i]]);
        pulseFrequencyDataTable.addRow([model.pulseFrequencyTime[i+1], model.pulseFrequency[i]]);
        pulseFrequencyVarianceDataTable.addRow([model.pulseFrequencyTime[i], model.pulseFrequencyVariance[i]]);
        pulseFrequencyVarianceDataTable.addRow([(model.pulseFrequencyTime[i] + model.pulseFrequencyTime[i + 1]) / 2, model.pulseFrequencyVariance[i]]);
        pulseFrequencyVarianceDataTable.addRow([model.pulseFrequencyTime[i+1], model.pulseFrequencyVariance[i]]);
    }

    for (let i = 0; i < model.gsrTime.length; i++)
        resistanceDataTable.addRow([model.gsrTime[i], model.gsrValues[i] / 1000]);


    for (let i = 0; i < model.gsrTime.length; i++)
        conductanceDataTable.addRow([model.gsrTime[i], Math.round(1000 * 1000000 / model.gsrValues[i]) / 1000]);


    for (let i = 0; i < model.respiratoryRateTime.length; i++) {
        respiratoryRateDataTable.addRow([model.respiratoryRateTime[i], model.respiratoryRateValues[i], null, null]);
    }

    if (model.movMean1RespiratoryRate != null) {
        for (let i = 0; i < model.movMean1RespiratoryRate.length; i++) {
            respiratoryRateDataTable.addRow([model.respiratoryRateTime[i], null, model.movMean1RespiratoryRate[i], null]);
        }
    }

    if (model.breathPeaksTime != null) {
        for (let i = 0; i < model.breathPeaksTime.length; i++) {
            respiratoryRateDataTable.addRow([model.breathPeaksTime[i], null, null, model.breathPeaksValues[i]]);
            respiratoryRateDataTable.addRow([null, null, null, null]);
        }
    }

    //InstantaneousRespiratoryRateDataTable.addRow([model.breathPeaksTime[0], null]);
    if (model.instantaneousRespiratoryRateTime != null) {
        for (let i = 0; i < model.instantaneousRespiratoryRateTime.length; i++) {
            InstantaneousRespiratoryRateDataTable.addRow([model.breathPeaksTime[i], model.instantaneousRespiratoryRate[i]]);
            InstantaneousRespiratoryRateDataTable.addRow([(model.breathPeaksTime[i] + model.breathPeaksTime[i + 1]) / 2, model.instantaneousRespiratoryRate[i]]);
            InstantaneousRespiratoryRateDataTable.addRow([model.breathPeaksTime[i+1], model.instantaneousRespiratoryRate[i]]);
        }
    }
    for (let i = 0; i < model.pulseTime.length; i++) {
        diffDataTable.addRow([i, model.gsrTime[i] - model.pulseTime[i]]);
    }

    let diff = Math.abs(model.pulseTime[model.pulseTime.length - 1] - model.gsrTime[model.pulseTime.length - 1]);

    //console.log(diff / model.pulseTime.length);

    sum = 0;
    for (let i = 0; i < model.pulseTime.length - 1; i++)
        sum += model.pulseTime[i + 1] - model.pulseTime[i]
    console.log(sum / (model.pulseTime.length - 1));

    let pulseChart = new google.visualization.LineChart(
        document.getElementById("pulse_chart")
    );
        pulseChart.draw(pulseDataTable, options);

    options.series[0].color = "#ff3399";  
    let pulseAmplitudeChart = new google.visualization.LineChart(
        document.getElementById("pulse_amplitude_chart")
    );
    pulseAmplitudeChart.draw(pulseAmplitudeDataTable, options);

    options.series[0].color = "#ff9900";
    let pulseAmplitudeVarianceChart = new google.visualization.LineChart(
        document.getElementById("pulse_amplitude_variance_chart")
    );
    pulseAmplitudeVarianceChart.draw(pulseAmplitudeVarianceDataTable, options);
 

    options.series[0].color = "#f0fc03";
    let pulseFrequencyChart = new google.visualization.LineChart(
        document.getElementById("pulse_frequency_chart")
    );
    pulseFrequencyChart.draw(pulseFrequencyDataTable, options);

    options.series[0].color = "#33ccff";
    let pulseFrequencyVarianceChart = new google.visualization.LineChart(
        document.getElementById("pulse_frequency_variance_chart")
    );
    pulseFrequencyVarianceChart.draw(pulseFrequencyVarianceDataTable, options);

    options.series[0].color = "#0000cc";
    let resistanceChart = new google.visualization.LineChart(
        document.getElementById("resistance_chart")
    );
    resistanceChart.draw(resistanceDataTable, options);

    options.series[0].color = "#cc0000";
    let conductanceChart = new google.visualization.LineChart(
        document.getElementById("conductance_chart")
    );
    conductanceChart.draw(conductanceDataTable, options);

    options.series[0].color = "#660066";
    let respiratoryRateChart = new google.visualization.LineChart(
        document.getElementById("respiratoryRate_chart")
    );
        respiratoryRateChart.draw(respiratoryRateDataTable, options);

    /*
    options.series[0].color = "#0000cc";
    let InstantaneousRespiratoryRateChart = new google.visualization.SteppedAreaChart(
        document.getElementById("instantaneous_respiratory_rate_chart")
    );
    InstantaneousRespiratoryRateChart.draw(InstantaneousRespiratoryRateDataTable, options);
    */

    
    options.series[0].color = "#0000cc";
    let InstantaneousRespiratoryRateChart = new google.visualization.LineChart(
        document.getElementById("instantaneous_respiratory_rate_chart")
    );
    InstantaneousRespiratoryRateChart.draw(InstantaneousRespiratoryRateDataTable, options);
    

    options.series[0].color = "#000000";
    let diffChart = new google.visualization.LineChart(
        document.getElementById("diff_chart")
    );
    diffChart.draw(diffDataTable, options);

});

