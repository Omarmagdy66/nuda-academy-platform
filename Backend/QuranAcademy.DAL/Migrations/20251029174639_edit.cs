using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuranAcademy.DAL.Migrations
{
    /// <inheritdoc />
    public partial class edit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SiteContents",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SiteContents",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "SiteContents",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "Key",
                table: "SiteContents",
                newName: "Email");

            migrationBuilder.RenameIndex(
                name: "IX_SiteContents_Key",
                table: "SiteContents",
                newName: "IX_SiteContents_Email");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "SiteContents",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "SiteContents",
                newName: "Key");

            migrationBuilder.RenameIndex(
                name: "IX_SiteContents_Email",
                table: "SiteContents",
                newName: "IX_SiteContents_Key");

            migrationBuilder.InsertData(
                table: "SiteContents",
                columns: new[] { "Id", "Key", "Value" },
                values: new object[,]
                {
                    { 1, "contact_email", "info@example.com" },
                    { 2, "contact_whatsapp", "+966501234567" }
                });
        }
    }
}
