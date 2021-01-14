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
    public class MeasurementSaveController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MeasurementSaveController(ApplicationDbContext context)
        {
            _context = context;
        }
        // POST: api/Measurement
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Measurement measurement)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data");

            if (_context.Patients.Any(p => p.FirstName == measurement.Patient.FirstName &&
                                           p.LastName == measurement.Patient.LastName &&
                                           p.BirthDate == measurement.Patient.BirthDate)
                )
            {
                Patient alreadyKnownPatient = _context.Patients.SingleOrDefault(p => p.FirstName == measurement.Patient.FirstName &&
                                     p.LastName == measurement.Patient.LastName &&
                                     p.BirthDate == measurement.Patient.BirthDate);

                measurement.Patient = alreadyKnownPatient;
            }
            measurement.TimeStamp = DateTime.Now;

            await _context.AddAsync(measurement);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
