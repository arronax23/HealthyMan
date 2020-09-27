function renderLineCharts(model) {
    google.charts.load("current", { packages: ["corechart"] }).then(function () {
        options = {
            //title: "Data visualization chart",
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
            }
        };

        console.log(model);

        let pulseDataTable = new google.visualization.DataTable();
        pulseDataTable.addColumn("number", "Time");
        pulseDataTable.addColumn("number", "Voltage [mV]");
        pulseDataTable.addColumn("number", "Moving average [mV]");

        let pulseAmplitudeDataTable = new google.visualization.DataTable();
        pulseAmplitudeDataTable.addColumn("number", "Time");
        pulseAmplitudeDataTable.addColumn("number", "Pulse amplitude [mV]");
        pulseAmplitudeDataTable.addColumn("number", "Pulse amplitude variance");

        let pulseFrequencyDataTable = new google.visualization.DataTable();
        pulseFrequencyDataTable.addColumn("number", "Time");
        pulseFrequencyDataTable.addColumn("number", "Pulse frequency [Hz]");
        pulseFrequencyDataTable.addColumn("number", "Pulse frequency variance");

        let resistanceDataTable = new google.visualization.DataTable();
        resistanceDataTable.addColumn("number", "Time");
        resistanceDataTable.addColumn("number", "Resistance [kΩ]");

        let conductanceDataTable = new google.visualization.DataTable();
        conductanceDataTable.addColumn("number", "Time");
        conductanceDataTable.addColumn("number", "Conductance [uS]");
        

        let respiratoryRateDataTable = new google.visualization.DataTable();
        respiratoryRateDataTable.addColumn("number", "Time");
        respiratoryRateDataTable.addColumn("number", "Voltage [mV]");

        let diffDataTable = new google.visualization.DataTable();
        diffDataTable.addColumn("number", "Number");
        diffDataTable.addColumn("number", "Time difference");

        let pulseMovMean = calcMovMean(model.pulseValues, 5);

        for (let i = 0; i < model.pulseTime.length; i++) {
            pulseDataTable.addRow([model.pulseTime[i], model.pulseValues[i], pulseMovMean[i]]);

            diffDataTable.addRow([i, model.pulseTime[i] - model.gsrTime[i]]);
        }

        for (let i = 0; i < model.pulseAmplitudeTime.length; i++)
            pulseAmplitudeDataTable.addRow([model.pulseAmplitudeTime[i], model.pulseAmplitude[i], model.pulseAmplitudeVariance[i]]);

        for (let i = 0; i < model.pulseFrequencyTime.length; i++)
            pulseFrequencyDataTable.addRow([model.pulseFrequencyTime[i], model.pulseFrequency[i], model.pulseFrequencyVariance[i]]);


        for (let i = 0; i < model.gsrTime.length; i++)
            resistanceDataTable.addRow([model.gsrTime[i], model.gsrValues[i] / 1000]);

        for (let i = 0; i < model.gsrTime.length; i++)
            conductanceDataTable.addRow([model.gsrTime[i], Math.round(1000 * 1000000 / model.gsrValues[i]) / 1000]);

        for (let i = 0; i < model.respiratoryRateTime.length; i++) 
            respiratoryRateDataTable.addRow([model.respiratoryRateTime[i], model.respiratoryRateValues[i]]);


        let diff = Math.abs(model.pulseTime[model.pulseTime.length - 1] - model.gsrTime[model.pulseTime.length - 1]);

        console.log(diff / model.pulseTime.length);

        let pulseChart = new google.visualization.LineChart(
            document.getElementById("pulse_chart")
        );
        pulseChart.draw(pulseDataTable, options);

        options.series[0].color = "#ff3399";
        options.series[1].color = "#ff9900";
        let pulseAmplitudeChart = new google.visualization.LineChart(
            document.getElementById("pulse_amplitude_chart")
        );
        pulseAmplitudeChart.draw(pulseAmplitudeDataTable, options);

        options.series[0].color = "#f0fc03";
        options.series[1].color = "#33ccff";
        let pulseFrequencyChart = new google.visualization.LineChart(
            document.getElementById("pulse_frequency_chart")
        );
        pulseFrequencyChart.draw(pulseFrequencyDataTable, options);

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
}
