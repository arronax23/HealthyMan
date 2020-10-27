using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_FFTWindowSize_and_FFTWindowSizeWithPadding_to_Measurement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FFTWindowSize",
                table: "Measurements",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FFTWindowSizeWithPadding",
                table: "Measurements",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FFTWindowSize",
                table: "Measurements");

            migrationBuilder.DropColumn(
                name: "FFTWindowSizeWithPadding",
                table: "Measurements");
        }
    }
}
