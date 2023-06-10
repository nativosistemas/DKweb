//Declaración de variables locales
var NroMotivo = 0;
var TipoCbte = "";
var Cbte = "";
var MaxCant = 0;
var objFactura = null;
var width = window.innerWidth;
var NroItem = 0;
var NombreProductoFact = "";
var arrNombreProductoFact = [];
var listaPRD = "";
var campoActual = "";
var objPRDFac = "";
var objPRDDev = "";
var LoteDev = "";
var objItemFac = "";
var ItemsPrecargados = "";
var NumeroCliente = 0;
var ProdFacturaCompleta = [];
var isArchivoGenerado = false;
var isLlamarArchivoPDF = true;
var contadorPDF = 0;
var Devoluciones = [];
var Cant = 0;
var OrdenNro = false, OrdenFecha = false, OrdenEstado = false, OrdenNombre = false, OrdenFactura = false;
var tipoDev = ""

var colMotivos = [
    'Sin definición',
    'Mal enviado A por B',
    'Producto en Mal Estado/Roto/Incompleto',
    'Facturado no pedido',
    'Producto de más sin ser facturado',
    'Corto vencimiento',
    'Producto con Falla de Fabricante',
    'Producto Vencido',
    'Pedido por error'
];

function ItemDev() {
    this.dev_numerocliente = $("#txtNroCliente").val().trim();
    this.dev_idsucursal = $("#txtIdSucursalCliente").val().trim();
}

function oProd(Nombre,Cant,Orden) {
    this.Producto = Nombre;
    this.Cant = Cant;
    this.Orden = Orden;
}

$(document).ready(function () {
    //funDaterangepicker('dtpEntreFechas', 'funSetarFechaComprobante');
    $("#cmbMotivo").focus();
    campoActual = "cmbMotivo";
    tipoDev = $('#txtTipoDev').val().trim();
    if (tipoDev == 'DEV') {
        RecuperarDevolucionesPorCliente();
    } else {
        RecuperarReclamosFNEPorCliente();
    }
    RecuperarItemsDevolucionPrecargaPorCliente();
    RecuperarItemsDevolucionPrecargaVencidosPorCliente();
    RecuperarItemsDevolucionPrecargaFacturaCompletaPorCliente();
    RecuperarItemsReclamoFacturadoNoEnviado();

    $('body').keypress(function (e) {
        if (e.which == 13 || e.which == 9) {
            if ($("#modalModulo").is(":visible")) {
                modalModuloHide();
                $("#" + campoActual).val("");
                $("#" + campoActual).focus();
            }
        }
    });

    $("#modalModulo").click(function () {
        modalModuloHide();
        $("#" + campoActual).val("");
        $("#" + campoActual).focus();
    });

    $(".fa-times").click(function () {
        alert("ENTRO");
        modalModuloHide();
        $("#" + campoActual).val("");
        $("#" + campoActual).focus();
    });

    $(".refresh-input").click(function () {
        var IdCampo = $(this).attr("data-id");
        $("#" + IdCampo).removeAttr("disabled");

        if (IdCampo == "cmbNombreProducto"){
            $("#cmbNombreProducto").removeAttr("disabled");
            $("#txtNombreProductoDev").removeAttr("disabled");
            objItemFac = "";
            objPRDDev = "";

            setTimeout(function () {
                $("#cmbNombreProducto").val("");
                $("#txtNombreProductoDev").val("");
                $("#cmbNombreProducto").focus();
            }, 100);
        } else if (IdCampo == "txtNombreProductoDev") {
            $("#cmbNombreProducto").removeAttr("disabled");
            $("#txtNombreProductoDev").removeAttr("disabled");
            objPRDDev = "";

            setTimeout(function () {
                $("#cmbNombreProducto").val("");
                $("#txtNombreProductoDev").val("");
                $("#cmbNombreProducto").focus();
            }, 100);
        } else{
            setTimeout(function () {
                $("#" + IdCampo).val("");
                $("#" + IdCampo).focus();
            }, 100);
        }
    });

    //$("#dtpEntreFechas").daterangepicker();
    
    $("#cmbMotivo").focus(function () {
        $("#cmbMotivo").val("");
        $('#DEVTipoComprobante').addClass("hidden");
        $('#DEVTipoComprobante input').val("");
        $('#DEVTipoComprobante input').removeAttr("disabled");
        $('#DEVNroComprobante').addClass("hidden");
        $('#DEVNroComprobante input').val("");
        $('#DEVNroComprobante input').removeAttr("disabled");;
        $("#DEVFactura").addClass("hidden");
        $('#DEVFactura input').val("");
        $('#DEVFactura input').removeAttr("disabled");;
        $("#DEVDevolver").addClass("hidden");
        $('#DEVDevolver input').val("");
        $('#DEVDevolver input').removeAttr("disabled");
        $("#DEVCant").addClass("hidden");
        $('#DEVCant input').val("");
        $('#DEVCant input').removeAttr("disabled");
        $("#DEVLote").addClass("hidden");
        $('#DEVLote input').val("");
        $('#DEVLote input').removeAttr("disabled");
        $("#DEVLoteVenc").addClass("hidden");
        $('#DEVLoteVenc input').val("");
        $('#DEVLoteVenc input').removeAttr("disabled");
        $("#DEVAgregar").addClass("hidden");
    });

    $("#txtNroComprobante").focus(function () {
        $('#DEVNroComprobante input').val("");
        $("#DEVFactura").addClass("hidden");
        $('#DEVFactura input').val("");
        $('#DEVFactura input').removeAttr("disabled");
        $("#DEVDevolver").addClass("hidden");
        $('#DEVDevolver input').val("");
        $('#DEVDevolver input').removeAttr("disabled");
        $("#DEVCant").addClass("hidden");
        $('#DEVCant input').val("");
        $('#DEVCant input').removeAttr("disabled");
        $("#DEVLote").addClass("hidden");
        $('#DEVLote input').val("");
        $('#DEVLote input').removeAttr("disabled");
        $("#DEVLoteVenc").addClass("hidden");
        $('#DEVLoteVenc input').val("");
        $('#DEVLoteVenc input').removeAttr("disabled");
        $("#DEVAgregar").addClass("hidden");
    });

    $("#cmbNombreProducto").focus(function () {
        $('#DEVFactura input').val("");
        $("#DEVCant").addClass("hidden");
        $('#DEVCant input').val("");
        $('#DEVCant input').removeAttr("disabled");
        $("#DEVLote").addClass("hidden");
        $('#DEVLote input').val("");
        $('#DEVLote input').removeAttr("disabled");
        $("#DEVLoteVenc").addClass("hidden");
        $('#DEVLoteVenc input').val("");
        $('#DEVLoteVenc input').removeAttr("disabled");
        $("#DEVAgregar").addClass("hidden");
    });

    $("#txtNombreProductoDev").focus(function () {
        $('#DEVDevolver input').val("");
        $("#DEVCant").addClass("hidden");
        $('#DEVCant input').val("");
        $('#DEVCant input').removeAttr("disabled");
        $("#DEVLote").addClass("hidden");
        $('#DEVLote input').val("");
        $('#DEVLote input').removeAttr("disabled");
        $("#DEVLoteVenc").addClass("hidden");
        $('#DEVLoteVenc input').val("");
        $('#DEVLoteVenc input').removeAttr("disabled");
        $("#DEVAgregar").addClass("hidden");
    });

    $("#txtCantDevolver").focus(function () {
        $('#DEVCant input').val("");
        $("#DEVLote").addClass("hidden");
        $('#DEVLote input').val("");
        $('#DEVLote input').removeAttr("disabled");
        $("#DEVLoteVenc").addClass("hidden");
        $('#DEVLoteVenc input').val("");
        $('#DEVLoteVenc input').removeAttr("disabled");
        $("#DEVAgregar").addClass("hidden");
    });

    $("#txtNumeroLote").focus(function () {
        $('#DEVLote input').val("");
        $("#DEVLoteVenc").addClass("hidden");
        $('#DEVLoteVenc input').val("");
        $('#DEVLoteVenc input').removeAttr("disabled");
        $("#DEVAgregar").addClass("hidden");
    });

    $("#cmbMotivo").change(function (e) {
        ControlarSesion();
        var Motivo = $(this).val().trim();
        var obj = $("#MotivoValues").find("option[value='" + Motivo + "']");
        campoActual = $(this).attr("id");
        ItemDevolucion = new ItemDev();
        //console.log(ItemDevolucion);
        if (obj != null && obj.length > 0) {
            NroMotivo = obj[0].dataset.id;
            if (Motivo != "") {
                $('#DEVNroComprobante').removeClass("hidden");
                $('#DEVNroComprobante input').val("");
                $("#DEVFactura").addClass("hidden");
                $("#DEVFactura input").val("");
                $("#DEVDevolver").addClass("hidden");
                $("#DEVDevolver input").val("");
                $("#DEVCant").addClass("hidden");
                $("#DEVCant input").val("");
                $("#DEVAgregar").addClass("hidden");
                $("#DEVLote").addClass("hidden");
                $("#DEVLoteVenc").addClass("hidden");
                $("#DEVLote input").val("");
                $("#DEVLoteVenc input").val("");
                $("#txtCantDevolver").val("");
                $("#txtNombreProductoDev").val("");
                objPRDFac = "";
                objPRDDev = "";
                objItemFac = "";
                $(this).attr("disabled", "disabled");
                setTimeout(function () {
                    campoActual = "txtNroComprobante";
                    $("#txtNroComprobante").focus();
                }, 100);
                ItemDevolucion.dev_motivo = NroMotivo;
            } else {
                $('#DEVNroComprobante').addClass("hidden");
                $("#DEVFactura").addClass("hidden");
                $("#DEVDevolver").addClass("hidden");
                $("#DEVCant").addClass("hidden");
                $("#DEVAgregar").addClass("hidden");
                $("#txtCantDevolver").val("");
                $("#txtNombreProductoDev").val("");
                objPRDFac = "";
                objPRDDev = "";
                objItemFac = "";
            }
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Seleccione un motivo válido</h5>");
            // $(".fa.fa-times").hide();
        }
    });

    $("#txtNroComprobante").keypress(function (e) {
        if (e.which == 13 || e.which == 9) {
            ControlarSesion();
            campoActual = $(this).attr("id");
            objPRDFac = "";
            objPRDDev = "";
            objItemFac = "";

            IsBanderaUsarDll('OnCallBackIsBanderaUsarDll_ComprobanteNro');
            return false;
        }
    });

    $("#cmbNombreProducto").change(function () {
        var seleccion = $(this).val().trim();
        var obj = $("#NombreProductoValues").find('option[value="' + seleccion + '"]');
        campoActual = $(this).attr("id");
        ControlarSesion();
        if (obj != null && obj.length > 0) {
            var NroItem = obj[0].dataset.id;
            objItemFac = objFactura.lista[NroItem];
            //console.log(objItemFac);
            var existe = ItemsPrecargados.find(oItem => oItem.dev_nombreproductofactura === objItemFac.Descripcion && oItem.dev_numerofactura === objItemFac.NumeroFactura);
            if ( existe ) {
                mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> INFORMACIÓN</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto " + existe.dev_nombreproductofactura + " de la factura N° " + existe.dev_numerofactura + " ya posee una solicitud cargada con un motivo diferente, para ingresar un nuevo motivo, genere una nueva nota de devolución.</h5>");
                return;
            }
            NombreProductoFact = objFactura.lista[NroItem].Descripcion;
            Cant = 0;
            var cProds = objFactura.lista.filter(item => item.Descripcion === NombreProductoFact && item.PrecioUnitario != "");
            for (var i = 0; i < cProds.length; i++) {
                Cant += Number(cProds[i].Cantidad);
            }
            ItemDevolucion.dev_nombreproductofactura = NombreProductoFact;
            ItemDevolucion.dev_numeroitemfactura = objFactura.lista[NroItem].NumeroItem;
            if (NroMotivo == 1) {
                if (objPRDDev == "") {
                    $("#cmbNombreProducto").attr("disabled", "disabled");
                    setTimeout(function () {
                        campoActual = "txtNombreProductoDev";
                        $("#txtNombreProductoDev").focus()
                    }, 100);
                } else {
                    if (objPRDDev.pro_nombre == objItemFac.Descripcion) {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Al seleccionar el motivo 'Mal facturado A por B' el producto devuelto debe ser distinto al facturado.</h5>");
                        return false;
                    } else {
                        $("#cmbNombreProducto").attr("disabled", "disabled");
                        $("#DEVCant").removeClass("hidden");
                        campoActual = "txtCantDevolver";
                        $("#txtCantDevolver").focus();
                    }
                }
            } else {
                var arrayListaColumna = new Array();
                arrayListaColumna.push("pro_nombre");
                arrayListaColumna.push("pro_codigobarra");
                RecuperarProductosParaDevoluciones(NombreProductoFact, arrayListaColumna, false, false);
            }
        } else if ($.isNumeric(seleccion)) {
            var arrayListaColumna = new Array();
            arrayListaColumna.push("pro_codigobarra");

            $.ajax({
                type: "POST",
                url: "/mvc/RecuperarProductosVariasColumnas",
                data: { pTxtBuscador: seleccion, pListaColumna: arrayListaColumna, pIsBuscarConOferta: false, pIsBuscarConTransfer: false},
                success: function (response) {
                    listaPRD = eval('(' + response + ')');
                    //console.log(listaPRD);
                    if (listaPRD.listaProductos.length == 1) {
                        var Encontrado = false;
                        for (var i = 0; i < objFactura.lista.length; i++) {
                            if (listaPRD.listaProductos[0].pro_nombre == objFactura.lista[i].Descripcion) {
                                //console.log("Encontrado");
                                Encontrado = true;
                                var NroItem = i;
                                objItemFac = objFactura.lista[NroItem];
                                var existe = ItemsPrecargados.find(oItem => oItem.dev_nombreproductofactura === objItemFac.Descripcion && oItem.dev_numerofactura === objItemFac.NumeroFactura);
                                if (existe) {
                                    mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> INFORMACIÓN</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto " + existe.dev_nombreproductofactura + " de la factura N° " + existe.dev_numerofactura + " ya posee una solicitud cargada con un motivo diferente, para ingresar un nuevo motivo, genere una nueva nota de devolución.</h5>");
                                    return;
                                }
                                NombreProductoFact = objFactura.lista[NroItem].Descripcion;
                                $("#cmbNombreProducto").val(NombreProductoFact);
                                Cant = 0;
                                var cProds = objFactura.lista.filter(item => item.Descripcion === NombreProductoFact && item.PrecioUnitario != "");
                                for (var i = 0; i < cProds.length; i++) {
                                    Cant += Number(cProds[i].Cantidad);
                                }
                                ItemDevolucion.dev_nombreproductofactura = NombreProductoFact;
                                ItemDevolucion.dev_numeroitemfactura = objFactura.lista[NroItem].NumeroItem;
                                if (NroMotivo == 1) {
                                    if (objPRDDev == "") {
                                        $("#cmbNombreProducto").attr("disabled", "disabled");
                                        setTimeout(function () {
                                            campoActual = "txtNombreProductoDev";
                                            $("#txtNombreProductoDev").focus()
                                        }, 100);
                                    } else {
                                        if (objPRDDev.pro_nombre == objItemFac.Descripcion) {
                                            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Al seleccionar el motivo 'Mal facturado A por B' el producto devuelto debe ser distinto al facturado.</h5>");
                                            return false;
                                        } else {
                                            $("#cmbNombreProducto").attr("disabled", "disabled");
                                            $("#DEVCant").removeClass("hidden");
                                            campoActual = "txtCantDevolver";
                                            $("#txtCantDevolver").focus();
                                        }
                                    }
                                } else {
                                    var arrayListaColumna = new Array();
                                    arrayListaColumna.push("pro_nombre");
                                    arrayListaColumna.push("pro_codigobarra");
                                    RecuperarProductosParaDevoluciones(NombreProductoFact, arrayListaColumna, false, false);
                                }
                                break;
                            }
                        }
                        if (!Encontrado) {
                            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto no se encontró en la factura. Por favor verifique.</h5>");
                            // $(".fa.fa-times").hide();
                        }
                    } else {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto no se encontró en la factura. Por favor verifique.</h5>");
                        // $(".fa.fa-times").hide();
                    }
                }
            });
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto seleccionado no pertenece a la factura ingresada. Por favor verifique.</h5>");
            // $(".fa.fa-times").hide();
        }
    });

    $("#txtNombreProductoDev").keypress(function (e) {
        if (e.which == 13 || e.which == 9) {
            ControlarSesion();
            var aBuscar = $(this).val().trim();
            campoActual = $(this).attr("id");

            if (aBuscar !== '') {
                if (aBuscar.length > 0) {
                    var arrayListaColumna = new Array();

                    arrayListaColumna.push("pro_nombre");
                    arrayListaColumna.push("pro_codigobarra");
                    RecuperarProductosParaDevoluciones(aBuscar, arrayListaColumna, false, false);
                } else {
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Por favor, ingrese un producto para realizar la búsqueda.</h5>");
                    // $(".fa.fa-times").hide();
                }
            } else {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Por favor, ingrese un producto para realizar la búsqueda.</h5>");
                // $(".fa.fa-times").hide();
            }
        }
    });

    $("#txtCantDevolver").keypress(function (e) {
        if (e.which == 13 || e.which == 9) {
            ControlarSesion();
            campoActual = $(this).attr("id");
            var CantADev = $(this).val().trim();

            //control 0
            if (CantADev <= 0) {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad a devolver debe ser mayor a 0.</h5>");
                // $(".fa.fa-times").hide();
                return false;
            }

            //Control decimal redondo
            if (CantADev.indexOf(',') != -1) {
                if (0 == CantADev.substring(CantADev.indexOf(',') + 1, CantADev.length)) {
                    CantADev = CantADev.substring(0, CantADev.indexOf(','));
                }
            } else {
                if (0 == CantADev.substring(CantADev.indexOf('.') + 1, CantADev.length)) {
                    CantADev = CantADev.substring(0, CantADev.indexOf('.'));
                }
            }
            $(this).val(CantADev);

            //control decimal
            if ($.isNumeric(CantADev)) {
                if (CantADev.indexOf(',') != -1 || CantADev.indexOf('.') != -1) {
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad debe ser un número entero.</h5>");
                    // $(".fa.fa-times").hide();
                    return false;
                }

                if (objItemFac != "" && NroMotivo != 4) {
                    //console.log(objItemFac);
                    var cantSol = ObtenerCantidadPendiente(objItemFac.Descripcion, objItemFac.NumeroFactura, Cant, CantADev);
                } else {
                    ItemDevolucion.dev_cantidad = CantADev;
                    $("#txtCantDevolver").attr("disabled", "disabled");
                    if (objPRDDev.pro_codtpopro != 'M' && !objPRDDev.pro_ProductoRequiereLote ) {
                        $("#DEVAgregar").removeClass("hidden");
                        $("#btnAgregarDev").removeAttr("disabled", "disabled");
                        $("#btnAgregarDev").focus();
                        return false;
                    }
                    $("#DEVLote").removeClass("hidden");
                    campoActual = "txtNumeroLote";
                    $("#txtNumeroLote").focus();
                }
            } else {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad debe ser un número entero.</h5>");
                // $(".fa.fa-times").hide();
            }
        } 
    });

    $("#txtNumeroLote").change(function () {
        ControlarSesion();
        var pNumeroLote = $(this).val().trim(),
            pNombreProducto = objPRDDev.pro_nombre;

        if (pNumeroLote.length > 0) {
            showCargandoBuscador();
            $.ajax({
                type: "POST",
                url: "/devoluciones/ObtenerNumerosLoteDeProductoDeFacturaProveedorLogLotesConCadena",
                data: { pNombreProducto, pNumeroLote },
                success: function (response) {
                    hideCargandoBuscador();
                    ControlarSesion();
                    if (response.length > 0) {
                        colLotes = eval('(' + response + ')');
                        if (colLotes.length == 1) {
                            LoteDev = colLotes[0];
                            var DFecha = LoteDev.FechaVencimientoToString.split("/"),
                                fechaLote = new Date(DFecha[2] + "-" + DFecha[1] + "-" + DFecha[0]);
                            var ahora = new Date();
                            // Para DESARROLLO
                            // ###########################################
                            // ahora = new Date('2020-10-15');

                            var fechaMin = new Date(ahora.getFullYear(), (ahora.getMonth() + 1), 0);
                            var fechaMaxVtoCorto = new Date(ahora.getFullYear(), (ahora.getMonth() + 7), 0);
                            if (fechaLote < fechaMin) {
                                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Solo se evaluarán <b>DEVOLUCIONES</b> de los productos cuya fecha de vencimiento sea posterior al mes en curso. Caso contrario debe pasarlas por <b>DEVOLUCIONES DE VENCIDOS</b>.</h5>");
                                $("#modalModulo").bind("click");
                                return false;
                            } else if (NroMotivo == 5 && fechaLote > fechaMaxVtoCorto) {
                                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La <b>Fecha de Vencimiento del Lote</b> del producto para realizar una devolución por <em>Corto Vencimiento</em> debe estar dentro de los <b>seis (6) meses</b> posteriores al mes en curso.</h5>");
                                $("#modalModulo").bind("click");
                                return false;
                            } else {
                                setTimeout(function () {
                                    $("#txtNumeroLote").val(colLotes[0].NumeroLote);
                                    ItemDevolucion.dev_numerolote = LoteDev.NumeroLote;
                                    ItemDevolucion.dev_fechavencimientoloteToString = DFecha[2] + "-" + DFecha[1] + "-" + DFecha[0];
                                    $("#txtNumeroLoteVenc").val(DFecha[1] + "/" + DFecha[2]);
                                    $("#txtNumeroLoteVenc").attr("disabled", "disabled");
                                    $("#txtNumeroLote").attr("disabled", "disabled");
                                    modalModuloHide();
                                    $("#modalModulo").bind("click");
                                    $("#DEVLoteVenc").removeClass("hidden");
                                    $("#DEVAgregar").removeClass("hidden");
                                    $("#btnAgregarDev").removeAttr("disabled", "disabled");
                                    $("#btnAgregarDev").focus();
                                }, 100);
                            }
                        } else {
                            var html = "<li class='headerlotesList' data-idlote=" + i + ">Nro Lote<span class='fven'>Vencimiento</span></li>";
                            
                            for (var i = 0; i < colLotes.length; i++) {
                                var DatosFecha = colLotes[i].FechaVencimientoToString.split("/");
                                var FechaVenc = DatosFecha[1] + "/" + DatosFecha[2];
                                html += "<li class='lotesList' data-idlote=" + i + ">" + colLotes[i].NumeroLote + "<span class='fven'>" + FechaVenc + "</span></li>";
                            }
                            mensaje("Seleccione un Lote", html);
                            // $(".fa.fa-times").hide();
                            // $("#modalModulo").unbind("click");
                            $(".lotesList").click(function () {
                                var idItem = $(this).attr("data-idlote");
                                LoteDev = colLotes[idItem];
                                var DFecha = LoteDev.FechaVencimientoToString.split("/"),
                                    fechaLote = new Date(DFecha[2] + "-" + DFecha[1] + "-" + DFecha[0]);
                                var ahora = new Date();
                                // Para DESARROLLO
                                // ###########################################
                                // ahora = new Date('2020-10-15');

                                var fechaMin = new Date(ahora.getFullYear(), (ahora.getMonth() + 1), 0);
                                var fechaMaxVtoCorto = new Date( ahora.getFullYear(), (ahora.getMonth() + 7),0 );
                                if (fechaLote < fechaMin) {
                                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Solo se evaluarán <b>DEVOLUCIONES</b> de los productos cuya fecha de vencimiento sea posterior al mes en curso. Caso contrario debe pasarlas por <b>DEVOLUCIONES DE VENCIDOS</b>.</h5>");
                                    $("#modalModulo").bind("click");
                                    return false;
                                } else if ( NroMotivo == 5 && fechaLote > fechaMaxVtoCorto ) {
                                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La <b>Fecha de Vencimiento del Lote</b> del producto para realizar una devolución por <em>Corto Vencimiento</em> debe estar dentro de los <b>seis (6) meses</b> posteriores al mes en curso.</h5>");
                                    $("#modalModulo").bind("click");
                                    return false;
                                } else {
                                    setTimeout(function () {
                                        $("#txtNumeroLote").val(colLotes[idItem].NumeroLote);
                                        ItemDevolucion.dev_numerolote = LoteDev.NumeroLote;
                                        ItemDevolucion.dev_fechavencimientoloteToString = DFecha[2] + "-" + DFecha[1] + "-" + DFecha[0];
                                        $("#txtNumeroLoteVenc").val(DFecha[1] + "/" + DFecha[2]);
                                        $("#txtNumeroLoteVenc").attr("disabled", "disabled");
                                        $("#txtNumeroLote").attr("disabled", "disabled");
                                        modalModuloHide();
                                        $("#modalModulo").bind("click");
                                        $("#DEVLoteVenc").removeClass("hidden");
                                        $("#DEVAgregar").removeClass("hidden");
                                        $("#btnAgregarDev").removeAttr("disabled", "disabled");
                                        $("#btnAgregarDev").focus();
                                    }, 100);
                                }
                            });
                        }

                    } else {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No se encuentra Número de Lote ingresado, por favor realice una nueva búsqueda.</h5>");
                        // $(".fa.fa-times").hide();
                    }
                }
            });
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Por favor, ingrese al menos 1 caracteres para realizar la búsqueda del lote.</h5>");
            // $(".fa.fa-times").hide();
        }
    });

    $("#btnAgregarDev").click(function () {
        //console.log(ItemDevolucion);
        ControlarSesion();
        $.ajax({
            type: "POST",
            url: "/devoluciones/AgregarDevolucionItemPrecarga",
            data: '{Item: ' + JSON.stringify(ItemDevolucion) + '}',
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                //console.log(response);
                RecuperarItemsDevolucionPrecargaPorCliente();
            }
        });
    });

    $("#btnProcesarPrecarga").click(function () {
        ControlarSesion();
        if (ItemsPrecargados.length > 0) {
            showCargandoBuscador();
            $("#btnProcesarPrecarga").attr('disabled', 'disabled');
            $.ajax({
                type: "POST",
                url: "/devoluciones/AgregarSolicitudDevolucionCliente",
                data: '{Item: ' + JSON.stringify(ItemsPrecargados) + '}',
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response == "") {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Ha ocurrido un error al procesar la solicitud, por favor, comuníquese con el sector de <b>RECLAMOS</b> de la Droguería.</h5>");
                        hideCargandoBuscador();
                        $("#btnProcesarPrecarga").removeAttr('disabled');
                        return false;
                    }
                    LimpiarPrecarga();
                    mensaje("<span style='color: green !important;'><i class='fa fa-thumbs-up fa-2x'></i> ÉXITO</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La DEVOLUCIÓN  número " + response + " ha sido generada con éxito.</h5><button type='button' class='btn btn-primary pull-right' style='margin-top:1em;' id='btnGeneradaOk'>ACEPTAR</button>");
                    // $(".fa.fa-times").hide();
                    $("#btnGeneradaOk").click(function () {
                        location.href = "/devoluciones/NotaDevolucion?nrodev=" + response + "&imprimir=s";
                    });
                },
                failure: function (response) {
                    //console.log("failure");
                    //console.log(response);
                },
                error: function (response) {
                    //console.log("error");
                    //console.log(response);
                }
            });
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-info-circle fa-2x'></i> INFORMACIÓN</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No hay productos precargados, por favor realice una precarga antes de confirmar la devolución.</h5>");
        }
    });


    /*########## INICIO DE VENCIDOS ##########*/

    $("#txtNombreProductoDevVencidos").focus(function () {
        $('#DEVDevolverVencidos input').val("");
        $("#DEVCantVencidos").addClass("hidden");
        $('#DEVCantVencidos input').val("");
        $('#DEVCantVencidos input').removeAttr("disabled");
        $("#DEVLoteVencidos").addClass("hidden");
        $('#DEVLoteVencidos input').val("");
        $('#DEVLoteVencidos input').removeAttr("disabled");
        $("#DEVLoteVencVencidos").addClass("hidden");
        $('#DEVLoteVencVencidos input').val("");
        $('#DEVLoteVencVencidos input').removeAttr("disabled");
        $("#DEVAgregarVencidos").addClass("hidden");
        campoActual = 'txtNombreProductoDevVencidos';
    });

    $("#txtCantDevolverVencidos").focus(function () {
        $('#DEVCantVencidos input').val("");
        $("#DEVLoteVencidos").addClass("hidden");
        $('#DEVLoteVencidos input').val("");
        $('#DEVLoteVencidos input').removeAttr("disabled");
        $("#DEVLoteVencVencidos").addClass("hidden");
        $('#DEVLoteVencVencidos input').val("");
        $('#DEVLoteVencVencidos input').removeAttr("disabled");
        $("#DEVAgregarVencidos").addClass("hidden");
    });

    $("#txtNumeroLoteVencidos").focus(function () {
        $('#DEVLoteVencidos input').val("");
        $("#DEVLoteVencVencidos").addClass("hidden");
        $('#DEVLoteVencVencidos input').val("");
        $('#DEVLoteVencVencidos input').removeAttr("disabled");
        $("#DEVAgregarVencidos").addClass("hidden");
    });

    $("#txtNombreProductoDevVencidos").keypress(function (e) {
        if (e.which == 13 || e.which == 9) {

            var aBuscar = $(this).val().trim();
            campoActual = $(this).attr("id");
            ItemDevolucion = new ItemDev();
            ItemDevolucion.dev_motivo = 7;
            ControlarSesion();
            if (aBuscar !== '') {
                if (aBuscar.length > 0) {
                    var arrayListaColumna = new Array();

                    arrayListaColumna.push("pro_nombre");
                    arrayListaColumna.push("pro_codigobarra");
                    RecuperarProductosParaDevoluciones(aBuscar, arrayListaColumna, false, false);
                } else {
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Por favor, ingrese un producto para realizar la búsqueda.</h5>");
                    // $(".fa.fa-times").hide();
                }
            } else {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Por favor, ingrese un producto para realizar la búsqueda.</h5>");
                // $(".fa.fa-times").hide();
            }
        }
    });

    $("#txtCantDevolverVencidos").keypress(function (e) {
        if (e.which == 13 || e.which == 9) {
            ControlarSesion();
            campoActual = $(this).attr("id");
            var CantADev = $(this).val().trim();

            //control 0
            if (CantADev <= 0) {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad a devolver debe ser mayor a 0.</h5>");
                // $(".fa.fa-times").hide();
                return false;
            }

            //Control decimal redondo
            if (CantADev.indexOf(',') != -1) {
                if (0 == CantADev.substring(CantADev.indexOf(',') + 1, CantADev.length)) {
                    CantADev = CantADev.substring(0, CantADev.indexOf(','));
                }
            } else {
                if (0 == CantADev.substring(CantADev.indexOf('.') + 1, CantADev.length)) {
                    CantADev = CantADev.substring(0, CantADev.indexOf('.'));
                }
            }
            $(this).val(CantADev);

            //control decimal
            if ($.isNumeric(CantADev)) {
                if (CantADev.indexOf(',') != -1 || CantADev.indexOf('.') != -1) {
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad debe ser un número entero.</h5>");
                    // $(".fa.fa-times").hide();
                    return false;
                }

                ItemDevolucion.dev_cantidad = CantADev;
                $("#txtCantDevolverVencidos").attr("disabled", "disabled");
                //console.log(objPRDDev);
                //if (objPRDDev.pro_codtpopro != 'M' && !objPRDDev.pro_ProductoRequiereLote ) {
                //    $("#DEVAgregarVencidos").removeClass("hidden");
                //    $("#btnAgregarDevVencidos").removeAttr("disabled", "disabled");
                //    $("#btnAgregarDevVencidos").focus();
                //    return false;
                //}
                $("#DEVLoteVencidos").removeClass("hidden");
                campoActual = "txtNumeroLoteVencidos";
                $("#txtNumeroLoteVencidos").focus();
            } else {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad debe ser un número entero.</h5>");
                // $(".fa.fa-times").hide();
            }
        }
    });

    $("#txtNumeroLoteVencidos").change(function () {
        var pNumeroLote = $(this).val().trim(),
            pNombreProducto = objPRDDev.pro_nombre;
        ControlarSesion();
        if (pNumeroLote.length > 0) {
            showCargandoBuscador();
            $.ajax({
                type: "POST",
                url: "/devoluciones/ObtenerNumerosLoteDeProductoDeFacturaProveedorLogLotesConCadena",
                data: { pNombreProducto, pNumeroLote },
                success: function (response) {
                    hideCargandoBuscador();
                    ControlarSesion();
                    if (response.length > 0) {
                        colLotes = eval('(' + response + ')');
                        if (colLotes.length == 1) {
                            LoteDev = colLotes[0];
                            var DFecha = LoteDev.FechaVencimientoToString.split("/"),
                                fechaLote = new Date(DFecha[2] + "-" + DFecha[1] + "-" + DFecha[0]);
                            var ahora = new Date();
                            // Para DESARROLLO
                            //###########################################
                            //ahora = new Date('2020-10-15');

                            var fechaMin = new Date(ahora.getFullYear(), (ahora.getMonth() - 1)),
                                fechaMax = new Date(ahora.getFullYear(), (ahora.getMonth() + 1), 0);
                            if (fechaLote > fechaMax || fechaLote < fechaMin) {
                                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Recuerde que solo se aceptarán <b>DEVOLUCIONES POR VENCIDOS</b> de los productos cuyo vencimiento sea en el mes en curso o en el mes anterior.</h5>");
                                $("#modalModulo").bind("click");
                                return false;
                            } else {
                                setTimeout(function () {
                                    $("#txtNumeroLoteVencidos").val(colLotes[0].NumeroLote);
                                    ItemDevolucion.dev_numerolote = LoteDev.NumeroLote;
                                    ItemDevolucion.dev_fechavencimientoloteToString = DFecha[2] + "-" + DFecha[1] + "-" + DFecha[0];
                                    $("#txtNumeroLoteVencVencidos").val(DFecha[1] + "/" + DFecha[2]);
                                    $("#txtNumeroLoteVencVencidos").attr("disabled", "disabled");
                                    $("#txtNumeroLoteVencidos").attr("disabled", "disabled");
                                    modalModuloHide();
                                    $("#modalModulo").bind("click");
                                    $("#DEVLoteVencVencidos").removeClass("hidden");
                                    $("#DEVAgregarVencidos").removeClass("hidden");
                                    $("#btnAgregarDevVencidos").removeAttr("disabled", "disabled");
                                    $("#btnAgregarDevVencidos").focus();
                                }, 100);
                            }
                        } else {
                            var html = "<li class='headerlotesList' data-idlote=" + i + ">Nro Lote<span class='fven'>Vencimiento</span></li>";

                            for (var i = 0; i < colLotes.length; i++) {
                                var DatosFecha = colLotes[i].FechaVencimientoToString.split("/");
                                var FechaVenc = DatosFecha[1] + "/" + DatosFecha[2];
                                html += "<li class='lotesList' data-idlote=" + i + ">" + colLotes[i].NumeroLote + "<span class='fven'>" + FechaVenc + "</span></li>";
                            }
                            mensaje("Seleccione un Lote", html);
                            // $(".fa.fa-times").hide();
                            //$("#modalModulo").unbind("click");
                            $(".lotesList").click(function () {
                                var idItem = $(this).attr("data-idlote");
                                LoteDev = colLotes[idItem];
                                var DFecha = LoteDev.FechaVencimientoToString.split("/"),
                                    fechaLote = new Date(DFecha[2] + "-" + DFecha[1] + "-" + DFecha[0]);
                                var ahora = new Date();
                                // Para DESARROLLO
                                //###########################################
                                //ahora = new Date('2020-10-15');

                                var fechaMin = new Date(ahora.getFullYear(), (ahora.getMonth() - 1)),
                                    fechaMax = new Date(ahora.getFullYear(), (ahora.getMonth() + 1), 0);
                                if (fechaLote > fechaMax || fechaLote < fechaMin) {
                                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Recuerde que solo se aceptarán <b>DEVOLUCIONES POR VENCIDOS</b> de los productos cuyo vencimiento sea en el mes en curso o en el mes anterior.</h5>");
                                    $("#modalModulo").bind("click");
                                    return false;
                                } else {
                                    setTimeout(function () {
                                        $("#txtNumeroLoteVencidos").val(colLotes[idItem].NumeroLote);
                                        ItemDevolucion.dev_numerolote = LoteDev.NumeroLote;
                                        ItemDevolucion.dev_fechavencimientoloteToString = DFecha[2] + "-" + DFecha[1] + "-" + DFecha[0];
                                        $("#txtNumeroLoteVencVencidos").val(DFecha[1] + "/" + DFecha[2]);
                                        $("#txtNumeroLoteVencVencidos").attr("disabled", "disabled");
                                        $("#txtNumeroLoteVencidos").attr("disabled", "disabled");
                                        modalModuloHide();
                                        $("#modalModulo").bind("click");
                                        $("#DEVLoteVencVencidos").removeClass("hidden");
                                        $("#DEVAgregarVencidos").removeClass("hidden");
                                        $("#btnAgregarDevVencidos").removeAttr("disabled", "disabled");
                                        $("#btnAgregarDevVencidos").focus();
                                    }, 100);
                                }
                            });
                        }
                    } else {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No se encuentra Número de Lote ingresado, por favor realice una nueva búsqueda.</h5>");
                        // $(".fa.fa-times").hide();
                    }
                }
            });
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Por favor, ingrese al menos 1 caracteres para realizar la búsqueda del lote.</h5>");
            // $(".fa.fa-times").hide();
        }
    });

    $("#btnAgregarDevVencidos").click(function () {
        ControlarSesion();
        $.ajax({
            type: "POST",
            url: "/devoluciones/AgregarDevolucionItemPrecarga",
            data: '{Item: ' + JSON.stringify(ItemDevolucion) + '}',
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                RecuperarItemsDevolucionPrecargaVencidosPorCliente();
            }
        });
    });

    $("#btnProcesarPrecargaVencidos").click(function () {
        //console.log(ItemsPrecargadosVencidos);
        ControlarSesion();
        if (ItemsPrecargadosVencidos.length > 0) {
            $("#btnProcesarPrecargaVencidos").attr('disabled', 'disabled');
            showCargandoBuscador();
            $.ajax({
                type: "POST",
                url: "/devoluciones/AgregarSolicitudDevolucionCliente",
                data: '{Item: ' + JSON.stringify(ItemsPrecargadosVencidos) + '}',
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    //console.log(response);
                    LimpiarPrecargaVencidos();
                    mensaje("<span style='color: green !important;'><i class='fa fa-thumbs-up fa-2x'></i> ÉXITO</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La DEVOLUCIÓN  número " + response + " ha sido generada con éxito.</h5><button type='button' class='btn btn-primary pull-right' style='margin-top:1em;' id='btnGeneradaOk'>ACEPTAR</button>");
                    // $(".fa.fa-times").hide();
                    $("#btnGeneradaOk").click(function () {
                        location.href = "/devoluciones/NotaDevolucion?nrodev=" + response + "&imprimir=s";
                    });
                },
                failure: function (response) {
                    //console.log("failure");
                    //console.log(response);
                },
                error: function (response) {
                    //console.log("error");
                    //console.log(response);
                }
            });
        } else {
            
            mensaje("<span style='color: red !important;'><i class='fa fa-info-circle fa-2x'></i> INFORMACIÓN</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No hay productos precargados, por favor realice una precarga antes de confirmar la devolución.</h5>");
        }
    });

    /*########## INICIO FACTURADO NO ENVIADO ##########*/
    $("#txtNroComprobanteFNE").focus(function () {
        $('#DEVNroComprobanteFNE input').val("");
        $("#DEVFacturaFNE").addClass("hidden");
        $('#DEVFacturaFNE input').val("");
        $('#DEVFacturaFNE input').removeAttr("disabled");
        $("#DEVCantFNE").addClass("hidden");
        $('#DEVCantFNE input').val("");
        $('#DEVCantFNE input').removeAttr("disabled");
        $("#DEVAgregarFNE").addClass("hidden");
    });

    $("#cmbNombreProductoFNE").focus(function () {
        $('#DEVFacturaFNE input').val("");
        $("#DEVCantFNE").addClass("hidden");
        $('#DEVCantFNE input').val("");
        $('#DEVCantFNE input').removeAttr("disabled");
        $("#DEVAgregarFNE").addClass("hidden");
    });

    $("#txtCantDevolverFNE").focus(function () {
        $('#DEVCantFNE input').val("");
        $("#DEVAgregarFNE").addClass("hidden");
    });

    $("#txtNroComprobanteFNE").keypress(function (e) {
        if (e.which == 13 || e.which == 9) {
            ControlarSesion();
            campoActual = $(this).attr("id");
            objPRDFac = "";
            objPRDDev = "";
            objItemFac = "";
            ItemDevolucion = new ItemDev();
            IsBanderaUsarDll('OnCallBackIsBanderaUsarDll_ComprobanteNro');
            return false;
        }
    });

    $("#cmbNombreProductoFNE").change(function () {
        var seleccion = $(this).val().trim();
        var obj = $("#NombreProductoValuesFNE").find('option[value="' + seleccion + '"]');
        campoActual = $(this).attr("id");
        ControlarSesion();
        if (obj != null && obj.length > 0) {
            var NroItem = obj[0].dataset.id;
            objItemFac = objFactura.lista[NroItem];
            console.log(objItemFac);
            //var existe = ItemsPrecargados.find(oItem => oItem.dev_nombreproductofactura === objItemFac.Descripcion && oItem.dev_numerofactura === objItemFac.NumeroFactura);
            //if (existe) {
            //    mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> INFORMACIÓN</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto " + existe.dev_nombreproductofactura + " de la factura N° " + existe.dev_numerofactura + " ya posee una solicitud cargada con un motivo diferente, para ingresar un nuevo motivo, genere una nueva nota de devolución.</h5>");
            //    return;
            //}
            NombreProductoFact = objFactura.lista[NroItem].Descripcion;
            Cant = 0;
            var cProds = objFactura.lista.filter(item => item.Descripcion === NombreProductoFact && item.PrecioUnitario != "");
            for (var i = 0; i < cProds.length; i++) {
                Cant += Number(cProds[i].Cantidad);
            }
            ItemDevolucion.dev_nombreproductofactura = NombreProductoFact;
            ItemDevolucion.dev_numeroitemfactura = objFactura.lista[NroItem].NumeroItem;
            ObtenerUnidadesEnSolicitudesNCFactNoEnvNoAnuladasDeFacturayObjetoComercial(ItemDevolucion.dev_numerofactura, ItemDevolucion.dev_nombreproductofactura);
            $("#cmbNombreProductoFNE").attr("disabled", "disabled");
            $("#DEVCantFNE").removeClass("hidden");
            campoActual = "txtCantDevolverFNE";
            $("#txtCantDevolverFNE").focus();
            
        } else if ($.isNumeric(seleccion)) {
            var arrayListaColumna = new Array();
            arrayListaColumna.push("pro_codigobarra");

            $.ajax({
                type: "POST",
                url: "/mvc/RecuperarProductosVariasColumnas",
                data: { pTxtBuscador: seleccion, pListaColumna: arrayListaColumna, pIsBuscarConOferta: false, pIsBuscarConTransfer: false },
                success: function (response) {
                    listaPRD = eval('(' + response + ')');
                    //console.log(listaPRD);
                    if (listaPRD.listaProductos.length == 1) {
                        var Encontrado = false;
                        for (var i = 0; i < objFactura.lista.length; i++) {
                            if (listaPRD.listaProductos[0].pro_nombre == objFactura.lista[i].Descripcion) {
                                //console.log("Encontrado");
                                Encontrado = true;
                                var NroItem = i;
                                objItemFac = objFactura.lista[NroItem];
                                //var existe = ItemsPrecargados.find(oItem => oItem.dev_nombreproductofactura === objItemFac.Descripcion && oItem.dev_numerofactura === objItemFac.NumeroFactura);
                                //if (existe) {
                                //    mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> INFORMACIÓN</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto " + existe.dev_nombreproductofactura + " de la factura N° " + existe.dev_numerofactura + " ya posee una solicitud cargada con un motivo diferente, para ingresar un nuevo motivo, genere una nueva nota de devolución.</h5>");
                                //    return;
                                //}
                                NombreProductoFact = objFactura.lista[NroItem].Descripcion;
                                $("#cmbNombreProductoFNE").val(NombreProductoFact);
                                Cant = 0;
                                var cProds = objFactura.lista.filter(item => item.Descripcion === NombreProductoFact && item.PrecioUnitario != "");
                                for (var i = 0; i < cProds.length; i++) {
                                    Cant += Number(cProds[i].Cantidad);
                                }
                                ItemDevolucion.dev_nombreproductofactura = NombreProductoFact;
                                ItemDevolucion.dev_numeroitemfactura = objFactura.lista[NroItem].NumeroItem;
                                ObtenerUnidadesEnSolicitudesNCFactNoEnvNoAnuladasDeFacturayObjetoComercial(ItemDevolucion.dev_numerofactura, ItemDevolucion.dev_nombreproductofactura);

                                $("#cmbNombreProductoFNE").attr("disabled", "disabled");
                                $("#DEVCantFNE").removeClass("hidden");
                                campoActual = "txtCantDevolverFNE";
                                $("#txtCantDevolverFNE").focus();
                                break;
                            }
                        }
                        if (!Encontrado) {
                            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto no se encontró en la factura. Por favor verifique.</h5>");
                            // $(".fa.fa-times").hide();
                        }
                    } else {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto no se encontró en la factura. Por favor verifique.</h5>");
                        // $(".fa.fa-times").hide();
                    }
                }
            });
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto seleccionado no pertenece a la factura ingresada. Por favor verifique.</h5>");
            // $(".fa.fa-times").hide();
        }
    });

    $("#txtCantDevolverFNE").keypress(function (e) {
        if (e.which == 13 || e.which == 9) {
            ControlarSesion();
            campoActual = $(this).attr("id");
            var CantADev = $(this).val().trim();

            //control 0
            if (CantADev <= 0) {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad a devolver debe ser mayor a 0.</h5>");
                // $(".fa.fa-times").hide();
                return false;
            }

            //Control decimal redondo
            if (CantADev.indexOf(',') != -1) {
                if (0 == CantADev.substring(CantADev.indexOf(',') + 1, CantADev.length)) {
                    CantADev = CantADev.substring(0, CantADev.indexOf(','));
                }
            } else {
                if (0 == CantADev.substring(CantADev.indexOf('.') + 1, CantADev.length)) {
                    CantADev = CantADev.substring(0, CantADev.indexOf('.'));
                }
            }
            $(this).val(CantADev);

            //control decimal
            if ($.isNumeric(CantADev)) {
                if (CantADev.indexOf(',') != -1 || CantADev.indexOf('.') != -1) {
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad debe ser un número entero.</h5>");
                    // $(".fa.fa-times").hide();
                    return false;
                }

                var cantSol = ObtenerCantidadPendiente(objItemFac.Descripcion, objItemFac.NumeroFactura, Cant, CantADev);
            } else {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad debe ser un número entero.</h5>");
                // $(".fa.fa-times").hide();
            }
        }
    });

    $("#btnAgregarDevFNE").click(function () {
        //console.log(ItemDevolucion);
        ControlarSesion();
        $.ajax({
            type: "POST",
            url: "/devoluciones/AgregarReclamoFacturadoNoEnviadoItemPrecarga",
            data: '{Item: ' + JSON.stringify(ItemDevolucion) + '}',
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                //console.log(response);
                RecuperarItemsReclamoFacturadoNoEnviado();
            }
        });
    });

    $("#btnProcesarPrecargaFNE").click(function () {
        ControlarSesion();
        if (ItemsPrecargadosFNE.length > 0) {
            showCargandoBuscador();
            $("#btnProcesarPrecargaFNE").attr('disabled', 'disabled');
            $.ajax({
                type: "POST",
                url: "/devoluciones/AgregarReclamoFacturadoNoEnviadoCliente",
                data: '{Item: ' + JSON.stringify(ItemsPrecargadosFNE) + '}',
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response == "") {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Ha ocurrido un error al procesar la solicitud, por favor, comuníquese con el sector de <b>RECLAMOS</b> de la Droguería.</h5>");
                        hideCargandoBuscador();
                        $("#btnProcesarPrecargaFNE").removeAttr('disabled');
                        return false;
                    }
                    LimpiarPrecargaReclamoFNE();
                    mensaje("<span style='color: green !important;'><i class='fa fa-thumbs-up fa-2x'></i> ÉXITO</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>" + response.replace(/X0001/g,'<br>X0001') + "</h5><button type='button' class='btn btn-primary pull-right' style='margin-top:1em;' id='btnGeneradaOkFNE'>ACEPTAR</button>");
                    // $(".fa.fa-times").hide();
                    $("#btnGeneradaOkFNE").click(function () {
                        setTimeout(function () {
                            $("#btnProcesarPrecargaFNE").removeAttr('disabled');
                            $("#txtNroComprobanteFNE").focus();
                        }, 100);
                    });
                },
                failure: function (response) {
                    //console.log("failure");
                    //console.log(response);
                },
                error: function (response) {
                    //console.log("error");
                    //console.log(response);
                }
            });
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-info-circle fa-2x'></i> INFORMACIÓN</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No hay productos precargados, por favor realice una precarga antes de confirmar la devolución.</h5>");
        }
    });

    /*########## INICIO DE FACTURA COMPLETA ##########*/
    $("#cmbMotivoFC").focus(function () {
        $("#cmbMotivoFC").val("");
        $('#DEVTipoComprobanteFC').addClass("hidden");
        $('#DEVTipoComprobanteFC input').val("");
        $('#DEVTipoComprobanteFC input').removeAttr("disabled");
        $('#DEVNroComprobanteFC').addClass("hidden");
        $('#DEVNroComprobanteFC input').val("");
        $('#DEVNroComprobanteFC input').removeAttr("disabled");
        $("#DEVCartelFC").addClass("hidden");
        $("#DEVAgregarFC").addClass("hidden");
    });

    $("#cmbMotivoFC").change(function (e) {
        ControlarSesion();
        var Motivo = $(this).val().trim();
        var obj = $("#MotivoValues").find("option[value='" + Motivo + "']");
        campoActual = $(this).attr("id");
        ItemDevolucion = new ItemDev();

        if (obj != null && obj.length > 0) {
            NroMotivo = obj[0].dataset.id;
            if (Motivo != "") {
                $('#DEVNroComprobanteFC').removeClass("hidden");
                $('#DEVNroComprobanteFC input').val("");
                objPRDFac = "";
                objPRDDev = "";
                objItemFac = "";
                $(this).attr("disabled", "disabled");
                setTimeout(function () {
                    campoActual = "txtNroComprobanteFC";
                    $("#txtNroComprobanteFC").focus();
                }, 100);
                ItemDevolucion.dev_motivo = NroMotivo;
            } else {
                $('#DEVNroComprobanteFC').addClass("hidden");
                objPRDFac = "";
                objPRDDev = "";
                objItemFac = "";
            }
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Seleccione un motivo válido</h5>");
            // $(".fa.fa-times").hide();
        }
    });

    $("#txtNroComprobanteFC").keypress(function (e) {
        if (e.which == 13 || e.which == 9) {
            ControlarSesion();
            campoActual = $(this).attr("id");
            objPRDFac = "";
            objPRDDev = "";
            objItemFac = "";

            IsBanderaUsarDll('OnCallBackIsBanderaUsarDll_ComprobanteNroFacturaCompleta');
            return false;
        }
    });

    $("#btnAgregarDevFC").click(function () {
        ControlarSesion();
        showCargandoBuscador();
        var progreso = 0;
        ItemDevolucion.dev_nombreproductofactura = "F.Completa";

        $.each(ProdFacturaCompleta, function (index, value) {
            ItemDevolucion.dev_nombreproductodevolucion = value.Producto;
            ItemDevolucion.dev_cantidad = value.Cant;
            ItemDevolucion.dev_numeroitemfactura = value.Orden;
            $.ajax({
                type: "POST",
                url: "/devoluciones/AgregarDevolucionItemPrecarga",
                data: '{Item: ' + JSON.stringify(ItemDevolucion) + '}',
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    //console.log(response);
                    progreso += 1;
                    if (progreso == ProdFacturaCompleta.length) {
                        hideCargandoBuscador();
                        RecuperarItemsDevolucionPrecargaFacturaCompletaPorCliente();
                    }
                }
            });
        });
    });

    $("#btnProcesarPrecargaFC").click(function () {
        //alert("Listo a procesar");
        ControlarSesion();
        $.ajax({
            type: "POST",
            url: "/devoluciones/AgregarSolicitudDevolucionCliente",
            data: '{Item: ' + JSON.stringify(ItemsPrecargadosFC) + '}',
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                LimpiarPrecargaFacturaCompleta();
                mensaje("<span style='color: green !important;'><i class='fa fa-thumbs-up fa-2x'></i> ÉXITO</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La DEVOLUCIÓN  número " + response + " ha sido generada con éxito.</h5><button type='button' class='btn btn-primary pull-right' style='margin-top:1em;' id='btnGeneradaOk'>ACEPTAR</button>");
                // $(".fa.fa-times").hide();
                $("#btnGeneradaOk").click(function () {
                    location.href = "/devoluciones/NotaDevolucion?nrodev=" + response + "&imprimir=s";
                });
            },
            failure: function (response) {
                //console.log("failure");
                //console.log(response);
            },
            error: function (response) {
                //console.log("error");
                //console.log(response);
            }
        });
    });

    /*########### IMPRIMIR ###########*/
    $("#btnImprimirND").click(function () {
        //console.log("ENTRO1");
        Imprimir();
        //$("#divPanelDevoluciones").printElement();
    });

    /*########### FILTROS ###########*/
    $("#chkFechas").change(function () {
        //$("#btn-consultar").click();
        $("#chkNroDev:checked").prop("checked", false);
        $("#txtNroDev").val("");
    });
    $("#chkEstados").change(function () {
        if ($("#chkEstados:checked").length == 0) {
            $("#cmbEstados").val("TODAS");
        } else {
            $("#chkNroDev:checked").prop("checked", false);
            $("#txtNroDev").val("");
        }
        //$("#btn-consultar").click();
    });
    $("#chkRechazos").change(function () {
        if ($("#chkRechazos:checked").length == 0) {
            $("#cmbRechazos").val("TODAS");
        } else {
            $("#txtNroDev").val("");
            $("#chkNroDev:checked").prop("checked", false);
        }
        //$("#btn-consultar").click();
    });
    $("#chkNroDev").change(function () {
        if ($("#chkNroDev:checked").length == 0) {
            $("#txtNroDev").val("");
        } else {
            $("#chkNroDev").prop("checked", true);
            $("#chkEstados").prop("checked", false);
            $("#cmbEstados").val("TODAS");
            $("#chkRechazos").prop("checked", false);
            $("#cmbRechazos").val("TODAS");
            $("#chkFechas").prop("checked", false);
        }
    });
    $("#cmbEstados").change(function () {
        $("#chkEstados").prop("checked", true);
        $("#chkNroDev:checked").prop("checked", false);
        $("#txtNroDev").val("");
        //$("#btn-consultar").click();
    });
    $("#cmbRechazos").change(function () {
        $("#chkRechazos").prop("checked", true);
        $("#chkNroDev:checked").prop("checked", false);
        $("#txtNroDev").val("");
        //$("#btn-consultar").click();
    });
    $("#txtNroDev").keypress(function (e) {
        if (e.which === 13) {
            $("#chkNroDev").prop("checked", true);
            $("#chkEstados").prop("checked", false);
            $("#cmbEstados").val("TODAS");
            $("#chkRechazos").prop("checked", false);
            $("#cmbRechazos").val("TODAS");
            $("#chkFechas").prop("checked", false);
            $("#btn-consultar").click();
        }

    });
    $("#btn-consultar").click(function () {
        reiniciarOrden();
    });

    /*########### TABS ###########*/
    //$("#globales").click(function () {
    //    if (!$("#globales").hasClass('active')) {
    //        $("#globales").addClass('active');
    //        $("#individuales").removeClass('active');
    //        $("#global-search").fadeIn();
    //    }
    //});
    //$("#individuales").click(function () {
    //    if (!$("#individuales").hasClass('active')) {
    //        $("#individuales").addClass('active');
    //        $("#globales").removeClass('active');
    //        $("#global-search").fadeOut();
    //    }
    //});
});

function OnCallBackIsBanderaUsarDll_ComprobanteNro(args) {
    args = true;
    if (args) {
        showCargandoBuscador();
        
        if (campoActual == "txtNroComprobanteFNE") {
            var nro = $('#txtNroComprobanteFNE').val().trim();
        } else {
            var nro = $('#txtNroComprobante').val().trim();
        }
        if (nro.length >= 3) {
            Cbte = "%" + nro;
            $.ajax({
                type: "POST",
                url: "/devoluciones/ObtenerFacturasPorUltimosNumeros",
                data: { Cbte },
                success: function (response) {
                    console.log(response);
                    if (response.length > 0) {
                        var cFacturas = eval('(' + response + ')');
                        if (cFacturas.length > 0) {
                            //console.log(eval('(' + response + ')'));
                            if (cFacturas.length == 1) {
                                Cbte = cFacturas[0].Numero;
                                //$("#cmbTipoComprobante").val('FAC-' + Cbte.slice(0, 5));
                                if (campoActual == "txtNroComprobante") {
                                    $("#txtNroComprobante").val(Cbte);
                                } else {
                                    $("#txtNroComprobanteFNE").val(Cbte);
                                }
                                ObtenerFacturaCliente(Cbte);
                            } else {
                                var html = "";

                                for (var i = 0; i < cFacturas.length; i++) {
                                    html += "<li class='msjList' data-NroFactura=" + cFacturas[i].Numero + ">" + cFacturas[i].Numero + "</span></li>";
                                }
                                hideCargandoBuscador();
                                mensaje("Seleccione una Factura", html);
                                $(".msjList").click(function () {
                                    Cbte = $(this).attr("data-NroFactura");
                                    modalModuloHide();
                                    setTimeout(function () {
                                        //$("#cmbTipoComprobante").val('FAC-' + Cbte.slice(0, 5));
                                        if (campoActual == "txtNroComprobante") {
                                            $("#txtNroComprobante").val(Cbte);
                                        } else {
                                            $("#txtNroComprobanteFNE").val(Cbte);
                                        }
                                        ObtenerFacturaCliente(Cbte);
                                    }, 100);

                                });
                            }
                        } else {
                            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No se encontraron facturas con la terminación " + nro + ".</h5>");
                            // $(".fa.fa-times").hide();
                            hideCargandoBuscador();
                            return false;
                        }
                    } else {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No se encontraron facturas con la terminación " + nro + ".</h5>");
                        // $(".fa.fa-times").hide();
                        hideCargandoBuscador();
                        return false;
                    }
                }
            })
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Ingrese al menos tres ( 3 ) dígitos para realizar la búsqueda.</h5>");
            // $(".fa.fa-times").hide();
            hideCargandoBuscador();
            return false;
        }
    } 
};

function OnCallBackIsBanderaUsarDll_ComprobanteNroFacturaCompleta(args) {
    if (args) {
        showCargandoBuscador();
        var nro = $('#txtNroComprobanteFC').val().trim();
        if (nro.length >= 3) {
            Cbte = "%" + nro;
            $.ajax({
                type: "POST",
                url: "/devoluciones/ObtenerFacturasPorUltimosNumeros",
                data: { Cbte },
                success: function (response) {
                    var cFacturas = eval('(' + response + ')');
                    if (cFacturas.length > 0) {
                        //console.log(eval('(' + response + ')'));
                        if (cFacturas.length == 1) {
                            Cbte = cFacturas[0].Numero;
                            //$("#cmbTipoComprobanteFC").val('FAC-' + Cbte.slice(0, 5));
                            $("#txtNroComprobanteFC").val(Cbte);
                            ObtenerFacturaClienteFacturaCompleta(Cbte);
                        } else {
                            var html = "";

                            for (var i = 0; i < cFacturas.length; i++) {
                                html += "<li class='msjList' data-NroFactura=" + cFacturas[i].Numero + ">" + cFacturas[i].Numero + "</span></li>";
                            }
                            hideCargandoBuscador();
                            mensaje("Seleccione una Factura", html);
                            $(".msjList").click(function () {
                                Cbte = $(this).attr("data-NroFactura");
                                modalModuloHide();
                                setTimeout(function () {
                                    //$("#cmbTipoComprobanteFC").val('FAC-' + Cbte.slice(0, 5));
                                    $("#txtNroComprobanteFC").val(Cbte);
                                    ObtenerFacturaClienteFacturaCompleta(Cbte);
                                }, 100);

                            });
                        }
                    } else {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No se encontraron facturas con la terminación " + nro + ".</h5>");
                        // $(".fa.fa-times").hide();
                        hideCargandoBuscador();
                        return false;
                    }
                }
            });
        } else {
            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Ingrese al menos tres ( 3 ) dígitos para realizar la búsqueda.</h5>");
            // $(".fa.fa-times").hide();
            hideCargandoBuscador();
            return false;
        }
    } 
}

function ObtenerFacturaCliente(pNroFactura) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/ObtenerFacturaCliente",
        data: { pNroFactura },
        success: function (response) {
            hideCargandoBuscador();
            if (response.length > 0) {
                objFactura = eval('(' + response + ')');
                var ahora = new Date().getTime();
                var dia = new Date().getDay();
                var dtFecha = objFactura.FechaToString.split("/");
                var FechaFactura = new Date(dtFecha[2] + "/" + dtFecha[1] + "/" + dtFecha[0]).getTime();

                // Controlo que no se haya hecho por IAPOS
                if (objFactura.NumeroCuentaCorriente == "9002") {
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La factura fue pedida a través de IAPOS, por favor comuníquese con RECLAMOS.</h5>");
                    // $(".fa.fa-times").hide();
                    return false;
                }

                var diff = parseInt((ahora - FechaFactura) / (1000 * 60 * 60 * 24));
                var fechaOK = false;
                ItemDevolucion.dev_numerofactura = objFactura.Numero;
                if (campoActual == "txtNroComprobanteFNE") {
                    var IdSucCli = $("#txtIdSucursalCliente").val().trim();
                    switch (ItemDevolucion.dev_numerofactura.slice(1, 5)) {
                        case "0001":
                        case "0013":
                        case "0021":
                        case "0022":
                            ItemDevolucion.dev_idsucursal = "CC";
                            break;
                        case "0006":
                        case "0015":
                            ItemDevolucion.dev_idsucursal = "CH";
                            break;
                        case "0012":
                        case "0018":
                            ItemDevolucion.dev_idsucursal = "CB";
                            break;
                        case "0010":
                        case "0017":
                            ItemDevolucion.dev_idsucursal = "CD";
                            break;
                        case "0003":
                        case "0014":
                            ItemDevolucion.dev_idsucursal = "CO";
                            break;
                        case "0035":
                        case "0036":
                            ItemDevolucion.dev_idsucursal = "RC";
                            break;
                        case "0007":
                        case "0016":
                            ItemDevolucion.dev_idsucursal = "SF";
                            break;
                        case "0023":
                        case "0024":
                            ItemDevolucion.dev_idsucursal = "SN";
                            break;
                        case "0019":
                        case "0020":
                            ItemDevolucion.dev_idsucursal = "VH";
                            break;
                        case "0032":
                        case "0033":
                            ItemDevolucion.dev_idsucursal = "VM";
                            break;
                    }

                    if (ItemDevolucion.dev_idsucursal == "CC" && IdSucCli != "CC" ) {
                        switch (dia) {
                            case 1:
                                if (diff <= 10) {
                                    fechaOK = true;
                                }
                                break;
                            case 0:
                                if (diff <= 9) {
                                    fechaOK = true;
                                }
                                break;
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                if (diff <= 8) {
                                    fechaOK = true;
                                }
                                break;
                        }
                    } else {
                        switch (dia) {
                            case 6:
                            case 0:
                            case 1:
                            case 2:
                                if (diff <= 5) {
                                    fechaOK = true;
                                }
                                break;
                            case 3:
                            case 4:
                            case 5:
                                if (diff <= 3) {
                                    fechaOK = true;
                                }
                                break;
                        }
                    }
                } else {
                    switch (dia) {
                        case 6:
                        case 0:
                            if (diff <= 13) {
                                fechaOK = true;
                            }
                            break;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            if (diff <= 14) {
                                fechaOK = true;
                            }
                            break;
                    }
                }
                 //DESARROLLO -> dejo pasar cualquier factura por fechas
                 //fechaOK = true;
                 //DESARROLLO

                if (fechaOK) {
                    var html = "";
                    ItemDevolucion.dev_numerofactura = objFactura.Numero;
                    var cProductosDespliegue = [];
                    console.log(objFactura.lista);
                    for (var i = 0; i < objFactura.lista.length; i++) {
                        var existe = cProductosDespliegue.find(prd => prd === objFactura.lista[i].Descripcion);
                        if (objFactura.lista[i].Cantidad != "" && !existe && objFactura.lista[i].PrecioUnitario != "") {
                            html += "<option value=\"" + objFactura.lista[i].Descripcion + "\"  data-id=\"" + i + "\">";
                            cProductosDespliegue.push(objFactura.lista[i].Descripcion);
                        }
                    }
                    if (campoActual == "txtNroComprobante") {
                        $("#txtNroComprobante").attr("disabled", "disabled");
                        if (NroMotivo == 1) {
                            $("#NombreProductoValues").html(html);
                            $("#DEVFactura").removeClass("hidden");
                            $("#DEVDevolver").removeClass("hidden");
                            $("#txtCantDevolver").val("");
                            $("#txtNombreProductoDev").val("");
                            $("#cmbNombreProducto").val("");
                            campoActual = "cmbNombreProducto";
                            $("#cmbNombreProducto").focus();
                        } else if (NroMotivo == 4) {
                            $("#DEVDevolver").removeClass("hidden");
                            $("#txtCantDevolver").val("");
                            $("#txtNombreProductoDev").val("");
                            campoActual = "txtNombreProductoDev";
                            $("#txtNombreProductoDev").focus();
                        } else {
                            $("#NombreProductoValues").html(html);
                            $("#DEVFactura").removeClass("hidden");
                            $("#txtCantDevolver").val("");
                            $("#txtNombreProductoDev").val("");
                            $("#cmbNombreProducto").val("");
                            campoActual = "cmbNombreProducto";
                            $("#cmbNombreProducto").focus();
                        }
                    } else {
                        
                        $("#txtNroComprobanteFNE").attr("disabled", "disabled");
                        $("#NombreProductoValuesFNE").html(html);
                        $("#DEVFacturaFNE").removeClass("hidden");
                        $("#txtCantDevolverFNE").val("");
                        $("#cmbNombreProductoFNE").val("");
                        campoActual = "cmbNombreProductoFNE";
                        $("#cmbNombreProductoFNE").focus();
                    }
                } else {
                    if (campoActual == "txtNroComprobanteFNE") {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La factura no puede tener mas de 72 horas hábiles de emitida.</h5>");
                    } else {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La factura no puede tener mas de 10 días hábiles de emitida.</h5>");
                    }
                }
            } else {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La factura no corresponde</h5>");
                // $(".fa.fa-times").hide();
            }
        }
    });
}

function ObtenerFacturaClienteFacturaCompleta(pNroFactura) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/EsFacturaConDevolucionesEnProceso",
        data: { pNroFactura },
        success: function (response) {
            if (response == 'True') {
                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La factura " + pNroFactura + " ya posee devoluciones en curso, por favor comuníquese con RECLAMOS.</h5>");
                // $(".fa.fa-times").hide();
                hideCargandoBuscador();
                return false;
            } else {
                $.ajax({
                    type: "POST",
                    url: "/devoluciones/ObtenerFacturaCliente",
                    data: { pNroFactura },
                    success: function (response) {
                        hideCargandoBuscador();
                        if (response.length > 0) {
                            objFactura = eval('(' + response + ')');
                            var ahora = new Date().getTime();
                            var dia = new Date().getDay();
                            var dtFecha = objFactura.FechaToString.split("/");
                            var FechaFactura = new Date(dtFecha[2] + "/" + dtFecha[1] + "/" + dtFecha[0]).getTime();

                            // Controlo que no se haya hecho por IAPOS
                            if (objFactura.NumeroCuentaCorriente == "9002") {
                                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La factura fue pedida a través de IAPOS, por favor comuníquese con RECLAMOS.</h5>");
                                // $(".fa.fa-times").hide();
                                return false;
                            }

                            //valores para DESARROLLO
                                //ahora = new Date('2019/10/15').getTime();
                                //dia = new Date('2019/10/15').getDay();
                                //FechaFactura = new Date('2019/10/14').getTime();
                            // FIN para DESARROLLO

                            var diff = parseInt((ahora - FechaFactura) / (1000 * 60 * 60 * 24));
                            var fechaOK = false;
                            switch (dia) {
                                case 6:
                                case 0:
                                    if (diff < 13) {
                                        fechaOK = true;
                                    }
                                    break;
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                    if (diff < 14) {
                                        fechaOK = true;
                                    }
                                    break;
                            }

                            if (fechaOK) {
                                ItemDevolucion.dev_numerofactura = objFactura.Numero;
                                ProdFacturaCompleta = [];
                                showCargandoBuscador();
                                var contador = 0;
                                //console.log(objFactura.lista);
                                for (var j = 0; j < objFactura.lista.length; j++) {
                                    if (objFactura.lista[j].Cantidad != "") {
                                        var arrayListaColumna = new Array();
                                        arrayListaColumna.push("pro_nombre");
                                        var ProdFac = new oProd(objFactura.lista[j].Descripcion, objFactura.lista[j].Cantidad, objFactura.lista[j].NumeroItem);
                                        ProdFacturaCompleta.push(ProdFac);
                            
                                        $.ajax({
                                            type: "POST",
                                            url: "/mvc/RecuperarProductosVariasColumnas",
                                            data: { pTxtBuscador: objFactura.lista[j].Descripcion, pListaColumna: arrayListaColumna, pIsBuscarConOferta: false, pIsBuscarConTransfer: false },
                                            success: function (response) {
                                                listaPRD = eval('(' + response + ')');
                                                if (listaPRD.listaProductos.length > 0) {
                                                    objPRDDev = listaPRD.listaProductos[0];
                                                    if (objPRDDev.pro_isCadenaFrio) {
                                                        //console.log("ENTRO");
                                                        hideCargandoBuscador();
                                                        mensaje_reclamos(objPRDDev.pro_nombre);
                                                        seguir = false;
                                                        $("#modalModulo").unbind("click");
                                                        return false;
                                                    } else if (objPRDDev.isValePsicotropicos) {
                                                        //console.log("ENTRO");
                                                        hideCargandoBuscador();
                                                        seguir = false;
                                                        mensaje_vale_psico(objPRDDev.pro_nombre);
                                                        $("#modalModulo").unbind("click");
                                                        return false;
                                                    }
                                                    contador += 1;
                                                    if (ProdFacturaCompleta.length == contador) {
                                                        //console.log("ENTRO");
                                                        //hideCargandoBuscador();
                                                        $("#cmbTipoComprobanteFC").attr("disabled", "disabled");
                                                        $("#txtNroComprobanteFC").attr("disabled", "disabled");
                                                        $("#DEVCartelFC").removeClass("hidden");
                                                        //$("#DEVAgregarFC").removeClass("hidden");
                                                        $("#btnAgregarDevFC").removeAttr("disabled", "disabled");
                                                        setTimeout(function () {
                                                            $("#btnAgregarDevFC").click();
                                                        }, 100);
                                                        //$("#btnAgregarDevFC").focus();
                                                    }
                                                } else {
                                                    //hideCargandoBuscador();
                                                    //mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Hay productos en la factura " + objFactura.Numero + " que no se comercializan.</h5>");
                                                    //seguir = false;
                                                    //return false;
                                                }
                                            }
                                        });
                                    }
                                }
                            } else {
                                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La factura no puede tener mas de 10 días hábiles de emitida.</h5>");
                                // $(".fa.fa-times").hide();
                            }
                        } else {
                            mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La factura no corresponde</h5>");
                            // $(".fa.fa-times").hide();
                        }
                    }
                });
            }
        }
    });

}

function RecuperarProductosParaDevoluciones(pTxtBuscador, pListaColumna, pIsBuscarConOferta, pIsBuscarConTransfer) {
    pTxtBuscador = pTxtBuscador.replace("'", "''");
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarProductosVariasColumnas",
        data: { pTxtBuscador: pTxtBuscador, pListaColumna: pListaColumna, pIsBuscarConOferta: pIsBuscarConOferta, pIsBuscarConTransfer: pIsBuscarConTransfer },
        success:
            function (response) {
                listaPRD = eval('(' + response + ')');
                console.log(listaPRD);
                var html = "";
                if (campoActual == "txtNombreProductoDev") {
                    if (listaPRD.listaProductos.length > 0) {
                        if (listaPRD.listaProductos.length == 1) {
                            $("#txtNombreProductoDev").val(listaPRD.listaProductos[0].pro_nombre);
                            objPRDDev = listaPRD.listaProductos[0];
                            modalModuloHide();
                            if (NroMotivo == 1) {
                                if (objPRDDev.pro_nombre == objItemFac.Descripcion) {
                                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Al seleccionar el motivo 'Mal facturado A por B' el producto devuelto debe ser distinto al facturado.</h5>");
                                    return false;
                                }
                            }
                            if (objPRDDev.pro_isCadenaFrio) {
                                mensaje_reclamos(objPRDDev.pro_nombre);
                                $("#modalModulo").unbind("click");
                                return false;
                            } else if (objPRDDev.isValePsicotropicos) {
                                mensaje_vale_psico(objPRDDev.pro_nombre);
                                $("#modalModulo").unbind("click");
                                return false;
                            } else if (objPRDDev.pro_isTrazable) {
                                setTimeout(function () {
                                    mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto que está devolviendo es un producto TRAZABLE, si usted ha CONFIRMADO la recepción del mismo, deberá trazar la devolución a la droguería como 'Envio de producto en carácter de devolución'.</h5>");
                                }, 100);
                                // $(".fa.fa-times").hide();
                                ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                                $("#txtNombreProductoDev").attr("disabled", "disabled");
                                if (NroMotivo == 1) {
                                    if (objItemFac == "") {
                                        campoActual = "cmbNombreProducto";
                                        mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto facturado todavía no ha sido ingresado.</h5>");
                                        return false;
                                    }
                                }
                                $("#DEVCant").removeClass("hidden");
                                campoActual = "txtCantDevolver";
                                $("#txtCantDevolver").focus();
                            } else {
                                ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                                $("#txtNombreProductoDev").attr("disabled", "disabled");
                                if (NroMotivo == 1) {
                                    if (objItemFac == "") {
                                        campoActual = "cmbNombreProducto";
                                        mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto facturado todavía no ha sido ingresado.</h5>");
                                        return false;
                                    }
                                }
                                $("#DEVCant").removeClass("hidden");
                                campoActual = "txtCantDevolver";
                                $("#txtCantDevolver").focus();
                            }
                        } else {
                            for (var i = 0; i < listaPRD.listaProductos.length; i++) {
                                html += "<li class='msjList' data-NroProd=" + i + ">" + listaPRD.listaProductos[i].pro_nombre + "</li>";
                            }
                            mensaje("Seleccione un producto", html);
                            // $(".fa.fa-times").hide();
                            // $("#modalModulo").unbind("click");
                            $(".msjList").click(function () {
                                var idItem = $(this).attr("data-nroprod");
                                $("#txtNombreProductoDev").val(listaPRD.listaProductos[idItem].pro_nombre);
                                objPRDDev = listaPRD.listaProductos[idItem];
                                modalModuloHide();
                                if (NroMotivo == 1) {
                                    if (objPRDDev.pro_nombre == objItemFac.Descripcion) {
                                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Al seleccionar el motivo 'Mal facturado A por B' el producto devuelto debe ser distinto al facturado.</h5>");
                                        return false;
                                    }
                                }
                                if (objPRDDev.pro_isCadenaFrio) {
                                    mensaje_reclamos(objPRDDev.pro_nombre);
                                    $("#modalModulo").unbind("click");
                                    return false;
                                } else if (objPRDDev.isValePsicotropicos) {
                                    mensaje_vale_psico(objPRDDev.pro_nombre);
                                    $("#modalModulo").unbind("click");
                                    return false;
                                } else if (objPRDDev.pro_isTrazable) {
                                    setTimeout(function () {
                                        mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto que está devolviendo es un producto TRAZABLE, si usted ha CONFIRMADO la recepción del mismo, deberá trazar la devolución a la droguería como 'Envio de producto en carácter de devolución'.</h5>");
                                    }, 100);
                                    // $(".fa.fa-times").hide();
                                    ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                                    $("#txtNombreProductoDev").attr("disabled", "disabled");
                                    if (NroMotivo == 1) {
                                        if (objItemFac == "") {
                                            campoActual = "cmbNombreProducto";
                                            mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto facturado todavía no ha sido ingresado.</h5>");
                                            return false;
                                        }
                                    }
                                    $("#DEVCant").removeClass("hidden");
                                    campoActual = "txtCantDevolver";
                                    $("#txtCantDevolver").focus();
                                } else {
                                    ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                                    $("#txtNombreProductoDev").attr("disabled", "disabled");
                                    if (NroMotivo == 1) {
                                        if (objItemFac == "") {
                                            campoActual = "cmbNombreProducto";
                                            mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto facturado todavía no ha sido ingresado.</h5>");
                                            return false;
                                        }
                                    }
                                    $("#DEVCant").removeClass("hidden");
                                    campoActual = "txtCantDevolver";
                                    $("#txtCantDevolver").focus();
                                }
                            });

                            $("#modalModulo").bind("click");
                        }
                    } else {
                        mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No se encontraron productos en esta búsqueda.</h5>");
                        // $(".fa.fa-times").hide();
                        
                    }
                } else if (campoActual == "txtNombreProductoDevVencidos") {
                    if (listaPRD.listaProductos.length > 0) {
                        if (listaPRD.listaProductos.length == 1) {
                            $("#txtNombreProductoDevVencidos").val(listaPRD.listaProductos[0].pro_nombre);
                            objPRDDev = listaPRD.listaProductos[0];
                            modalModuloHide();
                            if ((objPRDDev.pro_codtpopro != 'M' && !objPRDDev.pro_ProductoRequiereLote) || objPRDDev.pro_AceptaVencidos == false) {
                                mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto que está intentando devolver es un producto FUERA DE CONVENIO DE VENCIDOS, por favor comuníquese con RECLAMOS.</h5>");
                                // $(".fa.fa-times").hide();
                                return false;
                            } else if (objPRDDev.pro_isCadenaFrio) {
                                mensaje_reclamos(objPRDDev.pro_nombre);
                                $("#modalModulo").unbind("click");
                                return false;
                            } else if (objPRDDev.isValePsicotropicos) {
                                mensaje_vale_psico(objPRDDev.pro_nombre);
                                $("#modalModulo").unbind("click");
                                return false;
                            } else if (objPRDDev.pro_isTrazable) {
                                setTimeout(function () {
                                    mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto que está devolviendo es un producto TRAZABLE, si usted ha CONFIRMADO la recepción del mismo, deberá trazar la devolución a la droguería como 'Envio de producto en carácter de devolución'.</h5>");
                                }, 100);
                                // $(".fa.fa-times").hide();
                                ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                                $("#txtNombreProductoDevVencidos").attr("disabled", "disabled");
                                $("#DEVCantVencidos").removeClass("hidden");
                                campoActual = "txtCantDevolver";
                                $("#txtCantDevolver").focus();
                            } else {
                                ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                                $("#txtNombreProductoDevVencidos").attr("disabled", "disabled");
                                $("#DEVCantVencidos").removeClass("hidden");
                                campoActual = "txtCantDevolverVencidos";
                                $("#txtCantDevolverVencidos").focus();
                            }
                        } else {
                            for (var i = 0; i < listaPRD.listaProductos.length; i++) {
                                html += "<li class='msjList' data-NroProd=" + i + ">" + listaPRD.listaProductos[i].pro_nombre + "</li>";
                            }
                            mensaje("Seleccione un producto", html);
                            // $(".fa.fa-times").hide();
                            //$("#modalModulo").unbind("click");
                            $(".msjList").click(function () {
                                var idItem = $(this).attr("data-nroprod");
                                $("#txtNombreProductoDevVencidos").val(listaPRD.listaProductos[idItem].pro_nombre);
                                objPRDDev = listaPRD.listaProductos[idItem];
                                modalModuloHide();
                                if ((objPRDDev.pro_codtpopro != 'M' && !objPRDDev.pro_ProductoRequiereLote) || objPRDDev.pro_AceptaVencidos == false) {
                                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto que está intentando devolver es un producto FUERA DE CONVENIO DE VENCIDOS, por favor comuníquese con RECLAMOS.</h5>");
                                    // $(".fa.fa-times").hide();
                                    return false;
                                } else if (objPRDDev.pro_isCadenaFrio) {
                                    mensaje_reclamos(objPRDDev.pro_nombre);
                                    $("#modalModulo").unbind("click");
                                    return false;
                                } else if (objPRDDev.isValePsicotropicos) {
                                    mensaje_vale_psico(objPRDDev.pro_nombre);
                                    $("#modalModulo").unbind("click");
                                    return false;
                                } else if (objPRDDev.pro_isTrazable) {
                                    setTimeout(function () {
                                        mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto que está devolviendo es un producto TRAZABLE, si usted ha CONFIRMADO la recepción del mismo, deberá trazar la devolución a la droguería como 'Envio de producto en carácter de devolución'.</h5>");
                                    }, 100);
                                    // $(".fa.fa-times").hide();
                                    ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                                    $("#txtNombreProductoDevVencidos").attr("disabled", "disabled");
                                    $("#DEVCantVencidos").removeClass("hidden");
                                    campoActual = "txtCantDevolverVencidos";
                                    $("#txtCantDevolverVencidos").focus();
                                } else {
                                    ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                                    $("#txtNombreProductoDevVencidos").attr("disabled", "disabled");
                                    $("#DEVCantVencidos").removeClass("hidden");
                                    campoActual = "txtCantDevolverVencidos";
                                    $("#txtCantDevolverVencidos").focus();
                                }
                            });

                            //$("#modalModulo").bind("click");
                        }
                    } else {
                        mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>No se encontraron productos en esta búsqueda.</h5>");
                        // $(".fa.fa-times").hide();

                    }
                } else {
                    if (listaPRD.listaProductos.length >= 1) {

                        for (var j = 0; j < listaPRD.listaProductos.length; j++) {
                            if (listaPRD.listaProductos[j].pro_nombre == objItemFac.Descripcion) {
                                objPRDFac = listaPRD.listaProductos[j];
                                objPRDDev = objPRDFac;
                                break;
                            }
                        }
                        if (objPRDDev.pro_isCadenaFrio) {
                            mensaje_reclamos(objPRDDev.pro_nombre);
                            $("#modalModulo").unbind("click");
                            return false;
                        } else if (objPRDDev.isValePsicotropicos) {
                            mensaje_vale_psico(objPRDDev.pro_nombre);
                            $("#modalModulo").unbind("click");
                            return false;
                        } else if (objPRDDev.pro_isTrazable) {
                            if (objPRDDev.pro_codtpopro == "P" && Motivo == 5) {
                                mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Los productos de PERFUMERÍA no aceptan devoluciones por 'CORTO VENCIMIENTO'.</h5>");
                                $("#modalModulo").unbind("click");
                                return false;
                            }
                            setTimeout(function () {
                                mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto que está devolviendo es un producto TRAZABLE, si usted ha CONFIRMADO la recepción del mismo, deberá trazar la devolución a la droguería como 'Envio de producto en carácter de devolución'.</h5>");
                            }, 100);
                            // $(".fa.fa-times").hide();
                            ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                            $("#cmbNombreProducto").attr("disabled", "disabled");
                            $("#DEVCant").removeClass("hidden");
                            campoActual = "txtCantDevolver";
                            $("#txtCantDevolver").focus();
                        } else {
                            if (objPRDDev.pro_codtpopro == "P" && NroMotivo == 5) {
                                mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> Información</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Los productos de PERFUMERÍA no aceptan devoluciones por <b>'CORTO VENCIMIENTO'</b>.</h5>");
                                //$("#modalModulo").unbind("click");
                                return false;
                            }
                            ItemDevolucion.dev_nombreproductodevolucion = objPRDDev.pro_nombre;
                            $("#cmbNombreProducto").attr("disabled", "disabled");
                            $("#DEVCant").removeClass("hidden");
                            campoActual = "txtCantDevolver";
                            $("#txtNumeroLote").val("");
                            $("#txtNumeroLoteVenc").val("");
                            $("#txtCantDevolver").focus();
                        }
                    } else {
                        mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto que está intentando devolver está discontinuado, por favor comuníquese con RECLAMOS.</h5>");
                        // $(".fa.fa-times").hide();
                        return false;
                    }
                }
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}

function RecuperarItemsDevolucionPrecargaPorCliente() {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/RecuperarItemsDevolucionPrecargaPorCliente",
        data: {  },
        success: function (response) {
            hideCargandoBuscador();
            
            var html = "";
            $("#tblDevolucion").html("");
            ItemsPrecargados = eval('(' + response + ')');
            //console.log(ItemsPrecargados);
            if (ItemsPrecargados.length > 0) {
                for (i = 0; i < ItemsPrecargados.length; i++) {
                    if (ItemsPrecargados[i].dev_fechavencimientoloteToString != null) {
                        var dtFechaVto = ItemsPrecargados[i].dev_fechavencimientoloteToString.split("/");
                        var FechaVto = dtFechaVto[1] + "/" + dtFechaVto[2];
                    } else {
                        var FechaVto = "";
                    }
                    if (ItemsPrecargados[i].dev_numerolote != null) {
                        var NLote = ItemsPrecargados[i].dev_numerolote;
                    } else {
                        var NLote = "";
                    }
                    if (ItemsPrecargados[i].dev_nombreproductofactura != null) {
                        var PRD = ItemsPrecargados[i].dev_nombreproductofactura;
                    } else {
                        var PRD = "";
                    }


                    html = "<tr>";
                        html += "<td>"+ItemsPrecargados[i].dev_numerofactura+"</td>";
                        html += "<td>" + PRD + "</td>";
                        html += "<td>" + ItemsPrecargados[i].dev_nombreproductodevolucion + "</td>";
                        html += "<td>" + colMotivos[parseInt(ItemsPrecargados[i].dev_motivo)] + "</td>";
                        html += "<td class='text-center'>" + ItemsPrecargados[i].dev_cantidad + "</td>";
                        html += "<td>" + NLote + "</td>";
                        html += "<td>" + FechaVto + "</td>";
                    html += "<td class=' text-center'><button onclick='EliminarItemsDevolucionPrecargado(" + ItemsPrecargados[i].dev_numeroitem + ")' type='button' class='btn btn-danger btnBorrarItem' data-id='" + ItemsPrecargados[i].dev_numeroitem + "' ><i class='fa fa-trash'></i></button ></td > ";
                    html += "</tr>";
                    $("#tblDevolucion").append(html);
                }

                $("#btnLimpiarPrecarga").click(function () {
                    LimpiarPrecarga();
                });
            } else {
                html = "<tr>";
                html += "<td colspan='8' class='text-center color_red'><p class='color_red'>No hay devoluciones precargadas</p></td>";
                html += "</tr>";
                $("#tblDevolucion").append(html);
            }
            $("#cmbMotivo").removeAttr("disabled");
            setTimeout(function () {
                $("#cmbMotivo").focus();
            });
        }
    });
}

function RecuperarItemsDevolucionPrecargaVencidosPorCliente() {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/RecuperarItemsDevolucionVencidosPrecargaPorCliente",
        data: {},
        success: function (response) {
            hideCargandoBuscador();

            var html = "";
            $("#tblDevolucionVencidos").html("");
            ItemsPrecargadosVencidos = eval('(' + response + ')');
            //console.log(ItemsPrecargadosVencidos);
            if (ItemsPrecargadosVencidos.length > 0) {
                for (i = 0; i < ItemsPrecargadosVencidos.length; i++) {
                    if (ItemsPrecargadosVencidos[i].dev_fechavencimientoloteToString != null) {
                        var dtFechaVto = ItemsPrecargadosVencidos[i].dev_fechavencimientoloteToString.split("/");
                        var FechaVto = dtFechaVto[1] + "/" + dtFechaVto[2];
                    } else {
                        var FechaVto = "";
                    }
                    if (ItemsPrecargadosVencidos[i].dev_numerolote != null) {
                        var NLote = ItemsPrecargadosVencidos[i].dev_numerolote;
                    } else {
                        var NLote = "";
                    }
                    
                    html = "<tr>";
                    html += "<td>" + ItemsPrecargadosVencidos[i].dev_nombreproductodevolucion + "</td>";
                    html += "<td class='text-center'>" + ItemsPrecargadosVencidos[i].dev_cantidad + "</td>";
                    html += "<td>" + NLote + "</td>";
                    html += "<td>" + FechaVto + "</td>";
                    html += "<td class=' text-center'><button onclick='EliminarItemsDevolucionPrecargado(" + ItemsPrecargadosVencidos[i].dev_numeroitem + ")' type='button' class='btn btn-danger btnBorrarItem' ><i class='fa fa-trash'></i></button ></td > ";
                    html += "</tr>";
                    $("#tblDevolucionVencidos").append(html);
                }

                $("#btnLimpiarPrecargaVencidos").click(function () {
                    LimpiarPrecargaVencidos();
                });


            } else {
                html = "<tr>";
                html += "<td colspan='8' class='text-center color_red'><p class='color_red'>No hay devoluciones precargadas</p></td>";
                html += "</tr>";
                $("#tblDevolucionVencidos").append(html);
            }
            $("#txtNombreProductoDevVencidos").removeAttr("disabled");
            setTimeout(function () {
                $("#txtNombreProductoDevVencidos").focus();
            });
        }
    });
}

function RecuperarItemsDevolucionPrecargaFacturaCompletaPorCliente() {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/RecuperarItemsDevolucionFacturaCompletaPrecargaPorCliente",
        data: {},
        success: function (response) {
            hideCargandoBuscador();

            var html = "";
            $("#tblDevolucionFC").html("");
            ItemsPrecargadosFC = eval('(' + response + ')');
            //console.log(ItemsPrecargadosVencidos);
            if (ItemsPrecargadosFC.length > 0) {
                $("#DetalleDev").html("<br><br>FAC: " + ItemsPrecargadosFC[0].dev_numerofactura + " - Motivo: " + colMotivos[ItemsPrecargadosFC[0].dev_motivo]);
                for (i = 0; i < ItemsPrecargadosFC.length; i++) {
                    
                    html = "<tr>";
                    html += "<td>" + ItemsPrecargadosFC[i].dev_nombreproductodevolucion + "</td>";
                    html += "<td class=' text-center'  width='200'>" + ItemsPrecargadosFC[i].dev_cantidad + "</td>";
                    html += "</tr>";
                    $("#tblDevolucionFC").append(html);
                }

                $("#btnLimpiarPrecargaFC").click(function () {
                    LimpiarPrecargaFacturaCompleta();
                });
                $("#DEVMotivoFC").addClass("hidden");
                $("#DEVTipoComprobanteFC").addClass("hidden");
                $("#DEVNroComprobanteFC").addClass("hidden");
                $("#DEVCartelFC").addClass("hidden");
                $("#DEVAgregarFC").addClass("hidden");
                $("#btnAgregarDevFC").attr("disabled", "disabled");
                $("#cmbMotivoFC").attr("disabled", "disabled");
                
            } else {
                $("#DetalleDev").html("");
                html = "<tr>";
                html += "<td colspan='4' class='text-center color_red'><p class='color_red'>No hay devoluciones precargadas</p></td>";
                html += "</tr>";
                $("#tblDevolucionFC").append(html);
                $("#DEVMotivoFC").removeClass("hidden");
                $("#cmbMotivoFC").removeAttr("disabled");
                setTimeout(function () {
                    $("#cmbMotivoFC").focus();
                });
            }
        }
    });
}

function RecuperarItemsReclamoFacturadoNoEnviado() {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/RecuperarItemsReclamoFacturadoNoEnviado",
        data: {},
        success: function (response) {
            hideCargandoBuscador();

            var html = "";
            $("#tblReclamoFNE").html("");
            //console.log(ItemsPrecargadosVencidos);
            ItemsPrecargadosFNE = eval('(' + response + ')');

            if (ItemsPrecargadosFNE.length > 0) {
                for (i = 0; i < ItemsPrecargadosFNE.length; i++) {
                    html = "<tr>";
                    html += "<td>" + ItemsPrecargadosFNE[i].dev_numerofactura + "</td>";
                    html += "<td>" + ItemsPrecargadosFNE[i].dev_nombreproductodevolucion + "</td>";
                    html += "<td class='text-center'>" + ItemsPrecargadosFNE[i].dev_cantidad + "</td>";
                    html += "<td class=' text-center'><button onclick='ElimminarItemReclamoFNEPrecarga(" + ItemsPrecargadosFNE[i].dev_numeroitem + ")' type='button' class='btn btn-danger btnBorrarItem' data-id='" + ItemsPrecargadosFNE[i].dev_numeroitem + "' ><i class='fa fa-trash'></i></button ></td > ";
                    html += "</tr>";
                    $("#tblReclamoFNE").append(html);
                }

                $("#btnLimpiarPrecargaFNE").click(function () {
                    LimpiarPrecargaReclamoFNE();
                });
            } else {
                html = "<tr>";
                html += "<td colspan='4' class='text-center color_red'><p class='color_red'>No hay reclamos precargados</p></td>";
                html += "</tr>";
                $("#tblReclamoFNE").append(html);
            }
            $("#txtNroComprobanteFNE").removeAttr("disabled");
            setTimeout(function () {
                $("#txtNroComprobanteFNE").focus();
            });
        }
    });
}

function EliminarItemsDevolucionPrecargado(NumeroItem) {
    $.ajax({
        type: "POST",
        url: "/devoluciones/EliminarDevolucionItemPrecarga",
        data: { NumeroItem },
        success: function (response) {
            RecuperarItemsDevolucionPrecargaPorCliente();
            RecuperarItemsDevolucionPrecargaVencidosPorCliente();
        },
        failure: function (response) {
            //console.log("failure");
            //console.log(response);
        },
        error: function (response) {
            //console.log("error");
            //console.log(response);
            RecuperarItemsDevolucionPrecargaPorCliente();
            RecuperarItemsDevolucionPrecargaVencidosPorCliente();
        }
    });
}

function ElimminarItemReclamoFNEPrecarga(NumeroItem) {
    $.ajax({
        type: "POST",
        url: "/devoluciones/ElimminarItemReclamoFNEPrecarga",
        data: { NumeroItem },
        success: function (response) {
            RecuperarItemsReclamoFacturadoNoEnviado();
        },
        failure: function (response) {
            //console.log("failure");
            //console.log(response);
        },
        error: function (response) {
            //console.log("error");
            //console.log(response);
            RecuperarItemsReclamoFacturadoNoEnviado();
        }
    });
}

function RecuperarDevolucionesPorCliente() {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/RecuperarDevolucionesPorCliente",
        data: {},
        success: function (response) {
            hideCargandoBuscador();

            var html = "";
            $("#tblDevoluciones").html("");
            //console.log(response);
            Devoluciones = eval('(' + response + ')');
            //console.log(Devoluciones.sort(Devoluciones.dev_estado, -1));
            //desplegarDevoluciones(Devoluciones);
            
            if ($("#btn-consultar").length > 0) {
                reiniciarOrden();
            }
        }
    });
}

function RecuperarReclamosFNEPorCliente() {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/ObtenerReclamosFacturadoNoEnviadoPorCliente",
        data: {},
        success: function (response) {
            hideCargandoBuscador();

            var html = "";
            $("#tblDevoluciones").html("");
            //console.log(response);
            if (response.length > 0) {
                Devoluciones = eval('(' + response + ')');
                //console.log(Devoluciones.sort(Devoluciones.dev_estado, -1));
                //desplegarDevoluciones(Devoluciones);

                if ($("#btn-consultar").length > 0) {
                    reiniciarOrden();
                }
            }
        }
    });
}

function desplegarDevoluciones(cDevs) {
    $("#tblDevoluciones").html('');

    if (cDevs.length > 0) {
        for (i = 0; i < cDevs.length; i++) {
            var Estado = null;
            switch (cDevs[i].dev_estado) {
                case "PA":
                    Estado = "<span class='label label-primary'>PENDIENTE</span>";
                    break;
                case "EP":
                    Estado = "<span class='label label-warning'>EN PROCESO</span>";
                    break;
                case "RE":
                    Estado = "<span class='label label-success'>RESUELTA</span>";
                    break;
                case "RZ":
                    Estado = "<span class='label label-success'>RESUELTA</span>";
                    break;
            }

            ColorRed = "";

            if (cDevs[i].dev_cantidadrechazada > 0) {
                ColorRed = "class='color_red'";
            }

            html = "<tr>";
            html += "<td><a href='/devoluciones/NotaDevolucion?nrodev=" + cDevs[i].dev_numerosolicituddevolucion + "'>" + cDevs[i].dev_numerosolicituddevolucion + "</a ></td>";
            html += "<td>" + cDevs[i].dev_fechaToString + "</td>";
            html += "<td>" + cDevs[i].dev_cantidad + "</td>";
            html += "<td>" + cDevs[i].dev_cantidadrecibida + "</td>";
            html += "<td " + ColorRed + ">" + cDevs[i].dev_cantidadrechazada + "</td>";
            html += "<td>" + Estado + "</td>";
            html += "<td class=' text-center'><a href='/devoluciones/NotaDevolucion?nrodev=" + cDevs[i].dev_numerosolicituddevolucion + "' class='btn btn-sm btn-primary btnBorrarItem' >Ver Detalle</a ></td > ";
            html += "</tr>";
            $("#tblDevoluciones").append(html);
        }
    } else {
        html = "<tr>";
        html += "<td colspan='7' class='text-center color_red'><p class='color_red'>No hay devoluciones para mostrar.</p></td>";
        html += "</tr>";
        $("#tblDevoluciones").append(html);
    }
};

function desplegarDevolucionesFNE(cDevs) {
    $("#tblDevoluciones").html('');

    if (cDevs.length > 0) {
        for (i = 0; i < cDevs.length; i++) {
            var Estado = null;
            switch (cDevs[i].dev_estado) {
                case "PA":
                    Estado = "<span class='label label-primary'>PENDIENTE</span>";
                    break;
                case "EP":
                    Estado = "<span class='label label-warning'>EN PROCESO</span>";
                    break;
                case "RE":
                    Estado = "<span class='label label-success'>RESUELTA</span>";
                    break;
                case "RZ":
                    Estado = "<span class='label label-danger'>RECHAZADA</span>";
                    break;
            }

            Observaciones = "";
            if (cDevs[i].dev_estado == "EP" && cDevs[i].dev_numerosolicitudNC == null) {
                Observaciones += "Analizando reclamo...";
            }
            if (cDevs[i].dev_numerosolicitudNC != null) {
                if ($.isNumeric(cDevs[i].dev_numerosolicitudNC)) {
                    if (cDevs[i].dev_cantidad == cDevs[i].dev_cantidadrechazada) {
                        Estado = "<span class='label label-danger'>RECHAZADA</span>";
                        Observaciones += "<b>Solicitud N°</b>: " + cDevs[i].dev_numerosolicitudNC + " <span style='color:#e74c3c!important;'>RECHAZADA</span><br>";
                    } else {
                        Estado = "<span class='label label-warning'>EN PROCESO</span>";
                        Observaciones += "<b>Solicitud N°</b>: " + cDevs[i].dev_numerosolicitudNC + "<br>";
                    }
                } else {
                    Estado = "<span class='label label-success'>RESUELTA</span>";
                    Observaciones += "<b>NCR N°</b>: <a href='/ctacte/Documento?t=NCR&id=" + cDevs[i].dev_numerosolicitudNC + "' data-toggle='tooltip' data-placement='bottom' title='Ver Nota de Crédito' data-original-title='Ver Nota de Crédito'>" + cDevs[i].dev_numerosolicitudNC + "</a><br>";

                }
            }

            if (cDevs[i].dev_mensaje != null) {
                if (Observaciones != "") {
                    Observaciones += "<br>" + cDevs[i].dev_mensaje;
                } else {
                    Observaciones += cDevs[i].dev_mensaje;
                }
            }

            ColorRed = "";

            if (cDevs[i].dev_cantidadrechazada > 0) {
                ColorRed = "class='color_red'";
            }

            html = "<tr>";
            html += "<td>" + cDevs[i].dev_numerosolicituddevolucion + "</a ></td>";
            html += "<td>" + cDevs[i].dev_numerofactura + "</a ></td>";
            html += "<td>" + cDevs[i].dev_fechaToString + "</td>";
            html += "<td>" + cDevs[i].dev_nombreproductodevolucion + "</td>";
            html += "<td style='text-align: center;'>" + cDevs[i].dev_cantidad + "</td>";
            html += "<td style='text-align: center;'>" + cDevs[i].dev_cantidadrecibida + "</td>";
            html += "<td " + ColorRed + " style='text-align: center;'>" + cDevs[i].dev_cantidadrechazada + "</td>";
            html += "<td>" + Estado + "</td>";
            html += "<td>" + Observaciones + "</td>";
            html += "</tr>";
            $("#tblDevoluciones").append(html);
        }
    } else {
        html = "<tr>";
        html += "<td colspan='9' class='text-center color_red'><p class='color_red'>No hay devoluciones para mostrar.</p></td>";
        html += "</tr>";
        $("#tblDevoluciones").append(html);
    }
};

function reiniciarOrden() {
    $('#OrdFecha').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
    $('#OrdEst').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
    $('#OrdSol').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
    $('#OrdPrd').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
    $('#OrdFac').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
    Devoluciones = Devoluciones.sort((a, b) => (a.dev_numerosolicituddevolucion > b.dev_numerosolicituddevolucion) ? 1 : -1);
    filtrarPor();
}

function ordenarPor(col) {
    var dev = Devoluciones;

    if (col == 0) {
        OrdenEstado = false;
        OrdenFecha = false;
        OrdenNombre = false;
        OrdenFactura = false;
        $('#OrdFecha').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdEst').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdPrd').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdFac').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        if (OrdenNro) {
            dev = dev.sort((a, b) => (a.dev_numerosolicituddevolucion > b.dev_numerosolicituddevolucion) ? -1 : 1);
            $('#OrdSol').removeClass('fa-sort').removeClass('fa-sort-asc').addClass('fa-sort-desc');
        } else {
            dev = dev.sort((a, b) => (a.dev_numerosolicituddevolucion > b.dev_numerosolicituddevolucion) ? 1 : -1);
            $('#OrdSol').removeClass('fa-sort-desc').addClass('fa-sort-asc');
        }
        OrdenNro = !OrdenNro;
    } else if (col == 1) {
        OrdenEstado = false;
        OrdenNro = false;
        OrdenNombre = false;
        OrdenFactura = false;
        $('#OrdSol').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdEst').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdPrd').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdFac').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        if (OrdenFecha) {
            dev = dev.sort((a, b) => (a.dev_fecha > b.dev_fecha) ? -1 : 1);
            $('#OrdFecha').removeClass('fa-sort').removeClass('fa-sort-asc').addClass('fa-sort-desc');
        } else {
            dev = dev.sort((a, b) => (a.dev_fecha > b.dev_fecha) ? 1 : -1);
            $('#OrdFecha').removeClass('fa-sort-desc').addClass('fa-sort-asc');
        }
        OrdenFecha = !OrdenFecha;
    } else if (col == 2) {
        OrdenEstado = false;
        OrdenNro = false;
        OrdenFecha = false;
        OrdenFactura = false;
        $('#OrdFecha').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdSol').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdEst').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdFac').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        if (OrdenNombre) {
            dev = dev.sort((a, b) => (a.dev_nombreproductodevolucion > b.dev_nombreproductodevolucion) ? -1 : 1);
            $('#OrdPrd').removeClass('fa-sort').removeClass('fa-sort-asc').addClass('fa-sort-desc');
        } else {
            dev = dev.sort((a, b) => (a.dev_nombreproductodevolucion > b.dev_nombreproductodevolucion) ? 1 : -1);
            $('#OrdPrd').removeClass('fa-sort-desc').addClass('fa-sort-asc');
        }
        OrdenNombre = !OrdenNombre;
    } else if (col == 3) {
        OrdenEstado = false;
        OrdenNro = false;
        OrdenFecha = false;
        OrdenNombre = false;
        $('#OrdFecha').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdSol').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdEst').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdPrd').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        if (OrdenFactura) {
            dev = dev.sort((a, b) => (a.dev_numerofactura > b.dev_numerofactura) ? -1 : 1);
            $('#OrdFac').removeClass('fa-sort').removeClass('fa-sort-asc').addClass('fa-sort-desc');
        } else {
            dev = dev.sort((a, b) => (a.dev_numerofactura > b.dev_numerofactura) ? 1 : -1);
            $('#OrdFac').removeClass('fa-sort-desc').addClass('fa-sort-asc');
        }
        OrdenFactura = !OrdenFactura;
    } else if (col == 5) {
        OrdenFecha = false;
        OrdenNro = false;
        OrdenNombre = false;
        OrdenFactura = false;
        $('#OrdSol').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdFecha').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdPrd').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        $('#OrdFac').removeClass('fa-sort-desc').removeClass('fa-sort-asc').removeClass('fa-sort').addClass('fa-sort');
        if (OrdenEstado) {
            dev = dev.sort((a, b) => (a.dev_estado > b.dev_estado) ? -1 : 1);
            $('#OrdEst').removeClass('fa-sort').removeClass('fa-sort-asc').addClass('fa-sort-desc');
        } else {
            dev = dev.sort((a, b) => (a.dev_estado > b.dev_estado) ? 1 : -1);
            $('#OrdEst').removeClass('fa-sort-desc').addClass('fa-sort-asc');
        }
        OrdenEstado = !OrdenEstado;
    }
    filtrarPor();
}

function filtrarPor() {

    var aFechas = $('#dtpEntreFechas').val().split('-'), detDesde = aFechas[0].split('/'), detHasta = aFechas[1].split('/'),
        fechaDesde = new Date(`${detDesde[2].trim()}/${detDesde[1].trim()}/${detDesde[0].trim()}`),
        fechaHasta = new Date(`${detHasta[2].trim()}/${detHasta[1].trim()}/${detHasta[0].trim()}`),
        estado = $("#cmbEstados").val(), rechazos = $("#cmbRechazos").val(), nroDevFiltro = $("#txtNroDev").val().trim(),
        chkFechas = $("#chkFechas:checked").length, chkEstados = $("#chkEstados:checked").length,
        chkRechazos = $("#chkRechazos:checked").length, chkNroDev = $("#chkNroDev:checked").length;

    var dev = Devoluciones;

    if (chkFechas) {
        dev = dev.filter(devo => {
            var aFtoString = devo.dev_fechaToString.split('/'),
                fechaFac = new Date(`${aFtoString[2].trim()}/${aFtoString[1].trim()}/${aFtoString[0].trim()}`);
            if (fechaFac <= fechaHasta && fechaFac >= fechaDesde) {
                return devo;
            }
        });
    }

    if ( chkEstados && estado != "TODAS" ) {
        dev = dev.filter(devo => {
            if (devo.dev_estado === estado) {
                return devo;
            }
        });
    }

    if ( chkRechazos && rechazos != "TODAS" ) {
        dev = dev.filter(devo => {
            if (rechazos === "SI") {
                if (devo.dev_cantidadrechazada > 0) {
                    return devo;
                }
            } else {
                if (devo.dev_cantidadrechazada == 0) {
                    return devo;
                }
            }
        });
    }

    if (chkNroDev && nroDevFiltro != "") {
        dev = dev.filter(devo => devo.dev_numerosolicituddevolucion.slice(-nroDevFiltro.length) === nroDevFiltro);
    }

    $("#divPanelDevoluciones").fadeOut('faster')
    setTimeout(function () {
        if (tipoDev == 'DEV') {
            if (chkFechas || chkEstados || chkRechazos || chkNroDev) {
                desplegarDevoluciones(dev);
            } else {
                $("#tblDevoluciones").html('');
                html = "<tr>";
                html += "<td colspan='7' class='text-center color_red'><p class='color_red'>Por favor, seleccione los campos para filtrar las devoluciones</p></td>";
                html += "</tr>";
                $("#tblDevoluciones").append(html);
            }
            $("#divPanelDevoluciones").fadeIn('faster');
        } else {
            if (chkFechas || chkEstados || chkRechazos || chkNroDev) {
                desplegarDevolucionesFNE(dev);
            } else {
                $("#tblDevoluciones").html('');
                html = "<tr>";
                html += "<td colspan='9' class='text-center color_red'><p class='color_red'>Por favor, seleccione los campos para filtrar las devoluciones</p></td>";
                html += "</tr>";
                $("#tblDevoluciones").append(html);
            }
            $("#divPanelDevoluciones").fadeIn('faster');
        }
    }, 650);

}

function ObtenerItemsDevolucionPorNumero(NumeroDevolucion) {
    showCargandoBuscador();
    $(".buttonontop").click();
    $.ajax({
        type: "POST",
        url: "/devoluciones/RecuperarDevolucionesPorClientePorNumero",
        data: { NumeroDevolucion },
        success: function (response) {
            hideCargandoBuscador();
            var SucCli = $("#txtIdSucursalCliente").val().trim();
            var html = "";
            ItemsDev = eval('(' + response + ')');
            //console.log(ItemsDev);

            if (ItemsDev.length > 0) {
                //html = "<a href='/devoluciones/Devoluciones' class='btn_volver'> <i class='fa fa-play'></i> VOLVER </a>";
                
                var FC = false;

                html += "<div class='clear15'></div>"
                html += '<table class="table table-striped tablaDevoluciones">';
                html += '<thead>';
                html += '<tr>';
                html += '<th>Factura</th>';
                html += '<th>Producto devuelto</th>';
                html += '<th>Producto facturado</th>';
                html += '<th>Motivo</th>';
                html += '<th class="text-center">Devueltas</th>';
                html += '<th class="text-center">Recibidas</th>';
                html += '<th class="text-center">Rechazadas</th>';
                html += '<th>Lote</th>';
                html += '<th>Vencimiento</th>';
                html += '<th>Estado</th>';
                html += '<th>Observaciones</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody id="tblItemDev">';

                for (i = 0; i < ItemsDev.length; i++) {
                    if (ItemsDev[i].dev_cantidad > 0) {
                        if (ItemsDev[i].dev_fechavencimientoloteToString != null) {
                            var dtFechaVto = ItemsDev[i].dev_fechavencimientoloteToString.split("/");
                            if (dtFechaVto[2] != 1899) {
                                var FechaVto = dtFechaVto[1] + "/" + dtFechaVto[2];
                            } else {
                                var FechaVto = "";
                            }
                        } else {
                            var FechaVto = "";
                        }

                        if (ItemsDev[i].dev_numerolote != null) {
                            var NLote = ItemsDev[i].dev_numerolote;
                        } else {
                            var NLote = "";
                        }

                        var NroFact = ItemsDev[i].dev_numerofactura;

                        if (ItemsDev[i].dev_nombreproductofactura != null) {
                            if (ItemsDev[i].dev_nombreproductofactura != 'F.Completa') {
                                var PRD = ItemsDev[i].dev_nombreproductofactura;
                            } else {
                                if (!FC) {
                                    var PRD = 'Factura Completa';
                                    NroFact = ItemsDev[i].dev_numerofactura;
                                    FC = true;
                                } else {
                                    var PRD = '';
                                    NroFact = '';
                                }
                            }
                        } else {
                            var PRD = "";
                        }
                        Estado = ""
                        if (ItemsDev[i].dev_cantidad == ItemsDev[i].dev_cantidadrechazada) {
                            if (ItemsDev[i].dev_cantidad != 0) {
                                Estado = "<span class='label label-danger'>RECHAZADA</span>";
                            } else {
                                Estado = "<span class='label label-success'>RESUELTA</span>";
                            }
                        } else if (ItemsDev[i].dev_cantidad == (ItemsDev[i].dev_cantidadrecibida + ItemsDev[i].dev_cantidadrechazada)) {
                            Estado = "<span class='label label-success'>RESUELTA</span>";
                        } else if (ItemsDev[i].dev_cantidadrecibida > 0 || ItemsDev[i].dev_cantidadrechazada > 0) {
                            Estado = "<span class='label label-warning'>EN PROCESO</span>";
                        } else {
                            Estado = "<span class='label label-primary'>PENDIENTE</span>";
                        }

                        Observaciones = "";
                        //console.log(ItemsDev[i]);
                        if (SucCli != ItemsDev[i].dev_idsucursal) {
                            switch (ItemsDev[i].dev_idsucursal) {
                                case 'CC':
                                    Observaciones += 'En CASA CENTRAL<br>';
                                    break;
                                case 'CB':
                                    Observaciones += 'En SUCURSAL CÓRDOBA<br>';
                                    break;
                                case 'CD':
                                    Observaciones += 'En SUCURSAL CONCORDIA<br>';
                                    break;
                                case 'CO':
                                    Observaciones += 'En SUCURSAL CONCEPCIÓN<br>';
                                    break;
                                case 'SF':
                                    Observaciones += 'En SUCURSAL SANTA FE<br>';
                                    break;
                                case 'SN':
                                    Observaciones += 'En SUCURSAL SAN NICOLÁS<br>';
                                    break;
                                case 'VM':
                                    Observaciones += 'En SUCURSAL VILLA MARÍA<br>';
                                    break;
                                case 'VH':
                                    Observaciones += 'En SUCURSAL ROSARIO<br>';
                                    break;
                                case 'RC':
                                    Observaciones += 'En SUCURSAL RÍO CUARTO<br>';
                                    break;
                                case 'DM':
                                    Observaciones += 'En SUCURSAL DISPOSITIVOS MÉDICOS<br>';
                                    break;
                                case 'CH':
                                    Observaciones += 'En SUCURSAL CHAÑAR LADEADO<br>';
                                    break;
                            }
                        }
                        if (ItemsDev[i].dev_numerosolicitudNC != null) {
                            if ($.isNumeric(ItemsDev[i].dev_numerosolicitudNC)) {
                                if (ItemsDev[i].dev_cantidad == ItemsDev[i].dev_cantidadrechazada) {
                                    Estado = "<span class='label label-danger'>RECHAZADA</span>";
                                    Observaciones += "<b>Solicitud N°</b>: " + ItemsDev[i].dev_numerosolicitudNC + " <span style='color:#e74c3c!important;'>RECHAZADA</span><br>";
                                } else {
                                    Estado = "<span class='label label-warning'>EN PROCESO</span>";
                                    Observaciones += "<b>Solicitud N°</b>: " + ItemsDev[i].dev_numerosolicitudNC + "<br>";
                                }
                            } else {
                                Estado = "<span class='label label-success'>RESUELTA</span>";
                                Observaciones += "<b>NCR N°</b>: <a href='/ctacte/Documento?t=NCR&id=" + ItemsDev[i].dev_numerosolicitudNC + "' data-toggle='tooltip' data-placement='bottom' title='Ver Nota de Crédito' data-original-title='Ver Nota de Crédito'>" + ItemsDev[i].dev_numerosolicitudNC + "</a><br>";

                            }
                        }

                        if (ItemsDev[i].dev_mensaje != null) {
                            if (Observaciones != "") {
                                Observaciones += "<br>" + ItemsDev[i].dev_mensaje;
                            } else {
                                Observaciones += ItemsDev[i].dev_mensaje;
                            }
                        }

                        ColorRed = "";

                        if (ItemsDev[i].dev_cantidadrechazada > 0) {
                            ColorRed = " color_red";
                        }

                        html += "<tr>";
                        html += "<td>" + NroFact + "</td>";
                        html += "<td>" + ItemsDev[i].dev_nombreproductodevolucion + "</td>";
                        html += "<td>" + PRD + "</td>";
                        html += "<td>" + colMotivos[parseInt((ItemsDev[i].dev_motivo) + 1)] + "</td>";
                        html += "<td class='text-center'>" + ItemsDev[i].dev_cantidad + "</td>";
                        html += "<td class='text-center'>" + ItemsDev[i].dev_cantidadrecibida + "</td>";
                        html += "<td class='text-center " + ColorRed + "'>" + ItemsDev[i].dev_cantidadrechazada + "</td>";
                        html += "<td>" + NLote + "</td>";
                        html += "<td>" + FechaVto + "</td>";
                        html += "<td>" + Estado + "</td>";
                        html += "<td>" + Observaciones + "</td>";
                        html += "</tr>";
                    }
                }
                html += '</tbody>';
                html += '</table>';
                
                $("#divPanelDevoluciones").html(html);

            } else {
                html = "<tr>";
                html += "<td colspan='8' class='text-center color_red'><p class='color_red'>No hay devoluciones precargadas</p></td>";
                html += "</tr>";
                mensaje("Detalle Solicitud de Devolución", html);
            }
        }
    });
}

function LimpiarPrecarga() {
    NumeroCliente = $("#txtNroCliente").val().trim();
    $.ajax({
        type: "POST",
        url: "/devoluciones/EliminarPrecargaDevolucionPorCliente",
        data: {
            NumeroCliente
        },
        success: function (response) {
            RecuperarItemsDevolucionPrecargaPorCliente();
        }
    });
}

function LimpiarPrecargaVencidos() {
    NumeroCliente = $("#txtNroCliente").val().trim();
    $.ajax({
        type: "POST",
        url: "/devoluciones/EliminarPrecargaDevolucionVencidosPorCliente",
        data: {
            NumeroCliente
        },
        success: function (response) {
            RecuperarItemsDevolucionPrecargaVencidosPorCliente();
        }
    });
}

function LimpiarPrecargaFacturaCompleta() {
    NumeroCliente = $("#txtNroCliente").val().trim();
    $.ajax({
        type: "POST",
        url: "/devoluciones/EliminarPrecargaDevolucionFacturaCompletaPorCliente",
        data: {
            NumeroCliente
        },
        success: function (response) {
            RecuperarItemsDevolucionPrecargaFacturaCompletaPorCliente();
        }
    });
}

function LimpiarPrecargaReclamoFNE() {
    NumeroCliente = $("#txtNroCliente").val().trim();
    $.ajax({
        type: "POST",
        url: "/devoluciones/EliminarPrecargaReclamoFNEPorCliente",
        data: {
            NumeroCliente
        },
        success: function (response) {
            RecuperarItemsReclamoFacturadoNoEnviado();
        }
    });
}

function ObtenerCantidadPendiente(NombreProducto, NumeroFactura, CantFact, CantADev) {
    $.ajax({
        type: "POST",
        url: "/devoluciones/ObtenerCantidadSolicitadaDevolucionPorProductoFacturaYCliente",
        data: {
            NombreProducto,
            NumeroFactura
        },
        success: function (response) {
            //console.log(response);
            var CantPrecargada = 0, CantPrecargadaFNE = 0;
            var msjCantMax = "";
            for (var i = 0; i < ItemsPrecargados.length; i++) {
                if (ItemsPrecargados[i].dev_nombreproductofactura == NombreProducto && ItemsPrecargados[i].dev_numerofactura == NumeroFactura) {
                    CantPrecargada = ItemsPrecargados[i].dev_cantidad;
                }
            }
            for (var i = 0; i < ItemsPrecargadosFNE.length; i++) {
                if (ItemsPrecargadosFNE[i].dev_nombreproductodevolucion == NombreProducto && ItemsPrecargadosFNE[i].dev_numerofactura == NumeroFactura) {
                    CantPrecargadaFNE = ItemsPrecargadosFNE[i].dev_cantidad;
                }
            }

            if ((parseInt(CantFact) - parseInt(response) - parseInt(CantPrecargada) - parseInt(CantPrecargadaFNE)) < parseInt(CantADev)) {
                if (NroMotivo == 1) {
                    var CantRestante = (CantFact - response - CantPrecargada - CantPrecargadaFNE);

                    var msj = "<h5 style='text-align: center; line - height: 1.5em; font - weight: 300; font - size: 16px;'>La factura " + NumeroFactura + " tiene " + CantFact;
                    if (CantFact == 1) {
                        msj += " unidad facturada";
                    } else {
                        msj += " unidades facturadas";
                    }

                    if (response > 0) {
                        if (CantPrecargada > 0 || CantPrecargadaFNE > 0) {
                            msj += ", ";
                        } else {
                            msj += " y ";
                        }
                        if (response == 1) {
                            msj += response + " unidad con solicitud de devolución / de Nota de Crédito";
                        } else {
                            msj += response + " unidades con solicitud de devolución / de Nota de Crédito";
                        }
                    }

                    if (CantPrecargadaFNE > 0) {
                        if (CantPrecargada > 0) {
                            msj += ", ";
                        } else {
                            msj += " y ";
                        }
                        if (CantPrecargadaFNE == 1) {
                            msj += CantPrecargadaFNE + " unidad con Reclamo de Facturado No Enviado";
                        } else {
                            msj += CantPrecargadaFNE + " unidades con Reclamo de Facturado No Enviado";
                        }
                    }

                    if (CantPrecargada > 0) {
                        if (CantPrecargada == 1) {
                            msj += " y " + CantPrecargada + " unidad precargada para devolución";
                        } else {
                            msj += " y " + CantPrecargada + " unidades precargadas para devolución";
                        }
                    }

                    msj += " del producto " + NombreProducto + " y usted está devolviendo " + CantADev + ".<br>";

                    if (CantRestante > 0) {
                        if (CantRestante == 1) {
                            msj += "Sólo se generará Nota de Crédito por la " + CantRestante + " unidad restante.</h5>";
                        } else {
                            msj += "Sólo se generará Nota de Crédito por las " + CantRestante + " unidades restantes.</h5>";
                        }
                    } else {
                        msj += "No se generará Nota de Crédito puesto que la cantidad restante es 0";
                    }

                    mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> INFORMACIÓN</span>", msj );
                    //$(".fa.fa-times").click();
                    //return false;
                } else if (parseInt(response) > 0 || parseInt(CantPrecargada) > 0 || parseInt(CantPrecargadaFNE)) {
                    var CantRestante = (CantFact - response - CantPrecargada - CantPrecargadaFNE);
                    var uResp = " unidad ",uDev = " unidad ",uFNE = " unidad ", texto = "" ;
                    msjCantMax = "El máximo de unidades que resta devolver / reclamar es de " + CantRestante;
                    if (CantRestante < 0) {
                        CantRestante = 0;
                    }
                    if (CantRestante == 0) {
                        msjCantMax = "No quedan unidades por devolver / reclamar";
                    }

                    if (response > 1) {
                        uResp = " unidades ";
                    }
                    if (CantPrecargada > 1) {
                        uDev = " unidades ";
                    }
                    if (CantPrecargadaFNE > 1) {
                        uFNE = " unidades ";
                    }

                    texto = "El producto " + NombreProducto + " de la factura " + NumeroFactura + " ya tiene ";

                    if (response > 0) {
                        texto += "solicitudes de devolución por " + response + uResp;
                        if (CantPrecargada > 0 && CantPrecargadaFNE > 0) {
                            texto += ", ";
                        } else if (CantPrecargada > 0 || CantPrecargadaFNE > 0) {
                            texto += " y ";
                        }
                    }
                    if (CantPrecargada > 0) {
                        texto += "una precarga por Devolución por Reclamo por " + CantPrecargada + uDev;
                        if (CantPrecargadaFNE > 0) {
                            texto += " y ";
                        }
                    }

                    if (CantPrecargadaFNE > 0) {
                        texto += "una precarga por Reclamo de Facturado No Enviado por " + CantPrecargadaFNE + uFNE;
                    }

                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>" + texto + ".<br>" + msjCantMax + ".<br>Por favor, comuníquese con RECLAMOS.</h5>");
                    // $(".fa.fa-times").hide();
                    return false;
                } else if (parseInt(response) > 0 && parseInt(CantPrecargada) > 0) {
                    var CantRestante = (CantFact - response - CantPrecargada);
                    msjCantMax = "El máximo de unidades que resta devolver es de " + CantRestante;
                    if (CantRestante < 0) {
                        CantRestante = 0;
                    }
                    if (CantRestante == 0) {
                        msjCantMax = "No quedan unidades por devolver";
                    }
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto " + NombreProducto + " de la factura " + NumeroFactura + " ya posee solicitudes de devolución por " + response + " unidades y además ya precargó " + CantPrecargada + " unidades.<br>" + msjCantMax + ".<br>Por favor, comuníquese con RECLAMOS.</h5>");
                    // $(".fa.fa-times").hide();
                    return false;
                } else if (parseInt(response) > 0) {
                    var CantRestante = (CantFact - response);
                    msjCantMax = "El máximo de unidades que resta devolver / reclamar es de " + CantRestante;
                    if (CantRestante < 0) {
                        CantRestante = 0;
                    }
                    if (CantRestante == 0) {
                        msjCantMax = "No quedan unidades por devolver / reclamar";
                    }
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto " + NombreProducto + " de la factura " + NumeroFactura + " ya posee solicitudes de devolución por " + response + " unidades.<br>" + msjCantMax + ".<br>Por favor, comuníquese con RECLAMOS.</h5>");
                    // $(".fa.fa-times").hide();
                    return false;
                } else if (parseInt(CantPrecargada) > 0) {
                    var CantRestante = (CantFact - CantPrecargada);
                    msjCantMax = "El máximo de unidades que resta devolver / reclamar es de " + CantRestante;
                    if (CantRestante < 0) {
                        CantRestante = 0;
                    }
                    if (CantRestante == 0) {
                        msjCantMax = "No quedan unidades por devolver / reclamar";
                    }
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>El producto " + NombreProducto + " de la factura " + NumeroFactura + " ya tiene una precarga por " + CantPrecargada + " unidades.<br>" + msjCantMax + ".</h5>");
                    // $(".fa.fa-times").hide();
                    return false;
                } else {
                    mensaje("<span style='color: red !important;'><i class='fa fa-times-circle fa-2x'></i> ERROR</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>La cantidad a devolver no puede ser mayor a la facturada.</h5>");
                    // $(".fa.fa-times").hide();
                    return false;
                }
            }
            if (campoActual == "txtCantDevolver") {
                ItemDevolucion.dev_cantidad = CantADev;
                $("#txtCantDevolver").attr("disabled", "disabled");
                console.log(objPRDDev);
                if (objPRDDev.pro_codtpopro != 'M' && !objPRDDev.pro_ProductoRequiereLote) {
                    campoActual = "btnAgregarDev";
                    $("#DEVAgregar").removeClass("hidden");
                    $("#btnAgregarDev").removeAttr("disabled", "disabled");
                    $("#btnAgregarDev").focus();
                    return false;
                }
                $("#DEVLote").removeClass("hidden");
                campoActual = "txtNumeroLote";
                $("#txtNumeroLote").focus();
            } else {
                ItemDevolucion.dev_cantidad = CantADev;
                $("#txtCantDevolverFNE").attr("disabled", "disabled");
                //console.log(objPRDDev);
                campoActual = "btnAgregarDevFNE";
                $("#DEVAgregarFNE").removeClass("hidden");
                $("#btnAgregarDevFNE").removeAttr("disabled", "disabled");
                $("#btnAgregarDevFNE").focus();
            }
        }
    });
}

function Imprimir() {
    modalModuloHide();
    var printContents = '';
    var originalContents = document.body.innerHTML;
    var css = '@page { size: A4; } td,th {font-size:9px !important;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    var TODAY = new Date();
    var hoyPrint = ("0" + TODAY.getDate()).slice(-2) + "-" + ("0" + (TODAY.getMonth() + 1)).slice(-2) + "-" + TODAY.getFullYear();
    var Cliente = $("#hiddenCliente").val();
    Cliente = eval('(' + Cliente + ')');
    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    var html = '';
    var cantHojas = Math.ceil((ItemsDev.length / 20));
    var esFacturaCompleta = false;
    if (ItemsDev[0].dev_nombreproductofactura == 'F.Completa') {
        esFacturaCompleta = true;
    }
    var esDevVencidos = false;
    if (colMotivos[parseInt((ItemsDev[0].dev_motivo) + 1)] == 'Producto Vencido') {
        esDevVencidos = true;
    }

    for (var hoja = 1; hoja <= cantHojas; hoja++) {
        var FC = false;
        /*### ENCABEZADO ###*/
        html = '<div style="position: relative; height:950px;">'
        html += '<table class="table" style="margin-bottom:20px;">';
        html += '<tbody>';
        html += '<tr>';
        html += '<td colspan="2" class="text-center"><h4>COPIA PARA FARMACIA</h4></td>'
        html += '</tr>';
        html += '<tr>';
        html += '<td width="50%" style="border:none">';
        html += '<img src="../../../img/mvc/logos/logo2.png" width="150"><br>';
        html += 'PUEYRREDON 1149 - (0341) 4203300 <br>S2000QIG - ROSARIO - SANTA FE<br>RPC: T.73 F.6881 Nº538 De Estatutos Fecha 16 / 12 / 1992';
        html += '</td>';
        html += '<td width="50%" class="text-center">';
        html += '<h4>SOLICITUD N°: ' + NroDev.slice(0, 5) + '-' + NroDev.slice(5) + '</h4>';
        html += '<h4>FECHA: ' + hoyPrint + '</h4>';
        html += 'Hoja ' + hoja + ' de ' + cantHojas;
        html += CodBarra;
        //html += '<p class="barcode">' + NroDev.slice(1) + '</p>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        //html += '<div class="clear15"></div>'
        /*### CLIENTE ###*/
        html += '<table class="table" style="border: 1px solid #cecece;margin-bottom:5px;">';
        html += '<tbody>';
        html += '<tr>';
        html += '<td width="100%" style="border:none">';
        html += Cliente.cli_nombre + '<br>' + Cliente.cli_dirección + "<br>" + Cliente.cli_localidad + " - " + Cliente.cli_codprov;
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';

        //html += '<div class="clear15"></div>'
        if (esFacturaCompleta) {
            html += '<p>Devolución de Factura N°: ' + ItemsDev[0].dev_numerofactura + '</p>';
        } else if (esDevVencidos) {
            html += '<p>Devolución por Vencidos</p>';
        } else {
            html += '<p>Devolución Normal</p>';
        }
        html += '<div class="" style="border:  1px solid #cecece; min-height:600px; max.height:650px;">';
        html += '<table class="table table-striped tablaDevoluciones" style="border: none; ">';
        html += '<thead>';
        html += '<tr style="border:none;border-bottom: 1px solid #cecece; color:black !important; height: auto !important;" >';
        if (!esFacturaCompleta && !esDevVencidos) {
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;">Factura</th>';
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;">Producto facturado</th>';
        }
        html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;">Producto devuelto</th>';
        if (!esDevVencidos) {
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;">Motivo</th>';
        }
        html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;" class="text-center">Cantidad</th>';
        if (!esFacturaCompleta) {
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;" class="text-center">Lote</th>';
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;" class="text-center">Vencimiento</th>';
        }
        html += '</tr>';
        html += '</thead>';
        html += '<tbody id="tblItemDev">';

        for (i = (hoja - 1) * 20; i < ((hoja * 22) - 1); i++) {
            if (i < ItemsDev.length) {
                if (ItemsDev[i].dev_fechavencimientoloteToString != null) {
                    var dtFechaVto = ItemsDev[i].dev_fechavencimientoloteToString.split("/");
                    if (dtFechaVto[2] != 1899) {
                        var FechaVto = dtFechaVto[1] + "/" + dtFechaVto[2];
                    } else {
                        var FechaVto = "";
                    }
                } else {
                    var FechaVto = "";
                }
                if (ItemsDev[i].dev_numerolote != null) {
                    var NLote = ItemsDev[i].dev_numerolote;
                } else {
                    var NLote = "";
                }
                var NroFact = ItemsDev[i].dev_numerofactura;

                if (ItemsDev[i].dev_nombreproductofactura != null) {
                    var PRD = ItemsDev[i].dev_nombreproductofactura;
                } else {
                    var PRD = "";
                }

                html += "<tr style='height: auto !important;'>";
                if (!esFacturaCompleta && !esDevVencidos) {
                    html += "<td style=' font-size:9px !important;'>" + NroFact + "</td>";
                    html += "<td style=' font-size:9px !important;'>" + PRD + "</td>";
                }
                html += "<td style=' font-size:9px !important;'>" + ItemsDev[i].dev_nombreproductodevolucion + "</td>";
                if (!esDevVencidos) {
                    html += "<td style=' font-size:9px !important;'>" + colMotivos[parseInt((ItemsDev[i].dev_motivo) + 1)] + "</td>";
                }
                html += "<td style=' font-size:9px !important;' class='text-center'>" + ItemsDev[i].dev_cantidad + "</td>";
                if (!esFacturaCompleta) {
                    html += "<td style=' font-size:9px !important;' class='text-center'>" + NLote + "</td>";
                    html += "<td style=' font-size:9px !important;' class='text-center'>" + FechaVto + "</td>";
                }
                html += "</tr>";
            }
        }
        html += '</tbody>';
        html += '</table>';
        html += '</div>';

        /*### FIRMA CONFORMIDAD ###*/
        html += '<table class="table pull-right" style="border: 1px solid #cecece;margin-bottom:10px; width: 20% !important; position: absolute;bottom:0;right:0">';
        html += '<tbody>';
        html += '<tr>';
        html += '<td style="border: 1px solid #cecece; height: 50px;">';
        html += '</td>';
        html += '</tr>';
        html += '<tr style="border: 1px solid #cecece !important; height: auto;">';
        html += '<td class="text-center">Recibí Conforme</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';


        html += '</div>';

        printContents += html
        printContents += "<div class='printbreak' style='page-break-before: always;'></div>";
        FC = false;
        /*### ENCABEZADO ###*/
        html = '<div style="position: relative; height:950px;">'
        html += '<table class="table" style="margin-bottom:20px;">';
        html += '<tbody>';
        html += '<tr>';
        html += '<td colspan="2" class="text-center"><h4>COPIA PARA DROGUERÍA</h4></td>'
        html += '</tr>';
        html += '<tr>';
        html += '<td width="50%" style="border:none">';
        html += '<img src="../../../img/mvc/logos/logo2.png" width="150"><br>';
        html += 'PUEYRREDON 1149 - (0341) 4203300 <br>S2000QIG - ROSARIO - SANTA FE<br>RPC: T.73 F.6881 Nº538 De Estatutos Fecha 16 / 12 / 1992';
        html += '</td>';
        html += '<td width="50%" class="text-center">';
        html += '<h4>SOLICITUD N°: ' + NroDev.slice(0, 5) + '-' + NroDev.slice(5) + '</h4>';
        html += '<h4>FECHA: ' + hoyPrint + '</h4>';
        html += 'Hoja ' + hoja + ' de ' + cantHojas;
        html += CodBarra;
        //html += '<p class="barcode">' + NroDev.slice(1) + '</p>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        //html += '<div class="clear15"></div>'
        /*### CLIENTE ###*/
        html += '<table class="table" style="border: 1px solid #cecece;margin-bottom:5px;">';
        html += '<tbody>';
        html += '<tr>';
        html += '<td width="50%" style="border:none">';
        html += Cliente.cli_nombre + '<br>' + Cliente.cli_dirección + "<br>" + Cliente.cli_localidad + " - " + Cliente.cli_codprov;
        html += '</td>';
        html += '<td width="50%" style="border:none; text-align:right">';
        if (esDevVencidos) {
            html += '<h1><b>VENCIDOS</b></h1>';
        } else {
            html += ' ';
        }
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';

        //html += '<div class="clear15"></div>'
        if (esFacturaCompleta) {
            html += '<p>Devolución de Factura N°: ' + ItemsDev[0].dev_numerofactura + '</p>';
        } else if (esDevVencidos) {
            html += '<p>Devolución por Vencidos</p>';
        } else {
            html += '<p>Devolución Normal</p>';
        }
        html += '<div class="" style="border:  1px solid #cecece; min-height:600px; max.height:700px;">';
        html += '<table class="table table-striped tablaDevoluciones" style="border: none; ">';
        html += '<thead>';
        html += '<tr style="border:none;border-bottom: 1px solid #cecece; color:black !important; height: auto !important;" >';
        if (!esFacturaCompleta && !esDevVencidos) {
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;">Factura</th>';
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;">Producto facturado</th>';
        }
        html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;">Producto devuelto</th>';
        if (!esDevVencidos) {
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;">Motivo</th>';
        }
        html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;" class="text-center">Cantidad</th>';
        if (!esFacturaCompleta) {
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;" class="text-center">Lote</th>';
            html += '<th style="color:black !important; font-size:9px !important; height: auto; padding: 5px!important;" class="text-center">Vencimiento</th>';
        }
        html += '</tr>';
        html += '</thead>';
        html += '<tbody id="tblItemDev">';

        for (i = (hoja - 1) * 20; i < ((hoja * 22) - 1); i++) {
            if (i < ItemsDev.length) {
                if (ItemsDev[i].dev_fechavencimientoloteToString != null) {
                    var dtFechaVto = ItemsDev[i].dev_fechavencimientoloteToString.split("/");
                    if (dtFechaVto[2] != 1899) {
                        var FechaVto = dtFechaVto[1] + "/" + dtFechaVto[2];
                    } else {
                        var FechaVto = "";
                    }
                } else {
                    var FechaVto = "";
                }
                if (ItemsDev[i].dev_numerolote != null) {
                    var NLote = ItemsDev[i].dev_numerolote;
                } else {
                    var NLote = "";
                }

                var NroFact = ItemsDev[i].dev_numerofactura;

                if (ItemsDev[i].dev_nombreproductofactura != null) {
                    var PRD = ItemsDev[i].dev_nombreproductofactura;
                } else {
                    var PRD = "";
                }

                html += "<tr style='height: auto !important;'>";
                if (!esFacturaCompleta && !esDevVencidos) {
                    html += "<td style=' font-size:9px !important;'>" + NroFact + "</td>";
                    html += "<td style=' font-size:9px !important;'>" + PRD + "</td>";
                }
                html += "<td style=' font-size:9px !important;'>" + ItemsDev[i].dev_nombreproductodevolucion + "</td>";
                if (!esDevVencidos) {
                    html += "<td style=' font-size:9px !important;'>" + colMotivos[parseInt((ItemsDev[i].dev_motivo) + 1)] + "</td>";
                }
                html += "<td style=' font-size:9px !important;' class='text-center'>" + ItemsDev[i].dev_cantidad + "</td>";
                if (!esFacturaCompleta) {
                    html += "<td style=' font-size:9px !important;' class='text-center'>" + NLote + "</td>";
                    html += "<td style=' font-size:9px !important;' class='text-center'>" + FechaVto + "</td>";
                }
                html += "</tr>";
            }
        }
        html += '</tbody>';
        html += '</table>';
        html += '</div>';

        /*### FIRMA CONFORMIDAD ###*/
        html += '<table class="table pull-right" style="border: none;margin-bottom:10px; width: 100% !important; position: absolute;bottom:0;right:0">';
        html += '<tbody>';
        html += '<tr>';
        var IdSuc = $("#txtIdSucursalCliente").val().trim(),
            SucNombre = "";

        switch (IdSuc){
            case 'CC':
                SucNombre = 'CASA CENTRAL';
                break;
            case 'CB':
                SucNombre = 'SUCURSAL CÓRDOBA';
                break;
            case 'CD':
                SucNombre = 'SUCURSAL CONCORDIA';
                break;
            case 'CO':
                SucNombre = 'SUCURSAL CONCEPCIÓN';
                break;
            case 'SF':
                SucNombre = 'SUCURSAL SANTA FE';
                break;
            case 'SN':
                SucNombre = 'SUCURSAL SAN NICOLÁS';
                break;
            case 'VM':
                SucNombre = 'SUCURSAL VILLA MARÍA';
                break;
            case 'VH':
                SucNombre = 'SUCURSAL ROSARIO';
                break;
            case 'RC':
                SucNombre = 'SUCURSAL RÍO CUARTO';
                break;
            case 'DM':
                SucNombre = 'SUCURSAL DISPOSITIVOS MÉDICOS';
                break;
            case 'CH':
                SucNombre = 'SUCURSAL CHAÑAR LADEADO';
                break;
        }
        //html += '<td style="border: none !important; height: 50px; width: 50%; text-align: left; font-size:16px !important;"><b>Entregar en ' + SucNombre ;
        //html += '</b><h1><b>VENCIDOS</b></h1></td>';
        //html += '<td style="border: none !important; height: 50px; width: 30%; text-align: center; font-size:20px !important;">';
        //if (esDevVencidos) {
        //    html += '<h1><b>VENCIDOS</b></h1>';
        //} else {
        //    html += '';
        //}
        html += '<td style="border: none !important; height: 50px; width: 80%; text-align: left; font-size:16px !important;"><b>Entregar en ' + SucNombre;
        if (esDevVencidos) {
            html += '</b><h1><b>VENCIDOS</b></h1></td>';
        } else {
            html += '</b></td>';
        }
        html += '</td>';
        html += '<td style="border: 1px solid #cecece !important; height: 50px; width: 20%">';
        html += '</td>';
        html += '</tr>';
        html += '<tr style="height: auto;">';
        html += '<td style="border: none !important; width: 80%; text-align: left;">';
        html += '</td>';
        html += '<td class="text-center" style="border: 1px solid #cecece !important; height: auto;">Recibí Conforme</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';


        html += '</div>';

        printContents += html
        printContents += "<div class='printbreak' style='page-break-before: always;'></div>";
        //printContents += "<hr style='border-top:1px solid #cecece;'>";
        //printContents += html;
    }

    document.body.innerHTML = printContents;

    setTimeout(function () {
        window.print();
        document.body.innerHTML = originalContents;
       $("#btnImprimirND").click(function () {
           Imprimir();
        });
    }, 2000);

}


function mensaje_reclamos(NombreProducto) {
    var fin = jQuery.Event("keypress");
    fin.which = 35;
    fin.keycode = 35;
    fin.keypress = 35;
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += "<h4><span style='color: red!important; '><i class='fa fa-times-circle fa-2x'></i> ERROR</span></h4>";
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal" id="cerrar-modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    //strHtml += '<form id="" name="" action="">';
    strHtml += '<div class="col-xs-12">';
    var mail = cli_email();
    if (mail == null) {
        mail = '';
    }
    //
    strHtml += "<p style='text-align: center; line-height: 1.5em; font-weight: 300; font-size: 14px;'>El producto " + NombreProducto + " lleva CADENA DE FRÍO, por favor comuníquese con RECLAMOS.</p>";
    strHtml += "<p></p>";
    strHtml += "<p class='text-center'><button type='button' class='btn btn-primary' id='btnConsultarReclamo'><i class='fa fa-envelope-o'></i>&nbsp;&nbsp;&nbsp; Consultar</button></p>";
    strHtml += '<div id="form_reclamos" class="col-xs-12 no-padding hidden"><span style="font-size:14px;">Ingrese Dirección de Correo donde desee recibir su respuesta.</span>&nbsp;<input name="idReclamoMail" id="idReclamoMail" class="form-control2" type="text" value="' + mail + '" />';
    //strHtml += 'Responder a:&nbsp;<input name="idCtaCteMail" id="idCtaCteMail" class="form-control2" type="text" value="' + mail + '" />';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<textarea name="idReclamoComentario" id="idReclamoComentario" class="form-control2" placeholder="Escriba su consulta"></textarea>';
    strHtml += '<input name="idReclamoProducto" id="idReclamoProducto" class="form-control2" type="hidden" value="' + NombreProducto + '" />';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="oblig float-right">(*) Campos obligatorios</div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a class="btn_confirmar" href="#" onclick="onclickEnviarConsultaAReclamos();return false;">ENVIAR</a>';
    strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal" onclick="modalModuloHide()">CANCELAR</a>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    //strHtml += '</form>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
    $('#modalModulo').bind("click");
    $("#idReclamoComentario").focus();
    $("#btnConsultarReclamo").click(function () {
        $("#form_reclamos").removeClass("hidden");
        $("#btnConsultarReclamo").addClass("hidden");
    });
    $("#cerrar-modal").click(function () {
        modalModuloHide();
    });
}

function mensaje_vale_psico(NombreProducto) {
    var fin = jQuery.Event("keypress");
    fin.which = 35;
    fin.keycode = 35;
    fin.keypress = 35;
    var strHtml = '';
    strHtml += '<div class="modal-background">&nbsp;</div>';
    strHtml += '<div class="modal-dialog modal-md"><div class="modal-content">';
    strHtml += '<div class="modal-header no-padding-bottom">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-lg-12">';
    strHtml += "<h4><span style='color: red!important; '><i class='fa fa-times-circle fa-2x'></i> ERROR</span></h4>";
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="close-modal" data-dismiss="modal" id="cerrar-modal"><i class="fa fa-times"></i></div>';
    strHtml += '</div>';
    strHtml += '<div class="modal-body">';
    //strHtml += '<form id="" name="" action="">';
    strHtml += '<div class="col-xs-12">';
    var mail = cli_email();
    if (mail == null) {
        mail = '';
    }
    //
    strHtml += "<p style='text-align: center; line-height: 1.5em; font-weight: 300; font-size: 14px;'>El producto " + NombreProducto + " requiere VALE por PSICOTRÓPICO, por favor comuníquese con nuestra DIRECCIÓN TÉCNICA.</p>";
    strHtml += "<p></p>";
    strHtml += "<p class='text-center'><button type='button' class='btn btn-primary' id='btnConsultarVale'><i class='fa fa-envelope-o'></i>&nbsp;&nbsp;&nbsp; Consultar</button></p>";
    strHtml += '<div id="form_vales" class="col-xs-12 no-padding hidden"><span style="font-size:14px;">Ingrese Dirección de Correo donde desee recibir su respuesta.</span>&nbsp;<input name="idValeMail" id="idValeMail" class="form-control2" type="text" value="' + mail + '" />';
    //strHtml += 'Responder a:&nbsp;<input name="idCtaCteMail" id="idCtaCteMail" class="form-control2" type="text" value="' + mail + '" />';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<textarea name="idValeComentario" id="idValeComentario" class="form-control2" placeholder="Escriba su consulta"></textarea>';
    strHtml += '<input name="idValeProducto" id="idValeProducto" class="form-control2" type="hidden" value="' + NombreProducto + '" />';
    strHtml += '<div class="clear10"></div>';
    strHtml += '<div class="oblig float-right">(*) Campos obligatorios</div>';
    strHtml += '<div class="clear20"></div>';
    strHtml += '<a class="btn_confirmar" href="#" onclick="onclickEnviarConsultaAValePsicotropico();return false;">ENVIAR</a>';
    strHtml += '<a class="btn_vaciar float-left" href="#" data-dismiss="modal" onclick="modalModuloHide()">CANCELAR</a>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    //strHtml += '</form>';
    strHtml += '</div>';
    strHtml += '<div class="clear"></div>';
    strHtml += '</div></div>';
    $('#modalModulo').html(strHtml);
    $('#modalModulo').modal();
    $("#idValeComentario").focus();
    setTimeout(function () {
        $('#modalModulo').bind("click");
    }, 100);
    $("#btnConsultarVale").click(function () {
        $("#form_vales").removeClass("hidden");
        $("#btnConsultarVale").addClass("hidden");
    });
    $("#cerrar-modal").click(function () {
        modalModuloHide();
    });
}

function funImprimirComprobantePdf(pValor) {
    if (isArchivoGenerado) {
        return true;
    } else {
        if (isLlamarArchivoPDF) {
            contadorPDF = 0;
            nroDocumento = pValor;
            // $('#imgPdf').attr('src', '../../img/varios/ajax-loader.gif');
            //mostrarLoaderBotonDescarga('0');
            isLlamarArchivoPDF = false;
            var nombreArchivoPDF = 'NCR_' + nroDocumento;
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
            var nombreArchivoPDF = 'NCR_' + nroDocumento;
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


function funSetarFechaComprobante(pDesde, pHasta) {
    dateComprobanteDesde = new Date(pDesde);
    dateComprobanteHasta = new Date(pHasta);
}

function ObtenerUnidadesEnSolicitudesNCFactNoEnvNoAnuladasDeFacturayObjetoComercial(NumeroFactura, NombreProducto) {
    $.ajax({
        type: "POST",
        url: "/devoluciones/ObtenerUnidadesEnSolicitudesNCFactNoEnvNoAnuladasDeFacturayObjetoComercial",
        data: {
            NumeroFactura,
            NombreProducto
        },
        success: function (response) {
            console.log(response);

            if ( response > 0 ) {
                var msj = "<h5 style='text-align: center; line - height: 1.5em; font - weight: 300; font - size: 16px;'>El Producto " + NombreProducto + " de la factura " + NumeroFactura + " ya posee " + response;
                if (response == 1) {
                    msj += " unidad en Solicitud de Facturado No Enviado";
                } else {
                    msj += " unidades en Solicitud de Facturado No Enviado";
                }
                mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> INFORMACIÓN</span>", msj);
            }
        }
    });
}