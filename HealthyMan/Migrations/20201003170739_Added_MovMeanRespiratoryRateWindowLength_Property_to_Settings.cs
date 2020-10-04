using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_MovMeanRespiratoryRateWindowLength_Property_to_Settings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MovMeanRespiratoryRateWindowLength",
                table: "Settings",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MovMeanRespiratoryRateWindowLength",
                table: "Settings");
        }
    }
}
