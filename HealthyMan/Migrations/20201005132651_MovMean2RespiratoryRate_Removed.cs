using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class MovMean2RespiratoryRate_Removed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MovMean2RespiratoryRate",
                table: "Measurements");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<int>>(
                name: "MovMean2RespiratoryRate",
                table: "Measurements",
                type: "integer[]",
                nullable: true);
        }
    }
}
