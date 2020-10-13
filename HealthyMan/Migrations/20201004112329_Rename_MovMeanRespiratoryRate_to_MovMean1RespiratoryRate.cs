using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Rename_MovMeanRespiratoryRate_to_MovMean1RespiratoryRate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("MovMeanRespiratoryRate", "Measurements", "MovMean1RespiratoryRate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("MovMean1RespiratoryRate", "Measurements", "MovMeanRespiratoryRate");
        }
    }
}
