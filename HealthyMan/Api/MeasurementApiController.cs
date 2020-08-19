﻿using System;
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
    public class MeasurementApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MeasurementApiController(ApplicationDbContext context)
        {
            _context = context;
        }
        // POST: api/Measurement
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PulseMeasurement pulseMeasurement)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data");

            if (_context.Patients.Any(p => p.FirstName == pulseMeasurement.Patient.FirstName &&
                                           p.LastName == pulseMeasurement.Patient.LastName &&
                                           p.BirthDate == pulseMeasurement.Patient.BirthDate)
                )
            {
                Patient alreadyKnownPatient = _context.Patients.SingleOrDefault(p => p.FirstName == pulseMeasurement.Patient.FirstName &&
                                     p.LastName == pulseMeasurement.Patient.LastName &&
                                     p.BirthDate == pulseMeasurement.Patient.BirthDate);

                pulseMeasurement.Patient = alreadyKnownPatient;
            }
            pulseMeasurement.TimeStamp = DateTime.Now;

            await _context.AddAsync(pulseMeasurement);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
