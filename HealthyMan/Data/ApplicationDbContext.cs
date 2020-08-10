using System;
using System.Collections.Generic;
using System.Text;
using HealthyMan.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HealthyMan.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<PulseMeasurement> PulseMeasurements { get; set; }

    }
}
