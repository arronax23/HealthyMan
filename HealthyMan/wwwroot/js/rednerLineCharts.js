function renderLineCharts(model) {
    google.charts.load("current", { packages: ["corechart"] }).then(function () {
        options = {
            //title: "Data visualization chart",
            pointSize: 5,
            hAxis: {
                title: "Time [s]",
            },

            vAxis: {
                title: "Blood pressure",
            },

            explorer: {
                maxZoomIn: 40.0,
                maxZoomOut: 2.0,
                axis: "horizontal",
            },
        };

        console.log(model);

        pulseDataTable = new google.visualization.DataTable();
        pulseDataTable.addColumn("number", "Time");
        pulseDataTable.addColumn("number", "Blood pressure");

        gsrDataTable = new google.visualization.DataTable();
        gsrDataTable.addColumn("number", "Time");
        gsrDataTable.addColumn("number", "Resistance [Ω]");

        respiratoryRateDataTable = new google.visualization.DataTable();
        respiratoryRateDataTable.addColumn("number", "Time");
        respiratoryRateDataTable.addColumn("number", "Chest circumference change");

        diffDataTable = new google.visualization.DataTable();
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


        let diff = Math.abs(model.pulseTime[model.pulseTime.length - 1] - model.gsrTime[model.pulseTime.length - 1]);

        console.log(diff / model.pulseTime.length);

        pulseChart = new google.visualization.LineChart(
            document.getElementById("pulse_chart")
        );
        pulseChart.draw(pulseDataTable, options);

        options.vAxis.title = "Resistance [Ω]"
        gsrChart = new google.visualization.LineChart(
            document.getElementById("gsr_chart")
        );
        gsrChart.draw(gsrDataTable, options);

        options.vAxis.title = "Chest circumference change"
        respiratoryRateChart = new google.visualization.LineChart(
            document.getElementById("respiratoryRate_chart")
        );
        respiratoryRateChart.draw(respiratoryRateDataTable, options);

        options.vAxis.title = "Time difference"
        diffChart = new google.visualization.LineChart(
            document.getElementById("diff_chart")
        );
        diffChart.draw(diffDataTable, options);
    });
}
