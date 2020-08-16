function renderPulseLineChart(model) {
    google.charts.load("current", { packages: ["corechart"] }).then(function () {
        options = {
            title: "Data visualization chart",
            pointSize: 5,
            hAxis: {
                title: "Time",
            },

            vAxis: {
                title: "Pulse",
            },

            explorer: {
                maxZoomIn: 40.0,
                maxZoomOut: 2.0
            },
        };

        console.log(model);

        dataTable = new google.visualization.DataTable();
        dataTable.addColumn("number", "Time");
        dataTable.addColumn("number", "Pulse");

        for (let i = 0; i < model.time.length; i++) {
            dataTable.addRow([model.time[i], model.values[i]]);
        }

        chart = new google.visualization.LineChart(
            document.getElementById("line_chart")
        );

        chart.draw(dataTable, options);


    });
}
