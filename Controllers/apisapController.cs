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
}
