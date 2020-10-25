using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_WindowSize_and_WindowSizeWithPadding_to_Setting_Removed_Threshold_and_Percentage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialThreshold",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "ThresholdAmplitudePercentage",
                table: "Settings");

            migrationBuilder.AddColumn<int>(
                name: "WindowSize",
                table: "Settings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WindowSizeWithPadding",
                table: "Settings",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WindowSize",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "WindowSizeWithPadding",
                table: "Settings");

            migrationBuilder.AddColumn<int>(
                name: "InitialThreshold",
                table: "Settings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ThresholdAmplitudePercentage",
                table: "Settings",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
