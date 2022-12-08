var dateComprobanteDesde = null;
var dateComprobanteHasta = null;
var objListaComprobante = null;
var listaComprobantesEntreFecha = null;

function funSetarFechaComprobante(pDesde, pHasta) {
    dateComprobanteDesde = new Date(pDesde);
    dateComprobanteHasta = new Date(pHasta);

}

function onclickConsultar() {
    IsBanderaUsarDll('OnCallBackIsBanderaUsarDll_Consultar');
    return false;
}
function OnCallBackIsBanderaUsarDll_Consultar(args) {
    if (args) {
        var fechaDesde = dateComprobanteDesde;// $('#datepickerDesde').datepicker("getDate");
        var fechaHasta = dateComprobanteHasta;//$('#datepickerHasta').datepicker("getDate");

        var intAñoDesde = fechaDesde.getFullYear();
        var intMesDesde = fechaDesde.getMonth() + 1;
        var intDiaDesde = fechaDesde.getDate();
        var intAñoHasta = fechaHasta.getFullYear();
        var intMesHasta = fechaHasta.getMonth() + 1;
        var intDiaHasta = fechaHasta.getDate();

        if ($('#cmbTipoComprobanteFecha').val() == 'TODOS') {
            ObtenerComprobantesDiscriminadosDePuntoDeVentaEntreFechas(intDiaDesde, intMesDesde, intAñoDesde, intDiaHasta, intMesHasta, intAñoHasta);
        } else {
            var tipo = $('#cmbTipoComprobanteFecha').val().substring(0, 3);
            AgregarVariableSessionConsultaDeComprobantes(tipo, intDiaDesde, intMesDesde, intAñoDesde, intDiaHasta, intMesHasta, intAñoHasta);
        }
        // $('#divCargandoContenedorGeneralFondo').css('display', 'block');
    } else {
        //alert(objMensajeDllNoDisponible);
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
function onclickComprobanteNro() {
    IsBanderaUsarDll('OnCallBackIsBanderaUsarDll_ComprobanteNro');
    return false;
}
function OnCallBackIsBanderaUsarDll_ComprobanteNro(args) {
    if (args) {
        var nro = $('#txtNroComprobante').val();
        var parteAdelante = '';
        parteAdelante = $("#cmbTipoComprobante option:selected").text().substring(4);
        location.href = 'Documento?t=' + $('#cmbTipoComprobante').val().substring(0, 3) + '&id=' + String(parteAdelante) + String(nro);
    } else {
        //alert(objMensajeDllNoDisponible);
        mensaje_informacion_generico(objMensajeDllNoDisponible);
    }
}
function onchangeTipoComprobanteElejido(pValor) {
    if (pValor == 1) {
        $('#hiddenTipoComprobanteSeleccionado').val($("#cmbTipoComprobante option:selected").index());
    } else if (pValor == 2) {
        $('#hiddenTipoComprobanteSeleccionado').val($('#cmbTipoComprobanteFecha option:selected').index());
    }
}

function CargarListaComprobanteCompleto() {
    var strHtml = '';
    if (objListaComprobante != null) {
        if (objListaComprobante.length > 0) {
            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-5 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Comprobante</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Comprobante</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">N&deg; Comprobante</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Monto Exento</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">Monto Exento</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-2 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Monto Gravado</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">Monto Gravado</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-2 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">IVA Inscripto</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">IVA Inscripto</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-2 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">IVA No Inscripto</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">IVA No Inscripto</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Percepci&oacute;n DGR</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">Percepci&oacute;n DGR</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Percepci&oacute;n Municipal</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">Percepci&oacute;n Municipal</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Total</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';

            //////////////
            //strHtml += '<div>'; 
            //strHtml += '<table style="width:100%;"><tr><td align="left">';
            //strHtml += '</td><td >';
            //strHtml += '<input type="button" onclick="volver()" value="VOLVER" class="btn_gral" />';
            //strHtml += '</td> </tr></table>';
            //strHtml += '</div>';
            //strHtml += '<table class="tbl-ComposicionSaldo" border="0" cellspacing="0" cellpadding="0"  width="100%">';
            //strHtml += '<tr>';
            //strHtml += '<th  width="15%" ><div class="bp-top-left">Fecha</div></th>'; // class="bp-off-top-left bp-med-ancho"
            //strHtml += '<th >Comprobante</th>';
            //strHtml += '<th >Número Comprobante</th>';
            //strHtml += '<th >Monto Exento</th>';
            //strHtml += '<th >Monto Gravado</th>';
            //strHtml += '<th >Monto Iva Inscripto</th>';
            //strHtml += '<th >Monto Iva No Inscripto</th>';
            //strHtml += '<th >Monto Percepciones DGR</th>';
            //strHtml += '<th >Monto Percepciones Municipal</th>';//MontoPercepcionesMunicipal
            //strHtml += '<th >Monto Total</th>';
            //strHtml += '</tr>';
            strHtml += '<tbody>';
            for (var i = 0; i < objListaComprobante.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-5 text-center">' + objListaComprobante[i].FechaToString + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 c_to_l-xs">' + objListaComprobante[i].Comprobante + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-center">';
                if (isDetalleComprobante(objListaComprobante[i].Comprobante)) {
                    strHtml += '<a href="../ctacte/Documento?t=' + objListaComprobante[i].Comprobante + '&id=' + objListaComprobante[i].NumeroComprobante + '" >' + objListaComprobante[i].NumeroComprobante + '</a>';
                } else {
                    strHtml += listaFicha[i].Comprobante;
                }
                strHtml += '</td>';
                //                strHtml += '<td class="' + strHtmlColorFondo + '">' + objListaComprobante[i].NumeroComprobante + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 r_to_l-sm">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(objListaComprobante[i].MontoExento.toFixed(2)) + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 r_to_l-sm">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(objListaComprobante[i].MontoGravado.toFixed(2)) + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 r_to_l-sm">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(objListaComprobante[i].MontoIvaInscripto.toFixed(2)) + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 r_to_l-sm">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(objListaComprobante[i].MontoIvaNoInscripto.toFixed(2)) + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 r_to_l-sm">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(objListaComprobante[i].MontoPercepcionesDGR.toFixed(2)) + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 r_to_l-sm">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(objListaComprobante[i].MontoPercepcionesMunicipal.toFixed(2)) + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-3 text-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(objListaComprobante[i].MontoTotal.toFixed(2)) + '</td>';
                strHtml += '</tr>';
            } // fin for (var i = 0; i < objListaComprobante.length; i++) {
            strHtml += '</tbody>';
            strHtml += '</table>';

            //var httpRaiz = $('#hiddenRaiz').val();
            //strHtml += '<div style="text-align:right;margin-top:10px;">' + '<a  href="../../servicios/generar_comprobantes_discriminado.aspx"  >' + '<img src="../../img/iconos/disk.png" alt="txt" title="Descarga csv" />' + '</a></div>';
            //+ '&nbsp;&nbsp;&nbsp;' + 
            //strHtml += '</br>';

            if (objListaComprobante.length > cantFilaParaEnCabezado) {
                //strHtml += '<br/>';
                //strHtml += '<input type="button" onclick="volver()" value="VOLVER" class="btn_gral" />';
                strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }


            ///
            var strHtmlDescarga = '';
            strHtmlDescarga += '<a class="btn_download float-right" href="../../servicios/generar_comprobantes_discriminado.aspx" data-toggle="tooltip" data-placement="bottom" title="Descarga csv" data-original-title="Descarga csv">CSV</a>';
            strHtmlDescarga += '<div class="float-right pad_7 hidden-xs">Descargas: </div>';
            $('#divContenedorDescarga').append(strHtmlDescarga);
            //strHtml += '<div style="text-align:right;margin-top:10px;">' + '<a  href="../../servicios/generar_comprobantes_discriminado.aspx"  >' + '<img src="../../img/iconos/disk.png" alt="txt" title="Descarga csv" />' + '</a></div>';

        } // fin  if (objListaComprobante.length > 0) 
        else {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<tbody>';
            strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
            strHtml += '</tbody>';
            strHtml += '</table>';
        }

    } // fin  if (objListaComprobante != null) 
    else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeSeProdujoErrorIntentaMasTarde + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
    }

    $('#divResultadoComprobanteCompleto').html(strHtml);
    $('.footable').footable();
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
                strHtmlDescarga += '<a class="btn_download float-right" href="../../servicios/generar_comprobantes_txt.aspx" data-toggle="tooltip" data-placement="bottom" title="Descarga TXT" data-original-title="Descarga TXT">TXT</a>';
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
        data: { NrosComprobantes: JSON.stringify(checks) },
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