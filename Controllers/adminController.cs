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
[Authorize(Policy = "RequiereAdmin")]
public class adminController : Controller
{
    private readonly ILogger<configController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public adminController(ILogger<configController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    [AllowAnonymous]
    public async Task<IActionResult> index()
    {
        string msg = DKweb.Codigo.Util.admin_msg(_httpContextAccessor);
        if (!string.IsNullOrEmpty(msg))
        {
            ViewData["admin_msg"] = msg;
            DKweb.Codigo.Util.admin_msg_Set(_httpContextAccessor, string.Empty);
        }
        return View();
    }
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> login()//LoginViewModel model
    {
        string result = null;
        // Acceder a los valores del formulario utilizando Request.Form
        string usuario = Request.Form["admin_usuario"];
        string contrasena = Request.Form["admin_contrasena"];
        string token = Request.Form["admin_token"];

        // Por ahora, simplemente redirigimos a la misma página.
        DKbase.Models.AuthenticateRequest oAuthenticateRequest = new DKbase.Models.AuthenticateRequest();
        oAuthenticateRequest.login = usuario;
        oAuthenticateRequest.pass = contrasena;
        oAuthenticateRequest.token = token;
        if (DKbase.web.generales.ReCaptchaClass.Validate(oAuthenticateRequest.token))
        {
            result = await Codigo.Util.login_general_reutilizar(_httpContextAccessor, oAuthenticateRequest);
        }
        else
        {
            result = "reCAPTCHA Invalido";
        }
        DKweb.Codigo.Util.admin_msg_Set(_httpContextAccessor, result);
        if (result == "Ok_ADMINISTRADOR")
        {
            return RedirectToAction("usuarios", "admin");

        }
        else
        {
            return RedirectToAction("index", "admin");// Content(result);, new { msg = result }View();
        }
    }
    public async Task<IActionResult> usuarios()
    {

        // _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "Buscador");
        return View();
    }
    public static int grillaPagUsuario = 0;
    public async Task<IActionResult> GetUsuarios(string sortExpression, string pFiltro, int pAvanzar)
    {
        var result = DKbase.web.AccesoGrilla_base.GetUsuarios(sortExpression, pFiltro);
        if (pAvanzar == 0)
        {
            grillaPagUsuario = 0;
        }
        else //  if (pAvanzar > 0) else if (pAvanzar < 0)
        {
            grillaPagUsuario += pAvanzar;

        }
        if (grillaPagUsuario < 0)
        {
            grillaPagUsuario = 0;
        }
        int cantidadMaxPaginador = result.Count / DKbase.generales.Constantes.cCantidadFilaPorPagina;
        if (cantidadMaxPaginador < 1)
        {
            cantidadMaxPaginador = 1;
        }
        if (grillaPagUsuario > cantidadMaxPaginador)
        {
            grillaPagUsuario = cantidadMaxPaginador;
        }
        int desde = grillaPagUsuario * DKbase.generales.Constantes.cCantidadFilaPorPagina;
        int hasta = DKbase.generales.Constantes.cCantidadFilaPorPagina;
        if ((desde + hasta) > result.Count)
        {
            hasta = result.Count - desde;
            grillaPagUsuario--;
        }
        List<cUsuario> resultFiltro = result.GetRange(desde, hasta);

        return Json(resultFiltro);
    }
}