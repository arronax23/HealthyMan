using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class BreathPeaks_added_to_Measurement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<float>>(
                name: "BreathPeaksTime",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<float>>(
                name: "BreathPeaksValues",
                table: "Measurements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BreathPeaksTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "BreathPeaksValues",
                table: "Measurements");
        }
    }
}
