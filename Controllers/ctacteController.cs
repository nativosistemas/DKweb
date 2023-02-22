using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;

namespace DKweb.Controllers;

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
}