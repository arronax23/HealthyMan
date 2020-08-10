using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Changed_PatientId_From_String_To_Int_4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Patients_PatientId1",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_PatientId1",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PatientId1",
                table: "AspNetUsers");
            /*
            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true
                );
                */
          migrationBuilder.Sql("ALTER TABLE \"AspNetUsers\" ALTER COLUMN \"PatientId\" TYPE integer USING \"PatientId\"::integer");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_PatientId",
                table: "AspNetUsers",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Patients_PatientId",
                table: "AspNetUsers",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Patients_PatientId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_PatientId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "PatientId",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PatientId1",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_PatientId1",
                table: "AspNetUsers",
                column: "PatientId1");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Patients_PatientId1",
                table: "AspNetUsers",
                column: "PatientId1",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
