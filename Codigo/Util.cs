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
    public static void clientesDefault_Cliente_Set(IHttpContextAccessor pHttpContextAccessor, DKbase.web.capaDatos.cClientes pCliente)
    {
        pHttpContextAccessor.HttpContext.Session.Set<DKbase.web.capaDatos.cClientes>("clientesDefault_Cliente", pCliente);
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
    public static void isMostrarOferta_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.SetString("isMostrarOferta", pValue);
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
            string strObtenerHorarioCierre = DKbase.web.FuncionesPersonalizadas_base.ObtenerHorarioCierre(oCliente, oCliente.cli_codsuc, pSucursal, oCliente.cli_codrep);
            if (strObtenerHorarioCierre != null)
            {
                pHttpContextAccessor.HttpContext.Session.SetString(nameSession, strObtenerHorarioCierre);
            }
        }
        if (pHttpContextAccessor.HttpContext.Session.GetString(nameSession) != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.GetString(nameSession);
            DateTime? fechaGuarda = DKbase.web.FuncionesPersonalizadas_base.getFecha_Horario(result);
            if (fechaGuarda != null && fechaGuarda.Value < DateTime.Now)
            {
                string strObtenerHorarioCierre_2 = DKbase.web.FuncionesPersonalizadas_base.ObtenerHorarioCierre(oCliente, oCliente.cli_codsuc, pSucursal, oCliente.cli_codrep);
                if (strObtenerHorarioCierre_2 != null)
                {
                    pHttpContextAccessor.HttpContext.Session.SetString(nameSession, strObtenerHorarioCierre_2);
                    result = pHttpContextAccessor.HttpContext.Session.GetString(nameSession);
                }
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
    public static void set_home_IdOferta(IHttpContextAccessor pHttpContextAccessor, int pValue)
    {
        pHttpContextAccessor.HttpContext.Session.SetInt32("home_IdOferta", pValue);
    }
    public static void set_home_IdTransfer(IHttpContextAccessor pHttpContextAccessor, int pValue)
    {
        pHttpContextAccessor.HttpContext.Session.SetInt32("home_IdTransfer", pValue);
    }
    public static void set_home_Tipo(IHttpContextAccessor pHttpContextAccessor, int pValue)
    {
        pHttpContextAccessor.HttpContext.Session.SetInt32("home_Tipo", pValue);

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
        string userAgent = string.Empty;
        string ip = string.Empty;
        string hostName = string.Empty;
        /* try
         {*/
        userAgent = pHttpContextAccessor.HttpContext.Request.Headers["User-Agent"].ToString();
        ip = pHttpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
        hostName = pHttpContextAccessor.HttpContext.Request.Host.Host;
        /*  }
          catch (System.Exception ex)
          {
              DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
          }*/
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
        try
        {
            DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
            if (!string.IsNullOrEmpty(pTxtBuscador) || pIdOferta != null || oCliente != null)
            {

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
        }
        catch (Exception ex)
        {
            DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
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
            string horarioCierre = DKbase.web.FuncionesPersonalizadas_base.ObtenerHorarioCierreAnterior(oCliente, pSucursalDependiente, pHorarioCierre);
            if (!string.IsNullOrEmpty(horarioCierre))
            {
                pHttpContextAccessor.HttpContext.Session.SetString(nameSession, horarioCierre);
            }
        }
        horario_siguiente = pHttpContextAccessor.HttpContext.Session.GetString(nameSession);
        if (horario_siguiente != null)
        {
            result = horario_siguiente;
            DateTime? fechaHorarioCierre = DKbase.web.FuncionesPersonalizadas_base.getFecha_Horario(getObtenerHorarioCierre(pHttpContextAccessor, pSucursal));
            DateTime? fechaGuarda = DKbase.web.FuncionesPersonalizadas_base.getFecha_Horario(result);
            if (fechaHorarioCierre != null && fechaGuarda != null && fechaGuarda.Value <= fechaHorarioCierre.Value)
            {
                string horarioCierre_2 = DKbase.web.FuncionesPersonalizadas_base.ObtenerHorarioCierreAnterior(oCliente, pSucursalDependiente, pHorarioCierre);
                if (!string.IsNullOrEmpty(horarioCierre_2))
                {
                    pHttpContextAccessor.HttpContext.Session.SetString(nameSession, horarioCierre_2);
                    result = pHttpContextAccessor.HttpContext.Session.GetString(nameSession);
                }
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
    public static bool AgregarProductosTransfersAlCarrito(List<DKbase.web.capaDatos.cProductosAndCantidad> pListaProductosMasCantidad, int pIdCliente, int pIdUsuario, int pIdTransfers, string pCodSucursal, string pTipo)
    {
        System.Data.DataTable pTablaDetalle = DKbase.web.FuncionesPersonalizadas_base.ConvertProductosAndCantidadToDataTable(pListaProductosMasCantidad);
        return DKbase.web.capaDatos.capaCAR_base.AgregarProductosTransfersAlCarrito(pTablaDetalle, pIdCliente, pIdUsuario, pIdTransfers, pCodSucursal, pTipo);
    }
    public static List<DKbase.web.capaDatos.cSucursalCarritoTransfer> RecuperarCarritosTransfer_generico(IHttpContextAccessor pHttpContextAccessor, DKbase.web.capaDatos.cClientes pCliente, string pTipo)
    {
        List<DKbase.web.capaDatos.cSucursalCarritoTransfer> result = null;
        result = DKbase.web.capaDatos.capaCAR_WebService_base.RecuperarCarritosTransferPorIdClienteOrdenadosPorSucursal(pCliente, pTipo);
        if (result != null)
        {
            foreach (var item in result)
            {
                item.proximoHorarioEntrega = getObtenerHorarioCierre(pHttpContextAccessor, item.Sucursal);
            }
        }
        return result;
    }
    public static DKbase.web.capaDatos.cSucursalCarritoTransfer RecuperarCarritosTransferPorCliente_generico(IHttpContextAccessor pHttpContextAccessor, DKbase.web.capaDatos.cClientes pCliente, string pTipo, string pIdSucursal)
    {
        return RecuperarCarritosTransfer_generico(pHttpContextAccessor, pCliente, pTipo).Where(x => x.Sucursal == pIdSucursal).FirstOrDefault();
    }
    public static bool subirpedido_isRepetido(IHttpContextAccessor pHttpContextAccessor)
    {
        bool result = false;
        if (pHttpContextAccessor.HttpContext.Session.Get<Boolean?>("subirpedido_isRepetido") != null && pHttpContextAccessor.HttpContext.Session.Get<Boolean>("subirpedido_isRepetido"))
        {
            result = true;

        }
        return result;
    }
    public static void subirpedido_isRepetido_null(IHttpContextAccessor pHttpContextAccessor)
    {
        //pHttpContextAccessor.HttpContext.Session.SetString("ClientesBase_isLogeo", null);
        pHttpContextAccessor.HttpContext.Session.Remove("subirpedido_isRepetido");
    }
    public static void subirpedido_isRepetido_true(IHttpContextAccessor pHttpContextAccessor)
    {
        pHttpContextAccessor.HttpContext.Session.Set<Boolean>("subirpedido_isRepetido", true);
    }
    public static DKbase.web.cjSonBuscadorProductos RecuperarProductosGeneralSubirPedidos(IHttpContextAccessor pHttpContextAccessor, List<DKbase.web.capaDatos.cProductosGenerico> pListaProveedor)
    {
        DKbase.web.capaDatos.cClientes oCliente = getSessionCliente(pHttpContextAccessor);
        string SucursalEleginda = pHttpContextAccessor.HttpContext.Session.GetString("subirpedido_SucursalEleginda");
        List<string> l_Sucursales = RecuperarSucursalesDelCliente(pHttpContextAccessor);
        List<DKbase.web.capaDatos.cProductosGenerico> listaProductosBuscador = DKbase.web.FuncionesPersonalizadas_base.ActualizarStockListaProductos_SubirArchico(oCliente, l_Sucursales, pListaProveedor, SucursalEleginda);
        DKbase.web.cjSonBuscadorProductos ResultadoObj = new DKbase.web.cjSonBuscadorProductos();
        ResultadoObj.listaSucursal = l_Sucursales;
        ResultadoObj.listaProductos = listaProductosBuscador;
        return ResultadoObj;
    }
    public static List<DKbase.web.capaDatos.cProductosGenerico> subirpedido_ListaProductos(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.web.capaDatos.cProductosGenerico> result = null;
        if (pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.web.capaDatos.cProductosGenerico>>("subirpedido_ListaProductos") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.web.capaDatos.cProductosGenerico>>("subirpedido_ListaProductos");
        }
        return result;
    }
    public static void updatePedidosBuscador_productosTodos(IHttpContextAccessor pHttpContextAccessor, DKbase.web.cjSonBuscadorProductos pObj, int pPage)
    {
        pHttpContextAccessor?.HttpContext?.Session.Set<DKbase.web.cjSonBuscadorProductos>("PedidosBuscador_productosTodos", new DKbase.web.cjSonBuscadorProductos(pObj));
        pHttpContextAccessor?.HttpContext?.Session.SetInt32("PedidosBuscador_pPage", pPage);
    }
    public static void subirpedido_ListaProductos_Get(IHttpContextAccessor pHttpContextAccessor, List<DKbase.web.capaDatos.cProductosGenerico> ListaProductos)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.web.capaDatos.cProductosGenerico>>("subirpedido_ListaProductos", ListaProductos);
    }
    public static void estadopedidos_Resultado_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cDllPedido> pListaDllPedido)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cDllPedido>>("estadopedidos_Resultado", pListaDllPedido);
    }
    public static List<DKbase.dll.cDllPedido> estadopedidos_Resultado(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cDllPedido> result = null;
        if (pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cDllPedido>>("estadopedidos_Resultado") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cDllPedido>>("estadopedidos_Resultado");
        }
        return result;
    }
    public static List<DKbase.dll.cDllPedido> estadopedidos_ListaPendienteDeFacturar(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cDllPedido> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.dll.cDllPedido>>("estadopedidos_ListaPendienteDeFacturar") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cDllPedido>>("estadopedidos_ListaPendienteDeFacturar");
        }
        return resultado;
    }
    public static void estadopedidos_ListaPendienteDeFacturar_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cDllPedido> pListaDllPedido)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cDllPedido>>("estadopedidos_ListaPendienteDeFacturar", pListaDllPedido);
    }
    public static List<DKbase.dll.cDllPedido> estadopedidos_ListaEnPreparacion(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cDllPedido> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.dll.cDllPedido>>("estadopedidos_ListaEnPreparacion") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cDllPedido>>("estadopedidos_ListaEnPreparacion");
        }
        return resultado;
    }
    public static void estadopedidos_ListaEnPreparacion_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cDllPedido> pListaDllPedido)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cDllPedido>>("estadopedidos_ListaEnPreparacion", pListaDllPedido);
    }
    public static void clientes_pages_Recuperador_Tipo_Set(IHttpContextAccessor pHttpContextAccessor, int pTipo)
    {
        pHttpContextAccessor.HttpContext.Session.SetInt32("clientes_pages_Recuperador_Tipo", pTipo);
    }
    public static int? clientes_pages_Recuperador_Tipo(IHttpContextAccessor pHttpContextAccessor)
    {
        int? result = null;
        if (pHttpContextAccessor.HttpContext.Session.GetInt32("clientes_pages_Recuperador_Tipo") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.GetInt32("clientes_pages_Recuperador_Tipo").Value;
        }
        return result;
    }
    public static void clientes_pages_Recuperador_CantidadDia_Set(IHttpContextAccessor pHttpContextAccessor, int pTipo)
    {
        pHttpContextAccessor.HttpContext.Session.SetInt32("clientes_pages_Recuperador_CantidadDia", pTipo);
    }
    public static int? clientes_pages_Recuperador_CantidadDia(IHttpContextAccessor pHttpContextAccessor)
    {
        int? result = null;
        if (pHttpContextAccessor.HttpContext.Session.GetInt32("clientes_pages_Recuperador_CantidadDia") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.GetInt32("clientes_pages_Recuperador_CantidadDia").Value;
        }
        return result;
    }
    public static List<DKbase.web.capaDatos.cCarritoTransfer> RecuperarCarritosTransferPorIdCliente(IHttpContextAccessor pHttpContextAccessor, DKbase.web.capaDatos.cClientes pCliente, string pTipo, string pIdSucursal)
    {
        DKbase.web.capaDatos.cSucursalCarritoTransfer o = RecuperarCarritosTransferPorCliente_generico(pHttpContextAccessor, pCliente, pTipo, pIdSucursal);
        return o == null ? null : o.listaTransfer;
    }
    public static Boolean clientes_pages_reservavacunas_SinTroquel(IHttpContextAccessor pHttpContextAccessor)
    {
        Boolean result = false;
        if (pHttpContextAccessor.HttpContext.Session.Get<Boolean>("clientes_pages_reservavacunas_SinTroquel") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.Get<Boolean>("clientes_pages_reservavacunas_SinTroquel");
        }
        return result;
    }
    public static string cssActive(IHttpContextAccessor pHttpContextAccessor, string name)
    {
        string result = string.Empty;
        string strController = pHttpContextAccessor.HttpContext.GetRouteValue("action").ToString().ToLower();
        if (strController == name)
            result = " active ";
        return result;
    }
    public static string htmlCssBody(IHttpContextAccessor pHttpContextAccessor)
    {
        if (pHttpContextAccessor.HttpContext.Session.GetString("homeBodyCss") != null)
            return pHttpContextAccessor.HttpContext.Session.GetString("homeBodyCss");
        else
            return "bd_home";
    }
    public static void htmlCssBodySet(IHttpContextAccessor pHttpContextAccessor, string pCss)
    {
        pHttpContextAccessor.HttpContext.Session.SetString("homeBodyCss", pCss);
    }
    public static string hrefLinkSucursalesMobile(IHttpContextAccessor pHttpContextAccessor)
    {
        string result = string.Empty;
        string strController = pHttpContextAccessor.HttpContext.GetRouteValue("action").ToString().ToLower();
        if (strController == "index")
            result = "../home/index#idFooter";
        else
            result = "../home/index#idFooter";
        return result;
    }
    public static string htmlPublicarRevista(IHttpContextAccessor pHttpContextAccessor)
    {
        string result = string.Empty;
        if (pHttpContextAccessor.HttpContext.Session.GetString("homeIndex_Revista") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.GetString("homeIndex_Revista");
        }
        return result;
    }
    public static void first_htmlPublicarRevista(IHttpContextAccessor pHttpContextAccessor)
    {
        DKbase.web.capaDatos.cCatalogo o = DKbase.Util.RecuperarTodoCatalogo_PublicarHome();
        if (o != null)
        {
            DKbase.web.capaDatos.cArchivo oArchivo = DKbase.Util.RecuperarTodosArchivos(o.tbc_codigo, DKbase.generales.Constantes.cTABLA_CATALOGO, string.Empty).FirstOrDefault();
            if (oArchivo != null)
            {
                var str_homeIndex_Revista = "<a  class=\"pdf\" target =\"_blank\" href =\"../../" + "servicios/descargarArchivo?t=" + DKbase.generales.Constantes.cTABLA_CATALOGO + "&n=" + oArchivo.arc_nombre + "&inline=yes" + "\" >DESCARGAR</a>";
                pHttpContextAccessor.HttpContext.Session.SetString("homeIndex_Revista", str_homeIndex_Revista);
                var str_href_Revista = "href =\"../../" + "servicios/descargarArchivo?t=" + DKbase.generales.Constantes.cTABLA_CATALOGO + "&n=" + oArchivo.arc_nombre + "&inline=yes" + "\"";
                pHttpContextAccessor.HttpContext.Session.SetString("href_Revista", str_href_Revista);

            }
        }
    }
    public static void promociones_isNuevoLanzamiento_Set(IHttpContextAccessor pHttpContextAccessor, bool pIsNuevoLanzamiento)
    {
        pHttpContextAccessor.HttpContext.Session.Set<bool>("promociones_isNuevoLanzamiento", pIsNuevoLanzamiento);
    }
    public static bool promociones_isNuevoLanzamiento(IHttpContextAccessor pHttpContextAccessor)
    {
        bool result = false;
        if (pHttpContextAccessor.HttpContext.Session.Get<bool>("promociones_isNuevoLanzamiento") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.Get<bool>("promociones_isNuevoLanzamiento");
        }
        return result;
    }
    public static void lanzamiento_idOferta_Set(IHttpContextAccessor pHttpContextAccessor, int pId)
    {
        pHttpContextAccessor.HttpContext.Session.Set<int>("lanzamiento_idOferta", pId);
    }
    public static int lanzamiento_idOferta(IHttpContextAccessor pHttpContextAccessor)
    {
        int result = 0;
        if (pHttpContextAccessor.HttpContext.Session.Get<int>("lanzamiento_idOferta") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.Get<int>("lanzamiento_idOferta");
        }
        return result;
    }
    public static string hrefLinkSucursales(IHttpContextAccessor pHttpContextAccessor)
    {
        string result = string.Empty;//, string name
        string strController = pHttpContextAccessor.HttpContext.GetRouteValue("action").ToString().ToLower();
        if (strController == "index")
        {
            result = "#sucursales";
        }
        else
        {
            result = @"../home/index#sucursales";
        }
        return result;
    }
    public static void action_id_Set(IHttpContextAccessor pHttpContextAccessor, int pAction_id)
    {
        pHttpContextAccessor.HttpContext.Session.Set<int>("action_id", pAction_id);
    }
    public static int action_id(IHttpContextAccessor pHttpContextAccessor)
    {
        int result = 0;
        if (pHttpContextAccessor.HttpContext.Session.Get<int>("action_id") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.Get<int>("action_id");
        }
        return result;
    }

    public static void recall_id_Set(IHttpContextAccessor pHttpContextAccessor, int pAction_id)
    {
        pHttpContextAccessor.HttpContext.Session.Set<int>("recall_id", pAction_id);
    }
    public static int recall_id(IHttpContextAccessor pHttpContextAccessor)
    {
        int result = 0;
        if (pHttpContextAccessor.HttpContext.Session.Get<int>("recall_id") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.Get<int>("recall_id");
        }
        return result;
    }
    public static string contactocv_result(IHttpContextAccessor pHttpContextAccessor)
    {
        string result = null;
        if (pHttpContextAccessor.HttpContext.Session.Get<string>("contactocv_result") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.Get<string>("contactocv_result");
        }
        return result;
    }
    public static void contactocv_result_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<string>("contactocv_result", pValue);
    }
    public static string registracion_msg(IHttpContextAccessor pHttpContextAccessor)
    {
        string result = null;
        if (pHttpContextAccessor.HttpContext.Session.Get<string>("registracion_msg") != null)
        {
            result = pHttpContextAccessor.HttpContext.Session.Get<string>("registracion_msg");
        }
        return result;
    }
    public static void registracion_msg_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<string>("registracion_msg", pValue);
    }
    public static string perfil_CambiarContraseña(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.GetString("perfil_CambiarContraseña") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.GetString("perfil_CambiarContraseña");
        }
        return resultado;
    }
    public static void perfil_CambiarContraseña_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<string>("perfil_CambiarContraseña", pValue);
    }
    public static string perfil_idContraseniaVieja(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.GetString("perfil_idContraseniaVieja") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.GetString("perfil_idContraseniaVieja");
        }
        return resultado;
    }
    public static void perfil_idContraseniaVieja_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<string>("perfil_idContraseniaVieja", pValue);
    }
    public static string perfil_idContraseniaNueva(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.GetString("perfil_idContraseniaNueva") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.GetString("perfil_idContraseniaNueva");
        }
        return resultado;
    }
    public static void perfil_idContraseniaNueva_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<string>("perfil_idContraseniaNueva", pValue);
    }
    public static string clientes_pages_Documento_ID(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.GetString("clientes_pages_Documento_ID") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.GetString("clientes_pages_Documento_ID");
        }
        return resultado;
    }
    public static void clientes_pages_Documento_ID_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.SetString("clientes_pages_Documento_ID", pValue);
    }
    public static string clientes_pages_Documento_TIPO(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.GetString("clientes_pages_Documento_TIPO") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.GetString("clientes_pages_Documento_TIPO");
        }
        return resultado;
    }
    public static void clientes_pages_Documento_TIPO_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.SetString("clientes_pages_Documento_TIPO", pValue);
    }
    public static string getAbsoluteUri(HttpRequest pHttpRequest)
    {
        var uriBuilder = new UriBuilder(pHttpRequest.Scheme, pHttpRequest.Host.Host, pHttpRequest.Host.Port ?? -1);
        if (uriBuilder.Uri.IsDefaultPort)
        {
            uriBuilder.Port = -1;
        }
        var baseUri = uriBuilder.Uri.AbsoluteUri;
        return baseUri;
    }
    public static List<DKbase.dll.cCtaCteMovimiento> CompocisionSaldo_ResultadoMovimientosDeCuentaCorriente(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cCtaCteMovimiento> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.dll.cCtaCteMovimiento>>("CompocisionSaldo_ResultadoMovimientosDeCuentaCorriente") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cCtaCteMovimiento>>("CompocisionSaldo_ResultadoMovimientosDeCuentaCorriente");
        }
        return resultado;
    }
    public static void CompocisionSaldo_ResultadoMovimientosDeCuentaCorriente_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cCtaCteMovimiento> pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cCtaCteMovimiento>>("CompocisionSaldo_ResultadoMovimientosDeCuentaCorriente", pValue);
    }
    public static String composicionsaldoCtaCte_menu(IHttpContextAccessor pHttpContextAccessor)
    {
        String resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<String>("composicionsaldoCtaCte_menu") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<String>("composicionsaldoCtaCte_menu");
        }
        return resultado;
    }
    public static void composicionsaldoCtaCte_menu_Set(IHttpContextAccessor pHttpContextAccessor, String pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<String>("composicionsaldoCtaCte_menu", pValue);
    }
    public static List<DKbase.dll.cCtaCteMovimiento> deudaVencida(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cCtaCteMovimiento> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.dll.cCtaCteMovimiento>>("deudaVencida") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cCtaCteMovimiento>>("deudaVencida");
        }
        return resultado;
    }
    public static void deudaVencida_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cCtaCteMovimiento> pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cCtaCteMovimiento>>("deudaVencida", pValue);
    }
    public static List<DKbase.dll.cCtaCteMovimiento> saldoSinImputar(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cCtaCteMovimiento> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.dll.cCtaCteMovimiento>>("saldoSinImputar") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cCtaCteMovimiento>>("saldoSinImputar");
        }
        return resultado;
    }
    public static void saldoSinImputar_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cCtaCteMovimiento> pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cCtaCteMovimiento>>("saldoSinImputar", pValue);
    }
    public static List<DKbase.dll.cConsObraSocial> ObrasSociales_EntreFechas(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cConsObraSocial> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.dll.cConsObraSocial>>("ObrasSociales_EntreFechas") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cConsObraSocial>>("ObrasSociales_EntreFechas");
        }
        return resultado;
    }
    public static void ObrasSociales_EntreFechas_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cConsObraSocial> pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cConsObraSocial>>("ObrasSociales_EntreFechas", pValue);
    }
    public static List<DKbase.dll.cComprobanteDiscriminado> ConsultaDeComprobantes_ComprobantesEntreFecha(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cComprobanteDiscriminado> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.dll.cComprobanteDiscriminado>>("ConsultaDeComprobantes_ComprobantesEntreFecha") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cComprobanteDiscriminado>>("ConsultaDeComprobantes_ComprobantesEntreFecha");
        }
        return resultado;
    }
    public static void ConsultaDeComprobantes_ComprobantesEntreFecha_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cComprobanteDiscriminado> pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cComprobanteDiscriminado>>("ConsultaDeComprobantes_ComprobantesEntreFecha", pValue);
    }
    public static List<string> ConsultaDeComprobantes_tipoComprobante(IHttpContextAccessor pHttpContextAccessor)
    {
        List<string> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<string>>("ConsultaDeComprobantes_tipoComprobante") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<string>>("ConsultaDeComprobantes_tipoComprobante");
        }
        return resultado;
    }
    public static void ConsultaDeComprobantes_tipoComprobante_Set(IHttpContextAccessor pHttpContextAccessor, List<string> pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<string>>("ConsultaDeComprobantes_tipoComprobante", pValue);
    }
    public static string clientes_pages_descargaResumenes_NumeroResumen(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<string>("clientes_pages_descargaResumenes_NumeroResumen") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<string>("clientes_pages_descargaResumenes_NumeroResumen");
        }
        return resultado;
    }
    public static void clientes_pages_descargaResumenes_NumeroResumen_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<string>("clientes_pages_descargaResumenes_NumeroResumen", pValue);
    }
    public static List<DKbase.dll.cCbteParaImprimir> clientes_pages_descargaResumenes_listaComprobantesAImprimir(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cCbteParaImprimir> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.dll.cCbteParaImprimir>>("clientes_pages_descargaResumenes_listaComprobantesAImprimir") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cCbteParaImprimir>>("clientes_pages_descargaResumenes_listaComprobantesAImprimir");
        }
        return resultado;
    }
    public static void clientes_pages_descargaResumenes_listaComprobantesAImprimir_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cCbteParaImprimir> pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cCbteParaImprimir>>("clientes_pages_descargaResumenes_listaComprobantesAImprimir", pValue);
    }
    public static List<DKbase.dll.cComprobantesDiscriminadosDePuntoDeVenta> comprobantescompleto_Lista(IHttpContextAccessor pHttpContextAccessor)
    {
        List<DKbase.dll.cComprobantesDiscriminadosDePuntoDeVenta> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<DKbase.dll.cComprobantesDiscriminadosDePuntoDeVenta>>("comprobantescompleto_Lista") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<DKbase.dll.cComprobantesDiscriminadosDePuntoDeVenta>>("comprobantescompleto_Lista");
        }
        return resultado;
    }
    public static void comprobantescompleto_Lista_Set(IHttpContextAccessor pHttpContextAccessor, List<DKbase.dll.cComprobantesDiscriminadosDePuntoDeVenta> pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<DKbase.dll.cComprobantesDiscriminadosDePuntoDeVenta>>("comprobantescompleto_Lista", pValue);
    }
    public static DateTime? comprobantescompleto_FechaDesde(IHttpContextAccessor pHttpContextAccessor)
    {
        DateTime? resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<DateTime>("comprobantescompleto_FechaDesde") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<DateTime>("comprobantescompleto_FechaDesde");
        }
        return resultado;
    }
    public static void comprobantescompleto_FechaDesde_Set(IHttpContextAccessor pHttpContextAccessor, DateTime pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<DateTime>("comprobantescompleto_FechaDesde", pValue);
    }
    public static DateTime? comprobantescompleto_FechaHasta(IHttpContextAccessor pHttpContextAccessor)
    {
        DateTime? resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<DateTime>("comprobantescompleto_FechaHasta") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<DateTime>("comprobantescompleto_FechaHasta");
        }
        return resultado;
    }
    public static void comprobantescompleto_FechaHasta_Set(IHttpContextAccessor pHttpContextAccessor, DateTime pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<DateTime>("comprobantescompleto_FechaHasta", pValue);
    }
    public static string GrabarComprobantesDiscriminadoCSV(IHttpContextAccessor pHttpContextAccessor, string pRuta)
    {
        string resultado = string.Empty;
        List<DKbase.dll.cComprobantesDiscriminadosDePuntoDeVenta> resultadoObjLista = comprobantescompleto_Lista(pHttpContextAccessor);
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(pHttpContextAccessor);
        DateTime? fechaDesde = comprobantescompleto_FechaDesde(pHttpContextAccessor);
        DateTime? fechaHasta = comprobantescompleto_FechaHasta(pHttpContextAccessor);

        if (resultadoObjLista != null && fechaDesde != null && fechaHasta != null && oCliente != null)
        {
            string nombreArchivoCSV = string.Empty;
            string fechaArchivoCSV = fechaDesde.Value.Year.ToString().Substring(2, 2) + fechaDesde.Value.Month.ToString("00") + fechaDesde.Value.Day.ToString("00") + "A" + fechaHasta.Value.Year.ToString().Substring(2, 2) + fechaHasta.Value.Month.ToString("00") + fechaHasta.Value.Day.ToString("00");
            nombreArchivoCSV = oCliente.cli_login + "-Comprobantes" + fechaArchivoCSV + ".csv";
            resultado = nombreArchivoCSV;
            System.IO.StreamWriter FAC_txt = new System.IO.StreamWriter(System.IO.Path.Combine(pRuta, nombreArchivoCSV), false, System.Text.Encoding.UTF8);

            string strCabeceraCSV = string.Empty;

            strCabeceraCSV += "Fecha";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Comprobante";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Número Comprobante";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Monto Exento";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Monto Gravado";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Monto Iva Inscripto";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Monto Iva No Inscripto";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Monto Percepciones DGR";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Monto Percepciones Municipal";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Monto Percepcion IVA";
            strCabeceraCSV += ";";
            strCabeceraCSV += "Monto Total";
            FAC_txt.WriteLine(strCabeceraCSV);
            for (int i = 0; i < resultadoObjLista.Count; i++)
            {
                string detalleCSV = string.Empty;
                detalleCSV += resultadoObjLista[i].FechaToString;
                detalleCSV += ";";
                detalleCSV += resultadoObjLista[i].Comprobante;
                detalleCSV += ";";
                detalleCSV += resultadoObjLista[i].NumeroComprobante;
                detalleCSV += ";";
                detalleCSV += DKbase.generales.Numerica.FormatoNumeroPuntoMilesComaDecimal(resultadoObjLista[i].MontoExento);
                detalleCSV += ";";
                detalleCSV += DKbase.generales.Numerica.FormatoNumeroPuntoMilesComaDecimal(resultadoObjLista[i].MontoGravado);
                detalleCSV += ";";
                detalleCSV += DKbase.generales.Numerica.FormatoNumeroPuntoMilesComaDecimal(resultadoObjLista[i].MontoIvaInscripto);
                detalleCSV += ";";
                detalleCSV += DKbase.generales.Numerica.FormatoNumeroPuntoMilesComaDecimal(resultadoObjLista[i].MontoIvaNoInscripto);
                detalleCSV += ";";
                detalleCSV += DKbase.generales.Numerica.FormatoNumeroPuntoMilesComaDecimal(resultadoObjLista[i].MontoPercepcionesDGR);
                detalleCSV += ";";
                detalleCSV += DKbase.generales.Numerica.FormatoNumeroPuntoMilesComaDecimal(resultadoObjLista[i].MontoPercepcionesMunicipal);
                detalleCSV += ";";
                detalleCSV += DKbase.generales.Numerica.FormatoNumeroPuntoMilesComaDecimal(resultadoObjLista[i].MontoPercepcionIVA);
                detalleCSV += ";";
                detalleCSV += DKbase.generales.Numerica.FormatoNumeroPuntoMilesComaDecimal(resultadoObjLista[i].MontoTotal);
                FAC_txt.WriteLine(detalleCSV);
            }
            FAC_txt.Close();

        }

        return resultado;
    }
    public static string Cliente_NumeroDevolucion(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.GetString("Cliente_NumeroDevolucion") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.GetString("Cliente_NumeroDevolucion");
        }
        return resultado;
    }
    public static void Cliente_NumeroDevolucion_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.SetString("Cliente_NumeroDevolucion", pValue);
    }
    //
    public static string Cliente_CartelImprimir(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.GetString("Cliente_CartelImprimir") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.GetString("Cliente_CartelImprimir");
        }
        return resultado;
    }
    public static void Cliente_CartelImprimir_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.SetString("Cliente_CartelImprimir", pValue);
    }
    public static List<object> ConsultaDeComprobantes_NumerosDeComprobantes(IHttpContextAccessor pHttpContextAccessor)
    {
        List<object> resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.Get<List<object>>("ConsultaDeComprobantes_NumerosDeComprobantes") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.Get<List<object>>("ConsultaDeComprobantes_NumerosDeComprobantes");
        }
        return resultado;
    }
    public static void ConsultaDeComprobantes_NumerosDeComprobantes_Set(IHttpContextAccessor pHttpContextAccessor, List<object> pValue)
    {
        pHttpContextAccessor.HttpContext.Session.Set<List<object>>("ConsultaDeComprobantes_NumerosDeComprobantes", pValue);
    }
    public static string RespuestaConsultaDeComprobantes_TIPO(IHttpContextAccessor pHttpContextAccessor)
    {
        string resultado = null;
        if (pHttpContextAccessor.HttpContext?.Session.GetString("RespuestaConsultaDeComprobantes_TIPO") != null)
        {
            resultado = pHttpContextAccessor.HttpContext.Session.GetString("RespuestaConsultaDeComprobantes_TIPO");
        }
        return resultado;
    }
    public static void RespuestaConsultaDeComprobantes_TIPO_Set(IHttpContextAccessor pHttpContextAccessor, string pValue)
    {
        pHttpContextAccessor.HttpContext.Session.SetString("RespuestaConsultaDeComprobantes_TIPO", pValue);
    }
    public static string grabarComprobastesTXT(IHttpContextAccessor pHttpContextAccessor, List<object> pLista, List<DKbase.dll.cComprobanteDiscriminado> pLista2)
    {
        string resultado = string.Empty;
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(pHttpContextAccessor);

        if (pLista != null && oCliente != null)
        {
            string ruta = System.IO.Path.Combine(DKbase.Helper.getFolder, "archivos", "comprobantes");
            DirectoryInfo DIR = new DirectoryInfo(ruta);
            if (!DIR.Exists)
            {
                DIR.Create();
            }
            string nombreArchivoCSV = string.Empty;
            DateTime? fechaDesde = comprobantescompleto_FechaDesde(pHttpContextAccessor);
            DateTime? fechaHasta = comprobantescompleto_FechaHasta(pHttpContextAccessor);
            string fechaArchivoCSV = fechaDesde.Value.Year.ToString().Substring(2, 2) + fechaDesde.Value.Month.ToString("00") + fechaDesde.Value.Day.ToString("00") + "A" + fechaHasta.Value.Year.ToString().Substring(2, 2) + fechaHasta.Value.Month.ToString("00") + fechaHasta.Value.Day.ToString("00");
            nombreArchivoCSV = oCliente.cli_login + "-Comprobantes" + fechaArchivoCSV + ".txt";
            resultado = nombreArchivoCSV;
            System.IO.StreamWriter FAC_txt = new System.IO.StreamWriter(System.IO.Path.Combine(ruta, nombreArchivoCSV), false, System.Text.Encoding.UTF8);

            for (int i = 0; i < pLista.Count; i++)
            {
                DKbase.dll.cFactura objFactura = DKbase.Util.ObtenerFactura(pLista[i].ToString(), oCliente.cli_login);
                string strCabeceraFAC = string.Empty;
                // identificación cabecera
                strCabeceraFAC += "C-";
                // número C(13) 
                strCabeceraFAC += objFactura.Numero.PadRight(13, ' ');
                // Fecha
                if (objFactura.Fecha != null)
                {
                    strCabeceraFAC += ((DateTime)objFactura.Fecha).Day.ToString("00") + ((DateTime)objFactura.Fecha).Month.ToString("00") + ((DateTime)objFactura.Fecha).Year.ToString("0000");
                }
                else
                {
                    strCabeceraFAC += "00" + "00" + "0000";
                }
                // fin fecha
                //monto total N(10) [1]        
                string montoTotal = string.Empty;
                montoTotal += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.MontoTotal);
                strCabeceraFAC += montoTotal;
                // fin monto total N(10) [1] 

                //4 monto exento N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.MontoExento);
                //5 monto gravado N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.MontoGravado);
                //6 monto IVA inscripto N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.MontoIvaInscripto);
                //7 monto IVA no inscripto N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.MontoIvaNoInscripto);
                //8 monto percepción DGR N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.MontoPercepcionDGR);
                //9 descuento especial N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.DescuentoEspecial);
                //10 descuento netos N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.DescuentoNetos);
                //11 descuento perfumería N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.DescuentoPerfumeria);
                //12 descuento web N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.DescuentoWeb);
                //13 Monto Percepcion Municipal N(10) [1] 
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.MontoPercepcionMunicipal);
                //14 Monto Percepcion IVA N(10) [1]
                strCabeceraFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(objFactura.MontoPercepcionIVA);

                FAC_txt.WriteLine(strCabeceraFAC);
                foreach (DKbase.dll.cFacturaDetalle item in objFactura.lista)
                {
                    if (item.Troquel != null)
                    {
                        if (item.Troquel != string.Empty)
                        {
                            //If NOT ISNULL(Importe)
                            if (item.Importe != null)
                            {
                                if (item.Importe.Trim() != string.Empty)
                                {
                                    string detalleFAC = string.Empty;
                                    //Identificador de item
                                    detalleFAC += "I-";
                                    //Nro. Campo Tipo Comentario
                                    //1 código de barras producto C(13)
                                    //2 descripción producto C(60)
                                    //3 cantidad N(5)
                                    //4 característica C(1)
                                    //Espacio en blanco - Sin característica
                                    //F - Farmabono
                                    //D - Tarjeta D
                                    //C - Colfacor
                                    //B - Bonos CIL
                                    //P - Bonos PAP
                                    //$ - Ofertas
                                    //T - Transfer
                                    //5 neto N(1) 0 - Normail / 1 - Neto + IVA
                                    //6 precio público N(10) [1]
                                    //7 precio unitario N(10) [1]
                                    //8 importe N(10) [1]   
                                    DKbase.web.capaDatos.cProductos producto = DKbase.web.capaDatos.capaCAR_WebService_base.RecuperarProductoPorNombre(item.Descripcion);
                                    bool isNoTieneCodigoBarra = true;//código de barras producto C(13)
                                    if (producto != null)
                                    {
                                        if (producto.pro_codigobarra != null)
                                        {
                                            isNoTieneCodigoBarra = false;
                                            detalleFAC += producto.pro_codigobarra.PadRight(13, ' ');
                                        }
                                    }
                                    if (isNoTieneCodigoBarra)
                                    {
                                        detalleFAC += " ".PadRight(13, ' ');
                                    }
                                    detalleFAC += item.Descripcion.PadRight(60, ' ');
                                    detalleFAC += item.Cantidad.PadLeft(5, '0');
                                    if (item.Caracteristica == null)
                                    {
                                        detalleFAC += " ";
                                    }
                                    else
                                    {
                                        if (item.Caracteristica == string.Empty)
                                        {
                                            detalleFAC += " ";
                                        }
                                        else
                                        {
                                            detalleFAC += item.Caracteristica.PadLeft(1, ' ');
                                        }
                                    }
                                    if (producto != null)
                                    {
                                        detalleFAC += producto.pro_neto ? "1" : "0"; // Neto --- neto N(1) 0 - Normail / 1 - Neto + IVA                            
                                    }
                                    else
                                    {
                                        detalleFAC += " ";
                                    }
                                    detalleFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(item.PrecioPublico);
                                    detalleFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(item.PrecioUnitario);
                                    detalleFAC += DKbase.generales.Numerica.toString_NumeroTXT_N10(item.Importe);

                                    //resultado += detalleFAC + "\n";
                                    FAC_txt.WriteLine(detalleFAC);
                                    //listaResultado.Add(resultado);

                                }//   if (item.Importe.Trim() != string.Empty) { 
                            }//     if (item.Importe != null) { 

                        }// fin if (item.Troquel != string.Empty)

                    }// fin if (item.Troquel != null)
                }
            }
            FAC_txt.Close();

        }

        return resultado;
    }
}
