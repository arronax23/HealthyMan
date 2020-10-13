using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class Delete_AccessKeys_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccessKeys");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
