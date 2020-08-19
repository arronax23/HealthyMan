function renderLineCharts(model) {
    google.charts.load("current", { packages: ["corechart"] }).then(function () {
        options = {
            title: "Data visualization chart",
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

        diffDataTable = new google.visualization.DataTable();
        diffDataTable.addColumn("number", "Number");
        diffDataTable.addColumn("number", "Time difference");

        for (let i = 0; i < model.pulseTime.length; i++) {
            pulseDataTable.addRow([model.pulseTime[i], model.pulseValues[i]]);
            gsrDataTable.addRow([model.gsrTime[i], model.gsrValues[i]]);
            diffDataTable.addRow([i, model.pulseTime[i] - model.gsrTime[i]]);
        }

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

        options.vAxis.title = "Time difference"
        diffChart = new google.visualization.LineChart(
            document.getElementById("diff_chart")
        );
        diffChart.draw(diffDataTable, options);
    });
}
