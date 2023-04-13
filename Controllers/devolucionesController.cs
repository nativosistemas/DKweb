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
    public async Task<string> RecuperarItemsDevolucionFacturaCompletaPrecargaPorCliente()
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.RecuperarItemsDevolucionPrecargaFacturaCompletaPorCliente(oCliente.cli_codigo);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }
    public async Task<string> RecuperarItemsDevolucionPrecargaPorCliente()
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.RecuperarItemsDevolucionPrecargaPorCliente(oCliente.cli_codigo);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }
    public async Task<string> RecuperarItemsDevolucionVencidosPrecargaPorCliente()
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.RecuperarItemsDevolucionPrecargaVencidosPorCliente(oCliente.cli_codigo);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }

    public async Task<string> RecuperarItemsReclamoFacturadoNoEnviado()
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.RecuperarItemsReclamoFacturadoNoEnviado(oCliente.cli_codigo);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }
    public async Task<string> ObtenerReclamosFacturadoNoEnviadoPorCliente()
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.ObtenerReclamosFacturadoNoEnviadoPorCliente(oCliente);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }
    public async Task<bool> contralarSesion()
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente == null)
        {
            return false;
        }
        return true;
    }
    public async Task<int> enviarConsultaReclamos(string pMail, string pComentario, string pNombreProducto)
    {
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        return DKbase.Util.enviarConsultaReclamos(oUsuario, pMail, pComentario, pNombreProducto);
    }
    public async Task<int> enviarConsultaValePsicotropico(string pMail, string pComentario, string pNombreProducto)
    {
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        return DKbase.Util.enviarConsultaValePsicotropico(oUsuario, pMail, pComentario, pNombreProducto);
    }
    public async Task<double?> ObtenerUnidadesEnSolicitudesNCFactNoEnvNoAnuladasDeFacturayObjetoComercial(string NumeroFactura, string NombreProducto)
    {
        double? resultado = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultado = DKbase.Util.ObtenerCantidadSolicitadaDevolucionPorProductoFacturaYCliente(NombreProducto, NumeroFactura, oCliente.cli_login);
        }

        return resultado;
    }
    public async Task<IActionResult> NuevaDevolucionVencidos()
    {
        /*  if (Session["clientesDefault_Cliente"] == null)
          {
              Response.Redirect("~/home/index.aspx");
          }*/
        return View();
    }
    public async Task<IActionResult> DevolucionesFacturadoNoEnviado()
    {
        /*if (Session["clientesDefault_Cliente"] == null)
        {
            Response.Redirect("~/home/index.aspx");
        }*/
        return View();
    }
    public async Task<IActionResult> ReclamoFacturadoNoEnviado()
    {
        /*if (Session["clientesDefault_Cliente"] == null)
        {
            Response.Redirect("~/home/index.aspx");
        }*/
        return View();
    }
}