using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_different_window_sizes_for_heart_rate_and_respiratory_rate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("FFTWindowSize", "Settings", "PulseFFTWindowSize");
            migrationBuilder.RenameColumn("FFTWindowSizeWithPadding", "Settings", "PulseFFTWindowSizeWithPadding");

            migrationBuilder.RenameColumn("FFTWindowSize", "Measurements", "PulseFFTWindowSize");
            migrationBuilder.RenameColumn("FFTWindowSizeWithPadding", "Measurements", "PulseFFTWindowSizeWithPadding");
           
            migrationBuilder.DropColumn(
                name: "MovMeanRespiratoryRateWindowLength",
                table: "Settings");

            migrationBuilder.AddColumn<int>(
                name: "RespiratoryRateFFTWindowSize",
                table: "Settings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RespiratoryRateFFTWindowSizeWithPadding",
                table: "Settings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RespiratoryRateFFTWindowSize",
                table: "Measurements",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RespiratoryRateFFTWindowSizeWithPadding",
                table: "Measurements",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("PulseFFTWindowSize", "Settings", "FFTWindowSize");
            migrationBuilder.RenameColumn("PulseFFTWindowSizeWithPadding", "Settings", "FFTWindowSizeWithPadding");

            migrationBuilder.RenameColumn("PulseFFTWindowSize", "Measurements", "FFTWindowSize");
            migrationBuilder.RenameColumn("PulseFFTWindowSizeWithPadding", "Measurements", "FFTWindowSizeWithPadding");


            migrationBuilder.AddColumn<int>(
                name: "MovMeanRespiratoryRateWindowLength",
                table: "Settings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.DropColumn(
                name: "RespiratoryRateFFTWindowSize",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateFFTWindowSizeWithPadding",
                table: "Settings");


            migrationBuilder.DropColumn(
                name: "RespiratoryRateFFTWindowSize",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "RespiratoryRateFFTWindowSizeWithPadding",
                table: "Measurements");


        }
    }
}
