using System;
using System.Collections.Generic;
using System.Text;
using HealthyMan.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HealthyMan.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Measurement> Measurements { get; set; }
        public DbSet<AccessKey> AccessKeys { get; set; }
        public DbSet<Settings> Settings { get; set; }

    }
}
