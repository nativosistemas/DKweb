var historialPrimerRegistro = null;
var listaProductosAPedir = null;
var listaArchivoSubidos = null;

jQuery(document).ready(function () {


    if (historialPrimerRegistro == null) {
        historialPrimerRegistro = eval('(' + $('#hiddenPrimerArchivoSubidos').val() + ')');
        if (typeof historialPrimerRegistro == 'undefined') {
            historialPrimerRegistro = null;
        }
    }

    CargarDatoPrimerHistorial();



    var aux_ArchivoSubirListaProductos = $('#hiddenArchivoSubirListaProductos').val(); //eval('(' + $('#hiddenArchivoSubirListaProductos').val() + ')');
    if (typeof aux_ArchivoSubirListaProductos == 'undefined') {
        aux_ArchivoSubirListaProductos = null;
    }
    if (aux_ArchivoSubirListaProductos != null) {
        showCargando();
        OnCallBackRecuperarProductosConPaginador(aux_ArchivoSubirListaProductos);
        setTimeout(function () { hideCargando(); }, 300);
    }
    //

    var isIsSubirPedidoRepetido = $('#hiddenIsSubirPedidoRepetido').val();
    if (typeof isIsSubirPedidoRepetido == 'undefined') {
        isIsSubirPedidoRepetido = false;
    } else {
        if (isIsSubirPedidoRepetido == 'true') {
            isIsSubirPedidoRepetido = true;
        } else if (isIsSubirPedidoRepetido == 'false') {
            isIsSubirPedidoRepetido = false;
        } else {
            isIsSubirPedidoRepetido = false;
        }
    }

    if (isIsSubirPedidoRepetido) {
        $('#hiddenIsSubirPedidoRepetido').val('');
        subirArchivoMsgRepetido();
    }

});

$('#btn_MuestraOtroSistemas').click(function () {
    $("#divMuestraOtroSistemas").toggle();
    return false;
});

function subirArchivoMsgRepetido() {
    var strHtml = '';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<p class="text-center">Este archivo ya ha sido cargado ¿Desea cargarlo nuevamente?</p>';
    strHtml += '<p>&nbsp;</p>';
    strHtml += '<p>&nbsp;</p>';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<a class="btn_confirmar" href="subirarchivoresultado">ACEPTAR</a>';
    strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal">CANCELAR</a>';
    strHtml += '</div>';

    mensaje_alert_generic('SUBIR ARCHIVO', strHtml);
}

function CargarDatoPrimerHistorial() {

    if (historialPrimerRegistro != null) {
        //<div class="est_ped st">&Uacute;ltimo pedido realizado:<a class="p_lr" href="#" data-toggle="modal" data-target="#modalSubirarchivo">Sprueba.PED</a>
        //<div class="clear10 visible-xs"></div>C&oacute;rdoba - 11/04/2018 14:25:55 a.m.</div>
        var strHtmlUltimoPedido = '';
        strHtmlUltimoPedido += '<div class="est_ped st">&Uacute;ltimo pedido realizado:<a class="p_lr" href="#" data-toggle="modal" data-target="#modalSubirarchivo"  onclick="onclickCargar(' + historialPrimerRegistro.has_id + ');return false;">';
        strHtmlUltimoPedido += historialPrimerRegistro.has_NombreArchivoOriginal + '</a>';
        var strNombreSucursal0 = '';
        if (historialPrimerRegistro.suc_nombre != null) {
            strNombreSucursal0 = historialPrimerRegistro.suc_nombre;
        }
        strHtmlUltimoPedido += '<div class="clear10 visible-xs"></div>' + strNombreSucursal0 + ' - ';
        strHtmlUltimoPedido += historialPrimerRegistro.has_fechaToString + '</div>';

        $('#ultimoPedido').html(strHtmlUltimoPedido);
    }
}
function onclickCargar(pValor) {
    showCargandoBuscador();
    CargarArchivoPedidoDeNuevo(pValor);
}
function CargarHtml_ElejirSucursal() {
    var elementos = document.getElementsByName('RadioTipoSucursal');
    var sucursal = '';
    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].checked) {
            sucursal = elementos[i].value;
            break;
        }
    }
    $('#HiddenFieldSucursalEleginda').val(sucursal);
}
//
function CargarUnidadesRenglones() {
    if (listaProductosBuscados != null && listaSucursal != null) {
        $('#divUnidadesRenglones').html('');
        listaProductosAPedir = [];
        var listaSucursalesUnidadesRenglones = [];
        for (var iSucursal = 0; iSucursal < listaSucursal.length; iSucursal++) {
            var obj = new cUnidadesAndRenglones();
            obj.Unidades = 0;
            obj.Renglones = 0;
            obj.codSucursal = listaSucursal[iSucursal];
            listaSucursalesUnidadesRenglones.push(obj);
        }
        for (var iProducto = 0; iProducto < listaProductosBuscados.length; iProducto++) {
            for (var iSucursalStocks = 0; iSucursalStocks < listaProductosBuscados[iProducto].listaSucursalStocks.length; iSucursalStocks++) {
                ///
                var indexSucursal_temp = 0;
                for (var iEncabezadoSucursal_aux = 0; iEncabezadoSucursal_aux < listaSucursal.length; iEncabezadoSucursal_aux++) {
                    if (listaProductosBuscados[iProducto].listaSucursalStocks[iSucursalStocks].stk_codsuc === listaSucursal[iEncabezadoSucursal_aux]) {
                            indexSucursal_temp = iEncabezadoSucursal_aux;
                            break;
                        }
                }
                var nroValor = genericInputSucGetValue(iProducto, indexSucursal_temp);
                ///
                if (isNotNullEmpty(nroValor)) {
                    nroValor = parseInt(nroValor);
                    if (nroValor > 0) {
                        for (var iSucursalesUnidadesRenglones = 0; iSucursalesUnidadesRenglones < listaSucursalesUnidadesRenglones.length; iSucursalesUnidadesRenglones++) {
                            if (listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].codSucursal == listaProductosBuscados[iProducto].listaSucursalStocks[iSucursalStocks].stk_codsuc
                                && isMostrarImput_FacturaTrazablesProvincia(listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].codSucursal, listaProductosBuscados[iProducto].pro_isTrazable)
                                && isMostrarImput_pedirCC(listaProductosBuscados[iProducto].pro_codtpopro, listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].codSucursal, listaProductosBuscados[iProducto].listaSucursalStocks)) {
                                listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].Unidades += nroValor;
                                listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].Renglones += 1;
                                break;
                            }
                        }

                    }
                }

            }
        } // fin if (listaProductosBuscados != null && listaSucursal != null) {
        //
        for (var iSucursal = 0; iSucursal < listaSucursalesUnidadesRenglones.length; iSucursal++) {


            $('#tdUnidades_' + iSucursal).html(listaSucursalesUnidadesRenglones[iSucursal].Unidades);
            $('#tdRenglones_' + iSucursal).html(listaSucursalesUnidadesRenglones[iSucursal].Renglones);

            $('#tdUnidadesCel_' + iSucursal).html(listaSucursalesUnidadesRenglones[iSucursal].Unidades);
            $('#tdRenglonesCel_' + iSucursal).html(listaSucursalesUnidadesRenglones[iSucursal].Renglones);

        }
    }
}
function CargarUnidadesRenglones_viejo() {
    if (listaProductosBuscados != null && listaSucursal != null) {
        $('#divUnidadesRenglones').html('');
        listaProductosAPedir = [];
        var listaSucursalesUnidadesRenglones = [];
        for (var iSucursal = 0; iSucursal < listaSucursal.length; iSucursal++) {
            var obj = new cUnidadesAndRenglones();
            obj.Unidades = 0;
            obj.Renglones = 0;
            obj.codSucursal = listaSucursal[iSucursal];
            listaSucursalesUnidadesRenglones.push(obj);
        }
        for (var iProducto = 0; iProducto < listaProductosBuscados.length; iProducto++) {
            for (var iSucursalStocks = 0; iSucursalStocks < listaProductosBuscados[iProducto].listaSucursalStocks.length; iSucursalStocks++) {
                if (isNotNullEmpty(listaProductosBuscados[iProducto].listaSucursalStocks[iSucursalStocks].cantidadSucursal)) {
                    var nroValor = parseInt(listaProductosBuscados[iProducto].listaSucursalStocks[iSucursalStocks].cantidadSucursal);
                    if (nroValor > 0) {
                        for (var iSucursalesUnidadesRenglones = 0; iSucursalesUnidadesRenglones < listaSucursalesUnidadesRenglones.length; iSucursalesUnidadesRenglones++) {
                            if (listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].codSucursal == listaProductosBuscados[iProducto].listaSucursalStocks[iSucursalStocks].stk_codsuc
                                && isMostrarImput_FacturaTrazablesProvincia(listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].codSucursal, listaProductosBuscados[iProducto].pro_isTrazable)
                                && isMostrarImput_pedirCC(listaProductosBuscados[iProducto].pro_codtpopro, listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].codSucursal, listaProductosBuscados[iProducto].listaSucursalStocks)) {
                                listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].Unidades += nroValor;
                                listaSucursalesUnidadesRenglones[iSucursalesUnidadesRenglones].Renglones += 1;
                                break;
                            }
                        }

                    }
                }

            }
        } // fin if (listaProductosBuscados != null && listaSucursal != null) {
        //
        for (var iSucursal = 0; iSucursal < listaSucursalesUnidadesRenglones.length; iSucursal++) {


            $('#tdUnidades_' + iSucursal).html(listaSucursalesUnidadesRenglones[iSucursal].Unidades);
            $('#tdRenglones_' + iSucursal).html(listaSucursalesUnidadesRenglones[iSucursal].Renglones);

            $('#tdUnidadesCel_' + iSucursal).html(listaSucursalesUnidadesRenglones[iSucursal].Unidades);
            $('#tdRenglonesCel_' + iSucursal).html(listaSucursalesUnidadesRenglones[iSucursal].Renglones);

        }
    }
}
function volverSubirArchivo() {
    location.href = '../mvc/subirpedido';
}
function CargarOfertas() {
    RecuperarProductosOrdenar('PrecioConDescuentoOferta', false);
}
function OrdenarTransfer() {
    RecuperarProductosOrdenar('PrecioConTransfer', false);
}
function CargarPedido() {

    if (listaProductosBuscados != null && listaSucursal != null) {
        listaProductosAPedir = [];
        listaProductosMostrarTransfer = [];
        var strHtmlMensaje = '';
        for (var iProducto = 0; iProducto < listaProductosBuscados.length; iProducto++) {
            for (var iSucursal = 0; iSucursal < listaSucursal.length; iSucursal++) {
                var mytext = $("#inputSuc" + iProducto + "_" + iSucursal);
                if (mytext.length > 0) {
                    // 
                } else {
                    mytext = null;
                }
                if (mytext != null) {
                    var valor = mytext.val();
                    var varValores = [];
                    if (valor != '') {
                        // varValores = ObtenerCantidadProductoDependiendoTransfer(iProducto, iSucursal, parseInt(mytext.val()));
                        var varValores = CargarProductoCantidadDependiendoTransfer_base(iProducto, iSucursal, parseInt(mytext.val()), true);
                    }
                    if (varValores.length > 0) {
                        if (varValores[1] == 0 && varValores[2]) {
                            strHtmlMensaje += '<div>' + listaProductosBuscados[iProducto].pro_nombre + '</div>';
                        }
                        if (varValores[0] > 0) {
                            var proComun = new cProductosAndCantidad();
                            proComun.cantidad = varValores[0];
                            proComun.codProducto = listaProductosBuscados[iProducto].pro_codigo;
                            proComun.codProductoNombre = listaProductosBuscados[iProducto].pro_nombre;
                            proComun.isMostrarTransfersEnClientesPerf = listaProductosBuscados[iProducto].isMostrarTransfersEnClientesPerf;
                            proComun.codSucursal = listaSucursal[iSucursal];
                            listaProductosAPedir.push(proComun);
                        }
                        if (varValores[1] > 0) {
                            var proTransfer = new cProductosAndCantidad();
                            proTransfer.cantidad = varValores[1];
                            proTransfer.codProducto = listaProductosBuscados[iProducto].pro_codigo;
                            proTransfer.codProductoNombre = listaProductosBuscados[iProducto].pro_nombre;
                            proTransfer.codSucursal = listaSucursal[iSucursal];
                            proTransfer.isTransferFacturacionDirecta = true;
                            proTransfer.isMostrarTransfersEnClientesPerf = listaProductosBuscados[iProducto].isMostrarTransfersEnClientesPerf;
                            proTransfer.tde_codtfr = listaProductosBuscados[iProducto].tde_codtfr;
                            listaProductosAPedir.push(proTransfer);
                        }
                        if (varValores[1] == 0 && varValores[2]) {
                            var proTransferMsg = new cProductosAndCantidad();
                            proTransferMsg.isTransfer = true;
                            proTransferMsg.cantidadMostrar = parseInt(mytext.val());
                            proTransferMsg.cantidad = varValores[1];
                            proTransferMsg.codProducto = listaProductosBuscados[iProducto].pro_codigo;
                            proTransferMsg.pro_nombre = listaProductosBuscados[iProducto].pro_nombre;
                            proTransferMsg.tde_unidadesbonificadasdescripcion = listaProductosBuscados[iProducto].tde_unidadesbonificadasdescripcion;
                            proTransferMsg.codSucursal = listaSucursal[iSucursal];
                            proTransferMsg.isTransferFacturacionDirecta = true;
                            proTransferMsg.isMostrarTransfersEnClientesPerf = listaProductosBuscados[iProducto].isMostrarTransfersEnClientesPerf;
                            proTransferMsg.tde_codtfr = listaProductosBuscados[iProducto].tde_codtfr;
                            listaProductosMostrarTransfer.push(proTransferMsg);
                        }
                        if (varValores[0] > 0 && varValores[3]) {
                            var proTransferMsg = new cProductosAndCantidad();
                            proTransferMsg.isTransfer = false;
                            proTransferMsg.cantidadMostrar = parseInt(mytext.val());
                            proTransferMsg.codProducto = listaProductosBuscados[iProducto].pro_codigo;
                            proTransferMsg.pro_nombre = listaProductosBuscados[iProducto].pro_nombre;
                            proTransferMsg.pro_ofeunidades = listaProductosBuscados[iProducto].pro_ofeunidades;
                            proTransferMsg.codSucursal = listaSucursal[iSucursal];
                            proTransferMsg.isMostrarTransfersEnClientesPerf = listaProductosBuscados[iProducto].isMostrarTransfersEnClientesPerf;
                            proTransferMsg.tde_codtfr = listaProductosBuscados[iProducto].tde_codtfr;
                            listaProductosMostrarTransfer.push(proTransferMsg);
                        }
                    }
                }
            } // fin  for (var iSucursal = 0; iSucursal < listaSucursal.length; iSucursal++) {
        } // fin for (var iProducto = 0; iProducto < listaProductosBuscados.length; iProducto++) {
        if (listaProductosAPedir.length > 0) {
            var strHtmlMensaje = '';
            if (cli_tomaTransfers()) {
                strHtmlMensaje = CargarListaProductosFaltaCantidadParaTransfer(listaProductosMostrarTransfer);
            }
            if (strHtmlMensaje == '') {
                //$('#divLoaderGeneralFondo').css('display', 'block');
                //var arraySizeDocumento = SizeDocumento();
                //document.getElementById('divCargandoContenedorGeneralFondo').style.height = arraySizeDocumento[1] + 'px';
                //PageMethods.ActualizarProductoCarritoSubirArchivo(listaProductosAPedir, OnCallBackActualizarProductoCarritoSubirArchivo, OnFailActualizarProductoCarritoSubirArchivo);
                showCargandoBuscador();
                ActualizarProductoCarritoSubirArchivo(listaProductosAPedir);
            } else {

            }
        }
        else {
            MostrarMensajeGeneral("Información", "Necesita cargar algún producto");
        }
    } // fin if (listaProductosBuscados != null && listaSucursal != null) {
}
function CargarPedidoIgualmente() {
    if (listaProductosAPedir.length > 0) {
        //$('#divLoaderGeneralFondo').css('display', 'block');
        //var arraySizeDocumento = SizeDocumento();
        //document.getElementById('divCargandoContenedorGeneralFondo').style.height = arraySizeDocumento[1] + 'px';

        //PageMethods.ActualizarProductoCarritoSubirArchivo(listaProductosAPedir, OnCallBackActualizarProductoCarritoSubirArchivo, OnFailActualizarProductoCarritoSubirArchivo);
        showCargandoBuscador();
        ActualizarProductoCarritoSubirArchivo(listaProductosAPedir);
    }
}
function CargarListaProductosFaltaCantidadParaTransfer(pListaProductosFaltaCantidadParaTransfer) {
    var strHtml = '';
    var isMostrar = false;

    strHtml += '<div class="col-xs-12"><div class="alert-success">Productos que no cumplen con la condición mínima de Ofertas/Transfers</div><div class="clear15"></div></div>';
    for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
        var isMostrarSucursal = false;
        var strHtmlSuc = '';
        strHtmlSuc += '<div class="col-xs-12"><p>' + ConvertirSucursalParaColumna(listaSucursal[iEncabezadoSucursal]) + '</p></div>';
        strHtmlSuc += '<div class="col-xs-12">';
        strHtmlSuc += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
        strHtmlSuc += '<th class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left">Producto</th>';
        strHtmlSuc += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">Condición</th>';
        strHtmlSuc += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">Cantidad</th>';
        strHtmlSuc += '</tr></thead></table>';

        strHtmlSuc += '<table class="footable table popup table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
        strHtmlSuc += '<tbody>';

        for (var iProductosParaTransfer = 0; iProductosParaTransfer < pListaProductosFaltaCantidadParaTransfer.length; iProductosParaTransfer++) {
            if (pListaProductosFaltaCantidadParaTransfer[iProductosParaTransfer].codSucursal == listaSucursal[iEncabezadoSucursal] && pListaProductosFaltaCantidadParaTransfer[iProductosParaTransfer].isMostrarTransfersEnClientesPerf) {
                var strHtmlColorFondo = 'grs';
                if (iProductosParaTransfer % 2 != 0) {
                    strHtmlColorFondo = ' wht';
                }
                isMostrar = true;
                isMostrarSucursal = true;
                if (pListaProductosFaltaCantidadParaTransfer[iProductosParaTransfer].isTransfer) {

                    strHtmlSuc += '<tr class="' + strHtmlColorFondo + '">';
                    strHtmlSuc += '<td class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left">';
                    strHtmlSuc += pListaProductosFaltaCantidadParaTransfer[iProductosParaTransfer].pro_nombre;
                    strHtmlSuc += '</td>';
                    strHtmlSuc += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">';
                    strHtmlSuc += pListaProductosFaltaCantidadParaTransfer[iProductosParaTransfer].tde_unidadesbonificadasdescripcion;
                    strHtmlSuc += '</td>';
                    strHtmlSuc += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">';
                    strHtmlSuc += pListaProductosFaltaCantidadParaTransfer[iProductosParaTransfer].cantidadMostrar;
                    strHtmlSuc += '</td>';
                    strHtmlSuc += '</tr>';
                } else {

                    strHtmlSuc += '<tr class="' + strHtmlColorFondo + '">';
                    strHtmlSuc += '<td class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left">';
                    strHtmlSuc += pListaProductosFaltaCantidadParaTransfer[iProductosParaTransfer].pro_nombre;
                    strHtmlSuc += '</td>';
                    strHtmlSuc += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">'
                    strHtmlSuc += 'Mín.' + pListaProductosFaltaCantidadParaTransfer[iProductosParaTransfer].pro_ofeunidades;
                    strHtmlSuc += '</td>';
                    strHtmlSuc += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">';
                    strHtmlSuc += pListaProductosFaltaCantidadParaTransfer[iProductosParaTransfer].cantidadMostrar;
                    strHtmlSuc += '</tr>';
                }
            }
        }
        strHtmlSuc += '</tbody></table>';
        strHtmlSuc += '</div>';
        if (isMostrarSucursal) {
            strHtml += strHtmlSuc;
        }

    }

    strHtml += '<div class="clear"></div>';
    strHtml += '<div class="col-xs-12"><a class="btn_confirmar" href="#"  onclick="modalModuloAlertHide(); CargarPedidoIgualmente(); return false;">CARGAR PEDIDO</a><a class="btn_vaciar" href="#" data-dismiss="modal" onclick="modalModuloAlertHide(); return false;">MODIFICAR PEDIDO</a></div>';

    if (isMostrar) {
        mensaje_alert_generic('CARGA DE PEDIDO', strHtml);
        //strHtml += '<div style="text-align:right;margin: 10px;" >' + '<button class="btn_gral" style="float: none;margin-top:10px;" onclick="CargarPedidoIgualmente(); return false;"> Cargar pedido </button>' + '&nbsp;&nbsp;&nbsp;' + '<button class="btn_gral" style="float: none;margin-top:10px;" onclick="onclickCerrarFondoTransfer(); return false;"> Modificar pedido </button>' + '</div>';
        //$('#divProductosFaltaCantidadParaTransfer').html(strHtml);
        //$('#divProductosFaltaCantidadParaTransfer').css('display', 'block');
        //var arraySizeDocumento = SizeDocumento();
        //document.getElementById('divCargandoContenedorGeneralFondoTransfer').style.height = arraySizeDocumento[1] + 'px';
        //$('#divCargandoContenedorGeneralFondoTransfer').css('display', 'block');
    } else {
        strHtml = '';
    }
    return strHtml;
}

function CargarListaSinStock() {
    var strHtml = '';
    var listaSucursalFaltantes = [];
    for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
        var obj = [];
        listaSucursalFaltantes.push(obj);
    }
    for (var i = 0; i < listaProductosBuscados.length; i++) {
        for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
            for (var iSucursal = 0; iSucursal < listaProductosBuscados[i].listaSucursalStocks.length; iSucursal++) {
                if (listaProductosBuscados[i].listaSucursalStocks[iSucursal].stk_codsuc == listaSucursal[iEncabezadoSucursal]) {
                    if (listaProductosBuscados[i].listaSucursalStocks[iSucursal].stk_stock.toLowerCase() == 'n') {
                        // Cantidad
                        var mytext = $("#inputSuc" + i + "_" + iEncabezadoSucursal);
                        if (mytext.length > 0) {
                            // 
                        } else {
                            mytext = null;
                        }
                        if (mytext != null) {

                            if (listaProductosBuscados[i].listaSucursalStocks[iSucursal].cantidadSucursal != '') {
                                if (listaProductosBuscados[i].listaSucursalStocks[iSucursal].cantidadSucursal > 0) {
                                    var objProductoStock = '';
                                    objProductoStock = listaProductosBuscados[i];
                                    listaSucursalFaltantes[iEncabezadoSucursal].push(objProductoStock);
                                }
                            }
                        }
                        // fin cantidad

                    }
                    break;
                }
            }
        }
    }
    //strHtml += '<div class="col-xs-12"><div class="alert-success">Productos que no cumplen con la condición mínima de Ofertas/Transfers</div><div class="clear15"></div></div>';
    var isMostrar = false;
    for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
        var isMostrarSucursal = false;
        var strHtmlSuc = '';
        strHtmlSuc += '<div class="col-xs-12"><p>' + ConvertirSucursalParaColumna(listaSucursal[iEncabezadoSucursal]) + '</p></div>';
        strHtmlSuc += '<div class="col-xs-12">';
        strHtmlSuc += '<table class="footable table carrito table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><thead><tr>';
        strHtmlSuc += '<th class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left">Nombre producto</th>';
        strHtmlSuc += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">Cantidad</th>';
        strHtmlSuc += '</tr></thead></table>';

        strHtmlSuc += '<table class="footable table popup table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';
        strHtmlSuc += '<tbody>';
        for (var iProducto = 0; iProducto < listaSucursalFaltantes[iEncabezadoSucursal].length; iProducto++) {
            var strHtmlColorFondo = 'grs';
            if (iProducto % 2 != 0) {
                strHtmlColorFondo = ' wht';
            }
            isMostrar = true;
            isMostrarSucursal = true;
            strHtmlSuc += '<tr class="' + strHtmlColorFondo + '">';
            strHtmlSuc += '<td class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left">';
            strHtmlSuc += listaSucursalFaltantes[iEncabezadoSucursal][iProducto].pro_nombre; //  + '<br/>';
            strHtmlSuc += '</td>';
            strHtmlSuc += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">';
            for (var iSucursalCantidad = 0; iSucursalCantidad < listaSucursalFaltantes[iEncabezadoSucursal][iProducto].listaSucursalStocks.length; iSucursalCantidad++) {
                if (listaSucursalFaltantes[iEncabezadoSucursal][iProducto].listaSucursalStocks[iSucursalCantidad].stk_codsuc === listaSucursal[iEncabezadoSucursal]) {
                    strHtmlSuc += listaSucursalFaltantes[iEncabezadoSucursal][iProducto].listaSucursalStocks[iSucursalCantidad].cantidadSucursal;
                    break;
                }
            }
            //  + '<br/>';
            strHtmlSuc += '</td>';
            strHtmlSuc += '</tr>';
        }
        strHtmlSuc += '</tbody></table>';
        strHtmlSuc += '</div>';
        if (isMostrarSucursal) {

            strHtml += strHtmlSuc;
        }
    }
    strHtml += '<div class="clear"></div>';
    strHtml += '<div class="col-xs-12"><a class="btn_vaciar" href="#" data-dismiss="modal">CERRAR</a></div>';

    if (isMostrar) {
        mensaje_alert_generic('PRODUCTOS EN FALTA', strHtml);
    }

}

function onclickHistorialSubirArchivo() {
    var myRadio = $('input[name=group1]');
    diasPedidos = myRadio.filter(':checked').val();
    ObtenerHistorialSubirArchivo(diasPedidos);

    return false;
}
function OnCallBackObtenerHistorialSubirArchivo(args) {

    listaArchivoSubidos = eval('(' + args + ')');
    if (typeof listaArchivoSubidos == 'undefined') {
        listaArchivoSubidos = null;
    }
    CargarHtmlHistorialArchivos();
}
function CargarHtmlHistorialArchivos() {
    var strHtml = '';
    if (listaArchivoSubidos != null) {
        if (listaArchivoSubidos.length > 0) {
            var strHtmlUltimoPedido = '';
            strHtmlUltimoPedido += '<div class="est_ped st">&Uacute;ltimo pedido realizado:<a class="p_lr" href="#" data-toggle="modal" data-target="#modalSubirarchivo"  onclick="onclickCargar(' + listaArchivoSubidos[0].has_id + ');return false;">';
            strHtmlUltimoPedido += listaArchivoSubidos[0].has_NombreArchivoOriginal + '</a>';
            var strNombreSucursal0 = '';
            if (listaArchivoSubidos[0].suc_nombre != null) {
                strNombreSucursal0 = listaArchivoSubidos[0].suc_nombre;
            }
            strHtmlUltimoPedido += '<div class="clear10 visible-xs"></div>' + strNombreSucursal0 + ' - ';
            strHtmlUltimoPedido += listaArchivoSubidos[0].has_fechaToString + '</div>';

            $('#ultimoPedido').html(strHtmlUltimoPedido);




            // boton volver
            //            strHtml += '<input type="button" onclick="volverComposicionSaldo()" value="VOLVER" class="btn_gral" />';
            //            strHtml += '<div style="height:25px;">&nbsp;</div>';
            // fin boton volver
            if (listaArchivoSubidos.length > 1) {
                strHtml += '<div style="font-size:20px;text-align: center;">' + 'HISTORIAL' + '</div>';
                strHtml += '<table class="footable table sin_b table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
                strHtml += '<thead class="pagos">';
                strHtml += '<tr>';
                //strHtml += '<th>Archivo</th>';
                strHtml += '<th><table width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
                strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Archivo</td></tr>';
                strHtml += '</table></th>';
                // strHtml += '<th>Sucursal</th>';
                strHtml += '<th><table width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
                strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Sucursal</td></tr>';
                strHtml += '</table></th>';
                //strHtml += '<th>Fecha</th>';
                strHtml += '<th><table width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr class="hidden-xs"><td class="col-lg-12 text-center">&nbsp;<div class="clear10"></div></td></tr>';
                strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
                strHtml += '</table></th>';
                strHtml += '</tr>';
                strHtml += '</thead>';
                strHtml += '<tbody>';
                for (var i = 1; i < listaArchivoSubidos.length; i++) {
                    var strHtmlColorFondo = ' wht';
                    if (i % 2 != 0) {
                        strHtmlColorFondo = ' grs';
                    }
                    strHtml += '<tr class="' + strHtmlColorFondo + '">';
                    //                    strHtml += '<td class="' + strHtmlColorFondo + '" onclick="onclickCargar()">' + '<a href="../../archivos/ArchivosPedidos/' + listaArchivoSubidos[i].has_NombreArchivo + '" TARGET="_blank">' + listaArchivoSubidos[i].has_NombreArchivoOriginal + '</a>' + '</td>';
                    strHtml += '<td onclick="onclickCargar(' + listaArchivoSubidos[i].has_id + ')" style="color:#065BAB;cursor:pointer;">' + listaArchivoSubidos[i].has_NombreArchivoOriginal + '</td>';
                    var strNombreSucursal = '';
                    if (listaArchivoSubidos[i].suc_nombre != null) {
                        strNombreSucursal = listaArchivoSubidos[i].suc_nombre;
                    }
                    strHtml += '<td>' + strNombreSucursal + '</td>';
                    strHtml += '<td>' + listaArchivoSubidos[i].has_fechaToString + '</td>';
                    strHtml += '</tr>';
                }
                strHtml += '<tbody>';
                strHtml += '</table>';
            } // fin 
        }

    }
    $('#divTablaHistorial').html(strHtml);
}