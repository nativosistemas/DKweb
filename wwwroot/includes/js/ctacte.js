var listaUltimosResumenes = null;
var listaComprobantesAImprimirEnBaseAResumen = null;
var httpRaiz = null;
var isButtonDescargarTodos = false;
var contadorDescargarTodosPDF = 0;
var dateObraSocialDesde = null;
var dateObraSocialHasta = null;
var listaComprobantesObraSocial = null;
var listaComprobantesObraSocialEntreFechas = null;
var listaDeudaVencida = null;
var listaSaldoSinImputar = null;

jQuery(document).ready(function () {
    if (httpRaiz == null) {
        httpRaiz = $('#hiddenRaiz').val();
        if (typeof httpRaiz == 'undefined') {
            httpRaiz = null;
        }
    }
    if (listaUltimosResumenes == null) {
        listaUltimosResumenes = eval('(' + $('#hiddenListaUltimosResumenes').val() + ')');
        if (typeof listaUltimosResumenes == 'undefined') {
            listaUltimosResumenes = null;
        }
    }
    if (listaComprobantesAImprimirEnBaseAResumen == null) {
        listaComprobantesAImprimirEnBaseAResumen = eval('(' + $('#hiddenListaComprobantesAImprimirEnBaseAResumen').val() + ')');
        if (typeof listaComprobantesAImprimirEnBaseAResumen == 'undefined') {
            listaComprobantesAImprimirEnBaseAResumen = null;
        }
    }
    if (listaComprobantesAImprimirEnBaseAResumen != null) {
        for (var i = 0; i < listaComprobantesAImprimirEnBaseAResumen.length; i++) {
            listaComprobantesAImprimirEnBaseAResumen[i].isArchivoGenerado = false;
            listaComprobantesAImprimirEnBaseAResumen[i].isLlamarArchivoPDF = true;
            listaComprobantesAImprimirEnBaseAResumen[i].isDescargarTodos = false;
            listaComprobantesAImprimirEnBaseAResumen[i].contadorPDF = 0;
        }
    }
    //if (listaUltimosResumenes != null) {
    //    CargarUltimosResumenes();
    //}  
});

function CargarUltimosResumenes() {
    var strHtml = '';
    if (isNotNullEmpty(listaUltimosResumenes)) {
        //strHtml += '<div style="text-align:left;font-size:12px; margin-bottom:5px;"><b>ÚLTIMOS RESÚMENES</b></div>';
        if (listaUltimosResumenes.length > 0) {
            // boton volver
            //// fin boton volver
            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">N&uacute;mero</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Fecha</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Semana</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs visible-sm">Semana</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Monto</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Link descarga</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody>';
            for (var i = 0; i < listaUltimosResumenes.length; i++) {

                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center">' + listaUltimosResumenes[i].Numero + '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center c_to_l-xs">' + listaUltimosResumenes[i].PeriodoDesdeToString + ' / ' + listaUltimosResumenes[i].PeriodoHastaToString + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 text-center c_to_l-sm">' + listaUltimosResumenes[i].NumeroSemana + '</td>';
                var strImporte = '&nbsp;';
                if (isNotNullEmpty(listaUltimosResumenes[i].TotalResumen)) {
                    strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaUltimosResumenes[i].TotalResumen.toFixed(2));
                }
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center">' + strImporte + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-3 text-center">' + '<a href="../ctacte/descargaResumenesDetalle?id=' + listaUltimosResumenes[i].Numero + '" >';
                strHtml += 'IR A DESCARGAS' + '</a>' + '</td>';

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
    } else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeSeProdujoErrorIntentaMasTarde + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
    }
    $('#divContenedorDocumento').html(strHtml);
    $('.footable').footable();
}
function CambiarSemanaFichaDebeHaber() {
    IsBanderaUsarDll('OnCallBackIsBanderaUsarDll_CambiarSemanaFichaDebeHaber');

}

function OnCallBackIsBanderaUsarDll_CambiarSemanaFichaDebeHaber(args) {
    if (args) {
        listaFicha = null;
        document.getElementById('divResultadoFicha').innerHTML = '';
        var indexSemana = $('#cmbSemana').val();
        ObtenerMovimientosDeFicha(indexSemana);
    } else {
        mensaje_informacion_generico(objMensajeDllNoDisponible);
    }
}
function OnCallBackObtenerMovimientosDeFicha(args) {
    if (args != '') {
        listaFicha = eval('(' + args + ')');
    }
    CargarFichaEnTablaHtml();
}

function CargarFichaEnTablaHtml() {
    var strHtml = '';
    if (listaFicha != null) {
        if (listaFicha.length > 0) {
            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-3 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Tipo Comprobante</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs visible-sm">Tipo</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Comprobante</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs visible-sm">Comprobante</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Motivo</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs visible-sm">Motivo</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-3 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha vencimiento</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Debe</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Debe</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Haber</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Haber</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_border">Saldo</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody>';
            for (var i = 0; i < listaFicha.length; i++) {

                // strHtml += '<td class="first-td2';
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                } //first-td2
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-3 text-center">' + listaFicha[i].FechaToString + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-12 text-center c_to_l-sm">' + listaFicha[i].TipoComprobanteToString + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 text-center c_to_l-sm">';
                if (isDetalleComprobante(listaFicha[i].TipoComprobanteToString)) {
                    strHtml += '<a href="../ctacte/Documento?t=' + listaFicha[i].TipoComprobanteToString + '&id=' + listaFicha[i].Comprobante + '" >' + listaFicha[i].Comprobante + '</a>';
                } else {
                    strHtml += listaFicha[i].Comprobante;
                }
                strHtml += '</td>';

                strHtml += '<td class="col-lg-3 col-md-3 col-sm-12 text-center c_to_l-sm">' + listaFicha[i].Motivo.replace(' ', '&nbsp;') + '</td>';
                // Fecha vencimiento vacia cuando es el primer registro
                if (i == 0) {
                    strHtml += '<td class="col-lg-2 col-md-2 col-sm-3 text-center"></td>';
                } else {
                    strHtml += '<td class="col-lg-2 col-md-2 col-sm-3 text-center">' + listaFicha[i].FechaVencimientoToString + '</td>';
                }
                // FIN Fecha vencimiento vacia cuando es el primer registro
                var strDebe = '&nbsp;';
                if (isNotNullEmpty(listaFicha[i].Debe)) {
                    strDebe = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaFicha[i].Debe.toFixed(2)); //'<div style="word-wrap:normal !important;">' + +'</div>';
                }
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-12 text-center c_to_l-xs">' + strDebe + '</td>';
                var strHaber = '&nbsp;';
                if (isNotNullEmpty(listaFicha[i].Haber)) {
                    strHaber = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaFicha[i].Haber.toFixed(2)); //'<div style="word-wrap:normal !important;">' +  + '</div>'; //weight:40px;
                }
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-12 text-center c_to_l-xs">' + strHaber + '</td>';
                var strSaldo = '&nbsp;';
                if (isNotNullEmpty(listaFicha[i].Saldo)) {
                    strSaldo = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaFicha[i].Saldo.toFixed(2));
                }
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center">' + strSaldo + '</td>';
                strHtml += '</tr>';
            }
            strHtml += '</tbody>';
            strHtml += '</table>';

            //if (listaFicha.length > cantFilaParaEnCabezado) {
            //    strHtml += '<br/>';
            //    strHtml += '<input type="button" onclick="volver()" value="VOLVER" class="btn_gral" />';
            //}

        }
        else {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<tbody>';
            strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
            strHtml += '</tbody>';
            strHtml += '</table>';
        }
    }
    else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeSeProdujoErrorIntentaMasTarde + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
    }
    document.getElementById('divResultadoFicha').innerHTML = strHtml;
    $('.footable').footable();
}

function CargarComprobantesAImprimirEnBaseAResumen() {
    var strHtml = '';
    if (isNotNullEmpty(listaComprobantesAImprimirEnBaseAResumen)) {

        //strHtml += '<input type="button" onclick="volver()" value="VOLVER" class="btn_gral" />';

        //strHtml += '<div style="text-align:left;font-size:12px; margin-bottom:5px;"><b>COMPROBANTES POR IMPRIMIR EN BASE A RESUMEN</b></div>';

        //strHtml += '<div style="height:25px;">&nbsp;</div>';
        //strHtml += '<table style="float: right;">';
        //strHtml += '<tr>';
        //strHtml += '<th style="vertical-align: bottom;cursor: pointer;"  onclick="funDescargarTodos(); return false;" >DESCARGAR TODOS:</th>';
        //strHtml += '<th>';
        //strHtml += '<a href="#"  onclick="funDescargarTodos(); return false;" style="cursor: pointer;float: right;">';
        //strHtml += '<img  class="cssImagenDescarga"  src="../../img/iconos/box_down.png" alt="txt" title="DESCARGAR TODOS" height="32" width="32" style="height:32px !important;width:32px !important;" />';
        //strHtml += '</a>';
        //strHtml += '</th>';
        //strHtml += '</tr>';
        //strHtml += '</table>';

        if (listaComprobantesAImprimirEnBaseAResumen.length > 0) {
            //// boton volver
            //strHtml += '<input type="button" onclick="volver()" value="VOLVER" class="btn_gral" />';
            //strHtml += '<div style="height:25px;">&nbsp;</div>';
            ////// fin boton volver
            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Tipo Comprobante</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Tipo</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">N&uacute;mero</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Fecha</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Descarga</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody>';
            for (var i = 0; i < listaComprobantesAImprimirEnBaseAResumen.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-3 col-md-1 col-sm-3 text-center c_to_l-xs">' + listaComprobantesAImprimirEnBaseAResumen[i].TipoComprobante + '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center">' + listaComprobantesAImprimirEnBaseAResumen[i].NumeroComprobante + '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center c_to_l-xs">' + listaComprobantesAImprimirEnBaseAResumen[i].FechaComprobanteToString + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-3 text-center">';
                //'<img  class="cssImagenDescarga"  id="imgPdf_' + i + '" src="../../img/iconos/PDF.png" alt="txt" title="Descarga pdf" height="34" width="32" style="height:34px !important;width:32px !important;" />' + 
                //strHtml += '<a class="pdf" href="' + httpRaiz + 'servicios/generar_archivoPdf.aspx?tipo=' + listaComprobantesAImprimirEnBaseAResumen[i].TipoComprobante + '&nro=' + listaComprobantesAImprimirEnBaseAResumen[i].NumeroComprobante + '"  onclick="return funImprimirComprobantePdf_Resumenes(' + '\'' + i + '\'' + ');" >' + '<span>PDF</span></a>' + '</a>';
                strHtml += '<div class="load_gif" id="btn_to_hide-' + i + '-img"></div><a id="btn_to_hide-' + i + '" class="pdf hide_btn" href="' + httpRaiz + 'servicios/generar_archivoPdf.aspx?tipo=' + listaComprobantesAImprimirEnBaseAResumen[i].TipoComprobante + '&nro=' + listaComprobantesAImprimirEnBaseAResumen[i].NumeroComprobante + '"  onclick="return funImprimirComprobantePdf_Resumenes(' + '\'' + i + '\'' + ');" ><span>PDF</span></a>';
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
            //document.getElementById('divResultadoFicha').innerHTML = strHtml;
        }


    }
    else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeSeProdujoErrorIntentaMasTarde + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
        //document.getElementById('divResultadoFicha').innerHTML = strHtml;
    }
    $('#divContenedorDocumento').html(strHtml);
    $('.footable').footable();
}

function funDescargarTodos() {
    if (!isButtonDescargarTodos) {
        isButtonDescargarTodos = true;
        for (var i = 0; i < listaComprobantesAImprimirEnBaseAResumen.length; i++) {
            //$('#imgPdf_' + i).attr('src', '../../img/varios/ajax-loader.gif');
            mostrarLoaderBotonDescarga(i);
            listaComprobantesAImprimirEnBaseAResumen[i].isArchivoGenerado = false;
            listaComprobantesAImprimirEnBaseAResumen[i].isLlamarArchivoPDF = true;
            listaComprobantesAImprimirEnBaseAResumen[i].isDescargarTodos = false;
            listaComprobantesAImprimirEnBaseAResumen[i].contadorPDF = 0;
        }
        contadorDescargarTodosPDF = 0;
        var nombreArchivoPDF = 'RCO' + '_' + getUrlParameter('id');
        setTimeout(function () { IsExistenciaComprobanteResumenes_todos(nombreArchivoPDF, contadorDescargarTodosPDF); }, 10);
        return false;
    } else { return false; }

}
function funImprimirComprobantePdf_Resumenes(pValor) {
    if (!isButtonDescargarTodos) {
        if (listaComprobantesAImprimirEnBaseAResumen[pValor].isArchivoGenerado) {
            return true;
        } else {
            if (listaComprobantesAImprimirEnBaseAResumen[pValor].isLlamarArchivoPDF) {
                listaComprobantesAImprimirEnBaseAResumen[pValor].contadorPDF = 0;
                var nombreArchivoPDF = listaComprobantesAImprimirEnBaseAResumen[pValor].TipoComprobante + '_' + listaComprobantesAImprimirEnBaseAResumen[pValor].NumeroComprobante;
                //$('#imgPdf_' + pValor).attr('src', '../../img/varios/ajax-loader.gif');
                mostrarLoaderBotonDescarga(pValor);
                listaComprobantesAImprimirEnBaseAResumen[pValor].isLlamarArchivoPDF = false;
                setTimeout(function () { IsExistenciaComprobanteResumenes(nombreArchivoPDF, pValor, listaComprobantesAImprimirEnBaseAResumen[pValor].contadorPDF); }, 10);
            }
            return false;
        }
    } else { return false; }
}
function mostrarLoaderBotonDescarga(pValor) {
    var myButton = document.getElementById('btn_to_hide-' + pValor);
    var myImage = document.getElementById('btn_to_hide-' + pValor + '-img');
    myButton.style.visibility = 'hidden';
    myImage.style.display = 'inline';
}
function ocultarLoaderBotonDescarga(pValor) {
    var myButton = document.getElementById('btn_to_hide-' + pValor);
    var myImage = document.getElementById('btn_to_hide-' + pValor + '-img');
    myImage.style.display = 'none';
    myButton.style.visibility = 'visible'
}
function OnCallBackIsExistenciaComprobanteResumenes(args) {
    if (args.isOk) {
        listaComprobantesAImprimirEnBaseAResumen[args.index].isArchivoGenerado = true;
        listaComprobantesAImprimirEnBaseAResumen[args.index].isLlamarArchivoPDF = true;
        //$('#imgPdf_' + args.index).attr('src', '../../img/iconos/PDF.png');
        ocultarLoaderBotonDescarga(args.index);
        window.open('../../servicios/generar_archivoPdf.aspx?tipo=' + listaComprobantesAImprimirEnBaseAResumen[args.index].TipoComprobante + '&nro=' + listaComprobantesAImprimirEnBaseAResumen[args.index].NumeroComprobante, '_parent');
    } else {
        if (listaComprobantesAImprimirEnBaseAResumen[args.index].contadorPDF <= 300) {
            setTimeout(function () { IsExistenciaComprobanteResumenes(args.nombreArchivo, args.index, listaComprobantesAImprimirEnBaseAResumen[args.index].contadorPDF); }, 1000);
        } else {
            listaComprobantesAImprimirEnBaseAResumen[args.index].isLlamarArchivoPDF = true;
            //$('#imgPdf_' + args.index).attr('src', '../../img/iconos/PDF.png');
            mostrarLoaderBotonDescarga(args.index);
            mensaje_informacion_generico(objMensajeNoSePudoDescargarArchivoInténteloNuevamente);
        }
        listaComprobantesAImprimirEnBaseAResumen[args.index].contadorPDF++;
    }
}
function OnCallBackIsExistenciaComprobanteResumenes_todos(args) {
    if (args.isOk) {
        for (var i = 0; i < listaComprobantesAImprimirEnBaseAResumen.length; i++) {
            listaComprobantesAImprimirEnBaseAResumen[i].isDescargarTodos = true;
            listaComprobantesAImprimirEnBaseAResumen[i].isArchivoGenerado = false;
            listaComprobantesAImprimirEnBaseAResumen[i].isLlamarArchivoPDF = true;
            //$('#imgPdf_' + i).attr('src', '../../img/iconos/PDF.png');
            ocultarLoaderBotonDescarga(i);
        }
        isButtonDescargarTodos = false;
        var NumeroComprobante = getUrlParameter('id');
        window.open('../../servicios/generar_archivoPdf.aspx?tipo=' + 'RCO' + '&nro=' + NumeroComprobante, '_parent');
    } else {
        if (contadorDescargarTodosPDF <= 300) {
            setTimeout(function () { IsExistenciaComprobanteResumenes_todos(args.nombreArchivo, contadorDescargarTodosPDF); }, 1000);
        } else {
            for (var i = 0; i < listaComprobantesAImprimirEnBaseAResumen.length; i++) {
                listaComprobantesAImprimirEnBaseAResumen[i].isDescargarTodos = true;
                listaComprobantesAImprimirEnBaseAResumen[i].isArchivoGenerado = false;
                listaComprobantesAImprimirEnBaseAResumen[i].isLlamarArchivoPDF = true;
                //$('#imgPdf_' + i).attr('src', '../../img/iconos/PDF.png');
                ocultarLoaderBotonDescarga(i);
            }
            isButtonDescargarTodos = false;
            mensaje_informacion_generico(objMensajeNoSePudoDescargarArchivoInténteloNuevamente);
        }
        contadorDescargarTodosPDF++
    }
}
function funSetarFechaObraSocial(pDesde, pHasta) {
    dateObraSocialDesde = new Date(pDesde);
    dateObraSocialHasta = new Date(pHasta);

}
function onchangePlanesDeObrasSociales() {
    if ($("input:checked").val() == 'nro') {
        if ($("#cmbPlanObraSocial option:selected").attr('data-PideSemana') == 'False') {
            $(".PideSemana_true").css('display', 'block');
            $(".PideSemana_false").css('display', 'none');
        } else {
            $(".PideSemana_true").css('display', 'none');
            $(".PideSemana_false").css('display', 'block');
        }
    }
}
function onclickConsultarObraSocial() {
    var nombrePlan = $('#cmbPlanObraSocial').val();
    if ($("input:checked").val() == 'nro') {
        var anio = null;
        var mes = null;
        var quincena = null;
        var semana = null;
        var parametrosUrl = '';
        if ($("#cmbPlanObraSocial option:selected").attr('data-PideSemana') == 'True') {
            anio = $('#cmbFalseAño').val();
            semana = $('#cmbFalseNroSemana').val();
            parametrosUrl = 'nombrePlan=' + nombrePlan + '&anio=' + anio + '&semana=' + semana;
        } else {
            mes = $('#cmbTrueMes').val();
            anio = $('#cmbTrueAño').val();
            quincena = $('#cmbTrueQuincena').val();
            parametrosUrl = 'nombrePlan=' + nombrePlan + '&anio=' + anio + '&mes=' + mes + '&quincena=' + quincena;
        }
        location.href = '../ctacte/ConsultaDeComprobantesObraSocialResultado?' + parametrosUrl;
    } else {

        var fechaDesde = dateObraSocialDesde;
        var fechaHasta = dateObraSocialHasta;

        var intAñoDesde = fechaDesde.getFullYear();
        var intMesDesde = fechaDesde.getMonth() + 1;
        var intDiaDesde = fechaDesde.getDate();
        var intAñoHasta = fechaHasta.getFullYear();
        var intMesHasta = fechaHasta.getMonth() + 1;
        var intDiaHasta = fechaHasta.getDate();

        //nombrePlan
        ObtenerComprobantesObrasSocialesDePuntoDeVentaEntreFechas(cli_login(), nombrePlan, intDiaDesde, intMesDesde, intAñoDesde, intDiaHasta, intMesHasta, intAñoHasta)
        //location.href = '../ctacte/ConsultaDeComprobantesObraSocialResultadoRango';
    }
    return false;
}
$('input[name="groupObraSocial"]').change(
    function () {
        onChangeGroupObraSocial();
        //if ($("input:checked").val() == 'nro') {
        //    onchangePlanesDeObrasSociales();
        //    $(".RangoFechaObraSocial").css('display', 'none');
        //} else {
        //    $(".PideSemana_true").css('display', 'none');
        //    $(".PideSemana_false").css('display', 'none');
        //    $(".RangoFechaObraSocial").css('display', 'block');
        //}
    }
   
);
function onChangeGroupObraSocial() {
  
        if ($("input:checked").val() == 'nro') {
            onchangePlanesDeObrasSociales();
            $(".RangoFechaObraSocial").css('display', 'none');
            $(".optionObraSocialTodos").css('display', 'none');
            $('#cmbPlanObraSocial').prop("selectedIndex", 1);
        } else {
            $(".PideSemana_true").css('display', 'none');
            $(".PideSemana_false").css('display', 'none');
            $(".RangoFechaObraSocial").css('display', 'block');
            $(".optionObraSocialTodos").css('display', 'block');
            $('#cmbPlanObraSocial').prop("selectedIndex", 0);
        }
        
}

function CargarHtmlObraSocial() {

    if (listaComprobantesObraSocial == null) {
        listaComprobantesObraSocial = eval('(' + $('#hiddenListaPlanillasObraSocial').val() + ')');
        if (typeof listaComprobantesObraSocial == 'undefined') {
            listaComprobantesObraSocial = null;
        }
    }


    var strHtml = '';
    if (listaComprobantesObraSocial != null) {

        if (listaComprobantesObraSocial.length > 0) {

            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-1 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">A&ntilde;o</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">A&ntilde;o</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Mes</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Mes</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Quincena</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Quincena</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-3 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Semana</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Semana</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Importe</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody>';

            for (var i = 0; i < listaComprobantesObraSocial.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-2 col-md-3 col-sm-3 text-center c_to_l-xs">' + listaComprobantesObraSocial[i].FechaToString.substring(0, 10) + '</td>'; // .substring(10) 28/02/2013 10:14:00 a.m. SOLO MOSTRAR FECHA
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center c_to_l-xs">' + listaComprobantesObraSocial[i].Anio + '</td>';
                strHtml += '<td class="col-lg-2 col-md-4 col-sm-4 text-center c_to_l-xs">' + listaComprobantesObraSocial[i].Mes + '</td>';
                strHtml += '<td class="col-lg-2 col-md-4 col-sm-4 text-center c_to_l-xs">' + listaComprobantesObraSocial[i].Quincena + '</td>';
                strHtml += '<td class="col-lg-2 col-md-4 col-sm-4 text-center c_to_l-xs">' + listaComprobantesObraSocial[i].Semana + '</td>';
                var strImporte = '&nbsp;';
                if (isNotNullEmpty(listaComprobantesObraSocial[i].Importe)) {
                    strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaComprobantesObraSocial[i].Importe.toFixed(2));
                }
                strHtml += '<td class="col-lg-2 col-md-3 col-sm-3 text-right">' + strImporte + '</td>';
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
    }
    else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeSeProdujoErrorIntentaMasTarde + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
    }
    $('#divResultadoObraSocial').html(strHtml);
    $('.footable').footable();
}


function CargarHtmlDeudaVencida() {
    CargarHtmlDeudaVencida_Generica(listaDeudaVencida, 'divContenedorDeudaVencida');
}
function CargarHtmlSaldoSinImputar() {
    CargarHtmlDeudaVencida_Generica(listaSaldoSinImputar, 'divContenedor_creditos_sinimputar');
}
function CargarHtmlDeudaVencida_Generica(pLista, pNameID) {
    var listaGenerica = pLista;
    var strHtml = '';
    if (listaGenerica != null) {

        if (listaGenerica.length > 0) {
            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Vencimiento</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Vencimiento</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Comprobante</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Comprobante</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Semana</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Semana</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Importe</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Saldo</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody>';
            var total_importe = 0;
            var total_saldo = 0;
            for (var i = 0; i < listaGenerica.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                var compRes = '';
                if (listaGenerica[i].TipoComprobanteToString == 'RES') {
                    var splitFecha = listaGenerica[i].FechaVencimientoToString.split('/');
                    var FechaVtoString = splitFecha[2] + "/" + splitFecha[1] + "/" + splitFecha[0];
                    compRes = '<i data-toggle="tooltip" title="Ver Detalle de Vencimiento" class="fa fa-search float-left" style="cursor: pointer;" onclick="ObtenerVtosResumenes(\'' + listaGenerica[i].NumeroComprobante + '\',\'' + FechaVtoString + '\')"></i>';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center">' + listaGenerica[i].FechaToString + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center c_to_l-xs">' + compRes + listaGenerica[i].FechaVencimientoToString + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center c_to_l-xs">';
                if (isDetalleComprobante(listaGenerica[i].TipoComprobanteToString)) {
                    strHtml += '<a class="noImprimir" href="Documento?t=' + listaGenerica[i].TipoComprobanteToString + '&id=' + listaGenerica[i].NumeroComprobante + '" >' + listaGenerica[i].TipoComprobanteToString + ' ' + listaGenerica[i].NumeroComprobante + '</a>';
                    strHtml += '<div class="siImprimir">' + listaGenerica[i].TipoComprobanteToString + ' ' + listaGenerica[i].NumeroComprobante + '</div>';
                } else {
                    strHtml += listaGenerica[i].TipoComprobanteToString + ' ' + listaGenerica[i].NumeroComprobante;

                }
                strHtml += '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center c_to_l-xs">' + listaGenerica[i].Semana + '</td>';
                var strImporte = '&nbsp;';
                if (isNotNullEmpty(listaGenerica[i].Importe)) {
                    total_importe += listaGenerica[i].Importe;
                    strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaGenerica[i].Importe.toFixed(2));
                }
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-right">' + strImporte + '</td>';
                var strSaldo = '&nbsp;';
                if (isNotNullEmpty(listaGenerica[i].Saldo)) {
                    total_saldo += listaGenerica[i].Saldo;
                    strSaldo = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaGenerica[i].Saldo.toFixed(2));
                }
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-right">' + strSaldo + '</td>';

                strHtml += '</tr>';
            }
            strHtml += '</tbody>';
            strHtml += '<tfoot>';
            strHtml += '<tr >'; //class="grs"
            //strHtml += '<td colspan="3" class="col-lg-7 col-sm-7 hidden-xs"></td>';
            strHtml += '<td class="col-lg-1 col-md-2 col-sm-2 text-center c_to_l-xs hidden-xs"></td>';
            strHtml += '<td class="col-lg-1 col-md-2 col-sm-2 text-center c_to_l-xs hidden-xs"></td>';
            strHtml += '<td class="col-lg-1 col-md-2 col-sm-2 text-center c_to_l-xs hidden-xs"></td>';
            strHtml += '<td class="col-lg-1 col-md-2 col-sm-2 col-xs-4 text-center">TOTAL</td>';
            //strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center c_to_l-xs">TOTAL</td>';
            var strImporteTotal = '&nbsp;';
            if (isNotNullEmpty(total_importe)) {
                strImporteTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(total_importe.toFixed(2));
            }
            strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-right pr_est">' + strImporteTotal + '</td>';
           // strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center c_to_l-xs pr_est">' + strImporteTotal + '</td>';
            var strSaldoTotal = '&nbsp;';
            if (isNotNullEmpty(total_saldo)) {
                strSaldoTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(total_saldo.toFixed(2));
            }
            strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-right pr_est">' + strSaldoTotal + '</td>';
            //strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center c_to_l-xs pr_est">' + strSaldoTotal + '</td>';
            strHtml += '</tr>';
            strHtml += '</tfoot>';

            strHtml += '</table>';
        } else {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<tbody>';
            strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
            strHtml += '</tbody>';
            strHtml += '</table>';
        }
    }
    else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeSeProdujoErrorIntentaMasTarde + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
    }
    $('#' + pNameID).html(strHtml);
    $('.footable').footable();
}

function CargarHtmlObraSocial_EntreFechas() {
    if (listaComprobantesObraSocialEntreFechas == null) {
        listaComprobantesObraSocialEntreFechas = eval('(' + $('#hiddenListaConsObraSocial').val() + ')');
        if (typeof listaComprobantesObraSocialEntreFechas == 'undefined') {
            listaComprobantesObraSocialEntreFechas = null;
        }
    }

    var strHtml = '';
    if (listaComprobantesObraSocialEntreFechas != null) {

        if (listaComprobantesObraSocialEntreFechas.length > 0) {

            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-3 col-md-2 col-sm-1 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';                                
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">N&deg; Comprobante</td></tr>';
            strHtml += '</table>';                                
            strHtml += '<span class="thd_letra_chica visible-xs">N&deg; Comprobante</span>';                               
            strHtml += '</th>';        
            strHtml += '<th class="col-lg-3 col-md-2 col-sm-3 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Detalle</td></tr>';
            strHtml += '</table>';                                
            strHtml += '<span class="thd_letra_chica visible-xs">Detalle</span>';                              
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Importe</td></tr>';
            strHtml += '</table>';                                
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody>';
            var total_importe = 0;
            for (var i = 0; i < listaComprobantesObraSocialEntreFechas.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                if ( listaComprobantesObraSocialEntreFechas[i].Importe > 0 )
                { //listaComprobantesObraSocialEntreFechas[i].TipoComprobante == "NDE" &&
                    strHtmlColorFondo += ' row_debitos ';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-2 col-md-3 col-sm-3 text-center">' + listaComprobantesObraSocialEntreFechas[i].FechaComprobanteToString + '</td>'; 
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-6 text-center c_to_l-xs">';

                if (isDetalleComprobante(listaComprobantesObraSocialEntreFechas[i].TipoComprobante)) {
                    strHtml += '<a class="noImprimir" href="Documento?t=' + listaComprobantesObraSocialEntreFechas[i].TipoComprobante + '&id=' + listaComprobantesObraSocialEntreFechas[i].NumeroComprobante + '" >' + listaComprobantesObraSocialEntreFechas[i].TipoComprobante + ' ' + listaComprobantesObraSocialEntreFechas[i].NumeroComprobante + '</a>';
                    strHtml += '<div class="siImprimir">' + listaComprobantesObraSocialEntreFechas[i].TipoComprobante + ' ' + listaComprobantesObraSocialEntreFechas[i].NumeroComprobante + '</div>';
                } else {
                    strHtml += listaComprobantesObraSocialEntreFechas[i].TipoComprobante + ' ' + listaComprobantesObraSocialEntreFechas[i].NumeroComprobante;

                }
               // listaComprobantesObraSocialEntreFechas[i].TipoComprobante + '-' + listaComprobantesObraSocialEntreFechas[i].NumeroComprobante
                strHtml += '</td>';
                strHtml += '<td class="col-lg-2 col-md-4 col-sm-4 text-center c_to_l-xs">' + listaComprobantesObraSocialEntreFechas[i].Detalle + '</td>';
                var strImporte = '&nbsp;';
                if (isNotNullEmpty(listaComprobantesObraSocialEntreFechas[i].Importe)) {
                    total_importe += listaComprobantesObraSocialEntreFechas[i].Importe;
                    strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaComprobantesObraSocialEntreFechas[i].Importe.toFixed(2));
                }
                strHtml += '<td class="col-lg-2 col-md-3 col-sm-3 text-right">' + strImporte + '</td>';
                strHtml += '</tr>';
            }
            strHtml += '</tbody>';

            strHtml += '<tfoot>';
            strHtml += '<tr class="grs">';

            strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs"></td>';
            strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center hidden-xs"></td>';

            //strHtml += '<td colspan="2" class="col-lg-8 col-sm-7 hidden-xs"></td>';
            strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-8 text-right">TOTAL</td>';
            var strImporteTotal = '&nbsp;';
            if (isNotNullEmpty(total_importe)) {
                strImporteTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(total_importe.toFixed(2));
            }
            strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-right pr_est">' + strImporteTotal + '</td>';
            strHtml += '</tr>';
            strHtml += '</tfoot>';  

            strHtml += '</table>';

        } else {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<tbody>';
            strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
            strHtml += '</tbody>';
            strHtml += '</table>';
        }
    }
    else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeSeProdujoErrorIntentaMasTarde + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
    }
    $('#divResultadoObraSocialEntreFechas').html(strHtml);
    $('.footable').footable();
}

function ObtenerVtosResumenes(NroResumen, fechaVto) {
    var fecha = new Date(fechaVto);
    console.log(fecha, NroResumen);
    $.ajax({
        type: "POST",
        url: "/ctacte/ObtenerVencimientosResumenPorFecha",
        data: { pNumeroResumen: NroResumen, pFechaVencimiento: fechaVto },
        success:
            function (response) {
                cVencimientosResumen = eval('(' + response + ')');
                MostrarVencimientos(cVencimientosResumen);
            },
        failure: function (response) {
            alert(response);
        },
        error: function (response) {

            alert(response);
        }
    });
}


function MostrarVencimientos(cVencimientosResumen) {
    var total = 0;
    var html = '<table with="100%" class="table table-striped" style="background: #e1e1e1;">';
    html += '<thead>';
    html += '<tr style="height: 40px;"><th class="text-center">Comprobante<br></th><th class="text-center">Número<br></th><th class="text-center">Fecha<br></th><th class="text-center">Importes<br></th></tr></thead>';
    html += '<tbody class="table-striped">';
    for (var i = 0; i < cVencimientosResumen.length; i++) {
        html += '<tr style="height: 40px">';
        html += '<td class="text-center">' + cVencimientosResumen[i].Tipo + '</td>';
        html += '<td class="text-center"><a href="Documento?t=' + cVencimientosResumen[i].Tipo + '&id=' + cVencimientosResumen[i].NumeroComprobante + '" >' + cVencimientosResumen[i].NumeroComprobante + '</a></td>';
        html += '<td class="text-center">' + cVencimientosResumen[i].FechaToString + '</td>';
        html += '<td class="text-right">$ ' + FormatoDecimalConDivisorMiles(Number(cVencimientosResumen[i].Importe).toFixed(2)) + '</td>';
        html += '</tr>';
        total += cVencimientosResumen[i].Importe
    }
    //html += '<tr><td colspan="3" class="text-right"><em>TOTAL</em></td><td class="text-right">' + Number( total ).toFixed( 2 ) + '</td></tr>'
    html += '</tbody></table>';

    //mensaje(, html);

    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header">';
    strHtml += '<div class="col-12">';
    strHtml += '<h5 style="color: steelblue;">Comprobantes con vencimiento ' + cVencimientosResumen[0].FechaVencimientoToString + '<br>Total: $ ' + FormatoDecimalConDivisorMiles(Number(total).toFixed(2)) + '</h5>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body no-padding"><div class="col-12">';
    strHtml += html;
    strHtml += '</div></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();

    // $(".fa.fa-times").hide();
    //$("#modalModulo").unbind("click");
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})