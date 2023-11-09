var listaEstadoPedidos = null;
var diasPedidos = 0;
var nroPendientesDeFacturar = 0;
var nroEnPreparacion = 0;
var listaRecuperardor = null;
var tipoRecuperador = null;
var listaSucursales = null;

jQuery(document).ready(function () {
    if (tipoRecuperador == null) {
        tipoRecuperador = $('#hiddenTipoRecuperador').val();
        if (typeof tipoRecuperador == 'undefined') {
            tipoRecuperador = null;
        }
    }
    if (listaSucursales == null) {
        listaSucursales = eval('(' + $('#hiddenListaSucursalesInfo').val() + ')');
        if (typeof listaSucursales == 'undefined') {
            listaSucursales = null;
        }
    }
    if (listaEstadoPedidos == null) {
        listaEstadoPedidos = eval('(' + $('#hiddenListaPedidos').val() + ')');
        if (typeof listaEstadoPedidos == 'undefined') {
            listaEstadoPedidos = null;
        }
    }
    CargarHtmlListaEstadoPedidos();
    nroPendientesDeFacturar = 0;
    if (tipoRecuperador != null) {
        funLlenarGrillaFaltasProblemasCrediticios();
    }
});
function CargarHtmlListaEstadoPedidos() {
    if (listaEstadoPedidos != null) {
        var strHtml = '';
        if (listaEstadoPedidos.length > 0) {
            strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            strHtml += '<thead class="pagos">';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-6 text-left">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Factura</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-left" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Remito/OP</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs">Remito/OP</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs">Fecha</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Hora</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs">Hora</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-1 col-xs-6 text-center">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr class="hidden-xs" ><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_b_r-sm">Importe</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
            strHtml += '<tr class="tr_thead pull"><td class="col-lg-12 text-center">Unidades</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs visible-sm">Unidades</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Renglones</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs visible-sm">Renglones</span>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center" data-breakpoints="sm xs">';
            strHtml += '<table class="hidden-xs hidden-sm" width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Estado</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_user visible-xs visible-sm">Estado</span>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            strHtml += '<tbody class="pagos">';
            var totalMontoPedidos = 0;
            for (var i = 0; i < listaEstadoPedidos.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                //
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-6 text-center">';
                if (listaEstadoPedidos[i].EstadoToString == 'PendienteDeFacturar') {
                    var strDescVerDetalle = 'Ver detalles';
                    if (listaEstadoPedidos[i].DetalleSucursal != '')
                        strDescVerDetalle += ' de ' + listaEstadoPedidos[i].DetalleSucursal;
                    strHtml += ' <a href="../ctacte/Documento?t=PENDINTE&id=' + nroPendientesDeFacturar + '" >' + strDescVerDetalle + '</a>';
                    nroPendientesDeFacturar++;
                }
                else if (listaEstadoPedidos[i].EstadoToString == 'EnPreparacion') {
                    var strDescVerDetalle = 'Ver detalles';
                    strHtml += ' <a href="../ctacte/Documento?t=ENPREPARACION&id=' + nroEnPreparacion + '" >' + strDescVerDetalle + '</a>';
                    nroEnPreparacion++;
                }
                else {
                    strHtml += ' <a href="../ctacte/Documento?t=FAC&id=' + listaEstadoPedidos[i].NumeroFactura + '" >' + listaEstadoPedidos[i].NumeroFactura + '</a>';
                }
                strHtml += '<span class="fle_down"></span>' + '</td>';
                //
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-12 c_to_l-xs">' + listaEstadoPedidos[i].NumeroRemito + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-12 c_to_l-xs">' + listaEstadoPedidos[i].FechaIngresoToString + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 col-xs-12 c_to_l-xs">' + listaEstadoPedidos[i].FechaIngresoHoraToString + '</td>';
                totalMontoPedidos += listaEstadoPedidos[i].MontoTotal;
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-6 text-right pr_est no_b_r-sm">$&nbsp;' + FormatoDecimalConDivisorMiles(listaEstadoPedidos[i].MontoTotal) + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 col-xs-12 c_to_l-sm c_to_l-xs">' + listaEstadoPedidos[i].CantidadUnidad + '</td>';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 col-xs-12 c_to_l-sm c_to_l-xs">' + listaEstadoPedidos[i].CantidadRenglones + '</td>';
                let EstadoPedido = '';
                switch (listaEstadoPedidos[i].EstadoToString) {
                    case 'EnPreparacion':
                        EstadoPedido = "En Preparación";
                        break;
                    case 'PendienteDeFacturar':
                        EstadoPedido = "Aceptado";
                        break;
                    case 'Enviado':
                        EstadoPedido = "Enviado";
                        break;
                    case 'Anulado':
                        EstadoPedido = "Anulado";
                        break;
                }
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-12 col-xs-12 c_to_l-sm c_to_l-xs">' + EstadoPedido + '</td>';
                strHtml += '</tr>';
            }
            strHtml += '</tbody>';
            // Monto total
            strHtml += '<tfoot>';
            strHtml += '<tr class="grs">';
            strHtml += '<td colspan="3" class="col-lg-6 col-sm-6 hidden-xs"></td>';
            strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 col-xs-6 text-center">TOTAL:</th>'; //
            strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-6 text-right pr_est">$&nbsp;' + FormatoDecimalConDivisorMiles(totalMontoPedidos.toFixed(2)) + '</th>';
            strHtml += '<td colspan="3" class="col-lg-3 hidden-sm hidden-xs"></td>';
            strHtml += '</tr>';
            strHtml += '</tfoot>';
            //fin monto total

            strHtml += '</table>';
            if (listaEstadoPedidos.length > cantFilaParaEnCabezado) {
                strHtml += '<br/>';
                strHtml += '<a class="btn_volver float-left" href="../mvc/estadopedidos"><i class="fa fa-play"></i>VOLVER</a>';//'<input type="button" onclick="volver()" value="VOLVER" class="btn_gral" />';
            }
            $('#divResultadoPedidos').append(strHtml);
            // $(document.body).ready(function () { $('.footable').footable(); });
            $('.footable').footable();
        } else {
            //strHtml = objMensajeNoEncontrado;
            $('#divResultadoPedidos_sinResultado').append('<p class="color_red">' + objMensajeNoEncontrado + '</p>');
        }
        // $('#divResultadoPedidos').html(strHtml);
    } else {
        $('#divResultadoPedidos_sinResultado').append('<p class="color_red">' + objMensajeSeProdujoErrorIntentaMasTarde + '</p>');
    }
}

function onclickListaPedidos() {
    IsBanderaUsarDll('OnCallBackIsBanderaUsarDll_ListaPedidos');
    return false;
}

function OnCallBackIsBanderaUsarDll_ListaPedidos(args) {
    if (args) {
        var myRadio = $('input[name=group1]');
        diasPedidos = myRadio.filter(':checked').val();
        ObtenerRangoFecha_pedidos(diasPedidos);
        showCargandoBuscador();
    } else {
        mensaje_informacion_generico(objMensajeDllNoDisponible);
    }
}
function OnCallBackObtenerRangoFecha_pedidos(args) {
    var intAñoDesde = args[2];
    var intMesDesde = args[1];
    var intDiaDesde = args[0];
    var intAñoHasta = args[5];
    var intMesHasta = args[4];
    var intDiaHasta = args[3];
    location.href = '../mvc/estadopedidosresultado';
}
function funLlenarGrillaFaltasProblemasCrediticios() {
    var dia = $("#cmbDia").val();
    if ($('#inputEstado').is(':checked')) {//
        RecuperarFaltasProblemasCrediticiosTodosEstados(dia);
    } else {
        RecuperarFaltasProblemasCrediticios(dia);
    }
}
function OnCallBackLlenarGrillaFaltasProblemasCrediticios(args) {
    listaRecuperardor = null;
    if (isNotNullEmpty(args)) {
        listaRecuperardor = eval('(' + args + ')');
        if (typeof listaRecuperardor == 'undefined') {
            listaRecuperardor = null;
        }
    }
    CargarRecuperadorFaltasYCrediticios();
}

function CargarRecuperadorFaltasYCrediticios() {
    var strHtml = '';
    if (listaRecuperardor != null) {
        if (listaRecuperardor.length > 0) {
            var isBanderaTitulo = true;
            for (var i = 0; i < listaRecuperardor.length; i++) {
                if (isBanderaTitulo) {
                    if (tipoRecuperador != null) {
                        switch (tipoRecuperador) {
                            case '1':
                                // $('#main-menu-top-RecuperadorFaltas').addClass('main-menu-top-activeSubMenu');
                                if (!$('#inputEstado').is(':checked')) {
                                    //strHtml += '<div style="margin:20px;font-size:16px;color:#008000;text-align:left;text-decoration: underline;">Estos productos dados en falta, ahora están en stock</div>';
                                    strHtml += '<div class="clear20"></div>';
                                    strHtml += '<div class="col-xs-12">';
                                    strHtml += '<div class="alert-success">' + 'Estos productos dados en falta, ahora están en stock.' + '</div>';
                                    strHtml += '</div>';
                                }
                                break;
                            case '2':
                                // $('#main-menu-top-ProblemasCrediticios').addClass('main-menu-top-activeSubMenu');
                                //strHtml += '<div style="margin:20px;font-size:16px;color:#008000; text-align:left;text-decoration: underline;">Estos productos no fueron facturados por falta de crédito</div>';
                                strHtml += '<div class="clear20"></div>';
                                strHtml += '<div class="col-xs-12">';
                                strHtml += '<div class="alert-success">' + 'Estos productos no fueron facturados por falta de crédito.' + '</div>';
                                strHtml += '</div>';
                                break;
                            default:
                                break;
                        }
                    }
                    isBanderaTitulo = false;
                }
                strHtml += '<div class="clear20"></div>';
                strHtml += '<div class="col-xs-12">';

                strHtml += '<div class="div_tit_suc">';
                strHtml += listaRecuperardor[i].suc_nombre;
                strHtml += '</div>';

                strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
                strHtml += '<thead class="pagos">';
                strHtml += '<tr>';
                strHtml += '<th class="col-xs-10 text-left">';
                strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
                strHtml += '<tr class="tr_thead"><td class="col-lg-12 pl">Nombre producto</td></tr>';
                strHtml += '</table>';
                strHtml += '</th>';
                strHtml += '<th class="col-xs-1 text-center">';
                strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
                strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Cantidad</td></tr>';
                strHtml += '</table>';
                strHtml += '</th>';
                // inicio precio
                strHtml += '<th class="col-xs-1 text-center">';
                strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
                strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Precio</td></tr>';
                strHtml += '</table>';
                strHtml += '</th>';
                strHtml += '</th>';
                // fin precio
                strHtml += '<th class="col-xs-1 text-center">';
                strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear"></div></td></tr>';
                strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_border">Stock</td></tr>';
                strHtml += '</table>';
                strHtml += '</th>';
                strHtml += '</tr>';
                strHtml += '</thead>';
                //
                strHtml += '<tbody class="pagos">';
                strHtml += '<tr class="wht">';
                strHtml += '<td class="col-xs-9 pl_xs">';
                strHtml += '<div class="radio-checkbox">';
                strHtml += '<input class="checkbox"  type="checkbox" id="checkRecuperador_' + i + '_' + 'Todos' + '" onclick="onclickSeleccionarTodosRecuperador(' + i + ')" />';
                strHtml += '<label for="checkRecuperador_' + i + '_' + 'Todos' + '" value="">TODOS</label>';
                strHtml += '</div>';
                strHtml += '</td>';
                strHtml += '<td class="col-xs-1 text-center"></td>';
                strHtml += '<td class="col-xs-1 text-center"></td>';
                strHtml += '<td class="col-xs-1 text-center"></td>';
                strHtml += '</tr>';
                //
                for (var iProductos = 0; iProductos < listaRecuperardor[i].listaProductos.length; iProductos++) {
                    isFaltantes = true;
                    var strHtmlColorFondo = 'wht';
                    if ((i + 1) % 2 != 0) {
                        strHtmlColorFondo = 'grs';
                    }
                    strHtml += '<tr class="' + strHtmlColorFondo + '">';
                    strHtml += '<td class="col-xs-10 pl_xs">';
                    strHtml += '<div class="radio-checkbox">';
                    var SoloLecturaCheckBox = '';
                    if (!isMostrarImput_FacturaTrazablesProvincia(listaRecuperardor[i].fpc_codSucursal, listaRecuperardor[i].listaProductos[iProductos].pro_isTrazable)//) {
                        || !isMostrarImput_pedirCC(listaRecuperardor[i].listaProductos[iProductos].pro_codtpopro, listaRecuperardor[i].fpc_codSucursal, listaRecuperardor[i].listaProductos[iProductos].listaSucursalStocks) || (!MostrarImputPerfu(listaRecuperardor[i].listaProductos[iProductos].pro_codtpopro, listaRecuperardor[i].fpc_codSucursal) && listaRecuperardor[i].listaProductos[iProductos].pro_codtpopro == "P")) {
                        SoloLecturaCheckBox = 'disabled'
                    }
                    //
                    strHtml += '<input class="checkbox"  type="checkbox" id="checkRecuperador_' + i + '_' + iProductos + '" ' + SoloLecturaCheckBox + '  onclick="onclickActualizarTotal(' + i + ')" />';
                    strHtml += '<label for="checkRecuperador_' + i + '_' + iProductos + '" value="">' + listaRecuperardor[i].listaProductos[iProductos].fpc_nombreProducto + '</label>';
                    strHtml += '</div>';
                    strHtml += '</td>';
                    strHtml += '<td id="tdCantidadRecuperador_' + i + '_' + iProductos + '" class="col-xs-1 text-center">'
                    strHtml += listaRecuperardor[i].listaProductos[iProductos].fpc_cantidad;
                    strHtml += '</td>';
                    strHtml += '<td class="col-xs-1 text-center">'
                    var precio = '';
                    var precio = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaRecuperardor[i].listaProductos[iProductos].PrecioFinalRecuperador.toFixed(2));
                    if (listaRecuperardor[i].listaProductos[iProductos].PrecioFinalRecuperador === 0) {
                        precio = '';
                    }
                    strHtml += precio;
                    strHtml += '</td>';
                    strHtml += '<td class="col-xs-1 text-center"><div class="' + getNameClassStock(listaRecuperardor[i].listaProductos[iProductos].stk_stock.toUpperCase()) + ' center"></div></td>';
                    strHtml += '</tr>';
                }
                strHtml += '</tbody>';
                strHtml += '</table>';
                strHtml += '<span id="spanTotal' + i + '" class="badge badge-secondary"></span>';
                strHtml += '<a class="btn_confirmar" href="#" onclick="onclickConfirmarRecuperador(' + i + '); return false;">CONFIRMAR</a>';
                strHtml += '<a class="btn_vaciar float-left" href="#" onclick="onclickDescartarRecuperador(' + i + '); return false;">DESCARTAR</a>';


                strHtml += '</div>'; // fin <div class="col-xs-12">
            }
        } else { // fin   if (listaRecuperardor.length > 0) {
            strHtml += '<div class="clear20"></div>';
            strHtml += '<div class="col-xs-12">';
            strHtml += '<div class="alert-danger">' + objMensajeNoEncontrado + '</div>';
            strHtml += '</div>';
        }
    } else {
        strHtml += '<div class="clear20"></div>';
        strHtml += '<div class="col-xs-12">';
        strHtml += '<div class="alert-danger">' + objMensajeSeProdujoErrorIntentaMasTarde + '</div>';
        strHtml += '</div>';
    }

    $('#divRecuperador').html(strHtml);
}
function onclickActualizarTotal(pValor) {
    if (listaRecuperardor != null) {
        //var isChecked = $('#checkRecuperador_' + pValor + '_' + 'Todos').is(":checked");
        var total = 0;
        for (var iProductos = 0; iProductos < listaRecuperardor[pValor].listaProductos.length; iProductos++) {
            if ($('#checkRecuperador_' + pValor + '_' + iProductos).is(":checked")) {
                total += (listaRecuperardor[pValor].listaProductos[iProductos].PrecioFinalRecuperador * listaRecuperardor[pValor].listaProductos[iProductos].fpc_cantidad);
            }
            // $('#checkRecuperador_' + pValor + '_' + iProductos).attr('checked', isChecked);
        }
        if (total === 0) {
            $('#spanTotal' + pValor).html('');
        } else {
            $('#spanTotal' + pValor).html('Total: ' + '$&nbsp;' + FormatoDecimalConDivisorMiles(total.toFixed(2)));
        }

    }
}
function onclickSeleccionarTodosRecuperador(pValor) {
    if (listaRecuperardor != null) {
        var isChecked = $('#checkRecuperador_' + pValor + '_' + 'Todos').is(":checked");
        for (var iProductos = 0; iProductos < listaRecuperardor[pValor].listaProductos.length; iProductos++) {
            if (!$('#checkRecuperador_' + pValor + '_' + iProductos).is(":disabled")) {
                $('#checkRecuperador_' + pValor + '_' + iProductos).prop('checked', isChecked);
            }
        }
    }
    onclickActualizarTotal(pValor);
}
function onclickConfirmarRecuperador(pIndexCarrito) {
    var contadorArray = -1;
    var ArrayProductos = new Array();
    var ArrayCantidad = new Array();
    var ArrayOferta = new Array();
    var ArrayCantidadTransfer = new Array();
    var isNoStock = false;
    for (var iProductos = 0; iProductos < listaRecuperardor[pIndexCarrito].listaProductos.length; iProductos++) {
        if ($('#checkRecuperador_' + pIndexCarrito + '_' + iProductos).is(":checked") && listaRecuperardor[pIndexCarrito].listaProductos[iProductos].stk_stock.toUpperCase() != 'N') {
            contadorArray++;
            ArrayProductos[contadorArray] = listaRecuperardor[pIndexCarrito].listaProductos[iProductos].pro_codigo;
            ArrayCantidad[contadorArray] = $('#tdCantidadRecuperador_' + pIndexCarrito + '_' + iProductos).html();
            if (listaRecuperardor[pIndexCarrito].listaProductos[iProductos].pro_ofeunidades == 0 && listaRecuperardor[pIndexCarrito].listaProductos[iProductos].pro_ofeporcentaje == 0) {
                ArrayOferta[contadorArray] = false;
            } else {
                ArrayOferta[contadorArray] = true;
            }
        } else if ($('#checkRecuperador_' + pIndexCarrito + '_' + iProductos).is(":checked") && listaRecuperardor[pIndexCarrito].listaProductos[iProductos].stk_stock.toUpperCase() == 'N') {
            isNoStock = true;
        }
    }
    if (contadorArray != -1) {
        AgregarProductosDelRecuperardorAlCarrito(listaRecuperardor[pIndexCarrito].fpc_codSucursal, ArrayProductos, ArrayCantidad, ArrayOferta);
    } else {
        if (isNoStock) {
            mensaje_informacion_generico('Sólo se pueden confirmar productos con Stock.');
            funLlenarGrillaFaltasProblemasCrediticios();
        }
    }
}

function OnCallBackAgregarProductosDelRecuperardorAlCarrito(args) {
    funLlenarGrillaFaltasProblemasCrediticios();
}
function onclickDescartarRecuperador(pIndexCarrito) {
    var contadorArray = -1;
    var ArrayProductos = new Array();
    for (var iProductos = 0; iProductos < listaRecuperardor[pIndexCarrito].listaProductos.length; iProductos++) {
        if ($('#checkRecuperador_' + pIndexCarrito + '_' + iProductos).is(":checked")) {
            contadorArray++;
            ArrayProductos[contadorArray] = listaRecuperardor[pIndexCarrito].listaProductos[iProductos].fpc_nombreProducto;
        }
    }
    if (contadorArray != -1) {
        BorrarPorProductosFaltasProblemasCrediticios(listaRecuperardor[pIndexCarrito].fpc_codSucursal, ArrayProductos);
    }
}
function OnCallBackBorrarPorProductosFaltasProblemasCrediticios(args) {
    funLlenarGrillaFaltasProblemasCrediticios();
}
