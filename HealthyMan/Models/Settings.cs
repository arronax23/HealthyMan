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
        [Display(Name = "Initial static threshold")]
        public int InitialThreshold { get; set; }
        [Display(Name = "Percentage of amplitude for dynamic threshold")]
        public int ThresholdAmplitudePercentage { get; set; }
        [Display(Name = "Moving mean resiratory rate window length")]
        public int MovMeanRespiratoryRateWindowLength { get; set; }
    }
}
