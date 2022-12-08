var objMensajeNoEncontrado = 'No se han encontrado resultados.';
var objMensajeDllNoDisponible = 'En este momento estamos realizando tareas de mantenimiento, por favor intente más tarde.';
var objMensajeSeProdujoErrorIntentaMasTarde = 'Se produjo un error. Por favor intenta más tarde.';
var objMensajeIntentaMasTarde = 'Por favor intenta más tarde.';
var objMensajeIntentaNuevamente = 'Por favor intente nuevamente.';
var objMensajeEstaSeguroDeseaEliminarRegistro = '¿Está seguro de que desea eliminar el registro?';
var objMensajeEstaSeguroDeseaCambiarRegistro = '¿Está seguro de que desea cambiar el estado el registro?';
var objMensajeNoSePudoDescargarArchivoInténteloNuevamente = 'No se pudo descargar el archivo, inténtelo nuevamente.';
var cantFilaParaEnCabezado = 30;
var textUnidades = 'Unidades ';

var listaMensajeImportanteMostrar = null;
var longMensajeImportanteMostrar = null;
var listaPopUp = null;
var longPopUpMostrar = null;
var listaLog = null;


function cCarrito() {
    this.lrc_id = -1;
    this.codSucursal = '';
    this.suc_nombre = '';
    this.listaProductos = [];
}
function cUnidadesAndRenglones() {
    this.codSucursal = '';
    this.Unidades = 0;
    this.Renglones = 0;
}
function cProductosAndCantidad() {
    this.codSucursal = '';
    this.codProducto = '';
    this.codProductoNombre = '';
    this.cantidad = 0;
    this.isTransferFacturacionDirecta = false;
    this.isMostrarTransfersEnClientesPerf = true;
    this.tde_codtfr = 0;
}
var cliente = null;

$(document).ready(function () {

    novedades();

    $('.s_menu').click(function () {
        var nodo = $(this).attr("id");
        if ($("#d_" + nodo).is(":visible")) {
            $("#d_" + nodo).slideUp(300);
            $("#angle_" + nodo).removeClass();
            $("#angle_" + nodo).addClass("fa fa-angle-down");
            return false;
        } else {
            $("#angle_" + nodo).removeClass();
            $("#angle_" + nodo).addClass("fa fa-angle-up");
            $("#d_" + nodo).slideDown(300);
            return false;
        }
    });
    if (cliente == null) {
        cliente = eval('(' + $('#hiddenCliente').val() + ')');
        if (typeof cliente == 'undefined') {
            cliente = null;
        }
    }

    if (listaMensajeImportanteMostrar == null) {
        listaMensajeImportanteMostrar = eval('(' + $('#hiddenListaMensajeImportante').val() + ')');
        if (typeof listaMensajeImportanteMostrar == 'undefined') {
            listaMensajeImportanteMostrar = null;
        }
    }
    if (listaPopUp == null) {
        listaPopUp = eval('(' + $('#hiddenListaPopUp').val() + ')');
        if (typeof listaPopUp == 'undefined') {
            listaPopUp = null;
        }
    }
    if (listaMensajeImportanteMostrar != null) {
        longMensajeImportanteMostrar = listaMensajeImportanteMostrar.length;
    }
    if (listaPopUp != null) {
        longPopUpMostrar = listaPopUp.length;
    }
    setTimeout(function () { MostrarMensajeImportante(); }, 300);


});
function MostrarMensajePopUp() {
    if (longPopUpMostrar > 0) {
        var indexPopUp = listaPopUp.length - longPopUpMostrar;
        mensaje_PopUp(indexPopUp);
        longPopUpMostrar = longPopUpMostrar - 1;
    }
}
function MostrarMensajeImportante() {
    if (listaMensajeImportanteMostrar != null) {

        if (listaMensajeImportanteMostrar.length > 0) {
            var indexImportante = listaMensajeImportanteMostrar.length - longMensajeImportanteMostrar;
            longMensajeImportanteMostrar = longMensajeImportanteMostrar - 1;
            mensaje_EnInicio(listaMensajeImportanteMostrar[indexImportante].tme_asunto, listaMensajeImportanteMostrar[indexImportante].tme_mensaje);
        }// fin   if ( listaMensajeImportanteMostrar.length > 0){
        else {
            MostrarMensajePopUp();
        }
    }
}
function MostrarMensajeImportanteSiguiente() {
    if (longMensajeImportanteMostrar > 0) {
        MostrarMensajeImportante();
    } else {
        MostrarMensajePopUp();
    }
}
function cli_login() {
    return cliente.cli_login;
}
function cli_isGLN() {
    return cliente.cli_isGLN;
}
function cli_tomaTransfers() {
    return cliente.cli_tomaTransfers;
}
function cli_tomaOfertas() {
    return cliente.cli_tomaOfertas;
}
function cli_codigo() {
    return cliente.cli_codigo;
}
function cli_codsuc() {
    return cliente.cli_codsuc;
}
function cli_codtpoenv() {
    return cliente.cli_codtpoenv;
}
function cli_IdSucursalAlternativa() {
    return cliente.cli_IdSucursalAlternativa;
}
function cli_email() {
    return cliente.cli_email;
}

function cli_isAceptaPsicotropicos() {
    return cliente.cli_AceptaPsicotropicos;
}
function cli_codprov() {
    return cliente.cli_codprov;
}
function cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto() {
    return cliente.cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto;
}
function cli_nickname_PorcentajeDescuentoDeNetosMedicamentos() {
    return cliente.cli_pordesbetmed; //PorcentajeDescuentoDeNetosMedicamentos
}
function cli_nickname_PorcentajeDescuentoDeNetos() {
    return cliente.cli_pordesnetos; //PorcentajeDescuentoDeNetos
}
function getSucursalClienteInfo() {
    if (listaSucursales != null) {
        for (var i = 0; i < listaSucursales.length; i++) {
            if (cli_codsuc() == listaSucursales[i].sde_sucursal) {
                return listaSucursales[i];
            }
        }
    }
    return null;
}
function volverBuscador() {
    if (isCarritoExclusivo) {
        if (isCarritoDiferido) {
            location.href = '../mvc/carritoDiferido';
        } else {
            location.href = '../mvc/carrito';
        }
    }
    else {
        if (isCarritoDiferido) {
            location.href = '../mvc/Diferido';
        } else {
            location.href = '../mvc/Buscador';
        }
    }
}
function volverBuscador_Base() {
    if (isCarritoDiferido) {
        location.href = '../mvc/Diferido';
    } else {
        location.href = '../mvc/Buscador';
    }

}
//function onclickIngresarAux() {
//    var name = $('#name_footer').val();
//    var pass = $('#password_footer').val();
//    if (isNotNullEmpty(name) && isNotNullEmpty(pass)) {
//        $.ajax({
//            type: "POST",
//            url: "/config/login",
//            data: { pName: name, pPass: pass },
//            success:
//            function (response) {
//                OnCallBackLoginCarrito(response);
//            },
//            failure: function (response) {
//                OnFail(response);
//            },
//            error: function (response) {
//                OnFail(response);
//            }
//        });
//    }
//}
function onclickSignOff() {
    $.ajax({
        type: "POST",
        url: "/config/SignOff",
        success:
        function (response) {
            OnCallBackSignOff(response);
        },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function OnCallBackSignOff(args) {
    if (args == 'Ok') {
        location.href = '../mvc/Index';
    }
}
function OnCallBackLoginCarrito(args) {
    if (args == 'Ok') {

        location.href = '../mvc/Buscador';
    }
    else {
        // bootstrap_alert.warning(args);
        $.alert({
            title: 'Información',
            content: args,
        });
    }
}
function ConvertirSucursalParaColumna(pValor) {
    var resultado = pValor;
    switch (pValor) {
        case 'CB':
            resultado = 'CBA';
            break;
        case 'SF':
            resultado = 'SFE';
            break;
        case 'CH':
            resultado = 'CHL';
            break;
        case 'CO':
            resultado = 'CDU';
            break;
        case 'CD':
            resultado = 'CON';
            break;
        case 'VH':
            resultado = 'ROS';
            break;
        default:
            break;
    }
    return resultado;
}

function getNameClassStock(pValor) {
    var result = 'pt_stock';
    switch (pValor) {
        case 'S':
            result = 'pt_stock';
            break;
        case 'C':
            result = 'pt_critico';
            break;
        case 'N':
            result = 'pt_sin_stock';
            break;
        default:
    }
    return result;
}

function isDetalleComprobante(pValor) {
    switch (pValor) {
        case "FAC":
            return true;
            break;
        case "NCR":
            return true;
            break;
        case "NDE":
            return true;
            break;
        case "RES":
            return true;
            break;
        case "OSC":
            return true;
            break;
        case "REC":
            return true;
            break;
        default:
            return false;
            break;
    }
}

function ObtenerLinkDeDocumentoDesdeStr(pValor) {
    var resultado = pValor;
    if (pValor.length > 4) {
        var tipo = pValor.substring(0, 3);
        var nro = $.trim(pValor.substring(3, pValor.length).replace('-', ''));
        switch (tipo) {
            case 'FAC':
                resultado = '<a href="' + 'Documento?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a>';
                //                location.href = 'Documento.aspx?t=' + tipo + '&id=' + nro;
                break;
            case 'WEB':
                resultado = '<a href="' + 'Documento?t=' + 'FAC' + '&id=' + nro + '" >' + pValor + '</a>';
                break;
            case 'TRZ':
                resultado = '<a href="' + 'Documento?t=' + 'FAC' + '&id=' + nro + '" >' + pValor + '</a>';
                break;
            case 'PAP':
                resultado = '<a href="' + 'Documento?t=' + 'FAC' + '&id=' + nro + '" >' + pValor + '</a>';
                break;
            case 'PAN':
                resultado = '<a href="' + 'Documento?t=' + 'FAC' + '&id=' + nro + '" >' + pValor + '</a>';
                break;
            case 'NCR':
                resultado = '<a href="' + 'Documento?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a>';
                break;
            case 'NDE':
                resultado = '<a href="' + 'Documento?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a>';
                break;
            case 'RES':
                resultado = '<a href="' + 'Documento?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a>';
                break;
            case 'OSC':
                resultado = '<a href="' + 'Documento?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a>';
                break;
            case 'REC':
                resultado = '<a href="' + 'Documento?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a>';
                break;
            default:
                break;
        }

    }
    return resultado;
}
function getFormatoDocumentoRecibo(pValor) {
    var resultado = pValor;
    if (pValor.length === 14) {
        var tipo = 'REC';
        var nro = $.trim(pValor.replace('-', ''));
        resultado = '<a href="' + 'Documento?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a>';
    }
    return resultado;
}
///// mestizo
$("#menu-close").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

//btn to up
$(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
        $('.buttonontop').fadeIn();
    } else {
        $('.buttonontop').fadeOut();
    }

});
$('.buttonontop').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});

var h = $(window).height();
var $document = $(document),
	$element = $('#hdr');
$document.scroll(function () {
    if ($document.scrollTop() >= 150) {
        $('#hdr').removeClass("navbar-default navbar-static-top");
        $('#hdr').addClass("navbar-inverse navbar-fixed-top");
        $element.fadeIn(0);
    } else {
        $('#hdr').removeClass("navbar-inverse navbar-fixed-top");
        $('#hdr').addClass("navbar-default navbar-static-top");
    }
}
);

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function onclickCreditoDisponible() {
    ObtenerCreditoDisponible(cli_login());
}
function OnCallBackObtenerCreditoDisponible(args) {
    args = eval('(' + args + ')');


    var creditoTotal = args.CreditoDisponibleTotal;
    var creditoSemanal = args.CreditoDisponibleSemanal;

    var strCreditoSemanal = '&nbsp;';
    if (isNotNullEmpty(creditoSemanal)) {
        strCreditoSemanal = '$&nbsp;' + FormatoDecimalConDivisorMiles(creditoSemanal.toFixed(2));
    }
    var strCreditoTotal = '&nbsp;';
    if (isNotNullEmpty(creditoTotal)) {
        strCreditoTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(creditoTotal.toFixed(2));
    }
    if (args.CreditoDisponibleSemanal == null) {
        strCreditoSemanal = null;
    }
    mensaje_CreditoDisponible(strCreditoSemanal, strCreditoTotal);
}
function onclickObtenerSaldoFinalADiciembrePorCliente() {
    ObtenerSaldoFinalADiciembrePorCliente(cli_login());
}
function OnCallBackObtenerSaldoFinalADiciembrePorCliente(args) {
    var strSaldo = '&nbsp;';
    if (isNotNullEmpty(args)) {
        strSaldo = '$&nbsp;' + FormatoDecimalConDivisorMiles(Number.parseFloat(args).toFixed(2));
    }
    mensaje_SaldoFinalADiciembre(strSaldo);
}
function onclickConsultasCtaCte() {
    mensaje_ConsultasCtaCte();
}
function onclickEnviarConsulta() {
    var vMail = $('#idCtaCteMail').val();
    var vComentario = $('#idCtaCteComentario').val();
    if (isNotNullEmpty(vMail) && isNotNullEmpty(vComentario)) {
        modalModuloHide();
        enviarConsultaCtaCte(vMail, vComentario);
    } else {
        var strHtml = '';
        strHtml += '<div class="col-lg-12">';
        strHtml += '<p class="text-center">Complete los datos, por favor.</p>';
        strHtml += '<p>&nbsp;</p>';
        strHtml += '<p>&nbsp;</p>';
        strHtml += '<div class="clear10"></div>';
        strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal">CERRAR</a>';
        strHtml += '</div>';

        mensaje_alert_generic('Información', strHtml);
    }
}
function onclickEnviarConsultaAReclamos() {
    var vMail = $('#idReclamoMail').val();
    var vNombreProducto = $('#idReclamoProducto').val();
    var vComentario = $('#idReclamoComentario').val();
    if (isNotNullEmpty(vMail) && isNotNullEmpty(vComentario)) {
        modalModuloHide();
        enviarConsultaReclamo(vMail, vComentario, vNombreProducto);
    } else {
        var strHtml = '';
        strHtml += '<div class="col-lg-12">';
        strHtml += '<p class="text-center">Complete los datos, por favor.</p>';
        strHtml += '<p>&nbsp;</p>';
        strHtml += '<p>&nbsp;</p>';
        strHtml += '<div class="clear10"></div>';
        strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal">CERRAR</a>';
        strHtml += '</div>';

        mensaje_alert_generic('Información', strHtml);
    }
}
function onclickEnviarConsultaAValePsicotropico() {
    var vMail = $('#idValeMail').val();
    var vNombreProducto = $('#idValeProducto').val();
    var vComentario = $('#idValeComentario').val();
    if (isNotNullEmpty(vMail) && isNotNullEmpty(vComentario)) {
        modalModuloHide();
        enviarConsultaValePsicotropico(vMail, vComentario, vNombreProducto);
    } else {
        var strHtml = '';
        strHtml += '<div class="col-lg-12">';
        strHtml += '<p class="text-center">Complete los datos, por favor.</p>';
        strHtml += '<p>&nbsp;</p>';
        strHtml += '<p>&nbsp;</p>';
        strHtml += '<div class="clear10"></div>';
        strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal">CERRAR</a>';
        strHtml += '</div>';

        mensaje_alert_generic('Información', strHtml);
    }
}
function onresizeBody() {
    if (typeof listaCarritos !== 'undefined') {
        if (listaCarritos != null) {
            for (var i = 0; i < listaCarritos.length; i++) {
                if (isNotNullEmpty(listaCarritos[i].codSucursal)) {
                    ReAjustarColumnasCarritos(listaCarritos[i].codSucursal, false);
                }
            }
        }
    }
    if (typeof listaCarritoTransferPorSucursal !== 'undefined') {
        if (listaCarritoTransferPorSucursal != null) {
            for (var i = 0; i < listaCarritoTransferPorSucursal.length; i++) {
                if (isNotNullEmpty(listaCarritoTransferPorSucursal[i].Sucursal)) {
                    ReAjustarColumnasCarritos(listaCarritoTransferPorSucursal[i].Sucursal, true);
                }
            }
        }
    }
    if (typeof listaProductosBuscados !== 'undefined') {
        if (listaProductosBuscados != null) {
            if (isSubirPedido) {
                setTimeout(function () { ReAjustarColumnasBuscador(); }, 40);
            }
        }
    }
}
function isMostrarImput_AceptaPsicotropicos(pCodtpovta) {
    var varIsMostrarImput_AceptaPsicotropicos = true;
    if (cli_isAceptaPsicotropicos() !== null) {
        if (!cli_isAceptaPsicotropicos()) {
            if (pCodtpovta == 'P2' ||
                pCodtpovta == 'P4' ||
                pCodtpovta == 'E1' ||
                pCodtpovta == 'SC' ||
                pCodtpovta == 'E3' ||
                pCodtpovta == 'P1' ||
                pCodtpovta == 'P3') {
                varIsMostrarImput_AceptaPsicotropicos = false;
            }
        }
    }
    return varIsMostrarImput_AceptaPsicotropicos;
}
function Log(pValue) {
    //if (listaLog == null)
    //    listaLog = [];
    //listaLog.push(pValue);
}

function funLog() {
    //if (listaLog == null || listaLog.length == 0)
    //    return;

    //$.ajax({
    //    type: "POST",
    //    url: "/config/logJS",
    //    data: { pList: listaLog },
    //    success:
    //    function (response) {
    //        listaLog = null;
    //       // OnCallBackSignOff(response);
    //    },
    //    failure: function (response) {
    //       // OnFail(response);
    //    },
    //    error: function (response) {
    //       // OnFail(response);
    //    }
    //});
}

function novedades() {
    var fechaDissmis = new Date($('.nuevo').attr('data-fecha')),
        fechaDissmisCel = new Date($('.nuevo-celu').attr('data-fecha')),
        fechaDissmisSubLink = new Date($('.nuevo-sublink').attr('data-fecha')),
        hoy = new Date();
    if (fechaDissmis < hoy) {
        $('.nuevo').removeClass('nuevo');
    }
    if (fechaDissmisCel < hoy) {
        $('.nuevo-celu').removeClass('nuevo-celu');
    }
    if (fechaDissmisSubLink < hoy) {
        $('.nuevo-sublink').removeClass('nuevo-sublink');
    }
}
function isMostrarImput_FacturaTrazablesProvincia(pSucursal, pIsProductoTrazable) {
    if (listaSucursales != null) {
        if (pIsProductoTrazable) {
            for (var i = 0; i < listaSucursales.length; i++) {
                if (pSucursal == listaSucursales[i].sde_sucursal) {
                    if (!listaSucursales[i].suc_facturaTrazables) {
                        return false;
                    } else if (!listaSucursales[i].suc_facturaTrazablesEnOtrasProvincias &&
                        listaSucursales[i].suc_provincia != null &&
                        listaSucursales[i].suc_provincia != cli_codprov()) {
                        return false;
                    }
                    break;
                }
            }
        }
    }// fin if (listaSucursales != null && listaProductosBuscados != null) {
    return true;
}
/*function isMostrarImput_pedirCC_adaptador(pPro_codtpopro, pSucursalEvaluar, pStk_stock) {
    var listaSucursalStocks_aux = [];

    var itemSucursalStocks_aux = {
        stk_codsuc: pSucursalEvaluar,
        stk_stock: pStk_stock
    };
    listaSucursalStocks_aux.push(itemSucursalStocks_aux);

    return isMostrarImput_pedirCC(pPro_codtpopro, pSucursalEvaluar, listaSucursalStocks_aux);
}*/
function isMostrarImput_pedirCC(pPro_codtpopro, pSucursalEvaluar, pListaSucursalStocks) {
    var sucursalInfo = getSucursalClienteInfo();
    if (sucursalInfo != null &&
        pSucursalEvaluar == 'CC' && // Casa central
        !sucursalInfo.suc_pedirCC_ok &&
        ((pPro_codtpopro == 'P' &&
        sucursalInfo.suc_pedirCC_tomaSoloPerfumeria)//TIPOPRODUCTO_Perfumeria
        || !sucursalInfo.suc_pedirCC_tomaSoloPerfumeria)) {
        var sucReferencia = cli_codsuc();
        if (sucursalInfo.suc_pedirCC_sucursalReferencia != null) {
            sucReferencia = sucursalInfo.suc_pedirCC_sucursalReferencia;
        }
        for (var iSucursal = 0; iSucursal < pListaSucursalStocks.length; iSucursal++) {
            if (pListaSucursalStocks[iSucursal].stk_codsuc === sucReferencia) {
                if (pListaSucursalStocks[iSucursal].stk_stock === 'S') {
                    return false;
                }
                break;
            }
        }
    }
    return true;
}
function MostrarImputPerfu(pPro_codtpopro, pSucursalEvaluar) {
    
    if (listaSucursales != null) {
        for (var iSucursal = 0; iSucursal < listaSucursales.length; iSucursal++) {
            if (listaSucursales[iSucursal].sde_sucursal === pSucursalEvaluar && listaSucursales[iSucursal].suc_trabajaPerfumeria) {
                return true;
                break;
            }
        }
    }
    return false;
}
function getCantidad_SubirArchivo_pedirCC(pPro_codtpopro, pSucursalEvaluar, pListaSucursalStocks) {
    var sucursalInfo = getSucursalClienteInfo();
    if (sucursalInfo != null) {
        var sucReferencia = cli_codsuc();
        if (sucursalInfo.suc_pedirCC_sucursalReferencia != null) {
            sucReferencia = sucursalInfo.suc_pedirCC_sucursalReferencia;
        }
        if (pSucursalEvaluar == sucReferencia &&
           !sucursalInfo.suc_pedirCC_ok &&
            ((pPro_codtpopro == 'P' &&
        sucursalInfo.suc_pedirCC_tomaSoloPerfumeria)//TIPOPRODUCTO_Perfumeria
        || !sucursalInfo.suc_pedirCC_tomaSoloPerfumeria)) //TIPOPRODUCTO_Perfumeria
        {
            for (var iSucursal = 0; iSucursal < pListaSucursalStocks.length; iSucursal++) {
                if (pListaSucursalStocks[iSucursal].stk_codsuc === 'CC') {// Casa central
                    if (isNotNullEmpty(pListaSucursalStocks[iSucursal].cantidadSucursal)) {
                        return pListaSucursalStocks[iSucursal].cantidadSucursal;
                    }
                    break;
                }
            }
        }
    }
    return '';
}