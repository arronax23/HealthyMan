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
                maxZoomOut: 2.0,
                axis: "horizontal",
            },
        };

        console.log(model);

        let pulseDataTable = new google.visualization.DataTable();
        pulseDataTable.addColumn("number", "Time");
        pulseDataTable.addColumn("number", "Blood pressure");

        let pulseAmplitudeDataTable = new google.visualization.DataTable();
        pulseAmplitudeDataTable.addColumn("number", "Time");
        pulseAmplitudeDataTable.addColumn("number", "Pulse amplitude");
        pulseAmplitudeDataTable.addColumn("number", "Pulse amplitude variance");

        let pulseFrequencyDataTable = new google.visualization.DataTable();
        pulseFrequencyDataTable.addColumn("number", "Time");
        pulseFrequencyDataTable.addColumn("number", "Pulse frequency [Hz]");
        pulseFrequencyDataTable.addColumn("number", "Pulse frequency variance");

        let gsrDataTable = new google.visualization.DataTable();
        gsrDataTable.addColumn("number", "Time");
        gsrDataTable.addColumn("number", "Resistance [Ω]");

        let respiratoryRateDataTable = new google.visualization.DataTable();
        respiratoryRateDataTable.addColumn("number", "Time");
        respiratoryRateDataTable.addColumn("number", "Chest circumference");

        let diffDataTable = new google.visualization.DataTable();
        diffDataTable.addColumn("number", "Number");
        diffDataTable.addColumn("number", "Time difference");

        for (let i = 0; i < model.pulseTime.length; i++) {
            pulseDataTable.addRow([model.pulseTime[i], model.pulseValues[i]]);

            diffDataTable.addRow([i, model.pulseTime[i] - model.gsrTime[i]]);
        }

        for (let i = 0; i < model.gsrTime.length; i++) 
            gsrDataTable.addRow([model.gsrTime[i], model.gsrValues[i]]);


        for (let i = 0; i < model.respiratoryRateTime.length; i++) 
            respiratoryRateDataTable.addRow([model.respiratoryRateTime[i], model.respiratoryRateValues[i]]);

        for (let i = 0; i < model.pulseAmplitudeTime.length; i++) 
            pulseAmplitudeDataTable.addRow([model.pulseAmplitudeTime[i], model.pulseAmplitude[i], model.pulseAmplitudeVariance[i]]);

        for (let i = 0; i < model.pulseFrequencyTime.length; i++)
            pulseFrequencyDataTable.addRow([model.pulseFrequencyTime[i], model.pulseFrequency[i], model.pulseFrequencyVariance[i]]);

        let diff = Math.abs(model.pulseTime[model.pulseTime.length - 1] - model.gsrTime[model.pulseTime.length - 1]);

        console.log(diff / model.pulseTime.length);

        let pulseChart = new google.visualization.LineChart(
            document.getElementById("pulse_chart")
        );
        pulseChart.draw(pulseDataTable, options);

        let pulseAmplitudeChart = new google.visualization.LineChart(
            document.getElementById("pulse_amplitude_chart")
        );
        pulseAmplitudeChart.draw(pulseAmplitudeDataTable, options);

        let pulseFrequencyChart = new google.visualization.LineChart(
            document.getElementById("pulse_frequency_chart")
        );
        pulseFrequencyChart.draw(pulseFrequencyDataTable, options);

        let gsrChart = new google.visualization.LineChart(
            document.getElementById("gsr_chart")
        );
        gsrChart.draw(gsrDataTable, options);

        let respiratoryRateChart = new google.visualization.LineChart(
            document.getElementById("respiratoryRate_chart")
        );
        respiratoryRateChart.draw(respiratoryRateDataTable, options);

        let diffChart = new google.visualization.LineChart(
            document.getElementById("diff_chart")
        );
        diffChart.draw(diffDataTable, options);
    });
}
