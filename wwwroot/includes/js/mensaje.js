var timerCargandoBuscador = null;
function mensaje_EnInicio(pTitulo, pMensaje) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-lg"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<h4>' + pTitulo + '</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body"><div class="col-lg-12">';
    strHtml += pMensaje;
    //strHtml += '<a class="btn_confirmar float-left" href="#" data-dismiss="modal">CERRAR</a>';
    strHtml += '</div></div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
}
function mensaje_PopUp(pIndex) {
    if (listaPopUp != null && listaPopUp.length > 0 && listaPopUp[pIndex].arc_nombre != null) {
        var strHtml = '';
        strHtml += '<div class="modal-background">&nbsp;</div>';
        strHtml += '<div class="modal-dialog modal-popUp"><div class="modal-content">'; // modal-md
        strHtml += '<div class="modal-header no-padding-bottom">';
        strHtml += '<div class="row divContenedorPopUp">';
        // strHtml += '<img class="imgPopUp" src="../../servicios/thumbnail?r=popup&n=' + listaPopUp[pIndex].arc_nombre + '&an=497&al=463">';
        strHtml += '<img class="imgPopUp" src="../servicios/thumbnail?r=popup&n=' + listaPopUp[pIndex].arc_nombre + '&an=1024&al=768">';

        strHtml += '</div>';
        strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
        strHtml += '</div>';
        strHtml += '</div></div>';
        $('#modalModulo').html(strHtml);
        $('#modalModulo').modal();

        if ($(window).width() < (listaPopUp[pIndex].ancho + 60)) {
            $('.imgPopUp').css('width', '90%');
        } else {
            $('.modal-popUp').css('width', String(listaPopUp[pIndex].ancho + 60) + 'px');
        }
    }
}
function mensaje(pTitulo, pMensaje) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<h4>' + pTitulo + '</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body"><div class="col-lg-12">';
    strHtml += pMensaje;
    strHtml += '</div></div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
}
function modalModuloHide() {
    $('#modalModulo').modal('hide');
}
function showCargando() {
    $('body').css('cursor', 'wait');
    $('#divCargandoContenedorGeneralFondo').css('display', 'block');
    $('#divCargandoContenedorGeneralFondo').html('<img class="centerLoading" src="../img/varios/ajax-loader.gif" alt="Cargando" title="Cargando..." />');
}
function hideCargando() {
    $('body').css('cursor', 'default');
    $('#divCargandoContenedorGeneralFondo').css('display', 'none');
}


function showCargandoBuscador() {
    isNotBuscadorEnProceso = false;
    LimpiarTimeoutCargandoBuscador();
    timerCargandoBuscador = setTimeout(function () { showCargandoBuscador_interno(); }, 800);
}
function hideCargandoBuscador() {
    isNotBuscadorEnProceso = true;
    LimpiarTimeoutCargandoBuscador();
    hideCargando();
}
function showCargandoBuscador_interno() {
    if (!isNotBuscadorEnProceso) {
        showCargando();
    } else {
        LimpiarTimeoutCargandoBuscador();
    }
}
function LimpiarTimeoutCargandoBuscador() {
    if (timerCargandoBuscador) {
        clearTimeout(timerCargandoBuscador);
        timerCargandoBuscador = null;
    }
}

function mensaje_alert(pMensaje) {
    mensaje_alert_base(pMensaje, 'modalModuloAlertHide()');
}
function mensaje_alert_base(pMensaje, pOnclick) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon alert"></div>';
    strHtml += '<h4 class="color_red">INFORMACIÓN</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<p class="text-center"><b>' + pMensaje + '</b></p>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a class="btn_confirmar" href="#" onclick="' + pOnclick + '; return false;">ACEPTAR</a>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModuloAlert').html(strHtml);
    $('#modalModuloAlert').modal();
    scrollModalPrincipal();
}
function mensaje_alert_generic(pTitle, pMensaje) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-lg"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon alert"></div>';
    strHtml += '<h4>' + pTitle + '</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += pMensaje;
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModuloAlert').html(strHtml);
    $('#modalModuloAlert').modal();


    scrollModalPrincipal();
}
//
function modalModuloAlertHide() {
    $('#modalModuloAlert').modal('hide');
}

function mensaje_vaciarCarrito(clickButton) {
    mensaje_confirmar('¿Desea vaciar el carrito?', clickButton, 'modalModuloAlertHide(); return false;');
}
function mensaje_confirmar(pMensaje, clickbutton_aceptar, clickbutton_cancelar) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon alert"></div>';
    strHtml += '<h4 class="color_red">CONFIRMAR</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<p class="text-center"><b>' + pMensaje + '</b></p>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a class="btn_confirmar" href="#"  onclick="' + clickbutton_aceptar + '" >ACEPTAR</a>';
    strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal" onclick="' + clickbutton_cancelar + '">CANCELAR</a>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModuloAlert').html(strHtml);
    $('#modalModuloAlert').modal();


    scrollModalPrincipal();
}
function mensaje_informacion(pMensaje) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon alert"></div>';
    strHtml += '<h4 class="color_red">INFORMACIÓN</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<p class="text-center"><b>' + pMensaje + '</b></p>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a class="btn_confirmar" href="#"  onclick="modalModuloAlertHide(); return false;" >ACEPTAR</a>';
    strHtml += '</div>';//<div class="col-lg-12">
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModuloAlert').html(strHtml);
    $('#modalModuloAlert').modal();
    scrollModalPrincipal();
}
function mensaje_transfer(pTitulo, pMensaje) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon alert"></div>';
    strHtml += '<h4 class="color_red">INFORMACIÓN</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<p class="text-center"><b>' + pTitulo + '</b></p>';
    strHtml += '<div class="clear20"></div>';
    strHtml += pMensaje;
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a class="btn_confirmar" href="#"  onclick="modalModuloAlertHide(); return false;" >ACEPTAR</a>';
    strHtml += '</div>';//<div class="col-lg-12">
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModuloAlert').html(strHtml);
    $('#modalModuloAlert').modal();
    scrollModalPrincipal();
}
function mensaje_error(pTitulo, pMensaje) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon error"></div>';
    strHtml += '<h4 class="color_red">ERROR</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<p class="text-center"><b>' + pTitulo + '</b></p>';
    strHtml += '<div class="clear20"></div>';
    strHtml += pMensaje;
    strHtml += '<a class="btn_confirmar" href="#"  onclick="modalModuloAlertHide(); return false;" >ACEPTAR</a>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div>';//<div class="col-lg-12">
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModuloAlert').html(strHtml);
    $('#modalModuloAlert').modal();

    scrollModalPrincipal();

}


function scrollModalPrincipal() {
    $('#modalModuloAlert').on('hidden.bs.modal', function (e) {
        if ($("#modalModulo").css('display') == 'block')
            $('body').addClass('modal-open');
    });
}

$('#modalModulo').on('show.bs.modal', function (e) {
    $('#divBody').addClass("modal-open-Celular");
});
$('#modalModulo').on('hidden.bs.modal', function (e) {
    if ($("#divBody").hasClass("modal-open-Celular")) {
        setTimeout(function () { document.getElementById("txtBuscador").select(); }, 150);
    }
    $('#divBody').removeClass("modal-open-Celular");
    MostrarMensajeImportanteSiguiente();
});
//$('#modalModuloCelular').on('show.bs.modal', function (e) {
//    $('#divBody').addClass("modal-open-Celular");
//});
//$('#modalModuloCelular').on('hidden.bs.modal', function (e) {
//    $('#divBody').removeClass("modal-open-Celular");
//});
function mensaje_informacion_generico(pMensaje) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon info"></div>';
    strHtml += '<h4>INFORMACIÓN</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<p class="text-center"><b>' + pMensaje + '</b></p>';
    strHtml += '<div class="clear10"></div>';
    //strHtml += '<div class="clear20"></div>';
    //strHtml += '<a class="btn_confirmar" href="#"  onclick="modalModuloAlertHide(); return false;" >CERRAR</a>';
    strHtml += '</div>';//<div class="col-lg-12">
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModuloAlert').html(strHtml);
    $('#modalModuloAlert').modal();
    scrollModalPrincipal();
}
function mensaje_CambiarContraseñaUsuario() {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon key"></div>';
    strHtml += '<h4>CAMBIAR CONTRASEÑA</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<form action="/config/usuario" method="post" onsubmit="return onsubmitCambiarContraseñaUsuario();">';
    strHtml += '<div class="col-xs-12">';
    strHtml += '<input name="txtPassCambiar" id="txtPassCambiar" class="form-control2" type="password" placeholder="Contraseña" value="" required>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<div class="oblig float-right">(*) Campos obligatorios</div>';
    strHtml += '</div>';
    strHtml += '<div class="clear20"></div>';
    //strHtml += '<a class="btn_confirmar" href="#">GUARDAR</a>';
    strHtml += '<button class="btn_emp float-right" type="submit" style="margin-left: 12px;" >GUARDAR</button>';
    strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal">CANCELAR</a>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</form>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModuloAlert').html(strHtml);
    $('#modalModuloAlert').modal();
    scrollModalPrincipal();
}

function mensaje_CreditoDisponible(pCreditoSemanal, pCreditoTotal) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon usd"></div>';
    strHtml += '<h4>Cr&eacute;dito Disponible</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    if (pCreditoSemanal != null) {
        strHtml += '<div class="col-xs-8 text-left"><p><b>CREDITO SEMANAL:</b></p></div>';
        strHtml += '<div class="col-xs-4 text-right"><p>' + pCreditoSemanal + '</p></div>';
    }
    strHtml += '<div class="col-xs-8 text-left"><p>CREDITO TOTAL:</p></div>';
    strHtml += '<div class="col-xs-4 text-right"><p>' + pCreditoTotal + '</p></div>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal">CERRAR</a>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
}
function mensaje_SaldoFinalADiciembre(pSaldo) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row ">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon usd noImprimir"></div>';
    var anio = (new Date()).getFullYear() - 1;
    strHtml += '<div class="SaldoFinalADiciembreH4 siImprimir">' + 'Droguería Kellerhoff' + '</div>';
    strHtml += '<div class="SaldoFinalADiciembreH5 siImprimir">SALDO AL 31/12/' + anio.toString() + '</div>';
    strHtml += '<h4 class="noImprimir">SALDO AL 31/12/' + anio.toString() + '</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal noImprimir" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div id="divImprimirSaldoDiciembre" class="modal-body">';
    strHtml += '<div class="col-xs-8 text-left"><p>SALDO:</p></div>';
    strHtml += '<div class="col-xs-4 text-right"><p>' + pSaldo + '</p></div>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a class="btn_vaciar float-left noImprimir" href="#" data-dismiss="modal">CERRAR</a>';
    strHtml += '<a class="btn_print float-right noImprimir" href="#" onclick="window.print(); return false;" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="">IMPRIMIR</a>';
    //strHtml += '<input type="button" name="imprimir" value="Imprimir" onclick="window.print();" >';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
}
function mensaje_ConsultasCtaCte() {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon mensaje"></div>';
    strHtml += '<h4>Consultas</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    //strHtml += '<form id="" name="" action="">';
    strHtml += '<div class="col-xs-12">';
    var mail = cli_email();
    if (mail == null) {
        mail = '';
    }
    //
    strHtml += '<span style="font-size:14px;">Ingrese Dirección de Correo donde desee recibir su respuesta.</span>&nbsp;<input name="idCtaCteMail" id="idCtaCteMail" class="form-control2" type="text" value="' + mail + '" />';
    //strHtml += 'Responder a:&nbsp;<input name="idCtaCteMail" id="idCtaCteMail" class="form-control2" type="text" value="' + mail + '" />';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<textarea name="idCtaCteComentario" id="idCtaCteComentario" class="form-control2" placeholder="Escriba su consulta"></textarea>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="oblig float-right">(*) Campos obligatorios</div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a class="btn_confirmar" href="#" onclick="onclickEnviarConsulta();return false;">ENVIAR</a>';
    strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal">CANCELAR</a>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div>';
    //strHtml += '</form>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
}
function mensaje_NuevosLanzamientos(pObjeto) {//,pTexto

    // if (listaPopUp != null && listaPopUp.length > 0 && listaPopUp[pIndex].arc_nombre != null) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-popUp"><div class="modal-content">'; // modal-md
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row divContenedorPopUp">';
    // strHtml += '<img class="imgPopUp" src="../../servicios/thumbnail?r=popup&n=' + listaPopUp[pIndex].arc_nombre + '&an=497&al=463">';
    strHtml += '<img class="imgPopUp" src="../servicios/thumbnail?r=ofertas&n=' + pObjeto.nameImagen + '&an=1024&al=768">';
    //
    strHtml += '<div>';
    strHtml += pObjeto.ofe_descrHtml;
    strHtml += '</div>';
    //
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
    /*
            if ($(window).width() < (listaPopUp[pIndex].ancho + 60)) {
                $('.imgPopUp').css('width', '90%');
            } else {
                $('.modal-popUp').css('width', String(listaPopUp[pIndex].ancho + 60) + 'px');
            }
            */
    // }
}
function onclickNuevoLanzamiento(pIdOferta) {
    var url = '../home/lanzamiento.aspx?id=' + pIdOferta;
    window.open(url, '_blank').focus();
    /*
$.ajax({
    type: "POST",
    url: "../config/RecuperarOferta",
    data: { pId: pIdOferta },
    success:
        function (response) {
            OnCallBackRecuperarOferta(response);
        },
    failure: function (response) {
        OnFail(response);
    },
    error: function (response) {
        OnFail(response);
    }
});
*/

}
function OnCallBackRecuperarOferta(args) {
    var obj = eval('(' + args + ')');
    if (typeof obj == 'undefined') {
        obj = null;
    }
    if (obj != null && obj.length > 0) {
        mensaje_NuevosLanzamientos(obj[0]);
    }
}
function mensaje_AmpliarImagen(pObjeto) {

    // if (listaPopUp != null && listaPopUp.length > 0 && listaPopUp[pIndex].arc_nombre != null) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-popUp"><div class="modal-content">'; // modal-md
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row divContenedorPopUp">';
    //pObjeto.pri_nombreArchivo
    strHtml += '<img class="imgPopUp" src="../servicios/thumbnail?r=productos&n=' + pObjeto.pri_nombreArchivo + '&an=' + pObjeto.pri_ancho_ampliar + '&al=' + pObjeto.pri_alto_ampliar + '">';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
    var ancho = pObjeto.pri_ancho_ampliar + 60;
    if ($(window).width() < ancho) {
        $('.imgPopUp').css('width', '90%');
    } else {
        $('.modal-popUp').css('width', String(ancho) + 'px');
    }

    // }
}
function mensaje_SolicitudSobreRemesa() {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';//
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon mensaje"></div>';
    strHtml += '<h4>Solicitud Sobres/Remesa</h4>';
    strHtml += '</div>';//'<div class="col-lg-12">';
    strHtml += '</div>';//'<div class="row">';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';//'<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="modal-body">';
    //
    strHtml += 'Se envió la solicitud.';
    //
    strHtml += '</div>';//'<div class="modal-body">';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
}
function mensaje_informacion_buscador(pMensaje) {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-6">';
    strHtml += '<div class="modulo_icon alert"></div>';
    strHtml += '<h4 class="color_red">INFORMACIÓN</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<p class="text-center"><b>' + pMensaje + '</b></p>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a id="btn_confirmar_buscar" class="btn_confirmar" href="#"  onclick="return onclick_cerrar_mensaje_informacion_buscador();" >ACEPTAR</a>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModuloAlert').html(strHtml);
    $('#modalModuloAlert').modal();
    scrollModalPrincipal();
     document.getElementById("btn_confirmar_buscar").focus();
    //setTimeout(function () { $("#btn_confirmar_buscar").focus(); }, 50);
    
}
function onclick_cerrar_mensaje_informacion_buscador() {
    modalModuloAlertHide(); 
    document.getElementById('txtBuscador').focus();
    return false;
}
function mensaje_ReservaVacunas() {
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';//
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon mensaje"></div>';
    strHtml += '<h4>Reserva Vacunas</h4>';
    strHtml += '</div>';//'<div class="col-lg-12">';
    strHtml += '</div>';//'<div class="row">';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';//'<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="modal-body">';
    //
    strHtml += 'Se envió la solicitud.';
    //
    strHtml += '</div>';//'<div class="modal-body">';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
}