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
    //pulseDataTable.addColumn("number", "Threshold [mV]");
    //pulseDataTable.addColumn({ type: 'number', role: 'interval' });
    //pulseDataTable.addColumn("number", "Threshold [mV]");


    let pulseThresholdDataTable = new google.visualization.DataTable();
    pulseThresholdDataTable.addColumn("number", "Time");
    pulseThresholdDataTable.addColumn("number", "Threshold [mV]");

    let heartBeatsDataTable = new google.visualization.DataTable();
    heartBeatsDataTable.addColumn("number", "Time");
    heartBeatsDataTable.addColumn("number", "Heart beat [mV]");

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

    
    let movMeanRespiratoryRateDataTable = new google.visualization.DataTable();
    movMeanRespiratoryRateDataTable.addColumn("number", "Time");
    movMeanRespiratoryRateDataTable.addColumn("number", "Moving average [mV]");

    let diffDataTable = new google.visualization.DataTable();
    diffDataTable.addColumn("number", "Number");
    diffDataTable.addColumn("number", "Time difference");

    let sum = 0;
    let meanPulse = [];
    for (let i = 0; i < model.pulseTime.length; i++) {
        sum += model.pulseValues[i];
        meanPulse[i] = Math.round(sum / (i + 1));
        console.log("time: " + model.pulseTime[i] + " mean: " + Math.round(sum / (i + 1)));
        pulseDataTable.addRow([model.pulseTime[i], model.pulseValues[i]]);
    }
        
    if (model.pulseThreshold != null)
    for (let i = 0; i < model.pulseThreshold.length; i++)
        pulseThresholdDataTable.addRow([model.pulseThresholdTime[i], model.pulseThreshold[i]]);

    if (model.heartBeatsValues != null)
        for (let i = 0; i < model.heartBeatsValues.length; i++)
            heartBeatsDataTable.addRow([model.heartBeatsTime[i], model.heartBeatsValues[i]]);

    let joinedData = google.visualization.data.join(pulseDataTable, pulseThresholdDataTable, 'full', [[0, 0]], [1], [1]);
    let joinedData2 = google.visualization.data.join(joinedData, heartBeatsDataTable, 'full', [[0, 0]], [1, 2], [1]);

    for (let i = 0; i < model.pulseAmplitudeTime.length; i++) {
        pulseAmplitudeDataTable.addRow([model.pulseAmplitudeTime[i], model.pulseAmplitude[i]]);
        pulseAmplitudeVarianceDataTable.addRow([model.pulseAmplitudeTime[i], model.pulseAmplitudeVariance[i]]);
    }

    for (let i = 0; i < model.pulseFrequencyTime.length; i++) {
        pulseFrequencyDataTable.addRow([model.pulseFrequencyTime[i], model.pulseFrequency[i]]);
        pulseFrequencyVarianceDataTable.addRow([model.pulseFrequencyTime[i], model.pulseFrequencyVariance[i]]);
    }

    for (let i = 0; i < model.gsrTime.length; i++)
        resistanceDataTable.addRow([model.gsrTime[i], model.gsrValues[i] / 1000]);

    for (let i = 0; i < model.gsrTime.length; i++)
        conductanceDataTable.addRow([model.gsrTime[i], Math.round(1000 * 1000000 / model.gsrValues[i]) / 1000]);

    for (let i = 0; i < model.respiratoryRateTime.length; i++) {
        respiratoryRateDataTable.addRow([model.respiratoryRateTime[i], model.respiratoryRateValues[i]]);
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
    if (model.heartBeatsValues == null)
        pulseChart.draw(joinedData, options);
    else
        pulseChart.draw(joinedData2, options);

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

    options.series[0].color = "#000000";
    let diffChart = new google.visualization.LineChart(
        document.getElementById("diff_chart")
    );
    diffChart.draw(diffDataTable, options);
});

