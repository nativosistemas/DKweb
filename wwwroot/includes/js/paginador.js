var pagActual = -1;
var cantPaginaTotal = -1;
var LimiteDePaginador_const = null;//14;
var CantidadFilaPorPagina_const = null;// 100;

$(document).ready(function () {
    if (CantidadFilaPorPagina_const == null) {
        CantidadFilaPorPagina_const = $('#hiddenCantidadFilaPorPagina').val();
        if (typeof CantidadFilaPorPagina_const == 'undefined') {
            CantidadFilaPorPagina_const = null;
        } else {
            CantidadFilaPorPagina_const = parseInt(CantidadFilaPorPagina_const);
        }
    }
    if (LimiteDePaginador_const == null) {
        LimiteDePaginador_const = $('#hiddenLimiteDePaginador').val();
        if (typeof LimiteDePaginador_const == 'undefined') {
            LimiteDePaginador_const = null;
        } else {
            LimiteDePaginador_const = parseInt(LimiteDePaginador_const);
        }
    }
});
function GenerarPaginador() {
        var strHtmlPag = '';
        $('#divPaginador').html(strHtmlPag);
        if (cantPaginaTotal > 1) {

            strHtmlPag += '<ul class="pagination hidden-xs">';

            // Anterior
            strHtmlPag += '<li ><a data-toggle="tooltip" data-placement="bottom" title="Inicio" onclick="clickAvanceRetrocesoEstremos(0); return false;" href="#"><i class="fa fa-angle-double-left"></i></a></li>';//id="AnteriorPaginadorExtremo"
            strHtmlPag += '<li ><a data-toggle="tooltip" data-placement="bottom" title="Anterior" onclick="clickAvanceRetroceso(0); return false;" href="#"><i class="fa fa-angle-left"></i></a></li>'; //id="AnteriorPaginador"

            var pagDesde = ObtenerPaginaDesde(pagActual, cantPaginaTotal, LimiteDePaginador_const);
            var pagHasta = ObtenerPaginaHasta(pagDesde, pagActual, cantPaginaTotal, LimiteDePaginador_const);

            for (var i = pagDesde; i < pagHasta; i++) {
                strHtmlPag += '<li id="li_pag_' + (i).toString() + '" ><a id="pag_' + (i).toString() + '" onclick="clickPaginador(this); return false;" href="#" >' + (i).toString() + '</a></li>';
            }

            // Siguiente
            strHtmlPag += '<li><a data-toggle="tooltip" data-placement="bottom" title="Siguiente" onclick="clickAvanceRetroceso(1); return false;" href="#"><i class="fa fa-angle-right"></i></a></li>';// id="SiguientePaginador"
            strHtmlPag += '<li ><a data-toggle="tooltip" data-placement="bottom" title="Fin" onclick="clickAvanceRetrocesoEstremos(1); return false;" href="#"><i class="fa fa-angle-double-right"></i></a></li>';//id="SiguientePaginadorExtremo"

            strHtmlPag += '</ul>';


            ///////////
            strHtmlPag += '<ul class="pagination visible-xs">';
            // Anterior
            strHtmlPag += '<li ><a data-toggle="tooltip" data-placement="bottom" title="Inicio" onclick="clickAvanceRetrocesoEstremos(0); return false;" href="#"><i class="fa fa-angle-double-left"></i></a></li>';//id="AnteriorPaginadorExtremo"
            strHtmlPag += '<li ><a data-toggle="tooltip" data-placement="bottom" title="Anterior" onclick="clickAvanceRetroceso(0); return false;" href="#"><i class="fa fa-angle-left"></i></a></li>'; //id="AnteriorPaginador"
            var pagDesde = ObtenerPaginaDesde(pagActual, cantPaginaTotal, Math.floor(LimiteDePaginador_const / 2));
            var pagHasta = ObtenerPaginaHasta(pagDesde, pagActual, cantPaginaTotal, Math.floor(LimiteDePaginador_const / 2));
            for (var i = pagDesde; i < pagHasta; i++) {
                strHtmlPag += '<li id="li_pag_celu_' + (i).toString() + '" ><a id="pag_celu_' + (i).toString() + '" onclick="clickPaginador(this); return false;" href="#" >' + (i).toString() + '</a></li>';
            }
            // Siguiente
            strHtmlPag += '<li><a data-toggle="tooltip" data-placement="bottom" title="Siguiente" onclick="clickAvanceRetroceso(1); return false;" href="#"><i class="fa fa-angle-right"></i></a></li>';// id="SiguientePaginador"
            strHtmlPag += '<li ><a data-toggle="tooltip" data-placement="bottom" title="Fin" onclick="clickAvanceRetrocesoEstremos(1); return false;" href="#"><i class="fa fa-angle-double-right"></i></a></li>';//id="SiguientePaginadorExtremo"
            strHtmlPag += '</ul>';
            //////////

        }
        if (strHtmlPag != '') {
            $('#divPaginador').html(strHtmlPag);
            $('#li_pag_' + pagActual).addClass("active");
            $('#li_pag_celu_' + pagActual).addClass("active");
            if (pagActual == 1) {
            } else if (pagActual == cantPaginaTotal) {
            }
        }
}
function clickPaginador(pValor) {
    pagActual = pValor.innerHTML;
    LlamarMetodoCargar(pagActual);
}

function clickAvanceRetrocesoEstremos(pValor) {
    if (pValor == 1) {
        // Final paginacior
        pagActual = cantPaginaTotal;
        LlamarMetodoCargar(pagActual);

    } else if (pValor == 0) {
        // Principio paginacior
        pagActual = 1;
        LlamarMetodoCargar(pagActual);
    }
}

function clickAvanceRetroceso(pValor) {
    if (pValor == 1) {
        // siguiente
        if (cantPaginaTotal > pagActual) {
            pagActual++;
            LlamarMetodoCargar(pagActual);
        }
    } else if (pValor == 0) {
        // anterior
        if (pagActual > 1) {
            pagActual--;
            LlamarMetodoCargar(pagActual);
        }

    }
}
function ObtenerPaginaDesde(pPagActual, pCantidadPagina, pLimiteDePagina) {


    if (pCantidadPagina > pLimiteDePagina) {
        var Mitad = (pLimiteDePagina / 2);
        if (pPagActual > Mitad) {
            var resultadoAux1 = pPagActual - Mitad;
            if ((resultadoAux1 + pLimiteDePagina) >= pCantidadPagina) {
                var resultadoAux2 = pCantidadPagina - (pLimiteDePagina - 1);
                if (resultadoAux2 == 0) {
                    return 1;
                } else {
                    return resultadoAux2;
                }
            } else {
                return resultadoAux1;
            }
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}
function ObtenerPaginaHasta(pPagDesde, pPagActual, pCantidadPagina, pLimiteDePagina) {

    if (pCantidadPagina >= pLimiteDePagina) {
        return pPagDesde + pLimiteDePagina;
    } else {
        return parseInt(pCantidadPagina) + 1;
    }
}
