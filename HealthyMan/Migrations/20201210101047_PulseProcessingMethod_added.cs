using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class PulseProcessingMethod_added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PulseProcessingMethod",
                table: "Settings",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PulseProcessingMethod",
                table: "Measurements",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PulseProcessingMethod",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "PulseProcessingMethod",
                table: "Measurements");
        }
    }
}
