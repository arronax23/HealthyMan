using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_Heart_Beats_Property_to_Measurement_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<float>>(
                name: "HeartBeatsTime",
                table: "Measurements",
                nullable: true);

            migrationBuilder.AddColumn<List<int>>(
                name: "HeartBeatsValues",
                table: "Measurements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HeartBeatsTime",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "HeartBeatsValues",
                table: "Measurements");
        }
    }
}
