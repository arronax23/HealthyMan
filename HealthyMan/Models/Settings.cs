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
        [Display(Name = "FFT window size [number of samples]")]
        public int PulseFFTWindowSize { get; set; }
        [Display(Name = "FFT window size with padding [number of samples]")]
        public int PulseFFTWindowSizeWithPadding { get; set; }
        [Display(Name = "FFT step size [number of samples]")]
        public int PulseFFTStepSize { get; set; }
        [Display(Name = "Processing method")]
        public string PulseProcessingMethod { get; set; }
        [Display(Name = "FFT window size [number of samples]")]
        public int RespiratoryRateFFTWindowSize { get; set; }
        [Display(Name = "FFT window size with padding [number of samples]")]
        public int RespiratoryRateFFTWindowSizeWithPadding { get; set; }
        [Display(Name = "FFT step size [number of samples]")]
        public int RespiratoryRateFFTStepSize { get; set; }

    }
}
