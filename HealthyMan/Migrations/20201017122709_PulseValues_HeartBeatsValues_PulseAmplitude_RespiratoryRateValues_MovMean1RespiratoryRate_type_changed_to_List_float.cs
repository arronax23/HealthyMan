using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMan.Migrations
{
    public partial class PulseValues_HeartBeatsValues_PulseAmplitude_RespiratoryRateValues_MovMean1RespiratoryRate_type_changed_to_List_float : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<float>>(
                name: "RespiratoryRateValues",
                table: "Measurements",
                nullable: true,
                oldClrType: typeof(int[]),
                oldType: "integer[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<List<float>>(
                name: "PulseValues",
                table: "Measurements",
                nullable: true,
                oldClrType: typeof(int[]),
                oldType: "integer[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<List<float>>(
                name: "PulseAmplitude",
                table: "Measurements",
                nullable: true,
                oldClrType: typeof(int[]),
                oldType: "integer[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<List<float>>(
                name: "MovMean1RespiratoryRate",
                table: "Measurements",
                nullable: true,
                oldClrType: typeof(int[]),
                oldType: "integer[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<List<float>>(
                name: "HeartBeatsValues",
                table: "Measurements",
                nullable: true,
                oldClrType: typeof(int[]),
                oldType: "integer[]",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int[]>(
                name: "RespiratoryRateValues",
                table: "Measurements",
                type: "integer[]",
                nullable: true,
                oldClrType: typeof(List<float>),
                oldNullable: true);

            migrationBuilder.AlterColumn<int[]>(
                name: "PulseValues",
                table: "Measurements",
                type: "integer[]",
                nullable: true,
                oldClrType: typeof(List<float>),
                oldNullable: true);

            migrationBuilder.AlterColumn<int[]>(
                name: "PulseAmplitude",
                table: "Measurements",
                type: "integer[]",
                nullable: true,
                oldClrType: typeof(List<float>),
                oldNullable: true);

            migrationBuilder.AlterColumn<int[]>(
                name: "MovMean1RespiratoryRate",
                table: "Measurements",
                type: "integer[]",
                nullable: true,
                oldClrType: typeof(List<float>),
                oldNullable: true);

            migrationBuilder.AlterColumn<int[]>(
                name: "HeartBeatsValues",
                table: "Measurements",
                type: "integer[]",
                nullable: true,
                oldClrType: typeof(List<float>),
                oldNullable: true);
        }
    }
}
