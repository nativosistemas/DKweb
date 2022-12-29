var listaRecallIndex = null;
var listaRecall = null;
var objRecall = null;
function getHtmlReCall(pValue,pTipo) {
    var strHtml = '';
    var css_sec = '';
    var desc = pValue.descripcionReducidoMostrar;
    if (pTipo == 2) {
        css_sec = 'sec';
        desc = pValue.descripcionReducidoMostrarMediano;
    }

    strHtml += '<div class="div_rc_h ' + css_sec + '">';
    strHtml += '<div class="date ' + css_sec + '">' + pValue.rec_FechaNoticiaToString + '</div>';
    strHtml += '<div class="title ' + css_sec + '">' + pValue.rec_titulo + '</div>';
    strHtml += '<div class="dsc ' + css_sec + '">' + desc + '</div>';
    strHtml += '<a class="btn_emp" href="recall.aspx?id=' + pValue.rec_id + '">AMPLIAR</a>';
    strHtml += '</div>';
    return strHtml;

}

function prepararReCall(pValor) {
    objRecall = eval('(' + pValor + ')');
    if (typeof objRecall == 'undefined') {
        objRecall = null;
    }
    cargarReCall();
}
function prepararListaReCall(pValor) {
    listaRecall = eval('(' + pValor + ')');
    if (typeof listaRecall == 'undefined') {
        listaRecall = null;
    }
    cargarTodasReCall();
}
function prepararListaReCallIndex(pValor) {
    listaRecallIndex = eval('(' + pValor + ')');
    if (typeof listaRecallIndex == 'undefined') {
        listaRecallIndex = null;
    }
    cargarReCallIndex();

}
function cargarReCallIndex() {
    if (listaRecallIndex != null) {
        var strHtml = '';
        strHtml += '<div class="container">';
        strHtml += '<div class="row">';
        // encabezado
        strHtml += '<div class="col-xs-12">';
        strHtml += '<h2 class="text-left color_emp_nd">RECALL</h2>';
        strHtml += '</div>';
        strHtml += '<div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">';
        strHtml += '<div class="clear10"></div>';
        strHtml += '<p class="text-left">Conocé y verificá los últimos productos llamados a retiro de mercado.</p>';
        strHtml += '<a class="btn_ver" href="recalls.aspx">VER LISTADO COMPLETO</a>';
        strHtml += '<div class="clear25"></div>';
        strHtml += '<img src="../img/home/img_recall.png" class="img-responsive" />';
        strHtml += '</div>';
        // fin encabezado
        for (var i = 0; i < listaRecallIndex.length; i++) {
            strHtml += '<div class="col_3_rc">';
            strHtml += getHtmlReCall(listaRecallIndex[i],1);
            strHtml += '</div>';
        }
        strHtml += '</div>';
        strHtml += '</div>';
        $('#divContenedorRecallIndex').html(strHtml);
        if( listaRecallIndex.length > 0) {
            $('#divContenedorRecallIndex').css('display', 'block');
        }
    }
}

function cargarTodasReCall() {
    if (listaRecall != null) {
        var strHtml = '';
        // encabezado
        strHtml += '<div class="col-xs-12">';
        strHtml += '<h2 class="color_emp_nd">RECALL</h2>';
        strHtml += '<div class="clear25"></div>';
        strHtml += '<p>Listado completo de los productos llamados a retiro de mercado.</p>';
        strHtml += '<div class="clear25"></div>';
        strHtml += '</div>';
        // fin encabezado
        for (var i = 0; i < listaRecall.length; i++) {
            strHtml += '<div class="col-sm-6 col-xs-12">';
            strHtml += getHtmlReCall(listaRecall[i],2);
            strHtml += '</div>';
        }

        $('#divContenedorRecall').html(strHtml);
        //if (listaRecall.length > 0) {
        //    $('#divContenedorRecall').css('display', 'block');
        //}
    }
}
function cargarReCall() {
    if (objRecall != null) {
        var strHtml = '';
        strHtml += '<div class="col-xs-12"><a class="btn_volver float-left" href="recalls.aspx"><i class="fa fa-play"></i>VOLVER AL LISTADO</a></div><div class="clear25"></div>';
        strHtml += '<div class="col-xs-12">';
        strHtml += '<div class="date_rc">' + objRecall.rec_FechaNoticiaToString + '</div>';
        strHtml += '<div class="title_rc">' + objRecall.rec_titulo + '</div>';
        strHtml += objRecall.rec_descripcion;
        strHtml += '</div>';
        if (isNotNullEmpty(objRecall.arc_nombre)) {
            strHtml += '<div class="col-xs-12"><div class="clear25"></div><a class="btn_ampliar" href="../../servicios/descargarArchivo.aspx?t=recallpdf&n=' + objRecall.arc_nombre + '&inline=yes" target="_blank">VER COMUNICADO</a></div>';
        }
        $('#divContenedorObjRecall').html(strHtml);
    }
}