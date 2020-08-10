using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HealthyMan.Migrations
{
    public partial class PulseMeasurementsColumnAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PulseMeasurements",
                columns: table => new
                {
                    PulseMeasurementId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Pulse = table.Column<float>(nullable: false),
                    Values = table.Column<List<float>>(nullable: true),
                    Time = table.Column<List<float>>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PulseMeasurements", x => x.PulseMeasurementId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PulseMeasurements");
        }
    }
}
