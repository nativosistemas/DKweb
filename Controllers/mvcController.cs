using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using DKweb.Models;
using DKweb.Codigo;

namespace DKweb.Controllers;

public class mvcController : Controller
{
    private readonly ILogger<mvcController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public mvcController(ILogger<mvcController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    private string msgCarritoRepetido = "Carrito ya se encuentra facturado.";
    private string msgCarritoEnProceso = "Carrito se está procesando.";
    public static String isPrueba(IHttpContextAccessor pHttpContextAccessor)
    {
        String result = pHttpContextAccessor.HttpContext?.Session.GetString("SessionVar");
        if (result != null)
        {
            return result;
        }
        return "";
    }
    public static bool isDiferido(IHttpContextAccessor pHttpContextAccessor)
    {
        String url_type = pHttpContextAccessor.HttpContext?.Session.GetString("url_type");
        if (url_type != null && (url_type == "Diferido" || url_type == "carritoDiferido"))
        { return true; }
        return false;
    }
    public static bool isBuscador(IHttpContextAccessor pHttpContextAccessor)
    {
        String url_type = pHttpContextAccessor.HttpContext?.Session.GetString("url_type");
        if (url_type != null && (url_type == "Buscador" || url_type == "carrito"))
        { return true; }
        return false;
    }
    public static bool isSubirPedido(IHttpContextAccessor pHttpContextAccessor)
    {
        String url_type = pHttpContextAccessor.HttpContext?.Session.GetString("url_type");
        if (url_type != null && (url_type == "subirpedido" || url_type == "subirarchivoresultado" || url_type == "subirarchivoresultado_msg"))
        { return true; }
        return false;
    }
    public static bool isCarritoExclusivo(IHttpContextAccessor pHttpContextAccessor)
    {
        String url_type = pHttpContextAccessor.HttpContext?.Session.GetString("url_type");
        if (url_type != null && (url_type == "carrito" || url_type == "carritoDiferido"))
        { return true; }
        return false;
    }

    public static bool isClienteTomaOferta(IHttpContextAccessor pHttpContextAccessor)
    {
        if (pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente") != null &&
            ((DKbase.web.capaDatos.cClientes)pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente")).cli_tomaOfertas)
            return true;
        return false;
    }

    public static bool isClienteTomaTransfer(IHttpContextAccessor pHttpContextAccessor)
    {
        if (pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente") != null &&
            ((DKbase.web.capaDatos.cClientes)pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente")).cli_tomaTransfers)
            return true;
        return false;
    }
    public static bool isUsuarioConPermisoPedido(IHttpContextAccessor pHttpContextAccessor)
    {
        if (((DKbase.web.Usuario)pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.Usuario>("clientesDefault_Usuario")).idRol != DKbase.generales.Constantes.cROL_PROMOTOR &&
    ((DKbase.web.Usuario)pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.Usuario>("clientesDefault_Usuario")).idRol != DKbase.generales.Constantes.cROL_ENCSUCURSAL &&
    ((DKbase.web.Usuario)pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.Usuario>("clientesDefault_Usuario")).idRol != DKbase.generales.Constantes.cROL_GRUPOCLIENTE)
        {
            return true;
        }
        return false;
    }

    public IActionResult Index()
    {
        var fff = DKweb.Codigo.Util.login(_httpContextAccessor, "labesme", "esme");
        var dd = _httpContextAccessor?.HttpContext?.Session.GetString("SessionVar");
        if (dd == null)
        {
            _httpContextAccessor?.HttpContext?.Session.SetString("SessionVar", "0");
        }
        else
        {
            var nro = Convert.ToInt32(dd) + 1;
            _httpContextAccessor?.HttpContext?.Session.SetString("SessionVar", nro.ToString());
        }
        return View();
    }
    //[Authorize]
    public ActionResult Buscador()
    {

        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "Buscador");
        return View();
    }
    public ActionResult Diferido()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "Diferido");
        return View();
    }
    public ActionResult carrito()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "carrito");
        return View();
    }
    public ActionResult carritoDiferido()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "carritoDiferido");
        return View();
    }
    public ActionResult promocionescliente(string t)
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("promocionescliente_TIPO", t);
        return View();
    }
   /* public string RecuperarProductosVariasColumnas(string pTxtBuscador, string[] pListaColumna, bool pIsBuscarConOferta, bool pIsBuscarConTransfer)
    {
        DKbase.web.cjSonBuscadorProductos resultado = FuncionesPersonalizadas.RecuperarProductosBase_V3(null, pTxtBuscador, pListaColumna.ToList(), pIsBuscarConOferta, pIsBuscarConTransfer);
        if (resultado != null)
        {
            System.Web.HttpContext.Current.Session["PedidosBuscador_productosTodos"] = new cjSonBuscadorProductos(resultado);
            int pPage = 1;
            System.Web.HttpContext.Current.Session["PedidosBuscador_pPage"] = pPage;
            return RecuperarProductos_generarPaginador(resultado, pPage);
        }
        else { return string.Empty; }
    }
    public static string RecuperarProductos_generarPaginador(cjSonBuscadorProductos resultado, int pPage)
    {
        int pageSize = DKbase.generales.Constantes.cCantidadFilaPorPagina;
        resultado.CantidadRegistroTotal = resultado.listaProductos.Count;
        if (!isSubirPedido(_httpContextAccessor) && resultado.listaProductos.Count > DKbase.generales.Constantes.cCantidadFilaPorPagina) //if (resultado.listaProductos.Count > Constantes.cCantidadFilaPorPagina)//
            resultado.listaProductos = resultado.listaProductos.Skip((pPage - 1) * pageSize).Take(pageSize).ToList();
        System.Web.HttpContext.Current.Session["PedidosBuscador_productosOrdenar"] = resultado;
        return Serializador.SerializarAJson(resultado);
    }*/
}
