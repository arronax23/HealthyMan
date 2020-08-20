using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyMan.Data;
using HealthyMan.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthyMan.Areas.Patient.Controllers
{
    [Area("Patient")]
    //[Authorize(Roles = "Patient")]
    public class ConnectController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public ConnectController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IActionResult AccessKeyForm()
        {
            AccessKey accessKey = new AccessKey();
            return View(accessKey);
        }
       
        [HttpPost]
        public async Task<IActionResult> AccessKeyForm(AccessKey accessKey)
        {
            AccessKey accessKeyInDb = _context.AccessKeys.Include(aK => aK.Patient).SingleOrDefault(aK => aK.Key == accessKey.Key);
            if(accessKeyInDb == null)
            {
                return View();
            }

            ApplicationUser user  = await _userManager.GetUserAsync(User);
            user.Patient = accessKeyInDb.Patient;
            _context.Update(user);
            await _userManager.AddToRoleAsync(user, "Patient");
            await _context.SaveChangesAsync();
            await _signInManager.RefreshSignInAsync(user);

            return RedirectToAction("Index", "Home", new { area = ""});
        }
        
    }
}