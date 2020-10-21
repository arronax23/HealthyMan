using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Deleted_PulseThreshold_Realted_Properties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HeartBeatsTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "HeartBeatsValues",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "InitialThreshold",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "PulseThreshold",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "PulseThresholdTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "ThresholdAmplitudePercentage",
                table: "Measurements");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<float>>(
                name: "HeartBeatsTime",
                table: "Measurements",
                type: "real[]",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "HeartBeatsValues",
                table: "Measurements",
                type: "real[]",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InitialThreshold",
                table: "Measurements",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<List<float>>(
                name: "PulseThreshold",
                table: "Measurements",
                type: "real[]",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "PulseThresholdTime",
                table: "Measurements",
                type: "real[]",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThresholdAmplitudePercentage",
                table: "Measurements",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
