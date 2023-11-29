using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;
using Microsoft.AspNetCore.Authorization;

namespace DKweb.Controllers;
//[Authorize(Policy = "RequiereAdmin")]
public class adminController : Controller
{

    public async Task<IActionResult> index()
    {
        return View();
    }
    public async Task<IActionResult> usuarios()
    {

       // _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "Buscador");
        return View();
    }
}