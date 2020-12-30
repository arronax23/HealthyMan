﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyMan.Data;
using HealthyMan.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
            await CreateDefaultSettings();

            ViewBag.PulseProcessingMethods = new List<SelectListItem>();
            ViewBag.PulseProcessingMethods.Add(new SelectListItem() { Text = "find peaks", Value = "find peaks" });
            ViewBag.PulseProcessingMethods.Add(new SelectListItem() { Text = "double mean", Value = "double mean" });
            return View(await _context.Settings.SingleOrDefaultAsync(s => s.SettingsId == 1));
        }

        private async Task CreateDefaultSettings()
        {
            Settings settings = await _context.Settings.SingleOrDefaultAsync(s => s.SettingsId == 1);
            if (settings == null)
            {
                settings = new Settings();
                settings.SettingsId = 1;
                settings.PulseFFTWindowSize = 128;
                settings.PulseFFTWindowSizeWithPadding = 1024;
                settings.PulseFFTStepSize = 10;
                settings.PulseProcessingMethod = "find peaks";

                settings.RespiratoryRateFFTWindowSize = 256;
                settings.RespiratoryRateFFTWindowSizeWithPadding = 2048;
                settings.RespiratoryRateFFTStepSize = 255;

                await _context.AddAsync(settings);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IActionResult> SetDefaultSettings()
        {
            Settings currentSettigns = await _context.Settings.SingleOrDefaultAsync(s => s.SettingsId == 1);

            currentSettigns.PulseFFTWindowSize = 128;
            currentSettigns.PulseFFTWindowSizeWithPadding = 1024;
            currentSettigns.PulseFFTStepSize = 10;
            currentSettigns.PulseProcessingMethod = "find peaks";

            currentSettigns.RespiratoryRateFFTWindowSize = 256;
            currentSettigns.RespiratoryRateFFTWindowSizeWithPadding = 2048;
            currentSettigns.RespiratoryRateFFTStepSize = 255;

            _context.Update(currentSettigns);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> SaveSettings(Settings settings)
        {
            Settings currentSettigns = await _context.Settings.SingleOrDefaultAsync(s => s.SettingsId == 1);
            currentSettigns.PulseFFTWindowSize = settings.PulseFFTWindowSize;
            currentSettigns.PulseFFTWindowSizeWithPadding = settings.PulseFFTWindowSizeWithPadding;
            currentSettigns.PulseFFTStepSize = settings.PulseFFTStepSize;
            currentSettigns.PulseProcessingMethod = settings.PulseProcessingMethod;

            currentSettigns.RespiratoryRateFFTWindowSize = settings.RespiratoryRateFFTWindowSize;
            currentSettigns.RespiratoryRateFFTWindowSizeWithPadding = settings.RespiratoryRateFFTWindowSizeWithPadding;
            currentSettigns.RespiratoryRateFFTStepSize = settings.RespiratoryRateFFTStepSize;

            _context.Update(currentSettigns);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

       
    }
}