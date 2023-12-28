﻿var indiceCarritoTransferBorrar = null;
var listaTransfer = null;
var productoSeleccionado = '';
var textTipoEnvioCarritoTransfer = '';
var idTipoEnvioPedidoTransfer = null;
var textFacturaPedidoTransfer = null;
var textRemitoPedidoTransfer = null;
var codSucursalPedidoTransfer = null;
var listaResultadoPedidoTransfer = null;
var precioUnitario = [];
var tienePerfu = false;
var precioAcumulado = 0;
var cantProductosTotal = [];
var cantProductosBonif = [];
var precioInicial = 0;
var productosTotalString = 0;
var subProductosTotal = 0;
var cantUnidadesConBonificadas = 0;
var productosTotal = 0;
var contadorProductosTotal = 0;
var contadorPrecioTotal = 0;
var fijuniArray = [];

function jcTransfersProductos() {
    this.PrecioFinalTransfer;
    this.tde_codpro = -1;
    this.cantidad = -1;
    this.indexAuxProducto = -1; // para actualizar el carrito de compras
    this.indexAuxTransfer = -1; // para actualizar el carrito de compras
}

function OnCallBackRecuperarTransferPorId_home(args) {
    //var argsAux = [];
    //argsAux.push(args);
    OnCallBackRecuperarTransfer(args);
    onClickVerTransferCompleto(0);
}

function OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador(args) {
    // Cargar
    //var resultArgs = eval('(' + args + ')');
    var resultArgs = args;
    if (resultArgs.isNotError) {
        if (resultArgs.oSucursalCarritoTransfer == null) {
            for (var i = 0; i < listaCarritoTransferPorSucursal.length; i++) {
                if (listaCarritoTransferPorSucursal[i].Sucursal == resultArgs.codSucursal) {
                    listaCarritoTransferPorSucursal[i].Sucursal = '';
                    break;
                }
            }
        } else {
            var isEncontroEnLista = false;
            for (var i = 0; i < listaCarritoTransferPorSucursal.length; i++) {
                if (listaCarritoTransferPorSucursal[i].Sucursal == resultArgs.oSucursalCarritoTransfer.Sucursal) {
                    isEncontroEnLista = true;
                    listaCarritoTransferPorSucursal[i] = resultArgs.oSucursalCarritoTransfer;
                    $('#divContenedorBaseTransfer_' + resultArgs.oSucursalCarritoTransfer.Sucursal).html(AgregarCarritoTransfersPorSucursalHtml(i));
                    setScrollFinDeCarritoTransfer(i);
                    break;
                }
            }
            if (!isEncontroEnLista) {
                listaCarritoTransferPorSucursal.push(resultArgs.oSucursalCarritoTransfer);
                var indexTransferADD = listaCarritoTransferPorSucursal.length - 1;
                $('#divContenedorBaseTransfer_' + resultArgs.oSucursalCarritoTransfer.Sucursal).html(AgregarCarritoTransfersPorSucursalHtml(indexTransferADD));
                setScrollFinDeCarritoTransfer(indexTransferADD);
            }
        }
    } else {
        var msgProductos = '<ul>';
        for (var i = 0; i < resultArgs.listProductosAndCantidadError.length; i++) {
            msgProductos += '<li>' + resultArgs.listProductosAndCantidadError[i].codProductoNombre + '</li>'
        }
        msgProductos += '</ul>';
        var htmlMensaje = '<p>' + cuerpo_error + '</p>' + msgProductos;
        mensaje_error(titulo_error, htmlMensaje);
        setTimeout(function () { volverCantidadAnterior_desdeTransfer(); }, 40);
    }
    //
    CargarCantidadCarritos_Celular();
}

function OnCallBackAgregarProductosTransfersAlCarrito(args) {
    // Cargar
    //var resultArgs = eval('(' + args + ')');
    var resultArgs = args;
    if (resultArgs.isNotError) {
        var isEncontroEnLista = false;
        for (var i = 0; i < listaCarritoTransferPorSucursal.length; i++) {
            if (listaCarritoTransferPorSucursal[i].Sucursal == resultArgs.oSucursalCarritoTransfer.Sucursal) {
                isEncontroEnLista = true;
                listaCarritoTransferPorSucursal[i] = resultArgs.oSucursalCarritoTransfer;
                $('#divContenedorBaseTransfer_' + resultArgs.oSucursalCarritoTransfer.Sucursal).html(AgregarCarritoTransfersPorSucursalHtml(i));
                setScrollFinDeCarritoTransfer(i);
                break;
            }
        }
        if (!isEncontroEnLista) {
            listaCarritoTransferPorSucursal.push(resultArgs.oSucursalCarritoTransfer);
            var indexTransferADD = listaCarritoTransferPorSucursal.length - 1;
            $('#divContenedorBaseTransfer_' + resultArgs.oSucursalCarritoTransfer.Sucursal).html(AgregarCarritoTransfersPorSucursalHtml(indexTransferADD));
            setScrollFinDeCarritoTransfer(indexTransferADD);
        }
        //CargarCarritosTransfersPorSucursal();
        CerrarContenedorTransfer();
    } else {
        var msgProductos = '<ul>';
        for (var i = 0; i < resultArgs.listProductosAndCantidadError.length; i++) {
            msgProductos += '<li>' + resultArgs.listProductosAndCantidadError[i].codProductoNombre + '</li>'
        }
        msgProductos += '</ul>';
        //var htmlMensaje = cuerpo_error + msgProductos;
        var htmlMensaje = '<p>' + cuerpo_error + '</p>' + msgProductos;

        CerrarContenedorTransfer();
        //MostrarMensajeGeneral(titulo_error, htmlMensaje);
        mensaje_error(titulo_error, htmlMensaje);
    }
}
function CerrarContenedorTransfer() {
    // OJO
    HacerLimpiezaDeCarritosDspDeConfirmarPedido();
    // FIN OJO
    $('#modalModulo').modal('hide');
}
function CargarCarritosTransfersPorSucursal() {
    if (typeof listaCarritoTransferPorSucursal == 'undefined') {
        listaCarritoTransferPorSucursal = null;
    }
    if (listaCarritoTransferPorSucursal != null) {
        for (var i = 0; i < listaCarritoTransferPorSucursal.length; i++) {
            $('#divContenedorBaseTransfer_' + listaCarritoTransferPorSucursal[i].Sucursal).html(AgregarCarritoTransfersPorSucursalHtml(i));
            setScrollFinDeCarritoTransfer(i);
        }
    }
}

function AgregarCarritoTransfersPorSucursalHtml(pIndice) {
    var strHTML = '';
    strHTML += '<div class="div_carrito">';
    strHTML += '<div class="tit">';
    strHTML += 'Transfers ';
    for (var iNombreSucursal = 0; iNombreSucursal < listaSucursalesDependienteInfo.length; iNombreSucursal++) {
        if (listaSucursalesDependienteInfo[iNombreSucursal].sde_sucursal == listaCarritoTransferPorSucursal[pIndice].Sucursal) {
            strHTML += listaSucursalesDependienteInfo[iNombreSucursal].suc_nombre;
            break;
        }
    }


    //var strHtmlCierre = '';
    var isMostrarHorarioCierre = false;
    var visibleCssHorarioCierreTitulo = ' style="visibility:hidden;" ';
    if (isNotNullEmpty(listaCarritoTransferPorSucursal[pIndice].proximoHorarioEntrega) && cli_codsuc() != listaCarritoTransferPorSucursal[pIndice].Sucursal) {
        isMostrarHorarioCierre = true;
        visibleCssHorarioCierreTitulo = '';
    }
    strHTML += '<div class="clear5"></div>';
    strHTML += '<span id="contenedorProximaEntregaTransfer_' + pIndice + '" ' + visibleCssHorarioCierreTitulo + '>';
    strHTML += 'Próximo&nbsp;cierre:&nbsp;';
    strHTML += '<font id="proximaEntregaTransfer_' + pIndice + '">';
    if (isMostrarHorarioCierre) {
        strHTML += listaCarritoTransferPorSucursal[pIndice].proximoHorarioEntrega;
    }
    strHTML += '</font>';
    strHTML += '</span>';
    strHTML += '</div>'; // <div class="tit">


    strHTML += '<div class="div_carrito_head scroll">';
    strHTML += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
    strHTML += '<th class="col-lg-7 col-md-3 col-sm-3 col-xs-10 text-left thProductoTransf' + listaCarritoTransferPorSucursal[pIndice].Sucursal + '">Producto</th>';
    strHTML += '<th class="col-lg-2 col-md-1 col-sm-1 col-xs-1 text-center thCantTransf' + listaCarritoTransferPorSucursal[pIndice].Sucursal + '">Cant.</th>';
    strHTML += '<th class="col-lg-3 col-md-1 col-sm-1 col-xs-1 text-center thPrecioTransf' + listaCarritoTransferPorSucursal[pIndice].Sucursal + '"><div style="display: inline-block;">Precio</div></th>';
    strHTML += '</tr></thead></table>';
    strHTML += '</div>'; //<div class="div_carrito_head scroll">
    //
    strHTML += '<div id="div_carrito_transfer_cont_' + pIndice + '" class="div_carrito_cont">';
    strHTML += '<table class="footable table carrito table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
    strHTML += '<tbody>';
    //
    var nroTotalCarrito = parseFloat(0);
    var contFilaColor = -1;
    var cantProductosTransferTotales = 0;
    var RenglonesTotales = 0;
    for (var iTransfer = 0; iTransfer < listaCarritoTransferPorSucursal[pIndice].listaTransfer.length; iTransfer++) {
        var nroTotalPrecioPorTransfer = 0;
        for (var iTransferProductos = 0; iTransferProductos < listaCarritoTransferPorSucursal[pIndice].listaTransfer[iTransfer].listaProductos.length; iTransferProductos++) {
            RenglonesTotales++;
            contFilaColor++;
            var strHtmlColor = 'grs';
            if (contFilaColor % 2 != 0) {
                strHtmlColor = 'wht';
            }
            cantProductosTransferTotales += listaCarritoTransferPorSucursal[pIndice].listaTransfer[iTransfer].listaProductos[iTransferProductos].cantidad;
            var PrecioTotalProductoTransfer = listaCarritoTransferPorSucursal[pIndice].listaTransfer[iTransfer].listaProductos[iTransferProductos].cantidad * listaCarritoTransferPorSucursal[pIndice].listaTransfer[iTransfer].listaProductos[iTransferProductos].PrecioFinalTransfer;
            strHTML += '<tr class="' + strHtmlColor + '">';
            /* falta */
            var htmlColor = '';
            if (listaCarritoTransferPorSucursal[pIndice].listaTransfer[iTransfer].listaProductos[iTransferProductos].stk_stock == 'N') {
                htmlColor = ' color_red ';
            }
            /* fin falta */
            strHTML += '<td class="col-lg-7 col-md-3 col-sm-3 text-left ' + htmlColor + ' tdProductoTransf' + listaCarritoTransferPorSucursal[pIndice].Sucursal + '">' + listaCarritoTransferPorSucursal[pIndice].listaTransfer[iTransfer].listaProductos[iTransferProductos].pro_nombre + '</td>';
            strHTML += '<td class="col-lg-2 col-md-1 col-sm-1 col-xs-1 text-center tdCantTransf' + listaCarritoTransferPorSucursal[pIndice].Sucursal + '">';
            strHTML += '<span>' + listaCarritoTransferPorSucursal[pIndice].listaTransfer[iTransfer].listaProductos[iTransferProductos].cantidad + '</span>'; //De prueba, hasta que se conecte en la DB
            strHTML += '</td>';
            /* falta */
            var strHtmlPrecioProducto = '';
            if (listaCarritoTransferPorSucursal[pIndice].listaTransfer[iTransfer].listaProductos[iTransferProductos].stk_stock == 'N') {
                // nroTotalProducto = 0;
            } else {
                nroTotalCarrito += PrecioTotalProductoTransfer;
                strHtmlPrecioProducto = '$&nbsp;' + FormatoDecimalConDivisorMiles(PrecioTotalProductoTransfer.toFixed(2));
            }
            /* fin falta */
            strHTML += '<td class="col-lg-4 col-md-1 col-sm-1 text-right tdPrecioTransf' + listaCarritoTransferPorSucursal[pIndice].Sucursal + '">' + strHtmlPrecioProducto + '</td> ';
            strHTML += '</tr>';
            //nroTotalCarrito += PrecioTotalProductoTransfer;

        }
    }
    //
    strHTML += '</tbody></table>';
    strHTML += '</div>'; //<div class="div_carrito_cont">
    //
    strHTML += '<div class="col-lg-9 col-md-9 col-sm-9 text-left div_renglones">Renglones ' + RenglonesTotales + '<span class="pull-right">' + textUnidades + cantProductosTransferTotales + '</span></div>';
    strHTML += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-1 text-center"></div>';
    strHTML += '<div class="col-xs-12 div_total">Total<span class="pull-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(nroTotalCarrito.toFixed(2)) + '</span></div>';
    strHTML += '<div class="col-xs-12 pad_lr_car">';
    strHTML += '<a class="btn_confirmar" onclick="onclickIsPuedeUsarDllTransfer(' + pIndice + '); return false;" href="#">CONFIRMAR</a>';
    strHTML += '<a class="btn_vaciar float-left" onclick="onclickVaciarCarritoTransfer(' + pIndice + '); return false;" href="#">VACIAR</a>';
    strHTML += '</div>';
    strHTML += '<div class="clear"></div>';
    //
    strHTML += '</div>';// class="div_carrito"
    return strHTML;
}
function setScrollFinDeCarritoTransfer(pIndexCarrito) {
    setTimeout(function () { $('#div_carrito_transfer_cont_' + pIndexCarrito).scrollTop($('#div_carrito_transfer_cont_' + pIndexCarrito).prop('scrollHeight')); }, 40);
    setTimeout(function () { ReAjustarColumnasCarritos(listaCarritoTransferPorSucursal[pIndexCarrito].Sucursal, true); }, 40);
}
function onclickIsPuedeUsarDllTransfer(pIndice) {
    indexSucursalTransferSeleccionado = pIndice;
    IsHacerPedidos(listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].Sucursal, 'OnCallBackIsHacerPedidosTransfer');
}
function OnCallBackIsHacerPedidosTransfer(args) {
    if (args == 0) {
        onclickConfirmarCarritoTransfer(indexSucursalTransferSeleccionado);
    } else if (args == 2) {
        location.href = '../mvc/Buscador';
    } else if (args == 1) {
        mensaje('Información', mensajeTareasMantenimiento);
    }
}
function onclickConfirmarCarritoTransfer(pIndice) {
    MostrarConfirmarCarrito(pIndice, true);
    indexSucursalTransferSeleccionado = pIndice;
    ObtenerHorarioCierre(listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].Sucursal, 'OnCallBackObtenerHorarioCierreTransfer');
    onChangeTipoEnvio();
    //$('#txtMensajeFacturaTransfer').val('');
    //$('#txtMensajeRemitoTransfer').val('');
    //CargarHtmlTipoEnvioTransfer(listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].Sucursal);
    //document.getElementById('divConfirmarPedidoTransferContenedorGeneral').style.display = 'block';
    //var arraySizeDocumento = SizeDocumento();
    //document.getElementById('divTransferContenedorGeneralFondo').style.height = arraySizeDocumento[1] + 'px';
    //document.getElementById('divTransferContenedorGeneralFondo').style.display = 'block';
    //// Actualizar horario cierre
    //PageMethods.ObtenerHorarioCierre(listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].Sucursal, OnCallBackObtenerHorarioCierreTransfer, OnFail);
    //// fin actualizar horario cierre
}
function OnCallBackObtenerHorarioCierreTransfer(args) {
    if (args != null) {
        if (indexSucursalTransferSeleccionado != null) {
            if (cli_codsuc() != listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].Sucursal) {
                $('#proximaEntregaTransfer_' + indexSucursalTransferSeleccionado).html(listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].proximoHorarioEntrega);
                $('#contenedorProximaEntregaTransfer_' + indexSucursalTransferSeleccionado).css('visibility', 'visible');
            }
        }
    }
}
function onclickConfimarTransferPedidoOk() {
    if (isBotonNoEstaEnProceso) {
        if (indexSucursalTransferSeleccionado != null) {

            //var textFactura = $('#txtMensajeFactura').val();
            //var textRemito = $('#txtMensajeRemito').val();
            //var isUrgente = $('#checkboxIsUrgentePedido').is(":checked");
            //var idTipoEnvio = $('#comboTipoEnvio').val();
            //TomarPedidoCarrito(listaCarritos[pIndexCarrito].codSucursal, textFactura, textRemito, idTipoEnvio, isUrgente);
            ////
            //$('#modalModulo').modal('hide');
            //showCargando();


            idTipoEnvioPedidoTransfer = $('#comboTipoEnvio').val();
            textFacturaPedidoTransfer = '';//$('#txtMensajeFactura').val();
            textRemitoPedidoTransfer = $('#txtMensajeRemito').val();
            codSucursalPedidoTransfer = listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].Sucursal;
            textTipoEnvioCarritoTransfer = $('#comboTipoEnvio option:selected').text();
            TomarTransferPedidoCarrito(codSucursalPedidoTransfer, textFacturaPedidoTransfer, textRemitoPedidoTransfer, idTipoEnvioPedidoTransfer);
            //
            $('#modalModulo').modal('hide');
            showCargando();
            //
            isBotonNoEstaEnProceso = false;
        }
    }
}
function OnCallBackTomarTransferPedidoCarrito(args) {
    //    CerrarContenedorTransfer();
    isBotonNoEstaEnProceso = true;
    if (!isNotNullEmpty(args)) {
        args = null;
    } else {
        args = eval('(' + args + ')');
    }

    if (args == null) {
        //alert(mensajeCuandoSeMuestraError);
        mensaje_alert_base(mensajeCuandoSeMuestraError, 'volverBuscador()');
        //location.href = '../mvc/Buscador';
    } else {
        var isError = false;
        if (args.length > 0) {
            if (args[0].Error != '' || args[0].web_Error ) {
                isError = true;
            }
        }
        if (isError) {
            var msgError = '';
            if (args[0].Error != '') {
                msgError = args[0].Error;
            } else if (args[0].web_Error != '') {
                msgError = args[0].web_Error;
            }
            mensaje_alert_base(msgError, 'volverBuscador()');
            //location.href = '../mvc/Buscador';
        } else {
            isHacerBorradoCarritos = true;
            //document.getElementById('divConfirmarPedidoTransferContenedorGeneral').style.display = 'none';
            CargarRespuestaDePedidoTransfer(args);
        }
    }
    //    alert('O');
}
function onclickVaciarCarritoTransfer_ButtonOK(pIndice) {
    indiceCarritoTransferBorrar = pIndice;
    BorrarCarritoTransfer(listaCarritoTransferPorSucursal[pIndice].Sucursal);
    // BorrarCarritoPorId(listaCarritoTransferPorSucursal[pIndice].car_id, 'OnCallBackBorrarCarritoTransfer');
    return false;
}
function onclickVaciarCarritoTransfer(pIndice) {
    var clickButton = 'return onclickVaciarCarritoTransfer_ButtonOK(' + pIndice + ');';
    mensaje_vaciarCarrito(clickButton);
    fijuniArray = [];
}
function OnCallBackBorrarCarritoTransfer(args) {
    if (args) {
        if (indiceCarritoTransferBorrar != null) {
            $('#divContenedorBaseTransfer_' + listaCarritoTransferPorSucursal[indiceCarritoTransferBorrar].Sucursal).html('');
            //$('#divContenedorCarrito_' + indexCarrito).remove();
            var sucur = listaCarritoTransferPorSucursal[indiceCarritoTransferBorrar].Sucursal;
            listaCarritoTransferPorSucursal[indiceCarritoTransferBorrar].Sucursal = '';
            modalModuloAlertHide();
            limpiarTextBoxProductosBuscador(sucur);
            LimpiarTextBoxProductosBuscados(sucur);
        }
    }
}

function OnCallBackRecuperarTransfer(args) {
    if (isNotNullEmpty(args))
        listaTransfer = eval('(' + args + ')');
    else
        listaTransfer = null;

    if (listaTransfer != null) {
        if (listaTransfer.length > 0) {
            if (listaTransfer.length == 1) {
                //onclickMostrarUnTransferDeVarios(0);
                ComboCerrado(0);
                //strHtmlTransfer += AgregarTransferHtmlAlPopUp(0);
            } else {
                //strHtmlTransfer += '<div style="font-size:16px; margin-top: 10px;"  >' + 'Seleccione un transfer:' + '</div>';//Elija un transfer:
                //for (var i = 0; i < listaTransfer.length; i++) {
                //    strHtmlTransfer += '<div class="transferComboLista" style="font-size:14px; margin-top: 50px; cursor:pointer;" onmouseover="onmouseoverElijaTransfer(this)" onmouseout="onmouseoutElijaTransfer(this)" onclick="onclickMostrarUnTransferDeVarios(' + i + ')">' + listaTransfer[i].tfr_nombre + '</div>';
                //}
                $('#modalModulo').html(htmlSeleccioneTransfer(listaTransfer));
                $('#modalModulo').modal();
            }

        }
    }
}
function ComboCerrado(pValor) {
    //$('#modalModulo').modal('hide');
    $('#modalModulo').html(AgregarTransferHtmlAlPopUp(pValor));
    $('#modalModulo').modal();
    Contador(pValor);

}

/* function onclickMostrarUnTransferDeVarios(pValor) {
    //$('#modalModulo').modal('hide');
    $('#modalModulo').html(AgregarTransferHtmlAlPopUp(pValor));
    $('#modalModulo').modal();
} */

function AgregarTransferHtmlAlPopUp(pIndex) { //calcar y transformar
    var strHtmlTransfer = '';
    strHtmlTransfer += '<div class="modal-background">&nbsp;</div>';
    strHtmlTransfer += '<div class="modal-dialog modal-lg"><div class="modal-content border">';
    strHtmlTransfer += '<div class="modal-header">';
    strHtmlTransfer += '<div class="row">';
    strHtmlTransfer += '<div class="col-md-12" text-right>';
    // strHtmlTransfer += '<h4>' + listaTransfer[pIndex].tfr_nombre + '</h4>';
    strHtmlTransfer += '</div>';
    strHtmlTransfer += '</div>';
    strHtmlTransfer += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtmlTransfer += '</div>';
    strHtmlTransfer += '<div class="modal-body"><div class="col-md-12" text-right>';
    //
    if (listaTransfer[pIndex].tfr_descripcion != null) {
        strHtmlTransfer += '<div class="col-lg-5 tit_trasf_combo"><b>' + listaTransfer[pIndex].tfr_nombre + '</b></div>'; //Nombre de combo
        strHtmlTransfer += '<div class="clear"></div>';
    }
    //strHtmlTransfer += '<div class="row  style="display: flex; align-items: flex-start;">';
    strHtmlTransfer += '<div class="rowComboCerrado">';
    strHtmlTransfer += '<div class="producto"><b>Producto:</b></div>'; //nombre de producto
    strHtmlTransfer += '<div class="descripcion"><b>Descripción:</b></div>'; //descripcion de producto
    strHtmlTransfer += '<div class="precio"><b>Precio:</b></div>'; //precio sin descuento
    strHtmlTransfer += '<div class="precio-descuento"><b>Precio <br> c/ Desc.:</b></div>'; //precio con descuento
    strHtmlTransfer += '<div class="cant-unidadesCombo"><b>Cant. <br> Unid.</b></div>'; //cant. unidades combo
    strHtmlTransfer += '<div class="cant-total-unidades"><b>Cant.Total <br> Facturada</b></div>'; //cant. total de unidades  
    strHtmlTransfer += '<div class="producto-bonificado"><b>Prod.<br> Bonif.</b></div>'; //Producto Bonificado
    strHtmlTransfer += '<div class="cant-bonificada"><b>Cant.<br> Bonif.</b></div>'; // Cantidad Bonificada
    strHtmlTransfer += '<div class="cant-total-bonificada"><b>CANT.<br> TOTAL <br> Bonif.</b></div>'; //Precio Bonificado
    strHtmlTransfer += '<div class="precio-total-descuento"><b>PRECIO <br> TOTAL<br> Facturado</b></div>'; //Total precio c./ Descuento
    strHtmlTransfer += '<div class="precio-unidad"><b>Precio por<br> unidad</b></div>'; //Precio por Unidad
    strHtmlTransfer += '</div>'; // Cierre de la fila de títulos
    strHtmlTransfer += '<hr style="margin-top: 2px; margin-bottom: 2px; border-bottom: 2px solid #000; margin-left: 2px; margin-right: 2px; class="no-padding-left">';
    //
    //strHtmlTransfer += '<div class="row">';

    for (var y = 0; y < listaTransfer[pIndex].listaDetalle.length; y++) {
        //Variables Precio total
        precioInicial = listaTransfer[pIndex].listaDetalle[y].PrecioFinalTransfer * listaTransfer[pIndex].listaDetalle[y].tde_fijuni; //Precio inicial de "Total precio con descuento"
        cantProductosBonif.push(listaTransfer[pIndex].listaDetalle[y].tde_unidadesbonificadas);
        cantProductosTotal.push(listaTransfer[pIndex].listaDetalle[y].tde_fijuni);
        precioUnitario.push(listaTransfer[pIndex].listaDetalle[y].PrecioFinalTransfer);
        precioAcumulado = precioInicial + precioAcumulado;
        precioTotal = parseFloat(precioAcumulado);
        contadorPrecioTotal = precioTotal;
        //Variables total de Productos
        subProductosTotal = listaTransfer[pIndex].listaDetalle[y].tde_fijuni + listaTransfer[pIndex].listaDetalle[y].tde_unidadesbonificadas;
        productosTotalString = subProductosTotal + productosTotalString;
        productosTotal = parseFloat(productosTotalString);
        contadorProductosTotal  = productosTotal;
        //Variables precio total unitario
        precioPorUnidad = parseFloat(precioTotal / productosTotal);
        cantUnidadesConBonificadas = precioInicial / subProductosTotal;


        strHtmlTransfer += '<div class="rowComboCerrado">';
        strHtmlTransfer += '<div class="producto" id="producto_' + y + '">' + listaTransfer[pIndex].listaDetalle[y].tde_DescripcionDeProducto + '</div>'; //nombre de producto
        strHtmlTransfer += '<div class="descripcion">' + listaTransfer[pIndex].listaDetalle[y].tde_descripcion + '</div>'; //descripcion de producto
        strHtmlTransfer += '<div class="precio">$&nbsp;' + FormatoDecimalConDivisorMiles(listaTransfer[pIndex].listaDetalle[y].tde_prepublico) + '</div>'; //precio sin descuento
        strHtmlTransfer += '<div class="precio-descuento">$&nbsp;' + FormatoDecimalConDivisorMiles(listaTransfer[pIndex].listaDetalle[y].PrecioFinalTransfer.toFixed(2)) + '</div>'; //precio con descuento
        strHtmlTransfer += '<div class="cant-unidadesCombo" >' + listaTransfer[pIndex].listaDetalle[y].tde_fijuni + '</div>'; //cant. unidades 
        strHtmlTransfer += '<div class="cant-total-unidades" id="total-uni_' + y + '">' + listaTransfer[pIndex].listaDetalle[y].tde_fijuni + '</div>'; //cant. total facturada
        if (listaTransfer[pIndex].listaDetalle[y].tde_unidadesbonificadas > 0) {
            
        strHtmlTransfer += '<div class="producto-bonificado">' + listaTransfer[pIndex].listaDetalle[y].tde_unidadesbonificadasdescripcion + '</div>'; //Producto Bonificado
        strHtmlTransfer += '<div class="cant-bonificada">' + listaTransfer[pIndex].listaDetalle[y].tde_unidadesbonificadas + '</div>'; // Cantidad Bonificada
        strHtmlTransfer += '<div class="cant-total-bonificada" id="uni-bonif_' + y + '">' + listaTransfer[pIndex].listaDetalle[y].tde_unidadesbonificadas + '</div>'; //total Bonificado
        }else{
            strHtmlTransfer += '<div class="producto-bonificado"> - </div>'; //Producto Bonificado
            strHtmlTransfer += '<div class="cant-bonificada"> - </div>'; // Cantidad Bonificada
            strHtmlTransfer += '<div class="cant-total-bonificada" id="uni-bonif_' + y + '"> - </div>'; //cantidad total Bonificada
        }
        strHtmlTransfer += '<div class="precio-total-descuento" id="total-desc_' + y + '">$&nbsp;' + FormatoDecimalConDivisorMiles(precioInicial.toFixed(2)) + '</div>'; //precio total facturado
        strHtmlTransfer += '<div class="precio-unidad" id="precio-total-unidad_' + y + '">$&nbsp;'+ cantUnidadesConBonificadas.toFixed(2) + ' </div>'; //Precio final por unidad
        strHtmlTransfer += '</div>'; // Cierre de la fila de datos

        if (y === listaTransfer[pIndex].listaDetalle.length - 1) {
        strHtmlTransfer += '<hr style="margin-top: 2px; margin-bottom: 2px; border-bottom: 2px solid #000; margin-left: 2px; margin-right: 2px; class="no-padding">';
        }else{
        strHtmlTransfer += '<hr style="margin-top: 2px; margin-bottom: 2px; margin-left: 2px; margin-right: 2px;">';
        }; 
        strHtmlTransfer += '<div id="tdError' + pIndex + '_' + y + '"  class="errorFilaTransfer" ></div>';

    } 



    strHtmlTransfer += '<div class="style-bottom">';
    strHtmlTransfer += '<div class="clear10"></div>';
    strHtmlTransfer += '<div class="row">';
    strHtmlTransfer += '<div class="col-md-3 col-sm-4 mx-auto d-flex justify-content-center align-items-center">';
    strHtmlTransfer += '   <div class="button-modal">';
    strHtmlTransfer += '  <div class="input-group input-group-sm text-center my-2 rounded">';
    strHtmlTransfer += '    <span class="input-group-btn">';
    strHtmlTransfer += '      <button type="button" class="btn btn-primary btn-number btn-sm rounded-circle" data-type="minus" data-field="qty">';
    strHtmlTransfer += '        <span class="glyphicon glyphicon-minus"></span>';
    strHtmlTransfer += '      </button>';
    strHtmlTransfer += '    </span>';
    strHtmlTransfer += '    <input type="number" oninput="validateNumberInput(this)" inputmode="numeric" name="qty" class="form-control input-number border border-dark rounded-pill text-center" value="1" min="1" id="quantityInput">';
    strHtmlTransfer += '    <span class="input-group-btn">';
    strHtmlTransfer += '      <button type of="button" class="btn btn-primary btn-number btn-sm rounded-circle" data-type="plus" data-field="qty">';
    strHtmlTransfer += '        <span class="glyphicon glyphicon-plus"></span>';
    strHtmlTransfer += '      </button>';
    strHtmlTransfer += '    </span>';
    strHtmlTransfer += '  </div>';
    strHtmlTransfer += '</div>';
    strHtmlTransfer += '</div>';
    strHtmlTransfer += '<div class="col-md-2 col-sm-4 monto-total1">MONTO TOTAL:</div>&nbsp';
    strHtmlTransfer += '<div class="col-md-2 col-sm-4 monto-total2" id="monto-total">$&nbsp;' + precioTotal.toFixed(2) + '</div>&nbsp'; //Cambiar por precio total
    strHtmlTransfer += '<div class="col-md-2 col-sm-4 monto-total1">CANTIDAD PRODUCTOS:</div>&nbsp';
    strHtmlTransfer += '<div class="col-md-2 col-sm-4 monto-total2" id="productos-total">' + productosTotal + '</div>&nbsp'; //Cambiar por precio total
    strHtmlTransfer += '</div>';
    strHtmlTransfer += '</div>';

    productosTotalString = 0;
    productosTotal = 0;
    precioTotal = 0;
    precioAcumulado = 0;
    var cantBotonesSucursales = 0;
    for (var iSucursalNombre = 0; iSucursalNombre < listaSucursalesDependienteInfo.length; iSucursalNombre++) {
        // 25/02/2018
        var strOcultar = false;
        if (listaTransfer[pIndex].tfr_nombre == 'TRANSFER PAÑALES PAMI') {
            if ((cli_codsuc() == 'CO' || cli_codsuc() == 'CD' || cli_codsuc() == 'SF' || cli_codsuc() == 'CB' || cli_codsuc() == 'VM' || cli_codsuc() == 'RC')
                && listaSucursalesDependienteInfo[iSucursalNombre].sde_sucursal == 'CC') {
                strOcultar = true;
            }
        }
        // fin: 25/02/2018
        if (!strOcultar) {
            var btn_confirmar_sucursal = '';
            var btn_confirmar_confirmar = 'CONFIRMAR';
            console.log(listaTransfer[pIndex].listaDetalle);
            if (!(cli_codsuc() == 'CC' && cli_IdSucursalAlternativa() == null)) {
                btn_confirmar_sucursal = ConvertirSucursalParaColumna(listaSucursalesDependienteInfo[iSucursalNombre].sde_sucursal);
                btn_confirmar_confirmar = '- CONFIRMAR'
            }
            var btn_confirmar_class = '';
            if (cantBotonesSucursales == 0)
                btn_confirmar_class = ' no-margin-r';
            if (listaSucursalesDependienteInfo[iSucursalNombre].suc_trabajaPerfumeria || (!listaSucursalesDependienteInfo[iSucursalNombre].suc_trabajaPerfumeria && !tienePerfu)) {
                strHtmlTransfer += '<a class="btn_confirmar' + btn_confirmar_class + '" href="#"  onclick="onClickTransfer(' + pIndex + ',' + iSucursalNombre + '); return false;">' + btn_confirmar_sucursal + '<span class="hidden-xs">' + btn_confirmar_confirmar + '</span></a>';
                cantBotonesSucursales++;
            }
        }
    }

    strHtmlTransfer += '</div></div>'; //'<div class="modal-body"><div class="col-lg-12">'
    strHtmlTransfer += '<div class="clear"></div>';
    strHtmlTransfer += '</div></div>'; // <div class="modal-dialog modal-lg"><div class="modal-content"> 

    return strHtmlTransfer;
}

function htmlSeleccioneTransfer(pListaTransfer) {
    var strHtmlTransfer = '';
    strHtmlTransfer += '<div class="modal-background">&nbsp;</div>';
    strHtmlTransfer += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtmlTransfer += '<div class="modal-header">';
    strHtmlTransfer += '<div class="row">';
    strHtmlTransfer += '<div class="col-lg-12">';
    strHtmlTransfer += '<div class="modulo_icon atencion"></div>';
    strHtmlTransfer += '<h4 class="color_gris">Seleccione un transfer</h4>';
    strHtmlTransfer += '</div>'; // '<div class="col-lg-12">
    strHtmlTransfer += '</div>'; // <div class="row">
    strHtmlTransfer += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtmlTransfer += '</div>'; // <div class="modal-header">
    strHtmlTransfer += '<div class="modal-body"><div class="col-lg-12">';
    for (var i = 0; i < pListaTransfer.length; i++) {
        var nombreMostrarTransfer = pListaTransfer[i].tfr_nombre;
        for (var iMostrarTransfer = 0; iMostrarTransfer < pListaTransfer[i].listaDetalle.length; iMostrarTransfer++) {
            if (productoSeleccionado == pListaTransfer[i].listaDetalle[iMostrarTransfer].tde_codpro && isNotNullEmpty(pListaTransfer[i].listaDetalle[iMostrarTransfer].tde_DescripcionDeProducto)) {
                nombreMostrarTransfer = pListaTransfer[i].listaDetalle[iMostrarTransfer].tde_DescripcionDeProducto;// pListaTransfer[i].tfr_nombre + ' - ' +
                break;
            }
        }
        strHtmlTransfer += '<div class="text-center"><a class="btn_emp" onclick="ComboCerrado(' + i + '); return false;">' + nombreMostrarTransfer + '</a></div>';
        strHtmlTransfer += '<div class="clear15"></div>';
    }
    strHtmlTransfer += '</div></div>'; //'<div class="modal-body"><div class="col-lg-12">'
    strHtmlTransfer += '<div class="clear"></div>';
    strHtmlTransfer += '</div></div>'; // <div class="modal-dialog modal-md"><div class="modal-content"> 


    return strHtmlTransfer;
}
// INICIO CONTADOR <-------------
function Contador(pIndex) {
    for (let x = 0; x < listaTransfer[pIndex].listaDetalle.length; x++) {
        fijuniArray.push(listaTransfer[pIndex].listaDetalle[x].tde_fijuni);
    }
    const cantInicial = contadorProductosTotal;
    const valorInicial = contadorPrecioTotal;
    var buttons = document.querySelectorAll(".btn-number");
    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        var fieldName = this.getAttribute("data-field");
        var type = this.getAttribute("data-type");
        var input = document.querySelector("input[name='" + fieldName + "']");
        var currentValue = parseInt(input.value);

        if (!isNaN(currentValue)) {
          if (type === "minus" && currentValue > 1) {
            fijuniArray = [];
            input.value = currentValue - 1;
            contadorPrecioTotal -= valorInicial;
            contadorProductosTotal -= cantInicial;
          } else if (type === "plus") {
            fijuniArray = [];
            input.value = currentValue + 1;
            contadorPrecioTotal += valorInicial;
            contadorProductosTotal += cantInicial;
          }
  
          for (let x = 0; x < listaTransfer[pIndex].listaDetalle.length; x++) {
            document.getElementById("total-desc_" + x + "").textContent =
              "$" +
              (
                input.value *
                listaTransfer[pIndex].listaDetalle[x].PrecioFinalTransfer *
                listaTransfer[pIndex].listaDetalle[x].tde_fijuni
              ).toFixed(2);
            document.getElementById("precio-total-unidad_" + x + "").textContent =
              "$" +
              (
                (input.value *
                  precioUnitario[x] *
                  listaTransfer[pIndex].listaDetalle[x].tde_fijuni) /
                (input.value * (cantProductosTotal[x] + cantProductosBonif[x]))
              ).toFixed(2);
            document.getElementById("total-uni_" + x + "").textContent =
              input.value * listaTransfer[pIndex].listaDetalle[x].tde_fijuni;
              fijuniArray.push(input.value * listaTransfer[pIndex].listaDetalle[x].tde_fijuni); //Array
            if (listaTransfer[pIndex].listaDetalle[x].tde_unidadesbonificadas == 0) {
              document.getElementById("uni-bonif_" + x + "").textContent = "-";
            } else {
              document.getElementById("uni-bonif_" + x + "").textContent =
                input.value * listaTransfer[pIndex].listaDetalle[x].tde_unidadesbonificadas;
            }
          }
  
          document.getElementById("productos-total").textContent = contadorProductosTotal;
          document.getElementById("monto-total").textContent =
            "$" + contadorPrecioTotal.toFixed(2);
        }
      });
    });

    // Modifica el evento keyup para actualizar todos los valores
    document
      .getElementById("quantityInput")
      .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          fijuniArray = [];
          var input = this;
          var enteredValue = parseInt(input.value);
          if (!isNaN(enteredValue)) {
            contadorProductosTotal = enteredValue * cantInicial;
            contadorPrecioTotal = enteredValue * valorInicial;
            document.getElementById("monto-total").textContent =
              "$" + contadorPrecioTotal.toFixed(2);
            document.getElementById("productos-total").textContent =
              contadorProductosTotal;
  
            for (let x = 0; x < listaTransfer[pIndex].listaDetalle.length; x++) {
              document.getElementById("total-desc_" + x + "").textContent =
                "$" +
                (
                  input.value *
                  listaTransfer[pIndex].listaDetalle[x].PrecioFinalTransfer *
                  listaTransfer[pIndex].listaDetalle[x].tde_fijuni
                ).toFixed(2);
              document.getElementById(
                "precio-total-unidad_" + x + ""
              ).textContent =
                "$" +
                (
                  (input.value *
                    precioUnitario[x] *
                    listaTransfer[pIndex].listaDetalle[x].tde_fijuni) /
                  (input.value * (cantProductosTotal[x] + cantProductosBonif[x]))
                ).toFixed(2);
              document.getElementById("total-uni_" + x + "").textContent =
                enteredValue * listaTransfer[pIndex].listaDetalle[x].tde_fijuni;
                fijuniArray.push(input.value * listaTransfer[pIndex].listaDetalle[x].tde_fijuni); //Array
              if (listaTransfer[pIndex].listaDetalle[x].tde_unidadesbonificadas == 0) {
                document.getElementById("uni-bonif_" + x + "").textContent = "-";
              } else {
                document.getElementById("uni-bonif_" + x + "").textContent =
                  input.value * listaTransfer[pIndex].listaDetalle[x].tde_unidadesbonificadas;
              }
            }
          }
        }
      });
  
    // Modifica el evento blur para actualizar todos los valores al perder el foco
    document
      .getElementById("quantityInput")
      .addEventListener("blur", function () {
        fijuniArray = [];
        var input = this;
        var enteredValue = parseInt(input.value);
        if (!isNaN(enteredValue)) {
            contadorProductosTotal = enteredValue * cantInicial;
            contadorPrecioTotal = enteredValue * valorInicial;
          document.getElementById("monto-total").textContent =
            "$" + contadorPrecioTotal.toFixed(2);
          document.getElementById("productos-total").textContent = contadorProductosTotal;
  
          for (let x = 0; x < listaTransfer[pIndex].listaDetalle.length; x++) {
            document.getElementById("total-desc_" + x + "").textContent =
              "$" +
              (
                input.value *
                listaTransfer[pIndex].listaDetalle[x].PrecioFinalTransfer *
                listaTransfer[pIndex].listaDetalle[x].tde_fijuni
              ).toFixed(2);
            document.getElementById("precio-total-unidad_" + x + "").textContent =
              "$" +
              (
                (input.value *
                  precioUnitario[x] *
                  listaTransfer[pIndex].listaDetalle[x].tde_fijuni) /
                (input.value * cantProductosTotal[x] +
                  input.value * cantProductosBonif[x])
              ).toFixed(2);
            document.getElementById("total-uni_" + x + "").textContent =
              enteredValue * listaTransfer[pIndex].listaDetalle[x].tde_fijuni;
              fijuniArray.push(input.value * listaTransfer[pIndex].listaDetalle[x].tde_fijuni); //Array
            if (listaTransfer[pIndex].listaDetalle[x].tde_unidadesbonificadas == 0) {
              document.getElementById("uni-bonif_" + x + "").textContent = "-";
            } else {
              document.getElementById("uni-bonif_" + x + "").textContent =
                input.value * listaTransfer[pIndex].listaDetalle[x].tde_unidadesbonificadas;
            }
          }
        }
      });
      
  }

function validateNumberInput(input) {
    // Elimina cualquier caracter no numérico
    input.value = input.value.replace(/[^0-9]/g, '');
}
// FIN CONTADOR <--------------

function onClickTransfer(pIndice, pIndiceSucursal) {
    ValidarTransferTotal_sucursal(pIndice, pIndiceSucursal);
}

function ValidarTransferTotal_sucursal(pIndice, pIndiceSursal) {

    var isGrabar = true;
    var tempListaProductos = [];
    var cantTotalEnTransfer = 0;

    for (var i = 0; i < listaTransfer[pIndice].listaDetalle.length; i++) {
        var isGrabarProducto = true;
        var intMensajeProducto = i+1;
        if (intMensajeProducto > 0) {
            cantTotalEnTransfer = intMensajeProducto;
        } else if (intMensajeProducto == -1) {
            isGrabarProducto = false;
        }
        if (isGrabarProducto) {
            if (intMensajeProducto > 0) {
                var objProducto = new jcTransfersProductos();
                objProducto.codProductoNombre = listaTransfer[pIndice].listaDetalle[i].tde_codpro; // Para la funcion en el servidor
                objProducto.codProducto = listaTransfer[pIndice].listaDetalle[i].tde_codpro;
                objProducto.tde_codpro = listaTransfer[pIndice].listaDetalle[i].tde_codpro;
                objProducto.cantidad = fijuniArray[i];
                objProducto.indexAuxProducto = i;
                objProducto.indexAuxTransfer = pIndice;
                tempListaProductos.push(objProducto);
            }
        } else {
            isGrabar = false;
            break;
        }
    }
    if (isGrabar) {
        AgregarProductosTransfersAlCarrito(tempListaProductos, listaTransfer[pIndice].tfr_codigo, listaSucursalesDependienteInfo[pIndiceSursal].sde_sucursal, 'OnCallBackAgregarProductosTransfersAlCarrito');
    }
}

function onClickVerTransferCompleto(pIndex) {
    if ($('#btnVerTransferCompleto' + pIndex).length) {
        if ($('#btnVerTransferCompleto' + pIndex)[0].innerText == 'VER TRANSFER COMPLETO') {
            $('.cssMospapProductoOculto' + pIndex).css('display', 'block');
            $('#btnVerTransferCompleto' + pIndex)[0].innerText = 'OCULTAR PRODUCTOS DETALLES';
        }
        else {
            $('.cssMospapProductoOculto' + pIndex).css('display', 'none');
            $('#btnVerTransferCompleto' + pIndex)[0].innerText = 'VER TRANSFER COMPLETO';
        }
    }
}
function onfocusInputTransfer(pValor) {
    DesmarcarFilaSeleccionada();
    selectInputCarrito = null;
    selectedInput = null;
    selectedInputTransfer = pValor;
}
function onblurCantProductosTransfer(pValor) {
    if (pValor.value != '') {
        var nombre = pValor.id;
        nombre = nombre.replace('txtProdTransf', '');
        var palabrasBase = nombre.split("_");
        var indiceTransfer = parseInt(palabrasBase[0]);
        var indiceProductoTransfer = parseInt(palabrasBase[1]);
        ValidarTransferPorProducto(indiceTransfer, indiceProductoTransfer);
    }
}
function ValidarTransferPorProducto(pIndiceTransfer, pIndiceProducto) {
    var UnidadesMinimas = listaTransfer[pIndiceTransfer].listaDetalle[pIndiceProducto].tde_minuni;
    var UnidadesMaximas = listaTransfer[pIndiceTransfer].listaDetalle[pIndiceProducto].tde_maxuni;
    var UnidadesMultiplo = listaTransfer[pIndiceTransfer].listaDetalle[pIndiceProducto].tde_muluni;
    var UnidadesFijas = listaTransfer[pIndiceTransfer].listaDetalle[pIndiceProducto].tde_fijuni;

    var intTipoMensaje = 0;
    $('#tdError' + pIndiceTransfer + '_' + pIndiceProducto).html('');
    var cantidad = $('#txtProdTransf' + pIndiceTransfer + '_' + pIndiceProducto).val();
    if (isNotNullEmpty(cantidad)) {
        cantidad = parseInt(cantidad);
        intTipoMensaje = cantidad;
        if (cantidad > 0) {

            if (isNotNullEmpty(UnidadesMinimas)) {
                if (UnidadesMinimas > cantidad) { //
                    intTipoMensaje = -1;
                    $('#tdError' + pIndiceTransfer + '_' + pIndiceProducto).html('La cantidad no iguala o no supera la unidad mínima');
                }
            }
            if (isNotNullEmpty(UnidadesMaximas)) {
                if (UnidadesMaximas < cantidad) { //
                    intTipoMensaje = -1;
                    $('#tdError' + pIndiceTransfer + '_' + pIndiceProducto).html('La cantidad no iguala o supera la unidad máxima');
                }
            }
            if (isNotNullEmpty(UnidadesMultiplo)) {
                if (cantidad % UnidadesMultiplo == 0) {
                    // es multiplo
                } else {
                    intTipoMensaje = -1;
                    $('#tdError' + pIndiceTransfer + '_' + pIndiceProducto).html('La cantidad no es multiplo de ' + UnidadesMultiplo);
                }
            }
            if (isNotNullEmpty(UnidadesFijas)) {
                if (UnidadesFijas != cantidad) {
                    intTipoMensaje = -1;
                    $('#tdError' + pIndiceTransfer + '_' + pIndiceProducto).html('La cantidad es diferente de la unidad fija');
                }
            }
            //
        }
    }
    return intTipoMensaje;
}

function CargarRespuestaDePedidoTransfer(pValor) {
    listaResultadoPedidoTransfer = pValor;
    var MontoTotal = 0;
    var isProductosTransferPedidos = false;
    var isProductosTransferPedidosFaltantes = false;
    var isProductosTransferPedidosRevision = false;
    var isProductosPedidoFacturarseHabitual = false;
    var strHtmlFaltantes = '';
    var strHtml = '';
    var strHtmlMensajeFinales = '';
    var strHtmlEnRevision = '';
    var strHtmlPedidoFacturarseHabitual = '';
    if (pValor != null) {
        if (pValor.length > 0) {
            strHtmlMensajeFinales += '<div  class="col-xs-12" style="font-size: 12px;">TIPO DE ENVIO: ' + textTipoEnvioCarritoTransfer + ' </div>';
            strHtml += '<div class="col-xs-12">';
            strHtml += '<div class="titleConfirmar">PRODUCTOS FACTURADOS</div>';
            strHtml += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
            strHtml += '<th class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">Nombre producto</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">Cantidad</th>';
            strHtml += '</tr></thead></table>';
            strHtml += '<table class="footable table popup table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
            strHtml += '<tbody>';


            // Encabezado PRODUCTOS EN FALTA
            strHtmlFaltantes += '<div class="col-xs-12">';
            strHtmlFaltantes += '<div class="titleConfirmar">PRODUCTOS EN FALTA</div>';
            strHtmlFaltantes += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
            strHtmlFaltantes += '<th class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">Nombre producto</th>';
            strHtmlFaltantes += '<th class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">Cantidad</th>';
            strHtmlFaltantes += '</tr></thead></table>';
            strHtmlFaltantes += '<table class="footable table popup table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
            strHtmlFaltantes += '<tbody>';
            // Fin Encabezado PRODUCTOS EN FALTA

            var cantFaltantes = 0;
            var cantFacturados = 0;
            for (var i = 0; i < pValor.length; i++) {

                // EnRevision
                if (pValor[i].Login == 'REVISION') {
                    //Inicio Mensaje solamente a revicion
                    if (indexSucursalTransferSeleccionado != null) {
                        var sucursal = listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].Sucursal;
                        strHtmlMensajeFinales = '';
                        strHtmlMensajeFinales += '<div  class="col-xs-12" style="font-size: 14px;">' + 'Transfers a Revisión. Se ha generado un mail a ';
                        if (sucursal == 'CC') {
                            strHtmlMensajeFinales += 'pedidos@kellerhoff.com.ar';
                        } else if (sucursal == 'CH') {
                            strHtmlMensajeFinales += 'sucursalchanarladeado@kellerhoff.com.ar';
                        } else if (sucursal == 'SF') {
                            strHtmlMensajeFinales += 'sucursalsantafe@kellerhoff.com.ar';
                        } else if (sucursal == 'CB') {
                            strHtmlMensajeFinales += 'sucursalcordoba@kellerhoff.com.ar';
                        } else if (sucursal == 'CO') {
                            strHtmlMensajeFinales += 'sucursalconcepcion@kellerhoff.com.ar';
                        } else if (sucursal == 'CD') {
                            strHtmlMensajeFinales += 'sucursalconcordia@kellerhoff.com.ar';
                        } else if (sucursal == 'VH') {
                            strHtmlMensajeFinales += 'terapiasespeciales@kellerhoff.com.ar';
                        }
                        strHtmlMensajeFinales += ' </div>';
                    }
                    //Fin Mensaje solamente a revicion

                    strHtmlEnRevision += '<div class="col-xs-12">';
                    strHtmlEnRevision += '<div class="titleConfirmar">PRODUCTOS PENDIENTES EN FACTURACION </div>';
                    strHtmlEnRevision += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
                    strHtmlEnRevision += '<th class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">Nombre producto</th>';
                    strHtmlEnRevision += '<th class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">Cantidad</th>';
                    strHtmlEnRevision += '</tr></thead></table>';
                    strHtmlEnRevision += '<table class="footable table popup table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
                    strHtmlEnRevision += '<tbody>';

                    for (var x = 0; x < pValor[i].Items.length; x++) {

                        var strHtmlColorFondo = 'grs';
                        if (x % 2 != 0) {
                            strHtmlColorFondo = 'wht';
                        }
                        isProductosTransferPedidosRevision = true;
                        strHtmlEnRevision += '<tr class="' + strHtmlColorFondo + '">';
                        strHtmlEnRevision += '<td class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">' + pValor[i].Items[x].NombreObjetoComercial + '</td>';
                        strHtmlEnRevision += '<td class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">' + pValor[i].Items[x].Cantidad + '</td>';
                        strHtmlEnRevision += '</tr>';
                    }
                    //Fin EnRevision
                } else if (pValor[i].Login == 'CONFIRMACION') {
                    // facturarse de forma Habitual 

                    strHtmlPedidoFacturarseHabitual += '<div class="col-xs-12">';
                    //strHtmlPedidoFacturarseHabitual += '<div class="titleConfirmar">Productos en transfer no procesados por falta de stock para llegar a condición mínima o exceso en el cupo de unidades. Confirme cuantas unidades quiere con su descuento habitual.</div>';
                    strHtmlPedidoFacturarseHabitual += '<div class="titleNoCumplenConCondicion">No cumplen con la condición mínima por falta de stock o exceden la cantidad de unidades semanales autorizadas por el laboratorio.<br>';
                    strHtmlPedidoFacturarseHabitual += '<u><b>Si continúa, las unidades se facturarán con su descuento habitual.</b></u></div>';
                    strHtmlPedidoFacturarseHabitual += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
                    strHtmlPedidoFacturarseHabitual += '<th class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">Nombre producto</th>';
                    strHtmlPedidoFacturarseHabitual += '<th class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">Cantidad</th>';
                    strHtmlPedidoFacturarseHabitual += '</tr></thead></table>';
                    strHtmlPedidoFacturarseHabitual += '<table class="footable table popup table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
                    strHtmlPedidoFacturarseHabitual += '<tbody>';

                    for (var x = 0; x < pValor[i].Items.length; x++) {
                        var strHtmlColorFondo = 'grs';
                        if (x % 2 != 0) {
                            strHtmlColorFondo = 'wht';
                        }
                        isProductosPedidoFacturarseHabitual = true;
                        strHtmlPedidoFacturarseHabitual += '<tr class="' + strHtmlColorFondo + '">';
                        strHtmlPedidoFacturarseHabitual += '<td class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">' + pValor[i].Items[x].NombreObjetoComercial + '</td>';
                        strHtmlPedidoFacturarseHabitual += '<td class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">';
                        var typeInput = ' type="text" ';
                        if (isMobile())
                            typeInput = ' type="number" ';
                        strHtmlPedidoFacturarseHabitual += '<input class="form-shop" id="inputPedidoCant' + i + "_" + x + '" ' + typeInput + '  value="' + pValor[i].Items[x].Cantidad + '" ></input>';
                        strHtmlPedidoFacturarseHabitual += '</td>';
                        strHtmlPedidoFacturarseHabitual += '</tr>';
                    }

                    // fin facturarse de forma Habitual 
                } else {
                    if (isProductosTransferPedidos) {
                        //strHtml += '<tr>';
                        //strHtml += '<td align="left"colspan="2">';
                        //strHtml += '<div style="border-bottom: 1px solid #333333;line-height: 27px;width: 100%;"></div>';
                        //strHtml += '</td>';
                        //strHtml += '</tr>';
                    }
                    for (var x = 0; x < pValor[i].Items.length; x++) {
                        if (pValor[i].Items[x].Cantidad > 0) {

                            var strHtmlColorFondo = 'grs';
                            if (cantFacturados % 2 != 0) {
                                strHtmlColorFondo = 'wht';
                            }
                            cantFacturados++;
                            isProductosTransferPedidos = true;
                            strHtml += '<tr class="' + strHtmlColorFondo + '">';
                            strHtml += '<td class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">' + pValor[i].Items[x].NombreObjetoComercial + '</td>';
                            strHtml += '<td class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">' + pValor[i].Items[x].Cantidad + '</td>';
                            strHtml += '</tr>';
                        }
                        if (pValor[i].Items[x].Faltas > 0) {
                            var strHtmlColorFondo = 'grs';
                            if (cantFaltantes % 2 != 0) {
                                strHtmlColorFondo = 'wht';
                            }
                            cantFaltantes++;
                            isProductosTransferPedidosFaltantes = true;
                            strHtmlFaltantes += '<tr class="' + strHtmlColorFondo + '">';
                            strHtmlFaltantes += '<td class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">' + pValor[i].Items[x].NombreObjetoComercial + '</td>';
                            strHtmlFaltantes += '<td class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">' + pValor[i].Items[x].Faltas + '</td>';
                            strHtmlFaltantes += '</tr>';
                        }
                    }
                    MontoTotal += pValor[i].MontoTotal;
                }
            }

        } // fin  if (pValor.length > 0) 
        else {
            strHtmlMensajeFinales = '<div>' + 'Su pedido ha sido enviado con éxito a la sucursal' + ' </div>';
        }
    } else {  // fin if (pValor != null){
        // Se produjo un error
    }

    if (isProductosTransferPedidos) {
        strHtml += '</tbody></table>';
        strHtml += '<div  class="col-xs-12" style="font-size: 12px;background-color: #E5F3E4;"><b>MONTO TOTAL:</b>  <span style="color:#0B890A;"> $ ' + FormatoDecimalConDivisorMiles(MontoTotal.toFixed(2)) + ' </span>  </div>';
        strHtml += '</div>';
    } else {
        strHtml = '';
    }
    if (isProductosTransferPedidosFaltantes) {
        strHtmlFaltantes += '</tbody></table>';
        strHtmlFaltantes += '</div>';
    } else {
        strHtmlFaltantes = '';
    }
    if (isProductosTransferPedidosRevision) {
        strHtmlEnRevision += '</tbody></table>';
        strHtmlEnRevision += '</div>';
    } else {
        strHtmlEnRevision = '';
    }
    if (isProductosPedidoFacturarseHabitual) {
        strHtmlPedidoFacturarseHabitual += '</tbody></table>';
        strHtmlPedidoFacturarseHabitual += '</div>';


        strHtmlPedidoFacturarseHabitual += '<a class="btn_confirmar" onclick="onclickPedidoFacturarseHabitualConfirmar(); return false;" href="#">Confirmar</a>';
        strHtmlPedidoFacturarseHabitual += '<a class="btn_confirmar" onclick="CerrarContenedorTransfer(); return false;"  href="#">Descartar</a>';
        strHtmlPedidoFacturarseHabitual += '<div class="clear">';
        strHtmlPedidoFacturarseHabitual += '</div>';
        //document.getElementById('resultadoPedidoBotonOk').style.display = 'none';
    } else {
        strHtmlPedidoFacturarseHabitual = '';
    }


    var strHtml_modal = '';
    strHtml_modal += '<div class="modal-background">&nbsp;</div>';
    strHtml_modal += '<div class="modal-dialog modal-lg"><div class="modal-content">';
    strHtml_modal += '<div class="modal-header no-padding-bottom">';
    strHtml_modal += '<div class="row">';
    strHtml_modal += '<div class="col-lg-12">';
    if (strHtml != '' && strHtmlPedidoFacturarseHabitual == '' && strHtmlEnRevision == '' && strHtmlFaltantes == '') {
        strHtml_modal += '<div class="modulo_icon ok"></div>';
        strHtml_modal += '<h4>Resultado del pedido</h4>';
    }
    else {
        strHtml_modal += '<div class="modulo_icon alert"></div>';
        strHtml_modal += '<h4>ALGUNOS PRODUCTOS DE TRANSFER NO PUDIERON SER PROCESADOS</h4>';
    }
    strHtml_modal += '</div>';
    strHtml_modal += '</div>';
    strHtml_modal += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml_modal += '</div>';
    strHtml_modal += '<div class="modal-body">';
    strHtml_modal += strHtml + strHtmlFaltantes + strHtmlPedidoFacturarseHabitual + strHtmlEnRevision + strHtmlMensajeFinales;
    strHtml_modal += '<div class="clear"></div>';
    //strHtml_modal += '<a class="btn_confirmar" href="#" onclick="modalModuloHide(); return false;">CONFIRMAR</a>';
    if (!isProductosPedidoFacturarseHabitual) {
        strHtml_modal += '<a class="btn_confirmar" href="#" onclick="modalModuloHide(); return false;">CONFIRMAR</a>';
    }
    strHtml_modal += '<div class="clear"></div>';
    strHtml_modal += '</div>';
    strHtml_modal += '<div class="clear"></div>';
    strHtml_modal += '</div></div>';

    $('#modalModulo').html(strHtml_modal);
    $('#modalModulo').modal();

}

function onclickPedidoFacturarseHabitualConfirmar() {
    if (listaResultadoPedidoTransfer != null) {
        for (var i = 0; i < listaResultadoPedidoTransfer.length; i++) {
            if (listaResultadoPedidoTransfer[i].Login == 'CONFIRMACION') {
                var listaCantidad = [];
                var listaNombreProducto = [];
                for (var x = 0; x < listaResultadoPedidoTransfer[i].Items.length; x++) {
                    var cantPedido = $('#inputPedidoCant' + i + "_" + x).val();
                    if (cantPedido > 0) {
                        // cargar pedido
                        listaCantidad.push(cantPedido);
                        listaNombreProducto.push(listaResultadoPedidoTransfer[i].Items[x].NombreObjetoComercial);
                    }
                }
                if (listaCantidad.length > 0 && listaNombreProducto.length > 0) {
                    TomarPedidoCarritoFacturarseFormaHabitual(codSucursalPedidoTransfer, textFacturaPedidoTransfer, textRemitoPedidoTransfer, idTipoEnvioPedidoTransfer, false, listaNombreProducto, listaCantidad, OnCallBackTomarPedidoCarritoFacturarseFormaHabitual);
                    $('#modalModulo').modal('hide');
                    showCargando();
                }
                break;
            }
        }
    }
}
function OnCallBackTomarPedidoCarritoFacturarseFormaHabitual(args) {
    CerrarContenedorTransfer();
    OnCallBackTomarPedidoCarrito(args);
}