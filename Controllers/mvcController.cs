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
    public string RecuperarProductosVariasColumnas(string pTxtBuscador, string[] pListaColumna, bool pIsBuscarConOferta, bool pIsBuscarConTransfer)
    {
        DKbase.web.cjSonBuscadorProductos resultado = DKweb.Codigo.Util.RecuperarProductosBase_V3(_httpContextAccessor, null, pTxtBuscador, pListaColumna.ToList(), pIsBuscarConOferta, pIsBuscarConTransfer);
        if (resultado != null)
        {
            _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos", new DKbase.web.cjSonBuscadorProductos(resultado));
            int pPage = 1;
            _httpContextAccessor?.HttpContext?.Session.SetInt32("PedidosBuscador_pPage", pPage);
            return DKweb.Codigo.Util.RecuperarProductos_generarPaginador(_httpContextAccessor, resultado, pPage);
        }
        else { return string.Empty; }
    }
    public ActionResult RecuperarProductos(string pTxtBuscador)
    {
        DKbase.web.cjSonBuscadorProductos resultado = DKweb.Codigo.Util.RecuperarProductosBase_V3(_httpContextAccessor, null, pTxtBuscador, null, false, false);
        if (resultado != null)
        {
            _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosOrdenar", resultado);
            return Content(DKbase.generales.Serializador_base.SerializarAJson(resultado));
        }
        else { return Content(string.Empty); }
    }
    public string RecuperarProductosPaginador(int pPage)
    {
        if (_httpContextAccessor?.HttpContext?.Session.Get<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos") != null &&
          _httpContextAccessor?.HttpContext?.Session.GetInt32("PedidosBuscador_pPage") != null)
        {
            _httpContextAccessor?.HttpContext?.Session.SetInt32("PedidosBuscador_pPage", pPage);
            DKbase.web.cjSonBuscadorProductos resultado = new DKbase.web.cjSonBuscadorProductos(_httpContextAccessor?.HttpContext?.Session.Get<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos"));
            return DKweb.Codigo.Util.RecuperarProductos_generarPaginador(_httpContextAccessor, resultado, pPage);
        }
        return string.Empty;
    }
    public string RecuperarProductosOrdenar(string pAscColumna, bool pAscOrdenar)
    {
        if (_httpContextAccessor?.HttpContext?.Session.Get<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos") != null &&
          _httpContextAccessor?.HttpContext?.Session.GetInt32("PedidosBuscador_pPage") != null)
        {
            DKbase.web.cjSonBuscadorProductos resultado = new DKbase.web.cjSonBuscadorProductos(_httpContextAccessor?.HttpContext?.Session.Get<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos"));

            if (pAscColumna == "PrecioFinal")
            {
                if (pAscOrdenar)
                {
                    resultado.listaProductos = resultado.listaProductos.OrderBy(x => x.PrecioFinal).ToList();
                }
                else
                {
                    resultado.listaProductos = resultado.listaProductos.OrderByDescending(x => x.PrecioFinal).ToList();
                }
            }
            else if (pAscColumna == "PrecioConDescuentoOferta")
            {
                if (pAscOrdenar)
                {
                    resultado.listaProductos = resultado.listaProductos.OrderBy(x => (x.pro_ofeporcentaje == 0 && x.pro_ofeunidades == 0) ? 0 : x.PrecioConDescuentoOferta).ToList();
                }
                else
                {
                    resultado.listaProductos = resultado.listaProductos.OrderByDescending(x => (x.pro_ofeporcentaje == 0 && x.pro_ofeunidades == 0) ? 0 : x.PrecioConDescuentoOferta).ToList();
                }
            }
            else if (pAscColumna == "pro_precio")
            {
                if (pAscOrdenar)
                {
                    resultado.listaProductos = resultado.listaProductos.OrderBy(x => x.pro_precio).ToList();
                }
                else
                {
                    resultado.listaProductos = resultado.listaProductos.OrderByDescending(x => x.pro_precio).ToList();
                }
            }
            else if (pAscColumna == "pro_nombre")
            {
                if (pAscOrdenar)
                {
                    resultado.listaProductos = resultado.listaProductos.OrderBy(x => x.pro_nombre).ToList();
                }
                else
                {
                    resultado.listaProductos = resultado.listaProductos.OrderByDescending(x => x.pro_nombre).ToList();
                }
            }
            else if (pAscColumna == "PrecioConTransfer")
            {
                if (pAscOrdenar)
                {
                    resultado.listaProductos = resultado.listaProductos.OrderBy(x => !x.isProductoFacturacionDirecta ? 0 : (decimal)x.tde_predescuento).ToList();
                }
                else
                {
                    resultado.listaProductos = resultado.listaProductos.OrderByDescending(x => !x.isProductoFacturacionDirecta ? 0 : (decimal)x.tde_predescuento).ToList();
                }
            }
            else if (pAscColumna == "nroordenamiento")
            {
                if (pAscOrdenar)
                {
                    resultado.listaProductos = resultado.listaProductos.OrderBy(x => x.nroordenamiento).ToList();
                }
                else
                {
                    resultado.listaProductos = resultado.listaProductos.OrderByDescending(x => x.nroordenamiento).ToList();
                }
            }
            _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos", new DKbase.web.cjSonBuscadorProductos(resultado));
            int? pPage = _httpContextAccessor?.HttpContext?.Session.GetInt32("PedidosBuscador_pPage");
            return DKweb.Codigo.Util.RecuperarProductos_generarPaginador(_httpContextAccessor, resultado, pPage.Value);
        }
        return string.Empty;
    }
    public string RecuperarProductosEnOfertas(int pPage)
    {
        int pageSize = DKbase.generales.Constantes.cCantidadFilaPorPagina;
        DKbase.web.cjSonBuscadorProductos resultado = DKweb.Codigo.Util.RecuperarProductosGeneral_OfertaTransfer(_httpContextAccessor, true, false);
        _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos", new DKbase.web.cjSonBuscadorProductos(resultado));
        _httpContextAccessor?.HttpContext?.Session.SetInt32("PedidosBuscador_pPage", pPage);
        return DKweb.Codigo.Util.RecuperarProductos_generarPaginador(_httpContextAccessor, resultado, pPage);
    }
    public string RecuperarProductosEnTransfer(int pPage)
    {
        int pageSize = DKbase.generales.Constantes.cCantidadFilaPorPagina;
        DKbase.web.cjSonBuscadorProductos resultado = DKweb.Codigo.Util.RecuperarProductosGeneral_OfertaTransfer(_httpContextAccessor, false, true);
        _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos", new DKbase.web.cjSonBuscadorProductos(resultado));
        _httpContextAccessor?.HttpContext?.Session.SetInt32("PedidosBuscador_pPage", pPage);
        return DKweb.Codigo.Util.RecuperarProductos_generarPaginador(_httpContextAccessor, resultado, pPage);
    }

    public int BorrarCarrito(int lrc_id, string lrc_codSucursal)
    {
        return DKweb.Codigo.Util.BorrarCarrito(_httpContextAccessor, lrc_codSucursal, DKbase.generales.Constantes.cTipo_Carrito, DKbase.generales.Constantes.cAccionCarrito_VACIAR);
    }
    public int BorrarCarritosDiferidos(int lrc_id, string lrc_codSucursal)
    {
        return DKweb.Codigo.Util.BorrarCarrito(_httpContextAccessor, lrc_codSucursal, DKbase.generales.Constantes.cTipo_CarritoDiferido, DKbase.generales.Constantes.cAccionCarrito_VACIAR);
    }
    public int BorrarCarritoTransfer(string pSucursal)
    {
        return DKweb.Codigo.Util.BorrarCarrito(_httpContextAccessor, pSucursal, DKbase.generales.Constantes.cTipo_CarritoTransfers, DKbase.generales.Constantes.cAccionCarrito_VACIAR);
    }
    public int BorrarCarritoTransferDiferido(string pSucursal)
    {
        return DKweb.Codigo.Util.BorrarCarrito(_httpContextAccessor, pSucursal, DKbase.generales.Constantes.cTipo_CarritoDiferidoTransfers, DKbase.generales.Constantes.cAccionCarrito_VACIAR);

    }
    public string ActualizarProductoCarrito(string pIdProducto, string pCodSucursal, int pCantidadProducto)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario user = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        if (user != null && oCliente != null)
        {
            DKbase.web.ResultCargaProducto result = new DKbase.web.ResultCargaProducto();//        
            DKbase.web.capaDatos.capaLogRegistro_base.AgregarProductosBuscadosDelCarrito(user.usu_codCliente.Value, pIdProducto, (Int32)user.id);
            //DKbase.web.capaDatos.capaCAR_base.AgregarProductoAlCarrito(pCodSucursal, pIdProducto, pCantidadProducto, user.usu_codCliente.Value, user.id);
            result.isOk = DKbase.web.capaDatos.capaCAR_base.AgregarProductoAlCarrito(pCodSucursal, pIdProducto, pCantidadProducto, user.usu_codCliente.Value, (Int32)user.id);
            return DKbase.generales.Serializador_base.SerializarAJson(result);
        }
        return null;
    }
    public string ActualizarProductoCarritoSubirArchivo(List<DKbase.web.capaDatos.cProductosAndCantidad> pListaValor)
    {
        DKbase.web.Usuario user = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        bool isOk = DKbase.web.capaDatos.capaCAR_WebService_base.ActualizarProductoCarritoSubirArchivo(pListaValor, user.usu_codCliente.Value, user.id);
        return isOk ? "1" : "0";
    }
    public static bool AgregarProductoAlCarrito(string pSucursal, string pIdProducto, int pCantidadProducto, int pIdCliente, int? pIdUsuario)
    {
        return DKbase.web.capaDatos.capaCAR_base.AgregarProductoAlCarrito(pSucursal, pIdProducto, pCantidadProducto, pIdCliente, pIdUsuario);
    }
    public string ObtenerHorarioCierre(string pSucursalDependiente)
    {
        string resultado = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultado = DKweb.Codigo.Util.ObtenerHorarioCierre(_httpContextAccessor, oCliente.cli_codsuc, pSucursalDependiente, oCliente.cli_codrep);
        }
        return resultado;
    }
    public string ObtenerHorarioCierreAndSiguiente(string pSucursalDependiente)
    {
        List<string> resultado = new List<string>();
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            string resultado1 = DKweb.Codigo.Util.ObtenerHorarioCierre(_httpContextAccessor, oCliente.cli_codsuc, pSucursalDependiente, oCliente.cli_codrep);
            string resultado2 = DKweb.Codigo.Util.ObtenerHorarioCierreAnterior(_httpContextAccessor, oCliente.cli_codsuc, pSucursalDependiente, oCliente.cli_codrep, resultado1);
            resultado.Add(resultado1);
            if (resultado1 != resultado2)
                resultado.Add(resultado2);

        }
        return DKbase.generales.Serializador_base.SerializarAJson(resultado);
    }
    public bool cargarOferta(int pIdOferta)
    {
        try
        {
            DKbase.web.capaDatos.cOferta o = DKweb.Codigo.Util.RecuperarOfertaPorId(pIdOferta);
            if (o != null)
            {
                DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
                if (oCliente != null)
                {
                    // WebService.InsertarOfertaRating(pIdOferta, oCliente.cli_codigo, false);
                }
                _httpContextAccessor?.HttpContext?.Session.SetInt32("home_Tipo", o.ofe_tipo);

                if (o.tfr_codigo != null)
                {
                    _httpContextAccessor?.HttpContext?.Session.SetInt32("home_IdTransfer", o.tfr_codigo.Value);
                }
            }
            _httpContextAccessor?.HttpContext?.Session.SetInt32("home_IdOferta", pIdOferta);
            return true;
        }
        catch (Exception ex)
        {
            DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
            return false;
        }
    }
    public string RecuperarProductosHomeOferta(int pIdOferta)
    {
        DKbase.web.cjSonBuscadorProductos resultado = DKweb.Codigo.Util.RecuperarProductosBase_V3(_httpContextAccessor, pIdOferta, null, null, false, false);
        if (resultado != null)
        {
            int pPage = 1;
            _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos", new DKbase.web.cjSonBuscadorProductos(resultado));
            _httpContextAccessor?.HttpContext?.Session.SetInt32("PedidosBuscador_pPage", pPage);
            return DKweb.Codigo.Util.RecuperarProductos_generarPaginador(_httpContextAccessor, resultado, pPage);
        }
        else { return string.Empty; }
    }
}
