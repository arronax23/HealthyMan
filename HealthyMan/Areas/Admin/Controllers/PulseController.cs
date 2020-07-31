using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using HealthyMan.Models;
using Microsoft.AspNetCore.Authorization;

namespace HealthyMan.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class PulseController : Controller
    {
        private readonly ILogger<PulseController> _logger;

        public PulseController(ILogger<PulseController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

    }
}
