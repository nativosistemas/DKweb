namespace DKweb.Codigo;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

public class Util
{
    public static bool IsUsuariosDK(IHttpContextAccessor pHttpContextAccessor)
    {
        bool result = false;
        DKbase.web.Usuario o = pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.Usuario>("clientesDefault_Usuario");
        if (o != null &&
       (o.idRol == DKbase.generales.Constantes.cROL_PROMOTOR ||
       o.idRol == DKbase.generales.Constantes.cROL_ENCSUCURSAL ||
       o.idRol == DKbase.generales.Constantes.cROL_ENCGRAL ||
       o.idRol == DKbase.generales.Constantes.cROL_GRUPOCLIENTE))
        {
            result = true;
        }
        return result;
    }
    public static bool IsUsuariosOPERADORCLIENTE(IHttpContextAccessor pHttpContextAccessor)
    {
        bool result = false;
        DKbase.web.Usuario o = pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.Usuario>("clientesDefault_Usuario");
        if (o != null &&
       (o.idRol == DKbase.generales.Constantes.cROL_OPERADORCLIENTE))
        {
            result = true;
        }
        return result;
    }
    public static bool IsPermisoSeccion(IHttpContextAccessor pHttpContextAccessor, string pNombreSeccion)
    {

        bool resultado = true;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<string>>("master_ListaSinPermisoSecciones") != null)
        {
            List<string> listaSinPermiso = (List<string>)pHttpContextAccessor.HttpContext?.Session.Get<List<string>>("master_ListaSinPermisoSecciones");
            if (listaSinPermiso != null)
            {
                foreach (string item in listaSinPermiso)
                {
                    if (item == pNombreSeccion)
                    {
                        resultado = false;
                        break;
                    }
                }
            }
        }
        return resultado;
    }
    public static DKbase.web.Usuario getSessionUsuario(IHttpContextAccessor pHttpContextAccessor)
    {
        DKbase.web.Usuario result = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.Usuario>("clientesDefault_Usuario") != null)
        {
            result = pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.Usuario>("clientesDefault_Usuario");

        }
        return result;
    }
    public static DKbase.web.capaDatos.cClientes getSessionCliente(IHttpContextAccessor pHttpContextAccessor)
    {
        DKbase.web.capaDatos.cClientes result = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente") != null)
        {
            result = pHttpContextAccessor.HttpContext?.Session.Get<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente");
        }
        return result;
    }
    public static string getHrefRevista(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = "href=\"" + "#" + "\""; ;
        if (pHttpContextAccessor.HttpContext?.Session.GetString("href_Revista") != null)
        {
            resultado = pHttpContextAccessor.HttpContext?.Session.GetString("href_Revista");
        }
        return resultado;
    }
    public static int ObtenerCantidadMensaje(IHttpContextAccessor pHttpContextAccessor)
    {
        int resultado = 0;

        if (pHttpContextAccessor.HttpContext?.Session.GetInt32("clientesDefault_CantListaMensaje") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.GetInt32("clientesDefault_CantListaMensaje").Value;
        }
        return resultado;
    }
    public static void CargarMensajeActualizado(IHttpContextAccessor pHttpContextAccessor, int pIdCliente)
    {

        List<DKbase.web.capaDatos.cMensaje> listaMensaje = new List<DKbase.web.capaDatos.cMensaje>();// WebService.RecuperarTodosMensajesPorIdCliente(pIdCliente);
        if (listaMensaje != null)
        {
            pHttpContextAccessor.HttpContext.Session.SetString("clientesDefault_CantListaMensaje", listaMensaje.Where(x => (x.tme_estado == Convert.ToInt32(DKbase.generales.Constantes.cESTADO_SINLEER) && !x.tme_importante)).ToList().Count.ToString());
            //HttpContext.Current.Session["clientesDefault_CantListaMensaje"] = listaMensaje.Where(x => (x.tme_estado == Convert.ToInt32(Constantes.cESTADO_SINLEER) && !x.tme_importante)).ToList().Count;
            pHttpContextAccessor.HttpContext.Session.Set<DateTime>("clientesDefault_CantListaMensajeFechaHora", DateTime.Now);
        }
    }
    public static List<DKbase.web.capaDatos.cClientes> RecuperarTodosClientesByGrupoCliente(IHttpContextAccessor pHttpContextAccessor, string pGC)
    {
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodosClientesByGrupoCliente") == null)
        {
            List<DKbase.web.capaDatos.cClientes> l = DKbase.Util.RecuperarTodosClientesByGrupoCliente(pGC);
            if (l == null)
            {
                l = new List<DKbase.web.capaDatos.cClientes>();
            }
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodosClientesByGrupoCliente", l);
        }
        return pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodosClientesByGrupoCliente");
    }
    public static List<DKbase.web.capaDatos.cClientes> RecuperarTodosClientes(IHttpContextAccessor pHttpContextAccessor)
    {
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodosClientes") == null)
        {
            List<DKbase.web.capaDatos.cClientes> l = DKbase.Util.RecuperarTodosClientes();
            if (l == null)
            {
                l = new List<DKbase.web.capaDatos.cClientes>();
            }
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodosClientes", l);
        }
        return pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodosClientes");
    }
    public static List<DKbase.web.capaDatos.cClientes> spRecuperarTodosClientesByPromotor(IHttpContextAccessor pHttpContextAccessor, string ApNombre)
    {
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_spRecuperarTodosClientesByPromotor") == null)
        {
            List<DKbase.web.capaDatos.cClientes> l = DKbase.Util.spRecuperarTodosClientesByPromotor(ApNombre);
            if (l == null)
            {
                l = new List<DKbase.web.capaDatos.cClientes>();
            }
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_spRecuperarTodosClientesByPromotor", l);
        }
        return pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_spRecuperarTodosClientesByPromotor");
    }
    public static List<DKbase.web.capaDatos.cMensaje> RecuperartTodosMensajeNewPorSucursal(IHttpContextAccessor pHttpContextAccessor, string cli_codsuc, string cli_codrep)
    {
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cMensaje>>("clientesDefault_RecuperartTodosMensajeNewPorSucursal") == null)
        {
            List<DKbase.web.capaDatos.cMensaje> l = DKbase.Util.RecuperartTodosMensajeNewPorSucursal(cli_codsuc, cli_codrep);
            if (l == null)
            {
                l = new List<DKbase.web.capaDatos.cMensaje>();
            }
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cMensaje>>("clientesDefault_RecuperartTodosMensajeNewPorSucursal", l);
        }
        return pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cMensaje>>("clientesDefault_RecuperartTodosMensajeNewPorSucursal");
    }
    public static List<DKbase.web.capaDatos.cArchivo> RecuperarPopUpPorCliente(IHttpContextAccessor pHttpContextAccessor, int cli_codigo, string cli_codsuc)
    {
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cArchivo>>("clientesDefault_RecuperarPopUpPorCliente") == null)
        {
            List<DKbase.web.capaDatos.cArchivo> l = DKbase.Util.RecuperarPopUpPorCliente(cli_codigo, cli_codsuc);
            if (l == null)
            {
                l = new List<DKbase.web.capaDatos.cArchivo>();
            }
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cArchivo>>("clientesDefault_RecuperarPopUpPorCliente", l);
        }
        return pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cArchivo>>("clientesDefault_RecuperarPopUpPorCliente");
    }
    public static List<DKbase.web.capaDatos.cClientes> RecuperarTodosClientesBySucursal(IHttpContextAccessor pHttpContextAccessor, string IdSuc)
    {
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodosClientesBySucursal") == null)
        {
            List<DKbase.web.capaDatos.cClientes> l = DKbase.Util.RecuperarTodosClientesBySucursal(IdSuc);
            if (l == null)
            {
                l = new List<DKbase.web.capaDatos.cClientes>();
            }
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodosClientesBySucursal", l);
        }
        return pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodosClientesBySucursal");
    }
    public static List<DKbase.web.capaDatos.cOferta> RecuperarTodasOfertaPublicar(IHttpContextAccessor pHttpContextAccessor)
    {
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cClientes>>("clientesDefault_RecuperarTodasOfertaPublicar") == null)
        {
            List<DKbase.web.capaDatos.cOferta> l = DKbase.Util.RecuperarTodasOfertaPublicar();
            if (l == null)
            {
                l = new List<DKbase.web.capaDatos.cOferta>();
            }
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cOferta>>("clientesDefault_RecuperarTodasOfertaPublicar", l);
        }
        return pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.capaDatos.cOferta>>("clientesDefault_RecuperarTodasOfertaPublicar");
    }
    public static bool ClientesBase_isLogeo(IHttpContextAccessor pHttpContextAccessor)
    {
        bool result = false;
        if (!string.IsNullOrEmpty(pHttpContextAccessor.HttpContext.Session.GetString("ClientesBase_isLogeo")) && Convert.ToBoolean(pHttpContextAccessor.HttpContext.Session.GetString("ClientesBase_isLogeo")))
        {
            result = true;

        }
        return result;
    }
    public static void ClientesBase_isLogeo_null(IHttpContextAccessor pHttpContextAccessor)
    {
        //pHttpContextAccessor.HttpContext.Session.SetString("ClientesBase_isLogeo", null);
        pHttpContextAccessor.HttpContext.Session.Remove("ClientesBase_isLogeo");
    }
    public static bool isMostrarOferta(IHttpContextAccessor pHttpContextAccessor)
    {
        bool result = false;
        if (!string.IsNullOrEmpty(pHttpContextAccessor.HttpContext.Session.GetString("isMostrarOferta")) && Convert.ToBoolean(pHttpContextAccessor.HttpContext.Session.GetString("isMostrarOferta")))
        {
            result = true;

        }
        return result;
    }
    public static List<string> RecuperarSucursalesDelCliente(IHttpContextAccessor pHttpContextAccessor)
    {
        DKbase.web.capaDatos.cClientes oClientes = getSessionCliente(pHttpContextAccessor);
        List<string> result = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<string>>("sucursalesDelCliente") != null)
        {
            result = pHttpContextAccessor.HttpContext?.Session.Get<List<string>>("sucursalesDelCliente");
        }
        else if (oClientes != null)
        {
            result = DKbase.web.FuncionesPersonalizadas_base.RecuperarSucursalesParaBuscadorDeCliente(oClientes);
            pHttpContextAccessor.HttpContext.Session.Set<List<string>>("sucursalesDelCliente", result);
        }
        return result;
    }
    public static List<DKbase.web.cSucursal> RecuperarTodasSucursales(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.web.cSucursal> result = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.cSucursal>>("todasSucursales") != null)
        {
            result = pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.web.cSucursal>>("todasSucursales");
        }
        else
        {
            result = DKbase.Util.RecuperarTodasSucursales();
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.cSucursal>>("todasSucursales", result);
        }
        return result;
    }
    public static string getObtenerHorarioCierre(IHttpContextAccessor pHttpContextAccessor, string pSucursal)
    {
        string result = string.Empty;
        DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
        string nameSession = "horario_" + pSucursal;
        if (pHttpContextAccessor.HttpContext.Session.GetString(nameSession) == null)
        {
            pHttpContextAccessor.HttpContext.Session.SetString(nameSession, DKbase.web.FuncionesPersonalizadas_base.ObtenerHorarioCierre(oCliente, oCliente.cli_codsuc, pSucursal, oCliente.cli_codrep));
        }
        if (pHttpContextAccessor.HttpContext.Session.GetString(nameSession) != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.GetString(nameSession);
            DateTime? fechaGuarda = DKbase.web.FuncionesPersonalizadas_base.getFecha_Horario(result);
            if (fechaGuarda != null && fechaGuarda.Value < DateTime.Now)
            {
                pHttpContextAccessor.HttpContext.Session.SetString(nameSession, DKbase.web.FuncionesPersonalizadas_base.ObtenerHorarioCierre(oCliente, oCliente.cli_codsuc, pSucursal, oCliente.cli_codrep));
                result = pHttpContextAccessor.HttpContext.Session.GetString(nameSession);
            }
        }
        return result;
    }
    public static List<DKbase.web.capaDatos.cCarrito> RecuperarCarritosPorSucursalYProductos(IHttpContextAccessor pHttpContextAccessor, string pTipo)
    {
        DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
        List<DKbase.web.capaDatos.cCarrito> l = DKbase.web.capaDatos.capaCAR_WebService_base.RecuperarCarritosPorSucursalYProductos_generica(oCliente, pTipo);
        foreach (var item in l)
        {
            item.proximoHorarioEntrega = getObtenerHorarioCierre(pHttpContextAccessor, item.codSucursal);
        }
        return l;
    }
    public static List<DKbase.web.capaDatos.cSucursalCarritoTransfer> RecuperarCarritosTransfer_generico(IHttpContextAccessor pHttpContextAccessor, string pTipo)
    {
        List<DKbase.web.capaDatos.cSucursalCarritoTransfer> result = null;
        DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
        result = DKbase.web.capaDatos.capaCAR_WebService_base.RecuperarCarritosTransferPorIdClienteOrdenadosPorSucursal(oCliente, pTipo);
        if (result != null)
        {
            foreach (var item in result)
            {
                item.proximoHorarioEntrega = getObtenerHorarioCierre(pHttpContextAccessor, item.Sucursal);
            }
        }
        return result;
    }
    public static int RecuperarProductoParametrizadoCantidad(IHttpContextAccessor pHttpContextAccessor)
    {
        if (pHttpContextAccessor.HttpContext.Session.GetInt32("RecuperarProductoParametrizadoCantidad") == null)
        {
            pHttpContextAccessor.HttpContext.Session.SetInt32("RecuperarProductoParametrizadoCantidad", DKbase.Util.RecuperarProductoParametrizadoCantidad());
        }
        int resultado = pHttpContextAccessor.HttpContext.Session.GetInt32("RecuperarProductoParametrizadoCantidad").Value;
        return resultado;
    }
    public static int getCantidadFilaPorPagina(IHttpContextAccessor pHttpContextAccessor)
    {
        if (DKweb.Controllers.mvcController.isSubirPedido(pHttpContextAccessor))
            return DKbase.generales.Constantes.cCantidadFilaPorPaginaSubirPedido;
        else
            return DKbase.generales.Constantes.cCantidadFilaPorPagina;
    }
    public static List<DKbase.web.cTipoEnvioClienteFront> RecuperarTiposDeEnvios(IHttpContextAccessor pHttpContextAccessor)
    {
        DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
        List<DKbase.web.cTipoEnvioClienteFront> resultado = null;
        if (pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.web.cTipoEnvioClienteFront>>("RecuperarTiposDeEnvios") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.web.cTipoEnvioClienteFront>>("RecuperarTiposDeEnvios");
        }
        else if (oCliente != null)
        {
            resultado = DKbase.Util.RecuperarTiposDeEnvios(oCliente);
            // HttpContext.Current.Session["RecuperarTiposDeEnvios"] = resultado;
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.cTipoEnvioClienteFront>>("RecuperarTiposDeEnvios", resultado);
        }
        return resultado;
    }
    public static List<DKbase.web.cCadeteriaRestricciones> RecuperarTodosCadeteriaRestricciones(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.web.cCadeteriaRestricciones> resultado = null;
        if (pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.web.cCadeteriaRestricciones>>("RecuperarTodosCadeteriaRestricciones") == null)
        {
            pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.cCadeteriaRestricciones>>("RecuperarTodosCadeteriaRestricciones", DKbase.Util.RecuperarTodosCadeteriaRestricciones());
        }
        resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.web.cCadeteriaRestricciones>>("RecuperarTodosCadeteriaRestricciones");
        return resultado;
    }
    public static int? get_home_IdOferta(IHttpContextAccessor pHttpContextAccessor)
    {
        int? resultado = pHttpContextAccessor.HttpContext.Session.GetInt32("home_IdOferta");
        return resultado;
    }
    public static int? get_home_IdTransfer(IHttpContextAccessor pHttpContextAccessor)
    {
        int? resultado = pHttpContextAccessor.HttpContext.Session.GetInt32("home_IdTransfer");
        return resultado;
    }
    public static int? get_home_Tipo(IHttpContextAccessor pHttpContextAccessor)
    {
        int? resultado = pHttpContextAccessor.HttpContext.Session.GetInt32("home_Tipo");
        return resultado;
    }
    public static void CargarAccionesEnVariableSession(IHttpContextAccessor pHttpContextAccessor)
    {
        DKbase.web.Usuario user = getSessionUsuario(pHttpContextAccessor);
        if (user != null)
        {
            DKbase.web.ListaAcccionesRol listaAcciones = DKbase.Util.RecuperarTodasAccionesPorIdRol(user.idRol);
            pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.ListaAcccionesRol>("BaseAdmin_PermisosRol", listaAcciones);
        }
    }
    public static string login(IHttpContextAccessor pHttpContextAccessor, string pName, string pPass)
    {
        string IdSuc = "CC";
        string GrupoCliente = "";
        string resultado = null;
        string userAgent = "";//System.Web.HttpContext.Current.Request.UserAgent;
        string ip = "";//System.Web.HttpContext.Current.Server.HtmlEncode(System.Web.HttpContext.Current.Request.UserHostAddress);
        string hostName = "";//System.Web.HttpContext.Current.Request.UserHostName;
        DKbase.web.Usuario user = DKbase.Util.Login(pName, pPass, ip, hostName, userAgent);
        if (user != null)
        {
            if (user.id != -1)
            {
                if (user.usu_estado == DKbase.generales.Constantes.cESTADO_ACTIVO && user.usu_codCliente != null)
                {
                    if (user.idRol == DKbase.generales.Constantes.cROL_ADMINISTRADORCLIENTE || user.idRol == DKbase.generales.Constantes.cROL_OPERADORCLIENTE)
                    {
                        DKbase.web.capaDatos.cClientes oCliente = DKbase.Util.RecuperarClientePorId((int)user.usu_codCliente);
                        pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente", oCliente);
                        if (oCliente != null)
                        {
                            CargarMensajeActualizado(pHttpContextAccessor, oCliente.cli_codigo);
                            pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.Usuario>("clientesDefault_Usuario", user);
                            List<string> listaPermisoDenegados = DKbase.Util.RecuperarSinPermisosSecciones(user.id);
                            pHttpContextAccessor.HttpContext.Session.Set<List<string>>("master_ListaSinPermisoSecciones", listaPermisoDenegados);
                            CargarAccionesEnVariableSession(pHttpContextAccessor);
                            pHttpContextAccessor.HttpContext.Session.Set<bool>("ClientesBase_isLogeo", true);
                            pHttpContextAccessor.HttpContext.Session.Set<bool>("isMostrarOferta", false);
                            resultado = "Ok";
                        }
                        else
                        {
                            resultado = "Error al recuperar el cliente";
                        }
                    }
                    else
                    {
                        if (user.idRol == DKbase.generales.Constantes.cROL_PROMOTOR)
                        {


                            List<DKbase.web.capaDatos.cClientes> clientes = DKbase.Util.spRecuperarTodosClientesByPromotor(user.ApNombre);

                            DKbase.web.capaDatos.cClientes oCliente = DKbase.Util.RecuperarClientePorId((int)clientes[0].cli_codigo);
                            pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente", oCliente);
                            if (oCliente != null)
                            {
                                pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.Usuario>("clientesDefault_Usuario", user);
                                List<string> listaPermisoDenegados = DKbase.Util.RecuperarSinPermisosSecciones(user.id);
                                pHttpContextAccessor.HttpContext.Session.Set<List<string>>("master_ListaSinPermisoSecciones", listaPermisoDenegados);
                                CargarAccionesEnVariableSession(pHttpContextAccessor);
                                pHttpContextAccessor.HttpContext.Session.Set<bool>("ClientesBase_isLogeo", true);
                                pHttpContextAccessor.HttpContext.Session.Set<bool>("isMostrarOferta", false);
                                resultado = "OkPromotor";
                            }
                        }
                        else if (user.idRol == DKbase.generales.Constantes.cROL_ENCGRAL)
                        {
                            List<DKbase.web.capaDatos.cClientes> clientes = DKbase.Util.RecuperarTodosClientes();
                            DKbase.web.capaDatos.cClientes oCliente = DKbase.Util.RecuperarClientePorId((int)clientes[0].cli_codigo);
                            pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente", oCliente);
                            if (oCliente != null)
                            {
                                pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.Usuario>("clientesDefault_Usuario", user);
                                List<string> listaPermisoDenegados = DKbase.Util.RecuperarSinPermisosSecciones(user.id);
                                pHttpContextAccessor.HttpContext.Session.Set<List<string>>("master_ListaSinPermisoSecciones", listaPermisoDenegados);
                                CargarAccionesEnVariableSession(pHttpContextAccessor);
                                pHttpContextAccessor.HttpContext.Session.Set<bool>("ClientesBase_isLogeo", true);
                                pHttpContextAccessor.HttpContext.Session.Set<bool>("isMostrarOferta", false);
                                resultado = "OkPromotor";
                            }
                        }
                        else if (user.idRol == DKbase.generales.Constantes.cROL_ENCSUCURSAL)
                        {
                            IdSuc = pName.Substring(3, 2);
                            List<DKbase.web.capaDatos.cClientes> clientes = DKbase.Util.RecuperarTodosClientesBySucursal(IdSuc);
                            DKbase.web.capaDatos.cClientes oCliente = DKbase.Util.RecuperarClientePorId((int)clientes[0].cli_codigo);
                            pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente", oCliente);
                            if (oCliente != null)
                            {
                                pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.Usuario>("clientesDefault_Usuario", user);
                                List<string> listaPermisoDenegados = DKbase.Util.RecuperarSinPermisosSecciones(user.id);
                                pHttpContextAccessor.HttpContext.Session.Set<List<string>>("master_ListaSinPermisoSecciones", listaPermisoDenegados);
                                CargarAccionesEnVariableSession(pHttpContextAccessor);
                                pHttpContextAccessor.HttpContext.Session.Set<bool>("ClientesBase_isLogeo", true);
                                pHttpContextAccessor.HttpContext.Session.Set<bool>("isMostrarOferta", false);
                                resultado = "OkPromotor";
                            }
                        }
                        else if (user.idRol == DKbase.generales.Constantes.cROL_GRUPOCLIENTE)
                        {
                            GrupoCliente = pName;
                            List<DKbase.web.capaDatos.cClientes> clientes = DKbase.Util.RecuperarTodosClientesByGrupoCliente(GrupoCliente);
                            DKbase.web.capaDatos.cClientes oCliente = DKbase.Util.RecuperarClientePorId((int)clientes[0].cli_codigo);
                            pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente", oCliente);
                            if (oCliente != null)
                            {
                                pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.Usuario>("clientesDefault_Usuario", user);
                                List<string> listaPermisoDenegados = DKbase.Util.RecuperarSinPermisosSecciones(user.id);
                                pHttpContextAccessor.HttpContext.Session.Set<List<string>>("master_ListaSinPermisoSecciones", listaPermisoDenegados);
                                CargarAccionesEnVariableSession(pHttpContextAccessor);
                                pHttpContextAccessor.HttpContext.Session.Set<bool>("ClientesBase_isLogeo", true);
                                pHttpContextAccessor.HttpContext.Session.Set<bool>("isMostrarOferta", false);
                                resultado = "OkPromotor";
                            }
                        }
                        else
                        {
                            resultado = "Usuario con rol sin permiso.";
                        }
                    }
                }
                else
                {
                    if (user.usu_codCliente == null)
                    {
                        resultado = "Usuario no asigando cliente";
                    }
                    else
                    {
                        resultado = "Usuario inactivo";
                    }
                }
            }
            else
            {
                resultado = "Mail o contraseña erróneo";
            }
        }
        else
        {
            resultado = "Error en el servidor";
        }


        return resultado;
    }
    public static bool isPromocionescliente_TIPO(IHttpContextAccessor pHttpContextAccessor)
    {
        bool result = false;
        if (!string.IsNullOrEmpty(pHttpContextAccessor.HttpContext.Session.GetString("promocionescliente_TIPO")) && pHttpContextAccessor.HttpContext.Session.GetString("promocionescliente_TIPO") == "1")
        {
            result = true;
        }
        return result;
    }
    public static DKbase.web.cjSonBuscadorProductos RecuperarProductosBase_V3(IHttpContextAccessor pHttpContextAccessor, int? pIdOferta, string pTxtBuscador, List<string> pListaColumna, bool pIsBuscarConOferta, bool pIsBuscarConTransfer)
    {
        DKbase.web.cjSonBuscadorProductos resultado = null;
        if (!string.IsNullOrEmpty(pTxtBuscador) || pIdOferta != null)
        {
            DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
            DKbase.web.Usuario user = getSessionUsuario(pHttpContextAccessor);
            if (!string.IsNullOrEmpty(pTxtBuscador) && pTxtBuscador.Trim() != string.Empty && oCliente != null)
            {
                DKbase.Util.InsertarPalabraBuscada(pTxtBuscador.ToUpper(), user.id, DKbase.generales.Constantes.cTABLA_PRODUCTO);
            }
            resultado = RecuperarProductosGeneral_V3(pHttpContextAccessor, pIdOferta, pTxtBuscador, pListaColumna, oCliente.cli_tomaOfertas, oCliente.cli_tomaTransfers);
            if (pIsBuscarConOferta || pIsBuscarConTransfer)
            {
                if (resultado != null)
                {
                    if (pIsBuscarConOferta && pIsBuscarConTransfer)
                    {
                        resultado.listaProductos = resultado.listaProductos.Where(x => x.pro_ofeporcentaje > 0 || x.isTieneTransfer || x.isProductoFacturacionDirecta).ToList();
                    }
                    else
                    {
                        if (pIsBuscarConOferta)
                        {
                            resultado.listaProductos = resultado.listaProductos.Where(x => x.pro_ofeporcentaje > 0).ToList();
                        }
                        else if (pIsBuscarConTransfer)
                        {
                            resultado.listaProductos = resultado.listaProductos.Where(x => x.isTieneTransfer || x.isProductoFacturacionDirecta).ToList();
                        }
                    }
                }
            }


        }
        return resultado;
    }
    public static DKbase.web.cjSonBuscadorProductos RecuperarProductosGeneral_V3(IHttpContextAccessor pHttpContextAccessor, int? pIdOferta, string pTxtBuscador, List<string> pListaColumna, bool pIsOrfeta, bool pIsTransfer)
    {
        DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
        List<string> l_Sucursales = RecuperarSucursalesDelCliente(pHttpContextAccessor);
        return DKbase.web.FuncionesPersonalizadas_base.RecuperarProductosGeneral_V3(l_Sucursales, oCliente, pIdOferta, pTxtBuscador, pListaColumna, pIsOrfeta, pIsTransfer); ;
    }
    public static string RecuperarProductos_generarPaginador(IHttpContextAccessor pHttpContextAccessor, DKbase.web.cjSonBuscadorProductos resultado, int pPage)
    {
        int pageSize = DKbase.generales.Constantes.cCantidadFilaPorPagina;
        resultado.CantidadRegistroTotal = resultado.listaProductos.Count;
        if (!DKweb.Controllers.mvcController.isSubirPedido(pHttpContextAccessor) && resultado.listaProductos.Count > DKbase.generales.Constantes.cCantidadFilaPorPagina)
        {
            resultado.listaProductos = resultado.listaProductos.Skip((pPage - 1) * pageSize).Take(pageSize).ToList();
        }
        pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosOrdenar", resultado);
        return DKbase.generales.Serializador_base.SerializarAJson(resultado);
    }
    public static DKbase.web.cjSonBuscadorProductos RecuperarProductosGeneral_OfertaTransfer(IHttpContextAccessor pHttpContextAccessor, bool pIsOrfeta, bool pIsTransfer)
    {
        DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
        List<string> l_Sucursales = RecuperarSucursalesDelCliente(pHttpContextAccessor);
        return DKbase.web.FuncionesPersonalizadas_base.RecuperarProductosGeneral_OfertaTransfer(l_Sucursales, oCliente, pIsOrfeta, pIsTransfer); ;
    }
    public static int BorrarCarrito(IHttpContextAccessor pHttpContextAccessor, string pSucursal, string pTipo, string pAccion)
    {
        DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
        return DKbase.web.capaDatos.capaCAR_base.BorrarCarrito(oCliente.cli_codigo, pSucursal, pTipo, pAccion);
    }
    public static void clearHorarioCierre(IHttpContextAccessor pHttpContextAccessor)
    {
        List<string> l = pHttpContextAccessor.HttpContext.Session.Get<List<string>>("sucursalesDelCliente");
        if (l != null)
        {
            foreach (var itemSucursal in l)
            {
                pHttpContextAccessor.HttpContext.Session.Remove("horario_" + itemSucursal);
                pHttpContextAccessor.HttpContext.Session.Remove("horario_siguiente" + itemSucursal);
            }
        }
    }
    public static string ObtenerHorarioCierre(IHttpContextAccessor pHttpContextAccessor, string pSucursal, string pSucursalDependiente, string pCodigoReparto)
    {
        return getObtenerHorarioCierre(pHttpContextAccessor, pSucursalDependiente);
    }
    public static string ObtenerHorarioCierreAnterior(IHttpContextAccessor pHttpContextAccessor, string pSucursal, string pSucursalDependiente, string pCodigoReparto, string pHorarioCierre)
    {
        string result = string.Empty;
        DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
        string nameSession = "horario_siguiente" + pSucursal;
        string horario_siguiente = pHttpContextAccessor.HttpContext.Session.GetString(nameSession);

        if (horario_siguiente == null)
        {
            pHttpContextAccessor.HttpContext.Session.SetString(nameSession, DKbase.web.FuncionesPersonalizadas_base.ObtenerHorarioCierreAnterior(oCliente, pSucursalDependiente, pHorarioCierre));
        }
        horario_siguiente = pHttpContextAccessor.HttpContext.Session.GetString(nameSession);
        if (horario_siguiente != null)
        {
            result = horario_siguiente;
            DateTime? fechaHorarioCierre = DKbase.web.FuncionesPersonalizadas_base.getFecha_Horario(getObtenerHorarioCierre(pHttpContextAccessor, pSucursal));
            DateTime? fechaGuarda = DKbase.web.FuncionesPersonalizadas_base.getFecha_Horario(result);
            if (fechaHorarioCierre != null && fechaGuarda != null && fechaGuarda.Value < fechaHorarioCierre.Value)
            {
                pHttpContextAccessor.HttpContext.Session.SetString(nameSession, DKbase.web.FuncionesPersonalizadas_base.ObtenerHorarioCierreAnterior(oCliente, pSucursalDependiente, pHorarioCierre));
                result = pHttpContextAccessor.HttpContext.Session.GetString(nameSession);
            }
        }
        return result;
    }
    public static DKbase.web.capaDatos.cOferta RecuperarOfertaPorId(int pIdOferta)
    {
        DKbase.web.capaDatos.cOferta resultado = null;
        System.Data.DataTable tabla = DKbase.web.capaDatos.capaHome_base.RecuperarOfertaPorId(pIdOferta);
        if (tabla != null && tabla.Rows.Count > 0)
            resultado = DKbase.web.capaDatos.capaHome_base.ConvertToOferta(tabla.Rows[0]);
        return resultado;
    }
}