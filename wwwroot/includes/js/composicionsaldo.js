var SaldoPanelComposicion = null;
var listaCompocisionSaldo = null;
var limiteSaldo = null;
var ResumenAbierto = null;
var listaChequesEnCartera = null;

jQuery(document).ready(function () {
    if (SaldoPanelComposicion == null) {
        SaldoPanelComposicion = eval('(' + $('#hiddenCompocisionSaldos').val() + ')');
        if (typeof SaldoPanelComposicion == 'undefined') {
            SaldoPanelComposicion = null;
        }
    }
    if (listaCompocisionSaldo == null) {
        listaCompocisionSaldo = eval('(' + $('#hiddenListaCompocisionSaldo').val() + ')');
        if (typeof listaCompocisionSaldo == 'undefined') {
            listaCompocisionSaldo = null;
        }
    }
    if (limiteSaldo == null) {
        limiteSaldo = $('#hiddenLimiteSaldo').val();
        if (typeof limiteSaldo == 'undefined') {
            limiteSaldo = null;
        } else {
            limiteSaldo = parseFloat(limiteSaldo);
        }
    }
    if (ResumenAbierto == null) {
        ResumenAbierto = eval('(' + $('#hiddenListaResumenAbierto').val() + ')');
        if (typeof ResumenAbierto == 'undefined') {
            ResumenAbierto = null;
        }
    }
    if (listaChequesEnCartera == null) {
        listaChequesEnCartera = eval('(' + $('#hiddenChequesEnCartera').val() + ')');
        if (typeof listaChequesEnCartera == 'undefined') {
            listaChequesEnCartera = null;
        }
    }
});

function CargarHtmlPanel_nav_composicionsaldos() {
    if (SaldoPanelComposicion != null) {
        if (SaldoPanelComposicion.SaldoCtaCte != null) {
            $('#id_nav_TotalCuentaCorriente').html('$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoCtaCte.toFixed(2)));
        }
        if (SaldoPanelComposicion.isPoseeCuentaResumen) {
            if (SaldoPanelComposicion.SaldoResumenAbierto != null) {
                $('#id_nav_TotalResumenAbierto').html('$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoResumenAbierto.toFixed(2)));
            }
        }
        if (SaldoPanelComposicion.SaldoChequeCartera != null) {
            $('#id_nav_TotalChequesCartera').html('$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoChequeCartera.toFixed(2)));
        }
        //if (SaldoPanelComposicion.SaldoTotal != null) {
        //    $('#idTotalDeuda').html('$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoTotal.toFixed(2)));
        //}
    }
}

function CargarHtmlPanelSaldos() {
    if (SaldoPanelComposicion != null) {
        if (SaldoPanelComposicion.SaldoCtaCte != null) {
            $('#idTotalCuentaCorriente').html('$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoCtaCte.toFixed(2)));
        }
        if (SaldoPanelComposicion.isPoseeCuentaResumen) {
            if (SaldoPanelComposicion.SaldoResumenAbierto != null) {
                $('#idTotalResumenAbierto').html('$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoResumenAbierto.toFixed(2)));
            }
        }
        if (SaldoPanelComposicion.SaldoChequeCartera != null) {
            $('#idTotalChequesCartera').html('$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoChequeCartera.toFixed(2)));
        }
        if (SaldoPanelComposicion.SaldoTotal != null) {
            $('#idTotalDeuda').html('$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoTotal.toFixed(2)));
        }
    }
}

function onclickVerMovimientos() {
    if ($('#checkboxVerTodosMovimientos').is(':checked')) {
        $('#checkboxVerTodosMovimientosSaldos').attr('checked', false);
        $('#cmbPeriodo').removeAttr('disabled');
    }
}
function onclickVerSaldos() {
    if ($('#checkboxVerTodosMovimientosSaldos').is(':checked')) {
        $('#checkboxVerTodosMovimientos').attr('checked', false);
        $('#cmbPeriodo').attr('disabled', 'disabled');
    }
}
function onclickCompocisionSaldo() {
    IsBanderaUsarDll('OnCallBackIsBanderaUsarDll_CompocisionSaldo');
    return false;
}
function OnCallBackIsBanderaUsarDll_CompocisionSaldo(args) {
    if (args) {
        var varDias = 0;
        if ($('#checkboxVerTodosMovimientos').is(':checked')) {
            varDias = $('#cmbPeriodo').val();
        }
        var pendiente = 0;
        var cancelado = 0;
        if ($('#checkboxVerTodosMovimientos').is(':checked')) {
            pendiente = 1;
        }
        if ($('#checkboxVerTodosMovimientosSaldos').is(':checked')) {
            cancelado = 1;
        }
        ObtenerRangoFecha(varDias, pendiente, cancelado);
        //$('#divCargandoContenedorGeneralFondo').css('display', 'block');
    } else {
        mensaje_informacion_generico(objMensajeDllNoDisponible);
    }

}
function OnCallBackObtenerRangoFecha(args) {
    location.href = '../ctacte/composicionsaldoCtaCte';
}

function CargarHtmlCompocisionSaldo_CtaCte() {
    if (listaCompocisionSaldo != null) {
        var strHtml = '';
        console.log(listaCompocisionSaldo);
        if (listaCompocisionSaldo.length > 0) {
            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Vencimiento</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Comprobante</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Comprobante</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Semana</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">Semana</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-2 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Importe</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Importe</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-2 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Recibo N&deg;</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Recibo N&deg;</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Pago</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">Pago</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">Fecha</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Medio de Pago</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">Medio de Pago</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="xs sm">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Atraso</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-sm visible-xs">Atraso</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Saldo</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';

            var fechaActual = new Date();
            strHtml += '<tbody>';
            for (var i = 0; i < listaCompocisionSaldo.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
               
                if (listaCompocisionSaldo[i].NumeroComprobante != '' && listaCompocisionSaldo[i].TipoComprobante < 14) {
                    strHtml += '<tr class="' + strHtmlColorFondo + '">';
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-center">' + listaCompocisionSaldo[i].FechaToString + '</td>'; //Fecha

                    var strHtmlColorFondoFechaVencimiento = '';
                    var strHtmlColorSaldoCabecera = '';
                    var splitFecha = listaCompocisionSaldo[i].FechaVencimientoToString.split("/");
                    var fechaVencimiento = new Date(splitFecha[2], (splitFecha[1] - 1), splitFecha[0]);
                    if (limiteSaldo != null) {
                        if (fechaVencimiento < fechaActual && listaCompocisionSaldo[i].Saldo > limiteSaldo) {
                            strHtmlColorFondoFechaVencimiento = 'color_vencido';
                            strHtmlColorSaldoCabecera = 'color_vencido';
                        }
                    }
                    var compRes = ''
                    if (listaCompocisionSaldo[i].TipoComprobanteToString == 'RES') {
                        var FechaVtoString = splitFecha[2] + "/" + splitFecha[1] + "/" + splitFecha[0];
                        compRes = '<i data-toggle="tooltip" title="Ver Detalle de Vencimiento" class="fa fa-search float-left" style="cursor: pointer;" onclick="ObtenerVtosResumenes(\'' + listaCompocisionSaldo[i].NumeroComprobante + '\',\'' + FechaVtoString + '\')"></i>';
                    }
                    strHtml += '<td  class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-center ' + strHtmlColorFondoFechaVencimiento + '">' + compRes + listaCompocisionSaldo[i].FechaVencimientoToString + '</td>'; //Vencimiento

                    if (isDetalleComprobante(listaCompocisionSaldo[i].TipoComprobanteToString)) {
                        strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-center c_to_l-xs">' + ' <div class="txt_link_doc"><a href="Documento?t=' + listaCompocisionSaldo[i].TipoComprobanteToString + '&id=' + listaCompocisionSaldo[i].NumeroComprobante + '" >' + listaCompocisionSaldo[i].TipoComprobanteToString + ' ' + listaCompocisionSaldo[i].NumeroComprobante + '</a></div>' + '</td>';
                    } else {
                        strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-center c_to_l-xs">' + listaCompocisionSaldo[i].TipoComprobanteToString + ' ' + listaCompocisionSaldo[i].NumeroComprobante + '</td>';
                    }
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 text-center c_to_l-sm c_to_l-xs">' + listaCompocisionSaldo[i].Semana + '</td>'; //Semana

                    var strImporte = '&nbsp;';
                    if (isNotNullEmpty(listaCompocisionSaldo[i].Importe)) {
                        strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaCompocisionSaldo[i].Importe.toFixed(2));
                    }
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-right r_to_l-xs ">' + strImporte + '</td>'; //Importe
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-center c_to_l-xs">' + ObtenerLinkDeDocumentoDesdeStr(listaCompocisionSaldo[i].NumeroRecibo) + '</td>'; //Recibo Nro
                    var strPago = '&nbsp;';
                    if (isNotNullEmpty(listaCompocisionSaldo[i].Pago)) {
                        var doublePago = parseFloat(listaCompocisionSaldo[i].Pago.replace(".", "").replace(",", "."));
                        strPago = '$&nbsp;' + FormatoDecimalConDivisorMiles(doublePago.toFixed(2));
                    }
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-right r_to_l-xs r_to_l-sm">' + strPago + '</td>'; //Pago
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-center c_to_l-sm c_to_l-xs">' + listaCompocisionSaldo[i].FechaPagoToString + '</td>'; //Fecha
                    strHtml += '<td class="col-lg-1 col-md-1 c_to_l-sm">' + listaCompocisionSaldo[i].MedioPago + '</td>'; //Medio de Pago
                    strHtml += '<td class="col-lg-1 col-md-1 c_to_l-sm">' + listaCompocisionSaldo[i].Atraso + '</td>'; //Atraso
                    var strSaldo = '&nbsp;';
                    if (isNotNullEmpty(listaCompocisionSaldo[i].Saldo)) {
                        strSaldo = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaCompocisionSaldo[i].Saldo.toFixed(2));
                    }
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-right ' + strHtmlColorSaldoCabecera + '">' + strSaldo + '</td>'; //Saldo
                    strHtml += '</tr>';
                } else {
                    strHtml += '<tr class="' + strHtmlColorFondo + '">';
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-center">' + '' + '</td>'; //Fecha
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-center">' + '' + '</td>'; //Vencimiento
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-center c_to_l-xs">' + '' + '</td>'; //Comprobante
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 text-center c_to_l-sm c_to_l-xs">' + '' + '</td>'; //Semana
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-right r_to_l-xs ">' + '' + '</td>'; //Importe
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-center c_to_l-xs"><div class="txt_link_doc">' + ObtenerLinkDeDocumentoDesdeStr(listaCompocisionSaldo[i].NumeroRecibo) + '</div></td>'; //Recibo Nro
                    var strPago = '&nbsp;';
                    if (isNotNullEmpty(listaCompocisionSaldo[i].Pago)) {
                        var doublePago = parseFloat(listaCompocisionSaldo[i].Pago.replace(".", "").replace(",", "."));
                        strPago = '$&nbsp;' + FormatoDecimalConDivisorMiles(doublePago.toFixed(2));
                    }
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-right r_to_l-xs r_to_l-sm">' + strPago + '</td>'; //Pago
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 text-center c_to_l-sm c_to_l-xs">' + listaCompocisionSaldo[i].FechaPagoToString + '</td>'; //Fecha
                    strHtml += '<td class="col-lg-1 col-md-1 c_to_l-sm">' + listaCompocisionSaldo[i].MedioPago + '</td>'; //Medio de Pago
                    strHtml += '<td class="col-lg-1 col-md-1 c_to_l-sm">' + listaCompocisionSaldo[i].Atraso + '</td>'; //Atraso
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-right">' + '' + '</td>'; //Saldo
                    strHtml += '</tr>';
                }
            }

            strHtml += '</tbody>';          
            // Inicio Importe Total
            strHtml += '<tfoot>';
            strHtml += '<tr>';
            strHtml += '<th colspan="9" class="col-lg-10 col-md-9 hidden-xs hidden-sm"></th>';
            strHtml += '<th colspan="4" class="col-sm-6 visible-sm"></th>';
            strHtml += '<th colspan="1" class="col-xs-4 visible-xs"></th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-center">TOTAL: </th>';
            var strImporteTotal = '&nbsp;';
            if (SaldoPanelComposicion.SaldoCtaCte != null) {
                strImporteTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoCtaCte.toFixed(2));
            } else {
                strImporteTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles('0.00');
            }
            strHtml += '<th class="col-lg-1 col-md-2 col-sm-3 col-xs-4 text-right pr_est">' + strImporteTotal + '</th>';
            strHtml += '</tr>';
            strHtml += '</tfoot>';
            //strHtml += '<tfoot>';
            //strHtml += '<tr>';
            //strHtml += '<th colspan="9" class="col-lg-10 col-md-9 hidden-xs hidden-sm"></th>';
            //strHtml += '<th colspan="4" class="col-sm-6 visible-sm "></th>';
            //strHtml += '<th colspan="3" class="col-sm-6 visible-xs"></th>';
            //strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-center">TOTAL: </th>';
            //var strImporteTotal = '&nbsp;';
            //if (SaldoPanelComposicion.SaldoCtaCte != null) {
            //    strImporteTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(SaldoPanelComposicion.SaldoCtaCte.toFixed(2));
            //} else {
            //    strImporteTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles('0.00');
            //}
            //strHtml += '<th class="col-lg-1 col-md-2 col-sm-3 col-xs-4 text-right pr_est">' + strImporteTotal + '</th>';
            //strHtml += '</tr>';
            //strHtml += '</tfoot>';
            // Fin Importe Total
            
           
            strHtml += '</table>';

            if (listaCompocisionSaldo.length > cantFilaParaEnCabezado) {
                strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';

            }

        } // fin  if (listaCompocisionSaldo.length > 0) {}
        else {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<tbody>';
            strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
            strHtml += '</tbody>';
            strHtml += '</table>';
        }
        $('#divResultadoCompocisionSaldo').html(strHtml);
        $('.footable').footable();
    }
}
function CargarHtmlResumenAbierto() {
    if (ResumenAbierto != null) {
        var strHtml = '';
        if (ResumenAbierto.lista.length > 0) {

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
            strHtml += '<th class="col-lg-4 col-md-3 col-sm-3 col-xs-1 text-center no-padding" data-breakpoints="xs">';
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
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody>';

            for (var i = 0; i < ResumenAbierto.lista.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center c_to_l-xs">' + ResumenAbierto.lista[i].FechaToString + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center c_to_l-xs">' + ResumenAbierto.lista[i].TipoComprobanteToString + '</td>';
                strHtml += '<td class="col-lg-4 col-md-4 col-sm-4 text-center c_to_l-xs">';  
                if (isDetalleComprobante(ResumenAbierto.lista[i].TipoComprobanteToString)) {
                    strHtml += '<a href="Documento?t=' + ResumenAbierto.lista[i].TipoComprobanteToString + '&id=' + ResumenAbierto.lista[i].NumeroComprobante + '" >' + ResumenAbierto.lista[i].NumeroComprobante + '</a>';
                } else {
                    strHtml += ResumenAbierto.lista[i].NumeroComprobante;
                }
                strHtml += ' </td>';
                var strImporte = '&nbsp;';
                if (isNotNullEmpty(ResumenAbierto.lista[i].Importe)) {
                    strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(ResumenAbierto.lista[i].Importe.toFixed(2));
                }
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-right">' + strImporte + '</td>';
                strHtml += '</tr>';
            }
            strHtml += '</tbody>';
            //
            strHtml += '<tfoot>';
            strHtml += '<tr>';
            strHtml += '<th  colspan="2" class="hidden-xs"></th>';
            //strHtml += '<th></th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-2 col-xs-4 text-center">TOTAL: </th>';
            var strImporteTotal = '&nbsp;';
            if (isNotNullEmpty(ResumenAbierto.ImporteTotal)) {
                strImporteTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(ResumenAbierto.ImporteTotal.toFixed(2));
            }
            strHtml += '<th class="col-lg-1 col-md-2 col-sm-3 col-xs-4 text-right pr_est">' + strImporteTotal + '</th>';
            strHtml += '</tr>';
            strHtml += '</tfoot>';
            //
            strHtml += '</table>';

            if (ResumenAbierto.lista.length > cantFilaParaEnCabezado) {
                strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }
        } else {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<tbody>';
            strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
            strHtml += '</tbody>';
            strHtml += '</table>';
        }
        $('#divResultadoResumenAbierto').html(strHtml);
        $('.footable').footable();

    }
}
function CargarHtmlChequesEnCartera() {
    var strHtml = '';
    if (listaChequesEnCartera != null) {

        if (listaChequesEnCartera.length > 0) {
            // boton volver
            //strHtml += '<input type="button" onclick="volverComposicionSaldo()" value="VOLVER" class="btn_gral" />';
            //strHtml += '<div style="height:25px;">&nbsp;</div>';
            // fin boton volver
            //strHtml += '<table class="tbl-ComposicionSaldo" border="0" cellspacing="0" cellpadding="0"  width="100%">';
            //strHtml += '<tr>';
            //strHtml += '<th  width="40%" ><div class="bp-top-left">Fecha</div></th>'; //<th class="bp-off-top-left bp-med-ancho">
            //strHtml += '<th  width="20%"  class="bp-med-ancho" >Banco</th>';
            //strHtml += '<th  width="10%"  class="bp-med-ancho" >Cheque Nº</th>';
            //strHtml += '<th  width="15%"  class="bp-med-ancho">Depósito</th>';
            //strHtml += '<th  width="15%"  class="bp-med-ancho">Importe</th>';
            //strHtml += '</tr>';

            strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-3 col-md-1 col-sm-1 col-xs-1 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" >';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Banco</td></tr>';
            strHtml += '</table>';
            //strHtml += '<span class="thd_letra_chica visible-xs">Banco</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-4 col-md-3 col-sm-3 col-xs-1 text-center no-padding" >';
            strHtml += '<table  width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Cheque Nº</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Depósito</td></tr>';
            strHtml += '</table>';
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

            for (var iChequesEnCartera = 0; iChequesEnCartera < listaChequesEnCartera.length; iChequesEnCartera++) {
                var strHtmlColorFondo = 'wht';
                if (iChequesEnCartera % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center c_to_l-xs">' + listaChequesEnCartera[iChequesEnCartera].Fecha.substring(0, 10) + '</td>'; // .substring(10) 28/02/2013 10:14:00 a.m. SOLO MOSTRAR FECHA
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center c_to_l-xs">' + listaChequesEnCartera[iChequesEnCartera].Banco + '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center c_to_l-xs">' + listaChequesEnCartera[iChequesEnCartera].Numero + '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center c_to_l-xs">' + listaChequesEnCartera[iChequesEnCartera].FechaVencimientoToString + '</td>';
                var strImporte = '&nbsp;';
                if (isNotNullEmpty(listaChequesEnCartera[iChequesEnCartera].Importe)) {
                    strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaChequesEnCartera[iChequesEnCartera].Importe.toFixed(2));
                }
                strHtml += '<td class="col-lg-1 col-md-2 col-sm-3 col-xs-4 text-right pr_est">' + strImporte + '</td>';
                //                strHtml += '<td class="' + strHtmlColorFondo + '">' + listaChequesEnCartera[iChequesEnCartera].EstadoToString + '</td>';
                strHtml += '</tr>';
            }
            strHtml += '</tbody>';
            // Inicio Importe Total
            strHtml += '<tfoot>';
            strHtml += '<tr>';
            strHtml += '<th  colspan="3"></th>';
            strHtml += '<th>TOTAL: </th>';
            var strImporteTotal = '&nbsp;';

            if (SaldoPanelComposicion.SaldoChequeCartera != null) {
                strImporteTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(SaldoPanelComposicion.SaldoChequeCartera).toFixed(2));
            } else {
                strImporteTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles('0.00');
            }

            strHtml += '<th class="col-lg-1 col-md-2 col-sm-3 col-xs-4 text-right pr_est" >' + strImporteTotal + '</th>';
            strHtml += '</tr>';
            strHtml += '</tfoot>';
            // Fin Importe Total

            strHtml += '</table>';


            if (listaChequesEnCartera.length > cantFilaParaEnCabezado) {
                strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }

        } else {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<tbody>';
            strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
            strHtml += '</tbody>';
            strHtml += '</table>';
        }
        $('#divResultadoChequecuenta').html(strHtml);
        $('.footable').footable();
    }

}

//function MostrarVencimientos(id) {
//    var total = 0;
//    var html = '<table with="100%" class="table table-striped" style="background: #e1e1e1;">';
//    html += '<thead>';
//    html += '<tr style="height: 40px;"><th class="text-center">Comprobante<br></th><th class="text-center">Número<br></th><th class="text-center">Fecha<br></th><th class="text-center">Importes<br></th></tr></thead>';
//    html += '<tbody class="table-striped">';
//    for (var i = 0; i < listaCompocisionSaldo[id].lista.length;i++ ) {
//        html += '<tr style="height: 40px">';
//        html += '<td class="text-center">' + listaCompocisionSaldo[id].lista[i].Tipo + '</td>';
//        html += '<td class="text-center"><a href="Documento?t=' + listaCompocisionSaldo[id].lista[i].Tipo + '&id=' + listaCompocisionSaldo[id].lista[i].NumeroComprobante + '" >' + listaCompocisionSaldo[id].lista[i].NumeroComprobante + '</a></td>';
//        html += '<td class="text-center">' + listaCompocisionSaldo[id].lista[i].FechaToString + '</td>';
//        html += '<td class="text-center">$ ' + FormatoDecimalConDivisorMiles(Number(listaCompocisionSaldo[id].lista[i].Importe).toFixed( 2 )) + '</td>';
//        html += '</tr>';
//        total += listaCompocisionSaldo[id].lista[i].Importe;
//    }
//    html += '</tbody></table>';

//    //mensaje(, html);

//    var strHtml = '';
//    strHtml += '<div class="modal-background">&nbsp;</div>';
//    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
//    strHtml += '<div class="modal-header">';
//    strHtml += '<div class="col-12">';
//    strHtml += '<h5 style="color: steelblue;">Comprobantes con vencimiento ' + listaCompocisionSaldo[id].FechaVencimientoToString + '<br>Total: $ ' + FormatoDecimalConDivisorMiles(Number( total ).toFixed( 2 )) + '</h5>';
//    strHtml += '</div>';
//    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
//    strHtml += '</div>';
//    strHtml += '<div class="modal-body no-padding"><div class="col-12">';
//    strHtml += html;
//    strHtml += '</div></div>';
//    strHtml += '</div></div>';
//    $('#modalModulo').html(strHtml);
//    $('#modalModulo').modal();

//    // $(".fa.fa-times").hide();
//    //$("#modalModulo").unbind("click");
//}

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