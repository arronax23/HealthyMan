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
        [Display(Name = "Measurement Id")]
        public int? MeasurementId { get; set; }
        [Display(Name = "Average heart rate")]
        public int HeartRateAverage { get; set; }
        [Display(Name = "Peaks counter")]
        public List<float> PulseValues { get; set; }
        public List<float> PulseTime { get; set; }
        public List<float> PulseProcessedDataTime { get; set; }
        public List<float> PulseAmplitude { get; set; }
        public List<float> PulseAmplitudeVariance { get; set; }
        public List<float> PulseFrequency { get; set; }
        public List<float> PulseFrequencyVariance { get; set; }
        [Display(Name = "FFT window size")]
        public int PulseFFTWindowSize { get; set; }
        [Display(Name = "FFT window size with padding")]
        public int PulseFFTWindowSizeWithPadding { get; set; }
        [Display(Name = "FFT step size")]
        public int PulseFFTStepSize { get; set; }
        [Display(Name = "FFT window size")]
        public int RespiratoryRateFFTWindowSize { get; set; }
        [Display(Name = "FFT window size with padding")]
        public int RespiratoryRateFFTWindowSizeWithPadding { get; set; }
        [Display(Name = "FFT step size")]
        public int RespiratoryRateFFTStepSize { get; set; }
        public List<float> GSRValues { get; set; }
        public List<float> GSRTime { get; set; }
        public List<float> RespiratoryRateValues { get; set; }
        public List<float> RespiratoryRateTime { get; set; }
        public List<float> RespiratoryRateProcessedDataTime { get; set; }
        public List<float>  RespiratoryRateAmplitude { get; set; }  
        public List<float>  RespiratoryRateAmplitudeVariance { get; set; }
        public List<float>  RespiratoryRateFrequency { get; set; }
        public List<float> RespiratoryRateFrequencyVariance { get; set; }

        [Display(Name = "Time stamp")]
        public DateTime TimeStamp { get; set; }
        public Patient Patient { get; set; }
    }
}
