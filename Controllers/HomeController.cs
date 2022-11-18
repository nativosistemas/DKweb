using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;

namespace DKweb.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        //var result =  DKbase.web.acceso.RecuperarIdClientesConCarritos(5508);//result.First().cli_nombre;//
        DKbase.Helper.getTipoApp =  "WEB";
         //var result_1 =  DKbase.web.capaDatos.capaCAR_intranet_base.RecuperarCarritosPorSucursalYProductos_generica_intranet(5678, 5508,DKbase.generales.Constantes.cTipo_Carrito);
 
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
