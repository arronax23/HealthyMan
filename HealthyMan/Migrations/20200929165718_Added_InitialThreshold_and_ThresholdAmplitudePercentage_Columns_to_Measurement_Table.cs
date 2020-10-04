using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_InitialThreshold_and_ThresholdAmplitudePercentage_Columns_to_Measurement_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InitialThreshold",
                table: "Measurements",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ThresholdAmplitudePercentage",
                table: "Measurements",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialThreshold",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "ThresholdAmplitudePercentage",
                table: "Measurements");
        }
    }
}
