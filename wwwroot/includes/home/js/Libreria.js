var objMensajeNoEncontrado = '<div style="margin: 10px; font-size:11px;color: #ed1125;" ><b>' + 'No se han encontrado resultados' + '</b></div>';
var cantFilaParaEnCabezado = 30;
var objMensajeDllNoDisponible = 'En este momento estamos realizando tareas de mantenimiento, por favor intente más tarde.';

function OnFail(ex) {
    //alert(String(ex));
}
function OnFailCargandoContenedorGeneralFondo(args) {
    $('#divCargandoContenedorGeneralFondo').css('display', 'none');
}
function isNotNullEmpty(pValor) {
    //    if (typeof pValor == 'undefined') {
    //        return false;
    //    }
    if (pValor == undefined) {
        return false;
    }
    if (pValor == null) {
        return false;
    }
    if (pValor == '') {
        return false;
    }
    return true;
}
function multiple(valor, multiple) {
    resto = valor % multiple;
    if (resto == 0)
        return true;
    else
        return false;
}
function toString00(pNro) {
    if (pNro.toString().length == 1) {
        return '0' + pNro;
    }
    return pNro;
}
// formato fecha dd/mm/aaaa
// 0 son iguales
// 1 fecha1 es mayor
// -1 fecha2 es mayor
function compararFecha(fecha, fecha2) {
    var xMonth = fecha.substring(3, 5);
    var xDay = fecha.substring(0, 2);
    var xYear = fecha.substring(6, 10);
    var yMonth = fecha2.substring(3, 5);
    var yDay = fecha2.substring(0, 2);
    var yYear = fecha2.substring(6, 10);
    if (xYear > yYear) {
        return 1;
    }
    else {
        if (xYear == yYear) {
            if (xMonth > yMonth) {
                return 1;
            }
            else {
                if (xMonth == yMonth) {
                    if (xDay == yDay) {
                        return 0;
                    } else {
                        if (xDay > yDay)
                            return 1;
                        else
                            return -1;
                    }
                }
                else
                    return -1;
            }
        }
        else
            return -1;
    }
}
function isDireccionWeb(pValor) {
    strExpReg = /^http:\/\/[a-zA-Z0-9-_:/.?&amp;=]+$/;
    if (!strExpReg.test(pValor)) {
        return false;
    }
    return true;
}
function AgregarFaltanteDireccionWeb(pValor) {
    var resultado = pValor;
    if (pValor.length > 7) {
        if (pValor.substring(0, 7) != 'http://') {
            resultado = 'http://' + pValor;
        }
    }
    return resultado;
}
function ConvertMedidaCssToNro(pValor) {
    //var resultado = '';
    pValor = pValor.replace('px', '');
    var nro = parseInt(pValor);
    return nro;
}
function quitarHTML(pValor) {
    return pValor.replace(/<[^>]+>/g, '');
}

function isNumeroEntero(pValor) {
    if (/^([0-9])*$/.test(pValor)) {
        return true;
    }
    else {
        return false;
    }
}
function IsMail(texto) {

    var mailres = true;
    var cadena = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890@._-";

    var arroba = texto.indexOf("@", 0);
    if ((texto.lastIndexOf("@")) != arroba) arroba = -1;

    var punto = texto.lastIndexOf(".");

    for (var contador = 0; contador < texto.length; contador++) {
        if (cadena.indexOf(texto.substr(contador, 1), 0) == -1) {
            mailres = false;
            break;
        }
    }

    if ((arroba > 1) && (arroba + 1 < punto) && (punto + 1 < (texto.length)) && (mailres == true) && (texto.indexOf("..", 0) == -1))
        mailres = true;
    else
        mailres = false;

    return mailres;
}
// función que es usa por la galeria flash de anibal sin tarea y funcion importante 
function openChartEditor(pValor) {

}
function isArchivoPDF(pValor) {
    var resultado = false;
    var RutaYNombre = String(pValor);
    if (RutaYNombre.length > 3) {
        if (RutaYNombre.substring(RutaYNombre.lastIndexOf('.') + 1).toLowerCase() == 'pdf') {
            resultado = true;
        }
    }
    return resultado;
}
// obtener tamaño de ventana
function SizeVentana() {
    var Tamanyo = [0, 0];
    if (typeof window.innerWidth != 'undefined') {
        Tamanyo = [window.innerWidth, window.innerHeight];
    }
    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        Tamanyo = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    }
    else {
        Tamanyo = [document.getElementsByTagName('body')[0].clientWidth, document.getElementsByTagName('body')[0].clientHeight];
    }
    return Tamanyo;
}
function SizeDocumento() {
    var Tamanyo = [0, 0];
    var alto = Math.max(document.body.offsetHeight, document.body.scrollHeight, document.documentElement ? document.documentElement.scrollHeight : 0, document.documentElement ? document.documentElement.offsetHeight : 0);
    var ancho = Math.max(document.body.offsetWidth, document.body.scrollWidth, document.documentElement ? document.documentElement.scrollWidth : 0, document.documentElement ? document.documentElement.offsetWidth : 0);
    Tamanyo = [ancho, alto];
    return Tamanyo;
}

function RemplazarPalabraAcentoASinAcento(pValor) {
    var cadena = pValor;
    cadena = cadena.replace('Á', 'A');
    cadena = cadena.replace('É', 'E');
    cadena = cadena.replace('Í', 'I');
    cadena = cadena.replace('Ó', 'O');
    cadena = cadena.replace('Ú', 'U');
    //	cadena=cadena.replace('Ñ','N');
    cadena = cadena.replace('Ä', 'A');
    cadena = cadena.replace('Ë', 'E');
    cadena = cadena.replace('Ï', 'I');
    cadena = cadena.replace('Ö', 'O');
    cadena = cadena.replace('Ü', 'U');

    cadena = cadena.replace('á', 'a');
    cadena = cadena.replace('é', 'e');
    cadena = cadena.replace('í', 'i');
    cadena = cadena.replace('ó', 'o');
    cadena = cadena.replace('ú', 'u');
    //	cadena=cadena.replace('ñ','ñ');
    cadena = cadena.replace('ä', 'a');
    cadena = cadena.replace('ë', 'e');
    cadena = cadena.replace('ï', 'i');
    cadena = cadena.replace('ö', 'o');
    cadena = cadena.replace('ü', 'u');
    return cadena;
}

// Convierte el htmlcode en texto
function ConvertHtmlCodeToText(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText;
}

function ObtenerLinkDeDocumentoDesdeStr(pValor) {
    var resultado = pValor;
    if (pValor.length > 4) {
        var tipo = pValor.substring(0, 3);
        var nro = $.trim(pValor.substring(3, pValor.length).replace('-', ''));
        switch (tipo) {
            case 'FAC':
                resultado = '<div class="txt_link_doc"><a href="' + 'Documento.aspx?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a></div>';
                //                location.href = 'Documento.aspx?t=' + tipo + '&id=' + nro;
                break;
            case 'WEB':
                resultado = '<div class="txt_link_doc"><a href="' + 'Documento.aspx?t=' + 'FAC' + '&id=' + nro + '" >' + pValor + '</a></div>';
                break;
            case 'TRZ':
                resultado = '<div class="txt_link_doc"><a href="' + 'Documento.aspx?t=' + 'FAC' + '&id=' + nro + '" >' + pValor + '</a></div>';
                break;
            case 'PAP':
                resultado = '<div class="txt_link_doc"><a href="' + 'Documento.aspx?t=' + 'FAC' + '&id=' + nro + '" >' + pValor + '</a></div>';
                break;
            case 'PAN':
                resultado = '<div class="txt_link_doc"><a href="' + 'Documento.aspx?t=' + 'FAC' + '&id=' + nro + '" >' + pValor + '</a></div>';
                break;
            case 'NCR':
                resultado = '<div class="txt_link_doc"><a href="' + 'Documento.aspx?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a></div>';
                break;
            case 'NDE':
                resultado = '<div class="txt_link_doc"><a href="' + 'Documento.aspx?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a></div>';
                break;
            case 'RES':
                resultado = '<div class="txt_link_doc"><a href="' + 'Documento.aspx?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a></div>';
                break;
            case 'OSC':
                resultado = '<div class="txt_link_doc"><a href="' + 'Documento.aspx?t=' + tipo + '&id=' + nro + '" >' + pValor + '</a></div>';
                break;
            default:
                break;
        }

    }
    return resultado;
}
function isDetalleComprobante(pValor) {
    switch (pValor) {
        case "FAC":
            return true;
            break;
        case "NCR":
            return true;
            break;
        case "NDE":
            return true;
            break;
        case "RES":
            return true;
            break;
        default:
            return false;
            break;
    }
}

//////////////
function FormatoDecimalConDivisorMiles(pValor) {
    var resultado = pValor;
    var isNroNegativo = false;
    if (isNotNullEmpty(pValor)) {
        if (pValor.toString().indexOf('-') !== -1) {
            isNroNegativo = true;
        }
        var nroBase = pValor.toString().replace('-', '').split('.');
        if (nroBase.length > 0) {
            var cant = nroBase[0].length;
            var parteDecimalAUX = '';
            var numeroPorParte = nroBase[0];
            while (numeroPorParte.length > 3) {
                parteDecimalAUX = '.' + numeroPorParte.substr(numeroPorParte.length - 3) + parteDecimalAUX;
                numeroPorParte = numeroPorParte.substring(0, numeroPorParte.length - 3);
            }
            parteDecimalAUX = numeroPorParte + parteDecimalAUX;
            if (nroBase[1] == undefined) {
                resultado = parteDecimalAUX;
            } else {
                resultado = parteDecimalAUX + ',' + nroBase[1];
            }
        }
        if (isNroNegativo) {
            resultado = '-' + resultado;
        }
    }
    return resultado;
}


function ObtenerPrecioConFormato(pValor) {
    var precio = pValor;
    precio = precio.replace('$&nbsp;', '');
    precio = precio.replace('.', '');
    precio = precio.replace(',', '.');
    precio = parseFloat(precio);
    return precio;
}
function ConvertirSucursalParaColumno(pValor) {
    var resultado = pValor;
    switch (pValor) {
        case 'CB':
            resultado = 'CBA';
            break;
        case 'SF':
            resultado = 'SFE';
            break;
        case 'CH':
            resultado = 'CHL';
            break;
        case 'CO':
            resultado = 'CDU';
            break;
        case 'CD':
            resultado = 'CON';
            break;
        case 'VH':
            resultado = 'ROS';
            break;
        default:
            break;
    }
    return resultado;
}
function volver() {
    //window.history.back(2);
    history.go(-1);
}

///
var listaMensajeImportanteMostrar = null;
var longMensajeImportanteMostrar = null;
var listaPopUp = null;
jQuery(document).ready(function () {

    if (listaMensajeImportanteMostrar == null) {
        listaMensajeImportanteMostrar = eval('(' + $('#hiddenListaMensajeImportante').val() + ')');
        if (typeof listaMensajeImportanteMostrar == 'undefined') {
            listaMensajeImportanteMostrar = null;
        }
    }
    if (listaPopUp == null) {
        listaPopUp = eval('(' + $('#hiddenListaPopUp').val() + ')');
        if (typeof listaPopUp == 'undefined') {
            listaPopUp = null;
        }
    }
    if (listaMensajeImportanteMostrar != null) {
        longMensajeImportanteMostrar = listaMensajeImportanteMostrar.length;
    }
    setTimeout(function () { MostrarMensajeImportante(); }, 500)

    MostrarMensajePopUp()
});

function MostrarMensajeImportante() {
    if (listaMensajeImportanteMostrar != null) {

        if (listaMensajeImportanteMostrar.length > 0) {
            var indexImportante = listaMensajeImportanteMostrar.length - longMensajeImportanteMostrar;
            longMensajeImportanteMostrar = longMensajeImportanteMostrar - 1;
            if (indexImportante == 0) {
                $("#dialogMensaje")[0].title = listaMensajeImportanteMostrar[indexImportante].tme_asunto;
            } else {
                $("#ui-id-1").html(listaMensajeImportanteMostrar[indexImportante].tme_asunto);
            }   
            // $("#dialogMensajeTexto").text(listaMensajeImportanteMostrar[indexImportante].tme_mensaje);
            $("#dialogMensajeTexto").html(listaMensajeImportanteMostrar[indexImportante].tme_mensaje);
            $("#dialogMensaje").dialog({
                width: 500,
                height: 230,
                modal: true,
                close: function (event, ui) { MostrarMensajeImportanteSiguiente(); }
            });
        }// fin   if ( listaMensajeImportanteMostrar.length > 0){
    }
}
function MostrarMensajeImportanteSiguiente() {
    if (longMensajeImportanteMostrar > 0) {
        MostrarMensajeImportante();
    }
}
function MostrarMensajeGeneral(pTitulo, pDescripcion) {
    $('#divMasterGeneralTitulo').html(pTitulo);
    $('#divMasterGeneralCuerpo').html(pDescripcion);
    var arraySizeDocumento = SizeDocumento();
    document.getElementById('divMasterContenedorGeneralFondo').style.height = arraySizeDocumento[1] + 'px';
    document.getElementById('divMasterContenedorGeneralFondo').style.display = 'block';
    document.getElementById('divMensajeGeneral').style.display = 'block';
    if (document.getElementById('btnMsgCancelar') != null)
    document.getElementById('btnMsgCancelar').style.display = 'none';
    document.getElementById("btnMsgOk").focus();
    isMoverCursor = false;

}

function CerrarMensajeGeneralCancelar() {
    CerrarMensajeGeneral();
}

function CerrarMensajeGeneral() {
    document.getElementById('divMasterContenedorGeneralFondo').style.display = 'none';
    document.getElementById('divMensajeGeneral').style.display = 'none';
    document.getElementById('divMensajeGeneralPopUp').style.display = 'none';
    isMoverCursor = true;

    if (typeof (isEnterExcedeImporte_msgError) != "undefined") {
        if (isEnterExcedeImporte_msgError) {
            jQuery("#txtBuscador").val('');
            onClickBuscar();
            document.getElementById('txtBuscador').focus();
            isEnterExcedeImporte_msgError = false;
        }
    }
    if ($('#btnMsgCancelar').length > 0) {
        document.getElementById('btnMsgCancelar').value = '1';
    }
   
}
//La función getParameterByName recibe un parámetro del tipo String (cadena de texto)
//que va a ser utilizado para evaluar por medio de una expresión regular que busque todo 
//el contenido entre el final de la cadena recibida seguido por un símbolo de igual (=) 
//y el final de la cadena a donde buscar (location.search) o hasta encontrar el símbolo «et» 
//también conocido como «ampersand» (&). Al final dicho texto encontrado decodificado y devuelto.
//    En el remoto caso de no encontrar coincidencias, devolverá una cadena vacía.
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function CerrarMensajeGeneralPopUp() {
    CerrarMensajeGeneral()
}
function MostrarMensajePopUp() {


    if (listaPopUp != null && listaPopUp.length > 0 && listaPopUp[0].arc_nombre != null) {

        var arraySizeDocumento = SizeDocumento();
        document.getElementById('divMasterContenedorGeneralFondo').style.height = arraySizeDocumento[1] + 'px';
        document.getElementById('divMasterContenedorGeneralFondo').style.display = 'block';
        document.getElementById('divMensajeGeneralPopUp').style.display = 'block';
        
  
            $('#idImgPopUp').attr('src', '../../../servicios/thumbnail.aspx?r=' + 'popup' + '&n=' + listaPopUp[0].arc_nombre + '&an=' + String(550) + '&al=' + String(280));
            //$('#tdImgProductoDatos').css('display', 'inline');
        

        isMoverCursor = false;

            //var indexImportante = listaMensajeImportanteMostrar.length - longMensajeImportanteMostrar;
            //longMensajeImportanteMostrar = longMensajeImportanteMostrar - 1;
            //if (indexImportante == 0) {
            //    $("#dialogMensaje")[0].title = listaMensajeImportanteMostrar[indexImportante].tme_asunto;
            //} else {
            //    $("#ui-id-1").html(listaMensajeImportanteMostrar[indexImportante].tme_asunto);
            //}
            //// $("#dialogMensajeTexto").text(listaMensajeImportanteMostrar[indexImportante].tme_mensaje);
            //$("#dialogMensajeTexto").html(listaMensajeImportanteMostrar[indexImportante].tme_mensaje);
            //$("#dialogMensaje").dialog({
            //    width: 500,
            //    height: 230,
            //    modal: true,
            //    close: function (event, ui) { MostrarMensajeImportanteSiguiente(); }
            //});
       
    }



 

}
