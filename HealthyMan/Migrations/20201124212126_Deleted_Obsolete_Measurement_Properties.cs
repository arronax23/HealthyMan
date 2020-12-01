using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Deleted_Obsolete_Measurement_Properties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BreathPeaksTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "BreathPeaksValues",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "InstantaneousRespiratoryRate",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "InstantaneousRespiratoryRateTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "MovMean1RespiratoryRate",
                table: "Measurements");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<float>>(
                name: "BreathPeaksTime",
                table: "Measurements",
                type: "real[]",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "BreathPeaksValues",
                table: "Measurements",
                type: "real[]",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "InstantaneousRespiratoryRate",
                table: "Measurements",
                type: "real[]",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "InstantaneousRespiratoryRateTime",
                table: "Measurements",
                type: "real[]",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "MovMean1RespiratoryRate",
                table: "Measurements",
                type: "real[]",
                nullable: true);
        }
    }
}
