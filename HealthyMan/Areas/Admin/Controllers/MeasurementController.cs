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
    public class MeasurementController : Controller
    {
        private readonly ApplicationDbContext _context;
        public MeasurementController(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.Settings.SingleOrDefaultAsync(s => s.SettingsId == 1));
        }

    }
}
