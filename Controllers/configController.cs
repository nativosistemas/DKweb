using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;

namespace DKweb.Controllers;

public class configController : Controller
{
    private readonly ILogger<configController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public configController(ILogger<configController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    public IActionResult Index()
    {
        return View();
    }
    public bool IsBanderaUsarDll()
    {
        bool resultado = DKbase.web.capaDatos.capaCAR_WebService_base.IsBanderaCodigo(DKbase.generales.Constantes.cBAN_SERVIDORDLL);
        return resultado;
    }
    public bool IsBanderaUsarDllSucursal(string pSucursal)
    {
        bool resultado = DKbase.web.capaDatos.capaCAR_WebService_base.IsBanderaCodigo(pSucursal);
        return resultado;
    }
    public int IsHacerPedidos(string pSucursal)
    {
        int resultado = 0;
        if (!IsBanderaUsarDllSucursal(pSucursal))
        {
            resultado = 1;
        }
        else
        {
            DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
            if (oCliente != null)
            {
               /* DKbase.web.capaDatos.cClientes objCliente = DKbase.Util.RecuperarClientePorId(oCliente.cli_codigo);
                if (objCliente != null)
                {
                    oCliente.cli_estado = objCliente.cli_estado;
                    _httpContextAccessor.HttpContext.Session.Set<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente", oCliente);
                }*/
                if (oCliente.cli_estado.ToUpper() == DKbase.generales.Constantes.cESTADO_INH)
                {
                    resultado = 2;
                }
            }
        }
        return resultado;
    }
    public ActionResult inhabilitado()
    {
        return View();
    }
    public ActionResult Error()
    {
        return View();
    }
    public ActionResult sinpermiso()
    {
        return View();
    }
    public ActionResult sinusodll()
    {
        return View();
    }
}
