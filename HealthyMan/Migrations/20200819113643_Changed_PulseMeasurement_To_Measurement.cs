using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HealthyMan.Migrations
{
    public partial class Changed_PulseMeasurement_To_Measurement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PulseMeasurements");

            migrationBuilder.CreateTable(
                name: "Measurements",
                columns: table => new
                {
                    MeasurementId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Pulse = table.Column<int>(nullable: false),
                    PeaksCounter = table.Column<int>(nullable: false),
                    PulseValues = table.Column<List<float>>(nullable: true),
                    PulseTime = table.Column<List<float>>(nullable: true),
                    GSRValues = table.Column<List<float>>(nullable: true),
                    GSRTime = table.Column<List<float>>(nullable: true),
                    TimeStamp = table.Column<DateTime>(nullable: false),
                    PatientId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Measurements", x => x.MeasurementId);
                    table.ForeignKey(
                        name: "FK_Measurements_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Measurements_PatientId",
                table: "Measurements",
                column: "PatientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Measurements");

            migrationBuilder.CreateTable(
                name: "PulseMeasurements",
                columns: table => new
                {
                    PulseMeasurementId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PatientId = table.Column<int>(type: "integer", nullable: true),
                    Pulse = table.Column<int>(type: "integer", nullable: false),
                    Time = table.Column<List<float>>(type: "real[]", nullable: true),
                    TimeStamp = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Values = table.Column<List<float>>(type: "real[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PulseMeasurements", x => x.PulseMeasurementId);
                    table.ForeignKey(
                        name: "FK_PulseMeasurements_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PulseMeasurements_PatientId",
                table: "PulseMeasurements",
                column: "PatientId");
        }
    }
}
