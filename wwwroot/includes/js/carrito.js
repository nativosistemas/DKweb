function AgregarCarritoHtml(pIndexCarrito) {
    var strHTML = '';
    strHTML += '<div id="divContenedorCarrito_' + pIndexCarrito + '" class="div_carrito">';
    strHTML += '<div class="tit">';
    strHTML += getNombreSucursalCarrito(pIndexCarrito);


    var isMostrarHorarioCierre = false;
    var visibleCssHorarioCierreTitulo = ' style="visibility:hidden;" ';
    if (isNotNullEmpty(listaCarritos[pIndexCarrito].proximoHorarioEntrega) && cli_codsuc() != listaCarritos[pIndexCarrito].codSucursal) {
        isMostrarHorarioCierre = true;
        visibleCssHorarioCierreTitulo = '';
    }
    strHTML += '<div class="clear5"></div>';
    strHTML += '<span id="contenedorProximaEntrega_' + pIndexCarrito + '" ' + visibleCssHorarioCierreTitulo + '>';
    strHTML += 'Próximo&nbsp;cierre:&nbsp;';
    strHTML += '<font id="proximaEntrega_' + pIndexCarrito + '">';
    if (isMostrarHorarioCierre) {
        strHTML += listaCarritos[pIndexCarrito].proximoHorarioEntrega;
    }
    strHTML += '</font>';
    strHTML += '</span>';
    strHTML += '</div>'; //'<div class="tit">'


    strHTML += '<div class="div_carrito_head scroll">';
    strHTML += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
    strHTML += '<th class="col-lg-7 col-md-3 col-sm-3 col-xs-10 text-left thProducto' + listaCarritos[pIndexCarrito].codSucursal + '">Producto</th>';
    strHTML += '<th class="col-lg-2 col-md-1 col-sm-1 col-xs-1 text-center thCant' + listaCarritos[pIndexCarrito].codSucursal + '">Cant.</th>';
    strHTML += '<th class="col-lg-3 col-md-1 col-sm-1 col-xs-1 text-center thPrecio' + listaCarritos[pIndexCarrito].codSucursal + '"><div style="display: inline-block;">Precio</div></th>';
    strHTML += '</tr></thead></table>';
    strHTML += '</div>'; //<div class="div_carrito_head scroll">
    //
    strHTML += '<div id="div_carrito_cont_' + pIndexCarrito + '" class="div_carrito_cont">';
    strHTML += '<table class="footable table carrito table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
    strHTML += '<tbody>';
    //
    var nroTotalCarrito = parseFloat(0);
    var cantProductosTotales = 0;
    for (var iProductos = 0; iProductos < listaCarritos[pIndexCarrito].listaProductos.length; iProductos++) {
        cantProductosTotales += listaCarritos[pIndexCarrito].listaProductos[iProductos].cantidad;
        // Precio Calcular por producto
        var nroTotalProducto = CalcularPrecioProductosEnCarrito(listaCarritos[pIndexCarrito].listaProductos[iProductos].PrecioFinal, listaCarritos[pIndexCarrito].listaProductos[iProductos].cantidad, listaCarritos[pIndexCarrito].listaProductos[iProductos].pro_ofeunidades, listaCarritos[pIndexCarrito].listaProductos[iProductos].pro_ofeporcentaje);
        var strHtmlColor = 'grs';
        if (iProductos % 2 != 0) {
            strHtmlColor = 'wht';
        }
        /* falta */
        var htmlColor = '';
        if (listaCarritos[pIndexCarrito].listaProductos[iProductos].stk_stock == 'N') {
            htmlColor = ' color_red ';
        }
        /* fin falta */
        strHTML += '<tr class="' + strHtmlColor + '">';
        strHTML += '<td class="col-lg-7 col-md-3 col-sm-3 text-left ' + htmlColor + ' tdProducto' + listaCarritos[pIndexCarrito].codSucursal + '">' + listaCarritos[pIndexCarrito].listaProductos[iProductos].pro_nombre + '</td>';
        strHTML += '<td class="col-lg-2 col-md-1 col-sm-1 col-xs-1 text-center tdCant' + listaCarritos[pIndexCarrito].codSucursal + '">';
        var typeInput = ' type="text" ';
        if (isMobile()) {
            typeInput = ' type="number" ';
        }
        var typeInput_SoloTransferFacturacionDirecta = '';
        if (isSoloTransferFacturacionDirecta(listaCarritos[pIndexCarrito].listaProductos[iProductos], listaCarritos[pIndexCarrito].codSucursal, listaCarritos[pIndexCarrito].listaProductos[iProductos].cantidad, false)) {
            typeInput_SoloTransferFacturacionDirecta = ' disabled ';
        }
        strHTML += '<input ' + typeInput_SoloTransferFacturacionDirecta + ' class="form-shop w_100" id="inputCarrito' + pIndexCarrito + '_' + iProductos + '" ' + typeInput + '  value="' + listaCarritos[pIndexCarrito].listaProductos[iProductos].cantidad + '" onblur="onblurInputCarrito(this)" onfocus="onfocusInputCarrito(this)" onkeypress="return onKeypressCantProductos(event)" />';
        strHTML += '</td>';
        var strHtmlPrecioProducto = '';
        if (listaCarritos[pIndexCarrito].listaProductos[iProductos].stk_stock == 'N') {
            nroTotalProducto = 0;
        } else {
            strHtmlPrecioProducto = '$&nbsp;' + FormatoDecimalConDivisorMiles(nroTotalProducto.toFixed(2));
        }
        //<td class="col-lg-4 col-md-1 col-sm-1 text-right">
        strHTML += '<td class="col-lg-4 col-md-1 col-sm-1 text-right tdPrecio' + listaCarritos[pIndexCarrito].codSucursal + '"  id="tdPrecio' + pIndexCarrito + '_' + iProductos + '" > ' + strHtmlPrecioProducto + '</td> ';
        strHTML += '</tr>';
        nroTotalCarrito = nroTotalCarrito + nroTotalProducto;
    }
    //
    strHTML += '</tbody></table>';
    //strHTML += '<div id="Scroll_' + pIndexCarrito + '" style="max-height:250px;overflow-y:scroll;overflow-x:hidden;">';
    strHTML += '</div>'; //<div class="div_carrito_cont">
    //
    strHTML += '<div class="col-lg-9 col-md-9 col-sm-9 text-left div_renglones">Renglones ' + listaCarritos[pIndexCarrito].listaProductos.length + '<span  id="tdUnidades' + pIndexCarrito + '" class="pull-right">' + textUnidades + cantProductosTotales + '</span></div>';
    strHTML += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-1 text-center"></div>';
    strHTML += '<div class="col-xs-12 div_total">Total<span id="tdTotal' + pIndexCarrito + '" class="pull-right">' + '$&nbsp;' + FormatoDecimalConDivisorMiles(nroTotalCarrito.toFixed(2)) + '</span></div>';
    strHTML += '<div class="col-xs-12 pad_lr_car">';
    strHTML += '<a class="btn_confirmar" onclick="onclickIsPuedeUsarDll(' + pIndexCarrito + '); return false;" href="#">CONFIRMAR</a>';
    strHTML += '<a class="btn_vaciar float-left" onclick="onclickVaciarCarrito(' + pIndexCarrito + '); return false;" href="#">VACIAR</a>';
    strHTML += '</div>';
    strHTML += '<div class="clear"></div>';
    //
    strHTML += '</div>';// class="div_carrito"
    return strHTML;
}
function obtenerCarritoUnidades(pIndexCarrito) {
    var cantProductosTotales = parseInt(0);
    for (var iProductos = 0; iProductos < listaCarritos[pIndexCarrito].listaProductos.length; iProductos++) {
        if (isNotNullEmpty(listaCarritos[pIndexCarrito].listaProductos[iProductos].cantidad)) {
            cantProductosTotales += parseInt(listaCarritos[pIndexCarrito].listaProductos[iProductos].cantidad);
        }
    }
    return cantProductosTotales;
}
function getNombreSucursalCarrito(pIndexCarrito) {
    var prefijo = 'Sucursal ';
    var nombreSucursal = listaCarritos[pIndexCarrito].codSucursal;
    if (listaSucursales != null) {
        for (var i = 0; i < listaSucursales.length; i++) {
            if (listaSucursales[i].sde_sucursal == listaCarritos[pIndexCarrito].codSucursal) {
                nombreSucursal = listaSucursales[i].suc_nombre;
                break;
            }
        }
    }
    return prefijo + nombreSucursal;
}

function onclickIsPuedeUsarDll(pIndexCarrito) {
    indexCarritoHorarioCierre = pIndexCarrito;
    IsHacerPedidos(listaCarritos[pIndexCarrito].codSucursal, 'OnCallBackIsHacerPedidos');
}
function OnCallBackIsHacerPedidos(args) {
    if (args == 0) {
        onclickConfirmarCarrito(indexCarritoHorarioCierre);
    } else if (args == 2) {
        if (isCarritoDiferido) {
            location.href = '../mvc/Diferido'; //= 'carrodiferido.aspx';
        } else {
            location.href = '../mvc/Buscador'; //= 'PedidosBuscador.aspx';
        }
    } else if (args == 1) {
        mensaje_informacion(mensajeTareasMantenimiento);
    }
}
function onclickConfirmarCarrito(pIndexCarrito) {
    MostrarConfirmarCarrito(pIndexCarrito, false);
    onChangeTipoEnvio();
    $("#hiddenIndexCarrito").val(pIndexCarrito);
    //// Acutalizar horario reparto
    indexCarritoHorarioCierre = pIndexCarrito;
    ObtenerHorarioCierre(listaCarritos[indexCarritoHorarioCierre].codSucursal, 'OnCallBackObtenerHorarioCierre');
    //// fin Acutalizar horario reparto

}
//function CargarHtmlTipoEnvio(pSucursal) {
//    var strHtml = '';
//    strHtml += '<select id="comboTipoEnvio" class="select_gral" onchange="onChangeTipoEnvio()">';
//    strHtml += CargarHtmlOptionTipoEnvio(pSucursal);
//    strHtml += '</select>';
//    $('#tdTipoEnvio').html(strHtml);
//    onChangeTipoEnvio();
//}
// Armar tipo envio
function CargarHtmlOptionTipoEnvio(pSucursal) {
    var strHtml = '';
    if (listaTipoEnviosSucursal != null) {
        var isSeEncontro = false;
        for (var i = 0; i < listaTipoEnviosSucursal.length; i++) {
            if (listaTipoEnviosSucursal[i].sucursal == pSucursal && listaTipoEnviosSucursal[i].tipoEnvio == cli_codtpoenv()) {
                isSeEncontro = true;
                for (var y = 0; y < listaTipoEnviosSucursal[i].lista.length; y++) {
                    strHtml += '<option value="' + listaTipoEnviosSucursal[i].lista[y].env_codigo + '">' + listaTipoEnviosSucursal[i].lista[y].env_nombre + '</option>';
                }
                break;
            }
        }
        if (!isSeEncontro) {
            for (var i = 0; i < listaTipoEnviosSucursal.length; i++) {
                if (listaTipoEnviosSucursal[i].sucursal == pSucursal && listaTipoEnviosSucursal[i].tipoEnvio == null) {
                    for (var y = 0; y < listaTipoEnviosSucursal[i].lista.length; y++) {
                        strHtml += '<option value="' + listaTipoEnviosSucursal[i].lista[y].env_codigo + '">' + listaTipoEnviosSucursal[i].lista[y].env_nombre + '</option>';
                    }
                    break;
                }
            }
        }
    }
    return strHtml;
}
// fin armar tipo envio
function onChangeTipoEnvio() {
    $('#checkboxIsUrgentePedido').removeAttr("checked");
    $('#tdIsUrgente').css('visibility', 'hidden');
}
function OnCallBackObtenerHorarioCierre(args) {
    if (args != null && args != '') {
        if (indexCarritoHorarioCierre != null) {
            listaCarritos[indexCarritoHorarioCierre].proximoHorarioEntrega = args;
            if (cli_codsuc() != listaCarritos[indexCarritoHorarioCierre].codSucursal) {
                $('#proximaEntrega_' + indexCarritoHorarioCierre).html(listaCarritos[indexCarritoHorarioCierre].proximoHorarioEntrega);
                $('#contenedorProximaEntrega_' + indexCarritoHorarioCierre).css('visibility', 'visible');
            }
        }
    }
    indexCarritoHorarioCierre = null;
}
function MostrarConfirmarCarrito(pIndexCarrito, pIsTransfer) {
    var onclick = '';
    var codSucursal = '';
    if (pIsTransfer) {
        onclick = 'onclickConfimarTransferPedidoOk()';
        codSucursal = listaCarritoTransferPorSucursal[pIndexCarrito].Sucursal;
    }
    else {
        onclick = 'onclickHacerPedido()';
        codSucursal = listaCarritos[pIndexCarrito].codSucursal;
    }
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-lg"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<div class="modulo_icon check"></div>';
    strHtml += '<h4>Confirmar</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    //strHtml += '<div class="col-md-6 div_msj">';
    //strHtml += '<textarea class="" id="txtMensajeFactura" name="txtMensajeFactura" placeholder="Mensaje en factura" maxlength="40" onchange="MensajeFacturaRemitoLength(this)" onkeyup="MensajeFacturaRemitoLength(this)" onpaste="MensajeFacturaRemitoLength(this)"></textarea>';
    //strHtml += '</div>';
    strHtml += '<div class="col-md-12 div_msj">';
    strHtml += '<textarea class="" id="txtMensajeRemito" name="txtMensajeRemito" placeholder="Mensaje en Orden de Pedido" maxlength="40" onchange="MensajeFacturaRemitoLength(this)" onkeyup="MensajeFacturaRemitoLength(this)" onpaste="MensajeFacturaRemitoLength(this)"></textarea>';
    strHtml += '</div>';
    strHtml += '<div class="col-md-6">Tipo de envio:&nbsp;';
    strHtml += '<select class="form-shop" name="comboTipoEnvio" id="comboTipoEnvio" onchange="onChangeTipoEnvio()" style="width:200px">';
    strHtml += CargarHtmlOptionTipoEnvio(codSucursal);
    strHtml += '</select>';
    strHtml += '</div>';
    strHtml += '<div id="tdIsUrgente" class="col-md-6">';
    strHtml += '<input id="checkboxIsUrgentePedido" type="checkbox" style="width: 16px; height: 16px;" />';
    strHtml += '&nbsp;Es urgente';
    strHtml += '</div>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<a class="btn_confirmar" onclick="' + onclick + '; return false;" href="#">HACER PEDIDO</a>';
    strHtml += '</div>'; // '<div class="modal-body">'
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>'; //'<div class="modal-dialog modal-lg"><div class="modal-content">'
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
}
function MensajeFacturaRemitoLength(ta) {
    if (ta.value.length > maxLengthMensajeFacturaRemito) {
        ta.value = ta.value.substring(0, maxLengthMensajeFacturaRemito);
    }
}
function onclickHacerPedido() {
    if (isBotonNoEstaEnProceso) {
        var indexCarrito = $("#hiddenIndexCarrito").val();
        ConfirmarCarrito(indexCarrito);
    }
}
function ConfirmarCarrito(pIndexCarrito) {
    isBotonNoEstaEnProceso = false;
    var montoMinimo = '';
    var precio = ObtenerPrecioConFormato($('#tdTotal' + pIndexCarrito).html());
    var isTomarPedido = true;
    textTipoEnvioCarrito = $('#comboTipoEnvio option:selected').text();
    var codTipoEnvioCarrito = $('#comboTipoEnvio option:selected').val();
    var isOkCadeteriaRestricciones = true;
    var msgCategoriaRestricciones = '';
    if (cli_codtpoenv() != 'C') { // C -> cadeteria
        if (codTipoEnvioCarrito == 'C') {
            for (var i = 0; i < listaCadeteriaRestricciones.length; i++) {
                if (listaCadeteriaRestricciones[i].tcr_codigoSucursal == listaCarritos[pIndexCarrito].codSucursal) {
                    if (listaCadeteriaRestricciones[i].tcr_MontoIgnorar <= precio) {
                        isOkCadeteriaRestricciones = true;
                    } else {
                        var unidades = obtenerCarritoUnidades(pIndexCarrito);// parseInt($('#tdUnidades' + pIndexCarrito).html().replace(textUnidades, ''));
                        if (listaCadeteriaRestricciones[i].tcr_UnidadesMinimas > unidades) {
                            isOkCadeteriaRestricciones = false;
                            msgCategoriaRestricciones = 'Para seleccionar Cadetería como Tipo de Envío el pedido debe tener ' + listaCadeteriaRestricciones[i].tcr_UnidadesMinimas + ' unidades mínimas y ' + listaCadeteriaRestricciones[i].tcr_UnidadesMaximas + ' unidades máximas'; //'UnidadesMinimas';
                        } else if (listaCadeteriaRestricciones[i].tcr_UnidadesMaximas < unidades) {
                            isOkCadeteriaRestricciones = false;
                            msgCategoriaRestricciones = 'Para seleccionar Cadetería como Tipo de Envío el pedido debe tener ' + listaCadeteriaRestricciones[i].tcr_UnidadesMinimas + ' unidades mínimas y ' + listaCadeteriaRestricciones[i].tcr_UnidadesMaximas + ' unidades máximas'; //'UnidadesMaximas';
                        } else if (listaCadeteriaRestricciones[i].tcr_MontoMinimo > precio) {
                            isOkCadeteriaRestricciones = false;
                            msgCategoriaRestricciones = 'Para seleccionar Cadetería como Tipo de Envío el pedido debe superar los $ ' + listaCadeteriaRestricciones[i].tcr_MontoMinimo;  //'MontoMinimo';
                        }
                    }
                    break;
                }
            }
        }
    }
    if (isOkCadeteriaRestricciones) {
        if (textTipoEnvioCarrito == 'Mostrador') {
            if (listaSucursales != null) {
                for (var i = 0; i < listaSucursales.length; i++) {
                    if (listaSucursales[i].suc_codigo == listaCarritos[pIndexCarrito].codSucursal) {
                        if (listaSucursales[i].suc_montoMinimo > 0) {
                            if (listaSucursales[i].suc_montoMinimo > precio) {
                                isTomarPedido = false;
                                montoMinimo = listaSucursales[i].suc_montoMinimo;
                            }
                        }
                        break;
                    } // fin  if (listaSucursales[i].suc_codigo == listaCarritos[pIndexCarrito].codSucursal) {
                }
            }
        }
        if (isTomarPedido) {
            var textFactura = '';//$('#txtMensajeFactura').val();
            var textRemito = $('#txtMensajeRemito').val();
            var isUrgente = $('#checkboxIsUrgentePedido').is(":checked");
            var idTipoEnvio = $('#comboTipoEnvio').val();
            if (isCarritoDiferido) {
                TomarPedidoCarritoDiferido(listaCarritos[pIndexCarrito].codSucursal, textFactura, textRemito, idTipoEnvio, isUrgente);
            }
            else {
                TomarPedidoCarrito(listaCarritos[pIndexCarrito].codSucursal, textFactura, textRemito, idTipoEnvio, isUrgente);
            }
            //
            $('#modalModulo').modal('hide');
            showCargando();
            //
        } else {
            //alert('Para hacer el pedido se debe superar el monto mínimo de ' + '$ ' + montoMinimo);
            mensaje_informacion('Para hacer el pedido se debe superar el monto mínimo de ' + '$ ' + montoMinimo);
            isBotonNoEstaEnProceso = true;
        }
    } // fin   if (isOkCadeteriaRestricciones) {
    else {
        //alert(msgCategoriaRestricciones);
        mensaje_informacion(msgCategoriaRestricciones);
        isBotonNoEstaEnProceso = true;
    }
}
function OnFailBotonEnProceso(args) {
    OnFail(args);
    hideCargando();
    isBotonNoEstaEnProceso = true;
}
function OnCallBackTomarPedidoCarrito(args) {
    isBotonNoEstaEnProceso = true;
    /// mostrar faltantes y problema crediticio
    if (!isNotNullEmpty(args)) {
        args = null;
    } else {
        args = eval('(' + args + ')');
    }
    if (args == null) {
        mensaje_alert_base(mensajeCuandoSeMuestraError, 'volverBuscador()');
    } else {

        if (args.tipo == "mostrarMsg") {
            mensaje_alert_base(args.msg, 'volverBuscador()');
        } else if (args.tipo == "seProceso_dll") {//
            // Error dsd dll pedido
            OnCallBackTomarPedidoCarrito_dll(args.result_dll);
        }
        else {// SAP   
            OnCallBackTomarPedidoCarrito_sap(args);
        }




    }
}
function OnCallBackTomarPedidoCarrito_sap(args) {

    if (args.tipo == "seProceso" && args.result_sap != null) {
        var l_result = args.result_sap;
        var html = '';
        html += '<table  class="table table-striped">';
        html += '<thead class="justify-content-between">';
        html += '<tr>';
        html += '<th class="text-center">MATERIAL</th>';
        //  html += '<th>PEDIDO_SAP</th>';
        //html += '<th>ID_CARRITO</th>';
        html += '<th class="text-center">CANTIDAD PEDIDA</th>';
        html += '<th class="text-center">CANTIDAD ACEPTADA</th>';
        html += '<th class="text-center">MOTIVO RECHAZO</th>';

        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        l_result.forEach(item => {
            //       <td>${item.ID_CARRITO}</td>
            //  <td>${item.PEDIDO_SAP}</td>
            html += `<tr>
           
            <td>${item.MATERIAL}</td>        
            <td>${item.CANTIDAD_PEDIDA}</td>
            <td>${item.CANTIDAD_ACEPTADA}</td>
            <td>${item.MOTIVO_RECHAZO}</td>
           </tr>
        `;
        });
        html += '</tbody>';
        html += '</table >';
        mensaje_alert_base(html, 'volverBuscador()');
        isHacerBorradoCarritos = true;
        HacerLimpiezaDeCarritosDspDeConfirmarPedido();
    } else {
        mensaje_alert_base(args.msg, 'volverBuscador()');
    }




    /*if (args.tipo == "seProceso_mostrarMsg") {
        mensaje_alert_base(args.msg, 'volverBuscador()');
    }*/


}
function OnCallBackTomarPedidoCarrito_dll(args) {
    // Error dsd dll pedido
    if (args.Error != '' || args.web_Error != '') {
        var msgError = '';
        if (args.Error != '') {
            msgError = args.Error;
        } else if (args.web_Error != '') {
            msgError = args.web_Error;
        }
        mensaje_alert_base(msgError, 'volverBuscador()');
        // Fin Error dsd dll pedido
    } else {
        isHacerBorradoCarritos = true;
        CargarRespuestaDePedido(args);
    }

}
function getHtml_ProductosFacturados(pValor) {
    var listaFaltantes = pValor.Items;
    var isProductosPedidos = false;
    var strHtml = '';
    var cant = 0;
    strHtml += '<div class="col-xs-12">';
    strHtml += '<div class="titleConfirmar">PRODUCTOS FACTURADOS</div>';
    strHtml += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
    strHtml += '<th class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">Producto</th>';
    strHtml += '<th class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">Cantidad</th>';
    strHtml += '</tr></thead></table>';
    strHtml += '<table class="footable table popup table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
    strHtml += '<tbody>';
    if (listaFaltantes != null) {
        for (var iFaltantes = 0; iFaltantes < listaFaltantes.length; iFaltantes++) {
            if (listaFaltantes[iFaltantes].Cantidad > 0) {
                isProductosPedidos = true;
                var strHtmlColorFondo = 'grs';
                if (cant % 2 != 0) {
                    strHtmlColorFondo = 'wht';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">' + listaFaltantes[iFaltantes].NombreObjetoComercial + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">' + listaFaltantes[iFaltantes].Cantidad + '</td>';
                strHtml += '</tr>';
                cant++;
            }
        }
    }
    strHtml += '</tbody></table>';
    strHtml += '<div style="font-size: 12px;text-align:left;margin-top:2px;background-color: #E5F3E4;"><b>MONTO TOTAL:</b> <span style="color:#0B890A;"> $ ' + FormatoDecimalConDivisorMiles(pValor.MontoTotal.toFixed(2)) + '</span> </div>';
    strHtml += '<div style="font-size: 12px;text-align:left; ">TIPO DE ENVIO: ' + textTipoEnvioCarrito + ' </div>';
    strHtml += '</div>';
    if (!isProductosPedidos)
        return '';
    return strHtml;
}
function getHtml_ProductosEnFalta(pValor) {
    var listaFaltantes = pValor.Items;
    var isFaltantes = false;
    var strHtml = '';
    var cant = 0;
    strHtml += '<div class="col-xs-12">';
    strHtml += '<div class="titleConfirmar">PRODUCTOS EN FALTA</div>';
    strHtml += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
    strHtml += '<th class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">Producto</th>';
    strHtml += '<th class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">Cantidad</th>';
    strHtml += '</tr></thead></table>';
    strHtml += '<table class="footable table popup table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
    strHtml += '<tbody>';
    if (listaFaltantes != null) {
        for (var iFaltantes = 0; iFaltantes < listaFaltantes.length; iFaltantes++) {
            if (listaFaltantes[iFaltantes].Faltas > 0) {
                isFaltantes = true;
                var strHtmlColorFondo = 'grs';
                if (cant % 2 != 0) {
                    strHtmlColorFondo = 'wht';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">' + listaFaltantes[iFaltantes].NombreObjetoComercial + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">' + listaFaltantes[iFaltantes].Faltas + '</td>';
                strHtml += '</tr>';
                cant++;
            }
        }
    }
    strHtml += '</tbody></table>';
    strHtml += '</div>';
    if (!isFaltantes)
        return '';
    return strHtml;
}
function getHtml_ProductosConProblemasDeCredito(pValor) {
    var listaProblemaCrediticio = pValor.ItemsConProblemasDeCreditos;
    var isFaltantes = false;
    var strHtml = '';
    var cant = 0;
    strHtml += '<div class="col-xs-12">';
    strHtml += '<div class="titleConfirmar">PRODUCTOS CON PROBLEMAS DE CREDITO</div>';
    strHtml += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
    strHtml += '<th class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">Producto</th>';
    strHtml += '<th class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">Cantidad</th>';
    strHtml += '</tr></thead></table>';
    strHtml += '<table class="footable table popup table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
    strHtml += '<tbody>';
    if (listaProblemaCrediticio != null) {
        for (var iProblemaCrediticio = 0; iProblemaCrediticio < listaProblemaCrediticio.length; iProblemaCrediticio++) {
            var cantidadProblemasCrediticios = listaProblemaCrediticio[iProblemaCrediticio].Cantidad + listaProblemaCrediticio[iProblemaCrediticio].Faltas;
            if (cantidadProblemasCrediticios > 0) {
                isFaltantes = true;
                var strHtmlColorFondo = 'grs';
                if (cant % 2 != 0) {
                    strHtmlColorFondo = 'wht';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-10 col-md-10 col-sm-10 col-xs-9 text-left">' + listaProblemaCrediticio[iProblemaCrediticio].NombreObjetoComercial + '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-10 col-xs-3 text-center">' + cantidadProblemasCrediticios + '</td>';
                strHtml += '</tr>';
                cant++;
            }
        }
    }
    strHtml += '</tbody></table>';
    // Mensaje de problema crediticio
    strHtml += '<div style="font-size: 14px;font-align:left;  width: 100%;">';
    strHtml += 'Le recordamos que estos productos se encuentran en el RECUPERADOR DE CREDITO para ser reprocesados.';
    strHtml += '</div>';
    // Fin Mensaje de problema crediticio
    strHtml += '</div>';
    if (!isFaltantes)
        return '';
    return strHtml;
}
function CargarRespuestaDePedido(pValor) {
    var strHtmlProductosPedidos = getHtml_ProductosFacturados(pValor);
    var strHtmlFaltantes = getHtml_ProductosEnFalta(pValor);
    var strHtmlProblemasCrediticios = getHtml_ProductosConProblemasDeCredito(pValor);
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-lg"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    if (strHtmlProblemasCrediticios == '' && strHtmlFaltantes == '') {
        strHtml += '<div class="modulo_icon ok"></div>';
    } else {
        strHtml += '<div class="modulo_icon alert"></div>';
    }
    strHtml += '<h4>Resultado del pedido</h4>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    //
    if (strHtmlProductosPedidos != '') {

        strHtml += strHtmlProductosPedidos;
    }
    if (strHtmlProblemasCrediticios == '' && strHtmlFaltantes == '') {
        strHtml += '<div class="col-xs-12"><div class="alert alert-success">';
        strHtml += 'El pedido se realizo correctamente';
        strHtml += '</div></div>';
    }
    if (strHtmlFaltantes != '') {

        strHtml += strHtmlFaltantes;
    }
    if (strHtmlProblemasCrediticios != '') {

        strHtml += strHtmlProblemasCrediticios;
    }
    //
    strHtml += '<div class="clear"></div>';
    strHtml += '<a class="btn_confirmar" href="#" onclick="onclickBtnConfirmarResultadoPedido(); return false;">CONFIRMAR</a>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
    isHacerBorradoCarritos = true;
    $('#divCargandoContenedorGeneralFondo').css('display', 'none');
}
function onclickBtnConfirmarResultadoPedido() {
    //HacerLimpiezaDeCarritosDspDeConfirmarPedido();
    $('#modalModulo').modal('hide');
}
function HacerLimpiezaDeCarritosDspDeConfirmarPedido() {
    if (isHacerBorradoCarritos) {
        if (indexSucursalTransferSeleccionado == null) {
            var indexCarrito = $("#hiddenIndexCarrito").val();
            if (isNotNullEmpty(indexCarrito)) {
                $('#divContenedorCarrito_' + indexCarrito).remove();
                var sucur = listaCarritos[indexCarrito].codSucursal;
                listaCarritos[indexCarrito].codSucursal = '';
                LimpiarTextBoxProductosBuscados(sucur);
                $("#hiddenIndexCarrito").val('');
                carritoNoHayCarritosCelular();
            }
        } else {
            var sucur = listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].Sucursal;
            listaCarritoTransferPorSucursal[indexSucursalTransferSeleccionado].Sucursal = '';
            LimpiarTextBoxProductosBuscados(sucur);
            $('#divContenedorBaseTransfer_' + sucur).html('');
            indexSucursalTransferSeleccionado = null;
            carritoNoHayCarritosCelular();
        }
        isHacerBorradoCarritos = false;
    }
}
function onclickVaciarCarrito_ButtonOK(pIndexCarrito) {
    $('#hiddenIndexCarrito').val(pIndexCarrito);

    if (isCarritoDiferido) {
        BorrarCarritosDiferidos(listaCarritos[pIndexCarrito].lrc_id, listaCarritos[pIndexCarrito].codSucursal);
    } else {
        BorrarCarrito(listaCarritos[pIndexCarrito].lrc_id, listaCarritos[pIndexCarrito].codSucursal);
    }
    return false;
}
function onclickVaciarCarrito(pIndexCarrito) {
    var clickButton = 'return onclickVaciarCarrito_ButtonOK(' + pIndexCarrito + ');';
    mensaje_vaciarCarrito(clickButton);
}
function OnCallBackBorrarCarrito(args) {
    if (args) {
        var indexCarrito = $("#hiddenIndexCarrito").val();
        $('#divContenedorCarrito_' + indexCarrito).remove();
        var sucur = listaCarritos[indexCarrito].codSucursal;
        listaCarritos[indexCarrito].codSucursal = '';
        modalModuloAlertHide();
        LimpiarTextBoxProductosBuscados(sucur);
        carritoNoHayCarritosCelular();

    }
}

function CalcularPrecioProductosEnCarrito(pPrecioFinal, pCantidad, pOfertaPorUnidad, pOfertaPorcentaje) {
    var resultado = 0.0;
    if (cli_tomaOfertas()) {
        if (pOfertaPorUnidad == 0 || pOfertaPorcentaje == 0) {
            resultado = parseFloat(pCantidad) * pPrecioFinal;
        } else {
            if (pOfertaPorUnidad > pCantidad) {
                resultado = parseFloat(pCantidad) * pPrecioFinal;
            } else {
                resultado = parseFloat(pCantidad) * (pPrecioFinal * (1 - (parseFloat(pOfertaPorcentaje) / parseFloat(100))));
            }
        }
    } else {
        // Cliente si permiso para tomar oferta
        resultado = parseFloat(pCantidad) * pPrecioFinal;
    }
    return resultado;
}

function setScrollFinDeCarrito(pIndexCarrito) {
    //setTimeout(function () { $('#Scroll_' + pIndexCarrito).scrollTop($('#Scroll_' + pIndexCarrito).prop('scrollHeight')); }, 40);
    setTimeout(function () { $('#div_carrito_cont_' + pIndexCarrito).scrollTop($('#div_carrito_cont_' + pIndexCarrito).prop('scrollHeight')); }, 40);
    setTimeout(function () { ReAjustarColumnasCarritos(listaCarritos[pIndexCarrito].codSucursal, false); }, 40);
}
function onfocusInputCarrito(pValor) {
    DesmarcarFilaSeleccionada();
    selectedInput = null;
    selectedInputTransfer = null;
    selectInputCarrito = pValor;
    setTimeout(function () { selectInputCarrito.select(); }, 20);
}
function onblurInputCarrito(pValor) {
    if (isMoverCursor) {
        var nombre = pValor.id;
        nombre = nombre.replace('inputCarrito', '');
        var palabrasBase = nombre.split("_");
        var fila = parseInt(palabrasBase[1]);
        var columna = parseInt(palabrasBase[0]);

        if (pValor.value != '') {

            var cantidadProducto = parseInt(pValor.value);
            var cantidadAnterior_temp = listaCarritos[columna].listaProductos[fila].cantidad;
            if (cantidadProducto != cantidadAnterior_temp) {
                var isNotMaximaCantidadSuperada = true;
                if (listaCarritos[columna].listaProductos[fila].pro_canmaxima != null) {
                    if (listaCarritos[columna].listaProductos[fila].pro_canmaxima < cantidadProducto) {
                        isNotMaximaCantidadSuperada = false;
                    }
                }
                if (isNotMaximaCantidadSuperada) {

                    ExcedeImporteFilaCarrito = fila;
                    ExcedeImporteColumnaCarrito = columna;
                    ExcedeImporteValorCarrito = cantidadProducto;
                    var isCantidadMaximaParametrizada = false;
                    //Inicio Cantidad producto parametrizada
                    if (listaCarritos[columna].listaProductos[fila].cantidad != cantidadProducto) {
                        if (cantidadMaximaParametrizada != null) {
                            if (parseInt(cantidadMaximaParametrizada) > 0) {
                                if (parseInt(cantidadMaximaParametrizada) < cantidadProducto) {
                                    isCantidadMaximaParametrizada = true;
                                    funMostrarMensajeCantidadSuperadaCarrito();
                                }
                            }
                        }
                    }
                    //Fin Cantidad producto parametrizada
                    if (!isCantidadMaximaParametrizada) {
                        cantidadAnterior_carrito = listaCarritos[columna].listaProductos[fila].cantidad;
                        var cantidadFinalCarrito = CargarProductoCantidadDependiendoTransferCarrito(fila, columna, cantidadProducto);
                        if (cantidadFinalCarrito != cantidadProducto) {
                            pValor.value = cantidadFinalCarrito;
                        }
                    }
                } else {
                    //alert(MostrarTextoSuperaCantidadMaxima(listaCarritos[columna].listaProductos[fila].pro_nombre, listaCarritos[columna].listaProductos[fila].pro_canmaxima));
                    mensaje_informacion(MostrarTextoSuperaCantidadMaxima(listaCarritos[columna].listaProductos[fila].pro_nombre, listaCarritos[columna].listaProductos[fila].pro_canmaxima));
                    var cantidadAnterior = listaCarritos[columna].listaProductos[fila].cantidad;
                    if (cantidadAnterior != '') {
                        pValor.value = cantidadAnterior;
                    }

                }
            }
            ///
        } else {
            // Borrar en el carrito o colocarlo en 0     
            var cantidad = ObtenerCantidadProducto(listaCarritos[columna].codSucursal, listaCarritos[columna].listaProductos[fila].codProducto);
            if (cantidad != '') {
                CargarOActualizarListaCarrito(listaCarritos[columna].codSucursal, listaCarritos[columna].listaProductos[fila].codProducto, 0, true);
                CargarHtmlCantidadDeCarritoABuscador(listaCarritos[columna].codSucursal, listaCarritos[columna].listaProductos[fila].codProducto, 0);
                //AgregarAlHistorialProductoCarrito(fila, columna, 0, true);
                //isModificoBD = true;
            }
        }
    }
}
function funMostrarMensajeCantidadSuperadaCarrito() {
    isMoverCursor = false;
    var htmlMensaje = '';
    htmlMensaje += '<a onclick="funExcedeImporteAceptarCarrito(); return false;" class="btn_confirmar" href="#">Aceptar</a>';
    htmlMensaje += '<a onclick="funExcedeImporteCancelarCarrito(); return false;" class="btn_vaciar" href="#">Cancelar</a>';

    mensaje(mensajeCantidadSuperaElMaximoParametrizado1 + cantidadMaximaParametrizada + mensajeCantidadSuperaElMaximoParametrizado2, htmlMensaje);
    //$('#divMensajeExcedeImporteCarrito').html(mensajeCantidadSuperaElMaximoParametrizado1 + cantidadMaximaParametrizada + mensajeCantidadSuperaElMaximoParametrizado2);
    //var arraySizeDocumento = SizeDocumento();
    //document.getElementById('divContenedorExcedeImporte').style.height = arraySizeDocumento[1] + 'px';
    //document.getElementById('divContenedorExcedeImporte').style.display = 'block';
    //document.getElementById('divConfirmarExcedeImporteContenedorGeneralCarrito').style.display = 'block';
}
function funExcedeImporteCancelarCarrito() {
    if (ExcedeImporteColumnaCarrito != null && ExcedeImporteFilaCarrito != null && ExcedeImporteValorCarrito != null) {
        //document.getElementById('divContenedorExcedeImporte').style.display = 'none';
        //document.getElementById('divConfirmarExcedeImporteContenedorGeneralCarrito').style.display = 'none';
        $('#modalModulo').modal('hide');
        var objCarrito = $("#inputCarrito" + ExcedeImporteIndiceCarrito + "_" + ExcedeImporteIndiceCarritoProducto);
        if (objCarrito.length > 0) {
        } else {
            objCarrito = null;
        }
        if (objCarrito != null) {
            objCarrito.select();
        }
        isMoverCursor = true;
        ExcedeImporteColumnaCarrito = null;
        ExcedeImporteFilaCarrito = null;
        ExcedeImporteValorCarrito = null;
    }
}
function funExcedeImporteAceptarCarrito() {
    if (ExcedeImporteColumnaCarrito != null && ExcedeImporteFilaCarrito != null && ExcedeImporteValorCarrito != null) {
        var cantidadFinalCarrito = CargarProductoCantidadDependiendoTransferCarrito(ExcedeImporteFilaCarrito, ExcedeImporteColumnaCarrito, ExcedeImporteValorCarrito);
        if (cantidadFinalCarrito != ExcedeImporteValorCarrito) {
            var objCarrito = $("#inputCarrito" + ExcedeImporteIndiceCarrito + "_" + ExcedeImporteIndiceCarritoProducto);
            if (objCarrito.length > 0) {
            } else {
                objCarrito = null;
            }
            if (objCarrito != null) {
                objCarrito.val(cantidadFinalCarrito);
            }
        }
        $('#modalModulo').modal('hide');

        setTimeout('ActualizarFocusCarritoExcedeImporte()', 5);
        isMoverCursor = true;
        ExcedeImporteColumnaCarrito = null;
        ExcedeImporteFilaCarrito = null;
        ExcedeImporteValorCarrito = null;
    }

}
function ActualizarFocusCarritoExcedeImporte() {
    var objCarrito = $("#inputCarrito" + ExcedeImporteSiguienteIndiceCarrito + "_" + ExcedeImporteSiguienteIndiceCarritoProducto);
    if (objCarrito.length > 0) {
    } else {
        objCarrito = null;
    }
    if (objCarrito != null) {
        objCarrito.select();
    }
}
function CargarHtmlCantidadDeCarritoABuscador(pIdSucursal, pIdProduco, pCantidad) {
    if (!(typeof listaProductosBuscados == 'undefined') && isNotNullEmpty(listaProductosBuscados)) {
        for (var i = 0; i < listaProductosBuscados.length; i++) {
            if (listaProductosBuscados[i].pro_codigo == pIdProduco) {
                for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
                    if (listaSucursal[iEncabezadoSucursal] == pIdSucursal) {
                        var mytext = $("#inputSuc" + i + "_" + iEncabezadoSucursal);
                        if (mytext.length <= 0) {
                            mytext = null;
                        }
                        if (mytext != null) {
                            mytext.val(pCantidad);
                        }
                        break;
                    }

                }
                break;
            }
        }
    }
}
function CargarProductoCantidadDependiendoTransferCarrito(pFila, pColumna, pCantidad) {
    var resultadoReturn = pCantidad;
    var isPasarDirectamente = false;
    var cantTransferViejo = ObtenerCantidadProductoTransfer(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].pro_nombre);
    var cantidadMasCantTransferViejo = cantTransferViejo + pCantidad;
    var cantidadCarritoTransfer = 0;
    var cantidadCarritoComun = 0;

    if (listaCarritos[pColumna].listaProductos[pFila].isProductoFacturacionDirecta) { // facturacion directa
        // Combiene transfer o promocion                      
        var precioConDescuentoDependiendoCantidad = CalcularPrecioProductosEnCarrito(listaCarritos[pColumna].listaProductos[pFila].PrecioFinal, pCantidad, listaCarritos[pColumna].listaProductos[pFila].pro_ofeunidades, listaCarritos[pColumna].listaProductos[pFila].pro_ofeporcentaje);
        if (pCantidad == 0) {
            //
        } else {
            precioConDescuentoDependiendoCantidad = precioConDescuentoDependiendoCantidad / pCantidad;
        }
        if (parseFloat(precioConDescuentoDependiendoCantidad) > parseFloat(listaCarritos[pColumna].listaProductos[pFila].PrecioFinalTransfer)) {
            var isSumarTransfer = false;

            if (listaCarritos[pColumna].listaProductos[pFila].tde_muluni != null && listaCarritos[pColumna].listaProductos[pFila].tde_unidadesbonificadas != null) {
                if ((cantidadMasCantTransferViejo >= listaCarritos[pColumna].listaProductos[pFila].tde_muluni) && (cantidadMasCantTransferViejo <= (listaCarritos[pColumna].listaProductos[pFila].tde_muluni + listaCarritos[pColumna].listaProductos[pFila].tde_unidadesbonificadas))) {
                    // es multiplo
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = listaCarritos[pColumna].listaProductos[pFila].tde_muluni + listaCarritos[pColumna].listaProductos[pFila].tde_unidadesbonificadas;
                } else if (cantidadMasCantTransferViejo > (listaCarritos[pColumna].listaProductos[pFila].tde_muluni + listaCarritos[pColumna].listaProductos[pFila].tde_unidadesbonificadas)) {
                    isSumarTransfer = true;
                    var cantidadMultiplicar = parseInt(cantidadMasCantTransferViejo / listaCarritos[pColumna].listaProductos[pFila].tde_muluni);
                    cantidadCarritoTransfer = cantidadMultiplicar * (listaCarritos[pColumna].listaProductos[pFila].tde_muluni + listaCarritos[pColumna].listaProductos[pFila].tde_unidadesbonificadas);
                    //
                    for (var iCantMulti = 0; iCantMulti < cantidadMultiplicar; iCantMulti++) {
                        var cantTemp = iCantMulti * (listaCarritos[pColumna].listaProductos[pFila].tde_muluni + listaCarritos[pColumna].listaProductos[pFila].tde_unidadesbonificadas);
                        if (cantTemp >= cantidadMasCantTransferViejo) {
                            cantidadCarritoTransfer = cantTemp;
                            break;
                        }
                    }
                    //
                    if (cantidadCarritoTransfer == cantidadMasCantTransferViejo) {

                    } else {
                        if (cantidadMasCantTransferViejo < cantidadCarritoTransfer) {
                            cantidadCarritoComun = 0;
                        } else {
                            cantidadCarritoComun = cantidadMasCantTransferViejo - cantidadCarritoTransfer;
                        }
                        //resultadoReturn = cantidadCarritoComun;
                        if ((cantidadCarritoComun >= listaCarritos[pColumna].listaProductos[pFila].tde_muluni) && (cantidadCarritoComun <= (listaCarritos[pColumna].listaProductos[pFila].tde_muluni + listaCarritos[pColumna].listaProductos[pFila].tde_unidadesbonificadas))) {
                            cantidadCarritoTransfer += listaCarritos[pColumna].listaProductos[pFila].tde_muluni + listaCarritos[pColumna].listaProductos[pFila].tde_unidadesbonificadas;
                            cantidadCarritoComun = 0;
                        }
                    }
                }
                if (isSumarTransfer) {
                    // sumar a transfer
                    if (cantTransferViejo != cantidadCarritoTransfer) {
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = listaCarritos[pColumna].listaProductos[pFila].tde_codpro; // Para la funcion en el servidor
                        objProducto.codProducto = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.tde_codpro = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.cantidad = cantidadCarritoTransfer; //  cantidadCarritoTransfer + cantidadTransfer;
                        tempListaProductos.push(objProducto);
                        AgregarProductosTransfersAlCarrito(tempListaProductos, listaCarritos[pColumna].listaProductos[pFila].tde_codtfr, listaCarritos[pColumna].codSucursal, 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                    }
                    if (cantidadCarritoComun == 0) {
                        var cantidad = ObtenerCantidadProducto(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto);
                        if (cantidad != '') {
                            CargarOActualizarListaCarrito(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, 0, false);
                        }
                    } else {
                        CargarOActualizarListaCarrito(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, cantidadCarritoComun, false);
                    }
                    CargarHtmlCantidadDeCarritoABuscador(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, parseInt(cantidadCarritoComun) + parseInt(cantidadCarritoTransfer));
                } else {
                    isPasarDirectamente = true;
                }
                /// fin NUEVO facturacion directa
            }
            else if (listaCarritos[pColumna].listaProductos[pFila].tde_fijuni != null) {

                // UNIDAD FIJA
                if (cantidadMasCantTransferViejo == listaCarritos[pColumna].listaProductos[pFila].tde_fijuni) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = listaCarritos[pColumna].listaProductos[pFila].tde_fijuni;
                } else if (cantidadMasCantTransferViejo > listaCarritos[pColumna].listaProductos[pFila].tde_fijuni) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = listaCarritos[pColumna].listaProductos[pFila].tde_fijuni;
                    cantidadCarritoComun = cantidadMasCantTransferViejo - listaCarritos[pColumna].listaProductos[pFila].tde_fijuni;
                }
                if (isSumarTransfer) {
                    // sumar a transfer
                    var tempListaProductos = [];
                    var objProducto = new jcTransfersProductos();
                    objProducto.codProductoNombre = listaCarritos[pColumna].listaProductos[pFila].tde_codpro; // Para la funcion en el servidor
                    objProducto.codProducto = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                    objProducto.tde_codpro = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                    objProducto.cantidad = cantidadCarritoTransfer;
                    tempListaProductos.push(objProducto);
                    AgregarProductosTransfersAlCarrito(tempListaProductos, listaCarritos[pColumna].listaProductos[pFila].tde_codtfr, listaCarritos[pColumna].codSucursal, 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                    if (cantidadCarritoComun == 0) {
                        var cantidad = ObtenerCantidadProducto(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto);
                        if (cantidad != '') {
                            CargarOActualizarListaCarrito(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, 0, false);
                        }
                    } else {
                        CargarOActualizarListaCarrito(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, cantidadCarritoComun, false);
                    }
                    CargarHtmlCantidadDeCarritoABuscador(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, parseInt(cantidadCarritoComun) + parseInt(cantidadCarritoTransfer));
                } else {
                    if (cantTransferViejo != 0) {
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.codProducto = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.tde_codpro = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.cantidad = 0;
                        tempListaProductos.push(objProducto);
                        AgregarProductosTransfersAlCarrito(tempListaProductos, listaCarritos[pColumna].listaProductos[pFila].tde_codtfr, listaCarritos[pColumna].codSucursal, 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                        $('#divContenedorBaseTransfer_' + listaSucursal[pColumna]).html('');
                    }
                    isPasarDirectamente = true;
                }
                // FIN UNIDAD FIJA

            }
            else if (listaCarritos[pColumna].listaProductos[pFila].tde_minuni != null && listaCarritos[pColumna].listaProductos[pFila].tde_maxuni != null) {
                // UNIDAD MAXIMA Y MINIMA
                if (listaCarritos[pColumna].listaProductos[pFila].tde_minuni <= cantidadMasCantTransferViejo && listaCarritos[pColumna].listaProductos[pFila].tde_maxuni >= cantidadMasCantTransferViejo) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = cantidadMasCantTransferViejo;
                } else if (listaCarritos[pColumna].listaProductos[pFila].tde_maxuni < cantidadMasCantTransferViejo) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = listaCarritos[pColumna].listaProductos[pFila].tde_maxuni;
                    cantidadCarritoComun = cantidadMasCantTransferViejo - listaCarritos[pColumna].listaProductos[pFila].tde_maxuni;
                }
                if (isSumarTransfer) {
                    // sumar a transfer
                    var tempListaProductos = [];
                    var objProducto = new jcTransfersProductos();
                    objProducto.codProductoNombre = listaCarritos[pColumna].listaProductos[pFila].tde_codpro; // Para la funcion en el servidor
                    objProducto.codProducto = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                    objProducto.tde_codpro = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                    objProducto.cantidad = cantidadCarritoTransfer;
                    tempListaProductos.push(objProducto);
                    AgregarProductosTransfersAlCarrito(tempListaProductos, listaCarritos[pColumna].listaProductos[pFila].tde_codtfr, listaCarritos[pColumna].codSucursal, 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                    if (cantidadCarritoComun == 0) {
                        var cantidad = ObtenerCantidadProducto(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto);
                        if (cantidad != '') {
                            CargarOActualizarListaCarrito(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, 0, false);
                        }
                    } else {
                        CargarOActualizarListaCarrito(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, cantidadCarritoComun, false);
                    }
                    CargarHtmlCantidadDeCarritoABuscador(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, parseInt(cantidadCarritoComun) + parseInt(cantidadCarritoTransfer));
                } else {
                    if (cantTransferViejo != 0) {
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.codProducto = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.tde_codpro = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.cantidad = 0;
                        tempListaProductos.push(objProducto);
                        AgregarProductosTransfersAlCarrito(tempListaProductos, listaCarritos[pColumna].listaProductos[pFila].tde_codtfr, listaCarritos[pColumna].codSucursal, 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                        $('#divContenedorBaseTransfer_' + listaSucursal[pColumna]).html('');
                    }
                    isPasarDirectamente = true;
                }
                // FIN UNIDAD MAXIMA Y MINIMA

            }
            else if (listaCarritos[pColumna].listaProductos[pFila].tde_minuni != null) {

                // UNIDAD MINIMA
                if (listaCarritos[pColumna].listaProductos[pFila].tde_minuni <= cantidadMasCantTransferViejo) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = cantidadMasCantTransferViejo;
                }
                if (isSumarTransfer) {
                    // sumar a transfer
                    var tempListaProductos = [];
                    var objProducto = new jcTransfersProductos();
                    objProducto.codProductoNombre = listaCarritos[pColumna].listaProductos[pFila].tde_codpro; // Para la funcion en el servidor
                    objProducto.codProducto = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                    objProducto.tde_codpro = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                    objProducto.cantidad = cantidadCarritoTransfer;
                    tempListaProductos.push(objProducto);
                    AgregarProductosTransfersAlCarrito(tempListaProductos, listaCarritos[pColumna].listaProductos[pFila].tde_codtfr, listaCarritos[pColumna].codSucursal, 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                    if (cantidadCarritoComun == 0) {
                        var cantidad = ObtenerCantidadProducto(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto);
                        if (cantidad != '') {
                            CargarOActualizarListaCarrito(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, 0, false);
                        }
                    } else {
                        CargarOActualizarListaCarrito(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, cantidadCarritoComun, false);
                    }
                    CargarHtmlCantidadDeCarritoABuscador(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, parseInt(cantidadCarritoComun) + parseInt(cantidadCarritoTransfer));
                } else {
                    if (cantTransferViejo != 0) {
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.codProducto = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.tde_codpro = listaCarritos[pColumna].listaProductos[pFila].tde_codpro;
                        objProducto.cantidad = 0;
                        tempListaProductos.push(objProducto);
                        AgregarProductosTransfersAlCarrito(tempListaProductos, listaCarritos[pColumna].listaProductos[pFila].tde_codtfr, listaCarritos[pColumna].codSucursal, 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                        $('#divContenedorBaseTransfer_' + listaSucursal[pColumna]).html('');
                    }
                    isPasarDirectamente = true;
                }
                // FIN UNIDAD MINIMA
            }

        } // fin if (listaProductosBuscados[pFila].PrecioConDescuentoOferta > listaProductosBuscados[pFila].PrecioFinalTransfer){
        else {
            isPasarDirectamente = true;
        }
    } else {
        isPasarDirectamente = true;
    }
    if (isPasarDirectamente) {
        CargarOActualizarListaCarrito(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, pCantidad, false);
        CargarHtmlCantidadDeCarritoABuscador(listaCarritos[pColumna].codSucursal, listaCarritos[pColumna].listaProductos[pFila].codProducto, parseInt(pCantidad) + parseInt(cantTransferViejo));
    }
    else {
        resultadoReturn = parseInt(cantidadCarritoComun);
    }
    return resultadoReturn;
}
//////////
function ReAjustarColumnasCarritos(pSucursal, pIsTransfer) {
    var nameTransfer = '';
    if (pIsTransfer)
        nameTransfer = 'Transf';

    var wProducto = $('.thProducto' + nameTransfer + pSucursal).css('width');
    var wCant = $('.thCant' + nameTransfer + pSucursal).css('width');
    var wPrecio = $('.thPrecio' + nameTransfer + pSucursal).css('width');

    $('.tdProducto' + nameTransfer + pSucursal).css('max-width', wProducto);
    $('.tdCant' + nameTransfer + pSucursal).css('max-width', wCant);
    $('.tdPrecio' + nameTransfer + pSucursal).css('max-width', wPrecio);

    $('.tdProducto' + nameTransfer + pSucursal).css('min-width', wProducto);
    $('.tdCant' + nameTransfer + pSucursal).css('min-width', wCant);
    $('.tdPrecio' + nameTransfer + pSucursal).css('min-width', wPrecio);

    $('.tdProducto' + nameTransfer + pSucursal).css('overflow-x', 'auto');
    $('.tdCant' + nameTransfer + pSucursal).css('overflow-x', 'auto');
    $('.tdPrecio' + nameTransfer + pSucursal).css('overflow-xh', 'auto');
}