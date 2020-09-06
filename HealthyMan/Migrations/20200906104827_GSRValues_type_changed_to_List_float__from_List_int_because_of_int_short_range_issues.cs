using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class GSRValues_type_changed_to_List_float__from_List_int_because_of_int_short_range_issues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<float>>(
                name: "GSRValues",
                table: "Measurements",
                nullable: true,
                oldClrType: typeof(List<int>),
                oldType: "integer[]",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<int>>(
                name: "GSRValues",
                table: "Measurements",
                type: "integer[]",
                nullable: true,
                oldClrType: typeof(List<float>),
                oldNullable: true);
        }
    }
}
