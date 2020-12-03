using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class AddedStepSize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PulseFFTStepSize",
                table: "Settings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RespiratoryRateFFTStepSize",
                table: "Settings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PulseFFTStepSize",
                table: "Measurements",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RespiratoryRateFFTStepSize",
                table: "Measurements",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PulseFFTStepSize",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateFFTStepSize",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "PulseFFTStepSize",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateFFTStepSize",
                table: "Measurements");
        }
    }
}
