using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyMan.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthyMan
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementController : ControllerBase
    {
        // POST: api/Measurement
        [HttpPost]
        public IActionResult Post([FromBody] Measurement measurement)
        {
            Console.WriteLine();

            return Created("sasas",5);
        }

    }
}
