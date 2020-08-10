using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class Patient
    {
        public int? PatientId { get; set; }
        public string FirstName { get; set; }
        public int LastName { get; set; }
        //public DateTime BirthDate { get; set; }
        public List<PulseMeasurement> PulseMeasurements { get; set; }

    }
}
