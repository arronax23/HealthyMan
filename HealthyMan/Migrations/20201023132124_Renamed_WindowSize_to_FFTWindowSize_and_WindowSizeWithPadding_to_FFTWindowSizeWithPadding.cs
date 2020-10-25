using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Renamed_WindowSize_to_FFTWindowSize_and_WindowSizeWithPadding_to_FFTWindowSizeWithPadding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("WindowSize", "Settings", "FFTWindowSize");
            migrationBuilder.RenameColumn("WindowSizeWithPadding", "Settings", "FFTWindowSizeWithPadding");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("FFTWindowSize", "Settings", "WindowSize");
            migrationBuilder.RenameColumn("FFTWindowSizeWithPadding", "Settings", "WindowSizeWithPadding");
        }
    }
}
