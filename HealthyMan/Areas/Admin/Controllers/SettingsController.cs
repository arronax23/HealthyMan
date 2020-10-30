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
    public class SettingsController : Controller
    {
        private readonly ApplicationDbContext _context;
        public SettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Settings.SingleOrDefaultAsync(s => s.SettingsId == 1));
        }

        public async Task<IActionResult> SetDefaultSettings()
        {
            Settings currentSettigns = await _context.Settings.SingleOrDefaultAsync(s => s.SettingsId == 1);
            currentSettigns.PulseFFTWindowSize = 128;
            currentSettigns.PulseFFTWindowSizeWithPadding = 1024;

            currentSettigns.RespiratoryRateFFTWindowSize = 128;
            currentSettigns.RespiratoryRateFFTWindowSizeWithPadding = 2048;

            _context.Update(currentSettigns);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> SaveSettings(Settings settings)
        {
            Settings currentSettigns = await _context.Settings.SingleOrDefaultAsync(s => s.SettingsId == 1);
            currentSettigns.PulseFFTWindowSize = settings.PulseFFTWindowSize;
            currentSettigns.PulseFFTWindowSizeWithPadding = settings.PulseFFTWindowSizeWithPadding;

            currentSettigns.RespiratoryRateFFTWindowSize = settings.RespiratoryRateFFTWindowSize;
            currentSettigns.RespiratoryRateFFTWindowSizeWithPadding = settings.RespiratoryRateFFTWindowSizeWithPadding;

            _context.Update(currentSettigns);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

       
    }
}