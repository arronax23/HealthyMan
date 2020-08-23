using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_RespiratoryRateValues_and_RespiratoryRateTime_properties_to_Measurement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRateTime",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "RespiratoryRateValues",
                table: "Measurements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RespiratoryRateTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateValues",
                table: "Measurements");
        }
    }
}
