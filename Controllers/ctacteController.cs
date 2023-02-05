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
}