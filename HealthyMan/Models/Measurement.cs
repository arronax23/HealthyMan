using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class Measurement
    {
        public List<float> Values { get; set; }
        public List<float> Time { get; set; }
    }
}
