var listaReservasVacunas = null;
var listaReservasVacunas_mis = null;
var listaReservasVacunas_total = null;
var selectedInput_reservaVacunas = null;
var isOnclickReservarVacunas = false;

$(document).ready(function () {
    $(document).keydown(function (e) {
        if (!e) {
            e = window.event;
        }
        teclaPresionada_reservaVacunas(e);
    });
    if (listaReservasVacunas == null) {
        listaReservasVacunas = eval('(' + $('#hiddenListaReservasVacunas').val() + ')');
        if (typeof listaReservasVacunas == 'undefined') {
            listaReservasVacunas = null;
        }
    }
    if (listaReservasVacunas_mis == null) {
        listaReservasVacunas_mis = eval('(' + $('#hiddenListaReservasVacunas_mis').val() + ')');
        if (typeof listaReservasVacunas_mis == 'undefined') {
            listaReservasVacunas_mis = null;
        }
    }
    if (listaReservasVacunas_total == null) {
        listaReservasVacunas_total = eval('(' + $('#hiddenListaReservasVacunas_total').val() + ')');
        if (typeof listaReservasVacunas_total == 'undefined') {
            listaReservasVacunas_total = null;
        }
    }

    ReservasVacunas();
    ReservasVacunas_mis();
    ReservasVacunas_total();
});
function limpiarReservarVacunas() {
    for (var i = 0; i < listaReservasVacunas.length; i++) {
       document.getElementById('textReserva' + i).value = '';
    }
    isOnclickReservarVacunas = false;
}
function onclickReservarVacunas() {
    if (!isOnclickReservarVacunas) {

    var l_reserva = [];
    for (var i = 0; i < listaReservasVacunas.length; i++) {

        //listaReservasVacunas[i].rdv_nombre
        var oTextNumber = document.getElementById('textReserva' + i).value;
        if (isNotNullEmpty(oTextNumber)) {
            var data = {};
            data.ID = i;
            data.Login = cli_login();
            data.NombreProducto = listaReservasVacunas[i].rdv_nombre;
            data.UnidadesVendidas = oTextNumber;
            l_reserva.push(data);
        }
    }
        if (l_reserva.length > 0) {
            isOnclickReservarVacunas = true;
        enviarReservaVacunas(l_reserva);
        }
    }
}
function ReservasVacunas() {
    if (listaReservasVacunas != null) {
        if (listaReservasVacunas.length > 0) {
            var strHtml = '';
            strHtml += '<table class="footable table sin_b table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            //
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Descripci&oacute;n</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Condici&oacute;n</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Plazo Pago</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Unid. Pedidas</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            //
            strHtml += '<tbody>';
            for (var i = 0; i < listaReservasVacunas.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + ' cssFilaBuscadorDesmarcar cssFilaBuscador_' + i + '">';
                strHtml += '<td class="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">';
                strHtml += listaReservasVacunas[i].rdv_nombre;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">';
                strHtml += listaReservasVacunas[i].rdv_condicion;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">';
                strHtml += listaReservasVacunas[i].rdv_plazo;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">';
                strHtml += '<input id="' + 'textReserva' + i + '" class="form-control2" onblur="onblurValidarMultiplo(event, this)" onfocus="onfocusSucursal_reservaVacunas(this)" type="text" placeholder="Cantidad" value=""  />';
                strHtml += '<label id="' + 'labelReserva' + i + '" for="' + 'textReserva' + i + '"  class="labelMsgError" >' + listaReservasVacunas[i].rdv_multiplo+'</label>';
                strHtml += '</td>';
                strHtml += '</tr>';
            }
            strHtml += '<tbody>';
            strHtml += '</table>';
            if (listaReservasVacunas.length > 0) { 
                strHtml += '<button class="btn_emp" onclick="onclickReservarVacunas(); return false;">Enviar</button>';
            }
        }
        $('#divGridReservaVacunas').html(strHtml);
    }
}
function ReservasVacunas_mis() {
    if (listaReservasVacunas_mis != null) {
        if (listaReservasVacunas_mis.length > 0) {
            var strHtml = '';
            strHtml += '<table class="footable table sin_b table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            //
            strHtml += '<thead>';
            strHtml += '<tr>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Fecha</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Operador</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Nombre Producto</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Descripci&oacute;n</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Unid. Pedidas</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            //
            strHtml += '<tbody>';
            for (var i = 0; i < listaReservasVacunas_mis.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">';
                strHtml += listaReservasVacunas_mis[i].FechaAltaToString;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">';
                strHtml += listaReservasVacunas_mis[i].TomaWeb ? "Web" :"Telefonista";
                strHtml += '</td>';   
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">';
                strHtml += listaReservasVacunas_mis[i].NombreProducto;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">';
                strHtml += listaReservasVacunas_mis[i].DescripcionPack;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">';
                strHtml += listaReservasVacunas_mis[i].UnidadesVendidas;
                //strHtml += '<input  class="form-control2" type="number" placeholder="Cantidad" value="' + listaReservasVacunas_mis[i].UnidadesVendidas + '" disabled />';
                strHtml += '</td>';
                strHtml += '</tr>';
            }
            strHtml += '<tbody>';
            strHtml += '</table>';
        }
        $('#divGridReservaVacunas').html(strHtml);
    }
}
function ReservasVacunas_total() {
    if (listaReservasVacunas_total != null) {
        if (listaReservasVacunas_total.length > 0) {
            var strHtml = '';
            strHtml += '<table class="footable table sin_b table-stripped" data-empty="No hay informacion disponible" width="100%" align="center" cellspacing="1" cellpadding="5" border="0">';
            //
            strHtml += '<thead>';
            strHtml += '<tr>';
            //strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            //strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            //strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            //strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Nombre Producto</td></tr>';
            //strHtml += '</table>';
            //strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Descripci&oacute;n</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '<th class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center no-padding">';
            strHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
            strHtml += '<tr><td class="col-lg-12 text-center">&nbsp;<div class="clear5"></div></td></tr>';
            strHtml += '<tr class="tr_thead"><td class="col-lg-12 text-center">Unidades Totales</td></tr>';
            strHtml += '</table>';
            strHtml += '</th>';
            strHtml += '</tr>';
            strHtml += '</thead>';
            //
            strHtml += '<tbody>';
            for (var i = 0; i < listaReservasVacunas_total.length; i++) {
                var strHtmlColorFondo = 'wht';
                if (i % 2 != 0) {
                    strHtmlColorFondo = 'grs';
                }
                strHtml += '<tr class="' + strHtmlColorFondo + '">';
                //strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left">';
                //strHtml += listaReservasVacunas_total[i].NombreProducto;
                //strHtml += '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">';
                strHtml += listaReservasVacunas_total[i].NombreProducto;
                strHtml += '</td>';
                strHtml += '<td class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">';
                strHtml +=  listaReservasVacunas_total[i].UnidadesVendidas;
                //strHtml += '<input  class="form-control2" type="number" placeholder="Cantidad" value="' + listaReservasVacunas_total[i].UnidadesVendidas + '" disabled  />';
                strHtml += '</td>';
                strHtml += '</tr>';
            }
            strHtml += '<tbody>';
            strHtml += '</table>';
        }
        $('#divGridReservaVacunas').html(strHtml);
    }
}
/*
  onkeypress="return onkeypressEnterReserva(event, this);"
function onkeypressEnterReserva(e, elemento) {
    let result = true;
    let numero;
    let multiplo;
    let tecla;
    tecla = (document.all) ? e.keyCode : e.which;
    teclaEnNumero = 0;
    numero = parseInt(toString(elemento.value) + toString(teclaEnNumero));
    multiplo = 2;
   
    if (tecla == 13) {//es numerico
        
    }
   


    //if (numero % multiplo == 0) {
    //    result = true;
    //}
    return result;
}
*/

function onblurValidarMultiplo(e, elemento) {
    if (elemento.value != '') {
        let numero;
        let multiplo;
        let index = parseInt(elemento.id.replace('textReserva', ''));
        multiplo = listaReservasVacunas[index].rdv_multiplo;
        numero = parseInt(elemento.value);
        //multiplo = 2;
        if (numero % multiplo == 0) {

        }
        else {
            let msg = 'Debe ser múltiplo de ' + listaReservasVacunas[index].rdv_multiplo;
            var oLabel = document.getElementById('labelReserva' + index);
            oLabel.style.display = "block";
            oLabel.innerHTML = msg;
            elemento.value = '';
            elemento.focus();
            setTimeout(function () {
                oLabel.style.display = "none";
            }, 2000);
        }
    }
}

function onfocusSucursal_reservaVacunas(pValor) {
    selectedInput_reservaVacunas = pValor;
    setTimeout(function () { selectedInput_reservaVacunas.select(); MarcarFilaSeleccionada_reservaVacunas(pValor); }, 5);
}
function DesmarcarFilaSeleccionada_reservaVacunas() {
    $('.cssFilaBuscadorDesmarcar').removeClass('borderFilaBuscadorSeleccionada');
}
function MarcarFilaSeleccionada_reservaVacunas(pValor) {
    //if (!$("#divBody").hasClass("modal-open-Celular")) {
    DesmarcarFilaSeleccionada_reservaVacunas();
    var nombre = pValor.id;
    nombre = nombre.replace('textReserva', '');
    // var palabrasBase = nombre.split("_");
    var fila = parseInt(nombre);
    $('.cssFilaBuscador_' + fila).addClass('borderFilaBuscadorSeleccionada');
    //}
}
function teclaPresionada_reservaVacunas(e) {
    if (typeof (e) == 'undefined') {
        e = event;
    }
    var keyCode = document.all ? e.which : e.keyCode;
    var cantMaxFila_reservaVacunas = 0;
    
    if (listaReservasVacunas != null) {
        cantMaxFila_reservaVacunas = listaReservasVacunas.length;
    }
    if (keyCode == 40 || keyCode == 38 || keyCode == 13) {
        if (selectedInput_reservaVacunas != null) {
            if (selectedInput_reservaVacunas.id != undefined) {
                    if (keyCode == 13) {
                        return;
                    }
                    var fila = 0;
                    var nombre = selectedInput_reservaVacunas.id;
                    nombre = nombre.replace('textReserva', '');
                    fila = parseInt(nombre);
                    var mytext = null;
                    while (mytext == null) {
                        var isSalirWhile = false;
                        switch (keyCode) {
                            case 38: //arriba
                                if (fila != 0) {
                                    fila--;
                                } else {
                                    isSalirWhile = true;
                                }
                                break;
                            case 40: //abajo
                                if (fila < cantMaxFila_reservaVacunas - 1) {
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
                        mytext = $("#textReserva" + fila);
                        if (mytext.length > 0) {
                        } else {
                            mytext = null;
                        }
                    }
                    if (mytext != null) {
                        mytext.focus();
                    }
            }
        }
    }
    return true;
}