﻿var varPalabraBuscador = '';
var listaProductosBuscados = null;
var isCarritoDiferido = null;
var isCarritoExclusivo = null;
var isSubirPedido = null;
var intPaginadorTipoDeRecuperar = 0; // 1 es oferta - 2 es transfer - 3 es buscador común
var isHacerBorradoCarritos = false;
var listaCarritos = null;
var listaCarritoTransferPorSucursal = null;
var timerProducto = null;
var selectedInput = null;
var selectedInputTransfer = null;
var selectInputCarrito = null;
var isExcedeImporte = false;
var isEnterExcedeImporte = false;
var ExcedeImporteFila = null;
var ExcedeImporteColumna = null;
var ExcedeImporteValor = null;
var ExcedeImporteSiguienteFila = 0;
var ExcedeImporteSiguienteColumna = 0;
var ExcedeImporteFilaCarrito = null;
var ExcedeImporteColumnaCarrito = null;
var ExcedeImporteValorCarrito = null;
var ExcedeImporteSiguienteIndiceCarrito = 0;
var ExcedeImporteSiguienteIndiceCarritoProducto = 0;
var ExcedeImporteIndiceCarrito = 0;
var ExcedeImporteIndiceCarritoProducto = 0;
var isMoverCursor = true;
var listaTipoEnviosSucursal = null;
var listaCadeteriaRestricciones = null;
var cantidadMaximaParametrizada = null;
var isBotonNoEstaEnProceso = true;
var Ascender_pro_nombre = true;
var Ascender_pro_precio = true;
var Ascender_PrecioFinal = true;
var Ascender_PrecioConDescuentoOferta = true;
var Ascender_PrecioConTransfer = true;
var Ascender_nroordenamiento = true;
var listaSucursales = null;
var listaSucursalesDependienteInfo = null;
var titulo_transferDirecto = "El producto se vende solo por transfer.";
var titulo_error = "Ha ocurrido un error, por favor intente de nuevo.";
var cuerpo_error = "Los siguientes productos no se pudieron agregar correctamente:";
var mensajeCantidadSuperaElMaximoParametrizado1 = '¿Seguro que desea pedir más de ';
var mensajeCantidadSuperaElMaximoParametrizado2 = ' unidades?';
var mensajeCuandoSeMuestraError = 'Se produjo un error';
var mensajeTareasMantenimiento = 'En este momento estamos realizando tareas de mantenimiento, por favor confirme su pedido más tarde.';
var new_fechaHorarioCierre = '';
var new_fechaHorarioCierreSiguiente = '';
var nombreSucursalDefault = '';
var textTipoEnvioCarrito = '';
var isNotBuscadorEnProceso = true;
var maxLengthMensajeFacturaRemito = 40;
var homeIdOferta = null;
var homeIdTransfer = null;
var homeTipo = null;
// Transfer
var indexSucursalTransferSeleccionado = null;
// fin Transfer
var intColumnaOrdenar = -2;
var timerProductoFacturacionDirecta = null;
var htmlAltoCosto = '<span class="p_trazable">Alto Costo - Ventas comunicarse al <i class="fa fa-whatsapp linkWP_icon"></i><a class="linkWP" href="tel:3416100365">341 6100365</a></span>';

$(document).ready(function () {
    $(document).keydown(function (e) {
        if (!e) {
            e = window.event;
        }
        teclaPresionada_enPagina(e);
    });
    $('#opciones_avanzadas').click(function () {
        var nodo = $(this).attr("id");
        if ($("#filtros_" + nodo).is(":visible")) {
            $("#filtros_" + nodo).slideUp(300);
            $("#eye_" + nodo).removeClass("fa fa-eye-slash");
            $("#eye_" + nodo).addClass("fa fa-eye");
            return false;
        } else {
            $("#eye_" + nodo).removeClass("fa fa-eye");
            $("#eye_" + nodo).addClass("fa fa-eye-slash");
            $("#filtros_" + nodo).slideDown(300);
            return false;
        }
    });
    $("#modalModulo").on("hidden.bs.modal", function () {
        HacerLimpiezaDeCarritosDspDeConfirmarPedido();
    })

    if (listaCarritos == null) {
        listaCarritos = eval('(' + $('#hiddenListaCarritos').val() + ')');
        if (typeof listaCarritos == 'undefined') {
            listaCarritos = null;
        }
    }
    if (listaSucursales == null) {
        listaSucursales = eval('(' + $('#hiddenListaSucursalesInfo').val() + ')');
        if (typeof listaSucursales == 'undefined') {
            listaSucursales = null;
        }
    }
    if (listaTipoEnviosSucursal == null) {
        listaTipoEnviosSucursal = eval('(' + $('#hiddenListaTipoEnviosSucursales').val() + ')');
        if (typeof listaTipoEnviosSucursal == 'undefined') {
            listaTipoEnviosSucursal = null;
        }
    }
    if (listaCadeteriaRestricciones == null) {
        listaCadeteriaRestricciones = eval('(' + $('#hiddenListaCadeteriaRestricciones').val() + ')');
        if (typeof listaCadeteriaRestricciones == 'undefined') {
            listaCadeteriaRestricciones = null;
        }
    }
    if (cantidadMaximaParametrizada == null) {
        cantidadMaximaParametrizada = $('#hiddenCantidadProductoParametrizado').val();
        if (typeof cantidadMaximaParametrizada == 'undefined') {
            cantidadMaximaParametrizada = null;
        }
    }
    nombreSucursalDefault = cli_codsuc();
    if (listaSucursales != null) {
        for (var i = 0; i < listaSucursales.length; i++) {
            if (listaSucursales[i].sde_sucursal == cli_codsuc()) {
                nombreSucursalDefault = listaSucursales[i].suc_nombre;
                break;
            }
        }
    }
    if (listaSucursalesDependienteInfo == null) {
        listaSucursalesDependienteInfo = eval('(' + $('#hiddenListaSucursalesDependienteInfo').val() + ')');
        if (typeof listaSucursalesDependienteInfo == 'undefined') {
            listaSucursalesDependienteInfo = null;
        }
    }
    if (isCarritoDiferido == null) {
        isCarritoDiferido = $('#hiddenIsCarritoDiferido').val();
        if (typeof isCarritoDiferido == 'undefined') {
            isCarritoDiferido = false;
        } else {
            if (isCarritoDiferido == 'true') {
                isCarritoDiferido = true;
            } else if (isCarritoDiferido == 'false') {
                isCarritoDiferido = false;
            } else {
                isCarritoDiferido = false;
            }
        }
    }

    if (isCarritoExclusivo == null) {
        isCarritoExclusivo = $('#hiddenIsCarritoExclusivo').val();
        if (typeof isCarritoExclusivo == 'undefined') {
            isCarritoExclusivo = false;
        } else {
            if (isCarritoExclusivo == 'true') {
                isCarritoExclusivo = true;
            } else if (isCarritoExclusivo == 'false') {
                isCarritoExclusivo = false;
            } else {
                isCarritoExclusivo = false;
            }
        }
    }
    if (isSubirPedido == null) {
        isSubirPedido = $('#hiddenIsSubirPedido').val();
        if (typeof isSubirPedido == 'undefined') {
            isSubirPedido = false;
        } else {
            if (isSubirPedido == 'true') {
                isSubirPedido = true;
            } else if (isSubirPedido == 'false') {
                isSubirPedido = false;
            } else {
                isSubirPedido = false;
            }
        }
    }

    // Home oferta
    homeIdOferta = $('#hiddenHomeIdOferta').val();
    if (typeof homeIdOferta == 'undefined') {
        homeIdOferta = null;
    }
    else
        homeIdOferta = parseInt($('#hiddenHomeIdOferta').val());

    homeIdTransfer = $('#hiddenhomeIdTransfer').val();
    if (typeof homeIdTransfer == 'undefined') {
        homeIdTransfer = null;
    }
    else
        homeIdTransfer = parseInt($('#hiddenhomeIdTransfer').val());

    homeTipo = $('#hiddenhomeTipo').val();
    if (typeof homeTipo == 'undefined') {
        homeTipo = null;
    }
    else
        homeTipo = parseInt($('#hiddenhomeTipo').val());

    CargarCarritos();

    if (typeof CargarCarritosTransfersPorSucursal == 'function') { // isCarritoDiferido == false
        listaCarritoTransferPorSucursal = eval('(' + $('#hiddenListaCarritosTransferPorSucursal').val() + ')');
        CargarCarritosTransfersPorSucursal();
    }

    ObtenerHorarioCierreAndSiguiente(cli_codsuc());
    CargarCantidadCarritos_Celular();
    carritoNoHayCarritosCelular();
});

function carritoNoHayCarritosCelular() {
    if ($('#divNoHayCarritos').length) {
        var isHayCarrito = false;
        if (listaCarritos != null) {
            for (var i = 0; i < listaCarritos.length; i++) {
                if (listaCarritos[i].codSucursal != '') {
                    isHayCarrito = true;
                    break;
                }
            }

        }
        if (listaCarritoTransferPorSucursal != null) {
            for (var i = 0; i < listaCarritoTransferPorSucursal.length; i++) {
                if (listaCarritoTransferPorSucursal[i].Sucursal != '') {
                    isHayCarrito = true;
                    break;
                }
            }
        }
        if (isHayCarrito) {
            $('#divNoHayCarritos').css('display', 'none');
        } else {
            $('#divNoHayCarritos').css('display', 'block');
        }
    }
}

function CargarCantidadCarritos_Celular() {
    if ($("#spanCarritoCantidad").length) {
        var cant = 0;
        if (listaCarritos != null) {
            for (var i = 0; i < listaCarritos.length; i++) {
                if (listaCarritos[i].codSucursal != '') {
                    cant++;
                }
            }
        }
        if (listaCarritoTransferPorSucursal != null) {
            for (var i = 0; i < listaCarritoTransferPorSucursal.length; i++) {
                if (listaCarritoTransferPorSucursal[i].Sucursal != '') {
                    cant++;
                }
            }
        }
        $('#spanCarritoCantidad').html(cant);
    }
}


function OnMouseOutProdructo() {
    if ($("#divMostradorProducto").css("display") === 'block') {
        $("#divMostradorProducto").css("display", "none");
    }
    LimpiarTimeoutProducto();
}
function LimpiarTimeoutProducto() {
    if (timerProducto) {
        clearTimeout(timerProducto);
        timerProducto = null;
    }
}
function OnMouseMoveProdructo(e) {
    if (typeof (e) == 'undefined') {
        e = event;
    }
    var bt = document.body.scrollTop;
    var et = document.documentElement ? document.documentElement.scrollTop : null;
    var top = e.clientY || e.pageY;
    var left = e.clientX || e.pageX;

    //$("#divMostradorProducto").css("top", (top + (bt || et) + 20) + 'px');
    //$("#divMostradorProducto").css("left", (left + 20) + 'px'); 
    $("#divMostradorProducto").css("top", (top + (bt || et) + 20 - $("#divHeader").css("height").replace('px', '')) + 'px');// this.pageYOffset 
    $("#divMostradorProducto").css("left", (left + 20) + 'px');

}
function OnMouseOverProdructo(pIndice) {
    if ($("#divMostradorProducto").css("display") == 'none') {
        LimpiarTimeoutProducto();
        timerProducto = setTimeout(function () { AnimarPresentacionProducto(pIndice); }, 300);
    }
}
function AnimarPresentacionProducto(pIndice) {
    CargarDatosProductos(pIndice);
    $("#divMostradorProducto").css("display", "block");
    LimpiarTimeoutProducto();
}
function CargarDatosProductos(pIndice) {

    if (listaProductosBuscados[pIndice].pro_nombre != null) {
        $('#tdNombre').html(AgregarMark(listaProductosBuscados[pIndice].pro_nombre));
    } else {
        $('#tdNombre').html('');
    }
    if (listaProductosBuscados[pIndice].pro_laboratorio != null) {
        $('#tdLaboratorio').html(AgregarMark(listaProductosBuscados[pIndice].pro_laboratorio));
    } else {
        $('#tdLaboratorio').html('');
    }
    if (listaProductosBuscados[pIndice].pro_monodroga != null) {
        $('#tdMonodroga').html(AgregarMark(listaProductosBuscados[pIndice].pro_monodroga));
    } else {
        $('#tdMonodroga').html('');
    }
    if (listaProductosBuscados[pIndice].pro_codigobarra != null) {
        $('#tdCodigoBarra').html(AgregarMark(listaProductosBuscados[pIndice].pro_codigobarra));
    } else {
        $('#tdCodigoBarra').html('');
    }
    if (listaProductosBuscados[pIndice].pro_codigoalfabeta != null) {
        $('#tdCodigoAlfaBeta').html(AgregarMark(listaProductosBuscados[pIndice].pro_codigoalfabeta));
    } else {
        $('#tdCodigoAlfaBeta').html('');
    }
    if (listaProductosBuscados[pIndice].pro_troquel != null) {
        $('#tdTroquel').html(AgregarMark(listaProductosBuscados[pIndice].pro_troquel));
    } else {
        $('#tdTroquel').html('');
    }
    if (listaProductosBuscados[pIndice].pro_neto != null) {
        if (listaProductosBuscados[pIndice].pro_neto) {
            $('#tdTipoVenta').html('Gravado');
        } else {
            $('#tdTipoVenta').html('Exento');
        }
    } else {
        $('#tdTipoVenta').html('');
    }
    if (listaProductosBuscados[pIndice].pro_codtpopro != null) {
        $('#tdTipoProducto').html(getMostrarTipoProducto(pIndice));
    } else {
        $('#tdTipoProducto').html('');
    }
    if (listaProductosBuscados[pIndice].pro_isCadenaFrio) {
        $('#tdCadenaFrio').html('Si');
    } else {
        $('#tdCadenaFrio').html('No');
    }
    if (listaProductosBuscados[pIndice].pro_isTrazable) {
        $('#tdTrazable').html('Si');
    } else {
        $('#tdTrazable').html('No');
    }
    if (listaProductosBuscados[pIndice].pro_Familia != null) {
        $('#tdFamilia').html(listaProductosBuscados[pIndice].pro_Familia);
    } else {
        $('#tdFamilia').html('');
    }
    //
    if (listaProductosBuscados[pIndice].pro_PackDeVenta != null) {
        $('#tdPackDeVenta').html(listaProductosBuscados[pIndice].pro_PackDeVenta);
    } else {
        $('#tdPackDeVenta').html('');
    }
    //
    // Inicio Imagen Producto
    if (listaProductosBuscados[pIndice].pri_nombreArchivo == null) {
        $('#imgProductoDatos').attr('src', '');
        // $('#imgProductoDatos').css('display', 'none');
        $('#tdImgProductoDatos').css('display', 'none');
    } else {
        $('#imgProductoDatos').attr('src', '../../servicios/thumbnail?r=' + 'productos' + '&n=' + listaProductosBuscados[pIndice].pri_nombreArchivo + '&an=' + String(250) + '&al=' + String(250));
        //$('#imgProductoDatos').css('display', 'block');
        $('#tdImgProductoDatos').css('display', 'inline');
    }
    // Fin Imagen Producto
}
function setearVariablesBuscador() {
    Ascender_pro_nombre = true;
    Ascender_pro_precio = true;
    Ascender_PrecioFinal = true;
    Ascender_PrecioConDescuentoOferta = true;
    Ascender_PrecioConTransfer = true;
    Ascender_nroordenamiento = true;
    pagActual = 1;
    intColumnaOrdenar = -2;
}
function onClickBuscar() {
    if (isNotBuscadorEnProceso) {
        // Limpiar Paginador
        $('#divPaginador').html('');
        //intPaginadorTipoDeRecuperar = 0; // setea
        var isBuscar = false;
        // Limpiar detalle producto si se encuentra abierto
        OnMouseOutProdructo();
        //
        varPalabraBuscador = jQuery("#txtBuscador").val().trim();
        if (varPalabraBuscador !== '') {
            if (varPalabraBuscador.length > 2) {
                var isTransferSeleccionado = false;
                //if (isCarritoDiferido) {
                //    isTransferSeleccionado = false;
                //} else {
                //    isTransferSeleccionado = $('#checkBoxTodosTransfer').is(':checked');
                //}
                isTransferSeleccionado = $('#checkBoxTodosTransfer').is(':checked');

                if ($('#checkNombre').is(':checked') || $('#checkBoxCodigoBarra').is(':checked') || $('#checkBoxMonodroga').is(':checked') || $('#checkBoxLaboratorio').is(':checked') || $('#checkBoxCodigoAlfaBeta').is(':checked') || $('#checkBoxTroquel').is(':checked') || $('#checkBoxFamilia').is(':checked') || $('#checkBoxTodosOfertas').is(':checked') || isTransferSeleccionado) {
                    //
                    //Ascender_pro_precio = true;
                    //Ascender_PrecioFinal = true;
                    //Ascender_PrecioConDescuentoOferta = true;
                    var arrayListaColumna = new Array();
                    if ($('#checkNombre').is(':checked')) {
                        arrayListaColumna.push($('#checkNombre').val());
                    }
                    if ($('#checkBoxCodigoBarra').is(':checked')) {
                        arrayListaColumna.push($('#checkBoxCodigoBarra').val());
                    }
                    if ($('#checkBoxMonodroga').is(':checked')) {
                        arrayListaColumna.push($('#checkBoxMonodroga').val());
                    }
                    if ($('#checkBoxLaboratorio').is(':checked')) {
                        arrayListaColumna.push($('#checkBoxLaboratorio').val());
                    }
                    if ($('#checkBoxCodigoAlfaBeta').is(':checked')) {
                        arrayListaColumna.push($('#checkBoxCodigoAlfaBeta').val());
                    }
                    if ($('#checkBoxTroquel').is(':checked')) {
                        arrayListaColumna.push($('#checkBoxTroquel').val());
                    }
                    if ($('#checkBoxFamilia').is(':checked')) {
                        arrayListaColumna.push($('#checkBoxFamilia').val());
                    }
                    showCargandoBuscador();
                    intPaginadorTipoDeRecuperar = 3; // buscador común
                    //pagActual = 1;
                    //intColumnaOrdenar = -2;
                    setearVariablesBuscador();
                    RecuperarProductosVariasColumnas(varPalabraBuscador, arrayListaColumna, $('#checkBoxTodosOfertas').is(':checked'), isTransferSeleccionado);
                }
                else {
                    mensaje_informacion('Seleccione por lo menos una opción de búsqueda');
                }
                isBuscar = true;
            } else {
                mensaje_informacion_buscador('Ingrese 3 caracteres mínimos');
            }

        }
        //}
        if (!isBuscar) {
            jQuery("#divResultadoBuscador").html('');
        }
    }
}

function getCSSColumnaOrdenar(pValor) {
    if (pValor === -1 && pValor === intColumnaOrdenar) { // -1
        if (!Ascender_pro_nombre)
            return 'up';
        else
            return 'down';
    }
    if (pValor === 0 && pValor === intColumnaOrdenar) { // 0
        if (!Ascender_pro_precio)
            return 'up';
        else
            return 'down';
    }
    if (pValor === 1 && pValor === intColumnaOrdenar) { // 1
        if (!Ascender_PrecioFinal)
            return 'up';
        else
            return 'down';
    }
    if (pValor === 2 && pValor === intColumnaOrdenar) { // 2
        if (!Ascender_PrecioConDescuentoOferta)
            return 'up';
        else
            return 'down';
    }
    if (pValor === 3 && pValor === intColumnaOrdenar) { // 3
        if (!Ascender_PrecioConTransfer)
            return 'up';
        else
            return 'down';
    }
    if (pValor === 4 && pValor === intColumnaOrdenar) { // 3
        if (!Ascender_nroordenamiento)
            return 'up';
        else
            return 'down';
    }
    return '';
}

function onclickOrdenarProducto(pValor) {
    intColumnaOrdenar = pValor;
    if (pValor === -1) {
        RecuperarProductosOrdenar('pro_nombre', Ascender_pro_nombre);
        Ascender_pro_nombre = !Ascender_pro_nombre;
    }
    if (pValor === 0) {
        RecuperarProductosOrdenar('pro_precio', Ascender_pro_precio);
        Ascender_pro_precio = !Ascender_pro_precio;
    }
    if (pValor === 1) {
        RecuperarProductosOrdenar('PrecioFinal', Ascender_PrecioFinal);
        Ascender_PrecioFinal = !Ascender_PrecioFinal;
    }
    if (pValor === 2) {
        RecuperarProductosOrdenar('PrecioConDescuentoOferta', Ascender_PrecioConDescuentoOferta);
        Ascender_PrecioConDescuentoOferta = !Ascender_PrecioConDescuentoOferta;
    }
    if (pValor === 3) {
        RecuperarProductosOrdenar('PrecioConTransfer', Ascender_PrecioConTransfer);
        Ascender_PrecioConTransfer = !Ascender_PrecioConTransfer;
    }
    if (pValor === 4) {
        RecuperarProductosOrdenar('nroordenamiento', Ascender_nroordenamiento);
        Ascender_nroordenamiento = !Ascender_nroordenamiento;
    }
}

function onClickVerOfertas() {
    if (isNotBuscadorEnProceso) {
        varPalabraBuscador = '';
        showCargandoBuscador();
        intPaginadorTipoDeRecuperar = 1;
        //pagActual = 1;
        setearVariablesBuscador();
        RecuperarProductosEnOfertas(pagActual);
    }
}
function onClickVerTransfer() {
    if (isNotBuscadorEnProceso) {
        varPalabraBuscador = '';
        showCargandoBuscador();
        intPaginadorTipoDeRecuperar = 2;
        //pagActual = 1;
        setearVariablesBuscador();
        RecuperarProductosEnTransfer(pagActual);
    }
}
function LlamarMetodoCargar(pagActual) {
    showCargandoBuscador();
    RecuperarProductosPaginador(pagActual);
}
function OnCallBackRecuperarProductosConPaginador(args) {
    var varArgs = eval('(' + args + ')');
    var mod = varArgs.CantidadRegistroTotal % CantidadFilaPorPagina_const;
    var cantPag = 0;
    if (mod == 0) {
        cantPag = varArgs.CantidadRegistroTotal / CantidadFilaPorPagina_const;
    }
    else {
        cantPag = Math.ceil((varArgs.CantidadRegistroTotal / CantidadFilaPorPagina_const));
    }
    cantPaginaTotal = cantPag;
    if (!isSubirPedido) {
        GenerarPaginador();
    }
    OnCallBackRecuperarProductos(args);
}
function getHtmlTablaResolucionCelular() {

    var strHtml = '';
    var strCssTable = '';
    if (isSubirPedido) {
        strCssTable = ' visible-sm ';
    }
    strHtml += '<table class="footable table table-stripped tbl_xs visible-xs' + strCssTable + '" data-empty="" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
    strHtml += '<thead>';
    strHtml += '<tr>';
    //
    strHtml += '<th class="col-xs-8 text-left no-padding">';
    strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
    strHtml += '<tbody><tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
    strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-left pl click"  title="Ordenar" onclick="onclickOrdenarProducto(-1)">Producto<span class="order ' + getCSSColumnaOrdenar(-1) + '"></span></td></tr>';
    strHtml += '</tbody></table>';
    strHtml += '</th>';

    strHtml += '<th class="col-xs-4 text-center" colspan="2">';
    strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
    strHtml += '<tbody><tr><td colspan="2" class="col-lg-12 text-center">Habitual<div class="clear5"></div></td></tr>';
    strHtml += '<tr class="tr_thead">';
    strHtml += '<td class="col-lg-6 text-center click td_busc_xs"  onclick="onclickOrdenarProducto(0)"><span data-toggle="tooltip" data-placement="bottom" title="Ordenar" data-original-title="Ordenar">Público</span><span class="order ' + getCSSColumnaOrdenar(0) + '"></span></td>';
    strHtml += '<td class="col-lg-6 text-center click" data-toggle="tooltip" data-placement="bottom" title="Ordenar" data-original-title="Ordenar" onclick="onclickOrdenarProducto(1)">Precio<span class="order ' + getCSSColumnaOrdenar(1) + '"></span></td>';
    strHtml += '</tr>';
    strHtml += '</tbody></table>';
    strHtml += '</th>';

    strHtml += '</tr>';
    strHtml += '</thead>';
    strHtml += '<tbody>';
    if (listaProductosBuscados.length > 0) {
        for (var i = 0; i < listaProductosBuscados.length; i++) {
            var isNotGLNisTrazable = false;
            var isMostrarImput = true;
            if (cli_isGLN() !== null) {
                if (!cli_isGLN()) {
                    if (listaProductosBuscados[i].pro_isTrazable) {
                        isNotGLNisTrazable = true;
                        isMostrarImput = false;
                    }
                }
            }
            var strTrColorFondo = ' wht';
            if (i % 2 !== 0) {
                strTrColorFondo = ' grs';
            }


            // subir archivo
            if (isSubirPedido) {
                if (listaProductosBuscados[i].isProductoNoEncontrado) {
                    strTrColorFondo += ' rosa ';
                }
                var isRemarcarFila = false;
                for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
                    Log('getHtmlTablaResolucionCelular:' + '0');
                    var varValores = CargarProductoCantidadDependiendoTransfer_base(i, iEncabezadoSucursal, listaProductosBuscados[i].cantidad, true);
                    if ((varValores[1] == 0 && varValores[2]) || (varValores[0] > 0 && varValores[3])) {
                        isRemarcarFila = true;
                        break;
                    }
                }
                if (isRemarcarFila && cli_tomaTransfers() && listaProductosBuscados[i].isMostrarTransfersEnClientesPerf && listaProductosBuscados[i].isPermitirPedirProducto) {
                    strTrColorFondo += ' violeta ';
                }
            }
            // fin


            //<td class="col-xs-8 text-left"><a class="prod_xs" href="" data-toggle="modal" data-target="#modalProd_xs_1">
            strHtml += '<tr class="' + strTrColorFondo + '">';
            //var strHtmlColorFondo = '';
            strHtml += '<td class="col-xs-8 text-left"  onclick="detalleProducto_celular(' + i + '); return false;" ><a class="prod_xs" href="" data-toggle="modal" data-target="#modalProd_xs_1"  >';
            // strHtml += strHtmlColorFondo + '" ';//'">';
            //strHtml += '  >'
            strHtml += listaProductosBuscados[i].pro_nombre;//AgregarMark( listaProductosBuscados[i].pro_nombre);
            if (isNotGLNisTrazable) {
                strHtml += '<span class="p_trazable">Producto trazable. Farmacia sin GLN.</span>';
            }
            if (cli_tomaTransfers() && listaProductosBuscados[i].isMostrarTransfersEnClientesPerf) {
                if (listaProductosBuscados[i].isTieneTransfer) {
                    strHtml += '<a href="#" class="trf">TRANSFER COMBO</a>';//'<span>&nbsp;&nbsp;&raquo;&nbsp;Transfer Combo</span>';
                } else if (listaProductosBuscados[i].isProductoFacturacionDirecta) {
                    strHtml += '<span class="trf">TRF</span>';//'<span>&nbsp;&nbsp;&raquo;&nbsp;TRF</span>';
                }
                // Mostrar solo producto Transfer 
                if (listaProductosBuscados[i].pro_vtasolotransfer) {
                    strHtml += '<span class="p_trazable">Se vende solo por transfer</span>';// '<span class="spanProductoTrazableCLiSinGLN" >&nbsp;&nbsp;&nbsp;Se vende solo por transfer</span>';
                }
            }
            // Alto Costo
            if (listaProductosBuscados[i].pro_AltoCosto) {
                strHtml += htmlAltoCosto;
                isMostrarImput = false;
            }
            // Vale Psicotropicos
            if (listaProductosBuscados[i].isValePsicotropicos) {
                strHtml += '<span class="p_trazable" >Requiere Vale</span>';
                isMostrarImput = false;
            }
            // FIN Vale Psicotropicos
            // + IVA
            if (listaProductosBuscados[i].pro_neto) {
                strHtml += '<span class="iva">+IVA</span>';
            }
            // FIN + IVA
            if (listaProductosBuscados[i].isProductoNoEncontrado) {
                strHtml += '<span class="p_erronero">REGISTRO ERRONEO</span>';
            }
            // Ver si mostrar input solo producto Transfer 
            if (listaProductosBuscados[i].pro_vtasolotransfer && !isMostrarSoloTransfer_FacturacionDirecta(listaProductosBuscados[i])) {//if (listaProductosBuscados[i].pro_vtasolotransfer && !listaProductosBuscados[i].isTablaTransfersClientes) 
                isMostrarImput = false;
            }

            if (listaProductosBuscados[i].pri_nombreArchivo !== null) {
                strHtml += '<i class="fa fa-camera color_emp_st pull-right"></i>';
            }
            strHtml += '</td>';
            //
            var precioPublico = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[i].pro_precio.toFixed(2));
            if (listaProductosBuscados[i].pro_precio === 0) {
                precioPublico = '';
            }

            strHtml += '<td class="col-xs-2 text-center">' + precioPublico + '</td>';

            var precioHabitual = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[i].PrecioFinal.toFixed(2));
            if (listaProductosBuscados[i].pro_nombre.match("^PAÑAL PAMI AD")) {
                precioHabitual = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[i].pro_preciofarmacia.toFixed(2));
            }
            if (listaProductosBuscados[i].pro_AltoCosto) {
                precioHabitual = '';
            }
            strHtml += '<td class="col-xs-2 text-center">' + precioHabitual + '</td>';


            strHtml += '</tr>';
        }
    } else {
        strHtml += '<tr><td colspan="8" class="text-center"><p class="color_red">La búsqueda no arroja resultados</p></td></tr>';
    }
    strHtml += '</tbody>';


    if (isSubirPedido) {

        strHtml += '<tfoot>';
        var strHtml_cel_part_0 = '';
        var strHtml_cel_part_1 = '';
        var strHtml_cel_part_2 = '';
        for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {

            strHtml_cel_part_1 += '<tr>';
            strHtml_cel_part_1 += '<td colspan="2" class="col-xs-10 text-right">Renglones ' + listaSucursal[iEncabezadoSucursal] + ':</td>';
            strHtml_cel_part_1 += '<td id="tdRenglonesCel_' + iEncabezadoSucursal + '" class="col-xs-2 text-center pad_7"></td>';
            strHtml_cel_part_1 += '</tr>';
            strHtml_cel_part_2 += '<tr>';
            strHtml_cel_part_2 += '<td colspan="2" class="col-xs-10 text-right">' + textUnidades + listaSucursal[iEncabezadoSucursal] + ':</td>';
            strHtml_cel_part_2 += '<td id="tdUnidadesCel_' + iEncabezadoSucursal + '" class="col-xs-2 text-center pad_7"></td>';
            strHtml_cel_part_2 += '</tr>';
        }

        strHtml += strHtml_cel_part_1;
        strHtml += strHtml_cel_part_2;
        strHtml += '</tfoot>';

        strHtml += '</table>';
        strHtml += '<div class="visible-xs ' + strCssTable + '"><a class="btn_emp float-right" href="#" data-toggle="modal" data-target="#modalCargarPedido" onclick="CargarPedido(); return false;">CARGAR PEDIDO</a></div>';
    }
    else {
        strHtml += '</table>';
    }
    return strHtml;

}


//
function onclickRecuperarTransfer(pIndice) {
    if (!isSubirPedido) { // si no es carrito diferido
        if (cli_tomaTransfers()) {
            if (listaProductosBuscados[pIndice].isTieneTransfer) {
                productoSeleccionado = listaProductosBuscados[pIndice].pro_nombre;
                RecuperarTransfer(listaProductosBuscados[pIndice].pro_codigo);
            }
        }
    }
}

function ObtenerCantidadProductoMasTransfer(pIdSucursal, pIdProduco) {
    var resultado = '';
    resultado = ObtenerCantidadProducto(pIdSucursal, pIdProduco);
    /// NUEVO facturacion directa
    var resultadoTransfer = ObtenerCantidadProductoTransfer(pIdSucursal, pIdProduco);
    if (resultadoTransfer !== 0) {
        if (resultado === '') {
            resultado = resultadoTransfer;
        } else {
            resultado += resultadoTransfer;
        }
    }
    /// FIN NUEVO facturacion directa
    return resultado;
}

function ObtenerCantidadProducto(pIdSucursal, pIdProduco) {
    var resultado = '';
    if (listaCarritos !== null) {
        for (var i = 0; i < listaCarritos.length; i++) {
            if (listaCarritos[i].codSucursal === pIdSucursal) {
                for (var iProducto = 0; iProducto < listaCarritos[i].listaProductos.length; iProducto++) {
                    if (listaCarritos[i].listaProductos[iProducto].codProducto === pIdProduco) {
                        resultado = listaCarritos[i].listaProductos[iProducto].cantidad;
                        break;
                    }
                }
                break;
            } // for (var i = 0; i < listaCarritos.length; i++) {
        }
    }
    return resultado;
}
function ObtenerCantidadProductoTransfer(pIdSucursal, pCodProducto) {
    var resultado = 0;
    if (listaCarritoTransferPorSucursal !== null) {
        if (listaCarritoTransferPorSucursal.length > 0) {
            for (var iSucursal = 0; iSucursal < listaCarritoTransferPorSucursal.length; iSucursal++) {
                if (listaCarritoTransferPorSucursal[iSucursal].Sucursal === pIdSucursal) {
                    for (var iTransfer = 0; iTransfer < listaCarritoTransferPorSucursal[iSucursal].listaTransfer.length; iTransfer++) {
                        for (var iTransferProductos = 0; iTransferProductos < listaCarritoTransferPorSucursal[iSucursal].listaTransfer[iTransfer].listaProductos.length; iTransferProductos++) {
                            if (listaCarritoTransferPorSucursal[iSucursal].listaTransfer[iTransfer].listaProductos[iTransferProductos].tde_codpro === pCodProducto) {
                                if (listaCarritoTransferPorSucursal[iSucursal].listaTransfer[iTransfer].listaProductos[iTransferProductos].isProductoFacturacionDirecta) {
                                    resultado += listaCarritoTransferPorSucursal[iSucursal].listaTransfer[iTransfer].listaProductos[iTransferProductos].cantidad;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return resultado;
}
function onkeypressEnter(e, elemento) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        onClickBuscar();
    }
}
function onNullBuscar(pValor) {
    DesmarcarFilaSeleccionada();
    selectedInput = null;
    selectInputCarrito = null;
    selectedInputTransfer = null;
}
function DesmarcarFilaSeleccionada() {
    $('.cssFilaBuscadorDesmarcar').removeClass('borderFilaBuscadorSeleccionada');
}
function onfocusSucursal(pValor) {
    selectInputCarrito = null;
    selectedInputTransfer = null;
    selectedInput = pValor;
    setTimeout(function () { selectedInput.select(); MarcarFilaSeleccionada(pValor); }, 5);
}
function MarcarFilaSeleccionada(pValor) {
    if (!$("#divBody").hasClass("modal-open-Celular")) {
        DesmarcarFilaSeleccionada();
        var nombre = pValor.id;
        nombre = nombre.replace('inputSuc', '');
        var palabrasBase = nombre.split("_");
        var fila = parseInt(palabrasBase[0]);
        $('.cssFilaBuscador_' + fila).addClass('borderFilaBuscadorSeleccionada');
    }
}
//////////////////////////
function onblurSucursal(pValor) {
    var nombre = pValor.id;
    nombre = nombre.replace('inputSuc', '');
    var palabrasBase = nombre.split("_");
    var fila = parseInt(palabrasBase[0]);
    var columna = parseInt(palabrasBase[1]);
    onblurSucursal_base(pValor.value, fila, columna);
}

function onblurSucursal_base(pCantidad, pFila, pColumna) {
    var isModificoBD = false;
    var isCambioValor_SubirPedido = false;
    var fila = pFila;
    var columna = pColumna;
    if (isNotNullEmpty(pCantidad)) {
        var isPasarBase = false;
        if (isSubirPedido)
            isPasarBase = true;
        else {
            // Calcular si producto transfer
            var cantidadComparativa = ObtenerCantidadProductoMasTransfer(listaSucursal[columna], listaProductosBuscados[fila].pro_codigo);
            if (cantidadComparativa != pCantidad)
                isPasarBase = true;
        }
        if (isPasarBase) {
            var isNotMaximaCantidadSuperada = true;
            if (listaProductosBuscados[fila].pro_canmaxima != null) {
                if (listaProductosBuscados[fila].pro_canmaxima < pCantidad) {
                    isNotMaximaCantidadSuperada = false;
                }
            }
            if (isNotMaximaCantidadSuperada) {
                //Inicio Cantidad producto parametrizada
                if (cantidadMaximaParametrizada != null) {
                    if (parseInt(cantidadMaximaParametrizada) > 0) {
                        if (parseInt(cantidadMaximaParametrizada) < parseInt(pCantidad)) {
                            isExcedeImporte = true;
                            ExcedeImporteFila = fila;
                            ExcedeImporteColumna = columna;
                            ExcedeImporteValor = pCantidad;
                            funMostrarMensajeCantidadSuperada();
                        }
                    }
                }
                //Fin Cantidad producto parametrizada
                if (isExcedeImporte) {

                } else {
                    var isValidarSoloTransferFacturacionDirecta = funValidarSoloTransferFacturacionDirecta(listaProductosBuscados[fila], listaSucursal[columna], pCantidad, true);
                    if (isValidarSoloTransferFacturacionDirecta) {
                        isCambioValor_SubirPedido = true;
                        if (isSubirPedido) {
                            Log('onblurSucursal_base:' + '1');
                            AgregarAlHistorialProductoCarrito(fila, columna, pCantidad, true);
                            isModificoBD = true;
                            setearValorInputBuscador(pCantidad, fila, columna);
                        } else {
                            Log('onblurSucursal_base:' + '2' + ' - pCantidad: ' + pCantidad);
                            var resultadoCantidadCambio = CargarProductoCantidadDependiendoTransfer(fila, columna, pCantidad);
                            isModificoBD = true;
                            //if (resultadoCantidadCambio != pCantidad) {
                            setearValorInputBuscador(resultadoCantidadCambio, fila, columna);
                            //}
                        }
                    }
                }
            } else {
                mensaje_informacion(MostrarTextoSuperaCantidadMaxima(listaProductosBuscados[fila].pro_nombre, listaProductosBuscados[fila].pro_canmaxima));
                var cantidadAnterior = ObtenerCantidadProducto(listaSucursal[columna], listaProductosBuscados[fila].pro_codigo);
                setearValorInputBuscador(cantidadAnterior, fila, columna);
            }
        } // else  if (cantidadComparativa == pValor.value) {
    } else {
        isCambioValor_SubirPedido = true;
        if (isSubirPedido) {
            Log('onblurSucursal_base:' + '3');
            AgregarAlHistorialProductoCarrito(fila, columna, 0, true);
            isModificoBD = true;
            setearValorInputBuscador(0, fila, columna);
        } else {
            // Borrar en el carrito o colocarlo en 0     
            var cantidad = ObtenerCantidadProducto(listaSucursal[columna], listaProductosBuscados[fila].pro_codigo);
            if (cantidad != '') {
                Log('onblurSucursal_base:' + '4');
                AgregarAlHistorialProductoCarrito(fila, columna, 0, true);
                isModificoBD = true;
            }
        }
    }
    if (isSubirPedido) {


        CargarUnidadesRenglones();

        // Actualizar bp-td-colorProductoDestacar
        if (isCambioValor_SubirPedido && listaProductosBuscados[fila].isPermitirPedirProducto && listaProductosBuscados[fila].isMostrarTransfersEnClientesPerf) {
            var isRemarcarFila = false;
            //var varValores = ObtenerCantidadProductoDependiendoTransfer(fila, listaSucursal[columna], pCantidad);
            Log('onblurSucursal_base:' + '0');
            var varValores = CargarProductoCantidadDependiendoTransfer_base(fila, columna, pCantidad, true);
            if ((varValores[1] == 0 && varValores[2]) || (varValores[0] > 0 && varValores[3])) {
                isRemarcarFila = true;
            }
            if (isRemarcarFila) {
                $('.cssFilaBuscador_' + fila).addClass('violeta');//bp-td-colorProductoDestacar
            } else {
                $('.cssFilaBuscador_' + fila).removeClass('violeta');//bp-td-colorProductoDestacar
            }
        }
        // Fin Actualizar bp-td-colorProductoDestacar

    }
    else {
        //if (!isExcedeImporte) {
        //    if (isEnterExcedeImporte) {
        //        isEnterExcedeImporte = false;
        //        if (!$("#divBody").hasClass("modal-open-Celular")) {
        //            jQuery("#txtBuscador").val('');
        //            onClickBuscar();
        //            document.getElementById('txtBuscador').focus();
        //        }
        //    }
        //}
        if (!isExcedeImporte) {
            if (isEnterExcedeImporte && isModificoBD == false) {
                isEnterExcedeImporte = false;
                if (!$("#divBody").hasClass("modal-open-Celular")) {
                    jQuery("#txtBuscador").val('');
                    onClickBuscar();
                    document.getElementById('txtBuscador').focus();
                }
            }
        }
    }
}
function isMostrarSoloTransfer_FacturacionDirecta(pProducto) {
    var result = false;
    if (pProducto.pro_vtasolotransfer != null && pProducto.pro_vtasolotransfer == 1
        && pProducto.tfr_facturaciondirecta != null && pProducto.tfr_facturaciondirecta == 1) {
            result = true;       
    }
    return result;
}
function funValidarSoloTransferFacturacionDirecta(pProducto, pIdSucursal, pCantidad, pIsDesdeBuscador) {
    var result = true;
    if (isSoloTransferFacturacionDirecta(pProducto, pIdSucursal, pCantidad, pIsDesdeBuscador) && pCantidad != 0) {
        result = false;
        volverCantidadAnterior_buscador(pIdSucursal, pProducto.pro_codigo);
        var htmlMensaje = '<p>' + cuerpo_error + '</p><ul><li>' + pProducto.pro_nombre + '</li></ul>';
        mensaje_transfer(titulo_transferDirecto, htmlMensaje);
    }
    return result;
}
function isSoloTransferFacturacionDirecta(pProducto, pIdSucursal, pCantidad, pIsDesdeBuscador) {
    var result = false;
    if (pProducto.pro_vtasolotransfer == 1 && pProducto.tfr_facturaciondirecta == 1) {
        var cantidadCarritoComun = isSoloTransferFacturacionDirecta_logica_return_CantidadCarritoComun(pProducto, pIdSucursal, pCantidad, false);
        if (cantidadCarritoComun > 0) { 
            result = true;
        }
    }
    return result;
}
function isSoloTransferFacturacionDirecta_logica_return_CantidadCarritoComun(pProducto, pIdSucursal, pCantidad, pIsSubirPedido) {

    var resultadoReturn = pCantidad;
    var isPasarDirectamente = false;
    var cantidadCarritoTransfer = 0;
    var cantidadCarritoComun = 0;
    var ProductoIsTransferDirecto_subirPedido = false;
    var IsProductoMostrarFaltaCantidadOferta_subirPedido = false;

    if (pProducto.isProductoFacturacionDirecta) { // facturacion directa
        // Combiene transfer o promocion                      
        var precioConDescuentoDependiendoCantidad = CalcularPrecioProductosEnCarrito(pProducto.PrecioFinal, pCantidad, pProducto.pro_ofeunidades, pProducto.pro_ofeporcentaje);
        if (pCantidad == 0) {
            //
        } else {
            precioConDescuentoDependiendoCantidad = precioConDescuentoDependiendoCantidad / pCantidad;
        }
        if (parseFloat(precioConDescuentoDependiendoCantidad) >= parseFloat(pProducto.PrecioFinalTransfer)) {
            var isSumarTransfer = false;

            if (pProducto.tde_muluni != null && pProducto.tde_unidadesbonificadas != null) {
                ProductoIsTransferDirecto_subirPedido = true;
                /// UNIDAD MULTIPLO Y BONIFICADA
                if ((pCantidad >= pProducto.tde_muluni) && (pCantidad <= (pProducto.tde_muluni + pProducto.tde_unidadesbonificadas))) {
                    // es multiplo
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = pProducto.tde_muluni + pProducto.tde_unidadesbonificadas;
                } else if (pCantidad > (pProducto.tde_muluni + pProducto.tde_unidadesbonificadas)) {
                    isSumarTransfer = true;
                    var cantidadMultiplicar = parseInt(pCantidad / pProducto.tde_muluni);
                    cantidadCarritoTransfer = cantidadMultiplicar * (pProducto.tde_muluni + pProducto.tde_unidadesbonificadas);
                    //
                    for (var iCantMulti = 0; iCantMulti < cantidadMultiplicar; iCantMulti++) {
                        var cantTemp = iCantMulti * (pProducto.tde_muluni + pProducto.tde_unidadesbonificadas);
                        if (cantTemp >= pCantidad) {
                            cantidadCarritoTransfer = cantTemp; //  iCantMulti * (pProducto.tde_muluni + pProducto.tde_unidadesbonificadas);
                            break;
                        }
                    }
                    //
                    if (cantidadCarritoTransfer == pCantidad) {

                    } else {
                        if (pCantidad < cantidadCarritoTransfer) {
                            //resultadoReturn = cantidadCarritoTransfer;
                            cantidadCarritoComun = 0;
                        } else {
                            cantidadCarritoComun = pCantidad - cantidadCarritoTransfer;
                        }
                        if ((cantidadCarritoComun >= pProducto.tde_muluni) && (cantidadCarritoComun <= (pProducto.tde_muluni + pProducto.tde_unidadesbonificadas))) {
                            cantidadCarritoTransfer += pProducto.tde_muluni + pProducto.tde_unidadesbonificadas;
                            cantidadCarritoComun = 0;
                        }
                    }
                }
                if (isSumarTransfer) {
                    if (!pIsSubirPedido) {
                        // sumar a transfer
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = pProducto.tde_codpro; // Para la funcion en el servidor
                        objProducto.codProducto  = pProducto.tde_codpro; 
                        objProducto.tde_codpro = pProducto.tde_codpro;
                        objProducto.cantidad = cantidadCarritoTransfer;
                        tempListaProductos.push(objProducto);

                        if (cantidadCarritoComun == 0) {
                            var cantidad = ObtenerCantidadProducto(pIdSucursal, pProducto.pro_codigo);
                            if (cantidad != '') {

                            }
                        } else {

                        }
                    }
                } else {
                    isPasarDirectamente = true;
                }
                /// FIN UNIDAD MULTIPLO Y BONIFICADA
            } // fin if (pProducto.tde_muluni != null && pProducto.tde_unidadesbonificadas != null){
            else if (pProducto.tde_fijuni != null) {
                ProductoIsTransferDirecto_subirPedido = true;
                // UNIDAD FIJA
                if (pCantidad == pProducto.tde_fijuni) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = pProducto.tde_fijuni;
                } else if (pCantidad > pProducto.tde_fijuni) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = pProducto.tde_fijuni;
                    cantidadCarritoComun = pCantidad - pProducto.tde_fijuni;
                }
                if (isSumarTransfer) {
                    if (!pIsSubirPedido) {
                        // sumar a transfer
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = pProducto.tde_codpro; // Para la funcion en el servidor
                        objProducto.codProducto  = pProducto.tde_codpro; 
                        objProducto.tde_codpro = pProducto.tde_codpro;
                        objProducto.cantidad = cantidadCarritoTransfer;
                        tempListaProductos.push(objProducto);

                        if (cantidadCarritoComun == 0) {
                            var cantidad = ObtenerCantidadProducto(pIdSucursal, pProducto.pro_codigo);
                            if (cantidad != '') {

                            }
                        } else {

                        }
                    }
                } else {
                    isPasarDirectamente = true;
                }
                // FIN UNIDAD FIJA
            } else if (pProducto.tde_minuni != null && pProducto.tde_maxuni != null) {
                ProductoIsTransferDirecto_subirPedido = true;
                // UNIDAD MAXIMA Y MINIMA
                if (pProducto.tde_minuni <= pCantidad && pProducto.tde_maxuni >= pCantidad) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = pCantidad;
                } else if (pProducto.tde_maxuni < pCantidad) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = pProducto.tde_maxuni;
                    cantidadCarritoComun = pCantidad - pProducto.tde_maxuni;
                }
                if (isSumarTransfer) {
                    if (!pIsSubirPedido) {
                        // sumar a transfer
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = pProducto.tde_codpro; // Para la funcion en el servidor
                        objProducto.codProducto  = pProducto.tde_codpro; 
                        objProducto.tde_codpro = pProducto.tde_codpro;
                        objProducto.cantidad = cantidadCarritoTransfer;
                        tempListaProductos.push(objProducto);

                        if (cantidadCarritoComun == 0) {
                            var cantidad = ObtenerCantidadProducto(pIdSucursal, pProducto.pro_codigo);
                            if (cantidad != '') {

                            }
                        } else {

                        }
                    }
                } else {
                    isPasarDirectamente = true;
                }
                // FIN UNIDAD MAXIMA Y MINIMA
            }
            else if (pProducto.tde_minuni != null) {
                ProductoIsTransferDirecto_subirPedido = true;
                // UNIDAD MINIMA
                if (pProducto.tde_minuni <= pCantidad) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = pCantidad;
                }
                if (isSumarTransfer) {
                    if (!pIsSubirPedido) {
                        // sumar a transfer
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = pProducto.tde_codpro; // Para la funcion en el servidor
                        objProducto.codProducto  = pProducto.tde_codpro; 
                        objProducto.tde_codpro = pProducto.tde_codpro;
                        objProducto.cantidad = cantidadCarritoTransfer;
                        tempListaProductos.push(objProducto);
                        if (cantidadCarritoComun == 0) {
                            var cantidad = ObtenerCantidadProducto(pIdSucursal, pProducto.pro_codigo);
                            if (cantidad != '') {

                            }
                        } else {

                        }
                    }
                } else {
                    isPasarDirectamente = true;
                }
                // FIN UNIDAD MINIMA
            }
        } // fin if (pProducto.PrecioConDescuentoOferta > pProducto.PrecioFinalTransfer){
        else {
            isPasarDirectamente = true;
            if (pIsSubirPedido) {
                // is oferta
                if (pCantidad < pProducto.pro_ofeunidades) {
                    IsProductoMostrarFaltaCantidadOferta_subirPedido = true;
                }
            }
        }
    } else {
        isPasarDirectamente = true;
        if (pIsSubirPedido) {
            if (pCantidad < pProducto.pro_ofeunidades) {
                IsProductoMostrarFaltaCantidadOferta_subirPedido = true;
            }
        }
    }
    if (isPasarDirectamente) {
        cantidadCarritoComun = parseInt(pCantidad);
        if (!pIsSubirPedido) {
            var cantidadTransfer = ObtenerCantidadProductoTransfer(pIdSucursal, pProducto.pro_codigo);
            if (cantidadTransfer != '') {
                var tempListaProductos = [];
                var objProducto = new jcTransfersProductos();
                objProducto.codProductoNombre = pProducto.tde_codpro; // Para la funcion en el servidor
                objProducto.codProducto  = pProducto.tde_codpro; 
                objProducto.tde_codpro = pProducto.tde_codpro;
                objProducto.cantidad = 0;
                tempListaProductos.push(objProducto);
            }
        }
    }
    if (pIsSubirPedido) {
        var resultadoReturn_subirPedido = [];
        resultadoReturn_subirPedido.push(cantidadCarritoComun);
        resultadoReturn_subirPedido.push(cantidadCarritoTransfer);
        resultadoReturn_subirPedido.push(ProductoIsTransferDirecto_subirPedido);
        resultadoReturn_subirPedido.push(IsProductoMostrarFaltaCantidadOferta_subirPedido);
        return resultadoReturn_subirPedido;
    } else {
        resultadoReturn = parseInt(cantidadCarritoComun);//= parseInt(cantidadCarritoTransfer) + parseInt(cantidadCarritoComun);
        return resultadoReturn;
    }
}
function MostrarTextoSuperaCantidadMaxima(pNombreProducto, pCantidadMaxima) {
    //return 'El producto: ' + pNombreProducto + ' \n' + 'Supera la cantidad máxima: ' + pCantidadMaxima;
    return 'El producto: ' + pNombreProducto + '  <br/>' + 'Supera la cantidad máxima: ' + pCantidadMaxima;
}
function funMostrarMensajeCantidadSuperada() {
    isMoverCursor = false;
    mensaje_confirmar(mensajeCantidadSuperaElMaximoParametrizado1 + cantidadMaximaParametrizada + mensajeCantidadSuperaElMaximoParametrizado2, 'funExcedeImporteAceptar(); return false;', 'funExcedeImporteCancelar(); return false;');
}
function funExcedeImporteAceptar() {
    if (isNotNullEmpty(ExcedeImporteFila) && isNotNullEmpty(ExcedeImporteColumna) && isNotNullEmpty(ExcedeImporteValor)) {
        if (isSubirPedido) {
            Log('funExcedeImporteAceptar:' + '1');
            AgregarAlHistorialProductoCarrito(ExcedeImporteFila, ExcedeImporteColumna, ExcedeImporteValor, true);
        } else {
            Log('funExcedeImporteAceptar:' + '0');
            var resultadoCantidadCambio = CargarProductoCantidadDependiendoTransfer(ExcedeImporteFila, ExcedeImporteColumna, ExcedeImporteValor);
            if (ExcedeImporteValor != resultadoCantidadCambio) {
                genericInputSucValue(ExcedeImporteFila, ExcedeImporteColumna, resultadoCantidadCambio);
                //var mytext = $("#inputSuc" + ExcedeImporteFila + "_" + ExcedeImporteColumna);
                //if (mytext.length > 0) {
                //} else {
                //    mytext = null;
                //}
                //if (mytext != null) {
                //    mytext.val(resultadoCantidadCambio);
                //}
            }
        }

        modalModuloAlertHide();
        if (isEnterExcedeImporte) {
            if (!$("#divBody").hasClass("modal-open-Celular")) {
                jQuery("#txtBuscador").val('');
                onClickBuscar();
                document.getElementById('txtBuscador').focus();
            }
        } else {
            genericInputSucSelect();
            if (ExcedeImporteSiguienteFila != null && ExcedeImporteSiguienteColumna != null) {
                genericInputSucSelect(ExcedeImporteSiguienteFila, ExcedeImporteSiguienteColumna);
                //var mytext = $("#inputSuc" + ExcedeImporteSiguienteFila + "_" + ExcedeImporteSiguienteColumna);
                //if (mytext.length > 0) {
                //} else {
                //    mytext = null;
                //}
                //if (mytext != null) {
                //    mytext.select();
                //}

            }
        }
        if (isSubirPedido) {
            CargarUnidadesRenglones();
        }
        isEnterExcedeImporte = false;
        isExcedeImporte = false;
        isMoverCursor = true;
        ExcedeImporteFila = null;
        ExcedeImporteColumna = null;
        ExcedeImporteValor = null;
    }

}
function genericInputSucValue(pFila, pColumna, pValue) {
    if (pFila != null && pColumna != null) {
        var mytext = $("#inputSuc" + pFila + "_" + pColumna);
        if ($("#divBody").hasClass("modal-open-Celular")) {
            mytext = $("#inputSucCelular" + pFila + "_" + pColumna);
        }
        if (mytext.length > 0) {
        } else {
            mytext = null;
        }
        if (mytext != null) {
            mytext.val(pValue);
        }
    }
}

function genericInputSucSelect(pFila, pColumna) {
    if (pFila != null && pColumna != null) {
        var mytext = $("#inputSuc" + pFila + "_" + pColumna);
        if ($("#divBody").hasClass("modal-open-Celular")) {
            mytext = $("#inputSucCelular" + pFila + "_" + pColumna);
        }
        if (mytext.length > 0) {
        } else {
            mytext = null;
        }
        if (mytext != null) {
            mytext.select();
        }
    }
}
function genericInputSucGetValue(pFila, pColumna) {
    if (pFila != null && pColumna != null) {
        var mytext = $("#inputSuc" + pFila + "_" + pColumna);
        if ($("#divBody").hasClass("modal-open-Celular")) {
            mytext = $("#inputSucCelular" + pFila + "_" + pColumna);
        }
        if (mytext.length > 0) {
        } else {
            mytext = null;
        }
        if (mytext != null) {
            return mytext.val();
        }
    }
    return '';
}

function funExcedeImporteCancelar() {
    if (ExcedeImporteFila != null && ExcedeImporteColumna != null && ExcedeImporteValor != null) {
        genericInputSucSelect(ExcedeImporteFila, ExcedeImporteColumna);
        //var mytext = $("#inputSuc" + ExcedeImporteFila + "_" + ExcedeImporteColumna);
        //if (mytext.length > 0) {
        //} else {
        //    mytext = null;
        //}
        //if (mytext != null) {
        //    mytext.select();
        //}

        modalModuloAlertHide();
        isEnterExcedeImporte = false;
        isExcedeImporte = false;
        isMoverCursor = true;
        ExcedeImporteFila = null;
        ExcedeImporteColumna = null;
        ExcedeImporteValor = null;
    }
}
function CargarProductoCantidadDependiendoTransfer(pFila, pColumna, pCantidad) {
    Log('CargarProductoCantidadDependiendoTransfer:' + '0');
    return CargarProductoCantidadDependiendoTransfer_base(pFila, pColumna, pCantidad, false);
}
function CargarProductoCantidadDependiendoTransfer_base(pFila, pColumna, pCantidad, pIsSubirPedido) {

    var resultadoReturn = pCantidad;
    var isPasarDirectamente = false;
    var cantidadCarritoTransfer = 0;
    var cantidadCarritoComun = 0;
    var ProductoIsTransferDirecto_subirPedido = false;
    var IsProductoMostrarFaltaCantidadOferta_subirPedido = false;

    if (listaProductosBuscados[pFila].isProductoFacturacionDirecta) { // facturacion directa
        // Combiene transfer o promocion                      
        var precioConDescuentoDependiendoCantidad = CalcularPrecioProductosEnCarrito(listaProductosBuscados[pFila].PrecioFinal, pCantidad, listaProductosBuscados[pFila].pro_ofeunidades, listaProductosBuscados[pFila].pro_ofeporcentaje);
        if (pCantidad == 0) {
            //
        } else {
            precioConDescuentoDependiendoCantidad = precioConDescuentoDependiendoCantidad / pCantidad;
        }
        if (parseFloat(precioConDescuentoDependiendoCantidad) >= parseFloat(listaProductosBuscados[pFila].PrecioFinalTransfer)) {
            var isSumarTransfer = false;

            if (listaProductosBuscados[pFila].tde_muluni != null && listaProductosBuscados[pFila].tde_unidadesbonificadas != null) {
                ProductoIsTransferDirecto_subirPedido = true;
                /// UNIDAD MULTIPLO Y BONIFICADA
                if ((pCantidad >= listaProductosBuscados[pFila].tde_muluni) && (pCantidad <= (listaProductosBuscados[pFila].tde_muluni + listaProductosBuscados[pFila].tde_unidadesbonificadas))) {
                    // es multiplo
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = listaProductosBuscados[pFila].tde_muluni + listaProductosBuscados[pFila].tde_unidadesbonificadas;
                } else if (pCantidad > (listaProductosBuscados[pFila].tde_muluni + listaProductosBuscados[pFila].tde_unidadesbonificadas)) {
                    isSumarTransfer = true;
                    var cantidadMultiplicar = parseInt(pCantidad / listaProductosBuscados[pFila].tde_muluni);
                    cantidadCarritoTransfer = cantidadMultiplicar * (listaProductosBuscados[pFila].tde_muluni + listaProductosBuscados[pFila].tde_unidadesbonificadas);
                    //
                    for (var iCantMulti = 0; iCantMulti < cantidadMultiplicar; iCantMulti++) {
                        var cantTemp = iCantMulti * (listaProductosBuscados[pFila].tde_muluni + listaProductosBuscados[pFila].tde_unidadesbonificadas);
                        if (cantTemp >= pCantidad) {
                            cantidadCarritoTransfer = cantTemp; //  iCantMulti * (listaProductosBuscados[pFila].tde_muluni + listaProductosBuscados[pFila].tde_unidadesbonificadas);
                            break;
                        }
                    }
                    //
                    if (cantidadCarritoTransfer == pCantidad) {

                    } else {
                        if (pCantidad < cantidadCarritoTransfer) {
                            //resultadoReturn = cantidadCarritoTransfer;
                            cantidadCarritoComun = 0;
                        } else {
                            cantidadCarritoComun = pCantidad - cantidadCarritoTransfer;
                        }
                        if ((cantidadCarritoComun >= listaProductosBuscados[pFila].tde_muluni) && (cantidadCarritoComun <= (listaProductosBuscados[pFila].tde_muluni + listaProductosBuscados[pFila].tde_unidadesbonificadas))) {
                            cantidadCarritoTransfer += listaProductosBuscados[pFila].tde_muluni + listaProductosBuscados[pFila].tde_unidadesbonificadas;
                            cantidadCarritoComun = 0;
                        }
                    }
                }
                if (isSumarTransfer) {
                    if (!pIsSubirPedido) {
                        // sumar a transfer
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = listaProductosBuscados[pFila].tde_codpro; // Para la funcion en el servidor
                        objProducto.codProducto  = listaProductosBuscados[pFila].tde_codpro; 
                        objProducto.tde_codpro = listaProductosBuscados[pFila].tde_codpro;
                        objProducto.cantidad = cantidadCarritoTransfer;
                        tempListaProductos.push(objProducto);
                        //PageMethods.AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador, OnFail);
                        Log('CargarProductoCantidadDependiendoTransfer_base:' + '1');
                        AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                        if (cantidadCarritoComun == 0) {
                            var cantidad = ObtenerCantidadProducto(listaSucursal[pColumna], listaProductosBuscados[pFila].pro_codigo);
                            if (cantidad != '') {
                                Log('CargarProductoCantidadDependiendoTransfer_base:' + '2');
                                AgregarAlHistorialProductoCarrito(pFila, pColumna, 0, true);
                            }
                        } else {
                            Log('CargarProductoCantidadDependiendoTransfer_base:' + '3');
                            AgregarAlHistorialProductoCarrito(pFila, pColumna, cantidadCarritoComun, true);
                        }
                    }
                } else {
                    isPasarDirectamente = true;
                }
                /// FIN UNIDAD MULTIPLO Y BONIFICADA
            } // fin if (listaProductosBuscados[pFila].tde_muluni != null && listaProductosBuscados[pFila].tde_unidadesbonificadas != null){
            else if (listaProductosBuscados[pFila].tde_fijuni != null) {
                ProductoIsTransferDirecto_subirPedido = true;
                // UNIDAD FIJA
                if (pCantidad == listaProductosBuscados[pFila].tde_fijuni) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = listaProductosBuscados[pFila].tde_fijuni;
                } else if (pCantidad > listaProductosBuscados[pFila].tde_fijuni) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = listaProductosBuscados[pFila].tde_fijuni;
                    cantidadCarritoComun = pCantidad - listaProductosBuscados[pFila].tde_fijuni;
                }
                if (isSumarTransfer) {
                    if (!pIsSubirPedido) {
                        // sumar a transfer
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = listaProductosBuscados[pFila].tde_codpro; // Para la funcion en el servidor
                        objProducto.codProducto  = listaProductosBuscados[pFila].tde_codpro; 
                        objProducto.tde_codpro = listaProductosBuscados[pFila].tde_codpro;
                        objProducto.cantidad = cantidadCarritoTransfer;
                        tempListaProductos.push(objProducto);
                        //PageMethods.AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador, OnFail);
                        AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                        if (cantidadCarritoComun == 0) {
                            var cantidad = ObtenerCantidadProducto(listaSucursal[pColumna], listaProductosBuscados[pFila].pro_codigo);
                            if (cantidad != '') {
                                Log('CargarProductoCantidadDependiendoTransfer_base:' + '4');
                                AgregarAlHistorialProductoCarrito(pFila, pColumna, 0, true);
                            }
                        } else {
                            Log('CargarProductoCantidadDependiendoTransfer_base:' + '5');
                            AgregarAlHistorialProductoCarrito(pFila, pColumna, cantidadCarritoComun, true);
                        }
                    }
                } else {
                    isPasarDirectamente = true;
                }
                // FIN UNIDAD FIJA
            } else if (listaProductosBuscados[pFila].tde_minuni != null && listaProductosBuscados[pFila].tde_maxuni != null) {
                ProductoIsTransferDirecto_subirPedido = true;
                // UNIDAD MAXIMA Y MINIMA
                if (listaProductosBuscados[pFila].tde_minuni <= pCantidad && listaProductosBuscados[pFila].tde_maxuni >= pCantidad) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = pCantidad;
                } else if (listaProductosBuscados[pFila].tde_maxuni < pCantidad) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = listaProductosBuscados[pFila].tde_maxuni;
                    cantidadCarritoComun = pCantidad - listaProductosBuscados[pFila].tde_maxuni;
                }
                if (isSumarTransfer) {
                    if (!pIsSubirPedido) {
                        // sumar a transfer
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = listaProductosBuscados[pFila].tde_codpro; // Para la funcion en el servidor
                        objProducto.codProducto  = listaProductosBuscados[pFila].tde_codpro; 
                        objProducto.tde_codpro = listaProductosBuscados[pFila].tde_codpro;
                        objProducto.cantidad = cantidadCarritoTransfer;
                        tempListaProductos.push(objProducto);
                        //PageMethods.AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador, OnFail);
                        AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                        if (cantidadCarritoComun == 0) {
                            var cantidad = ObtenerCantidadProducto(listaSucursal[pColumna], listaProductosBuscados[pFila].pro_codigo);
                            if (cantidad != '') {
                                Log('CargarProductoCantidadDependiendoTransfer_base:' + '6');
                                AgregarAlHistorialProductoCarrito(pFila, pColumna, 0, true);
                            }
                        } else {
                            Log('CargarProductoCantidadDependiendoTransfer_base:' + '7');
                            AgregarAlHistorialProductoCarrito(pFila, pColumna, cantidadCarritoComun, true);
                        }
                    }
                } else {
                    isPasarDirectamente = true;
                }
                // FIN UNIDAD MAXIMA Y MINIMA
            }
            else if (listaProductosBuscados[pFila].tde_minuni != null) {
                ProductoIsTransferDirecto_subirPedido = true;
                // UNIDAD MINIMA
                if (listaProductosBuscados[pFila].tde_minuni <= pCantidad) {
                    isSumarTransfer = true;
                    cantidadCarritoTransfer = pCantidad;
                }
                if (isSumarTransfer) {
                    if (!pIsSubirPedido) {
                        // sumar a transfer
                        var tempListaProductos = [];
                        var objProducto = new jcTransfersProductos();
                        objProducto.codProductoNombre = listaProductosBuscados[pFila].tde_codpro; // Para la funcion en el servidor
                        objProducto.codProducto  = listaProductosBuscados[pFila].tde_codpro; 
                        objProducto.tde_codpro = listaProductosBuscados[pFila].tde_codpro;
                        objProducto.cantidad = cantidadCarritoTransfer;
                        tempListaProductos.push(objProducto);
                        //PageMethods.AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador, OnFail);
                        AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                        if (cantidadCarritoComun == 0) {
                            var cantidad = ObtenerCantidadProducto(listaSucursal[pColumna], listaProductosBuscados[pFila].pro_codigo);
                            if (cantidad != '') {
                                Log('CargarProductoCantidadDependiendoTransfer_base:' + '8');
                                AgregarAlHistorialProductoCarrito(pFila, pColumna, 0, true);
                            }
                        } else {
                            Log('CargarProductoCantidadDependiendoTransfer_base:' + '9');
                            AgregarAlHistorialProductoCarrito(pFila, pColumna, cantidadCarritoComun, true);
                        }
                    }
                } else {
                    isPasarDirectamente = true;
                }
                // FIN UNIDAD MINIMA
            }
        } // fin if (listaProductosBuscados[pFila].PrecioConDescuentoOferta > listaProductosBuscados[pFila].PrecioFinalTransfer){
        else {
            isPasarDirectamente = true;
            if (pIsSubirPedido) {
                // is oferta
                if (pCantidad < listaProductosBuscados[pFila].pro_ofeunidades) {
                    IsProductoMostrarFaltaCantidadOferta_subirPedido = true;
                }
            }
        }
    } else {
        isPasarDirectamente = true;
        if (pIsSubirPedido) {
            if (pCantidad < listaProductosBuscados[pFila].pro_ofeunidades) {
                IsProductoMostrarFaltaCantidadOferta_subirPedido = true;
            }
        }
    }
    if (isPasarDirectamente) {
        cantidadCarritoComun = parseInt(pCantidad);
        if (!pIsSubirPedido) {
            Log('CargarProductoCantidadDependiendoTransfer_base:' + '10');
            AgregarAlHistorialProductoCarrito(pFila, pColumna, pCantidad, true);
            var cantidadTransfer = ObtenerCantidadProductoTransfer(listaSucursal[pColumna], listaProductosBuscados[pFila].pro_codigo); // ObtenerCantidadProducto(listaSucursal[pColumna], listaProductosBuscados[pFila].pro_codigo);
            if (cantidadTransfer != '') {
                //AgregarAlHistorialProductoCarrito(pFila, pColumna, 0, true);
                var tempListaProductos = [];
                var objProducto = new jcTransfersProductos();
                objProducto.codProductoNombre = listaProductosBuscados[pFila].tde_codpro; // Para la funcion en el servidor
                objProducto.codProducto  = listaProductosBuscados[pFila].tde_codpro; 
                objProducto.tde_codpro = listaProductosBuscados[pFila].tde_codpro;
                objProducto.cantidad = 0;
                tempListaProductos.push(objProducto);
                //PageMethods.AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador, OnFail);
                AgregarProductosTransfersAlCarrito(tempListaProductos, listaProductosBuscados[pFila].tde_codtfr, listaSucursal[pColumna], 'OnCallBackAgregarProductosTransfersAlCarritoDesdeBuscador');
                $('#divContenedorBaseTransfer_' + listaSucursal[pColumna]).html('');
            }
        }
    }
    if (pIsSubirPedido) {
        var resultadoReturn_subirPedido = [];
        resultadoReturn_subirPedido.push(cantidadCarritoComun);
        resultadoReturn_subirPedido.push(cantidadCarritoTransfer);
        resultadoReturn_subirPedido.push(ProductoIsTransferDirecto_subirPedido);
        resultadoReturn_subirPedido.push(IsProductoMostrarFaltaCantidadOferta_subirPedido);
        return resultadoReturn_subirPedido;
    } else {
        resultadoReturn = parseInt(cantidadCarritoTransfer) + parseInt(cantidadCarritoComun);
        return resultadoReturn;
    }
}
function ReAjustarColumnasBuscador() {
    var wProducto = $('.th1ColumnaCabecera').css('width');
    $('.th1ColumnaCabeceraBody').css('width', wProducto);
}
function OnCallBackRecuperarProductos(args) {
    if (args !== null) {
        if (args !== '') {
            var strHtml = '';
            args = eval('(' + args + ')');
            listaSucursal = args.listaSucursal;
            listaProductosBuscados = args.listaProductos;


            var cssTh_cabecera = ' class="col-lg-3 col-md-3 col-sm-3 col-xs-9 text-left no-padding" ';
            var cssTd_cabeceraBody = ' col-lg-5 col-md-5 text-left ';
            var cssFootTd1 = ' col-lg-10 col-md-9 ';
            var cssFootTd2 = ' col-lg-1 col-md-1 text-center ';
            var cssFootTd3 = ' col-lg-1 col-md-1 text-center no-padding ';
            var cssFootTd3Div = ' col-xs-12 col_small flex_8 ';
            switch (listaSucursal.length) {
                case 1:
                    cssTh_cabecera = ' class="col-lg-5 col-md-5 text-left th1ColumnaCabecera"  ';
                    cssTd_cabeceraBody = ' col-lg-5 col-md-5 text-left th1ColumnaCabeceraBody ';
                    cssFootTd1 = ' col-lg-10 col-md-9 ';
                    cssFootTd2 = ' col-lg-1 col-md-1 text-center ';
                    cssFootTd3 = ' col-lg-1 col-md-1 text-center no-padding ';
                    cssFootTd3Div = ' col-xs-12 col_small flex_8 ';
                    break;
                case 2:
                    cssTh_cabecera = ' class="col-lg-4 col-md-4 col-sm-3 col-xs-9 text-left th1ColumnaCabecera"  ';
                    cssTd_cabeceraBody = ' col-lg-4 col-md-4 col-sm-3 text-left th1ColumnaCabeceraBody ';
                    cssFootTd1 = ' col-lg-9 col-md-9 ';
                    cssFootTd2 = ' col-lg-1 col-md-1 col-sm-1 text-center ';
                    cssFootTd3 = ' col-lg-3 col-md-3 col-sm-1 col-xs-1 text-center no-padding ';
                    cssFootTd3Div = ' col-xs-6 col_small flex_8 ';
                    break;
                case 3:
                    cssTh_cabecera = ' class="col-lg-3 col-md-3 col-sm-3 col-xs-9 text-left th1ColumnaCabecera"  ';
                    cssTd_cabeceraBody = ' col-lg-3 col-md-3 col-sm-3 text-left th1ColumnaCabeceraBody ';
                    cssFootTd1 = ' col-lg-8 col-md-8 ';
                    cssFootTd2 = ' col-lg-1 col-md-1 col-sm-1 text-center ';
                    cssFootTd3 = ' col-lg-3 col-md-3 col-sm-1 col-xs-1 text-center no-padding ';
                    cssFootTd3Div = ' col-xs-4 col_small flex_8 ';
                    break;
                case 4:
                    cssTh_cabecera = ' class="col-lg-2 col-md-2 col-sm-2 col-xs-9 text-left th1ColumnaCabecera"  ';
                    cssTd_cabeceraBody = ' col-lg-3 col-md-3 col-sm-3 text-left th1ColumnaCabeceraBody ';
                    cssFootTd1 = ' col-lg-8 col-md-8 ';
                    cssFootTd2 = ' col-lg-1 col-md-1 col-sm-1 text-center ';
                    cssFootTd3 = ' col-lg-3 col-md-3 col-sm-1 col-xs-1 text-center no-padding ';
                    cssFootTd3Div = ' col-xs-4 col_small flex_8 ';
                    break;
                default:
                    break;
            }
            cantMaxFila = listaProductosBuscados.length;
            cantMaxColumna = listaSucursal.length;

            var classSubirPedidoTheadTr1 = '';
            if (isSubirPedido) {
                cssTh_cabecera += ' colspan="2" ';
                strHtml += '<div class="div_subirpedido hidden-xs hidden-sm">';
                strHtml += '<div class="div_tblsubirpedido_head scroll">';
                strHtml += '<table class="footable table table-stripped" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
                classSubirPedidoTheadTr1 = ' style="border-top: none !important" ';
            }
            else {
                strHtml += '<table class="footable table table-stripped hidden-xs" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            }
            strHtml += '<thead>';
            strHtml += '<tr ' + classSubirPedidoTheadTr1 + '>';
            //
            strHtml += '<th ' + cssTh_cabecera + ' >';// strHtml += '<th class="bp-off-top-left thOrdenar porCamara_cabecera" rowspan="2" onclick="onclickOrdenarProducto(-1)"><div class="bp-top-left">Detalle Producto</div></th>';

            if (isSubirPedido) {
                strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr><td colspan="2" class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
                strHtml += '<tr class="tr_thead">';
                strHtml += '<td class="col-lg-10 col-md-10 pl text-left no_border click"><span data-toggle="tooltip" data-placement="bottom" title="Ordenar" onclick="onclickOrdenarProducto(-1)">Producto</span><span id="spanOrder_1" class="order ' + getCSSColumnaOrdenar(-1) + '"></span></td>';
                strHtml += '<td class="col-lg-2 text-center click no-padding hidden-md" data-toggle="tooltip" data-placement="bottom" title="Ordenar" onclick="onclickOrdenarProducto(4)">Orden <span id="spanOrder4" class="order ' + getCSSColumnaOrdenar(4) + '"></span></td>';
                strHtml += '<td class="col-md-2 text-center click no-padding visible-md" data-toggle="tooltip" data-placement="bottom" onclick="onclickOrdenarProducto(4)">Or <span id="spanOrder4b" class="order ' + getCSSColumnaOrdenar(4) + '"></span></td>';
                strHtml += '</tr>';
                strHtml += '</table>';
            } else {
                strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></td></tr>';
                strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-left pl click" data-toggle="tooltip" data-placement="bottom" title="Ordenar" onclick="onclickOrdenarProducto(-1)">Producto <span id="spanOrder_1" class="order ' + getCSSColumnaOrdenar(-1) + '"></span></td></tr>';
                strHtml += '</table>'
            }

            strHtml += '</th>';

            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2  text-center" colspan="2">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td colspan="2" class="col-lg-12 text-center">Habitual<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead">';
            strHtml += '<td class="col-lg-6 text-center click no_border" onclick="onclickOrdenarProducto(0)"><span data-toggle="tooltip" data-placement="bottom" title="Ordenar">P&uacute;blico</span><span id="spanOrder0" class="order ' + getCSSColumnaOrdenar(0) + '"></span></td>';
            strHtml += '<td class="col-lg-6 text-center click"  data-toggle="tooltip" data-placement="bottom" title="Ordenar" onclick="onclickOrdenarProducto(1)">Precio<span id="spanOrder1" class="order ' + getCSSColumnaOrdenar(1) + '"></span></td>';
            strHtml += '</tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            //
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td colspan="3" class="col-lg-12 text-center">Oferta<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead">';
            strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center no_border">% PVP</td>';
            strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center no_border">Min</td>';
            strHtml += '<td class="col-lg-6 col-md-6 col-sm-6 click text-center" data-toggle="tooltip" data-placement="bottom" title="Ordenar" onclick="onclickOrdenarProducto(2)">Precio<span id="spanOrder2" class="order ' + getCSSColumnaOrdenar(2) + '"></span></td>';
            strHtml += '</tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            //
            //if (!isCarritoDiferido) {
            var col_lg_transfer_pvp = 4;
            var col_md_transfer_pvp = 5;
            var col_sm_transfer_pvp = 5;

            var col_lg_transfer_cond = 3;
            var col_md_transfer_cond = 2;
            var col_sm_transfer_cond = 2;

            var col_lg_transfer_precio = 5;
            var col_md_transfer_precio = 5;
            var col_sm_transfer_precio = 5;
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2  text-center" colspan="2">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td colspan="3" class="col-lg-12 text-center">Transfer<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead">';
            strHtml += '<td class="col-lg-' + col_lg_transfer_pvp + ' col-md-' + col_md_transfer_pvp + ' col-sm-' + col_sm_transfer_pvp + '  text-center no_border">% PVP</td>';
            strHtml += '<td class="col-lg-' + col_lg_transfer_cond + ' col-md-' + col_md_transfer_cond + ' col-sm-' + col_sm_transfer_cond + '  text-center no_border">Cond</td>';
            strHtml += '<td class="col-lg-' + col_lg_transfer_precio + ' col-md-' + col_md_transfer_precio + ' col-sm-' + col_sm_transfer_precio + '  text-center click" data-toggle="tooltip" data-placement="bottom" title="Ordenar"  onclick="onclickOrdenarProducto(3)">Precio<span  id="spanOrder3" class="order ' + getCSSColumnaOrdenar(3) + '"></span></td>';
            strHtml += '</tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            //}

            for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
                strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding">';
                strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
                strHtml += '<tr><td class="col-lg-12 text-center ">&nbsp;<div class="clear5"></div></td></tr>';
                strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">' + ConvertirSucursalParaColumna(listaSucursal[iEncabezadoSucursal]) + '</td></tr>';
                strHtml += '</table>';
                strHtml += '</th>';
            }



            strHtml += '</tr>';
            strHtml += '</thead>';
            /////////////////////////////

            if (isSubirPedido) {
                strHtml += '</table>';
                strHtml += '</div>';
                strHtml += '<div class="div_tblsubirpedido_cont">';
                strHtml += '<table class="footable table table-stripped mb_0" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            }
            /////////////////////////////

            strHtml += '<tbody>';
            if (listaProductosBuscados.length > 0) {
                for (var i = 0; i < listaProductosBuscados.length; i++) {
                    var isNotGLNisTrazable = false;
                    var isMostrarImput = true;
                    if (cli_isGLN() !== null) {
                        if (!cli_isGLN()) {
                            if (listaProductosBuscados[i].pro_isTrazable) {
                                isNotGLNisTrazable = true;
                                isMostrarImput = false;
                            }
                        }
                    }
                    if (!isMostrarImput_AceptaPsicotropicos(listaProductosBuscados[i].pro_codtpovta)) {
                        isMostrarImput = false;
                    }
                    var strTrColorFondo = ' wht';
                    if (i % 2 !== 0) {
                        strTrColorFondo = ' grs';
                    }
                    // subir archivo
                    if (isSubirPedido) {
                        if (listaProductosBuscados[i].isProductoNoEncontrado) {
                            strTrColorFondo += ' rosa ';
                        }
                        var isRemarcarFila = false;
                        for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
                            Log('OnCallBackRecuperarProductos:' + '0');
                            var varValores = CargarProductoCantidadDependiendoTransfer_base(i, iEncabezadoSucursal, listaProductosBuscados[i].cantidad, true);
                            if ((varValores[1] == 0 && varValores[2]) || (varValores[0] > 0 && varValores[3])) {
                                isRemarcarFila = true;
                                break;
                            }
                        }
                        if (isRemarcarFila && cli_tomaTransfers() && listaProductosBuscados[i].isMostrarTransfersEnClientesPerf && listaProductosBuscados[i].isPermitirPedirProducto) {
                            strTrColorFondo += ' violeta ';
                        }
                    }
                    // fin
                    strHtml += '<tr class="' + strTrColorFondo + ' cssFilaBuscadorDesmarcar cssFilaBuscador_' + i + '">';
                    var strHtmlColorFondo = '';
                    var tdBodyClass = '';
                    if (isSubirPedido) {
                        tdBodyClass = cssTd_cabeceraBody;
                    }
                    strHtml += '<td class="' + tdBodyClass + ' tdNombreProducto tdSeparadorGrilla';
                    strHtml += strHtmlColorFondo + '" ';//'">';
                    strHtml += ' OnMouseMove="OnMouseMoveProdructo(event)" OnMouseOver="OnMouseOverProdructo(' + i + ')" OnMouseOut="OnMouseOutProdructo()"  onclick="onclickRecuperarTransfer(' + i + '); return false;" >'
                    if (isSubirPedido) {
                        strHtml += '<div class="col-lg-10 col-md-10 col-sm-10 div_prod_sp">';
                    }
                    strHtml += listaProductosBuscados[i].pro_nombre;//AgregarMark( listaProductosBuscados[i].pro_nombre);
                    if (isNotGLNisTrazable) {
                        strHtml += '<span class="p_trazable">Producto trazable. Farmacia sin GLN.</span>';
                    }
                    if (cli_tomaTransfers() && listaProductosBuscados[i].isMostrarTransfersEnClientesPerf) {
                        if (listaProductosBuscados[i].isTieneTransfer) {
                            strHtml += '<span class="trf">TRANSFER COMBO</span>';//'<span>&nbsp;&nbsp;&raquo;&nbsp;Transfer Combo</span>';
                        } else if (listaProductosBuscados[i].isProductoFacturacionDirecta) {
                            strHtml += '<span class="trf">TRF</span>';//'<span>&nbsp;&nbsp;&raquo;&nbsp;TRF</span>';
                        }
                        // Mostrar solo producto Transfer 
                        if (listaProductosBuscados[i].pro_vtasolotransfer) {
                            strHtml += '<span class="p_trazable">Se vende solo por transfer</span>';// '<span class="spanProductoTrazableCLiSinGLN" >&nbsp;&nbsp;&nbsp;Se vende solo por transfer</span>';
                        }
                    }
                    // Alto Costo
                    if (listaProductosBuscados[i].pro_AltoCosto) {
                        strHtml += htmlAltoCosto;
                        isMostrarImput = false;
                    }

                    // Vale Psicotropicos
                    if (listaProductosBuscados[i].isValePsicotropicos) {
                        strHtml += '<span class="p_trazable" >Requiere Vale</span>';
                        isMostrarImput = false;
                    }
                    // FIN Vale Psicotropicos
                    // + IVA
                    if (listaProductosBuscados[i].pro_neto) {
                        strHtml += '<span class="iva">+IVA</span>';
                    }
                    // FIN + IVA
                    // Producto erroneo
                    if (listaProductosBuscados[i].isProductoNoEncontrado) {
                        strHtml += '<span class="p_erronero">REGISTRO ERRONEO</span>';
                    }

                    // Ver si mostrar input solo producto Transfer 
                    if (listaProductosBuscados[i].pro_vtasolotransfer && !isMostrarSoloTransfer_FacturacionDirecta(listaProductosBuscados[i])) {//if (listaProductosBuscados[i].pro_vtasolotransfer && !listaProductosBuscados[i].isTablaTransfersClientes) 
                            isMostrarImput = false;                        
                    }

                    if (listaProductosBuscados[i].pri_nombreArchivo !== null) {//onclickAmpliarImagen(\'' + listaProductosBuscados[i].pri_nombreArchivo + '\')
                        strHtml += '<i class="fa fa-camera color_emp_st pull-right" onclick="onclickAmpliarImagen(' + i + ');"></i>';//style="width:20px;height:20px; "
                    }
                    if (isSubirPedido) {
                        strHtml += '</div>';
                        strHtml += '<div class="col-lg-2 col-md-2 col-sm-2 col_small">' + listaProductosBuscados[i].nroordenamiento + '</div>';//&nbsp;
                    }


                    strHtml += '</td>';


                    //

                    //

                    //
                    var precioPublico = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[i].pro_precio.toFixed(2));
                    if (listaProductosBuscados[i].pro_precio === 0) {
                        precioPublico = '';
                    }

                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 text-center">' + precioPublico + '</td>';



                    var precioHabitual = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[i].PrecioFinal.toFixed(2));
                    if (listaProductosBuscados[i].pro_nombre.match("^PAÑAL PAMI AD")) {
                        precioHabitual = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[i].pro_preciofarmacia.toFixed(2));
                    }
                    if (listaProductosBuscados[i].pro_AltoCosto) {
                        precioHabitual = '';
                    }
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 text-center tdSeparadorGrilla">' + precioHabitual + '</td>';


                    var varOfeunidades = ' &nbsp; ';
                    var varOfeporcentaje = ' &nbsp; ';
                    var varPrecioConDescuentoOferta = ' &nbsp; ';
                    if (cli_tomaOfertas()) {
                        if (listaProductosBuscados[i].pro_ofeunidades !== 0 || listaProductosBuscados[i].pro_ofeporcentaje !== 0) {
                            varOfeunidades = listaProductosBuscados[i].pro_ofeunidades;
                            //varOfeporcentaje = listaProductosBuscados[i].pro_ofeporcentaje;
                            varOfeporcentaje = FormatoDecimalConDivisorMiles(getPorcDtoSobreOferta(i).toFixed(2));
                            varPrecioConDescuentoOferta = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[i].PrecioConDescuentoOferta.toFixed(2));
                        }
                    }
                    //Oferta
                    strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 text-center no-padding tdSeparadorGrilla">';
                    strHtml += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 col_small">' + varOfeporcentaje + '</div>';
                    strHtml += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 col_small">' + varOfeunidades + '</div>';
                    strHtml += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 col_small">' + varPrecioConDescuentoOferta + '</div>'
                    strHtml += '</td>';
                    // FIn Oferta
                    // NUEVO Transfer facturacion directa
                    //if (!isCarritoDiferido) {
                    var varTransferFacturacionDirectaCondicion = '';
                    var varTransferFacturacionDirectaPrecio = '';
                    if (cli_tomaTransfers() && listaProductosBuscados[i].isMostrarTransfersEnClientesPerf) {
                        if (listaProductosBuscados[i].isProductoFacturacionDirecta) {
                            if (listaProductosBuscados[i].tde_unidadesbonificadasdescripcion !== null) {
                                varTransferFacturacionDirectaCondicion = listaProductosBuscados[i].tde_unidadesbonificadasdescripcion;
                            }
                            if (listaProductosBuscados[i].PrecioFinalTransfer !== null) {
                                varTransferFacturacionDirectaPrecio = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[i].PrecioFinalTransfer.toFixed(2));
                            }
                        }
                    }
                    // inicio transfer

                    strHtml += '<td colspan="2" class="col-lg-2 col-md-2 col-sm-2 text-center no-padding tdSeparadorGrilla">';
                    strHtml += '<div class="col-lg-' + col_lg_transfer_pvp + ' col-md-' + col_md_transfer_pvp + ' col-sm-' + col_sm_transfer_pvp + ' col-xs-' + col_sm_transfer_pvp + ' col_small">';
                    if (listaProductosBuscados[i].tde_PorcDtoSobrePVP !== null) {
                        strHtml += FormatoDecimalConDivisorMiles(getPorcDtoSobrePVP(i).toFixed(2));
                    }
                    strHtml += '</div>';
                    //
                    strHtml += '<div class="col-lg-' + col_lg_transfer_cond + ' col-md-' + col_md_transfer_cond + ' col-sm-' + col_sm_transfer_cond + ' col-xs-' + col_sm_transfer_cond + ' col_small">';
                    if (varTransferFacturacionDirectaCondicion !== '') {
                        strHtml += '<div  OnMouseMove="OnMouseMoveProdructoFacturacionDirecta(event)" OnMouseOver="OnMouseOverProdructoFacturacionDirecta(' + i + ')" OnMouseOut="OnMouseOutProdructoFacturacionDirecta()"  style="cursor:pointer;" >'
                        strHtml += varTransferFacturacionDirectaCondicion;
                        strHtml += '</div>';
                    }
                    strHtml += '</div>';
                    //
                    strHtml += '<div class="col-lg-' + col_lg_transfer_precio + ' col-md-' + col_md_transfer_precio + ' col-sm-' + col_sm_transfer_precio + ' col-xs-' + col_sm_transfer_precio + ' col_small">' + varTransferFacturacionDirectaPrecio + '</div>'
                    strHtml += '</td>';
                    // inicio columna PVP 
                    //strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 text-center">';
                    //strHtml += '</td>';
                    // fin columna PVP
                    //
                    //strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 text-center">';
                    //if (varTransferFacturacionDirectaCondicion !== '') {
                    //    strHtml += '<div  OnMouseMove="OnMouseMoveProdructoFacturacionDirecta(event)" OnMouseOver="OnMouseOverProdructoFacturacionDirecta(' + i + ')" OnMouseOut="OnMouseOutProdructoFacturacionDirecta()"  style="cursor:pointer;" >'
                    //    strHtml += varTransferFacturacionDirectaCondicion;
                    //    strHtml += '</div>';
                    //}
                    //strHtml += '</td>';
                    //strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 text-center">' + varTransferFacturacionDirectaPrecio + '</td>';
                    // fin transfer
                    //}
                    // NUEVO Transfer facturacion directa

                    // Optimizar
                    for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
                        strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">';
                        var isDibujarStock = false;
                        if (intPaginadorTipoDeRecuperar !== 2) {// todo transfer
                            isDibujarStock = true;
                        } // fin      if (intPaginadorTipoDeRecuperar != 2) { 
                        else { // si selecciona todo transfer y es producto facturacion directa
                            //if (!isCarritoDiferido) {
                            if (listaProductosBuscados[i].isProductoFacturacionDirecta) {
                                isDibujarStock = true;
                            }
                            //}
                        }
                        if (isDibujarStock) {
                            for (var iSucursal = 0; iSucursal < listaProductosBuscados[i].listaSucursalStocks.length; iSucursal++) {
                                if (listaProductosBuscados[i].listaSucursalStocks[iSucursal].stk_codsuc === listaSucursal[iEncabezadoSucursal]) {
                                    var isMostrarImputSucursal = true;
                                    var isMostrarImputPerfu = true;
                                    var is_pedirCC = true;
                                    strHtml += '<div class="' + getNameClassStock(listaProductosBuscados[i].listaSucursalStocks[iSucursal].stk_stock) + '"></div>';
                                    if (isMostrarImput) {
                                        is_pedirCC = isMostrarImput_pedirCC(listaProductosBuscados[i].pro_codtpopro, listaSucursal[iEncabezadoSucursal], listaProductosBuscados[i].listaSucursalStocks);
                                    }
                                    if (isMostrarImput) { //(pIndexSucursal, pIndexProducto)
                                        isMostrarImputSucursal = isMostrarImput_FacturaTrazablesProvincia(listaSucursal[iEncabezadoSucursal], listaProductosBuscados[i].pro_isTrazable);
                                    }
                                    if (isMostrarImput && listaProductosBuscados[i].pro_codtpopro == "P") {
                                        isMostrarImputPerfu = MostrarImputPerfu(listaProductosBuscados[i].pro_codtpopro, listaSucursal[iEncabezadoSucursal], listaProductosBuscados[i].listaSucursalStocks);
                                    }
                                    //if (listaSucursal[iEncabezadoSucursal] == "CB" && listaProductosBuscados[i].pro_codtpopro == "P") {
                                    //    isMostrarImputPerfu = false;
                                    //}
                                    if (isMostrarImput && isMostrarImputSucursal && isMostrarImputPerfu && is_pedirCC) {
                                        // Cargar Cantidad
                                        var cantidadDeProductoEnCarrito = '';
                                        if (isSubirPedido) {
                                            //cantidadDeProductoEnCarrito = listaProductosBuscados[i].listaSucursalStocks[iSucursal].cantidadSucursal;
                                            cantidadDeProductoEnCarrito = listaProductosBuscados[i].listaSucursalStocks[iSucursal].cantidadSucursal;
                                            if (cantidadDeProductoEnCarrito == 0 && !isMostrarImput_pedirCC(listaProductosBuscados[i].pro_codtpopro, 'CC', listaProductosBuscados[i].listaSucursalStocks)) {
                                                var cantidadDeProductoEnCarrito_temp = getCantidad_SubirArchivo_pedirCC(listaProductosBuscados[i].pro_codtpopro, listaSucursal[iEncabezadoSucursal], listaProductosBuscados[i].listaSucursalStocks);
                                                if (isNotNullEmpty(cantidadDeProductoEnCarrito_temp)) {
                                                    cantidadDeProductoEnCarrito = cantidadDeProductoEnCarrito_temp;
                                                }
                                            }
                                        } else {
                                            cantidadDeProductoEnCarrito = ObtenerCantidadProductoMasTransfer(listaSucursal[iEncabezadoSucursal], listaProductosBuscados[i].pro_codigo);
                                        }
                                        var typeInput = ' type="text" ';
                                        if (isMobile())
                                            typeInput = ' type="number" ';
                                        strHtml += '<input class="form-shop cssFocusCantProdCarrito" id="inputSuc' + i + "_" + iEncabezadoSucursal + '" ' + typeInput + ' onfocus="onfocusSucursal(this)" onblur="onblurSucursal(this)" onkeypress="return onKeypressCantProductos(event)" value="' + cantidadDeProductoEnCarrito + '" ></input>';
                                    }
                                    //strHtml += '</div>';
                                    break;
                                }
                            }
                        }
                        strHtml += '</td>';
                    }
                    //}
                    strHtml += '</tr>';
                }
            } else {
                strHtml += '<tr><td colspan="8" class="text-center"><p class="color_red">La búsqueda no arroja resultados</p></td></tr>';
            }
            strHtml += '</tbody>';

            if (isSubirPedido) {
                strHtml += '</table>';
                strHtml += '</div>';
                strHtml += '<div class="div_tblsubirpedido_foot">';
                strHtml += '<table class="footable table table-stripped" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">';

                var strHtml_part_1 = '';
                var strHtml_part_2 = '';
                for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
                    strHtml_part_1 += '<div  id="tdRenglones_' + iEncabezadoSucursal + '" class="' + cssFootTd3Div + '" ></div>';
                    strHtml_part_2 += '<div id="tdUnidades_' + iEncabezadoSucursal + '" class="' + cssFootTd3Div + '" ></div>';
                }

                strHtml += '<tfoot>';
                strHtml += '<tr>';
                strHtml += '<td colspan="5" class="' + cssFootTd1 + '"></td>';
                strHtml += '<td class="' + cssFootTd2 + '">Renglones</td>';
                strHtml += '<td class="' + cssFootTd3 + '">';
                strHtml += strHtml_part_1
                strHtml += '</td>';
                strHtml += '</tr>';

                strHtml += '<tr>';
                strHtml += '<td colspan="5" class="' + cssFootTd1 + '"></td>';
                strHtml += '<td class="' + cssFootTd2 + '">Unidades</td>';
                strHtml += '<td class="' + cssFootTd3 + '">';
                strHtml += strHtml_part_2;
                strHtml += '</td>';
                strHtml += '</tr>';

                strHtml += '</tfoot>';
                strHtml += '</table>';
                strHtml += '</div>';
                strHtml += '<div><a class="btn_emp float-right" href="#" data-toggle="modal" data-target="#modalCargarPedido" onclick="CargarPedido(); return false;">CARGAR PEDIDO</a></div>';
                strHtml += '</div>';
            } else {
                strHtml += '</table>';
            }


            document.getElementById('divResultadoBuscador').innerHTML = strHtml + getHtmlTablaResolucionCelular();
            // Elejir el primer producto
            $(".btn_buscar").focus();
            focusPrimerProductoHabilitado();
            if (isSubirPedido) {
                setTimeout(function () { CargarUnidadesRenglones(); }, 300);
                setTimeout(function () { ReAjustarColumnasBuscador(); }, 40);
            }
        }
    }
}
function getPorcDtoSobrePVP(pIndex) {
    var result = 0;
    if (listaProductosBuscados[pIndex].tde_PorcDtoSobrePVP !== null) {
        if (listaProductosBuscados[pIndex].tfr_deshab) {
            var Dto1 = parseFloat(listaProductosBuscados[pIndex].tde_PorcDtoSobrePVP);
            var varTemp_cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto = cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto();
            if (varTemp_cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto == null) {
                varTemp_cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto = 0;
            }
            var varTemp_tde_PorcARestarDelDtoDeCliente = listaProductosBuscados[pIndex].tde_PorcARestarDelDtoDeCliente;
            if (varTemp_tde_PorcARestarDelDtoDeCliente == null) {
                varTemp_tde_PorcARestarDelDtoDeCliente = 0;
            }
            var Dto2 = parseFloat(varTemp_cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto) - parseFloat(varTemp_tde_PorcARestarDelDtoDeCliente);
            var PorcDtoSobrePVP = ((parseFloat(1) - ((parseFloat(1) - (parseFloat(Dto1) / parseFloat(100))) * (parseFloat(1) - (parseFloat(Dto2) / parseFloat(100))))) * parseFloat(100));
            var isRedondeo = true;
            if (listaProductosBuscados[pIndex].tfr_pordesadi !== null && listaProductosBuscados[pIndex].tfr_pordesadi > 0) {
                var Dto3 = PorcDtoSobrePVP;
                var Dto4 = parseFloat(listaProductosBuscados[pIndex].tfr_pordesadi);
                PorcDtoSobrePVP = ((parseFloat(1) - ((parseFloat(1) - (parseFloat(Dto3) / parseFloat(100))) * (parseFloat(1) - (parseFloat(Dto4) / parseFloat(100))))) * parseFloat(100));
            } else if (listaProductosBuscados[pIndex].tde_PorcDtoSobrePVP == 0) {
                isRedondeo = false;
            }
            if (isRedondeo) {
                result = (PorcDtoSobrePVP - 0.0041).toFixedDown(2);
            } else {
                result = PorcDtoSobrePVP;
            }
        }
        else {
            result = listaProductosBuscados[pIndex].tde_PorcDtoSobrePVP;
        }
    }
    return result;

}
function getPorcDtoSobreOferta(pIndex) {
    var result = listaProductosBuscados[pIndex].pro_ofeporcentaje;

    var varTemp_tde_PorcARestarDelDtoDeCliente = listaProductosBuscados[pIndex].tde_PorcARestarDelDtoDeCliente;
    if (varTemp_tde_PorcARestarDelDtoDeCliente == null) {
        varTemp_tde_PorcARestarDelDtoDeCliente = 0;
    }
    //1) Si pro_Neto=0
    if (!listaProductosBuscados[pIndex].pro_neto) {  //pro_Neto=0
        var Dto1 = parseFloat(listaProductosBuscados[pIndex].pro_ofeporcentaje);
        var varTemp_cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto = cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto();
        if (varTemp_cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto == null) {
            varTemp_cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto = 0;
        }
        var Dto2 = parseFloat(varTemp_cli_PorcentajeDescuentoDeEspecialidadesMedicinalesDirecto) - parseFloat(varTemp_tde_PorcARestarDelDtoDeCliente);
        var PorcDtoSobrePVP = ((parseFloat(1) - ((parseFloat(1) - (parseFloat(Dto1) / parseFloat(100))) * (parseFloat(1) - (parseFloat(Dto2) / parseFloat(100))))) * parseFloat(100));
        result = (PorcDtoSobrePVP - 0.0041).toFixedDown(2);
    } else if (listaProductosBuscados[pIndex].pro_neto && listaProductosBuscados[pIndex].pro_precio === 0) { //2) Si pro_Neto=1  y  pro_ProPrecio=0 -->
        var Dto1 = parseFloat(listaProductosBuscados[pIndex].pro_ofeporcentaje);
        var Dto2 = 0;
        if (listaProductosBuscados[pIndex].pro_codtpopro == 'M') {
            var varTemp_PorcentajeDescuentoDeNetosMedicamentos = cli_nickname_PorcentajeDescuentoDeNetosMedicamentos();
            if (varTemp_PorcentajeDescuentoDeNetosMedicamentos == null) {
                varTemp_PorcentajeDescuentoDeNetosMedicamentos = 0;
            }
            Dto2 = parseFloat(varTemp_PorcentajeDescuentoDeNetosMedicamentos) - parseFloat(varTemp_tde_PorcARestarDelDtoDeCliente);
        } else {
            var varTemp_PorcentajeDescuentoDeNetos = cli_nickname_PorcentajeDescuentoDeNetos();
            if (varTemp_PorcentajeDescuentoDeNetos == null) {
                varTemp_PorcentajeDescuentoDeNetos = 0;
            }
            Dto2 = parseFloat(varTemp_PorcentajeDescuentoDeNetos) - parseFloat(varTemp_tde_PorcARestarDelDtoDeCliente);
        }
        var PorcDtoSobrePVP = ((parseFloat(1) - ((parseFloat(1) - (parseFloat(Dto1) / parseFloat(100))) * (parseFloat(1) - (parseFloat(Dto2) / parseFloat(100))))) * parseFloat(100));
        result = (PorcDtoSobrePVP - 0.0041).toFixedDown(2);
    } else if (listaProductosBuscados[pIndex].pro_neto && listaProductosBuscados[pIndex].pro_precio > 0) { //3) Si pro_Neto=1 y pro_precio >0 -->
        result = ((parseFloat(1) - (parseFloat(listaProductosBuscados[pIndex].PrecioConDescuentoOferta) / (parseFloat(listaProductosBuscados[pIndex].pro_precio) / parseFloat(1.21)))) * parseFloat(100));
    }
    return result;

}
function AgregarAlHistorialProductoCarrito_SubirPedido(pIndexProducto, pIndexSucursal, pCantidadProducto, pIsSumarCantidad) {
    for (var iSucursal = 0; iSucursal < listaProductosBuscados[pIndexProducto].listaSucursalStocks.length; iSucursal++) {
        if (listaProductosBuscados[pIndexProducto].listaSucursalStocks[iSucursal].stk_codsuc == listaSucursal[pIndexSucursal]) {
            listaProductosBuscados[pIndexProducto].listaSucursalStocks[iSucursal].cantidadSucursal = pCantidadProducto;
            ModificarCantidadProductos(listaProductosBuscados[pIndexProducto].pro_codigo, listaSucursal[pIndexSucursal], pCantidadProducto);
            //PageMethods.ModificarCantidadProductos(pIndexProducto, iSucursal, pCantidadProducto, OnCallBackModificarCantidadProductos, OnFail);
            break;
        } // fin        if (listaProductosBuscados[pIndexProducto].listaSucursalStocks[iSucursal].stk_codsuc == listaSucursal[pIndexProducto]) {

    } // fin  for (var iSucursal = 0; iSucursal < listaProductosBuscados[pIndexProducto].listaSucursalStocks.length; iSucursal++) {

}
function AgregarAlHistorialProductoCarrito(pIndexProducto, pIndexSucursal, pCantidadProducto, pIsSumarCantidad) {
    if (isSubirPedido) {

        AgregarAlHistorialProductoCarrito_SubirPedido(pIndexProducto, pIndexSucursal, pCantidadProducto, pIsSumarCantidad);
    }
    else {
        Log('AgregarAlHistorialProductoCarrito:' + '1' + ' - pCantidad: ' + pCantidadProducto);
        CargarOActualizarListaCarrito(listaSucursal[pIndexSucursal], listaProductosBuscados[pIndexProducto].pro_codigo, pCantidadProducto, true);
    }
}
function CargarOActualizarListaCarrito(pIdSucursal, pIdProduco, pCantidadProducto, pIsDesdeBuscador) {
    tempIdSucursal = pIdSucursal;
    tempIdProduco = pIdProduco;
    tempCantidadProducto = parseInt(pCantidadProducto);
    tempIsDesdeBuscador = pIsDesdeBuscador;

    if (isCarritoDiferido) {
        CargarCarritoDiferido(pIdSucursal, pIdProduco, pCantidadProducto);
    } else {
        ActualizarProductoCarrito(pIdProduco, pIdSucursal, pCantidadProducto);
    }

}
function teclaPresionada_enPagina(e) {
    if (typeof (e) == 'undefined') {
        e = event;
    }
    var keyCode = document.all ? e.which : e.keyCode;

    if (keyCode == 37 || keyCode == 39 || keyCode == 40 || keyCode == 38 || keyCode == 13) {
        if (selectedInput != null) {
            if (selectedInput.id != undefined) {
                if (isMoverCursor) {
                    if (keyCode == 13) {
                        isEnterExcedeImporte = true;
                        isEnterExcedeImporte_msgError = true;
                        onblurSucursal(selectedInput);

                        //                                            if (!isExcedeImporte) {
                        //                                                onblurSucursal(selectedInput);
                        //                                                jQuery("#txtBuscador").val('');
                        //                                                onClickBuscar();
                        //                                                document.getElementById('txtBuscador').focus();
                        //                                            }
                        return;
                    }
                    var fila = 0;
                    var columna = 0;

                    var nombre = selectedInput.id;
                    nombre = nombre.replace('inputSuc', '');
                    var palabrasBase = nombre.split("_");
                    fila = parseInt(palabrasBase[0]);
                    columna = parseInt(palabrasBase[1]);
                    var mytext = null;
                    while (mytext == null) {
                        var isSalirWhile = false;
                        switch (keyCode) {
                            case 37: //izquierda
                                if (columna != 0) {
                                    columna--;
                                }
                                else {
                                    isSalirWhile = true;
                                }
                                break;
                            case 38: //arriba
                                if (fila != 0) {
                                    fila--;
                                } else {
                                    isSalirWhile = true;
                                }
                                break;
                            case 39: //derecha
                                if (columna < cantMaxColumna - 1) {
                                    columna++;
                                } else {
                                    isSalirWhile = true;
                                }
                                break;
                            case 40: //abajo
                                if (fila < cantMaxFila - 1) {
                                    fila++;
                                } else {
                                    isSalirWhile = true;
                                }
                                break;
                            default:
                                break;
                        }
                        if (isSalirWhile) {
                            break;
                        }
                        mytext = $("#inputSuc" + fila + "_" + columna);
                        if (mytext.length > 0) {
                        } else {
                            mytext = null;
                        }
                    }
                    ExcedeImporteSiguienteFila = null;
                    ExcedeImporteSiguienteColumna = null;
                    if (mytext != null) {
                        ExcedeImporteSiguienteFila = fila;
                        ExcedeImporteSiguienteColumna = columna;
                        mytext.focus();
                    }
                } // if (isMoverCursor) {
            }
        } else if (selectInputCarrito != null) {

            if (isMoverCursor) {
                var isActualizarActual_enter = false;
                var indiceCarrito = -1;
                var indiceCarritoProducto = -1;

                var nombre = selectInputCarrito.id;
                nombre = nombre.replace('inputCarrito', '');
                var palabrasBase = nombre.split("_");
                indiceCarrito = parseInt(palabrasBase[0]);
                indiceCarritoProducto = parseInt(palabrasBase[1]);
                ExcedeImporteIndiceCarrito = indiceCarrito;
                ExcedeImporteIndiceCarritoProducto = indiceCarritoProducto;

                var cantMaxFilaCarrito = listaCarritos[indiceCarrito].listaProductos.length;
                var isSalirWhileCarrito = false;
                switch (keyCode) {
                    case 38: //arriba
                        if (indiceCarritoProducto != 0) {
                            indiceCarritoProducto--;
                        } else { isSalirWhileCarrito = true; }
                        break;
                    case 40: //abajo
                        if (indiceCarritoProducto < cantMaxFilaCarrito - 1) {
                            indiceCarritoProducto++;
                        } else { isSalirWhileCarrito = true; }
                        break;
                    case 13: // Enter
                        isActualizarActual_enter = true;
                        break;
                    default:
                        break;
                }
                var objCarrito = null;
                //
                ExcedeImporteSiguienteIndiceCarrito = indiceCarrito;
                ExcedeImporteSiguienteIndiceCarritoProducto = indiceCarritoProducto;
                //
                if (!isSalirWhileCarrito) {
                    objCarrito = $("#inputCarrito" + indiceCarrito + "_" + indiceCarritoProducto);
                    if (objCarrito.length <= 0) {
                        objCarrito = null;
                    }
                }
                if (isActualizarActual_enter) {
                    if (objCarrito != null) {
                        onblurInputCarrito(selectInputCarrito);
                    }
                } else {
                    if (objCarrito != null) {
                        objCarrito.focus();
                    }
                }
            }

        } else if (selectedInputTransfer != null) {
            if (isMoverCursor) {
                var indiceTransfer = -1;
                var indiceTransferProducto = -1;
                var nombre = selectedInputTransfer.id;
                nombre = nombre.replace('txtProdTransf', '');
                var palabrasBase = nombre.split("_");
                indiceTransfer = parseInt(palabrasBase[0]);
                indiceTransferProducto = parseInt(palabrasBase[1]);
                var cantMaxFilaTransfer = listaTransfer[indiceTransfer].listaDetalle.length;
                switch (keyCode) {
                    case 38: //arriba
                        if (indiceTransferProducto != 0) {
                            indiceTransferProducto--;
                        }
                        break;
                    case 40: //abajo
                        if (indiceTransferProducto < cantMaxFilaTransfer - 1) {
                            indiceTransferProducto++;
                        }
                        break;
                    default:
                        break;
                }
                var objTransfer = $("#txtProdTransf" + indiceTransfer + "_" + indiceTransferProducto);
                if (objTransfer.length <= 0) {
                    objTransfer = null;
                }
                if (objTransfer != null) {
                    objTransfer.focus();
                }
            }
        }
    }
    return true;
}

function onKeypressCantProductos(pEvent) {

    pEvent = pEvent || window.event;
    var code = pEvent.charCode || pEvent.keyCode;
    //    alert(code);
    //    code == 8  borrar <---
    //    code == 9 tab
    //    code == 46 Supr
    //    code == 37 <-
    //    code == 39 ->
    if (code == 8 || code == 9 || code == 46 || code == 37 || code == 39) {
        return true;
    }
    if (code < 48 || code > 57) {
        return false;
    }
    return true;
}
/////////

function CargarCarritos() {
    if (listaCarritos != null) {
        for (var i = 0; i < listaCarritos.length; i++) {
            $('#divContenedorBase_' + listaCarritos[i].codSucursal).html(AgregarCarritoHtml(i));
            setScrollFinDeCarrito(i);
        }
    }
}
function OnCallBackCargarCarritoDiferido(args) {
    OnCallBackActualizarProductoCarrito(args);
}
function OnCallBackActualizarProductoCarrito(args) {
    if (isNotNullEmpty(args)) {
        var isActualizarCarrito = false;
        try {
            args = eval('(' + args + ')');
            isActualizarCarrito = args.isOk;
        } catch (e) {

        }
        if (isActualizarCarrito) {
            if (tempIdSucursal != null && tempIdProduco != null && tempCantidadProducto != null && tempIsDesdeBuscador != null) {
                if (listaCarritos == null) {
                    listaCarritos = [];
                }
                actualizarCarrito(tempIdSucursal, tempIdProduco, tempCantidadProducto, tempIsDesdeBuscador);
            }
        }
        else {
            // error
            if (tempIdSucursal != null && tempIdProduco != null && tempCantidadProducto != null && tempIsDesdeBuscador != null) {
                if (tempIsDesdeBuscador) {
                    volverCantidadAnterior_buscador(tempIdSucursal, tempIdProduco);
                } else {
                    volverCantidadAnterior_carrito(tempIdSucursal, tempIdProduco);
                }
            }
            var htmlMensaje = '<p>' + cuerpo_error + '</p><ul><li>' + obtenerNombreProducto_buscador(tempIdProduco, tempIdSucursal, tempIsDesdeBuscador) + '</li></ul>';
            //MostrarMensajeGeneral(titulo_error, htmlMensaje);
            mensaje_error(titulo_error, htmlMensaje);
        }
    }
    //
    CargarCantidadCarritos_Celular();
}

function actualizarCarrito(tempIdSucursal, tempIdProduco, tempCantidadProducto, tempIsDesdeBuscador) {
    var isCarritoFind = false;
    for (var i = 0; i < listaCarritos.length; i++) {
        if (listaCarritos[i].codSucursal == tempIdSucursal) {
            //
            var sumaTotal = parseFloat(String($('#tdTotal' + i).html()).replace('$&nbsp;', '').replace('.', '').replace(',', '.'));
            var unidadesTotal = parseInt(String($('#tdUnidades' + i).html()).replace(textUnidades, ''));


            //
            var isProductoFind = false;
            var indiceProducto = -1;
            for (var iProducto = 0; iProducto < listaCarritos[i].listaProductos.length; iProducto++) {
                if (listaCarritos[i].listaProductos[iProducto].codProducto == tempIdProduco) {
                    //
                    if (listaCarritos[i].listaProductos[iProducto].stk_stock != 'N') {
                        sumaTotal = sumaTotal - CalcularPrecioProductosEnCarrito(listaCarritos[i].listaProductos[iProducto].PrecioFinal, listaCarritos[i].listaProductos[iProducto].cantidad, listaCarritos[i].listaProductos[iProducto].pro_ofeunidades, listaCarritos[i].listaProductos[iProducto].pro_ofeporcentaje);
                    }
                    unidadesTotal -= parseInt(listaCarritos[i].listaProductos[iProducto].cantidad);
                    unidadesTotal += parseInt(tempCantidadProducto);
                    //

                    listaCarritos[i].listaProductos[iProducto].cantidad = parseInt(tempCantidadProducto);
                    isProductoFind = true;
                    indiceProducto = iProducto;
                    /////
                    if (listaProductosBuscados != null) {
                        for (var iProductoBuscador = 0; iProductoBuscador < listaProductosBuscados.length; iProductoBuscador++) {
                            if (listaProductosBuscados[iProductoBuscador].pro_codigo == tempIdProduco) {
                                for (var iStock = 0; iStock < listaProductosBuscados[iProductoBuscador].listaSucursalStocks.length; iStock++) {
                                    if (listaProductosBuscados[iProductoBuscador].listaSucursalStocks[iStock].stk_codsuc == tempIdSucursal) {
                                        listaCarritos[i].listaProductos[iProducto].stk_stock = listaProductosBuscados[iProductoBuscador].listaSucursalStocks[iStock].stk_stock;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    /////
                    break;
                }
            }
            if (!isProductoFind) {
                if (listaProductosBuscados != null) {
                    for (var iProductoBuscador = 0; iProductoBuscador < listaProductosBuscados.length; iProductoBuscador++) {
                        if (listaProductosBuscados[iProductoBuscador].pro_codigo == tempIdProduco) {
                            listaProductosBuscados[iProductoBuscador].codProducto = tempIdProduco;
                            listaProductosBuscados[iProductoBuscador].cantidad = parseInt(tempCantidadProducto);
                            //
                            for (var iStock = 0; iStock < listaProductosBuscados[iProductoBuscador].listaSucursalStocks.length; iStock++) {
                                if (listaProductosBuscados[iProductoBuscador].listaSucursalStocks[iStock].stk_codsuc == tempIdSucursal) {
                                    listaProductosBuscados[iProductoBuscador].stk_stock = listaProductosBuscados[iProductoBuscador].listaSucursalStocks[iStock].stk_stock;
                                    break;
                                }
                            }
                            //
                            listaCarritos[i].listaProductos.push(listaProductosBuscados[iProductoBuscador]);
                            $('#divContenedorBase_' + listaCarritos[i].codSucursal).html(AgregarCarritoHtml(i));
                            //
                            setTimeout(function () { ReAjustarColumnasCarritos(listaCarritos[i].codSucursal, false); }, 40);
                            //
                            break;
                        }
                    }
                }

            } else {
                //Actualizar producto
                if (tempIsDesdeBuscador) {
                    $('#inputCarrito' + i + '_' + indiceProducto).val(tempCantidadProducto);
                }
                // Actualizar Totales
                // Precio Calcular por producto
                var strHtmlPrecioProducto = '';
                if (listaCarritos[i].listaProductos[indiceProducto].stk_stock != 'N') {
                    var totalTempProducto = CalcularPrecioProductosEnCarrito(listaCarritos[i].listaProductos[indiceProducto].PrecioFinal, listaCarritos[i].listaProductos[indiceProducto].cantidad, listaCarritos[i].listaProductos[indiceProducto].pro_ofeunidades, listaCarritos[i].listaProductos[indiceProducto].pro_ofeporcentaje);
                    strHtmlPrecioProducto = '$&nbsp;' + FormatoDecimalConDivisorMiles(totalTempProducto.toFixed(2));
                    sumaTotal = sumaTotal + totalTempProducto;
                }
                $('#tdPrecio' + i + '_' + indiceProducto).html(strHtmlPrecioProducto);
                // Precio Calcular de carrito

                $('#tdTotal' + i).html('$&nbsp;' + FormatoDecimalConDivisorMiles(sumaTotal.toFixed(2)));
                //
                //$('#tdRenglones' + i).html(reglonesTotal);

                $('#tdUnidades' + i).html(textUnidades + unidadesTotal);
                //

            }
            isCarritoFind = true;
            setScrollFinDeCarrito(i);
            break;
        }
    }
    if (!isCarritoFind) {
        var isProducto_isCarritoFind = false;
        var carr = new cCarrito();
        carr.codSucursal = tempIdSucursal;
        for (var iProductoBuscador = 0; iProductoBuscador < listaProductosBuscados.length; iProductoBuscador++) {
            if (listaProductosBuscados[iProductoBuscador].pro_codigo == tempIdProduco) {
                listaProductosBuscados[iProductoBuscador].codProducto = tempIdProduco;
                listaProductosBuscados[iProductoBuscador].cantidad = parseInt(tempCantidadProducto);
                //
                for (var iStock = 0; iStock < listaProductosBuscados[iProductoBuscador].listaSucursalStocks.length; iStock++) {
                    if (listaProductosBuscados[iProductoBuscador].listaSucursalStocks[iStock].stk_codsuc == tempIdSucursal) {
                        listaProductosBuscados[iProductoBuscador].stk_stock = listaProductosBuscados[iProductoBuscador].listaSucursalStocks[iStock].stk_stock;
                        break;
                    }
                }
                //
                carr.listaProductos.push(listaProductosBuscados[iProductoBuscador]);
                isProducto_isCarritoFind = true;
                break;
            }
        }
        if (isProducto_isCarritoFind) {
            listaCarritos.push(carr);
            ////Agregar Carrito
            if (tempIsDesdeBuscador) {
                var indexCarritoAgregar = listaCarritos.length - 1;
                $('#divContenedorBase_' + listaCarritos[indexCarritoAgregar].codSucursal).html(AgregarCarritoHtml(indexCarritoAgregar));
                setScrollFinDeCarrito(indexCarritoAgregar);
                //// Actualizar horario cierre
                indexCarritoHorarioCierre = indexCarritoAgregar;
                ObtenerHorarioCierre(listaCarritos[indexCarritoAgregar].codSucursal, 'OnCallBackObtenerHorarioCierre');
                //indexCarritoHorarioCierre = indexCarritoAgregar;
                //PageMethods.ObtenerHorarioCierre(listaCarritos[indexCarritoHorarioCierre].codSucursal, OnCallBackObtenerHorarioCierre, OnFail);
                //// fin  Actualizar horario cierre
            }
        }
    }


    // inicio 08/01/2019
    if (!isExcedeImporte) {
        if (isEnterExcedeImporte) {
            isEnterExcedeImporte = false;
            if (!$("#divBody").hasClass("modal-open-Celular")) {
                jQuery("#txtBuscador").val('');
                onClickBuscar();
                document.getElementById('txtBuscador').focus();
            }
        }
    }
    // fin 08/01/2019
}

function volverCantidadAnterior_buscador(pIdSucursal, pIdProducto) {
    if (listaProductosBuscados != null) {
        for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
            if (listaSucursal[iEncabezadoSucursal] == pIdSucursal) {
                for (var i = 0; i < listaProductosBuscados.length; i++) {
                    if (listaProductosBuscados[i].pro_codigo == pIdProducto) {
                        var valorCantidad = ObtenerCantidadProductoMasTransfer(pIdSucursal, listaProductosBuscados[i].pro_codigo);
                        //$('#inputSuc' + i + "_" + iEncabezadoSucursal).val(valorCantidad);
                        setearValorInputBuscador(valorCantidad, i, iEncabezadoSucursal);
                        break;
                    }
                }
                break;
            }
        }
    }

}
function volverCantidadAnterior_carrito(pIdSucursal, pIdProducto) {
    // PageMethods.RecuperarCarritoSucursal(pIdSucursal, OnCallBackRecuperarCarritoSucursal, OnFail);
    //RecuperarCarritoPorIdClienteIdSucursal(cli_codigo(), pIdSucursal);
    if (listaCarritos != null && tempIdSucursal != null && tempIdProduco != null) {
        for (var i = 0; i < listaCarritos.length; i++) {
            if (listaCarritos[i].codSucursal == tempIdSucursal) {
                for (var iProducto = 0; iProducto < listaCarritos[i].listaProductos.length; iProducto++) {
                    if (listaCarritos[i].listaProductos[iProducto].codProducto == tempIdProduco) {
                        $('#inputCarrito' + i + '_' + iProducto).val(listaCarritos[i].listaProductos[iProducto].cantidad);
                        break;
                    }
                }
                break;
            }
        }
    }
    volverCantidadAnterior_buscador(pIdSucursal, pIdProducto);
}
function obtenerNombreProducto_buscador(pIdProducto, pIdSucursal, pIsDesdeBuscador) {
    var result = '';
    if (pIsDesdeBuscador) {
        if (listaProductosBuscados != null) {
            for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
                if (listaSucursal[iEncabezadoSucursal] == pIdSucursal) {
                    for (var i = 0; i < listaProductosBuscados.length; i++) {
                        if (listaProductosBuscados[i].pro_codigo == pIdProducto) {
                            result = listaProductosBuscados[i].pro_nombre;
                            break;
                        }
                    }
                    break;
                }
            }
        }
    } else {
        if (listaCarritos != null) {
            for (var iIndexCarritoSucursal = 0; iIndexCarritoSucursal < listaCarritos.length; iIndexCarritoSucursal++) {
                if (listaCarritos[iIndexCarritoSucursal].codSucursal == pIdSucursal) {
                    for (var iProductos = 0; iProductos < listaCarritos[iIndexCarritoSucursal].listaProductos.length; iProductos++) {
                        if (listaCarritos[iIndexCarritoSucursal].listaProductos[iProductos].codProducto == pIdProducto) {
                            result = listaCarritos[iIndexCarritoSucursal].listaProductos[iProductos].pro_nombre;
                            break;
                        }
                    }
                }
            }
        }
    }
    return result;
}
function LimpiarTextBoxProductosBuscados(pIdSucursal) {
    if (listaProductosBuscados != null) {
        for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
            if (listaSucursal[iEncabezadoSucursal] == pIdSucursal) {
                for (var i = 0; i < listaProductosBuscados.length; i++) {

                    var valorCantidad = ObtenerCantidadProductoMasTransfer(pIdSucursal, listaProductosBuscados[i].pro_codigo);
                    //$('#inputSuc' + i + "_" + iEncabezadoSucursal).val(valorCantidad);
                    setearValorInputBuscador(valorCantidad, i, iEncabezadoSucursal);
                }
                break;
            }
        }
    }
}
//

function OnCallBackObtenerHorarioCierreCuentaRegresiva(args) {
    if (args != null) {
        args = eval('(' + args + ')');
        var strHtml = args[0] == null ? '' : args[0];
        new_fechaHorarioCierre = strHtml;
        if (args.length = 2)
            new_fechaHorarioCierreSiguiente = args[1];
        else
            new_fechaHorarioCierreSiguiente = '';
        if (strHtml != '') {
            var hoy = new Date();
            if (strHtml.length == 12) {
                var diaSemana = strHtml.substring(10, 12);
                var diaSemanaNro = -1;
                switch (diaSemana) {
                    case 'LU':
                        diaSemanaNro = 1;
                        break;
                    case 'MA':
                        diaSemanaNro = 2;
                        break;
                    case 'MI':
                        diaSemanaNro = 3;
                        break;
                    case 'JU':
                        diaSemanaNro = 4;
                        break;
                    case 'VI':
                        diaSemanaNro = 5;
                        break;
                    case 'SA':
                        diaSemanaNro = 6;
                        break;
                    case 'DO':
                        diaSemanaNro = 0;
                        break;
                    default:
                        break;
                }

                strHtml = strHtml.replace(' hs. ' + diaSemana, '');
                var values = strHtml.split(':');
                var d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), values[0], values[1], '00');// mes 0 = enero
                var n = d.getDay();
                var sumaDia = 0;
                while (d.getDay() != diaSemanaNro) {
                    sumaDia++;
                    d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + sumaDia, values[0], values[1], '00');// mes 0 = enero
                    if (sumaDia > 7 || d.getDay() == diaSemanaNro)
                        break;
                }
                fechaCuentaRegresiva = d;

            } else {
                strHtml = strHtml.replace(' hs.', '');
                var values = strHtml.split(':');
                fechaCuentaRegresiva = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), values[0], values[1], '00');// mes 0 = enero
            }

            countdown();
        }
    }
    if (homeTipo != null) {
        if (homeTipo == 1 && homeIdOferta != null) {
            showCargandoBuscador();
            setearVariablesBuscador();
            RecuperarProductosHomeOferta(homeIdOferta);
        }
        else if (homeTipo == 2 && homeIdTransfer != null) {
            showCargandoBuscador();
            RecuperarTransferPorId(homeIdTransfer);
        }
    }
}
function countdown() {
    var hoy = new Date();
    var fecha = fechaCuentaRegresiva;

    var dias = 0;
    var horas = 0;
    var minutos = 0;
    var segundos = 0;

    if (fecha > hoy) {
        var strHtml = '';
        var strHtmlReducido = '';
        var diferencia = (fecha.getTime() - hoy.getTime()) / 1000;
        dias = Math.floor(diferencia / 86400);
        diferencia = diferencia - (86400 * dias);
        horas = Math.floor(diferencia / 3600);
        diferencia = diferencia - (3600 * horas);
        minutos = Math.floor(diferencia / 60);
        diferencia = diferencia - (60 * minutos);
        segundos = Math.floor(diferencia);

        strHtml += '<div class="suc">Sucursal ' + nombreSucursalDefault + '</div>';
        strHtmlReducido += '<div class="suc">Sucursal ' + nombreSucursalDefault + '</div>';

        var strFaltanDias = '';
        if (dias > 0) {
            strFaltanDias = '(Días: ' + dias + ')';
        }
        strHtml += '<div class="cierre"><i class="fa fa-truck"></i>&nbsp;&nbsp;Cierre de reparto <span>' + new_fechaHorarioCierre + '</span></div>';
        strHtml += '<div class="faltan">Faltan ' + strFaltanDias + ' <span>' + horas + ':' + toString00(minutos) + ':' + toString00(segundos) + ' hs' + '</span></div>';
        strHtmlReducido += '<div class="faltan">Faltan ' + strFaltanDias + ' <span>' + horas + ':' + toString00(minutos) + ':' + toString00(segundos) + ' hs' + '</span></div>';

        if (new_fechaHorarioCierre != '') {
            strHtml += '<div class="prox">Próximo cierre ' + new_fechaHorarioCierreSiguiente + '</div>';
        }
        $('#divContenedorBaseCuentaRegresiva').html(strHtml);
        $('#divContenedorBaseCuentaRegresivaCelular').html(strHtmlReducido);

        if ($('#divContenedorBaseCuentaRegresiva').css('display') == 'none') {
            $('#divContenedorBaseCuentaRegresiva').css('display', 'block');
        }
        if ($('#divContenedorBaseCuentaRegresivaCelular').css('display') == 'none') {
            $('#divContenedorBaseCuentaRegresivaCelular').css('display', 'block');
        }
        if (!$("#divContenedorBaseCuentaRegresivaCelular").hasClass("visible-xs")) {
            $('#divContenedorBaseCuentaRegresivaCelular').addClass("visible-xs");
        }
        setTimeout(countdown, 500);
    }
    else {
        document.getElementById('divContenedorBaseCuentaRegresiva').innerHTML = '';
        $('#divContenedorBaseCuentaRegresiva').css('display', 'none');
        $('#divContenedorBaseCuentaRegresivaCelular').html('');
        $('#divContenedorBaseCuentaRegresivaCelular').removeClass("visible-xs");
        $('#divContenedorBaseCuentaRegresivaCelular').css('display', 'none');
        ObtenerHorarioCierreAndSiguiente(cli_codsuc());
    }
}
function volverCantidadAnterior_desdeTransfer() {
    if (listaCarritoTransferPorSucursal != null) {
        for (var i = 0; i < listaCarritoTransferPorSucursal.length; i++) {
            volverCantidadAnterior_buscadorTodaSucursal(listaCarritoTransferPorSucursal[i].Sucursal);
        }
    }
}
function volverCantidadAnterior_buscadorTodaSucursal(pIdSucursal) {
    if (listaProductosBuscados != null) {
        for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
            if (listaSucursal[iEncabezadoSucursal] == pIdSucursal) {
                for (var i = 0; i < listaProductosBuscados.length; i++) {
                    var valorCantidad = ObtenerCantidadProductoMasTransfer(pIdSucursal, listaProductosBuscados[i].pro_codigo);
                    //$('#inputSuc' + i + "_" + iEncabezadoSucursal).val(valorCantidad);
                    setearValorInputBuscador(valorCantidad, i, iEncabezadoSucursal);
                }
                break;
            }
        }
    }
}
function getMostrarTipoProducto(pIndex) {
    var mostrarTipoProducto = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_codtpopro != null) {
        switch (listaProductosBuscados[pIndex].pro_codtpopro) {
            case 'A':
                mostrarTipoProducto = 'Accesorio';
                break;
            case 'P':
                mostrarTipoProducto = 'Perfumeria';
                break;
            case 'F':
                mostrarTipoProducto = 'Perfumeria';
                break;
            case 'M':
                if (listaProductosBuscados[pIndex].pro_codtpovta == 'VL') {
                    mostrarTipoProducto = 'Venta libre';
                } else if (listaProductosBuscados[pIndex].pro_codtpovta == 'BR') {
                    mostrarTipoProducto = 'Bajo receta';
                } else if (listaProductosBuscados[pIndex].pro_codtpovta == 'SC') {
                    mostrarTipoProducto = 'Sustancias Controladas';
                } else if (listaProductosBuscados[pIndex].pro_codtpovta[0] == 'P') {
                    mostrarTipoProducto = 'Psicotrópico Lista ' + listaProductosBuscados[pIndex].pro_codtpovta[1];
                } else if (listaProductosBuscados[pIndex].pro_codtpovta[0] == 'E') {
                    mostrarTipoProducto = 'Estupefaciente Lista ' + listaProductosBuscados[pIndex].pro_codtpovta[1];
                }
                break;
            default:
                break;
        }
    }
    return mostrarTipoProducto;
}
function detalleProducto_celular(pIndex) {
    var strHtml = '';


    var isNotGLNisTrazable = false;
    var isMostrarImput = true;
    if (cli_isGLN() !== null) {
        if (!cli_isGLN()) {
            if (listaProductosBuscados[pIndex].pro_isTrazable) {
                isNotGLNisTrazable = true;
                isMostrarImput = false;
            }
        }
    }
    if (!isMostrarImput_AceptaPsicotropicos(listaProductosBuscados[pIndex].pro_codtpovta)) {
        isMostrarImput = false;
    }
    var nombre_principal = '';
    nombre_principal += listaProductosBuscados[pIndex].pro_nombre;
    if (isNotGLNisTrazable) {
        nombre_principal += '<span class="p_trazable">Producto trazable. Farmacia sin GLN.</span>';
    }
    if (cli_tomaTransfers() && listaProductosBuscados[pIndex].isMostrarTransfersEnClientesPerf) {
        if (listaProductosBuscados[pIndex].isTieneTransfer) {
            nombre_principal += '<span class="trf">TRANSFER COMBO</span>';
        } else if (listaProductosBuscados[pIndex].isProductoFacturacionDirecta) {
            nombre_principal += '<span class="trf">TRF</span>';
        }
        // Mostrar solo producto Transfer 
        if (listaProductosBuscados[pIndex].pro_vtasolotransfer) {
            nombre_principal += '<span class="p_trazable">Se vende solo por transfer</span>';
        }
    }
    // Alto Costo
    if (listaProductosBuscados[pIndex].pro_AltoCosto) {
        nombre_principal += htmlAltoCosto;
        isMostrarImput = false;
    }

    // Vale Psicotropicos
    if (listaProductosBuscados[pIndex].isValePsicotropicos) {
        nombre_principal += '<span class="p_trazable" >Requiere Vale</span>';
        isMostrarImput = false;
    }
    // FIN Vale Psicotropicos
    // + IVA
    if (listaProductosBuscados[pIndex].pro_neto) {
        nombre_principal += '<span class="iva">+IVA</span>';
    }
    // FIN + IVA
    // Ver si mostrar input solo producto Transfer 
    /*if (listaProductosBuscados[pIndex].pro_vtasolotransfer && !listaProductosBuscados[pIndex].isTablaTransfersClientes) {
        isMostrarImput = false;
    }*/
    //strHtml += '<div id="modalProd_xs_1" class="modal md-effect-1 md-content portfolio-modal in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-lg"><div class="modal-content">';
    strHtml += '<div class="modal-header mpbxs">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12 mpbxs_tit"  onclick="onclickRecuperarTransfer(' + pIndex + '); return false;">';
    strHtml += nombre_principal;//+ '<a href="" class="trf">TRANSFER COMBO</a><span class="iva">+IVA</span>';                
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    strHtml += '<div class="col-lg-12">';
    strHtml += '<a id="vermas_prod" class="btn_a13-plus" href="#" ><i id="plus_vermas_prod" class="fa fa-plus-circle"></i>Ver información del producto</a>';
    strHtml += '<div class="clear"></div>';
    strHtml += '<div id="divinfo_vermas_prod" class="col-xs-12 no-padding">';
    if (listaProductosBuscados[pIndex].pri_nombreArchivo == null) {
    } else {
        strHtml += '<img src="' + '../../servicios/thumbnail?r=' + 'productos' + '&n=' + listaProductosBuscados[pIndex].pri_nombreArchivo + '&an=' + String(250) + '&al=' + String(250) + '" class="img-responsive">';
    }


    var nombre = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_nombre != null) {
        nombre = listaProductosBuscados[pIndex].pro_nombre;
    }
    strHtml += '<div class="col-xs-4 no-padding">Nombre:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + nombre + '</div>';
    var laboratorio = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_laboratorio != null) {
        laboratorio = listaProductosBuscados[pIndex].pro_laboratorio;
    }
    strHtml += '<div class="col-xs-4 no-padding">Laboratorio:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + laboratorio + '</div>';
    var monodroga = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_monodroga != null) {
        monodroga = listaProductosBuscados[pIndex].pro_monodroga;
    }
    strHtml += '<div class="col-xs-4 no-padding">Monodroga:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + monodroga + '</div>';
    var codigobarra = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_codigobarra != null) {
        codigobarra = listaProductosBuscados[pIndex].pro_codigobarra;
    }
    strHtml += '<div class="col-xs-4 no-padding">Código Barra:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + codigobarra + '</div>';
    var codigoalfabeta = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_codigoalfabeta != null) {
        codigoalfabeta = listaProductosBuscados[pIndex].pro_codigoalfabeta;
    }
    strHtml += '<div class="col-xs-4 no-padding">Código AlfaBeta:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + codigoalfabeta + '</div>';
    var troquel = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_troquel != null) {
        troquel = listaProductosBuscados[pIndex].pro_troquel;
    }
    strHtml += '<div class="col-xs-4 no-padding">Troquel:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + troquel + '</div>';
    var TipoVenta = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_neto != null) {
        if (listaProductosBuscados[pIndex].pro_neto) {
            TipoVenta = 'Gravado';
        } else {
            TipoVenta = 'Exento';
        }
    }
    strHtml += '<div class="col-xs-4 no-padding"> Tipo de venta:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + TipoVenta + '</div>';
    var mostrarTipoProducto = getMostrarTipoProducto(pIndex);
    strHtml += '<div class="col-xs-4 no-padding">Tipo de producto:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + mostrarTipoProducto + '</div>';
    var CadenaFrio = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_isCadenaFrio) {
        CadenaFrio = 'Si';
    } else {
        CadenaFrio = 'No';
    }
    strHtml += '<div class="col-xs-4 no-padding">Cadena de frio:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + CadenaFrio + '</div>';
    var Trazable = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_isTrazable) {
        Trazable = 'Si';
    } else {
        Trazable = 'No';
    }
    strHtml += '<div class="col-xs-4 no-padding">Trazable:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + Trazable + '</div>';
    //
    var familia = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_Familia != null) {
        familia = listaProductosBuscados[pIndex].pro_Familia;
    }
    strHtml += '<div class="col-xs-4 no-padding">Familia:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + familia + '</div>';
    //
    //
    var packDeVenta = '&nbsp;';
    if (listaProductosBuscados[pIndex].pro_PackDeVenta != null) {
        packDeVenta = listaProductosBuscados[pIndex].pro_PackDeVenta;
    }
    strHtml += '<div class="col-xs-4 no-padding">Pack de venta:</div>';
    strHtml += '<div class="col-xs-8 no-padding">' + packDeVenta + '</div>';
    //
    // Detalle Transfer
    if (listaProductosBuscados[pIndex].tfr_descripcion != null) {
        strHtml += '<div class="col-xs-4 no-padding detalleTransferModoCelular">Condición General:</div>';
        strHtml += '<div class="col-xs-8 no-padding detalleTransferModoCelular">' + listaProductosBuscados[pIndex].tfr_descripcion + '</div>';
    }

    if (listaProductosBuscados[pIndex].tde_descripcion != null) {
        strHtml += '<div class="col-xs-4 no-padding detalleTransferModoCelular">Condición Producto:</div>';
        strHtml += '<div class="col-xs-8 no-padding detalleTransferModoCelular">' + listaProductosBuscados[pIndex].tde_descripcion + '</div>';
    }
    if (listaProductosBuscados[pIndex].tde_minuni != null) {
        strHtml += '<div class="col-xs-4 no-padding detalleTransferModoCelular">Unidad Mínima:</div>';
        strHtml += '<div class="col-xs-8 no-padding detalleTransferModoCelular">' + listaProductosBuscados[pIndex].tde_minuni + '</div>';
    }
    if (listaProductosBuscados[pIndex].tde_maxuni != null) {
        strHtml += '<div class="col-xs-4 no-padding detalleTransferModoCelular">Unidad Máxima:</div>';
        strHtml += '<div class="col-xs-8 no-padding detalleTransferModoCelular">' + listaProductosBuscados[pIndex].tde_maxuni + '</div>';
    }
    if (listaProductosBuscados[pIndex].tde_muluni != null) {
        strHtml += '<div class="col-xs-4 no-padding detalleTransferModoCelular">Múltiplo Unidades:</div>';
        strHtml += '<div class="col-xs-8 no-padding detalleTransferModoCelular">' + listaProductosBuscados[pIndex].tde_muluni + '</div>';
    }
    if (listaProductosBuscados[pIndex].tde_fijuni != null) {
        strHtml += '<div class="col-xs-4 no-padding detalleTransferModoCelular">Unidades Fijas:</div>';
        strHtml += '<div class="col-xs-8 no-padding detalleTransferModoCelular">' + listaProductosBuscados[pIndex].tde_fijuni + '</div>';
    }
    if (listaProductosBuscados[pIndex].tde_unidadesbonificadas != null) {
        strHtml += '<div class="col-xs-4 no-padding detalleTransferModoCelular">Unidades Bonificadas:</div>';
        strHtml += '<div class="col-xs-8 no-padding detalleTransferModoCelular">' + listaProductosBuscados[pIndex].tde_unidadesbonificadas + '</div>';
    }
    //
    strHtml += '<div class="clear10"></div>';
    strHtml += '</div>';
    strHtml += '<div class="clear0"></div>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '<div class="col-xs-12 mpbxs_fila_dest">Habitual</div>';
    var precioPublico = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[pIndex].pro_precio.toFixed(2));
    if (listaProductosBuscados[pIndex].pro_precio === 0) {
        precioPublico = '';
    }
    strHtml += '<div class="col-xs-12 mpbxs_dsc">Público<span class="float-right">' + precioPublico + '</span></div>';
    var precioHabitual = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[pIndex].PrecioFinal.toFixed(2));
    if (listaProductosBuscados[pIndex].pro_nombre.match("^PAÑAL PAMI AD")) {
        precioHabitual = FormatoDecimalConDivisorMiles(listaProductosBuscados[pIndex].pro_preciofarmacia.toFixed(2));
    }
    if (listaProductosBuscados[pIndex].pro_AltoCosto) {
        precioHabitual = '';
    }
    strHtml += '<div class="col-xs-12 mpbxs_dsc">Precio<span class="float-right">' + precioHabitual + '</span></div>';


    var varOfeunidades = ' &nbsp; ';
    var varOfeporcentaje = ' &nbsp; ';
    var varPrecioConDescuentoOferta = ' &nbsp; ';
    if (cli_tomaOfertas()) {
        if (listaProductosBuscados[pIndex].pro_ofeunidades !== 0 || listaProductosBuscados[pIndex].pro_ofeporcentaje !== 0) {
            varOfeunidades = listaProductosBuscados[pIndex].pro_ofeunidades;
            //varOfeporcentaje = listaProductosBuscados[pIndex].pro_ofeporcentaje;
            varOfeporcentaje = FormatoDecimalConDivisorMiles(getPorcDtoSobreOferta(pIndex).toFixed(2));
            varPrecioConDescuentoOferta = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[pIndex].PrecioConDescuentoOferta.toFixed(2));
        }
    }

    strHtml += '<div class="col-xs-12 mpbxs_fila_dest">Oferta</div>';
    strHtml += '<div class="col-xs-12 mpbxs_dsc">% PVP<span class="float-right">' + varOfeporcentaje + '</span></div>';
    strHtml += '<div class="col-xs-12 mpbxs_dsc">Min<span class="float-right">' + varOfeunidades + '</span></div>';
    strHtml += '<div class="col-xs-12 mpbxs_dsc">Precio<span class="float-right">' + varPrecioConDescuentoOferta + '</span></div>';



    //if (!isCarritoDiferido) {
    var varTransferFacturacionDirectaPVP = '';
    var varTransferFacturacionDirectaCondicion = '';
    var varTransferFacturacionDirectaPrecio = '';
    if (cli_tomaTransfers() && listaProductosBuscados[pIndex].isMostrarTransfersEnClientesPerf) {
        if (listaProductosBuscados[pIndex].isProductoFacturacionDirecta) {
            if (listaProductosBuscados[pIndex].tde_PorcDtoSobrePVP !== null) {
                varTransferFacturacionDirectaPVP = FormatoDecimalConDivisorMiles(getPorcDtoSobrePVP(pIndex).toFixed(2));
            }
            if (listaProductosBuscados[pIndex].tde_unidadesbonificadasdescripcion !== null) {
                varTransferFacturacionDirectaCondicion = listaProductosBuscados[pIndex].tde_unidadesbonificadasdescripcion;
            }
            if (listaProductosBuscados[pIndex].PrecioFinalTransfer !== null) {
                varTransferFacturacionDirectaPrecio = '$&nbsp;' + FormatoDecimalConDivisorMiles(listaProductosBuscados[pIndex].PrecioFinalTransfer.toFixed(2));
            }
        }
    }
    //

    if (varTransferFacturacionDirectaCondicion !== '') {
        //strHtml += '<div  OnMouseMove="OnMouseMoveProdructoFacturacionDirecta(event)" OnMouseOver="OnMouseOverProdructoFacturacionDirecta(' + i + ')" OnMouseOut="OnMouseOutProdructoFacturacionDirecta()"  style="cursor:pointer;" >'
        //strHtml += varTransferFacturacionDirectaCondicion;
        //strHtml += '</div>';
    }


    strHtml += '<div class="col-xs-12 mpbxs_fila_dest">Transfer</div>';
    strHtml += '<div class="col-xs-12 mpbxs_dsc">% PVP<span class="float-right">' + varTransferFacturacionDirectaPVP + '</span></div>';
    strHtml += '<div class="col-xs-12 mpbxs_dsc">Cond<span class="float-right">' + varTransferFacturacionDirectaCondicion + '</span></div>';
    strHtml += '<div class="col-xs-12 mpbxs_dsc">Precio<span class="float-right">' + varTransferFacturacionDirectaPrecio + '</span></div>';

    //}

    strHtml += '<div class="col-xs-12 mpbxs_separate"></div>';



    for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
        //strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">';
        strHtml += '<div class="col-xs-12 mpbxs_dsc">';
        strHtml += '<div class="col-xs-8 no-padding">' + ConvertirSucursalParaColumna(listaSucursal[iEncabezadoSucursal]) + '</div>';
        strHtml += '<div class="col-xs-4 no-padding">';


        var isDibujarStock = false;
        if (intPaginadorTipoDeRecuperar !== 2) {// todo transfer
            isDibujarStock = true;
        } // fin      if (intPaginadorTipoDeRecuperar != 2) { 
        else { // si selecciona todo transfer y es producto facturacion directa
            //if (!isCarritoDiferido) {
            if (listaProductosBuscados[pIndex].isProductoFacturacionDirecta) {
                isDibujarStock = true;
            }
            //}
        }
        if (isDibujarStock) {
            for (var iSucursal = 0; iSucursal < listaProductosBuscados[pIndex].listaSucursalStocks.length; iSucursal++) {
                if (listaProductosBuscados[pIndex].listaSucursalStocks[iSucursal].stk_codsuc === listaSucursal[iEncabezadoSucursal]) {
                    var isMostrarImputSucursal = true;
                    var isMostrarImputPerfu = true;
                    var is_pedirCC = true;
                    if (isMostrarImput) {
                        is_pedirCC = isMostrarImput_pedirCC(listaProductosBuscados[pIndex].pro_codtpopro, listaSucursal[iEncabezadoSucursal], listaProductosBuscados[pIndex].listaSucursalStocks);
                    }
                    //if (listaSucursal[iEncabezadoSucursal] == "CB" && listaProductosBuscados[pIndex].pro_codtpopro == "P") {
                    //    isMostrarImputCB = false
                    //}
                    if (isMostrarImput) {
                        isMostrarImputSucursal = isMostrarImput_FacturaTrazablesProvincia(listaSucursal[iEncabezadoSucursal], listaProductosBuscados[pIndex].pro_isTrazable);
                    }
                    if (isMostrarImput && listaProductosBuscados[pIndex].pro_codtpopro == "P") {
                        isMostrarImputPerfu = MostrarImputPerfu(listaProductosBuscados[pIndex].pro_codtpopro, listaSucursal[iEncabezadoSucursal], listaProductosBuscados[pIndex].listaSucursalStocks);
                    }
                    if (isMostrarImput && isMostrarImputSucursal && isMostrarImputPerfu && is_pedirCC) {
                        // Cargar Cantidad
                        var cantidadDeProductoEnCarrito = '';
                        if (isSubirPedido) {
                            cantidadDeProductoEnCarrito = listaProductosBuscados[pIndex].listaSucursalStocks[iSucursal].cantidadSucursal;
                            if (cantidadDeProductoEnCarrito == 0 && !isMostrarImput_pedirCC(listaProductosBuscados[pIndex].pro_codtpopro, 'CC', listaProductosBuscados[pIndex].listaSucursalStocks)) {
                                var cantidadDeProductoEnCarrito_temp = getCantidad_SubirArchivo_pedirCC(listaProductosBuscados[pIndex].pro_codtpopro, listaSucursal[iEncabezadoSucursal], listaProductosBuscados[pIndex].listaSucursalStocks);
                                if (isNotNullEmpty(cantidadDeProductoEnCarrito_temp)) {
                                    cantidadDeProductoEnCarrito = cantidadDeProductoEnCarrito_temp;
                                }
                            }
                        } else {
                            cantidadDeProductoEnCarrito = ObtenerCantidadProductoMasTransfer(listaSucursal[iEncabezadoSucursal], listaProductosBuscados[pIndex].pro_codigo);
                        }
                        var typeInput = ' type="number" '; //isMobile()
                        if (!isMobile())
                            typeInput = ' type="text" ';
                        strHtml += '<input class="form-shop float-right" id="inputSucCelular' + pIndex + "_" + iEncabezadoSucursal + '" ' + typeInput + '  value="' + cantidadDeProductoEnCarrito + '"  onkeypress="return onKeypressCantProductos(event)" onfocus="onfocusSucursal(this)" onblur="onblurSucursal_celular(this)"></input>'; //onfocus="onfocusSucursal(this)" onblur="onblurSucursal(this)" onkeypress="return onKeypressCantProductos(event)"
                    }
                    strHtml += '<div class="' + getNameClassStock(listaProductosBuscados[pIndex].listaSucursalStocks[iSucursal].stk_stock) + ' tbl_xs"></div>';
                    break;
                }
            }
        }
        strHtml += '</div>';
        strHtml += '</div>';

    }




    strHtml += '<div class="col-xs-12 mpbxs_dsc">';
    strHtml += '<div class="clear20"></div>';
    //strHtml += '<a class="btn_confirmar" href="#" onclick="onclickCargaCantidadProductoCelular(' + pIndex + '); return false;" >CONFIRMAR</a>';//onclick="onclickCargaCatidadProductoCelular(); return false;"   data-dismiss="modal"
    strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal" >CERRAR</a>';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';


    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
    // modalModuloCelular
    $('#vermas_prod').click(function () {
        var nodo = $(this).attr("id");
        if ($("#divinfo_" + nodo).is(":visible")) {
            $("#divinfo_" + nodo).slideUp(300);
            $("#plus_" + nodo).removeClass("fa fa-minus-circle");
            $("#plus_" + nodo).addClass("fa fa-plus-circle");
            return false;
        } else {
            $("#plus_" + nodo).removeClass("fa fa-plus-circle");
            $("#plus_" + nodo).addClass("fa fa-minus-circle");
            $("#divinfo_" + nodo).slideDown(300);
            return false;
        }
    });

}
function onblurSucursal_celular(pValor) {
    var nombre = pValor.id;
    nombre = nombre.replace('inputSucCelular', '');
    var palabrasBase = nombre.split("_");
    var fila = parseInt(palabrasBase[0]);
    var columna = parseInt(palabrasBase[1]);
    onblurSucursal_base(pValor.value, fila, columna);
}

function onclickCargaCantidadProductoCelular(pIndex) {
    for (var iEncabezadoSucursal = 0; iEncabezadoSucursal < listaSucursal.length; iEncabezadoSucursal++) {
        var nombre = 'inputSucCelular' + pIndex + '_' + iEncabezadoSucursal;// pValor.id;
        //nombre = nombre.replace('inputSucCelular', '');
        //var palabrasBase = nombre.split("_");
        var fila = pIndex;//parseInt(palabrasBase[0]);
        var columna = iEncabezadoSucursal;// parseInt(palabrasBase[1]);
        onblurSucursal_base($('#' + nombre).val(), fila, columna);
    }
    $('#modalModulo').modal('hide');

    //setTimeout(function () { CargarCantidadCarritos_Celular(); }, 30);
}
//////

function setearValorInputBuscador(pCantidad, pFila, pColumnaSucursal) {
    if ($('#inputSuc' + pFila + "_" + pColumnaSucursal).length && $('#inputSuc' + pFila + "_" + pColumnaSucursal).val() != pCantidad) {
        $('#inputSuc' + pFila + "_" + pColumnaSucursal).val(pCantidad);
    }
    if ($('#inputSucCelular' + pFila + "_" + pColumnaSucursal).length && $('#inputSucCelular' + pFila + "_" + pColumnaSucursal).val() != pCantidad) {
        $('#inputSucCelular' + pFila + "_" + pColumnaSucursal).val(pCantidad);
    }
}
////////////////
/// Facturacion directa detalle muestra
function OnMouseOverProdructoFacturacionDirecta(pIndice) {
    if ($("#divMostradorDetalleTransferFacturacionDirecta").css("display") == 'none') {
        LimpiarTimeoutProductoFacturacionDirecta();
        timerProductoFacturacionDirecta = setTimeout(function () { AnimarPresentacionProductoFacturacionDirecta(pIndice); }, 300);
    }
}
function OnMouseOutProdructoFacturacionDirecta() {
    if ($("#divMostradorDetalleTransferFacturacionDirecta").css("display") == 'block') {
        $("#divMostradorDetalleTransferFacturacionDirecta").css("display", "none");
    }
    LimpiarTimeoutProductoFacturacionDirecta();
}
function LimpiarTimeoutProductoFacturacionDirecta() {
    if (timerProductoFacturacionDirecta) {
        clearTimeout(timerProductoFacturacionDirecta);
        timerProductoFacturacionDirecta = null;
    }
}
function AnimarPresentacionProductoFacturacionDirecta(pIndice) {
    CargarDatosProductosFacturacionDirecta(pIndice);
    $("#divMostradorDetalleTransferFacturacionDirecta").css("display", "block");
    LimpiarTimeoutProductoFacturacionDirecta();
}
function OnMouseMoveProdructoFacturacionDirecta(e) {
    if (typeof (e) == 'undefined') {
        e = event;
    }
    var bt = document.body.scrollTop;
    var et = document.documentElement ? document.documentElement.scrollTop : null;
    var top = e.clientY || e.pageY;
    var left = e.clientX || e.pageX;

    //$("#divMostradorDetalleTransferFacturacionDirecta").css("top", (top + (bt || et) + 20) + 'px');
    //$("#divMostradorDetalleTransferFacturacionDirecta").css("left", (left + 20) + 'px');

    $("#divMostradorDetalleTransferFacturacionDirecta").css("top", (top + (bt || et) + 20 - $("#divHeader").css("height").replace('px', '')) + 'px');
    $("#divMostradorDetalleTransferFacturacionDirecta").css("left", (left + 20) + 'px');
}
function CargarDatosProductosFacturacionDirecta(pIndice) {
    if (listaProductosBuscados[pIndice].tde_minuni != null) {
        $('#tdUnidadMinima').html(listaProductosBuscados[pIndice].tde_minuni);
    } else {
        $('#tdUnidadMinima').html('');
    }
    if (listaProductosBuscados[pIndice].tde_maxuni != null) {
        $('#tdUnidadMaxima').html(listaProductosBuscados[pIndice].tde_maxuni);
    } else {
        $('#tdUnidadMaxima').html('');
    }
    if (listaProductosBuscados[pIndice].tde_muluni != null) {
        $('#tdMultiploUnidades').html(listaProductosBuscados[pIndice].tde_muluni);
    } else {
        $('#tdMultiploUnidades').html('');
    }
    if (listaProductosBuscados[pIndice].tde_fijuni != null) {
        $('#tdUnidadesFijas').html(listaProductosBuscados[pIndice].tde_fijuni);
    } else {
        $('#tdUnidadesFijas').html('');
    }
    if (listaProductosBuscados[pIndice].tde_unidadesbonificadas != null) {
        $('#tdUnidadesBonificadas').html(listaProductosBuscados[pIndice].tde_unidadesbonificadas);
    } else {
        $('#tdUnidadesBonificadas').html('');
    }

    if (listaProductosBuscados[pIndice].tde_descripcion != null) {
        $('#tdDescripcionUnidadesBonificadas').html(listaProductosBuscados[pIndice].tde_descripcion);
    } else {
        $('#tdDescripcionUnidadesBonificadas').html('');
    }
    //    if (listaProductosBuscados[pIndice].tde_unidadesbonificadasdescripcion != null) {
    //        $('#tdDescripcionUnidadesBonificadas').html(listaProductosBuscados[pIndice].tde_unidadesbonificadasdescripcion);
    //    } else {
    //        $('#tdDescripcionUnidadesBonificadas').html('');
    //    }
    if (listaProductosBuscados[pIndice].tfr_descripcion != null) {
        $('#tdDescripcionTransfer').html(listaProductosBuscados[pIndice].tfr_descripcion);
    } else {
        $('#tdDescripcionTransfer').html('');
    }
}
/// Fin facturacion directa detalle muestra
function onclickAmpliarImagen(pIndice) {
    mensaje_AmpliarImagen(listaProductosBuscados[pIndice]);
}
function focusPrimerProductoHabilitado() {
    var isFocusFind = false;
    if (listaProductosBuscados != null && listaProductosBuscados.length > 0) {
        for (var iSucursal = 0; iSucursal < listaSucursal.length; iSucursal++) {
            for (var iProducto = 0; iProducto < listaProductosBuscados.length; iProducto++) {
                var nameInput = 'inputSuc' + iProducto + '_' + iSucursal;
                if ($('#' + nameInput).length) {
                    $('#' + nameInput).focus();
                    selectedInput = document.getElementById(nameInput);
                    isFocusFind = true;
                    break;
                }
            }
            if (isFocusFind) {
                break;
            }
        }
    }
}
