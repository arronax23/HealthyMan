using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyMan.Areas.Admin.Controllers
{
    [Area("Patient")]
    //[Authorize(Roles = "Admin")]
    public class MyMeasurementsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}
