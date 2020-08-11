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
        public IActionResult Post([FromBody] PulseMeasurement pulseMeasurement)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data");

            if (_context.Patients.Any(p => p.FirstName == pulseMeasurement.Patient.FirstName &&
                                           p.LastName == pulseMeasurement.Patient.LastName &&
                                           p.BirthDate == pulseMeasurement.Patient.BirthDate)
                )
            {
                Patient alreadyKnownPatient = _context.Patients.ToList().Find(p => p.FirstName == pulseMeasurement.Patient.FirstName &&
                                     p.LastName == pulseMeasurement.Patient.LastName &&
                                     p.BirthDate == pulseMeasurement.Patient.BirthDate);

                pulseMeasurement.Patient = alreadyKnownPatient;
            }


            _context.Add(pulseMeasurement);
            _context.SaveChanges();

            return Ok();
        }

    }
}
