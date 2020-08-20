using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class Patient
    {
        public int? PatientId { get; set; }
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        [Display(Name = "Date of birth")]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        [JsonIgnore]
        public List<Measurement> Measurements { get; set; }
        public AccessKey AccessKey { get; set; }

    }
}
