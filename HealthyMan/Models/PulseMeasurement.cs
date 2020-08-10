using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class PulseMeasurement
    {
        public int? PulseMeasurementId { get; set; }
        public float Pulse { get; set; }
        public List<float> Values { get; set; }
        public List<float> Time { get; set; }
        //public virtual  Patient Patient { get; set; }
        //public virtual PulseData PulseData { get; set; }

    }
}
