using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class Measurement
    {
        public int? MeasurementId { get; set; }
        public int Pulse { get; set; }
        [Display(Name = "Peaks counter")]
        public int PeaksCounter { get; set; }
        public List<float> PulseValues { get; set; }
        public List<float> PulseTime { get; set; }
        public List<float> GSRValues { get; set; }
        public List<float> GSRTime { get; set; }
        public List<float> RespiratoryRateValues { get; set; }
        public List<float> RespiratoryRateTime { get; set; }
        [Display(Name = "Time stamp")]
        public DateTime TimeStamp { get; set; }
        public Patient Patient { get; set; }
    }
}
