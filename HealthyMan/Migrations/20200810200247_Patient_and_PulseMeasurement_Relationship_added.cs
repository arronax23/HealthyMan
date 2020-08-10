using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Patient_and_PulseMeasurement_Relationship_added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "PulseMeasurements",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PulseMeasurements_PatientId",
                table: "PulseMeasurements",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_PulseMeasurements_Patients_PatientId",
                table: "PulseMeasurements",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PulseMeasurements_Patients_PatientId",
                table: "PulseMeasurements");

            migrationBuilder.DropIndex(
                name: "IX_PulseMeasurements_PatientId",
                table: "PulseMeasurements");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "PulseMeasurements");
        }
    }
}
