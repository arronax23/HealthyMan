using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_PulseThreshold_to_Measurement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<float>>(
                name: "PulseThreshold",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "PulseThresholdTime",
                table: "Measurements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PulseThreshold",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "PulseThresholdTime",
                table: "Measurements");
        }
    }
}
