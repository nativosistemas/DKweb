var objDocumento = null;
var objTipoDocumento = null;
var oVencimientoResumen = null;
var cVencimientosResumen = [];
//
//var nombreArchivoPDF = '';
var nroDocumento = '';
var isLlamarArchivoPDF = true;
var contadorPDF = 0;
var isArchivoGenerado = null;
//
// inicio trz
//var nombreArchivoPDF_trz = '';
var nroDocumento_trz = '';
var isLlamarArchivoPDF_trz = true;
var contadorPDF_trz = 0;
var isArchivoGenerado_trz = null;
// fin trz

jQuery(document).ready(function () {
    if (isArchivoGenerado == null) {
        isArchivoGenerado = $('#hiddenIsPdfExiste').val();
        if (typeof objTipoDocumento == 'undefined') {
            isArchivoGenerado = null;
        }
        if (isArchivoGenerado != null) {
            if (isArchivoGenerado == 'true') {
                isArchivoGenerado = true;
            } else {
                isArchivoGenerado = false;
            }
        }
    }

    if (objTipoDocumento == null) {
        objTipoDocumento = $('#hiddenTipoDocumento').val();
        if (typeof objTipoDocumento == 'undefined') {
            objTipoDocumento = null;
        }
    }
    if (objDocumento == null) {
        objDocumento = eval('(' + $('#hiddenDocumento').val() + ')');
        if (typeof objDocumento == 'undefined') {
            objDocumento = null;
        }
    }

    if (objTipoDocumento != null && objDocumento != null) {
        switch (objTipoDocumento) {
            case 'FAC':
                $('#divTituloDocumento').html('Factura');
                CargarHtmlFactura();
                break;
            case 'PENDINTE':
                $('#divTituloDocumento').html('Pedido Aceptado');
                CargarHtmlPendienteDeFacturar();
                break;
            case 'ENPREPARACION':
                $('#divTituloDocumento').html('Pedido En Preparación');
                CargarHtmlPendienteDeFacturar();
                break;
            case 'NCR':
                $('#divTituloDocumento').html('Nota de crédito');
                CargarHtmlNotaCredito();
                break;
            case 'NDE':
                $('#divTituloDocumento').html('Nota de débito');
                CargarHtmlNotaDebito();
                break;
            case 'RES':
                $('#divTituloDocumento').html('Resumen');
                CargarHtmlResumen();
                break;
            case 'OSC':
                $('#divTituloDocumento').html('Obra Social');
                CargarHtmlObraSocialCliente();
                break;
            case 'REC':
                $('#divTituloDocumento').html('Recibo');
                CargarHtmlRecibo();
                break;
            default:
                break;
        }
    } else {
        $('#divContenedorDocumento').html(objMensajeNoEncontrado);
    }
});
function funImprimirComprobantePdf(pValor) {
    if (isArchivoGenerado) {
        return true;
    } else {
        if (isLlamarArchivoPDF) {
            contadorPDF = 0;
            nroDocumento = pValor;
            // $('#imgPdf').attr('src', '../../img/varios/ajax-loader.gif');
            mostrarLoaderBotonDescarga('0');
            isLlamarArchivoPDF = false;
            var nombreArchivoPDF = objTipoDocumento + '_' + nroDocumento;
            setTimeout(function () { IsExistenciaComprobante(nombreArchivoPDF, 'OnCallBackComprobantePDF'); }, 10);
        }
        return false;
    }
}
function OnCallBackComprobantePDF(args) {
    if (args.toUpperCase() == 'TRUE') {
        isArchivoGenerado = true;
        isLlamarArchivoPDF = true;
        //$('#imgPdf').attr('src', '../../img/iconos/PDF.png');
        ocultarLoaderBotonDescarga('0');
        window.open('../../servicios/generar_archivoPdf.aspx?tipo=' + objTipoDocumento + '&nro=' + nroDocumento, '_parent');
    } else {
        if (contadorPDF <= 300) {
            var nombreArchivoPDF = objTipoDocumento + '_' + nroDocumento;
            setTimeout(function () { IsExistenciaComprobante(nombreArchivoPDF, 'OnCallBackComprobantePDF'); }, 1000);
        } else {
            isLlamarArchivoPDF = true;
            //$('#imgPdf').attr('src', '../../img/iconos/PDF.png');
            ocultarLoaderBotonDescarga('0');
            mensaje_informacion_generico(objMensajeNoSePudoDescargarArchivoInténteloNuevamente);
        }
        contadorPDF++;
    }
}
function funImprimirComprobantePdf_trz(pValor) {
    if (isArchivoGenerado_trz) {
        return true;
    } else {
        if (isLlamarArchivoPDF_trz) {
            contadorPDF_trz = 0;
            nroDocumento_trz = pValor;
            var nombreArchivoPDF_trz = 'REM_ANEXTRAZ' + '_' + nroDocumento_trz;
            // $('#imgPdf_Trz').attr('src', '../../img/varios/ajax-loader.gif');
            mostrarLoaderBotonDescarga('1');
            isLlamarArchivoPDF_trz = false;
            setTimeout(function () { IsExistenciaComprobante(nombreArchivoPDF_trz, 'OnCallBackComprobantePdf_trz'); }, 10);
        }
        return false;
    }
}
function OnCallBackComprobantePdf_trz(args) {
    if (args) {
        isArchivoGenerado_trz = true;
        isLlamarArchivoPDF_trz = true;
        //$('#imgPdf_Trz').attr('src', '../../img/iconos/PDF_TRZ.png');
        ocultarLoaderBotonDescarga('1');
        window.open('../../servicios/generar_archivoPdf.aspx?tipo=' + 'REM_ANEXTRAZ' + '&nro=' + nroDocumento_trz, '_parent');
    } else {
        if (contadorPDF <= 300) {
            nombreArchivoPDF_trz = 'REM_ANEXTRAZ' + '_' + nroDocumento_trz;
            setTimeout(function () { IsExistenciaComprobante(nombreArchivoPDF_trz, 'OnCallBackComprobantePdf_trz'); }, 1000);
        } else {
            isLlamarArchivoPDF_trz = true;
            //$('#imgPdf_Trz').attr('src', '../../img/iconos/PDF_TRZ.png');
            ocultarLoaderBotonDescarga('1');
            //alert('No se pudo descargar el archivo, inténtelo nuevamente.');
            mensaje_informacion_generico(objMensajeNoSePudoDescargarArchivoInténteloNuevamente);
        }
        contadorPDF_trz++;
    }
}
function mostrarLoaderBotonDescarga(pValor) {
    var myButton = document.getElementById('btn_to_hide-' + pValor);
    var myImage = document.getElementById('btn_to_hide-' + pValor + '-img');
    if (myButton != null && myButton.style != null) {
        myButton.style.visibility = 'hidden';
    }
    if (myImage != null && myImage.style != null) {
        myImage.style.display = 'inline';
    }
}
function ocultarLoaderBotonDescarga(pValor) {
    var myButton = document.getElementById('btn_to_hide-' + pValor);
    var myImage = document.getElementById('btn_to_hide-' + pValor + '-img');
    if (myImage != null && myImage.style != null) {
        myImage.style.display = 'none';
    }
    if (myButton != null && myButton.style != null) {
        myButton.style.visibility = 'visible';
    }
}

function CargarHtmlResumen() {
    if (objDocumento != null) {
        var httpRaiz = $('#hiddenRaiz').val();

        var strHtmlDescarga = '';
        strHtmlDescarga += '<div class="load_gif" id="btn_to_hide-' + '0' + '-img"></div><a id="btn_to_hide-' + '0' + '" class="btn_download float-right" href="' + httpRaiz + 'servicios/generar_archivoPdf.aspx?tipo=' + objTipoDocumento + '&nro=' + objDocumento.Numero + '"  onclick="return funImprimirComprobantePdf(' + '\'' + objDocumento.Numero + '\'' + ');" >DESCARGAR</a>';
        $('#divContenedorDocumentoDescarga').append(strHtmlDescarga);
        //strHtmlCabecera += '<div class="clear20 hidden-xs"></div>';
        //strHtmlCabecera += '<div class="clear10 visible-xs"></div>';
        var strHtmlCabecera = '';
        strHtmlCabecera += '<div class="div_cont_ctacte">';
        strHtmlCabecera += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>N&uacute;mero:</span>' + objDocumento.Numero + '</div>';
        strHtmlCabecera += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Sem:</span>' + objDocumento.NumeroSemana + '</div>';
        strHtmlCabecera += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Desde:</span>' + objDocumento.PeriodoDesdeToString + '</div>';
        strHtmlCabecera += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Hasta:</span>' + objDocumento.PeriodoHastaToString + '</div>';
        var strTotalResumen = '&nbsp;';
        if (isNotNullEmpty(objDocumento.TotalResumen)) {
            strTotalResumen = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.TotalResumen.toFixed(2));
        }
        strHtmlCabecera += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Total:</span>' + strTotalResumen + '</div>';
        strHtmlCabecera += '<div class="clear0"></div>';
        strHtmlCabecera += '</div>';
        $('#divContenedorDocumentoCabecera').append(strHtmlCabecera);

        var strHtml = '';

        strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<thead>';
        strHtml += '<tr>';
        strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center no-padding" >';
        strHtml += '<table  width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">D&iacute;a</td></tr>';
        strHtml += '</table>';                                
        //strHtml += '<span class="thd_letra_chica visible-xs">D&iacute;a</span>';                               
        strHtml += '</th>';
        strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-5 text-center no-padding" data-breakpoints="xs" >';
        strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Descripci&oacute;n</td></tr>';
        strHtml += '</table>';
        strHtml += '<span class="thd_letra_chica visible-xs">Descripci&oacute;n</span>';
        strHtml += '</th>';
        strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-6 text-center no-padding">';
        strHtml += '<table  width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Tipo Comprobante</td></tr>';
        strHtml += '</table>';                               
        //strHtml += '<span class="thd_letra_chica visible-xs">Tipo</span>';                               
        strHtml += '</th>';
        strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-center no-padding">';
        strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Importe</td></tr>';
        strHtml += '</table>';                             
        strHtml += '</th>';
        strHtml += '</tr>';
        strHtml += '</thead>';
        strHtml += '<tbody>';

        var orden = 0;
        for (var i = 0; i < objDocumento.lista.length; i++) {
            if (isVizualizarDetalleResumenLlendoDescripcion(objDocumento.lista[i].Descripcion)) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }

                aDesc = '';
                var verVtos = '';
                var vtoTexto = '';
                if (objDocumento.lista[i].Descripcion.toUpperCase().search('TOTAL DE UNIDADES') > -1) {
                    vtoTexto = "VENCIMIENTOS:"
                }
                if (objDocumento.lista[i].Descripcion.toUpperCase().search('VENCIMIENTOS:') > -1) {
                    var aDesc = objDocumento.lista[i].Descripcion.split("/");
                    var FechaVtoString = aDesc[2].substr(0, 4) + "/" + aDesc[1] + "/" + aDesc[0].substr(aDesc[0].length-2);
                    vtoTexto = aDesc[0].substr(aDesc[0].length - 2) + "/" + aDesc[1] + "/" + aDesc[2].substr(0, 4) + " | $ " + aDesc[2].substr(5, aDesc[2].lenght).trim();
                    //ObtenerVtosResumenes(objDocumento.Numero, FechaVtoString);
                    verVtos = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i data-toggle="tooltip" title="Ver Detalle de Vencimiento" class="fa fa-search" style="cursor: pointer;" onclick="ObtenerVtosResumenes(\'' + objDocumento.Numero + '\',\'' + FechaVtoString + '\')"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                }
                
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 col-xs-2  text-center">';
                strHtml += objDocumento.lista[i].Dia;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-7 col-md-7 col-sm-7 col-xs-12 text-center">';
                strHtml += ObtenerLinkDeDocumentoDesdeStr(objDocumento.lista[i].Descripcion) + verVtos;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-6 text-center c_to_l-xs">';
                var strTipoComprobante = objDocumento.lista[i].TipoComprobante;
                //        FAC = 0,
                //        REC = 1,
                //        NDE = 2,
                //        NCR = 3,
                //        NDI = 4,
                //        NCI = 5,
                //        RES = 9,
                //        CIE = 10,
                switch (objDocumento.lista[i].TipoComprobante) {
                    case '0':
                        strTipoComprobante = 'FAC';
                        break;
                    case '1':
                        strTipoComprobante = 'REC';
                        break;
                    case '2':
                        strTipoComprobante = 'NDE';
                        break;
                    case '3':
                        strTipoComprobante = 'NCR';
                        break;
                    case '4':
                        strTipoComprobante = 'NDI';
                        break;
                    case '5':
                        strTipoComprobante = 'NCI';
                        break;
                    case '9':
                        strTipoComprobante = 'RES';
                        break;
                    case '10':
                        strTipoComprobante = 'CIE';
                        break;
                    default:
                        break;
                }
                strHtml += strTipoComprobante; // objDocumento.lista[i].TipoComprobante; //    
                strHtml +=  '<span class="vtos-sm">' +  vtoTexto + verVtos + '</span>';
                
                strHtml += '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-4 text-right">';
                var strImporte = '&nbsp;';
                if (isNotNullEmpty(objDocumento.lista[i].Importe)) {
                    strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(objDocumento.lista[i].Importe.replace(",", ".")).toFixed(2));
                }

                strHtml += strImporte;
                strHtml += '</td>';
                strHtml += '</tr>';
            }
        }
        strHtml += '</tbody>';
        strHtml += '</table>';
        console.log(objDocumento);
        console.log(cVencimientosResumen);
        //
        ////var httpRaiz = $('#hiddenRaiz').val();
        ////strHtml += '<div class="cssDivDescarga">';
        ////strHtml += '&nbsp;';
        ////strHtml += '<a   href="' + httpRaiz + 'servicios/generar_archivoPdf.aspx?tipo=' + objTipoDocumento + '&nro=' + objDocumento.Numero + '"  onclick="return funImprimirComprobantePdf(' + '\'' + objDocumento.Numero + '\'' + ');"  >' + '<img  class="cssImagenDescarga" id="imgPdf" src="../../img/iconos/PDF.png" alt="txt" title="Descarga pdf" height="34" width="32" />' + '</a>';
        ////strHtml += '</div>';
        ////strHtml += '</br>';
        //strHtml += '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-right"><a class="btn_download float-right" href="' + httpRaiz + 'servicios/generar_archivoPdf.aspx?tipo=' + objTipoDocumento + '&nro=' + objDocumento.Numero + '"  onclick="return funImprimirComprobantePdf(' + '\'' + objDocumento.Numero + '\'' + ');" >DESCARGAR</a></div>';
        //strHtml += '<div class="clear20 hidden-xs"></div>';
        //strHtml += '<div class="clear10 visible-xs"></div>';
        //
        if (objDocumento.lista.length > cantFilaParaEnCabezado) {
            //strHtml += '<br/>';
            // strHtml += '<input type="button" onclick="volver()" value="VOLVER" class="btn_gral" />';
            strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
        }



        $('#divContenedorDocumento').html(strHtml);
    } else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
        $('#divContenedorDocumento').html(strHtml);
    }
    $('.footable').footable();
}
function isVizualizarDetalleResumenLlendoDescripcion(pDescripcion) {
    var isRespuesta = true;
    if (pDescripcion.toUpperCase().search('SIGUE EN HOJA') > -1) {
        isRespuesta = false;
    }
    if (pDescripcion.toUpperCase().search('VIENE DE HOJA') > -1) {
        isRespuesta = false;
    }
    return isRespuesta;
}

function CargarHtmlFactura() {
    if (objDocumento != null) {
        var strHtml = '';

        $('#divContenedorDocumentoCabecera').append(CargarHtmlCabecera_Generico(objDocumento));

        strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<thead>';
        strHtml += '<tr>';

        strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center no-padding">'; 
        strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Troquel</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';

        strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-10 text-center no-padding">';
        strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Producto</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';

        strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="xs">';
        strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Caracter&iacute;sticas</td></tr>';
        strHtml += '</table>';                                
        strHtml += '<span class="thd_letra_chica visible-xs">Caracter&iacute;sticas</span>';
        strHtml += '</th>';

        strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="xs">';
        strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Cantidad</td></tr>';
        strHtml += '</table>';                                
        strHtml += '<span class="thd_letra_chica visible-xs">Cantidad</span>';
        strHtml += '</th>';

        strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
        strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Precio P&uacute;blico</td></tr>';
        strHtml += '</table>';                                
        strHtml += '<span class="thd_letra_chica visible-xs">Precio P&uacute;blico</span>';
        strHtml += '</th>';

        strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
        strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Precio Unit.</td></tr>';
        strHtml += '</table>';                                
        strHtml += '<span class="thd_letra_chica visible-xs">Precio Unitario</span>';
        strHtml += '</th>';

        strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding" data-breakpoints="xs">';
        strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center no_brd-r">Importe</td></tr>';
        strHtml += '</table>';                                
        strHtml += '<span class="thd_letra_chica visible-xs">Importe</span>';
        strHtml += '</th>';

        strHtml += '</tr>';
        strHtml += '</thead>';
        strHtml += '<tbody>';
        if (objDocumento.lista != null) {
            for (var i = 0; i < objDocumento.lista.length; i++) {
                if (isVizualizarDetalleResumenLlendoDescripcion(objDocumento.lista[i].Descripcion)) {
                    var strHtmlColorFondo = 'wht';
                    if (i % 2 != 0) {
                        strHtmlColorFondo = 'grs';
                    }
                    strHtml += '<tr class="' + strHtmlColorFondo + '">';

                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 col-xs-3 text-center">';
                    strHtml += objDocumento.lista[i].Troquel;
                    strHtml += '</td>';
                    strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-9 text-left">';
                    strHtml += objDocumento.lista[i].Descripcion;
                    strHtml += '</td>';
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 col-xs-12 c_to_l-xs">';
                    strHtml += objDocumento.lista[i].Caracteristica;
                    strHtml += '</td>';
                    strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 c_to_l-xs">';
                    strHtml += objDocumento.lista[i].Cantidad;
                    strHtml += '</td>';
                    strHtml += '<td class="col-lg-2 col-md-2 col-sm-1 r_to_l-xs">';
                    var strPrecioPublico = '&nbsp;';
                    if (isNotNullEmpty(objDocumento.lista[i].PrecioPublico)) {
                        strPrecioPublico = '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(objDocumento.lista[i].PrecioPublico.replace(",", ".")).toFixed(2));
                    }
                    strHtml += strPrecioPublico; 
                    strHtml += '</td>';
                    strHtml += '<td class="col-lg-2 col-md-2 col-sm-1 r_to_l-xs">';
                    var strPrecioUnitario = '&nbsp;';
                    if (isNotNullEmpty(objDocumento.lista[i].PrecioUnitario)) {
                        strPrecioUnitario = '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(objDocumento.lista[i].PrecioUnitario.replace(",", ".")).toFixed(2));
                    }
                    strHtml += strPrecioUnitario;
                    strHtml += '</td>';
                    strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 r_to_l-xs">';
                    var strImporte = '&nbsp;';
                    if (isNotNullEmpty(objDocumento.lista[i].Importe)) {
                        strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(objDocumento.lista[i].Importe.replace(",", ".")).toFixed(2));
                    }
                    strHtml += strImporte;
                    strHtml += '</td>';
                    strHtml += '</tr>';
                }
            }
        }
        strHtml += '</tbody>';
        strHtml += '</table>';

        if (objDocumento.lista != null) {
            if (objDocumento.lista.length > cantFilaParaEnCabezado) {
                 strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }
        }
        $('#divContenedorDocumento').html(strHtml);
    } else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
        $('#divContenedorDocumento').html(strHtml);
    }
    $('.footable').footable();
}
function CargarHtmlNotaCredito() {
    if (objDocumento != null) {

        var isMostrarTodo = true;
        switch (objDocumento.Motivo) {
            case 'Monto':
                isMostrarTodo = false;
                break;
            case 'Ajuste':
                isMostrarTodo = false;
                break;
            case 'Obra Social':
                isMostrarTodo = false;
                break;
            default:
                break;
        }
        var strHtml = '';
        $('#divContenedorDocumentoCabecera').append(CargarHtmlCabecera_Generico(objDocumento));

        strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<thead>';
        strHtml += '<tr>';

        if (isMostrarTodo) {
            strHtml += '<th  class="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Troquel</td></tr>';
            strHtml += '</table>'; 
            strHtml += '</div>';
            strHtml += '</th>';
        }
        if (isMostrarTodo) {
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-10 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Descripci&oacute;n</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
        } else {
            strHtml += '<th class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-center no-padding">';
            strHtml += '<table  width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Descripci&oacute;n</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
        }
        if (isMostrarTodo) {
            strHtml += '<th class="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs"  width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Cantidad</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Cantidad</span>';
            strHtml += '</th>';
        }
        if (isMostrarTodo) {
            strHtml += '<th  class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs"  width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Precio Público</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Precio Público</span>';
            strHtml += '</th>';
        }
        if (isMostrarTodo) {
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs"  width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Precio Unitario</td></tr>';
            strHtml += '</table>';
            strHtml += '<span class="thd_letra_chica visible-xs">Precio Unitario</span>';
            strHtml += '</th>';
        }
        if (isMostrarTodo) {
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-1 text-center no-padding" data-breakpoints="xs">';
            strHtml += '<table class="hidden-xs" width="100%" cellpadding="0" cellspacing="0">';
        } else {
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
        }
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Importe</td></tr>';
        strHtml += '</table>';
        if (isMostrarTodo) {
            strHtml += '<span class="thd_letra_chica visible-xs">Importe</span>';
        }
        strHtml += '</th>';

        strHtml += '</tr>';
        strHtml += '</thead>';
        strHtml += '<tbody>';
        if (objDocumento.lista != null) {
            for (var i = 0; i < objDocumento.lista.length; i++) {
                if (isVizualizarDetalleResumenLlendoDescripcion(objDocumento.lista[i].Descripcion)) {
                    var strHtmlColorFondo = 'wht';
                    if (i % 2 != 0) {
                        strHtmlColorFondo = 'grs';
                    }
                    strHtml += '<tr class="' + strHtmlColorFondo + '">';

                    if (isMostrarTodo) {
                        strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-center c_to_l-xs">';
                        strHtml += objDocumento.lista[i].Troquel;
                        strHtml += '</td>';
                    }
                    if (isMostrarTodo) {
                        strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-10 text-left">';

                    } else {
                        strHtml += '<th class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-left">';
                    }
                    strHtml += objDocumento.lista[i].Descripcion;
                    strHtml += '</td>';
                    if (isMostrarTodo) {
                        strHtml += '<td class="col-lg-1 col-md-1 col-sm-1 c_to_l-xs">';
                        strHtml += objDocumento.lista[i].Cantidad;
                        strHtml += '</td>';
                    }
                    if (isMostrarTodo) {
                        strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 r_to_l-xs">';
                        if (isNotNullEmpty(objDocumento.lista[i].PrecioPublico)) {
                            strHtml += '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(objDocumento.lista[i].PrecioPublico.replace(",", ".")).toFixed(2));
                        }
                        strHtml += '</td>';
                    }
                    if (isMostrarTodo) {
                        strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 r_to_l-xs">';
                        if (isNotNullEmpty(objDocumento.lista[i].PrecioUnitario)) {
                            strHtml += '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(objDocumento.lista[i].PrecioUnitario.replace(",", ".")).toFixed(2));
                        }
                        strHtml += '</td>';
                    }
                    if (isMostrarTodo) {
                        strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 r_to_l-xs">';
                    } else {
                        strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center">';
                    }
                    var strImporte = '&nbsp;';
                    if (isNotNullEmpty(objDocumento.lista[i].Importe)) {
                        strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(objDocumento.lista[i].Importe.replace(",", ".")).toFixed(2));
                    }
                    strHtml += strImporte;
                    strHtml += '</td>';
                    strHtml += '</tr>';
                }
            }
        }
        strHtml += '</tbody>';
        strHtml += '</table>';

        if (objDocumento.lista != null) {
            if (objDocumento.lista.length > cantFilaParaEnCabezado) {
                 strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }
        }


        $('#divContenedorDocumento').html(strHtml);
    } else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
        $('#divContenedorDocumento').html(strHtml);
    }
    $('.footable').footable();
}

function CargarHtmlCabecera_Generico(objDocumento) {
    var strHtml = '';
    var isMostrarEnCabezadoTodo = true;
    if (objDocumento.Numero.substr(0, 1) == 'B') {
        isMostrarEnCabezadoTodo = false;
    }

    var httpRaiz = $('#hiddenRaiz').val();
    var strHtmlDescarga = '';

    if (objTipoDocumento == 'FAC' && objDocumento.FacturaTrazable) {
         strHtmlDescarga += '<div class="load_gif" id="btn_to_hide-' + '1' + '-img"></div><a  id="btn_to_hide-' + '1' + '" class="btn_download float-right" href="' + httpRaiz + 'servicios/generar_archivoPdf.aspx?tipo=' + 'REM_ANEXTRAZ' + '&nro=' + objDocumento.Numero + '"  onclick="return funImprimirComprobantePdf_trz(' + '\'' + objDocumento.NumeroRemito + '\'' + ');" data-toggle="tooltip" data-placement="bottom" title="Descarga pdf trazable" data-original-title="Descarga pdf trazable">PDF TRZ</a>';
    }
    strHtmlDescarga += '<a class="btn_download float-right" href="' + httpRaiz + 'servicios/generar_archivoPdf.aspx?tipo=' + objTipoDocumento + '&nro=' + objDocumento.Numero + '"  onclick="return funImprimirComprobantePdf(' + '\'' + objDocumento.Numero + '\'' + ');"  data-toggle="tooltip" data-placement="bottom" title="Descargar en pdf" data-original-title="Descargar en pdf">PDF</a>';
    if (objTipoDocumento == 'FAC') {
        strHtmlDescarga += '<div class="load_gif" id="btn_to_hide-' + '0' + '-img"></div><a id="btn_to_hide-' + '0' + '"  class="btn_download float-right" href="' + httpRaiz + 'servicios/generar_archivo.aspx?factura=' + objDocumento.Numero + '" data-toggle="tooltip" data-placement="bottom" title="Descargar en txt" data-original-title="Descargar en txt">TXT</a>';
        strHtmlDescarga += '<a class="btn_download float-right" href="../../archivos/Diseño TXT Factura.pdf" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Descargar en formato txt" data-original-title="Descargar en formato txt">FORMATO TXT</a>';
    }
    strHtmlDescarga += '<div class="float-right pad_7 hidden-xs">Descargas:</div>';
    $('#divContenedorDocumentoDescarga').append(strHtmlDescarga);


    strHtml += '<div class="div_cont_ctacte">';
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>N&uacute;mero:</span>' + objDocumento.Numero + '</div>';
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Remito/OP:</span>' + objDocumento.NumeroRemito + '</div>';
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Fecha:</span>' + objDocumento.FechaToString + '</div>';
    var aFecha = objDocumento.FechaToString.split("/");
    var FechaFac = new Date(Number(aFecha[2]), Number(aFecha[1]) - 1, Number(aFecha[0]));
    var DiaUno = new Date(Number(aFecha[2]), 0, 1);
    var DiaInicio = new Date(Number(aFecha[2]), 0, 1).getDay();
    var NroDia = parseInt((FechaFac - DiaUno + 1) / 86400000)
    NroDia += DiaInicio;
    var NroSemana = Math.ceil(NroDia / 7);
    if (NroSemana == 53) {
        NroSemana = 1;
    }
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Semana:</span>' + NroSemana + '</div>';
    var strMontoTotal = '&nbsp;';
    if (isNotNullEmpty(objDocumento.MontoTotal)) {
        strMontoTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoTotal.toFixed(2));
    }
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Total:</span>' + strMontoTotal + '</div>';
    strHtml += '<div class="clear10 visible-lg"></div>';

    if (isMostrarEnCabezadoTodo) {
        var strMontoExento = '&nbsp;';
        if (isNotNullEmpty(objDocumento.MontoExento)) {
            strMontoExento = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoExento.toFixed(2));
        }
        strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Monto Exento:</span>' + strMontoExento + '</div>';
    }
    if (isMostrarEnCabezadoTodo) {
        var strMontoGravado = '&nbsp;';
        if (isNotNullEmpty(objDocumento.MontoGravado)) {
            strMontoGravado = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoGravado.toFixed(2));
        }
        strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Monto Gravado:</span>' + strMontoGravado + '</div>';
    }
    if (isMostrarEnCabezadoTodo) {
        var strMontoIvaInscripto = '&nbsp;';
        if (isNotNullEmpty(objDocumento.MontoIvaInscripto)) {
            strMontoIvaInscripto = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoIvaInscripto.toFixed(2));
        }
        strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>IVA Inscripto:</span>' + strMontoIvaInscripto + '</div>';
    }
    if (isMostrarEnCabezadoTodo) {
        var strMontoIvaNoInscripto = '&nbsp;';
        if (isNotNullEmpty(objDocumento.MontoIvaNoInscripto)) {
            strMontoIvaNoInscripto = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoIvaNoInscripto.toFixed(2));
        }
        strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>IVA No Inscripto:</span>' + strMontoIvaNoInscripto + '</div>';
    }

    var strMontoPercepcionDGR = '&nbsp;';
    if (isNotNullEmpty(objDocumento.MontoPercepcionDGR)) {
        strMontoPercepcionDGR = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoPercepcionDGR.toFixed(2));
    }
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Percepci&oacute;n DGR:</span>' + strMontoPercepcionDGR + '</div>';
    if (objTipoDocumento == 'FAC') {
        // Inicio parte nueva
        var strMontoPercepcionMunicipal = '&nbsp;';
        if (isNotNullEmpty(objDocumento.MontoPercepcionMunicipal)) {
            strMontoPercepcionMunicipal = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoPercepcionMunicipal.toFixed(2));
        }
        strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Percepci&oacute;n Municipal:</span>' + strMontoPercepcionMunicipal + '</div>';
        // Fin parte nueva

    }

    strHtml += '<div class="clear0"></div>';
    strHtml += '</div>';

    return strHtml;
}
function CargarHtmlNotaDebito() {
    if (objDocumento != null) {
        var strHtml = '';

        //
        $('#divContenedorDocumentoCabecera').append(CargarHtmlCabecera_Generico(objDocumento));

        strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<thead>';
        strHtml += '<tr>';
        strHtml += '<tr>';
        strHtml += '<th class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-center no-padding">';
        strHtml += '<table  width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Descripci&oacute;n</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';
        strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
        strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Importe</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';
        strHtml += '</tr>';
        strHtml += '</thead>';
        strHtml += '<tbody>';
        if (objDocumento.lista != null) {
            for (var i = 0; i < objDocumento.lista.length; i++) {
                if (isVizualizarDetalleResumenLlendoDescripcion(objDocumento.lista[i].Descripcion)) {
                    var strHtmlColorFondo = 'wht';
                    if (i % 2 != 0) {
                        strHtmlColorFondo = 'grs';
                    }
                    strHtml += '<tr class="' + strHtmlColorFondo + '">';

                    strHtml += '<th class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-left">';
                    strHtml += objDocumento.lista[i].Descripcion;
                    strHtml += '</td>';
                    strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center">';
                    var strImporte = '&nbsp;';
                    if (isNotNullEmpty(objDocumento.lista[i].Importe)) {
                        strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(objDocumento.lista[i].Importe.replace(",", ".")).toFixed(2));
                    }
                    strHtml += strImporte;
                    strHtml += '</td>';
                    strHtml += '</tr>';
                }
            }
        }
        strHtml += '</tbody>';
        strHtml += '</table>';

        if (objDocumento.lista != null) {
            if (objDocumento.lista.length > cantFilaParaEnCabezado) {
                strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }
        }
        $('#divContenedorDocumento').html(strHtml);
    } else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
        $('#divContenedorDocumento').html(strHtml);
    }
    $('.footable').footable();
}
function CargarHtmlCabeceraPendienteDeFacturar(objDocumento) {
    var strHtml = '';
    strHtml += '<div class="div_cont_ctacte">';
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Fecha:</span>' + objDocumento.FechaIngresoToString + '</div>';
    var strMontoTotal = '&nbsp;';
    if (isNotNullEmpty(objDocumento.MontoTotal)) {
        strMontoTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoTotal.toFixed(2));
    }
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Total:</span>' + strMontoTotal + '</div>';
    strHtml += '<div class="clear0"></div>';
    strHtml += '</div>';
    return strHtml;
}
function CargarHtmlPendienteDeFacturar() {
    if (objDocumento != null) {
        var strHtml = '';

        $('#divContenedorDocumentoCabecera').append(CargarHtmlCabeceraPendienteDeFacturar(objDocumento));

        strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<thead>';
        strHtml += '<tr>';
        strHtml += '<tr>';
        strHtml += '<th class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-center no-padding">';
        strHtml += '<table  width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Producto</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';
        strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
        strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Cantidad</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';
        strHtml += '</tr>';
        strHtml += '</thead>';
        strHtml += '<tbody>';
        if (objDocumento.Items != null) {
            for (var i = 0; i < objDocumento.Items.length; i++) {
                if (isVizualizarDetalleResumenLlendoDescripcion(objDocumento.Items[i].NombreObjetoComercial)) {
                    var strHtmlColorFondo = 'wht';
                    if (i % 2 != 0) {
                        strHtmlColorFondo = 'grs';
                    }
                    strHtml += '<tr class="' + strHtmlColorFondo + '">';
                    strHtml += '<td class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-left">';
                    strHtml += objDocumento.Items[i].NombreObjetoComercial;
                    strHtml += '</td>';
                    strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center">';
                    strHtml += objDocumento.Items[i].Cantidad;
                    strHtml += '</td>';
                    strHtml += '</tr>';
                }
            }
        }
        strHtml += '</tbody>';
        strHtml += '</table>';

        if (objDocumento.lista != null) {
            if (objDocumento.lista.length > cantFilaParaEnCabezado) {
                strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }
        }
        
        $('#divContenedorDocumento').html(strHtml);
    } else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
        $('#divContenedorDocumento').html(strHtml);
    }
    $('.footable').footable();
}
function CargarHtmlCabeceraObraSocialCliente(objDocumento) {
    var strHtml = '';

    strHtml += '<div class="div_cont_ctacte">';
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Número:</span>' + getParameterByName('id') + '</div>';
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Fecha:</span>' + objDocumento.FechaToString + '</div>';
    var strMontoTotal = '&nbsp;';
    if (isNotNullEmpty(objDocumento.MontoTotal)) {
        strMontoTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoTotal.toFixed(2));
    }
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Total:</span>' + strMontoTotal + '</div>';
    strHtml += '<div class="clear10 visible-lg"></div>';
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Nombre Plan:</span>' + objDocumento.NombrePlan + '</div>';
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Número Planilla:</span>' + objDocumento.NumeroPlanilla + '</div>';
    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Destinatario:</span>' + objDocumento.Destinatario + '</div>';
    strHtml += '<div class="clear0"></div>';
    strHtml += '</div>';
    return strHtml;
}
function CargarHtmlObraSocialCliente() {
    if (objDocumento != null) {
        var strHtml = '';

        $('#divContenedorDocumentoCabecera').append(CargarHtmlCabeceraObraSocialCliente(objDocumento));

        strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<thead>';
        strHtml += '<tr>';
        strHtml += '<tr>';
        strHtml += '<th class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-center no-padding">';
        strHtml += '<table  width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Descripcion</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';
        strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
        strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Importe</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';
        strHtml += '</tr>';
        strHtml += '</thead>';
        strHtml += '<tbody>';
        var strDocumentoNumero = '';
        if (objDocumento.lista != null) {
            for (var i = 0; i < objDocumento.lista.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-left">';
                strHtml += objDocumento.lista[i].Descripcion;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center">';
                strHtml += objDocumento.lista[i].Importe;
                strHtml += '</td>';
                strHtml += '</tr>';
                strDocumentoNumero = objDocumento.lista[i].NumeroObraSocialCliente;
            }
        }
        strHtml += '</tbody>';
        strHtml += '</table>';

        if (objDocumento.lista != null) {
            if (objDocumento.lista.length > cantFilaParaEnCabezado) {
                strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }
        }
        $('#divContenedorDocumento').html(strHtml);
        //
        var httpRaiz = $('#hiddenRaiz').val();
        var strHtmlDescarga = '';

        strHtmlDescarga += '<a class="btn_download float-right" href="' + httpRaiz + 'servicios/generar_archivoPdf.aspx?tipo=' + objTipoDocumento + '&nro=' + strDocumentoNumero + '"  onclick="return funImprimirComprobantePdf(' + '\'' + strDocumentoNumero + '\'' + ');"  data-toggle="tooltip" data-placement="bottom" title="Descargar en pdf" data-original-title="Descargar en pdf">PDF</a>';
        strHtmlDescarga += '<div class="float-right pad_7 hidden-xs">Descargas:</div>';
        $('#divContenedorDocumentoDescarga').append(strHtmlDescarga);

    } else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
        $('#divContenedorDocumento').html(strHtml);
    }
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
    strHtml += '<h5 style="color: steelblue;">Comprobantes con vencimiento ' + cVencimientosResumen[0].FechaVencimientoToString + '<br>Total: $ ' + FormatoDecimalConDivisorMiles(Number(total).toFixed( 2 )) + '</h5>';
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
//function CargarHtmlCabeceraRecibo(objDocumento) {
//    var strHtml = '';

//    strHtml += '<div class="div_cont_ctacte">';
//    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Número:</span>' + getParameterByName('id') + '</div>';
//    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Fecha:</span>' + objDocumento.FechaToString + '</div>';
//    var strMontoTotal = '&nbsp;';
//    if (isNotNullEmpty(objDocumento.MontoTotal)) {
//        strMontoTotal = '$&nbsp;' + FormatoDecimalConDivisorMiles(objDocumento.MontoTotal.toFixed(2));
//    }
//    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Total:</span>' + strMontoTotal + '</div>';
//    strHtml += '<div class="clear10 visible-lg"></div>';
//    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Nombre Plan:</span>' + objDocumento.NombrePlan + '</div>';
//    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Número Planilla:</span>' + objDocumento.NumeroPlanilla + '</div>';
//    strHtml += '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 doc_info"><span>Destinatario:</span>' + objDocumento.Destinatario + '</div>';
//    strHtml += '<div class="clear0"></div>';
//    strHtml += '</div>';
//    return strHtml;
//}
function CargarHtmlRecibo() {
    if (objDocumento != null) {
        var strHtml = '';

       // $('#divContenedorDocumentoCabecera').append(CargarHtmlCabeceraRecibo(objDocumento));
        $('#divContenedorDocumentoCabecera').append(CargarHtmlCabecera_Generico(objDocumento)); 

        strHtml += '<table class="footable table tbl_ch table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<thead>';
        strHtml += '<tr>';
        strHtml += '<tr>';
        strHtml += '<th class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-center no-padding">';
        strHtml += '<table  width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Descripcion</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';
        strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
        strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
        strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
        strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Importe</td></tr>';
        strHtml += '</table>';
        strHtml += '</th>';
        strHtml += '</tr>';
        strHtml += '</thead>';
        strHtml += '<tbody>';
        var strDocumentoNumero = '';
        if (objDocumento.lista != null) {
            for (var i = 0; i < objDocumento.lista.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-left">';
                strHtml += objDocumento.lista[i].Descripcion;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 text-center">';
                var strImporte = '&nbsp;';
                if (isNotNullEmpty(objDocumento.lista[i].Importe)) {
                    strImporte = '$&nbsp;' + FormatoDecimalConDivisorMiles(parseFloat(objDocumento.lista[i].Importe.replace(",", ".")).toFixed(2));
                }
                strHtml += strImporte;//objDocumento.lista[i].Importe;
                strHtml += '</td>';
                strHtml += '</tr>';
                strDocumentoNumero = objDocumento.lista[i].NumeroObraSocialCliente;
            }
        }
        strHtml += '</tbody>';
        strHtml += '</table>';

        if (objDocumento.lista != null) {
            if (objDocumento.lista.length > cantFilaParaEnCabezado) {
                strHtml += '<a class="btn_volver float-left" href="#" onclick="volver(); return false;"><i class="fa fa-play"></i> VOLVER</a>';
            }
        }
        $('#divContenedorDocumento').html(strHtml);
        //
        var httpRaiz = $('#hiddenRaiz').val();
        //var strHtmlDescarga = '';

        //strHtmlDescarga += '<a class="btn_download float-right" href="' + httpRaiz + 'servicios/generar_archivoPdf.aspx?tipo=' + objTipoDocumento + '&nro=' + strDocumentoNumero + '"  onclick="return funImprimirComprobantePdf(' + '\'' + strDocumentoNumero + '\'' + ');"  data-toggle="tooltip" data-placement="bottom" title="Descargar en pdf" data-original-title="Descargar en pdf">PDF</a>';
        //strHtmlDescarga += '<div class="float-right pad_7 hidden-xs">Descargas:</div>';
        //$('#divContenedorDocumentoDescarga').append(strHtmlDescarga);

    } else {
        strHtml += '<table class="footable table table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
        strHtml += '<tbody>';
        strHtml += '<tr><td  class="text-center"><p class="color_red">' + objMensajeNoEncontrado + '</p></td></tr>';
        strHtml += '</tbody>';
        strHtml += '</table>';
        $('#divContenedorDocumento').html(strHtml);
    }
    $('.footable').footable();
}
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})