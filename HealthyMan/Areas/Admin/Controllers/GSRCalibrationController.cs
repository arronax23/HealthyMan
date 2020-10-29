using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HealthyMan.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class GSRCalibrationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}