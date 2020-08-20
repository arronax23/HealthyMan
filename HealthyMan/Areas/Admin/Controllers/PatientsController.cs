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
            return View(await _context.Patients.Include(p => p.Measurements).Include(p => p.AccessKey).SingleOrDefaultAsync(p => p.PatientId == id));
        }
        public async Task<IActionResult> DeletePatient(int id)
        {
            return View(await _context.Patients.Include(p => p.Measurements).Include(p => p.AccessKey).SingleOrDefaultAsync(p => p.PatientId == id));
        }

        public async Task<IActionResult> DeletePatientConfirmed(int id)
        {
            Patient patient = await _context.Patients.SingleOrDefaultAsync(p => p.PatientId == id);
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
        
        public async Task<IActionResult> GenerateAccessKey(int id)
        {
            AccessKey oldKey = await _context.AccessKeys.SingleOrDefaultAsync(a => a.PatientId == id);
            if (oldKey != null)
            {
                _context.Remove(oldKey);
            }
            string genKey;
            AccessKey duplicate;
            do
            {
                genKey = GenerateRandomString(8);
                duplicate = await _context.AccessKeys.SingleOrDefaultAsync(k => k.Key == genKey);
            } while (duplicate != null);

            AccessKey accessKey = new AccessKey()
            {
                Key = genKey,
                PatientId = id,
                DateCreated = DateTime.Now,
            };

            _context.AccessKeys.Add(accessKey);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Patient), new { id = id });
        }

        public async Task<IActionResult> DeleteAccessKey(int id)
        {
            AccessKey key = await _context.AccessKeys.SingleOrDefaultAsync(a => a.PatientId == id);
            if (key != null)
            {
                _context.Remove(key);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Patient), new { id = id });
        }

        private string GenerateRandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}