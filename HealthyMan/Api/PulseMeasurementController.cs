using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyMan.Data;
using HealthyMan.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthyMan
{
    [Route("api/[controller]")]
    [ApiController]
    public class PulseMeasurementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PulseMeasurementController(ApplicationDbContext context)
        {
            _context = context;
        }
        // POST: api/Measurement
        [HttpPost]
        public IActionResult Post([FromBody] PulseMeasurement measurement)
        {
            _context.Add(measurement);
            _context.SaveChanges();

            return Created("sasas",5);
        }

    }
}
