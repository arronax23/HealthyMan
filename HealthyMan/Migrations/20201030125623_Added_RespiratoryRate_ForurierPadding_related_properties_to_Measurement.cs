using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_RespiratoryRate_ForurierPadding_related_properties_to_Measurement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRateAmplitude",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRateAmplitudeTime",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRateAmplitudeVariance",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRateFrequency",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRateFrequencyTime",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRateFrequencyVariance",
                table: "Measurements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RespiratoryRateAmplitude",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateAmplitudeTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateAmplitudeVariance",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateFrequency",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateFrequencyTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateFrequencyVariance",
                table: "Measurements");
        }
    }
}
