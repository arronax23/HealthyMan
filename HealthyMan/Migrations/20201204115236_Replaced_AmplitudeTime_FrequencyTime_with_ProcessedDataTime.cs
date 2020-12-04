using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Replaced_AmplitudeTime_FrequencyTime_with_ProcessedDataTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.RenameColumn("PulseAmplitudeTime", "Measurements", "PulseProcessedDataTime");

            migrationBuilder.RenameColumn("RespiratoryRateAmplitudeTime", "Measurements", "RespiratoryRateProcessedDataTime");

            migrationBuilder.DropColumn(
                name: "PulseFrequencyTime",
                table: "Measurements");


            migrationBuilder.DropColumn(
                name: "RespiratoryRateFrequencyTime",
                table: "Measurements");


        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("PulseProcessedDataTime", "Measurements", "PulseAmplitudeTime");

            migrationBuilder.RenameColumn("RespiratoryRateProcessedDataTime", "Measurements", "RespiratoryRateAmplitudeTime");
            

            migrationBuilder.AddColumn<List<float>>(
                name: "PulseFrequencyTime",
                table: "Measurements",
                type: "real[]",
                nullable: true);


            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRateFrequencyTime",
                table: "Measurements",
                type: "real[]",
                nullable: true);
        }
    }
}
