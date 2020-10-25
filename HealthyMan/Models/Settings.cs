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
        public int FFTWindowSize { get; set; }
        [Display(Name = "FFT window size with padding")]
        public int FFTWindowSizeWithPadding { get; set; }
        [Display(Name = "Moving mean respiratory rate window length")]
        public int MovMeanRespiratoryRateWindowLength { get; set; }
    }
}
