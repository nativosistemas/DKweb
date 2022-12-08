var listOferta = null;
var isMostrarOferta = null;
var listaPromocionesClientes = null;


jQuery(document).ready(function () {

    isMostrarOferta = $('#hiddenIsMostrarOferta').val();
    if (typeof isMostrarOferta == 'undefined') {
        isMostrarOferta = false;
    } else {
        if (isMostrarOferta == 'true') {
            isMostrarOferta = true;
        } else if (isMostrarOferta == 'false') {
            isMostrarOferta = false;
        } else {
            isMostrarOferta = false;
        }
    }

    prepararListaOfertas($('#hiddenListaOfertas').val());



    listaPromocionesClientes = eval('(' + $('#hiddenListaPromocionesClientes').val() + ')');
    if (typeof listaPromocionesClientes == 'undefined') {
        listaPromocionesClientes = null;
    }
    CargarHtmlPromocionesClientes();
});
function prepararListaOfertas(pValor) {


    listOferta = eval('(' + pValor + ')');
    if (typeof listOferta == 'undefined') {
        listOferta = null;
    }


    CargarHtmlOfertasEnHome();

}
var tamanio = 300;
function CargarHtmlOfertasEnHome() {
    if (listOferta != null && listOferta.length > 0) {
        var strHtml = '';


        strHtml += '<a id="botonOferta" class="s-h_off_fxd" href="#"><i class="fa fa-angle-up"></i>Mostrar ofertas</a>';
        strHtml += '<div class="off_fxd_cont">';
        strHtml += '<div class="clear20"></div>';
        strHtml += '<div class="owl-carousel">';

        var rowCount = 1;
        for (var i = 0; i < listOferta.length; i++) {


            strHtml += '<div class="item">';

            strHtml += '<div class="col-xs-4 item_img">';

            //if (isNotNullEmpty(listOferta[i].namePdf)) {
            //    strHtml += '<a target="_blank" href="../../archivos/' + 'ofertaspdf' + '/' + listOferta[i].namePdf + '"><div class="bg_promo"></div><div class="btn_bg_promo">AMPLIAR</div>';
            //}
            if (isNotNullEmpty(listOferta[i].nameImagen))
                strHtml += '<img class="img-responsive" src="' + '../servicios/thumbnail?r=ofertas&n=' + listOferta[i].nameImagen + '&an=' + tamanio + '&al=' + tamanio + '&c=FFFFFF' + '" alt="oferta" title=" alt="oferta">';
            else
                strHtml += '<img class="img-responsive" src="' + '../servicios/thumbnail?r=ofertas&n=' + 'productosinfoto.png' + '&an=' + tamanio + '&al=' + tamanio + '&c=FFFFFF' + '" alt="oferta" title=" alt="oferta">';
            //if (isNotNullEmpty(listOferta[i].namePdf)) {
            //    strHtml += '</a>';
            //}
            strHtml += '</div>'; //<div class="col-xs-4 item_img">


            strHtml += '<div class="col-xs-8">';

            strHtml += '<h4>' + listOferta[i].ofe_titulo + '</h4>';


            strHtml += '<div class="cont_dsc"> <div class="dsc">' + listOferta[i].ofe_descr + '</div>';
            var descuento = '';
            if (isNotNullEmpty(listOferta[i].ofe_descuento))
                descuento = listOferta[i].ofe_descuento;
            strHtml += '<div class="off" >' + descuento + '</div>';


            strHtml += '</div>'; // <div class="cont_dsc">
            var txtAñadirCarrito = 'AÑADIR AL CARRITO';

            if (listOferta[i].ofe_tipo == 1 && listOferta[i].countOfertaDetalles > 0)
                strHtml += '<a href=""  class="btn_carrito" onclick="onclickCarrito(' + listOferta[i].ofe_idOferta + '); return false;" >' + txtAñadirCarrito + '</a>';
            else if (listOferta[i].ofe_tipo == 2 && listOferta[i].ofe_nombreTransfer != null)
                strHtml += '<a href=""  class="btn_carrito" onclick="onclickCarrito(' + listOferta[i].ofe_idOferta + '); return false;" >' + txtAñadirCarrito + '</a>';

            strHtml += '</div>'; // <div class="col-xs-8">
            strHtml += '</div>'; // <div class="item">
        }


        strHtml += '</div>'; //<div class="owl-carousel">
        strHtml += '</div>'; //<div class="off_fxd_cont">

        $('#divContenedorOfertas').html(strHtml);





        //ofertas
        $('.s-h_off_fxd').click(function () {
            funIsMostrarOferta(!isMostrarOferta);
            accionOferta();
            return false;
        });
        $('.owl-carousel').owlCarousel({
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: false,
            pagination: false,
            items: 3,
            loop: true,
            responsiveClass: true,
            margin: 0,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1200: {
                    items: 2,
                },
            },
            navigation: true,
            navigationText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            autoPlay: 2500,
            stopOnHover: true,
        })
        //setTimeout(function () { accionOferta(); }, 300);
        if (isMostrarOferta) {
            accionOferta();
        }
       // setTimeout("cambiarColorOferta()", 1000);
    }
}


var isColorOfertaAccion = true;
var nroColorOferta = 0;
var styleColorOferta = '#1b82c5';
var fontWeightColorOferta = '400';
function cambiarColorOferta() {

    if (isColorOfertaAccion) {
        switch (nroColorOferta) {
            case 0:
                styleColorOferta = '#315e7b';
                fontWeightColorOferta = '600';
                break;
            case 1:
                styleColorOferta = '#5a5c5e';
                fontWeightColorOferta = '400';
                break;
            case 2:
                styleColorOferta = '#35587b';
                fontWeightColorOferta = '600';
                break;
            case 3:
                styleColorOferta = '#1b82c5';
                fontWeightColorOferta = '400';
                break;
            default:
                break;
        }
        nroColorOferta++;
        if (nroColorOferta > 3)
            nroColorOferta = 0;
        document.getElementById("botonOferta").style.backgroundColor = styleColorOferta;
        //document.getElementById("botonOferta").style.fontWeight = fontWeightColorOferta;
       // setTimeout("cambiarColorOferta()", 150);
    }

}
function accionOferta() {
    if ($(".off_fxd_cont").height() < 3) {
        $(".off_fxd_cont").animate({ 'height': 200 }, 500);
        $(".s-h_off_fxd").animate({ "bottom": 200 }, 500).html('<i class="fa fa-angle-down"></i>Ocultar ofertas');
        isColorOfertaAccion = false;
        return false;
    } else {
        $(".s-h_off_fxd").animate({ "bottom": 2 }, 500).html('<i class="fa fa-angle-up"></i>Mostrar ofertas');
        $(".off_fxd_cont").animate({ "height": 2 }, 500);
        isColorOfertaAccion = true;
        //cambiarColorOferta();
        return false;
    }
}
function onclickCarrito(pValor) {
    //idOferta = pValor;
    cargarOferta(pValor);
}
function OnCallBackcargarOferta(args) {
    if (args)
        location.href = '../mvc/Buscador';
}
function CargarHtmlPromocionesClientes() {
    if (listaPromocionesClientes != null) {
        var strHtml = '';
        //strHtml += '<table>';
        var rowCount = 1;
        for (var i = 0; i < listaPromocionesClientes.length; i++) {
            strHtml += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">';//<div class="col-12 col-sm-6 col-md-4 col-lg-3">
            //if (rowCount == 1)
            //    strHtml += '<tr>';

            //strHtml += '<td>';
            strHtml += '<div class="col-item">';
            strHtml += '<div class="photo">';
            if (isNotNullEmpty(listaPromocionesClientes[i].ofe_etiqueta)) {
                var colorEtiqueta = '';
                if (isNotNullEmpty(listaPromocionesClientes[i].ofe_etiquetaColor))
                    colorEtiqueta = 'style="background-color: #' + listaPromocionesClientes[i].ofe_etiquetaColor + '"';
                strHtml += '<div class="etiqueta" ' + colorEtiqueta + '>' + listaPromocionesClientes[i].ofe_etiqueta + '</div>';
            }
            if (!listaPromocionesClientes[i].ofe_nuevosLanzamiento && isNotNullEmpty(listaPromocionesClientes[i].namePdf)) {
                strHtml += '<a target="_blank" href="../../servicios/descargarArchivo.aspx?t=' + 'ofertaspdf' + '&n=' + listaPromocionesClientes[i].namePdf + '&inline=yes"><div class="bg_promo"></div><div class="btn_bg_promo">AMPLIAR</div>';
            } else if (listaPromocionesClientes[i].ofe_nuevosLanzamiento && isNotNullEmpty(listaPromocionesClientes[i].nameImagenAmpliar)) {
                strHtml += '<a  href="#" onclick="onclickNuevoLanzamiento(' + listaPromocionesClientes[i].ofe_idOferta + '); return false;"><div class="bg_promo"></div><div class="btn_bg_promo">AMPLIAR</div>';
            }
            if (isNotNullEmpty(listaPromocionesClientes[i].nameImagen)) {
                // strHtml += '<div class="div_ImagenPromo" style="' + 'background-image: url(../../servicios/thumbnail?r=ofertas&n=' + listaPromocionesClientes[i].nameImagen + '&an=' + tamanio + '&al=' + tamanio + '&c=FFFFFF);' + '"></div>';
                strHtml += '<img class="img-responsive" src="' + '../servicios/thumbnail?r=ofertas&n=' + listaPromocionesClientes[i].nameImagen + '&an=' + tamanio + '&al=' + tamanio + '&c=FFFFFF' + '" alt="oferta" title=" alt="oferta">';
            }
            else {
                // strHtml += '<div class="div_ImagenPromo" style="' + 'background-image: url(../../servicios/thumbnail?r=ofertas&n=' + 'productosinfoto.png' + '&an=' + tamanio + '&al=' + tamanio + '&c=FFFFFF);' + '"></div>';
                strHtml += '<img class="img-responsive" src="' + '../servicios/thumbnail?r=ofertas&n=' + 'productosinfoto.png' + '&an=' + tamanio + '&al=' + tamanio + '&c=FFFFFF' + '" alt="oferta" title=" alt="oferta">';
            }
            if (!listaPromocionesClientes[i].ofe_nuevosLanzamiento && isNotNullEmpty(listaPromocionesClientes[i].namePdf)) {
                strHtml += '</a>';
            } else if (listaPromocionesClientes[i].ofe_nuevosLanzamiento && isNotNullEmpty(listaPromocionesClientes[i].nameImagenAmpliar)) {
                strHtml += '</a>';
            }
            strHtml += '</div>'; //<div class="photo">
            strHtml += '<div class="info">';
            strHtml += '<div class="row">';
            strHtml += '<div class="price col-lg-12">';
            strHtml += '<h5>' + listaPromocionesClientes[i].ofe_titulo + '</h5>';
            strHtml += '<p>' + listaPromocionesClientes[i].ofe_descr + '</p>';
            var descuento = '';
            if (isNotNullEmpty(listaPromocionesClientes[i].ofe_descuento))
                descuento = listaPromocionesClientes[i].ofe_descuento;
            strHtml += '<div class="desc">' + descuento + '</div>';
            var txtAñadirCarrito = 'AÑADIR AL CARRITO';
            if (listaPromocionesClientes[i].ofe_tipo == 1 && listaPromocionesClientes[i].countOfertaDetalles > 0)
                strHtml += '<a class="btn_carrito" onclick="onclickCarrito(' + listaPromocionesClientes[i].ofe_idOferta + ');" >' + txtAñadirCarrito + '</a>';
            else if (listaPromocionesClientes[i].ofe_tipo == 2 && listaPromocionesClientes[i].ofe_nombreTransfer != null)
                strHtml += '<a class="btn_carrito" onclick="onclickCarrito(' + listaPromocionesClientes[i].ofe_idOferta + ');" >' + txtAñadirCarrito + '</a>';

            strHtml += '</div>'; //<div class="price col-lg-12">
            strHtml += '<div class="clearfix"></div>';
            strHtml += '</div>'; //<div class="row">
            strHtml += '</div>'; //<div class="info">
            strHtml += '</div>'; //'<div class="col-item">'

            //strHtml += '</td>';

            //if (rowCount == 3)
            //    strHtml += '</tr>';
            //rowCount++;
            //if (rowCount > 3)
            //    rowCount = 1;
            strHtml += '</div>';
        }
        //if (rowCount == 2)
        //    strHtml += '<td></td><td></td></tr>';
        //if (rowCount == 3)
        //    strHtml += '<td></td></tr>';

        //strHtml += '</table>'; // '<div class="row">';
        $('#divContenedorOfertasPromocionesClientes').html(strHtml);
    }
}
function prepararListaMsgLanzamiento(args) {
    var strHtml = '';
    var listaLanzamiento = eval('(' + args + ')');
    if (typeof listaLanzamiento == 'undefined') {
        listaLanzamiento = null;
    }
    if (listaLanzamiento != null && listaLanzamiento.length > 0) {
        strHtml += '<div class="modal-background">&nbsp;</div>';
        strHtml += '<div class="modal-dialog modal-lanzamiento"><div class="modal-content">'; // modal-md
        strHtml += '<div class="modal-header no-padding-bottom divFondoLanzamiento">';
        strHtml += '<div class="container">';
        strHtml += '<div class="row divContenedorLanzamiento">';
        var isMostrarDesc = false;
        if (isNotNullEmpty(listaLanzamiento[0].ofe_descrHtml)) {
            isMostrarDesc = true;
        }
        if (isMostrarDesc) { 
            strHtml += '<div class="col-sm-12 col-md-8 col-xs-8">';
        }
        if (isNotNullEmpty(listaLanzamiento[0].nameImagenAmpliar)) {
            strHtml += '<img class="img-responsive img-responsive-lanzamiento" src="' + '../servicios/thumbnail?r=ofertasampliar&n=' + listaLanzamiento[0].nameImagenAmpliar + '&an=1024&al=768' + '" alt="oferta" title=" alt="oferta">';
        }
        else if (isNotNullEmpty(listaLanzamiento[0].nameImagen)) {
            strHtml += '<img class="img-responsive img-responsive-lanzamiento" src="' + '../servicios/thumbnail?r=ofertas&n=' + listaLanzamiento[0].nameImagen + '&an=1024&al=768' + '" alt="oferta" title=" alt="oferta">';
        }
        else {
            strHtml += '<img class="img-responsive img-responsive-lanzamiento" src="' + '../servicios/thumbnail?r=ofertas&n=' + 'productosinfoto.png' + '&an=1024&al=768' + '" alt="oferta" title=" alt="oferta">';
        }
        if (isMostrarDesc) {
            strHtml += '</div>';
            strHtml += '<div class="col-sm-12 col-md-4 col-xs-4 divFondoDescLanzamiento">';
            strHtml += listaLanzamiento[0].ofe_descrHtml;
            strHtml += '</div>';
        }
        //
        strHtml += '</div>';
        strHtml += '</div>';//'<div class="container">';
        //strHtml += '<div class="close-modal" data-dismiss="modal"><i class="fa fa-times"></i></div>';
        strHtml += '</div>';
        strHtml += '</div></div>';
    }


    $('#divContenedorOfertas').html(strHtml);
}