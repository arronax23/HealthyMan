using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HealthyMan.Migrations
{
    public partial class Delete_AccessKey2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccessKey",
                columns: table => new
                {
                    AccessKeyId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DateCreated = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Key = table.Column<string>(type: "text", nullable: true),
                    PatientId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessKey", x => x.AccessKeyId);
                    table.ForeignKey(
                        name: "FK_AccessKey_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccessKey_PatientId",
                table: "AccessKey",
                column: "PatientId",
                unique: true);
        }
    }
}
