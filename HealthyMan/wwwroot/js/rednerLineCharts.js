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
        height: "100%",
        width: "100%",
        chartArea: { width: "70%", height: "80%" },
        /*
        vAxis: {
            min: 0,
            viewWindow: {
                max: 3000
            }
        },
        */

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
    pulseDataTable.addColumn("number", "Pulse sensor voltage [mV]");

    /*
    let pulseThresholdDataTable = new google.visualization.DataTable();
    pulseThresholdDataTable.addColumn("number", "Time");
    pulseThresholdDataTable.addColumn("number", "Threshold [mV]");

    let heartBeatsDataTable = new google.visualization.DataTable();
    heartBeatsDataTable.addColumn("number", "Time");
    heartBeatsDataTable.addColumn("number", "Heart beat [mV]");
    */

    let instantaneousHeartRateDataTable = new google.visualization.DataTable();
    instantaneousHeartRateDataTable.addColumn("number", "Time");
    instantaneousHeartRateDataTable.addColumn("number", "Heart rate [beats per minute]");

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
    respiratoryRateDataTable.addColumn("number", "Respiratory Rate sensor voltage [mV]");

    let instantaneousRespiratoryRateDataTable = new google.visualization.DataTable();
    instantaneousRespiratoryRateDataTable.addColumn("number", "Time");
    instantaneousRespiratoryRateDataTable.addColumn("number", "Respiratory Rate [breaths per minute]");

    let respiratoryRateAmplitudeDataTable = new google.visualization.DataTable();
    respiratoryRateAmplitudeDataTable.addColumn("number", "Time");
    respiratoryRateAmplitudeDataTable.addColumn("number", "Respiratory Rate amplitude [mV]");

    let respiratoryRateAmplitudeVarianceDataTable = new google.visualization.DataTable();
    respiratoryRateAmplitudeVarianceDataTable.addColumn("number", "Time");
    respiratoryRateAmplitudeVarianceDataTable.addColumn("number", "Respiratory Rate amplitude variance");

    let respiratoryRateFrequencyDataTable = new google.visualization.DataTable();
    respiratoryRateFrequencyDataTable.addColumn("number", "Time");
    respiratoryRateFrequencyDataTable.addColumn("number", "Respiratory Rate frequency [Hz]");

    let respiratoryRateFrequencyVarianceDataTable = new google.visualization.DataTable();
    respiratoryRateFrequencyVarianceDataTable.addColumn("number", "Time");
    respiratoryRateFrequencyVarianceDataTable.addColumn("number", "Respiratory Rate frequency variance");

    let diffDataTable = new google.visualization.DataTable();
    diffDataTable.addColumn("number", "Number");
    diffDataTable.addColumn("number", "Time difference");


    // Pulse
    for (let i = 0; i < model.pulseTime.length; i++) {

        pulseDataTable.addRow([model.pulseTime[i], model.pulseValues[i]]);
    }


    for (let i = 0; i < model.pulseFrequency.length; i++) {
        let instantaneousHeartRate = Math.round(100 * 60 * model.pulseFrequency[i]) / 100;
        instantaneousHeartRateDataTable.addRow([model.pulseFrequencyTime[i], instantaneousHeartRate]);
        instantaneousHeartRateDataTable.addRow([(model.pulseFrequencyTime[i] + model.pulseFrequencyTime[i + 1]) / 2, instantaneousHeartRate]);
        instantaneousHeartRateDataTable.addRow([model.pulseFrequencyTime[i + 1], instantaneousHeartRate]);
    }


    for (let i = 0; i < model.pulseAmplitudeTime.length; i++) {
        pulseAmplitudeDataTable.addRow([model.pulseAmplitudeTime[i], model.pulseAmplitude[i]]);
        pulseAmplitudeDataTable.addRow([(model.pulseAmplitudeTime[i] + model.pulseAmplitudeTime[i + 1]) / 2, model.pulseAmplitude[i]]);
        pulseAmplitudeDataTable.addRow([model.pulseAmplitudeTime[i + 1], model.pulseAmplitude[i]]);

        pulseAmplitudeVarianceDataTable.addRow([model.pulseAmplitudeTime[i], model.pulseAmplitudeVariance[i]]);
        pulseAmplitudeVarianceDataTable.addRow([(model.pulseAmplitudeTime[i] + model.pulseAmplitudeTime[i + 1]) /2, model.pulseAmplitudeVariance[i]]);
        pulseAmplitudeVarianceDataTable.addRow([model.pulseAmplitudeTime[i + 1], model.pulseAmplitudeVariance[i]]);
    }

    for (let i = 0; i < model.pulseFrequencyTime.length; i++) {
        pulseFrequencyDataTable.addRow([model.pulseFrequencyTime[i], model.pulseFrequency[i]]);
        pulseFrequencyDataTable.addRow([(model.pulseFrequencyTime[i] + model.pulseFrequencyTime[i + 1]) / 2, model.pulseFrequency[i]]);
        pulseFrequencyDataTable.addRow([model.pulseFrequencyTime[i+1], model.pulseFrequency[i]]);

        pulseFrequencyVarianceDataTable.addRow([model.pulseFrequencyTime[i], model.pulseFrequencyVariance[i]]);
        pulseFrequencyVarianceDataTable.addRow([(model.pulseFrequencyTime[i] + model.pulseFrequencyTime[i + 1]) / 2, model.pulseFrequencyVariance[i]]);
        pulseFrequencyVarianceDataTable.addRow([model.pulseFrequencyTime[i+1], model.pulseFrequencyVariance[i]]);
    }

    // GSR

    for (let i = 0; i < model.gsrTime.length; i++)
        resistanceDataTable.addRow([model.gsrTime[i], model.gsrValues[i] / 1000]);


    for (let i = 0; i < model.gsrTime.length; i++)
        conductanceDataTable.addRow([model.gsrTime[i], Math.round(1000 * 1000000 / model.gsrValues[i]) / 1000]);

    // Respiratory Rate

    for (let i = 0; i < model.respiratoryRateTime.length; i++) {
        respiratoryRateDataTable.addRow([model.respiratoryRateTime[i], model.respiratoryRateValues[i]]);
    }

    
    for (let i = 0; i < model.respiratoryRateFrequency.length; i++) {
        let instantaneousRespiratoryRate = Math.round(100 * 60 * model.respiratoryRateFrequency[i]) / 100;
        instantaneousRespiratoryRateDataTable.addRow([model.respiratoryRateFrequencyTime[i], instantaneousRespiratoryRate]);
        instantaneousRespiratoryRateDataTable.addRow([(model.respiratoryRateFrequencyTime[i] + model.respiratoryRateFrequencyTime[i + 1]) / 2, instantaneousRespiratoryRate]);
        instantaneousRespiratoryRateDataTable.addRow([model.respiratoryRateFrequencyTime[i + 1], instantaneousRespiratoryRate]);
    }

    for (let i = 0; i < model.respiratoryRateAmplitudeTime.length; i++) {
        respiratoryRateAmplitudeDataTable.addRow([model.respiratoryRateAmplitudeTime[i], model.respiratoryRateAmplitude[i]]);
        respiratoryRateAmplitudeDataTable.addRow([(model.respiratoryRateAmplitudeTime[i] + model.respiratoryRateAmplitudeTime[i + 1]) / 2, model.respiratoryRateAmplitude[i]]);
        respiratoryRateAmplitudeDataTable.addRow([model.respiratoryRateAmplitudeTime[i + 1], model.respiratoryRateAmplitude[i]]);

        respiratoryRateAmplitudeVarianceDataTable.addRow([model.respiratoryRateAmplitudeTime[i], model.respiratoryRateAmplitudeVariance[i]]);
        respiratoryRateAmplitudeVarianceDataTable.addRow([(model.respiratoryRateAmplitudeTime[i] + model.respiratoryRateAmplitudeTime[i + 1]) / 2, model.respiratoryRateAmplitudeVariance[i]]);
        respiratoryRateAmplitudeVarianceDataTable.addRow([model.respiratoryRateAmplitudeTime[i + 1], model.respiratoryRateAmplitudeVariance[i]]);
    }

    for (let i = 0; i < model.respiratoryRateFrequencyTime.length; i++) {
        respiratoryRateFrequencyDataTable.addRow([model.respiratoryRateFrequencyTime[i], model.respiratoryRateFrequency[i]]);
        respiratoryRateFrequencyDataTable.addRow([(model.respiratoryRateFrequencyTime[i] + model.respiratoryRateFrequencyTime[i + 1]) / 2, model.respiratoryRateFrequency[i]]);
        respiratoryRateFrequencyDataTable.addRow([model.respiratoryRateFrequencyTime[i + 1], model.respiratoryRateFrequency[i]]);

        respiratoryRateFrequencyVarianceDataTable.addRow([model.respiratoryRateFrequencyTime[i], model.respiratoryRateFrequencyVariance[i]]);
        respiratoryRateFrequencyVarianceDataTable.addRow([(model.respiratoryRateFrequencyTime[i] + model.respiratoryRateFrequencyTime[i + 1]) / 2, model.respiratoryRateFrequencyVariance[i]]);
        respiratoryRateFrequencyVarianceDataTable.addRow([model.respiratoryRateFrequencyTime[i + 1], model.respiratoryRateFrequencyVariance[i]]);
    }

    /*
    for (let i = 0; i < model.pulseTime.length; i++) {
        diffDataTable.addRow([i, model.gsrTime[i] - model.pulseTime[i]]);
    }

    let diff = Math.abs(model.pulseTime[model.pulseTime.length - 1] - model.gsrTime[model.pulseTime.length - 1]);
    console.log(diff / model.pulseTime.length);
    

    sum = 0;
    for (let i = 0; i < model.pulseTime.length - 1; i++)
        sum += model.pulseTime[i + 1] - model.pulseTime[i]
    console.log(sum / (model.pulseTime.length - 1));
    */

    let pulseChart = new google.visualization.LineChart(
        document.getElementById("pulse_chart")
    );
    pulseChart.draw(pulseDataTable, options);

    options.series[0].color = "#331900";  
    let instantaneousHeartRateChart = new google.visualization.LineChart(
        document.getElementById("instantaneous_heart_rate_chart")
    );
    instantaneousHeartRateChart.draw(instantaneousHeartRateDataTable, options);

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
    
    options.series[0].color = "#331900";
    let instantaneousRespiratoryRateChart = new google.visualization.LineChart(
        document.getElementById("instantaneous_respiratory_rate_chart")
    );
    instantaneousRespiratoryRateChart.draw(instantaneousRespiratoryRateDataTable, options);


    options.series[0].color = "#ff3399";
    let respiratoryRateAmplitudeChart = new google.visualization.LineChart(
        document.getElementById("respiratory_rate_amplitude_chart")
    );
    respiratoryRateAmplitudeChart.draw(respiratoryRateAmplitudeDataTable, options);

    options.series[0].color = "#ff9900";
    let respiratoryRateAmplitudeVarianceChart = new google.visualization.LineChart(
        document.getElementById("respiratory_rate_amplitude_variance_chart")
    );
    respiratoryRateAmplitudeVarianceChart.draw(respiratoryRateAmplitudeVarianceDataTable, options);


    options.series[0].color = "#f0fc03";
    let respiratoryRateFrequencyChart = new google.visualization.LineChart(
        document.getElementById("respiratory_rate_frequency_chart")
    );
    respiratoryRateFrequencyChart.draw(respiratoryRateFrequencyDataTable, options);

    options.series[0].color = "#33ccff";
    let respiratoryRateFrequencyVarianceChart = new google.visualization.LineChart(
        document.getElementById("respiratory_rate_frequency_variance_chart")
    );
    respiratoryRateFrequencyVarianceChart.draw(respiratoryRateFrequencyVarianceDataTable, options);

    options.series[0].color = "#000000";
    let diffChart = new google.visualization.LineChart(
        document.getElementById("diff_chart")
    );
    diffChart.draw(diffDataTable, options);

/********************************************Buttons handling**********************************************************/

    document.querySelector(".pulse_chart").addEventListener("click", function () {
        if (document.querySelector("#pulse_chart").style.display == "none")
            document.querySelector("#pulse_chart").style.display = "block";
        else
            document.querySelector("#pulse_chart").style.display = "none";
    });

});

