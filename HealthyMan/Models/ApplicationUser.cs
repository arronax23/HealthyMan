using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMan.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int? PatientId { get; set; }

        public virtual Patient Patient { get; set; }

    }
}
