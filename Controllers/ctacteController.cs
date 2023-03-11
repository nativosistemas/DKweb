using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;
using Microsoft.AspNetCore.Authorization;

namespace DKweb.Controllers;
[Authorize]
public class ctacteController : Controller
{

    private readonly ILogger<ctacteController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public ctacteController(ILogger<ctacteController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    public async Task<IActionResult> Documento(string t, string id)
    {
        DKweb.Codigo.Util.clientes_pages_Documento_ID_Set(_httpContextAccessor, id);
        DKweb.Codigo.Util.clientes_pages_Documento_TIPO_Set(_httpContextAccessor, t.ToUpper());
        return View();
    }
    public async Task<IActionResult> composicionsaldo()
    {
        return View();
    }
    public async Task<IActionResult> composicionsaldoCtaCte(string menu)
    {
        DKweb.Codigo.Util.composicionsaldoCtaCte_menu_Set(_httpContextAccessor, menu);
        return View();
    }
    public async Task<IActionResult> composicionsaldoCtaResumen()
    {
        return View();
    }
    public async Task<IActionResult> composicionsaldochequecuenta()
    {
        return View();
    }
    public async Task<List<string>> ObtenerRangoFecha(int pDia, int pPendiente, int pCancelado)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente == null)
            return null;
        List<string> lista = new List<string>();
        DateTime fechaActual = DateTime.Now;
        DateTime fechaDesde = fechaActual.AddDays(pDia * -1);
        DateTime fechaHasta = fechaActual;
        lista.Add(fechaDesde.Day.ToString());
        lista.Add((fechaDesde.Month).ToString());
        lista.Add((fechaDesde.Year).ToString());

        lista.Add(fechaHasta.Day.ToString());
        lista.Add((fechaHasta.Month).ToString());
        lista.Add((fechaHasta.Year).ToString());
        DKweb.Codigo.Util.CompocisionSaldo_ResultadoMovimientosDeCuentaCorriente_Set(_httpContextAccessor, DKbase.Util.AgregarVariableSessionComposicionSaldo(fechaDesde, fechaHasta, pPendiente, pCancelado, oCliente.cli_login));
        return lista;
    }
    public async Task<IActionResult> deudaVencida()
    {
        return View();
    }
    public async Task<string> ObtenerCreditoDisponible(string pCli_login)
    {
        DKbase.web.ResultCreditoDisponible o = DKbase.Util.ObtenerCreditoDisponible(pCli_login);
        return DKbase.generales.Serializador_base.SerializarAJson(o);
    }
    public async Task<IActionResult> FichaDebeHaberSaldo()
    {
        return View();
    }
    public async Task<string> ObtenerMovimientosDeFicha(int pSemana)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente == null)
            return null;
        //Session["FichaDebeHaberSaldo_NroSemana"] = pSemana;
        DateTime FechaDesde = DateTime.Now.AddDays(-(pSemana * 7));
        DateTime FechaHasta = DateTime.Now.AddDays(1);
        List<DKbase.dll.cFichaCtaCte> listaFicha = DKbase.Util.ObtenerMovimientosDeFichaCtaCte(oCliente.cli_login, FechaDesde, FechaHasta);
        if (listaFicha != null)
            return DKbase.generales.Serializador_base.SerializarAJson(listaFicha);
        return null;
    }
    public async Task<IActionResult> ConsultaDeComprobantes()
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            List<string> lista = new List<string>();
            lista = DKbase.Util.ObtenerTiposDeComprobantesAMostrar(oCliente.cli_login);
            DKweb.Codigo.Util.ConsultaDeComprobantes_tipoComprobante_Set(_httpContextAccessor, lista);//Session["ConsultaDeComprobantes_tipoComprobante"] = lista;            
        }
        return View();
    }
    public async Task<IActionResult> ConsultaDeComprobantesObraSocial()
    {
        return View();
    }
    public async Task<IActionResult> descargaResumenes()
    {
        return View();
    }
    public async Task<IActionResult> descargaResumenesDetalle(string id)
    {
        if (id != null)
        {
            DKweb.Codigo.Util.clientes_pages_descargaResumenes_NumeroResumen_Set(_httpContextAccessor, id);
        }
        string clientes_pages_descargaResumenes_NumeroResumen = DKweb.Codigo.Util.clientes_pages_descargaResumenes_NumeroResumen(_httpContextAccessor);
        if (clientes_pages_descargaResumenes_NumeroResumen != null)
        {
            List<DKbase.dll.cCbteParaImprimir> obj = DKbase.Util.ObtenerComprobantesAImprimirEnBaseAResumen(clientes_pages_descargaResumenes_NumeroResumen);
            DKweb.Codigo.Util.clientes_pages_descargaResumenes_listaComprobantesAImprimir_Set(_httpContextAccessor, obj);
        }
        return View();
    }
    public async Task<IActionResult> ConsultaDeComprobantesObraSocialResultado()
    {
        return View();
    }
    public async Task<string> ObtenerComprobantesObrasSocialesDePuntoDeVentaEntreFechas(string pLoginWeb, string pPlan, int diaDesde, int mesDesde, int añoDesde, int diaHasta, int mesHasta, int añoHasta)
    {
        DateTime fechaDesde = new DateTime(añoDesde, mesDesde, diaDesde);
        DateTime fechaHasta = new DateTime(añoHasta, mesHasta, diaHasta);
        List<DKbase.dll.cConsObraSocial> l = DKbase.Util.ObtenerComprobantesObrasSocialesDePuntoDeVentaEntreFechas(pLoginWeb, pPlan, fechaDesde, fechaHasta);
        DKweb.Codigo.Util.ObrasSociales_EntreFechas_Set(_httpContextAccessor, l);
        return "Ok";
    }
    public async Task<IActionResult> ConsultaDeComprobantesObraSocialResultadoRango()
    {
        return View();
    }
    public async Task<string> IsExistenciaComprobanteResumenes(string pNombreArchivo, int pIndex, int pContadorAUX)
    {
        DKbase.web.cPdfComprobante resultado = new DKbase.web.cPdfComprobante();
        string nombreArchivo = pNombreArchivo + ".pdf";
        resultado.isOk = System.IO.File.Exists(System.IO.Path.Combine(DKbase.Helper.getArchivo_ImpresionesComprobante, nombreArchivo));
        List<DKbase.dll.cCbteParaImprimir> obj = DKweb.Codigo.Util.clientes_pages_descargaResumenes_listaComprobantesAImprimir(_httpContextAccessor);
        if (!resultado.isOk && obj != null && pContadorAUX == 0)
        {
            DKbase.Util.ImprimirComprobante(obj[pIndex].TipoComprobante, obj[pIndex].NumeroComprobante);
        }
        resultado.nombreArchivo = pNombreArchivo;
        resultado.index = pIndex;
        if (resultado != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultado);
        return null;
    }
    public async Task<string> IsExistenciaComprobanteResumenes_todos(string pNombreArchivo, int pContadorAUX)
    {
        DKbase.web.cPdfComprobante resultado = new DKbase.web.cPdfComprobante();
        string nombreArchivo = pNombreArchivo + ".pdf";
        resultado.isOk = System.IO.File.Exists(System.IO.Path.Combine(DKbase.Helper.getArchivo_ImpresionesComprobante, nombreArchivo));
        string NumeroComprobante = DKweb.Codigo.Util.clientes_pages_descargaResumenes_NumeroResumen(_httpContextAccessor); ;
        if (!resultado.isOk && NumeroComprobante != null && pContadorAUX == 0)
        {
            DKbase.Util.ImprimirComprobante("RCO", NumeroComprobante);
        }
        resultado.nombreArchivo = pNombreArchivo;
        if (resultado != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultado);
        return null;
    }
    public async Task<bool> IsExistenciaComprobante(string pNombreArchivo)
    {
        bool resultado = false;
        string nombreArchivo = pNombreArchivo + ".pdf";
        resultado = System.IO.File.Exists(System.IO.Path.Combine(DKbase.Helper.getArchivo_ImpresionesComprobante, nombreArchivo));
        return resultado;
    }
    public async Task ObtenerComprobantesDiscriminadosDePuntoDeVentaEntreFechas(int diaDesde, int mesDesde, int añoDesde, int diaHasta, int mesHasta, int añoHasta)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            DateTime fechaDesde = new DateTime(añoDesde, mesDesde, diaDesde);//, 0, 0, 0
            DateTime fechaHasta = new DateTime(añoHasta, mesHasta, diaHasta);//, 23, 59, 59
            List<DKbase.dll.cComprobantesDiscriminadosDePuntoDeVenta> resultadoObj = DKbase.Util.ObtenerComprobantesDiscriminadosDePuntoDeVentaEntreFechas(oCliente.cli_login, fechaDesde, fechaHasta);
            if (resultadoObj != null)
            {
                DKweb.Codigo.Util.comprobantescompleto_Lista_Set(_httpContextAccessor, resultadoObj);
            }
            DKweb.Codigo.Util.comprobantescompleto_FechaDesde_Set(_httpContextAccessor, fechaDesde);
            DKweb.Codigo.Util.comprobantescompleto_FechaHasta_Set(_httpContextAccessor, fechaHasta);
        }
        else
        {
            DKweb.Codigo.Util.comprobantescompleto_Lista_Set(_httpContextAccessor, null);
        }
    }
    public async Task<IActionResult> comprobantescompleto()
    {
        return View();
    }
    public async Task<double?> ObtenerSaldoFinalADiciembrePorCliente(string pCli_login)
    {
        return DKbase.Util.ObtenerSaldoFinalADiciembrePorCliente(pCli_login);
    }
    public async Task<int> enviarSolicitudSobresRemesa()
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        return DKbase.Util.enviarSolicitudSobresRemesa(oCliente);
    }
}