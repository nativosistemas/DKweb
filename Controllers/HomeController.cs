using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace DKweb.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public HomeController(ILogger<HomeController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    [HttpGet]
    public async Task<IActionResult> Index()
    {
         // var os = Environment.OSVersion;
 //DKbase.generales.Log.LogErrorFile("os.Platform",os.Platform.ToString() );
        DKweb.Codigo.Util.first_htmlPublicarRevista(_httpContextAccessor);
        return View();
    }
    [HttpGet]
    public async Task<IActionResult> empresa()
    {
        // DKweb.Codigo.Util.first_htmlPublicarRevista(_httpContextAccessor);
        return View();
    }
    [HttpPost]
    public async Task<IActionResult> Index(DKbase.Models.AuthenticateRequest pAuthenticateRequest)
    {
        pAuthenticateRequest.login = Request.Form["txtUsuario"];
        pAuthenticateRequest.pass = Request.Form["txtPassword"];
        if (pAuthenticateRequest != null && !string.IsNullOrEmpty(pAuthenticateRequest.login) && !string.IsNullOrEmpty(pAuthenticateRequest.pass))
        {
            var result_login = DKweb.Codigo.Util.login(_httpContextAccessor, pAuthenticateRequest.login, pAuthenticateRequest.pass);// "romanello ", "alberdi"

            if (!string.IsNullOrEmpty(result_login) && (result_login == "Ok" || result_login == "OkPromotor"))
            {
                DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
                if (oUsuario != null)
                {
                    var claims = new List<Claim>{
                    new Claim(ClaimTypes.Name, oUsuario.NombreYApellido),
                    new Claim("dk_login"  as string, oUsuario.usu_login),
                    new Claim(ClaimTypes.Role, oUsuario.idRol.ToString())};
                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                    return RedirectToAction("Buscador", "mvc");
                }
            }
        }
        return View();
    }
    [HttpPost]
    public async Task<string> login(DKbase.Models.AuthenticateRequest pAuthenticateRequest)
    {
        //pAuthenticateRequest.login = Request.Form["txtUsuario"];
        //pAuthenticateRequest.pass = Request.Form["txtPassword"];
        if (pAuthenticateRequest != null && !string.IsNullOrEmpty(pAuthenticateRequest.login) && !string.IsNullOrEmpty(pAuthenticateRequest.pass))
        {
            var result_login = DKweb.Codigo.Util.login(_httpContextAccessor, pAuthenticateRequest.login, pAuthenticateRequest.pass);// "romanello ", "alberdi"

            if (!string.IsNullOrEmpty(result_login) && (result_login == "Ok" || result_login == "OkPromotor"))
            {
                DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
                if (oUsuario != null)
                {
                    var claims = new List<Claim>{
                    new Claim(ClaimTypes.Name, oUsuario.NombreYApellido),
                    new Claim("dk_login"  as string, oUsuario.usu_login),
                    new Claim(ClaimTypes.Role, oUsuario.idRol.ToString())};
                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                    return result_login;
                }
            }
        }
        return "!Ok";
    }
    [HttpPost]
    public async Task<string> loginCarrito(string pName, string pPass, int pIdOferta)
    {
        string resultado = null;
        resultado = await login(new DKbase.Models.AuthenticateRequest() { login = pName, pass = pPass });
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (resultado == "Ok" && oCliente != null)
        {
            // DKbase.Util.InsertarOfertaRating(pIdOferta, oCliente.cli_codigo, true);
            DKbase.web.capaDatos.cOferta o = DKbase.Util.RecuperarOfertaPorId(pIdOferta);
            if (o != null)
            {
                DKweb.Codigo.Util.set_home_Tipo(_httpContextAccessor, o.ofe_tipo);
                if (o.tfr_codigo != null)
                {
                    DKweb.Codigo.Util.set_home_IdTransfer(_httpContextAccessor, o.tfr_codigo.Value);
                }
            }
            DKweb.Codigo.Util.set_home_IdOferta(_httpContextAccessor, pIdOferta);
        }
        return resultado;
    }
    [HttpPost]
    public async Task<IActionResult> SignOff()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Content("Ok");//RedirectToAction("Index", "Home");
    }
    public static string RecuperarTodasOfertas(List<DKbase.web.capaDatos.cOfertaHome> pResultado, bool isNuevoLanzamiento = false)
    {
        List<DKbase.web.capaDatos.cOfertaHome> resultado = pResultado;
        if (isNuevoLanzamiento)
        {
            resultado = resultado.Where(x => x.ofh_orden > 4).ToList();

        }
        else
        {
            resultado = resultado.Where(x => x.ofh_orden <= 4).ToList();
        }
        return resultado == null ? string.Empty : DKbase.generales.Serializador_base.SerializarAJson(resultado);
    }
    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
