using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_PulseAmplitude_and_PulseFrequency_to_Measurement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<int>>(
                name: "PulseAmplitude",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "PulseAmplitudeTime",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "PulseAmplitudeVariance",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "PulseFrequency",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "PulseFrequencyTime",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "PulseFrequencyVariance",
                table: "Measurements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PulseAmplitude",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "PulseAmplitudeTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "PulseAmplitudeVariance",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "PulseFrequency",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "PulseFrequencyTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "PulseFrequencyVariance",
                table: "Measurements");
        }
    }
}
