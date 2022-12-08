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
      /*  var result = DKbase.web.acceso.ObtenerReservasVacunas();////result.First().cli_nombre;//
        if (result != null)
        {
            DKbase.Helper.getTipoApp = "WEB" + " - " + result.First().rdv_nombre + " - " + result.Last().rdv_nombre;
        }
        else
        {
            DKbase.Helper.getTipoApp = "WEB" + " - " + "Sin conexión sql";

        }*/
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
