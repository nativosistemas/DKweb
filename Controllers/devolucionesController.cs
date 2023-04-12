using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;
using Microsoft.AspNetCore.Authorization;

namespace DKweb.Controllers;
[Authorize]
public class devolucionesController : Controller
{
    private readonly ILogger<ctacteController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public devolucionesController(ILogger<ctacteController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    public async Task<IActionResult> Devoluciones()
    {
        /*   if (Session["clientesDefault_Cliente"] == null)
           {
               Response.Redirect("~/home/index.aspx");
           }*/
        return View();
    }
    public async Task<string> RecuperarDevolucionesPorCliente()
    {
        List<DKbase.dll.cDevolucionItemPrecarga> resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.RecuperarDevolucionesPorCliente(oCliente);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }
    public async Task<IActionResult> NuevaDevolucion()
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            List<string> lista = new List<string>();
            lista = DKbase.Util.ObtenerTiposDeComprobantesAMostrar(oCliente.cli_login);
            DKweb.Codigo.Util.ConsultaDeComprobantes_tipoComprobante_Set(_httpContextAccessor, lista);
        }
        else
        {
            Response.Redirect("~/home/index.aspx");
        }
        return View();
    }
}