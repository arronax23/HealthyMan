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

        for (let i = 0; i < model.pulseTime.length; i++) {
            pulseDataTable.addRow([model.pulseTime[i], model.pulseValues[i]]);
            gsrDataTable.addRow([model.gsrTime[i], model.gsrValues[i]]);
        }

        pulseChart = new google.visualization.LineChart(
            document.getElementById("pulse_chart")
        );
        pulseChart.draw(pulseDataTable, options);

        options.vAxis.title = "Resistance [Ω]"
        gsrChart = new google.visualization.LineChart(
            document.getElementById("gsr_chart")
        );
        gsrChart.draw(gsrDataTable, options);

    });
}
