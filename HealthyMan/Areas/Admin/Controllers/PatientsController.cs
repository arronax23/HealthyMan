using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyMan.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthyMan.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class PatientsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PatientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Patients.ToListAsync());
        }

        public async Task<IActionResult> Patient(int id)
        {
            return View(await _context.Patients.Include(p => p.PulseMeasurements).SingleOrDefaultAsync(p => p.PatientId == id));
        }

        public async Task<IActionResult> PulseMeasurement(int id)
        {
            return View(await _context.PulseMeasurements.Include(pM => pM.Patient).SingleOrDefaultAsync(pM => pM.PulseMeasurementId == id));
        }

    }
}