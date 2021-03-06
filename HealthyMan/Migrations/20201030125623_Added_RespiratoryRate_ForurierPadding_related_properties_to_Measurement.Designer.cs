﻿// <auto-generated />
using System;
using System.Collections.Generic;
using HealthyMan.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HealthyMan.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20201030125623_Added_RespiratoryRate_ForurierPadding_related_properties_to_Measurement")]
    partial class Added_RespiratoryRate_ForurierPadding_related_properties_to_Measurement
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("HealthyMan.Models.Measurement", b =>
                {
                    b.Property<int?>("MeasurementId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<List<float>>("BreathPeaksTime")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("BreathPeaksValues")
                        .HasColumnType("real[]");

                    b.Property<int>("FFTWindowSize")
                        .HasColumnType("integer");

                    b.Property<int>("FFTWindowSizeWithPadding")
                        .HasColumnType("integer");

                    b.Property<List<float>>("GSRTime")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("GSRValues")
                        .HasColumnType("real[]");

                    b.Property<int>("HeartRateAverage")
                        .HasColumnType("integer");

                    b.Property<List<float>>("InstantaneousRespiratoryRate")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("InstantaneousRespiratoryRateTime")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("MovMean1RespiratoryRate")
                        .HasColumnType("real[]");

                    b.Property<int?>("PatientId")
                        .HasColumnType("integer");

                    b.Property<List<float>>("PulseAmplitude")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("PulseAmplitudeTime")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("PulseAmplitudeVariance")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("PulseFrequency")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("PulseFrequencyTime")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("PulseFrequencyVariance")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("PulseTime")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("PulseValues")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("RespiratoryRateAmplitude")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("RespiratoryRateAmplitudeTime")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("RespiratoryRateAmplitudeVariance")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("RespiratoryRateFrequency")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("RespiratoryRateFrequencyTime")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("RespiratoryRateFrequencyVariance")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("RespiratoryRateTime")
                        .HasColumnType("real[]");

                    b.Property<List<float>>("RespiratoryRateValues")
                        .HasColumnType("real[]");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("MeasurementId");

                    b.HasIndex("PatientId");

                    b.ToTable("Measurements");
                });

            modelBuilder.Entity("HealthyMan.Models.Patient", b =>
                {
                    b.Property<int?>("PatientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.HasKey("PatientId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("HealthyMan.Models.Settings", b =>
                {
                    b.Property<int?>("SettingsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("FFTWindowSize")
                        .HasColumnType("integer");

                    b.Property<int>("FFTWindowSizeWithPadding")
                        .HasColumnType("integer");

                    b.Property<int>("MovMeanRespiratoryRateWindowLength")
                        .HasColumnType("integer");

                    b.HasKey("SettingsId");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("HealthyMan.Models.Measurement", b =>
                {
                    b.HasOne("HealthyMan.Models.Patient", "Patient")
                        .WithMany("Measurements")
                        .HasForeignKey("PatientId");
                });
#pragma warning restore 612, 618
        }
    }
}
