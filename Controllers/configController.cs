using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;
using Microsoft.AspNetCore.Authorization;

namespace DKweb.Controllers;
[Authorize]
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
    public async Task<IActionResult> Index()
    {
        return View();
    }
    [AllowAnonymous]
    public async Task<IActionResult> loginbot()
    {
        return View();
    }
    [AllowAnonymous]
    public async Task<IActionResult> action(int id)
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
    [AllowAnonymous]
    public async Task<IActionResult> inhabilitado()
    {
        return View();
    }
    [AllowAnonymous]
    public async Task<IActionResult> Error()
    {
        return View();
    }
    [AllowAnonymous]
    public async Task<IActionResult> sinpermiso()
    {
        return View();
    }
    public async Task<IActionResult> sinusodll()
    {
        return View();
    }
    public async Task<IActionResult> mediosdepago1()
    {
        return View();
    }

    public async Task<IActionResult> mediosdepago2()
    {
        return View();
    }

    public async Task<IActionResult> mediosdepago3()
    {
        return View();
    }

    public async Task<IActionResult> mediosdepago4()
    {
        return View();
    }

    public async Task<IActionResult> mediosdepago5()
    {
        return View();
    }
    public async Task<IActionResult> catalogo()
    {
        return View();
    }

    public async Task<IActionResult> descarga()
    {
        return View();
    }
    public async Task<IActionResult> GenerateDocument(int id)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente == null)
            return null;
        try
        {
            var nameFile = DKbase.Util.GenerateDocument_getNameFile(id);
            byte[] bites = DKbase.Util.GenerateDocument(id, oCliente);
            String f = DKbase.Util.GenerateDocument_getPathFile(id);
            string contentType;
            new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider().TryGetContentType(f, out contentType);
            contentType = contentType ?? "application/octet-stream";
            string Content_Disposition = "attachment; filename=" + nameFile;
            Response.Headers.Add("Content-Disposition", Content_Disposition);
            return File(bites, contentType, nameFile);
        }
        catch (Exception ex)
        {
            DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
            return BadRequest();
        }
        //        return NotFound();
    }
    public async Task<IActionResult> mensajes()
    {
        return View();
    }
    public async Task<IActionResult> usuarios()
    {
        return View();
    }
    public async Task<int> GuardarUsuario(int pIdUsuario, string pNombre, string pApellido, string pMail, string pLogin, string pContraseña, string pObservaciones1, List<string> pListaPermisos)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente == null)
            return -1;
        if (pNombre == null)
        {
            pNombre = string.Empty;
        }
        if (pApellido == null)
        {
            pApellido = string.Empty;
        }
        if (pMail == null)
        {
            pMail = string.Empty;
        }
        if (pLogin == null)
        {
            pLogin = string.Empty;
        }
        if (pObservaciones1 == null)
        {
            pObservaciones1 = string.Empty;
        }
        return DKbase.Util.GuardarUsuario(oCliente, pIdUsuario, pNombre, pApellido, pMail, pLogin, pContraseña, pObservaciones1, pListaPermisos);
    }
    public async Task<int> CambiarEstadoUsuario(int pIdUsuario)
    {
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        if (oUsuario == null)
            return -1;
        return DKbase.Util.CambiarEstadoUsuario(oUsuario, pIdUsuario);
    }
    public async Task<int> EliminarUsuario(int pIdUsuario)
    {
        DKbase.Util.EliminarUsuario(pIdUsuario);
        return 0;
    }
    public async Task<int> CambiarContraseñaUsuario(int pIdUsuario, string pPass)
    {
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        if (oUsuario == null)
            return -1;
        return DKbase.Util.CambiarContraseñaUsuario(oUsuario, pIdUsuario, pPass);
    }
    public async Task<string> ObtenerUsuarios()
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente == null)
            return null;
        List<DKbase.web.cUsuario> lista = DKbase.web.AccesoGrilla_base.GetUsuariosDeCliente("usu_codigo", oCliente.cli_codigo, null);
        return DKbase.generales.Serializador_base.SerializarAJson(lista);
    }
    public async Task<IActionResult> perfil()
    {
        ViewBag.ContraseniaNueva = null;
        ViewBag.ContraseniaVieja = null;
        ViewBag.ContraseniaNuevaRepetir = null;
        string perfil_CambiarContraseña = DKweb.Codigo.Util.perfil_CambiarContraseña(_httpContextAccessor);
        string perfil_idContraseniaVieja = DKweb.Codigo.Util.perfil_idContraseniaVieja(_httpContextAccessor);
        string perfil_idContraseniaNueva = DKweb.Codigo.Util.perfil_idContraseniaNueva(_httpContextAccessor);
        if (perfil_CambiarContraseña != null &&
            Convert.ToInt32(perfil_CambiarContraseña) == 0 &&
            perfil_idContraseniaVieja != null &&
            perfil_idContraseniaNueva != null)
        {
            ViewBag.ContraseniaVieja = perfil_idContraseniaVieja;
            ViewBag.ContraseniaNueva = perfil_idContraseniaNueva;
            ViewBag.ContraseniaNuevaRepetir = perfil_idContraseniaNueva;
        }
        return View();
    }
    [HttpPost]
    public async Task<IActionResult> ActionCambiarContrasenia(string idContraseniaVieja, string idContraseniaNueva)
    {
        DKweb.Codigo.Util.perfil_idContraseniaVieja_Set(_httpContextAccessor, idContraseniaVieja);
        DKweb.Codigo.Util.perfil_idContraseniaNueva_Set(_httpContextAccessor, idContraseniaNueva);
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        DKweb.Codigo.Util.perfil_CambiarContraseña_Set(_httpContextAccessor, DKbase.Util.CambiarContraseñaPersonal(oCliente, oUsuario, idContraseniaVieja, idContraseniaNueva).ToString());
        return RedirectToAction("perfil");
    }
}
