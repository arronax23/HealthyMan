using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_InstantaneousRespiratoryRate_and_InstantaneousRespiratoryRateTime_to_Measurement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RespiratoryRate",
                table: "Measurements");

            migrationBuilder.AddColumn<List<float>>(
                name: "InstantaneousRespiratoryRate",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "InstantaneousRespiratoryRateTime",
                table: "Measurements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstantaneousRespiratoryRate",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "InstantaneousRespiratoryRateTime",
                table: "Measurements");

            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRate",
                table: "Measurements",
                type: "real[]",
                nullable: true);
        }
    }
}
