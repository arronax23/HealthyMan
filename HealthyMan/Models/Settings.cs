using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class Settings
    {
        public int? SettingsId { get; set; }       
        [Display(Name = "FFT window size")]
        public int PulseFFTWindowSize { get; set; }
        [Display(Name = "FFT window size with padding")]
        public int PulseFFTWindowSizeWithPadding { get; set; }
        [Display(Name = "FFT window size")]
        public int RespiratoryRateFFTWindowSize { get; set; }
        [Display(Name = "FFT window size with padding")]
        public int RespiratoryRateFFTWindowSizeWithPadding { get; set; }

    }
}
