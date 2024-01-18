using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using DKweb.Models;
using DKweb.Codigo;
using Microsoft.AspNetCore.Authorization;

namespace DKweb.Controllers;

[Authorize]
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
    /* public static String isPrueba(IHttpContextAccessor pHttpContextAccessor)
     {
         String result = pHttpContextAccessor.HttpContext?.Session.GetString("SessionVar");
         if (result != null)
         {
             return result;
         }
         return "";
     }*/
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
    //[Authorize]
    public async Task<IActionResult> Buscador()
    {

        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "Buscador");
        return View();
    }
    public async Task<IActionResult> Diferido()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "Diferido");
        return View();
    }
    public async Task<IActionResult> carrito()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "carrito");
        return View();
    }
    public async Task<IActionResult> carritoDiferido()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "carritoDiferido");
        return View();
    }
    public async Task<IActionResult> promocionescliente(string t)
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("promocionescliente_TIPO", t);
        return View();
    }
    public async Task<IActionResult> funIsMostrarOferta(bool pIsMostrarOferta)
    {
        DKweb.Codigo.Util.isMostrarOferta_Set(_httpContextAccessor, pIsMostrarOferta.ToString());
        return Content("Ok");
    }
    public async Task<string> RecuperarProductosVariasColumnas(string pTxtBuscador, string[] pListaColumna, bool pIsBuscarConOferta, bool pIsBuscarConTransfer)
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
    public async Task<IActionResult> RecuperarProductos(string pTxtBuscador)
    {
        DKbase.web.cjSonBuscadorProductos resultado = DKweb.Codigo.Util.RecuperarProductosBase_V3(_httpContextAccessor, null, pTxtBuscador, null, false, false);
        if (resultado != null)
        {
            _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosOrdenar", resultado);
            return Content(DKbase.generales.Serializador_base.SerializarAJson(resultado));
        }
        else { return Content(string.Empty); }
    }
    public async Task<string> RecuperarProductosPaginador(int pPage)
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
    public async Task<string> RecuperarProductosOrdenar(string pAscColumna, bool pAscOrdenar)
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
                    resultado.listaProductos = resultado.listaProductos.OrderBy(x => !x.isProductoFacturacionDirecta ? 0 : x.PrecioFinalTransfer).ToList();
                }
                else
                {
                    resultado.listaProductos = resultado.listaProductos.OrderByDescending(x => !x.isProductoFacturacionDirecta ? 0 : x.PrecioFinalTransfer).ToList();
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
    public async Task<string> RecuperarProductosEnOfertas(int pPage)
    {
        int pageSize = DKbase.generales.Constantes.cCantidadFilaPorPagina;
        DKbase.web.cjSonBuscadorProductos resultado = DKweb.Codigo.Util.RecuperarProductosGeneral_OfertaTransfer(_httpContextAccessor, true, false);
        _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos", new DKbase.web.cjSonBuscadorProductos(resultado));
        _httpContextAccessor?.HttpContext?.Session.SetInt32("PedidosBuscador_pPage", pPage);
        return DKweb.Codigo.Util.RecuperarProductos_generarPaginador(_httpContextAccessor, resultado, pPage);
    }
    public async Task<string> RecuperarProductosEnTransfer(int pPage)
    {
        int pageSize = DKbase.generales.Constantes.cCantidadFilaPorPagina;
        DKbase.web.cjSonBuscadorProductos resultado = DKweb.Codigo.Util.RecuperarProductosGeneral_OfertaTransfer(_httpContextAccessor, false, true);
        _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos", new DKbase.web.cjSonBuscadorProductos(resultado));
        _httpContextAccessor?.HttpContext?.Session.SetInt32("PedidosBuscador_pPage", pPage);
        return DKweb.Codigo.Util.RecuperarProductos_generarPaginador(_httpContextAccessor, resultado, pPage);
    }

    public async Task<int> BorrarCarrito(int lrc_id, string lrc_codSucursal)
    {
        return DKweb.Codigo.Util.BorrarCarrito(_httpContextAccessor, lrc_codSucursal, DKbase.generales.Constantes.cTipo_Carrito, DKbase.generales.Constantes.cAccionCarrito_VACIAR);
    }
    public async Task<int> BorrarCarritosDiferidos(int lrc_id, string lrc_codSucursal)
    {
        return DKweb.Codigo.Util.BorrarCarrito(_httpContextAccessor, lrc_codSucursal, DKbase.generales.Constantes.cTipo_CarritoDiferido, DKbase.generales.Constantes.cAccionCarrito_VACIAR);
    }
    public async Task<int> BorrarCarritoTransfer(string pSucursal)
    {
        return DKweb.Codigo.Util.BorrarCarrito(_httpContextAccessor, pSucursal, DKbase.generales.Constantes.cTipo_CarritoTransfers, DKbase.generales.Constantes.cAccionCarrito_VACIAR);
    }
    public async Task<int> BorrarCarritoTransferDiferido(string pSucursal)
    {
        return DKweb.Codigo.Util.BorrarCarrito(_httpContextAccessor, pSucursal, DKbase.generales.Constantes.cTipo_CarritoDiferidoTransfers, DKbase.generales.Constantes.cAccionCarrito_VACIAR);

    }
    public async Task<string> ActualizarProductoCarrito(int pIdProducto, string pCodSucursal, int pCantidadProducto)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario user = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        if (user != null && oCliente != null)
        {
            DKbase.web.ResultCargaProducto result = new DKbase.web.ResultCargaProducto();//        
            DKbase.web.capaDatos.capaLogRegistro_base.AgregarProductosBuscadosDelCarrito(user.usu_codCliente.Value, pIdProducto.ToString(), (Int32)user.id);
            //DKbase.web.capaDatos.capaCAR_base.AgregarProductoAlCarrito(pCodSucursal, pIdProducto, pCantidadProducto, user.usu_codCliente.Value, user.id);
            result.isOk = DKbase.web.capaDatos.capaCAR_base.AgregarProductoAlCarrito(pCodSucursal, pIdProducto, pCantidadProducto, user.usu_codCliente.Value, (Int32)user.id);
            return DKbase.generales.Serializador_base.SerializarAJson(result);
        }
        return null;
    }
    //[FromBody]
    [HttpPost]
    public async Task<string> ActualizarProductoCarritoSubirArchivo([FromBody]List<DKbase.web.capaDatos.cProductosAndCantidad> pListaValor)
    {
        DKbase.web.Usuario user = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        bool isOk = DKbase.web.capaDatos.capaCAR_WebService_base.ActualizarProductoCarritoSubirArchivo(pListaValor, user.usu_codCliente.Value, user.id);
        return isOk ? "1" : "0";
    }
    public static async Task<bool> AgregarProductoAlCarrito(string pSucursal, int pIdProducto, int pCantidadProducto, int pIdCliente, int? pIdUsuario)
    {
        return DKbase.web.capaDatos.capaCAR_base.AgregarProductoAlCarrito(pSucursal, pIdProducto, pCantidadProducto, pIdCliente, pIdUsuario);
    }
    public async Task<string> AgregarProductosTransfersAlCarrito(List<DKbase.web.capaDatos.cProductosAndCantidad> pListaProductosMasCantidad, int pIdTransfers, string pCodSucursal)
    {
        DKbase.web.ResultTransfer objResult = new DKbase.web.ResultTransfer();
        string resultado = string.Empty;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario user = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        if (user != null && oCliente != null)
        {
            DKbase.Util.AgregarHistorialProductoCarritoTransfer(user.usu_codCliente.Value, pListaProductosMasCantidad, user.id);
            objResult.isNotError = DKweb.Codigo.Util.AgregarProductosTransfersAlCarrito(pListaProductosMasCantidad, user.usu_codCliente.Value, user.id, pIdTransfers, pCodSucursal, DKbase.generales.Constantes.cTipo_CarritoTransfers);
            objResult.oSucursalCarritoTransfer = DKweb.Codigo.Util.RecuperarCarritosTransferPorCliente_generico(_httpContextAccessor, oCliente, DKbase.generales.Constantes.cTipo_CarritoTransfers, pCodSucursal);
            objResult.listProductosAndCantidadError = pListaProductosMasCantidad;
            objResult.codSucursal = pCodSucursal;
            resultado = DKbase.generales.Serializador_base.SerializarAJson(objResult);
        }
        return resultado;
    }
    public async Task<string> ObtenerHorarioCierre(string pSucursalDependiente)
    {
        string resultado = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente != null)
        {
            resultado = DKweb.Codigo.Util.ObtenerHorarioCierre(_httpContextAccessor, oCliente.cli_codsuc, pSucursalDependiente, oCliente.cli_codrep);
        }
        return resultado;
    }
    public async Task<string> ObtenerHorarioCierreAndSiguiente(string pSucursalDependiente)
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
    public async Task<bool> cargarOferta(int pIdOferta)
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
    public async Task<string> RecuperarProductosHomeOferta(int pIdOferta)
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

    public async Task<string> RecuperarTransfer(int pNombreProducto)
    {
        List<DKbase.web.capaDatos.cTransfer> listaTransfer = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        List<string> listaSucursales = DKweb.Codigo.Util.RecuperarSucursalesDelCliente(_httpContextAccessor);
        if (oCliente != null && listaSucursales != null)
        {
            listaTransfer = DKbase.Util.RecuperarTodosTransferMasDetallePorIdProducto(pNombreProducto, oCliente, listaSucursales).Where(x => x.tfr_facturaciondirecta == null ? true : !(bool)x.tfr_facturaciondirecta).ToList();
        }
        return DKbase.generales.Serializador_base.SerializarAJson(listaTransfer);
    }
    public async Task<string> RecuperarTransferPorId(int pIdTransfer)
    {

        DKbase.web.capaDatos.cTransfer objTransfer = null;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        List<string> listaSucursales = DKweb.Codigo.Util.RecuperarSucursalesDelCliente(_httpContextAccessor);
        if (oCliente != null && listaSucursales != null)
        {
            objTransfer = DKbase.Util.RecuperarTransferMasDetallePorIdTransfer(pIdTransfer, oCliente, listaSucursales);
        }
        if (objTransfer != null)
        {
            List<DKbase.web.capaDatos.cTransfer> listaTransfer = new List<DKbase.web.capaDatos.cTransfer>();
            listaTransfer.Add(objTransfer);
            return DKbase.generales.Serializador_base.SerializarAJson(listaTransfer);
        }
        else { return string.Empty; }
    }
    public async Task<IActionResult> subirpedido()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "subirpedido");
        return View();
    }
    public async Task<IActionResult> subirarchivoresultado()
    {

        return View();
    }
    public async Task<IActionResult> subirarchivoresultado_msg()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "subirarchivoresultado_msg");
        return View();
    }
    /*[HttpPost]
    public ActionResult subirpedidoUpload()
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        string sucursal = "CC";
        return RedirectToAction("subirpedido");
        // DKbase.web.cSubirpedido_base.LeerArchivoPedido(oUsuario,oCliente,file, sucursal);
        //Usuario oUsuario, cClientes oCliente, IFormFile pFileUpload, string pSucursal
    }*/
    [HttpPost]
    public async Task<IActionResult> subirpedidoUpload()//List<IFormFile> files
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente.cli_estado.ToUpper() == DKbase.generales.Constantes.cESTADO_INH)
        {
            return RedirectToAction("inhabilitado", "config");
        }
        else
        {
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file != null)//&& file.ContentLength > 0
                {
                    //Request.Form["HiddenFieldSucursalEleginda"] != null && 
                    DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
                    if (!string.IsNullOrEmpty(file.FileName))
                    {
                        string sucursal = Request.Form["HiddenFieldSucursalEleginda"];
                        //Boolean? isNotRepetido = true;
                        // Boolean? isNotRepetido = cSubirpedido.LeerArchivoPedido(file, sucursal);
                        DKbase.web.cSubirPedido_return oResult = DKbase.web.cSubirpedido_base.LeerArchivoPedido(oUsuario, oCliente, file, sucursal);
                        if (oResult == null)
                        {
                            return RedirectToAction("subirpedido");
                        }
                        else if (oResult.isCorrect)
                        {
                            _httpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cProductosGenerico>>("subirpedido_ListaProductos", oResult.ListaProductos);
                            _httpContextAccessor.HttpContext.Session.SetString("subirpedido_SucursalEleginda", oResult.SucursalEleginda);
                            _httpContextAccessor.HttpContext.Session.SetString("subirpedido_nombreArchivoCompleto", oResult.nombreArchivoCompleto);
                            _httpContextAccessor.HttpContext.Session.SetString("subirpedido_nombreArchivoCompletoOriginal", oResult.nombreArchivoCompletoOriginal);

                            return RedirectToAction("subirarchivoresultado");
                        }
                        else
                        {
                            DKweb.Codigo.Util.subirpedido_isRepetido_true(_httpContextAccessor);
                            return RedirectToAction("subirpedido");
                        }
                    }
                }
            }
            return RedirectToAction("subirpedido");
        }
    }
    public async Task<bool> CargarArchivoPedidoDeNuevo(int has_id)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        DKbase.web.cSubirPedido_return oResult = DKbase.web.cSubirpedido_base.CargarArchivoPedidoDeNuevo(oUsuario, oCliente, has_id);
        _httpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cProductosGenerico>>("subirpedido_ListaProductos", oResult.ListaProductos);
        _httpContextAccessor.HttpContext.Session.SetString("subirpedido_SucursalEleginda", oResult.SucursalEleginda);
        _httpContextAccessor.HttpContext.Session.SetString("subirpedido_nombreArchivoCompleto", oResult.nombreArchivoCompleto);
        _httpContextAccessor.HttpContext.Session.SetString("subirpedido_nombreArchivoCompletoOriginal", oResult.nombreArchivoCompletoOriginal);
        bool result = oResult == null ? false : oResult.isCorrect;
        if (result)
        {
            DKweb.Codigo.Util.subirpedido_isRepetido_true(_httpContextAccessor);
        }
        return result;
    }
    public async Task<string> ObtenerHistorialSubirArchivo(int pDia)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (oCliente == null)
            return null;
        List<DKbase.web.capaDatos.cHistorialArchivoSubir> resultado = null;
        DateTime fechaDesdeAUX = DateTime.Now.AddDays(pDia * -1);
        DateTime fechaDesde = new DateTime(fechaDesdeAUX.Year, fechaDesdeAUX.Month, fechaDesdeAUX.Day, 0, 0, 0);
        List<DKbase.web.capaDatos.cHistorialArchivoSubir> listaArchivosSubir = DKbase.Util.RecuperarHistorialSubirArchivo(oCliente.cli_codigo);
        if (listaArchivosSubir != null)
        {
            resultado = listaArchivosSubir.Where(x => x.has_fecha >= fechaDesde).ToList();
        }

        if (resultado != null)
            return DKbase.generales.Serializador_base.SerializarAJson(resultado);
        else
            return null;
    }
    public async Task<List<string>> ObtenerRangoFecha_pedidos(int pDia)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.cRangoFecha_Pedidos o = DKbase.Util.ObtenerRangoFecha_pedidos(oCliente, pDia);
        List<string> lista = o.lista;
        DKweb.Codigo.Util.estadopedidos_Resultado_Set(_httpContextAccessor, o.resultadoObj);
        return lista;
    }
    // [Authorize(Roles = DKbase.generales.Constantes.cROL_const_ADMINISTRADORCLIENTE)]
    public async Task<IActionResult> estadopedidos()
    {
        return View();
    }
    public async Task<IActionResult> estadopedidosresultado()
    {
        return View();
    }
    //[Authorize(Roles = DKbase.generales.Constantes.cROL_const_OPERADORCLIENTE)]
    public async Task<IActionResult> recuperador(string t)
    {
        int tipo = 0;
        if (int.TryParse(t, out tipo))
        {
            DKweb.Codigo.Util.clientes_pages_Recuperador_Tipo_Set(_httpContextAccessor, Convert.ToInt32(t));
        }
        return View();
    }
    public async Task<string> RecuperarFaltasProblemasCrediticios(int pDia)
    {
        List<DKbase.web.capaDatos.cFaltantesConProblemasCrediticiosPadre> listaRecuperador = null;
        int? tipo = DKweb.Codigo.Util.clientes_pages_Recuperador_Tipo(_httpContextAccessor);
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (tipo != null && oCliente != null)
        {
            //System.Web.HttpContext.Current.Session["clientes_pages_Recuperador_CantidadDia"] = pDia;
            DKweb.Codigo.Util.clientes_pages_Recuperador_CantidadDia_Set(_httpContextAccessor, pDia);
            listaRecuperador = DKbase.Util.RecuperarFaltasProblemasCrediticios(oCliente, tipo.Value, pDia, oCliente.cli_codsuc);
        }
        if (listaRecuperador != null)
            return DKbase.generales.Serializador_base.SerializarAJson(listaRecuperador);
        else
            return null;
    }
    public async Task<string> RecuperarFaltasProblemasCrediticiosTodosEstados(int pDia)
    {
        List<DKbase.web.capaDatos.cFaltantesConProblemasCrediticiosPadre> listaRecuperador = null;
        int? tipo = DKweb.Codigo.Util.clientes_pages_Recuperador_Tipo(_httpContextAccessor);
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (tipo != null && oCliente != null)
        {
            DKweb.Codigo.Util.clientes_pages_Recuperador_CantidadDia_Set(_httpContextAccessor, pDia);
            listaRecuperador = DKbase.Util.RecuperarFaltasProblemasCrediticios_TodosEstados(oCliente, tipo.Value, pDia, oCliente.cli_codsuc);
        }
        if (listaRecuperador != null)
            return DKbase.generales.Serializador_base.SerializarAJson(listaRecuperador);
        else
            return null;
    }
    public async Task<bool> AgregarProductosDelRecuperardorAlCarrito(string pSucursal, string[] pArrayNombreProducto, int[] pArrayCantidad, bool[] pArrayOferta)
    {
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        int? Recuperador_Tipo = DKweb.Codigo.Util.clientes_pages_Recuperador_Tipo(_httpContextAccessor);
        int? Recuperador_CantidadDia = DKweb.Codigo.Util.clientes_pages_Recuperador_CantidadDia(_httpContextAccessor);
        if (oUsuario != null && Recuperador_Tipo != null && oCliente != null && Recuperador_CantidadDia != null)
        {
            return DKbase.web.acceso.AgregarProductosDelRecuperardorAlCarrito(oCliente, oUsuario, pSucursal, pArrayNombreProducto, pArrayCantidad, pArrayOferta, Recuperador_Tipo.Value, Recuperador_CantidadDia.Value);
        }
        return false;
    }
    public async Task<string> BorrarPorProductosFaltasProblemasCrediticios(string pSucursal, string[] pArrayNombreProducto)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        int? tipo = DKweb.Codigo.Util.clientes_pages_Recuperador_Tipo(_httpContextAccessor);
        if (oCliente != null && tipo != null)
        {
            for (int i = 0; i < pArrayNombreProducto.Count(); i++)
            {
                DKbase.web.capaDatos.capaLogRegistro_base.BorrarPorProductosFaltasProblemasCrediticios(pSucursal, oCliente.cli_codigo, tipo.Value, pArrayNombreProducto[i]);
            }
        }
        //System.Web.HttpContext.Current.Session["clientesDefault_CantRecuperadorFaltaFechaHora"] = null;
        return "Ok";
    }
    public async Task<string> TomarPedidoCarrito(string pIdSucursal, string pMensajeEnFactura, string pMensajeEnRemito, string pTipoEnvio, bool pIsUrgente)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        List<DKbase.web.capaDatos.cCarrito> listaCarrito = DKbase.web.capaDatos.capaCAR_WebService_base.RecuperarCarritosPorSucursalYProductos_generica(oCliente, DKbase.generales.Constantes.cTipo_Carrito);
        string horarioCierre = DKweb.Codigo.Util.getObtenerHorarioCierre(_httpContextAccessor, pIdSucursal);
        pMensajeEnFactura = pMensajeEnFactura == null ? "" : pMensajeEnFactura;
        pMensajeEnRemito = pMensajeEnRemito == null ? "" : pMensajeEnRemito;
        var resultPedido = DKbase.web.capaDatos.capaCAR_WebService_base.TomarPedidoCarrito_generico(oUsuario, oCliente, listaCarrito, horarioCierre, DKbase.generales.Constantes.cTipo_Carrito, pIdSucursal, pMensajeEnFactura, pMensajeEnRemito, pTipoEnvio, pIsUrgente);
        if (resultPedido == null)
        {
            return null;
        }
        else
        {
            return DKbase.generales.Serializador_base.SerializarAJson(resultPedido);
        }
    }
    public async Task<string> TomarPedidoCarritoDiferido(string pIdSucursal, string pMensajeEnFactura, string pMensajeEnRemito, string pTipoEnvio, bool pIsUrgente)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        List<DKbase.web.capaDatos.cCarrito> listaCarrito = DKbase.web.capaDatos.capaCAR_WebService_base.RecuperarCarritosPorSucursalYProductos_generica(oCliente, DKbase.generales.Constantes.cTipo_CarritoDiferido);
        string horarioCierre = DKweb.Codigo.Util.getObtenerHorarioCierre(_httpContextAccessor, pIdSucursal);
        pMensajeEnFactura = pMensajeEnFactura == null ? "" : pMensajeEnFactura;
        pMensajeEnRemito = pMensajeEnRemito == null ? "" : pMensajeEnRemito;
        DKbase.dll.cDllPedido resultadoPedido = DKbase.web.capaDatos.capaCAR_WebService_base.TomarPedidoCarrito_generico(oUsuario, oCliente, listaCarrito, horarioCierre, DKbase.generales.Constantes.cTipo_CarritoDiferido, pIdSucursal, pMensajeEnFactura, pMensajeEnRemito, pTipoEnvio, pIsUrgente);
        if (resultadoPedido == null)
        {
            return null;
        }
        else
        {
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoPedido);
        }
    }
    public async Task<string> TomarTransferPedidoCarrito(bool pIsDiferido, string pIdSucursal, string pMensajeEnFactura, string pMensajeEnRemito, string pTipoEnvio)
    {
        string tipo = pIsDiferido ? DKbase.generales.Constantes.cTipo_CarritoDiferidoTransfers : DKbase.generales.Constantes.cTipo_CarritoTransfers;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        List<DKbase.web.capaDatos.cCarritoTransfer> pListaCarrito = DKweb.Codigo.Util.RecuperarCarritosTransferPorIdCliente(_httpContextAccessor, oCliente, tipo, pIdSucursal);
        pMensajeEnFactura = pMensajeEnFactura == null ? "" : pMensajeEnFactura;
        pMensajeEnRemito = pMensajeEnRemito == null ? "" : pMensajeEnRemito;
        List<DKbase.dll.cDllPedidoTransfer> resultadoPedido = DKbase.web.capaDatos.capaCAR_WebService_base.TomarTransferPedidoCarrito(oUsuario, oCliente, pListaCarrito, pIsDiferido, pIdSucursal, pMensajeEnFactura, pMensajeEnRemito, pTipoEnvio);
        if (resultadoPedido == null)
        {
            return null;
        }
        else
        {
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoPedido);
        }
    }
    public async Task<string> TomarPedidoCarritoFacturarseFormaHabitual(string pIdSucursal, string pMensajeEnFactura, string pMensajeEnRemito, string pTipoEnvio, bool pIsUrgente, string[] pListaNombreComercial, int[] pListaCantidad)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        string horarioCierre = DKweb.Codigo.Util.getObtenerHorarioCierre(_httpContextAccessor, pIdSucursal);
        pMensajeEnFactura = pMensajeEnFactura == null ? "" : pMensajeEnFactura;
        pMensajeEnRemito = pMensajeEnRemito == null ? "" : pMensajeEnRemito;
        DKbase.dll.cDllPedido resultadoPedido = DKbase.web.capaDatos.capaCAR_WebService_base.TomarPedidoCarritoFacturarseFormaHabitual(oUsuario, oCliente, horarioCierre, pIdSucursal, pMensajeEnFactura, pMensajeEnRemito, pTipoEnvio, pIsUrgente, pListaNombreComercial, pListaCantidad);
        if (resultadoPedido == null)
        {
            return null;
        }
        else
        {
            return DKbase.generales.Serializador_base.SerializarAJson(resultadoPedido);
        }
    }
    public async Task<string> CargarCarritoDiferido(string pIdSucursal, int pNombreProducto, int pCantidadProducto)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        if (oUsuario != null)
        {
            DKbase.web.ResultCargaProducto result = result = new DKbase.web.ResultCargaProducto();
            result.isOk = DKbase.web.capaDatos.capaCAR_base.CargarCarritoDiferido(pIdSucursal, pNombreProducto, pCantidadProducto, oUsuario.usu_codCliente.Value, oUsuario.id);
            return DKbase.generales.Serializador_base.SerializarAJson(result);
        }
        return null;
    }
    public async Task<string> AgregarProductosTransfersAlCarritoDiferido(List<DKbase.web.capaDatos.cProductosAndCantidad> pListaProductosMasCantidad, int pIdTransfers, string pCodSucursal)
    {
        DKbase.web.ResultTransfer objResult = new DKbase.web.ResultTransfer();
        string resultado = string.Empty;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
        if (oCliente != null && oUsuario != null)
        {
            DKbase.Util.AgregarHistorialProductoCarritoTransfer(oUsuario.usu_codCliente.Value, pListaProductosMasCantidad, oUsuario.id);
            objResult.isNotError = DKweb.Codigo.Util.AgregarProductosTransfersAlCarrito(pListaProductosMasCantidad, oUsuario.usu_codCliente.Value, oUsuario.id, pIdTransfers, pCodSucursal, DKbase.generales.Constantes.cTipo_CarritoDiferidoTransfers);
            objResult.oSucursalCarritoTransfer = DKweb.Codigo.Util.RecuperarCarritosTransferPorCliente_generico(_httpContextAccessor, oCliente, DKbase.generales.Constantes.cTipo_CarritoDiferidoTransfers, pCodSucursal);
            objResult.listProductosAndCantidadError = pListaProductosMasCantidad;
            objResult.codSucursal = pCodSucursal;
            resultado = DKbase.generales.Serializador_base.SerializarAJson(objResult);
        }
        return resultado;
    }
    public void funReservaVacunas(List<DKbase.dll.cVacuna> pListaVacunas)
    {
        DKbase.web.capaDatos.capaDLL.AgregarVacunas(pListaVacunas);
    }
    public async Task<IActionResult> reservavacunas(string t)
    {
        //return RedirectToAction("reservavacunas_mis");
        bool resultado = false;
        if (!string.IsNullOrEmpty(t) && t == "1")
        {
            resultado = true;
        }
        _httpContextAccessor?.HttpContext?.Session.Set<Boolean>("clientes_pages_reservavacunas_SinTroquel", resultado);
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "reservavacunas");
        if (!isUsuarioConPermisoPedido(_httpContextAccessor))
        {
            return RedirectToAction("reservavacunas_mis");
        }
        return View();
    }
    public async Task<IActionResult> reservavacunas_mis()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "reservavacunas_mis");
        return View();
    }
    public async Task<IActionResult> reservavacunas_total()
    {
        _httpContextAccessor?.HttpContext?.Session.SetString("url_type", "reservavacunas_total");
        return View();
    }
    public async Task<bool> ModificarCantidadProductos(string pCodProducto, string pCodSucursal, int pCantidad)
    {
        bool resultado = false;
        try
        {
            DKbase.web.cjSonBuscadorProductos o_update = _httpContextAccessor?.HttpContext?.Session.Get<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos");
            for (int i = 0; i < o_update.listaProductos.Count; i++)
            {
                for (int x = 0; x < o_update.listaProductos[i].listaSucursalStocks.Count; x++)
                {
                    if (o_update.listaProductos[i].listaSucursalStocks[x].stk_codsuc == pCodSucursal)
                    {
                        o_update.listaProductos[i].listaSucursalStocks[x].cantidadSucursal = pCantidad;
                        return true;
                        //resultado = true;
                        //break;
                    }
                }
            }
            _httpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos", o_update);
            //((cjSonBuscadorProductos)System.Web.HttpContext.Current.Session["PedidosBuscador_productosTodos"]).listaProductos[pIndexProducto].listaSucursalStocks[pIndexSucursal].cantidadSucursal = pCantidad;

        }
        catch (Exception ex)
        {
            DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
        }
        return resultado;
    }
}