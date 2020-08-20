using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class AccessKey
    {
        public int? AccessKeyId { get; set; }
        [Display(Name = "Access key")]
        public string Key { get; set; }
        public DateTime DateCreated { get; set; }
        public int? PatientId { get; set; }
        public Patient Patient { get; set; }

    }
}
