using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Added_MovMeanRespiraotryRate_Property_to_Measurement_and_changed_RespiratoryRateValues_type_to_list_int : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<int>>(
                name: "RespiratoryRateValues",
                table: "Measurements",
                nullable: true,
                oldClrType: typeof(List<float>),
                oldType: "real[]",
                oldNullable: true);

            migrationBuilder.AddColumn<List<int>>(
                name: "MovMeanRespiratoryRate",
                table: "Measurements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MovMeanRespiratoryRate",
                table: "Measurements");

            migrationBuilder.AlterColumn<List<float>>(
                name: "RespiratoryRateValues",
                table: "Measurements",
                type: "real[]",
                nullable: true,
                oldClrType: typeof(List<int>),
                oldNullable: true);
        }
    }
}
