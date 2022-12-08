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
    if (pValor === 0 ) {
        return true;
    }
    if (pValor === '') {
        return false;
    }
    return true;
}
function toString00(pNro) {
    if (pNro.toString().length == 1) {
        return '0' + pNro;
    }
    return pNro;
}
function ObtenerPrecioConFormato(pValor) {
    var precio = pValor;
    precio = precio.replace('$&nbsp;', '');
    precio = precio.replace('.', '');
    precio = precio.replace(',', '.');
    precio = parseFloat(precio);
    return precio;
}
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
function AgregarMark(pValor) {
    var valorTemp = pValor.toUpperCase();
    var tempPalabraBuscador = varPalabraBuscador.toUpperCase();
    var palabrasBase = tempPalabraBuscador.split(" ");
    var palabrasReales = [];
    for (var i = 0; i < palabrasBase.length; i++) {
        var p = palabrasBase[i].replace(/([\.\/\(\)\[\]\*\?\{\}\^\$])/g, "\\$1");
        if (p != '') {
            palabrasReales.push(p);
        }
    }
    for (var i = 0; i < palabrasReales.length; i++) {
        var re = new RegExp("(" + palabrasReales[i] + ")", 'g');
        // valorTemp = valorTemp.replace(re, "<mark>$1</mark>");
        // if navagador explore
        var navegador = navigator.appName
        if (navegador == 'Microsoft Internet Explorer') {
            valorTemp = valorTemp.replace(re, '<span style="background-color:#C4E3F7;">$1</span>');
        } else {
            valorTemp = valorTemp.replace(re, "<mark>$1</mark>");
        }
        // fin if navegador explore
    }
    return valorTemp;
}
function OnFail(ex) {
    //alert(String(ex));
    funLog();
}
function SizeDocumento() {
    var Tamanyo = [0, 0];
    var alto = Math.max(document.body.offsetHeight, document.body.scrollHeight, document.documentElement ? document.documentElement.scrollHeight : 0, document.documentElement ? document.documentElement.offsetHeight : 0);
    var ancho = Math.max(document.body.offsetWidth, document.body.scrollWidth, document.documentElement ? document.documentElement.scrollWidth : 0, document.documentElement ? document.documentElement.offsetWidth : 0);
    Tamanyo = [ancho, alto];
    return Tamanyo;
}
function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
    return false;
}
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
function volver() {
    //window.history.back(2);
    history.go(-1);
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
function getFormat_DD_MM_YYYY(today) {

    //var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

function funDaterangepicker(pDivName,pFunSetear) {
    var dateNow = new Date();
    var now = getFormat_DD_MM_YYYY(dateNow);
    //var dateNext = new Date(dateNow.setDate(dateNow.getDate() + 6));
    //var next = getFormat_DD_MM_YYYY(dateNext);
    var dateLast = new Date(dateNow.setDate(dateNow.getDate() - 6));
    var last = getFormat_DD_MM_YYYY(dateLast);
    eval(pFunSetear + '(' + dateLast.getTime() + ',' + (new Date()).getTime() + ')');

    $('#' + pDivName).daterangepicker({
        "startDate": last,
        "endDate": now,
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aceptar",
            "cancelLabel": "Cancelar",
            "fromLabel": "Desde",
            "toLabel": "Hasta",
            "customRangeLabel": "Personalizado",
            "daysOfWeek": ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
            "monthNames": ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            "firstDay": 1
        }
    }, function (start, end, label) {
        eval(pFunSetear + '(' + start + ',' + end + ')');
       // console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
}
function printDiv(nombreDiv) {
    var contenido = document.getElementById(nombreDiv).innerHTML;
    var contenidoOriginal = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();

    document.body.innerHTML = contenidoOriginal;
}
Number.prototype.toFixedDown = function (digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};