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
    public async Task<string> RecuperarDevolucionesPorClientePorNumero(string NumeroDevolucion)
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.RecuperarDevolucionesPorClientePorNumero(NumeroDevolucion, oCliente.cli_login);
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
    public async Task<double?> ObtenerCantidadSolicitadaDevolucionPorProductoFacturaYCliente(string NombreProducto, string NumeroFactura)
    {
        double? resultado = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultado = DKbase.Util.ObtenerCantidadSolicitadaDevolucionPorProductoFacturaYCliente(NombreProducto, NumeroFactura, oCliente.cli_login);
        }

        return resultado;
    }
    public async Task<bool> EsFacturaConDevolucionesEnProceso(string pNroFactura)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            return DKbase.Util.EsFacturaConDevolucionesEnProceso(pNroFactura, oCliente.cli_login);
        }

        return false;
    }
    public async Task<string> ObtenerFacturasPorUltimosNumeros(string Cbte)
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.ObtenerFacturasPorUltimosNumeros(Cbte, oCliente.cli_login);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }
    public async Task<string> AgregarReclamoFacturadoNoEnviadoCliente(List<DKbase.dll.cDevolucionItemPrecarga_java> Item)
    {
        string resultado = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultado = DKbase.Util.AgregarReclamoFacturadoNoEnviadoCliente(Item, oCliente.cli_login);
        }
        return resultado;
    }
    public async Task<string> AgregarSolicitudDevolucionCliente(List<DKbase.dll.cDevolucionItemPrecarga_java> Item)
    {
        string resultado = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultado = DKbase.Util.AgregarSolicitudDevolucionCliente(Item, oCliente.cli_login);
        }
        return resultado;
    }
    public async Task<bool> EliminarDevolucionItemPrecarga(int NumeroItem)
    {
        bool resultadoObj = false;
        resultadoObj = DKbase.Util.EliminarDevolucionItemPrecarga(NumeroItem);
        return resultadoObj;
    }

    public async Task<bool> ElimminarItemReclamoFNEPrecarga(int NumeroItem)
    {
        bool resultadoObj = false;
        resultadoObj = DKbase.Util.ElimminarItemReclamoFNEPrecarga(NumeroItem);
        return resultadoObj;
    }
    public async Task<bool> EliminarPrecargaDevolucionPorCliente(int NumeroCliente)
    {
        bool resultadoObj = false;
        resultadoObj = DKbase.Util.EliminarPrecargaDevolucionPorCliente(NumeroCliente);
        return resultadoObj;
    }

    public async Task<bool> EliminarPrecargaDevolucionVencidosPorCliente(int NumeroCliente)
    {
        bool resultadoObj = false;
        resultadoObj = DKbase.Util.EliminarPrecargaDevolucionVencidosPorCliente(NumeroCliente);
        return resultadoObj;
    }

    public async Task<bool> EliminarPrecargaDevolucionFacturaCompletaPorCliente(int NumeroCliente)
    {
        bool resultadoObj = false;
        resultadoObj = DKbase.Util.EliminarPrecargaDevolucionFacturaCompletaPorCliente(NumeroCliente);
        return resultadoObj;
    }

    public async Task<bool> EliminarPrecargaReclamoFNEPorCliente(int NumeroCliente)
    {
        bool resultadoObj = false;
        resultadoObj = DKbase.Util.EliminarPrecargaReclamoFNEPorCliente(NumeroCliente);
        return resultadoObj;
    }
    public async Task<bool> AgregarDevolucionItemPrecarga(DKbase.dll.cDevolucionItemPrecarga_java Item)
    {
        bool resultadoObj = false;
        resultadoObj = DKbase.Util.AgregarDevolucionItemPrecarga(Item);
        return resultadoObj;
    }

    public async Task<bool> AgregarReclamoFacturadoNoEnviadoItemPrecarga(DKbase.dll.cDevolucionItemPrecarga_java Item)
    {
        bool resultadoObj = false;
        resultadoObj = DKbase.Util.AgregarReclamoFacturadoNoEnviadoItemPrecarga(Item);
        return resultadoObj;
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
    public async Task<IActionResult> NuevaDevolucionFacturaCompleta()
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
    public async Task<IActionResult> NotaDevolucion(string nrodev, string imprimir)
    {

        if (nrodev != null)
        {
            DKweb.Codigo.Util.Cliente_NumeroDevolucion_Set(_httpContextAccessor, nrodev);
        }
        if (imprimir != null)
        {
            DKweb.Codigo.Util.Cliente_CartelImprimir_Set(_httpContextAccessor, "1");
        }
        else
        {
            DKweb.Codigo.Util.Cliente_CartelImprimir_Set(_httpContextAccessor, "0");
        }
        return View();
    }
    public async Task<string> ObtenerFacturaCliente(string pNroFactura)
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.ObtenerFactura(pNroFactura, oCliente.cli_login);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }
    public async Task<string> ObtenerNumerosLoteDeProductoDeFacturaProveedorLogLotesConCadena(string pNombreProducto, string pNumeroLote)
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.ObtenerNumerosLoteDeProductoDeFacturaProveedorLogLotesConCadena(pNombreProducto, pNumeroLote, oCliente.cli_login);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }
    public async Task<string> ObtenerReclamosFacturadoNoEnviadoPorClientePorNumero(string NumeroDevolucion)
    {
        object resultadoObj = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultadoObj = DKbase.Util.ObtenerReclamosFacturadoNoEnviadoPorClientePorNumero(NumeroDevolucion, oCliente.cli_login);
        }
        if (resultadoObj != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoObj);
        else
            return null;
    }
}