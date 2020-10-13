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
            currentSettigns.InitialThreshold = 1650;
            currentSettigns.ThresholdAmplitudePercentage = 50;
            currentSettigns.MovMeanRespiratoryRateWindowLength = 41;
            _context.Update(currentSettigns);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> SaveSettings(Settings settings)
        {
            Settings currentSettigns = await _context.Settings.SingleOrDefaultAsync(s => s.SettingsId == 1);
            currentSettigns.InitialThreshold = settings.InitialThreshold;
            currentSettigns.ThresholdAmplitudePercentage = settings.ThresholdAmplitudePercentage;
            currentSettigns.MovMeanRespiratoryRateWindowLength = settings.MovMeanRespiratoryRateWindowLength;
            _context.Update(currentSettigns);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

       
    }
}