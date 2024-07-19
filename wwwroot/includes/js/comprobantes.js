var dateComprobanteDesde = null;
var dateComprobanteHasta = null;
var objListaComprobante = null;
var listaComprobantesEntreFecha = null;
var claseDocumento = null;
function funSetarFechaComprobante(pDesde, pHasta) {
    dateComprobanteDesde = new Date(pDesde);
    dateComprobanteHasta = new Date(pHasta);

}

function onclickConsultar() {
    consultarComprobantesCtaCte(cli_codigo());
    return false;
}
function formatDateToYYYYMMDD(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}


function consultarComprobantesCtaCte(pValue) {
    if (pValue != null) {
        var fechaDesde = dateComprobanteDesde;
        var fechaHasta = dateComprobanteHasta;

        var formattedFechaDesde = formatDateToYYYYMMDD(fechaDesde);
        var formattedFechaHasta = formatDateToYYYYMMDD(fechaHasta);

        ObtenerComprobanteCuentaCorriente(pValue, formattedFechaDesde, formattedFechaHasta, claseDocumento);
    } else {
        mensaje_informacion_generico(objMensajeDllNoDisponible);
    }
}

function OnCallBackAgregarVariableSessionConsultaDeComprobantes(args) {
    var tipo = $('#cmbTipoComprobanteFecha').val().substring(0, 3);
    location.href = 'RespuestaConsultaDeComprobantes?t=' + tipo;
}

function OnCallBackObtenerComprobantesDiscriminadosDePuntoDeVentaEntreFechas(args) {
    location.href = 'comprobantescompleto';
}
function onclickComasdprobanteNro() {
    IsBanderaUsarDll('OnCallBackIsBanderaUsarDll_ComprobanteNro');
    return false;
}
function onclickComprobanteNro() {
        var nro = $('#txtNroComprobante').val();
        if (nro != null) {
        var parteAdelante = '';
        parteAdelante = $("#cmbTipoComprobante option:selected").text().substring(4);
        location.href = 'Documento?t=' + $('#cmbTipoComprobante').val().substring(0, 3) + '&id=' + String(parteAdelante) + String(nro);
    } else {
        //alert(objMensajeDllNoDisponible);
        mensaje_informacion_generico(objMensajeDllNoDisponible);
    }
}
function onchangeTipoComprobanteElejido(pValor) {
        claseDocumento = pValor;
}
function generarTablaComprobantes(response) {
    var objListaComprobante = response.item;

    var strHtml = '';

    if (Array.isArray(objListaComprobante) && objListaComprobante.length > 0) {
        strHtml += '<table class="table table-striped table-bordered table-hover">';
        strHtml += '<thead class="thead-dark">';
        strHtml += '<tr>';
        strHtml += '<th class="custom-padding">Fecha</th>';
        strHtml += '<th class="custom-padding">Clase Doc</th>';
        strHtml += '<th class="custom-padding">N° Documento</th>';
        strHtml += '<th class="custom-padding">N° Comprobante</th>';
        strHtml += '<th class="custom-padding">Monto Gravado</th>';
        strHtml += '<th class="custom-padding">IVA</th>';
        strHtml += '<th class="custom-padding">Percepción DGR</th>';
        strHtml += '<th class="custom-padding">Percepción Municipal</th>';
        strHtml += '<th class="custom-padding">Total</th>';
        strHtml += '<th class="custom-padding">Monto Exento</th>';
        strHtml += '<th class="custom-padding">Percepción IVA</th>';
        strHtml += '</tr>';
        strHtml += '</thead>';

        strHtml += '<tbody>';
        for (var i = 0; i < objListaComprobante.length; i++) {
            var comprobante = objListaComprobante[i];
            strHtml += '<tr>';
            strHtml += '<td class="text-center">' + comprobante.fechA_DOC + '</td>';
            strHtml += '<td class="text-center">' + comprobante.clasE_DOC + '</td>';
            strHtml += '<td class="text-center">' + comprobante.nrO_DOCUMENTO + '</td>';
            strHtml += '<td class="text-center">' + comprobante.nrO_COMP + '</td>';
            strHtml += '<td class="text-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(comprobante.montO_GRAVADO).toFixed(2)) + '</td>';
            strHtml += '<td class="text-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(comprobante.iva).toFixed(2)) + '</td>';
            strHtml += '<td class="text-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(comprobante.percepcioN_DGR).toFixed(2)) + '</td>';
            strHtml += '<td class="text-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(comprobante.percepcioN_MUNICIPAL).toFixed(2)) + '</td>';
            strHtml += '<td class="text-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(comprobante.total).toFixed(2)) + '</td>';
            strHtml += '<td class="text-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(comprobante.montO_EXENTO).toFixed(2)) + '</td>';
            strHtml += '<td class="text-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(comprobante.percepcioN_IVA).toFixed(2)) + '</td>';
            strHtml += '</tr>';
        }
        strHtml += '</tbody>';
        strHtml += '</table>';
    } else {
        strHtml += '<div class="alert alert-warning text-center" role="alert">';
        strHtml += 'No hay información disponible';
        strHtml += '</div>';
    }

    $('#divResultadoComprobanteCompleto').html(strHtml);
    $('.footable').footable();
}

function FormatoDecimalConDivisorMiles(valor) {
    return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




function CargarHtmlComprobanteEntreFecha() {
    var strHtml = '';
    if (listaComprobantesEntreFecha != null) {
        if (listaComprobantesEntreFecha.length > 0) {
            var esFactura = false;
            if (listaComprobantesEntreFecha[0].Comprobante === 'FAC') {
                esFactura = true;
            }
            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-3 col-md-1 col-sm-1 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Tipo</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Tipo</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Comprobante</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Comprobante</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Importe</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Descargar</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody>';
            for (var i = 0; i < listaComprobantesEntreFecha.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center c_to_l-xs">' + listaComprobantesEntreFecha[i].FechaToString + '</td>'; // listaComprobantesEntreFecha[i].FechaToString
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center c_to_l-xs">' + listaComprobantesEntreFecha[i].Comprobante + '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-2 text-center c_to_l-xs">';
                if (isDetalleComprobante(listaComprobantesEntreFecha[i].Comprobante)) {
                    strHtml += '<a href="../ctacte/Documento?t=' + listaComprobantesEntreFecha[i].Comprobante + '&id=' + listaComprobantesEntreFecha[i].NumeroComprobante + '" >' + listaComprobantesEntreFecha[i].NumeroComprobante + '</a>';
                } else {
                    strHtml += listaComprobantesEntreFecha[i].NumeroComprobante;
                }
                strHtml += ' </td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-right">$&nbsp;' + FormatoDecimalConDivisorMiles(listaComprobantesEntreFecha[i].MontoTotal.toFixed(2)) + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 text-center"><input onclick="generarListaADescargar()" type="checkbox" class="form-control input-descarga" style="height: 17px !important" checked="true" name="' + listaComprobantesEntreFecha[i].NumeroComprobante + '" id="' + listaComprobantesEntreFecha[i].NumeroComprobante + '"></td>';
                strHtml += '</tr>';
            }
            strHtml += '</tbody>';
            strHtml += '</table>';

            if (listaComprobantesEntreFecha.length > cantFilaParaEnCabezado) {
                strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }

            ///
            var strHtmlDescarga = '';
            strHtmlDescarga += '<a class="btn_download float-right" href="../../servicios/generarCSV.aspx?t=ConsultaDeComprobantesEntreFecha" data-toggle="tooltip" data-placement="bottom" title="Descarga csv" data-original-title="Descarga csv">CSV</a>';
            if (esFactura) {
                strHtmlDescarga += '<a class="btn_download float-right" href="../../servicios/generar_comprobantes_txt" data-toggle="tooltip" data-placement="bottom" title="Descarga TXT" data-original-title="Descarga TXT">TXT</a>';
                strHtmlDescarga += '<a class="btn_download float-right" href="../../archivos/FormatoArchivoTXTFacturas.pdf" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Descargar en formato txt" data-original-title="Descargar en formato txt">FORMATO TXT</a>';
            }
            strHtmlDescarga += '<div class="float-right pad_7 hidden-xs">Descargas:</div>';
            $('#divContenedorDescarga').append(strHtmlDescarga);

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
    $('#divResultadoComprobanteEntreFecha').html(strHtml);
    $('.footable').footable();
}

function generarListaADescargar() {
    var checks = $('input[type=checkbox]:checked').serialize();
    $.ajax({
        type: "POST",
        url: "/ctacte/ActualizarFacturasDescarga",
        data: { NrosComprobantes: checks },
        success:
            function (response) {
                //hideCargandoBuscador();
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}