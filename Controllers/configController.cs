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
    //[Authorize]
    public IActionResult Index()
    {
        return View();
    }
    public ActionResult loginbot()
    {
        return View();
    }
    public ActionResult action(int id)
    {
        DKweb.Codigo.Util.action_id_Set(_httpContextAccessor, id);
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente == null)
        {
            return RedirectToAction("loginbot");//?id=" + id
        }
        else
        {
            switch (id)
            {
                case 1:
                    return RedirectToAction("descargaResumenes", "ctacte");//Descargas de Resumen	https://www.kellerhoff.com.ar/ctacte/descargaResumenes
                case 2:
                    return RedirectToAction("mediosdepago1", "config");//Formas De Pago	https://www.kellerhoff.com.ar/config/mediosdepago1
                case 3:
                    return RedirectToAction("ConsultaDeComprobantes", "ctacte");//Consulta de Comprobantes	https://www.kellerhoff.com.ar/ctacte/ConsultaDeComprobantes
                case 4:
                    return RedirectToAction("ConsultaDeComprobantesObraSocial", "ctacte");//Consulta NC Obras Sociales	https://www.kellerhoff.com.ar/ctacte/ConsultaDeComprobantesObraSocial
                case 5:
                    return RedirectToAction("composicionsaldo", "ctacte");//Envíos Remesas de Pago
                case 6:
                    return RedirectToAction("NuevaDevolucion", "devoluciones");// Devolución por Reclamo https://www.kellerhoff.com.ar/devoluciones/NuevaDevolucion
                case 7:
                    return RedirectToAction("DevolucionesFacturadoNoEnviado", "devoluciones");//Facturado No Enviado	https://www.kellerhoff.com.ar/devoluciones/DevolucionesFacturadoNoEnviado
                default:
                    break;
            }
        }
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
