using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Pulse_Type_Changed_To_Int_From_Float : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Pulse",
                table: "PulseMeasurements",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Pulse",
                table: "PulseMeasurements",
                type: "real",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
