using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyMan.Data;
using HealthyMan.Models;
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
            return View(await _context.Patients.Include(p => p.Measurements).SingleOrDefaultAsync(p => p.PatientId == id));
        }
        public async Task<IActionResult> DeletePatient(int id)
        {
            return View(await _context.Patients.Include(p => p.Measurements).SingleOrDefaultAsync(p => p.PatientId == id));
        }

        public async Task<IActionResult> DeletePatientConfirmed(int id)
        {
            Patient patient = await _context.Patients.SingleOrDefaultAsync(p => p.PatientId == id);
            List<Measurement> pulseMeasurements = _context.Measurements.Where(pM => pM.Patient.PatientId == id).ToList();
            
            _context.Measurements.RemoveRange(pulseMeasurements);
            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> PulseMeasurement(int id)
        {
            return View(await _context.Measurements.Include(pM => pM.Patient).SingleOrDefaultAsync(pM => pM.MeasurementId == id));
        }

        public async Task<IActionResult> DeletePulseMeasurement(int id)
        {
            return View(await _context.Measurements.Include(pM => pM.Patient).SingleOrDefaultAsync(pM => pM.MeasurementId == id));
        }

        public async Task<IActionResult> DeletePulseMeasurementConfirmed(int PulseMeasurementId, int PatientId)
        {
            Measurement pulseMeasurement = await _context.Measurements.SingleOrDefaultAsync(pM => pM.MeasurementId == PulseMeasurementId);
            _context.Measurements.Remove(pulseMeasurement);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Patient),new { id = PatientId });
        }

    }
}