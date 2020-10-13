using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyMan.Data;
using HealthyMan.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthyMan.Areas.Admin.Controllers
{
    [Area("Admin")]
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
            HealthyMan.Models.Patient patient = await _context.Patients.SingleOrDefaultAsync(p => p.PatientId == id);
            
            List<Measurement> measurements = _context.Measurements.Where(m => m.Patient.PatientId == id).ToList();

            _context.Measurements.RemoveRange(measurements);
            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Measurement(int id)
        {
            return View(await _context.Measurements.Include(m => m.Patient).SingleOrDefaultAsync(m => m.MeasurementId == id));
        }

        public async Task<IActionResult> DeleteMeasurement(int id)
        {
            return View(await _context.Measurements.Include(m => m.Patient).SingleOrDefaultAsync(m => m.MeasurementId == id));
        }

        public async Task<IActionResult> DeleteMeasurementConfirmed(int measurementId, int patientId)
        {
            Measurement measurement = await _context.Measurements.SingleOrDefaultAsync(m => m.MeasurementId == measurementId);
            _context.Measurements.Remove(measurement);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Patient),new { id = patientId });
        }
        

    }
}