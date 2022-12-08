var listaMensajes = null;
var listaUsuarios = null;
var estadoLeido = null;
var estadoNoLeido = null;
var intCambiarContraseña = null;
var indexUsuario = null;
var listaCatalogo = null;

jQuery(document).ready(function () {
    //prepararListaOfertas($('#hiddenListaOfertas').val());
    if (listaMensajes == null) {
        listaMensajes = eval('(' + $('#hiddenListaMensajes').val() + ')');
        if (typeof listaMensajes == 'undefined') {
            listaMensajes = null;
        }
    }
    if (estadoLeido == null) {
        estadoLeido = $('#hiddenEstadoLeido').val();
        if (typeof estadoLeido == 'undefined') {
            estadoLeido = null;
        }
    }
    if (estadoNoLeido == null) {
        estadoNoLeido = $('#hiddenEstadoNoLeido').val();
        if (typeof estadoNoLeido == 'undefined') {
            estadoNoLeido = null;
        }
    }
    if (intCambiarContraseña == null) {
        intCambiarContraseña = $('#hiddenCambiarContraseña').val();
        if (typeof intCambiarContraseña == 'undefined') {
            intCambiarContraseña = null;
        }
    }
    if (listaUsuarios == null) {
        listaUsuarios = eval('(' + $('#hiddenListaUsuarios').val() + ')');
        if (typeof listaUsuarios == 'undefined') {
            listaUsuarios = null;
        }
    }
    if (listaCatalogo == null) {
        listaCatalogo = eval('(' +  $('#hiddenListaCatalogo').val() +  ')');
        if (typeof listaCatalogo == 'undefined') {
            listaCatalogo = null;
        }
    }
    CargarCatalogo();
    CargarHtmlListaMensajes();
    CargarHtmlListaUsuarios();
    MostrarMsgPerfil();
});
function CargarHtmlListaUsuarios() {
    if (listaUsuarios != null) {
        var strHtml = '';
        if (listaUsuarios.length > 0) {
            strHtml += '';
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead class="pagos">';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-1 col-md-2 col-sm-2 col-xs-4 text-left">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-left"></td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-left">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Nombre</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-left">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Apellido</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-2 col-sm-2 col-xs-12 text-center" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_b_r-sm">E-mail</td></tr>';
            strHtml += '</table> ';
            strHtml += '<span class="thd_user visible-xs">E-mail</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center no_b_r-sm" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Pass</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs visible-sm">Pass</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center " data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Login</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs visible-sm">Login</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead pull"><td class="col-lg-12 text-center">Rol</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs visible-sm">Rol</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Estado</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs visible-sm">Estado</span>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody class="pagos">';
            for (var i = 0; i < listaUsuarios.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                //

                strHtml += '<td class="col-lg-1 col-md-2 col-sm-2 col-xs-4 text-left">';
                strHtml += '<a class="i_users" href="#"  onclick="onclickEliminarUsuario(' + i + '); return false;"><i title="Eliminar" class="fa fa-trash"></i></a>';
                strHtml += '<a class="i_users" href="#"  onclick="onclickCambiarContraseñaUsuario(' + i + '); return false;"><i title="Contraseña" class="fa fa-key"></i></a>';
                strHtml += '<a class="i_users" href="#" onclick="onclickModificarUsuario(' + i + '); return false;" ><i title="Modificar" class="fa fa-pencil"></i></a>';
                strHtml += '<a class="i_users" href="#" onclick="onclickCambiarEstadoUsuario(' + i + '); return false;"><i title="Cambiar Estado" class="fa fa-cog"></i></a>';
                strHtml += '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-center">' + listaUsuarios[i].usu_nombre + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-center">' + listaUsuarios[i].usu_apellido + '<span class="fle_down"></span></td>';
                strHtml += '<td class="col-lg-3 col-md-2 col-sm-2 col-xs-12 c_to_l-xs no_b_r-sm">' + listaUsuarios[i].usu_mail + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 col-xs-12 c_to_l-sm c_to_l-xs">' + listaUsuarios[i].usu_pswDesencriptado + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 col-xs-12 c_to_l-sm c_to_l-xs">' + listaUsuarios[i].usu_login + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 col-xs-12 c_to_l-sm c_to_l-xs">' + listaUsuarios[i].rol_Nombre + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 col-xs-12 c_to_l-sm c_to_l-xs">' + listaUsuarios[i].usu_estadoToString + '</td>';
                //
                strHtml += '</tr>';
            }
            strHtml += '</tbody>';
            strHtml += '</table>';

        }
        $('#divGridUsuarios').html(strHtml);
        $('.footable').footable();
    }
}
function MostrarMsgPerfil() {
    if (intCambiarContraseña != null) {
        var strMsg = '';
        switch (intCambiarContraseña) {
            case "-1":
                strMsg = 'Se produjo un error intentelo de nuevo mas tarde';
                break;
            case "0":
                strMsg = 'La contraseña actual no coincide';
                break;
            case "1":
                strMsg = 'La contraseña se cambio correctamente';
                break;
            default:
                break;

        }
        mensaje_informacion_generico(strMsg);
    }
}
function CargarHtmlListaMensajes() {
    if (listaMensajes != null) {
        var strHtml = '';
        if (listaMensajes.length > 0) {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead class="pagos">';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-4 text-center">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            //strHtml += '<th class="bp-med-ancho" >Asunto</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-8 text-center">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Asunto</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            //strHtml += '<th class="bp-med-ancho" >Mensaje</th>';
            strHtml += '<th class="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Mensaje</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs">Mensaje</span>';
            strHtml += '</th>';
            //strHtml += '<th class="bp-med-ancho" >Estado</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Estado</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs">Estado</span>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody class="pagos">';
            for (var i = 0; i < listaMensajes.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += ' <td class="col-lg-1 col-md-1 col-sm-1 col-xs-4 text-center">' + listaMensajes[i].tme_fechaToString + '</td>'; // listaComprobantesEntreFecha[i].FechaToString
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 col-xs-8 text-center">' + listaMensajes[i].tme_asunto + '</td>';
                strHtml += '<td class="col-lg-6 col-md-6 col-sm-6 col-xs-12 c_to_l-xs">';
                strHtml += listaMensajes[i].tme_mensaje;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-12">';
                strHtml += '<div class="clear10 hidden-xs"></div>';
                strHtml += '<div class="radio-checkbox rc_buscador">';
                var isCheckbox = '';
                if (listaMensajes[i].tme_estado == estadoNoLeido) {
                    //strHtml += '<input id="checkboxEstadoMensaje_' + listaMensajes[i].tme_codigo + '" type="checkbox" value="0"  class="inputRadio" onclick="onclickCambiarEstado(this)"  />' + '<label id="forEstadoMensaje_' + listaMensajes[i].tme_codigo + '" for="checkboxEstadoMensaje_' + listaMensajes[i].tme_codigo + '">' + listaMensajes[i].est_nombre + '</label>';
                } else if (listaMensajes[i].tme_estado == estadoLeido) {
                    isCheckbox = 'checked="checked"';
                } else {
                    // strHtml += listaMensajes[i].est_nombre;
                }

                strHtml += '<input id="checkboxEstadoMensaje_' + listaMensajes[i].tme_codigo + '" class="checkbox" type="checkbox" value="0" ' + isCheckbox + ' onclick="onclickCambiarEstado(this)"  />' + '<label id="forEstadoMensaje_' + listaMensajes[i].tme_codigo + '" for="checkboxEstadoMensaje_' + listaMensajes[i].tme_codigo + '">' + listaMensajes[i].est_nombre + '</label>';
                //if (listaMensajes[i].tme_estado == estadoNoLeido) {
                //    strHtml += '<input id="checkboxEstadoMensaje_' + listaMensajes[i].tme_codigo + '" type="checkbox" value="0"  class="inputRadio" onclick="onclickCambiarEstado(this)"  />' + '<label id="forEstadoMensaje_' + listaMensajes[i].tme_codigo + '" for="checkboxEstadoMensaje_' + listaMensajes[i].tme_codigo + '">' + listaMensajes[i].est_nombre + '</label>';
                //} else if (listaMensajes[i].tme_estado == estadoLeido) {
                //    strHtml += '<input id="checkboxEstadoMensaje_' + listaMensajes[i].tme_codigo + '" type="checkbox" value="0" checked="checked"   class="inputRadio" onclick="onclickCambiarEstado(this)" />' + '<label id="forEstadoMensaje_' + listaMensajes[i].tme_codigo + '" for="checkboxEstadoMensaje_' + listaMensajes[i].tme_codigo + '">' + listaMensajes[i].est_nombre + '</label>';
                //} else {
                //    strHtml += listaMensajes[i].est_nombre;
                //}
                strHtml += '</div>';
                strHtml += '</td>';
                strHtml += '</tr>';
            }
            strHtml += '</tbody>';
            strHtml += '</table>';
        } else {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<tbody>';
            strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
            strHtml += '</tbody>';
            strHtml += '</table>';
        }
        $('#divGridMensajes').html(strHtml);
        $('.footable').footable();
    }
}
function onclickCambiarEstado(pValor) {
    var estado = -1;
    var idMensaje = parseInt(pValor.id.replace('checkboxEstadoMensaje_', ''));
    if (document.getElementById(pValor.id).checked) {
        estado = estadoLeido;
        $('#forEstadoMensaje_' + String(idMensaje)).html('Leido');
    } else {
        estado = estadoNoLeido;
        $('#forEstadoMensaje_' + String(idMensaje)).html('SinLeer');
    }

    CambiarEstadoMensaje(idMensaje, estado);
}
function onclickGuardarPerfil() {
    if ($('#idContraseniaNueva').val() != $('#idContraseniaNuevaRepetir').val()) {
        var strMsg = 'La contraseña debe coincidir';
        mensaje_informacion_generico(strMsg);
        return false;
    }
    return true;

}
function usuarioNuevo() {
    indexUsuario = null;
    GeneralModalUsuario();

}
function GeneralModalUsuario() {
    var nombre = '';
    var apellido = '';
    var login = '';
    var mail = '';
    var observaciones = '';
    var checkedPEDIDOS = 'checked';
    var checkedCUENTASCORRIENTES = 'checked';
    var checkedDESCARGAS = 'checked';
    if (indexUsuario != null) {
        nombre = listaUsuarios[indexUsuario].usu_nombre;
        apellido = listaUsuarios[indexUsuario].usu_apellido;
        login = listaUsuarios[indexUsuario].usu_login;
        if (isNotNullEmpty(listaUsuarios[indexUsuario].usu_mail))
            mail = listaUsuarios[indexUsuario].usu_mail;
        if (isNotNullEmpty(listaUsuarios[indexUsuario].usu_observacion))
            observaciones = listaUsuarios[indexUsuario].usu_observacion;
        if (listaUsuarios[indexUsuario].listaPermisoDenegados != null) {
            checkedPEDIDOS = 'checked';
            checkedCUENTASCORRIENTES = 'checked';
            checkedDESCARGAS = 'checked';
            for (var y = 0; y < listaUsuarios[indexUsuario].listaPermisoDenegados.length; y++) {
                switch (listaUsuarios[indexUsuario].listaPermisoDenegados[y]) {
                    case 'PEDIDOS':
                        checkedPEDIDOS = '';
                        break;
                    case 'CUENTASCORRIENTES':
                        checkedCUENTASCORRIENTES = '';
                        break;
                    case 'DESCARGAS':
                        checkedDESCARGAS = '';
                        break;
                    default:
                        break;
                }
            }

        }
    }

    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-lg"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon edit"></div>';
    strHtml += '<h4>Modificar usuario</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<form action="/config/usuario" method="post" onsubmit="return onclickGuardarUsuario();">';
    strHtml += '<div class="col-xs-6">';
    strHtml += '<input name="txtNombre" id="txtNombre" class="form-control2" type="text" placeholder="Nombre" value="' + nombre + '" required />';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<input name="txtEmail" id="txtEmail" class="form-control2" type="email" placeholder="Email" value="' + mail + '" />';
    strHtml += '<div class="clear20"></div>';
    if (indexUsuario == null) {
        strHtml += '<input name="txtContrasenia" id="txtContrasenia" class="form-control2" type="password" placeholder="Contraseña" value="" required />';
        strHtml += '<div id="txtContrasenia_clear20" class="clear20"></div>';
    }
    strHtml += '</div>';
    strHtml += '<div class="col-xs-6">';
    strHtml += '<input name="txtApellido" id="txtApellido" class="form-control2" type="text" placeholder="Apellido" value="' + apellido + '" required />';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<input name="txtLogin" id="txtLogin" class="form-control2" type="text" placeholder="Login" value="' + login + '" required />';
    strHtml += '<div class="clear20"></div>';
    if (indexUsuario == null) {
        strHtml += '<input name="txtContraseniaRepetir" id="txtContraseniaRepetir" class="form-control2" type="password" placeholder="Repetir Contraseña" value="" required />';
        strHtml += '<div id="txtContraseniaRepetir_clear20"  class="clear20"></div>';
    }
    strHtml += '</div>';//
    strHtml += '<div class="col-xs-12">';
    strHtml += '<textarea name="txtObservaciones" id="txtObservaciones" class="form-control2" placeholder="Observaciones" >' + observaciones + '</textarea>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="radio-checkbox rc_buscador">';
    strHtml += '<input id="checkBoxPedidos" class="checkbox checkboxUsuario" type="checkbox" value="PEDIDOS" ' + checkedPEDIDOS + '>';
    strHtml += '<label for="checkBoxPedidos" value="">Pedidos</label>';
    strHtml += '</div>';
    strHtml += '<div class="radio-checkbox rc_buscador">';
    strHtml += '<input id="checkBoxCuentasCorrientes" class="checkbox checkboxUsuario" type="checkbox" value="CUENTASCORRIENTES" ' + checkedCUENTASCORRIENTES + '>';
    strHtml += '<label for="checkBoxCuentasCorrientes" value="">Cuentas Corrientes</label>';
    strHtml += '</div>';
    strHtml += '<div class="radio-checkbox rc_buscador">';
    strHtml += '<input id="checkBoxDescargas" class="checkbox checkboxUsuario" type="checkbox" value="DESCARGAS" ' + checkedDESCARGAS + '>';
    strHtml += '<label for="checkBoxDescargas" value="">Descargas</label>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '<div class="oblig float-right">(*) Campos obligatorios</div>';
    strHtml += '</div>';
    strHtml += '<div class="clear20"></div>';
    //strHtml += '<a class="btn_confirmar" href="#" onclick="onclickGuardarUsuario(); return false;">GUARDAR</a>';// onclick=" return false;onclickGuardarUsuario();"
    strHtml += '<button class="btn_emp float-right" type="submit" style="margin-left: 12px;" >GUARDAR</button>';//onclick="return onclickGuardarUsuario(); "
    strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal">CANCELAR</a>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</form>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();



}

function onclickGuardarUsuario() {
    var usu_codigo = 0;
    if (indexUsuario != null)
        usu_codigo = listaUsuarios[indexUsuario].usu_codigo

    var nombre = $('#txtNombre').val();
    var apellido = $('#txtApellido').val();
    var login = $('#txtLogin').val();
    var mail = $('#txtEmail').val();
    var contraseña = '';
    if (usu_codigo == 0) {
        if ($('#txtContraseniaRepetir').val() != $('#txtContrasenia').val()) {
            var strMsg = 'La contraseña debe coincidir';
            mensaje_informacion_generico(strMsg);
            return false;
        }
        contraseña = $('#txtContrasenia').val();
    }

    // $('#txtContraseniaRepetir').val();
    var observaciones = $('#txtObservaciones').val();
    var listaPermisos = [];
    if (!$('#checkBoxPedidos').is(':checked')) {
        listaPermisos.push($('#checkBoxPedidos').val());
    }
    if (!$('#checkBoxCuentasCorrientes').is(':checked')) {
        listaPermisos.push($('#checkBoxCuentasCorrientes').val());
    }
    if (!$('#checkBoxDescargas').is(':checked')) {
        listaPermisos.push($('#checkBoxDescargas').val());
    }

    GuardarUsuario(usu_codigo, nombre, apellido, mail, login, contraseña, observaciones, listaPermisos);
    return false;
}
function OnCallBackGuardarUsuario(args) {

    if (args == '-2') {
        var strMsg = 'Login repetido';
        mensaje_informacion_generico(strMsg);
    } else { 
        //location.href = '../config/usuarios';
        ObtenerUsuarios();
    }
}
function onclickModificarUsuario(pIndex) {
    indexUsuario = pIndex;
    GeneralModalUsuario();
}

function onclickCambiarEstadoUsuario(pIndex) {
    indexUsuario = pIndex;
    mensaje_confirmar(objMensajeEstaSeguroDeseaCambiarRegistro, 'CambiarEstadoUsuario(' + listaUsuarios[indexUsuario].usu_codigo + '); return false;', 'modalModuloAlertHide(); return false;');
}
function OnCallBackCambiarEstadoUsuario(args) {
    //location.href = '../config/usuarios';
    ObtenerUsuarios();
}
function onclickEliminarUsuario(pIndex) {
    indexUsuario = pIndex;
    mensaje_confirmar(objMensajeEstaSeguroDeseaEliminarRegistro, 'EliminarUsuario(' + listaUsuarios[indexUsuario].usu_codigo + '); return false;', 'modalModuloAlertHide(); return false;');
}
function OnCallBackEliminarUsuario(args) {
    // location.href = '../config/usuarios';
    ObtenerUsuarios();
}
function onclickCambiarContraseñaUsuario(pIndex) {
    indexUsuario = pIndex;
    mensaje_CambiarContraseñaUsuario();
}
function OnCallBackCambiarContraseñaUsuario(args) {
    // location.href = '../config/usuarios';
    modalModuloAlertHide();
    ObtenerUsuarios();
}

function onsubmitCambiarContraseñaUsuario() {
    var pass = $('#txtPassCambiar').val();   
    CambiarContraseñaUsuario(listaUsuarios[indexUsuario].usu_codigo, pass);
    return false;
}
function OnCallBackObtenerUsuarios(args) {
    listaUsuarios = eval('(' + args + ')');
    if (typeof listaUsuarios == 'undefined') {
        listaUsuarios = null;
    }
    CargarHtmlListaUsuarios();
    modalModuloAlertHide();
    modalModuloHide();
}

function CargarCatalogo() {
    if (listaCatalogo != null) {
        if (listaCatalogo.length > 0) {
            var strHtml = '';
            strHtml += '<table class="footable table sin_b table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<tbody>';
            for (var i = 0; i < listaCatalogo.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-10 col-md-10 col-sm-9 col-xs-6 text-left">';
                strHtml += listaCatalogo[i].tbc_titulo;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-3 col-xs-6 text-right">';
                //strHtml += '<a class="btn_emp pdf" href="..\\..\\archivos\\catalogo\\' + listaCatalogo[i].tbc_descripcion + '" target="_blank" title="DESCARGAR"><span>DESCARGAR</span></a>';
                strHtml += '<a class="btn_emp pdf" href="..\\..\\servicios\\descargarArchivo.aspx?t=catalogo&n=' + listaCatalogo[i].tbc_descripcion + '" target="_blank" title="DESCARGAR"><span>DESCARGAR</span></a>';

                strHtml += '</td>';
                strHtml += '</tr>';
            }
            strHtml += '<tbody>';
            strHtml += '</table>';
        }
        $('#divGridCatalogo').html(strHtml);
    }
}
//function onclickDescarga(pId) {
//    var direc = '';
//    for (var i = 0; i < listaCatalogo.length; i++) {
//        if (listaCatalogo[i].tbc_codigo == pId) {
//            direc = listaCatalogo[i].tbc_descripcion;
//            break;
//        }
//    }
//    if (direc != '') {
//        //  document.location = '..\\..\\archivos\\catalogo\\' + direc;
//        window.open('..\\..\\archivos\\catalogo\\' + direc, '_blank');
//    }

//    // alert(pId);
//    return false;
//}