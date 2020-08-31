using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Measurement_PulseValues_and_GSRValues_type_changed_to_List_of_int_from_List_of_float : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<int>>(
                name: "PulseValues",
                table: "Measurements",
                nullable: true,
                oldClrType: typeof(List<float>),
                oldType: "real[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<List<int>>(
                name: "GSRValues",
                table: "Measurements",
                nullable: true,
                oldClrType: typeof(List<float>),
                oldType: "real[]",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<float>>(
                name: "PulseValues",
                table: "Measurements",
                type: "real[]",
                nullable: true,
                oldClrType: typeof(List<int>),
                oldNullable: true);

            migrationBuilder.AlterColumn<List<float>>(
                name: "GSRValues",
                table: "Measurements",
                type: "real[]",
                nullable: true,
                oldClrType: typeof(List<int>),
                oldNullable: true);
        }
    }
}
