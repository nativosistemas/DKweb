var listSlider = null;

function prepararListaSlider(pValor) {


    listSlider = eval('(' + pValor + ')');
    if (typeof listSlider == 'undefined') {
        listSlider = null;
    }
    cargarHtmlSlider();

}

function cargarHtmlSlider() {

    if (listSlider != null) {
        var strHtml = '';
        strHtml += '<div class="container-fluid">';
        strHtml += '<div class="row">';
        strHtml += '<div class="span12">';
        strHtml += '<div id="owl-demo" class="owl-carousel">';
        for (var i = 0; i < listSlider.length; i++) {
            strHtml += '<div class="item">';
            strHtml += '<div class="cont_item">';
            strHtml += '<div class="container"><div class="row">';//'<div class="row cont_item">';
            strHtml += '<div class="col-lg-7 col-md-8 col-sm-9 col-xs-12 text-left color_white">';
            if (isNotNullEmpty(listSlider[i].hsl_titulo))
                strHtml += '<h2>' + listSlider[i].hsl_titulo + '</h2>';
            strHtml += '</div>';// '<div class="col-lg-7 col-md-8 col-sm-7 col-xs-12 text-left color_white">';
            //  strHtml += '<div class="col-lg-5 col-md-4 col-sm-3 hidden-xs">&nbsp;</div>'
            strHtml += '<div class="clear0"></div>';
            strHtml += '<div class="col-lg-6 col-md-8 col-sm-7 col-xs-12 dsc">';
            if (isNotNullEmpty(listSlider[i].hsl_descr))
                strHtml += listSlider[i].hsl_descr.replace(/\n/g, "<br/>");
            if (isNotNullEmpty(listSlider[i].hsl_descrHtmlReducido)) {
                if (isNotNullEmpty(listSlider[i].hsl_descr))
                    strHtml += '<br/>';
                strHtml += listSlider[i].hsl_descrHtmlReducido;
            }
            if (isNotNullEmpty(listSlider[i].hsl_descrHtml)) {
                if (isNotNullEmpty(listSlider[i].hsl_descr) || isNotNullEmpty(listSlider[i].hsl_descrHtmlReducido))
                    strHtml += '<br/>';
                // strHtml +=  listSlider[i].hsl_descrHtml;
                strHtml += '<div class="styleDescHtml">' + listSlider[i].hsl_descrHtml + '</div>';
            }
            strHtml += '</div>';//'<div class="col-lg-6 col-md-8 col-sm-6 col-xs-12 dsc">';
            strHtml += '<div class="clear0"></div>';
            strHtml += '<div class="col-xs-12 boton">';
            if (listSlider[i].hsl_tipo == 1) {
                //  strHtml += '<a class="btn_slide info" href="">MAS INFO</a>';
            }
            else if (listSlider[i].hsl_tipo == 2 && isNotNullEmpty(listSlider[i].hsl_idOferta)) {
                strHtml += '<a class="btn_slide carrito" onclick="onclickCarrito(' + listSlider[i].hsl_idOferta + ');" >AÑADIR AL CARRITO</a>'
            }
            else if (listSlider[i].hsl_tipo == 3 && isNotNullEmpty(listSlider[i].hsl_NombreRecursoDoc)) {
                //strHtml += '<a class="btn_slide pdfVerMas" onclick="onclickVerMasPdf(' + i + '); return false;" href="../../archivos/catalogo/' + listSlider[i].hsl_NombreRecursoDoc + '" target="_blank">ver más</a>';
                strHtml += '<a class="btn_slide pdfVerMas" onclick="onclickVerMasPdf(' + i + '); return false;" href="../../servicios/descargarArchivo?t=catalogo&n=' + listSlider[i].hsl_NombreRecursoDoc + '&inline=yes" target="_blank">ver más</a>';

            }
            strHtml += '</div>';//'<div class="col-lg-6 boton">';


            strHtml += '</div></div>';//<div class="container"><div class="row">
            strHtml += '</div>';//'<div class="cont_item">;'

            //strHtml += '<div class="bg-slide"></div>';

            if (isNotNullEmpty(listSlider[i].arc_nombrePC))
                strHtml += '<img class="hidden-sm hidden-xs" src="' + '../../../servicios/thumbnail?r=' + listSlider[i].tipoRecurso + '&n=' + listSlider[i].arc_nombrePC + '&an=' + String(1920) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title="" />';
            else
                strHtml += '<img class="hidden-sm hidden-xs"  src="' + '../../../servicios/thumbnail?r=' + listSlider[i].tipoRecurso + '&n=' + 'productosinfoto.png' + '&an=' + String(1920) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title=""/>';

            if (isNotNullEmpty(listSlider[i].arc_nombreMobil))
                strHtml += '<img class="visible-sm visible-xs" src="' + '../../../servicios/thumbnail?r=' + listSlider[i].tipoRecurso + '&n=' + listSlider[i].arc_nombreMobil + '&an=' + String(700) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title="" />';
            else if (isNotNullEmpty(listSlider[i].arc_nombrePC))
                strHtml += '<img class="visible-sm visible-xs"  src="' + '../../../servicios/thumbnail?r=' + listSlider[i].tipoRecurso + '&n=' + listSlider[i].arc_nombrePC + '&an=' + String(700) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title=""/>';
            else
                strHtml += '<img class="visible-sm visible-xs"  src="' + '../../../servicios/thumbnail?r=' + listSlider[i].tipoRecurso + '&n=' + 'productosinfoto.png' + '&an=' + String(700) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title=""/>';

            strHtml += '</div>';//'<div class="item">';
        }


        strHtml += '</div>';//'<div class="container-fluid">';
        strHtml += '</div>';//'<div class="row">';
        strHtml += '</div>';//'<div class="span12">';
        strHtml += '</div>';//'<div id="owl-demo" class="owl-carousel">';

        $('#slide_dest').html(strHtml);

        //slideSpeed: 600,
        //paginationSpeed: 500,
        //autoPlay: 5000,
        $("#owl-demo").owlCarousel({
            slideSpeed: 500,
            paginationSpeed: 1400,
            singleItem: true,
            loop: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                }
            },
            navigation: true,
            navigationText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            autoPlay: 12000,
            stopOnHover: false,
        });
    }

}
var indexSliderPdf = null;
function onclickVerMasPdf(pValor) {
    if (listSlider != null) {
        indexSliderPdf = pValor;

        //var myName = localStorage['name'] || '';
        //var myPass = localStorage['pass'] || '';

        PageMethods.ContadorHomeSlideRating(listSlider[pValor].hsl_idHomeSlide, OnCallBackContadorHomeSlideRating, OnFailContadorHomeSlideRating);
    }
}
function OnCallBackContadorHomeSlideRating(args) {
    mostrarPdf();
}
function OnFailContadorHomeSlideRating(ex) {
    mostrarPdf();
}

function mostrarPdf() {
    if (indexSliderPdf != null) {
        // window.open('../../archivos/catalogo/' + listSlider[indexSliderPdf].hsl_NombreRecursoDoc, '_blank');//_parent
        window.open('../../servicios/descargarArchivo.aspx?t=catalogo&n=' + listSlider[indexSliderPdf].hsl_NombreRecursoDoc  + '&inline=yes', '_blank');

        indexSliderPdf = null;
    }
}
//function cargarHtmlSlider() {

//    if (listSlider != null) {
//        var strHtml = '';
//        strHtml += '<div class="container-fluid">';
//        strHtml += '<div class="row">';
//        strHtml += '<div class="span12">';
//        strHtml += '<div id="owl-demo" class="owl-carousel">';
//        for (var i = 0; i < listSlider.length; i++) {
//            strHtml += '<div class="item">';
//            strHtml += '<div class="container">';
//            strHtml += '<div class="row cont_item">';
//            strHtml += '<div class="col-lg-7 col-md-8 col-sm-7 col-xs-12 text-left color_white">';
//            if (isNotNullEmpty(listSlider[i].hsl_titulo))
//                strHtml += '<h2>' + listSlider[i].hsl_titulo + '</h2>';
//            strHtml += '</div>';// '<div class="col-lg-7 col-md-8 col-sm-7 col-xs-12 text-left color_white">';
//            strHtml += '<div class="clear0"></div>';
//            strHtml += '<div class="col-lg-6 col-md-8 col-sm-6 col-xs-12 dsc">';
//            if (isNotNullEmpty(listSlider[i].hsl_descr)) 
//                strHtml += listSlider[i].hsl_descr.replace(/\n/g, "<br/>");
//            if (isNotNullEmpty(listSlider[i].hsl_descrHtmlReducido)) {
//                if (isNotNullEmpty(listSlider[i].hsl_descr))
//                    strHtml += '<br/>';
//                strHtml += listSlider[i].hsl_descrHtmlReducido;
//            }
//            if (isNotNullEmpty(listSlider[i].hsl_descrHtml)) {
//                if (isNotNullEmpty(listSlider[i].hsl_descr) || isNotNullEmpty(listSlider[i].hsl_descrHtmlReducido))
//                    strHtml += '<br/>';
//                strHtml += listSlider[i].hsl_descrHtml;//$(listSlider[i].hsl_descrHtml);// listSlider[i].hsl_descrHtml;
//            }
//            strHtml += '</div>';//'<div class="col-lg-6 col-md-8 col-sm-6 col-xs-12 dsc">';
//            strHtml += '<div class="clear0"></div>';
//            strHtml += '<div class="col-lg-6 boton">';
//            if (listSlider[i].hsl_tipo == 1){
//              //  strHtml += '<a class="btn_slide info" href="">MAS INFO</a>';
//            }
//            else if (listSlider[i].hsl_tipo == 2 && isNotNullEmpty(listSlider[i].hsl_idOferta)) {
//                strHtml += '<a class="btn_slide carrito" onclick="onclickCarrito(' + listSlider[i].hsl_idOferta + ');" >AÑADIR AL CARRITO</a>'
//            }
//            else if (listSlider[i].hsl_tipo == 3 && isNotNullEmpty(listSlider[i].hsl_NombreRecursoDoc)) {
//                //strHtml += '<a class="btn_slide pdf" href="../../archivos/catalogo/' + listSlider[i].hsl_NombreRecursoDoc + '" target="_blank">ver documento</a>';
//                //pdf
//                strHtml += '<a class="btn_slide pdfVerMas" href="../../archivos/catalogo/' + listSlider[i].hsl_NombreRecursoDoc + '" target="_blank">ver más</a>';
//            }
//            //<a class="btn_slide pdf" href="">ver documento</a>
//            // "<a  class=\"pdf\" target =\"_blank\" href =\"../../" + SitioBase.Constantes.cArchivo_Raiz + "/" + SitioBase.Constantes.cTABLA_CATALOGO + "/" + oArchivo.arc_nombre + "\" >DESCARGAR</a>";
//            strHtml += '</div>';//'<div class="col-lg-6 boton">';


//            strHtml += '</div>';//'<div class="row cont_item">';
//            strHtml += '</div>';//'<div class="container">;'

//            strHtml += '<div class="bg-slide"></div>';

//            if (isNotNullEmpty(listSlider[i].arc_nombrePC))
//                strHtml += '<img class="hidden-sm hidden-xs" src="' + '../../../servicios/thumbnail.aspx?r=' + listSlider[i].tipoRecurso + '&n=' + listSlider[i].arc_nombrePC + '&an=' + String(1920) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title="" />';
//            else
//                strHtml += '<img class="hidden-sm hidden-xs"  src="' + '../../../servicios/thumbnail.aspx?r=' + listSlider[i].tipoRecurso + '&n=' + 'productosinfoto.png' + '&an=' + String(1920) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title=""/>';

//            if (isNotNullEmpty(listSlider[i].arc_nombreMobil))
//                strHtml += '<img class="visible-sm visible-xs" src="' + '../../../servicios/thumbnail.aspx?r=' + listSlider[i].tipoRecurso + '&n=' + listSlider[i].arc_nombreMobil + '&an=' + String(700) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title="" />';
//            else if(isNotNullEmpty(listSlider[i].arc_nombrePC))
//                strHtml += '<img class="visible-sm visible-xs"  src="' + '../../../servicios/thumbnail.aspx?r=' + listSlider[i].tipoRecurso + '&n=' + listSlider[i].arc_nombrePC + '&an=' + String(700) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title=""/>';
//            else
//                strHtml += '<img class="visible-sm visible-xs"  src="' + '../../../servicios/thumbnail.aspx?r=' + listSlider[i].tipoRecurso + '&n=' + 'productosinfoto.png' + '&an=' + String(700) + '&al=' + String(700) + '&c=FFFFFF" alt="' + listSlider[i].tipoRecurso + '" title=""/>';
//            //strHtml += '<img class="hidden-sm hidden-xs" src="../../img/home/fullimage1.jpg" alt="The Last of us">';
//            //strHtml += '<img class="visible-sm visible-xs" src="../../img/home/fullimage1_ch.jpg" />';

//            strHtml += '</div>';//'<div class="item">';
//        }


//        strHtml += '</div>';//'<div class="container-fluid">';
//        strHtml += '</div>';//'<div class="row">';
//        strHtml += '</div>';//'<div class="span12">';
//        strHtml += '</div>';//'<div id="owl-demo" class="owl-carousel">';

//        $('#slide_dest').html(strHtml);

//        //slideSpeed: 600,
//        //paginationSpeed: 500,
//        //autoPlay: 5000,
//        $("#owl-demo").owlCarousel({
//            slideSpeed: 500,
//            paginationSpeed: 400,
//            singleItem: true,
//            loop: true,
//            responsiveClass: true,
//            responsive: {
//                0: {
//                    items: 1
//                }
//            },
//            navigation: true,
//            navigationText: [
//                "<i class='fa fa-angle-left'></i>",
//                "<i class='fa fa-angle-right'></i>"
//            ],
//            autoPlay: 4000,
//            stopOnHover: true,
//        });
//    }

//}