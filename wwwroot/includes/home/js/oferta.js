var tamanioOferta_img = '300';

function prepararListaOfertas(pValor) {
    listOferta = eval('(' + pValor + ')');
    if (typeof listOferta == 'undefined') {
        listOferta = null;
    }
    CargarHtmlOfertasEnHome(listOferta);
}
function prepararListaLanzamiento(pValor) {
    var listLanzamientos = eval('(' + pValor + ')');
    if (typeof listLanzamientos == 'undefined') {
        listLanzamientos = null;
    }
    CargarHtmlLanzamientosEnHome(listLanzamientos);
}

function CargarHtmlLanzamientosEnHome(pListaOfertaLanzamiento) {
    if (pListaOfertaLanzamiento == null || pListaOfertaLanzamiento.length == 0) {
        $('.cssLanzamientos').addClass('cssHomeDisplayNone');
    } else { 
        $('#divContenedorNuevosLanzamientos').html(CargarHtmlOfertasEnHome_generico(pListaOfertaLanzamiento));
    }
}
function CargarHtmlOfertasEnHome(pListaOfertaLanzamiento) {
    if (pListaOfertaLanzamiento == null || pListaOfertaLanzamiento.length == 0) {
        $('.cssOfertas').addClass('cssHomeDisplayNone');
    } else {
        $('#divContenedorOfertas').html(CargarHtmlOfertasEnHome_generico(pListaOfertaLanzamiento));
    }
}
function CargarHtmlOfertasEnHome_generico(pListaOfertaLanzamiento) {
    var result = '';
    if (pListaOfertaLanzamiento != null) {
        var strHtml = '';
        strHtml += '<div class="row">';
        for (var i = 0; i < pListaOfertaLanzamiento.length; i++) {
            if (multiple(i, 4) && i != 0) {
                strHtml += '</div>';
                strHtml += '<div class="row">';
            }
            strHtml += '<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">';
            strHtml += '<div class="col-item">';
            strHtml += '<div class="photo">';
            if (isNotNullEmpty(pListaOfertaLanzamiento[i].ofe_etiqueta)) {
                var colorEtiqueta = '';
                if (isNotNullEmpty(pListaOfertaLanzamiento[i].ofe_etiquetaColor))
                    colorEtiqueta = 'style="background-color: #' + pListaOfertaLanzamiento[i].ofe_etiquetaColor + '"';
                strHtml += '<div class="etiqueta" ' + colorEtiqueta + '>' + pListaOfertaLanzamiento[i].ofe_etiqueta + '</div>';
            }
            if (!pListaOfertaLanzamiento[i].ofe_nuevosLanzamiento && isNotNullEmpty(pListaOfertaLanzamiento[i].namePdf)) {
                strHtml += '<a target="_blank" href="../../servicios/descargarArchivo?t=' + 'ofertaspdf' + '&n=' + pListaOfertaLanzamiento[i].namePdf + '&inline=yes"><div class="bg_promo"></div><div class="btn_bg_promo">AMPLIAR</div>';
            }else if (pListaOfertaLanzamiento[i].ofe_nuevosLanzamiento && isNotNullEmpty(pListaOfertaLanzamiento[i].nameImagenAmpliar)) {
                strHtml += '<a  href="#" onclick="onclickNuevoLanzamiento(' + pListaOfertaLanzamiento[i].ofe_idOferta + '); return false;"><div class="bg_promo"></div><div class="btn_bg_promo">AMPLIAR</div>';
            }
            if (isNotNullEmpty(pListaOfertaLanzamiento[i].nameImagen))
                strHtml += '<img class="img-responsive"  src="' + '../../../servicios/thumbnail?r=' + 'ofertas' + '&n=' + pListaOfertaLanzamiento[i].nameImagen + '&an=' + tamanioOferta_img + '&al=' + tamanioOferta_img + '&c=FFFFFF" alt="oferta" title="" />';
            else
                strHtml += '<img class="img-responsive"  src="' + '../../../servicios/thumbnail?r=' + 'ofertas' + '&n=' + 'productosinfoto.png' + '&an=' + tamanioOferta_img + '&al=' + tamanioOferta_img + '&c=FFFFFF" alt="oferta" title=""/>';
            if (!pListaOfertaLanzamiento[i].ofe_nuevosLanzamiento && isNotNullEmpty(pListaOfertaLanzamiento[i].namePdf)) {
                strHtml += '</a>';
            }else if (pListaOfertaLanzamiento[i].ofe_nuevosLanzamiento && isNotNullEmpty(pListaOfertaLanzamiento[i].nameImagenAmpliar)) {
                strHtml += '</a>';
            }
            strHtml += '</div>'; //<div class="photo">
            strHtml += '<div class="info">';
            strHtml += '<div class="row">';
            strHtml += '<div class="price col-lg-12">';
            strHtml += '<h5>' + pListaOfertaLanzamiento[i].ofe_titulo + '</h5>';
            strHtml += '<p>' + pListaOfertaLanzamiento[i].ofe_descr + '</p>';
            var descuento = '';
            if (isNotNullEmpty(pListaOfertaLanzamiento[i].ofe_descuento))
                descuento = pListaOfertaLanzamiento[i].ofe_descuento;
            strHtml += '<div class="desc">' + descuento + '</div>';
            var txtAñadirCarrito = 'AÑADIR AL CARRITO';
            //if (isNotNullEmpty(pListaOfertaLanzamiento[i].namePdf))
            //{
            //    txtAñadirCarrito = 'AÑADIR';
            //    strHtml += '<a class="btn_ampliar  float-right" target ="_blank" href="../../archivos/' + 'ofertaspdf' + '/' + pListaOfertaLanzamiento[i].namePdf + '">AMPLIAR</a>';//AMPLIAR
            //}
            if (pListaOfertaLanzamiento[i].ofe_tipo == 1 && pListaOfertaLanzamiento[i].countOfertaDetalles > 0)
                strHtml += '<a class="btn_carrito" onclick="onclickCarrito(' + pListaOfertaLanzamiento[i].ofe_idOferta + ');" >' + txtAñadirCarrito + '</a>';//AÑADIR AL CARRITO
            else if (pListaOfertaLanzamiento[i].ofe_tipo == 2 && pListaOfertaLanzamiento[i].ofe_nombreTransfer != null)
                strHtml += '<a class="btn_carrito" onclick="onclickCarrito(' + pListaOfertaLanzamiento[i].ofe_idOferta + ');" >' + txtAñadirCarrito + '</a>';

            strHtml += '</div>'; //<div class="price col-lg-12">
            strHtml += '<div class="clearfix"></div>';
            //strHtml += '</div>';
            strHtml += '</div>'; //<div class="row">
            strHtml += '</div>'; //<div class="info">
            strHtml += '</div>'; //'<div class="col-item">'
            strHtml += '</div>'; //'<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">'
        }
        strHtml += '</div>'; // '<div class="row">';
        result = strHtml;// $('#divContenedorOfertas').html(strHtml);
    }
    return result;
}

function onclickCarrito(pValor) {
    idOferta = pValor;
    //$('#name_carrito').val('');
    //$('#password_carrito').val('');
    var myName = localStorage['name'] || '';
    var myPass = localStorage['pass'] || '';
    $('#name_carrito').val(myName);
    $('#password_carrito').val(myPass);
    $('#myModal').modal();
}

function RecuperarTodasOfertas() {
    PageMethods.RecuperarTodasOfertas(OnCallBackRecuperarTodasOfertas, OnFail);
}
var listOferta = [];
function OnCallBackRecuperarTodasOfertas(args) {
    if (args) {
        prepararListaOfertas(args);
    }
}