using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;
using Microsoft.AspNetCore.Authorization;
using DKbase;
using Microsoft.AspNetCore.Components.RenderTree;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using DKbase.web;


namespace DKweb.Controllers;
//[Authorize(Policy = "RequiereAdmin")]
public class apisapController : Controller
{
    private readonly ILogger<configController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public apisapController(ILogger<configController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    public async Task<IActionResult> index()
    {
        return View();
    }
    [HttpPost]
    public async Task<IActionResult> ZFI_WS_CRED_DISP_SET(DKbase.Models.SAP_RES_CRED_DISP pValue)
    {
        int idCliente = Int32.Parse(pValue.CLIENTE);
        decimal? creditoDisp = await DKbase.capaSAP.CRED_DISP(idCliente);
        DKbase.Models.SAP_REQ_CRES_DISP result = new DKbase.Models.SAP_REQ_CRES_DISP() { CREDITO_DISP = creditoDisp.ToString() };
        return Json(result);
    }
[HttpPost]
    public async Task<IActionResult> ZFI_WS_RFC_CTA_CTE(DKbase.Models.SAP_RES_CTA_CTE pValue)
    {
        int idCliente = Int32.Parse(pValue.CLIENTE);
        string claseDoc = pValue.CLASE_DOC;
        string documento = pValue.DOCUMENTO;
        string ejercicio = pValue.EJERCICIO;
        string fechaDesde = pValue.FECHA_DESDE;
        string fechaHasta = pValue.FECHA_HASTA;
        
        // Llamar a la función CTA_CTE con los parámetros
        List<DKbase.Models.SAP_REQ_CTA_CTE> CTA_CTE_LISTA = await DKbase.capaSAP.CTA_CTE(
            idCliente, claseDoc, documento, ejercicio, fechaDesde, fechaHasta);
        
        // Crear el objeto de respuesta
        DKbase.Models.SAP_REQ_CTA_CTE_LIST result = new DKbase.Models.SAP_REQ_CTA_CTE_LIST()
        {
            item = CTA_CTE_LISTA
        };
        
        // Devolver la respuesta como JSON
        return Json(result);
    }

}
