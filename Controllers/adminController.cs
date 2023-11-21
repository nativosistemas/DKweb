using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;
using Microsoft.AspNetCore.Authorization;

namespace DKweb.Controllers;
[Authorize(Policy = "RequiereAdmin")]
public class adminController : Controller
{
    public async Task<string> Index()
    {
        return "HolaMundo";
    }
}