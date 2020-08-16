using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class PulseMeasurement
    {
        public int? PulseMeasurementId { get; set; }
        public int Pulse { get; set; }
        public List<float> Values { get; set; }
        public List<float> Time { get; set; }
        [Display(Name = "Time stamp")]
        public DateTime TimeStamp { get; set; }
        public Patient Patient { get; set; }
    }
}
