//function HistorialProductoCarrito(pro_codigo, pro_nombre, pSucursal, pCantidadProducto) {
//    $.ajax({
//        type: "POST",
//        url: "/mvc/HistorialProductoCarrito",
//        data: { pIdProducto: pro_codigo, pPalabraElegiada: pro_nombre, pCodSucursal: pSucursal, pCantidadProducto: pCantidadProducto },
//        success:
//        function () {

//        },
//        failure: function (response) {
//            OnFail(response);
//        },
//        error: function (response) {
//            OnFail(response);
//        }
//    });
//}
function RecuperarProductosVariasColumnas(pTxtBuscador, pListaColumna, pIsBuscarConOferta, pIsBuscarConTransfer) {
    pTxtBuscador = pTxtBuscador.replace("'", "''");
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarProductosVariasColumnas",
        data: { pTxtBuscador: pTxtBuscador, pListaColumna: pListaColumna, pIsBuscarConOferta: pIsBuscarConOferta, pIsBuscarConTransfer: pIsBuscarConTransfer },
        success:
            function (response) {
                hideCargandoBuscador();
                //OnCallBackRecuperarProductos(response);
                OnCallBackRecuperarProductosConPaginador(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function RecuperarProductosPaginador(pPage) {
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarProductosPaginador",
        data: { pPage: pPage },
        success:
            function (response) {
                hideCargandoBuscador();
                OnCallBackRecuperarProductosConPaginador(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}

function RecuperarProductosOrdenar(pColumna, pOrden) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarProductosOrdenar",
        data: { pAscColumna: pColumna, pAscOrdenar: pOrden },
        success:
            function (response) {
                hideCargandoBuscador();
                OnCallBackRecuperarProductos(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function AgregarProductosTransfersAlCarrito(pListaProductosMasCantidad, pIdTransfers, pCodSucursal, pOnCallBack) {
    $.ajax({
        type: "POST",
        url: "/mvc/AgregarProductosTransfersAlCarrito" + (isCarritoDiferido ? 'Diferido' : ''),
        data: { pListaProductosMasCantidad: pListaProductosMasCantidad, pIdTransfers: pIdTransfers, pCodSucursal: pCodSucursal },
        success:
            function (response) {
                eval(pOnCallBack + '(' + response + ')');
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function CargarCarritoDiferido(pIdSucursal, pIdProduco, pCantidadProducto) {
    $.ajax({
        type: "POST",
        url: "/mvc/CargarCarritoDiferido",
        data: { pIdSucursal: pIdSucursal, pNombreProducto: pIdProduco, pCantidadProducto: pCantidadProducto },
        success:
            function (response) {
                OnCallBackCargarCarritoDiferido(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ActualizarProductoCarrito(pIdProduco, pIdSucursal, pCantidadProducto) {
    $.ajax({
        type: "POST",
        url: "/mvc/ActualizarProductoCarrito",
        data: { pIdProducto: pIdProduco, pCodSucursal: pIdSucursal, pCantidadProducto: pCantidadProducto },
        success:
            function (response) {
                try {
                    var oResult = eval('(' + response + ')');
                    if (oResult.isOk) {
                        //OnCallBackActualizarProductoCarrito(response);
                    }
                    else {
                        funLog();
                    }
                } catch (e) {
                    funLog();
                }
                OnCallBackActualizarProductoCarrito(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ModificarCantidadProductos(pCodProducto, pCodSucursal, pCantidad) {
    $.ajax({
        type: "POST",
        url: "/mvc/ModificarCantidadProductos",
        data: { pCodProducto: pCodProducto, pCodSucursal: pCodSucursal, pCantidad: pCantidad },
        success:
            function (response) {
                //OnCallBackModificarCantidadProductos(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
//function RecuperarCarritoPorIdClienteIdSucursal(pIdCliente, pIdSucursal) {
//    $.ajax({
//        type: "POST",
//        url: "/mvc/RecuperarCarritoPorIdClienteIdSucursal",
//        data: { pIdCliente: pIdCliente, pIdSucursal: pIdSucursal },
//        success:
//        function (response) {

//            OnCallBackActualizarProductoCarrito(response);
//        },
//        failure: function (response) {
//            OnFail(response);
//        },
//        error: function (response) {
//            OnFail(response);
//        }
//    });
//}
function RecuperarProductosEnOfertas(pPage) {
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarProductosEnOfertas",
        data: { pPage: pPage },
        success:
            function (response) {
                hideCargandoBuscador();
                OnCallBackRecuperarProductosConPaginador(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function RecuperarProductosEnTransfer(pPage) {
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarProductosEnTransfer",
        data: { pPage: pPage },
        success:
            function (response) {
                hideCargandoBuscador();
                OnCallBackRecuperarProductosConPaginador(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
//function BorrarCarritoPorId(pIdCarrito, pOnCallBack) {
//    modalModuloAlertHide();
//    showCargandoBuscador();
//    $.ajax({
//        type: "POST",
//        url: "/mvc/BorrarCarritoPorId",
//        data: { pIdCarrito: pIdCarrito },
//        success:
//        function (response) {
//            hideCargandoBuscador();
//            if (response == -1) {

//                mensaje('INFORMACIÓN', "<div style='font-size:1.5em'>" + objMensajeIntentaNuevamente + "</div>");
//            }
//            else {
//                var resultValue = true;
//                eval(pOnCallBack + '(' + resultValue + ')');
//               // OnCallBackBorrarCarrito(response);
//                // OnCallBackBorrarCarritoTransfer(response);
//            }
//        },
//        failure: function (response) {
//            hideCargandoBuscador();
//            OnFail(response);
//        },
//        error: function (response) {
//            hideCargandoBuscador();
//            OnFail(response);
//        }
//    });
//}
function BorrarCarrito(lrc_id, lrc_codSucursal) {
    modalModuloAlertHide();
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/mvc/BorrarCarrito",
        data: { lrc_id: lrc_id, lrc_codSucursal: lrc_codSucursal },
        success:
            function (response) {
                hideCargandoBuscador();
                if (response == -1) {

                    mensaje('INFORMACIÓN', "<div style='font-size:1.5em'>" + objMensajeIntentaNuevamente + "</div>");
                }
                else {
                    OnCallBackBorrarCarrito(response);
                }
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function BorrarCarritosDiferidos(lrc_id, lrc_codSucursal) {
    modalModuloAlertHide();
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/mvc/BorrarCarritosDiferidos",
        data: { lrc_id: lrc_id, lrc_codSucursal: lrc_codSucursal },
        success:
            function (response) {
                hideCargandoBuscador();
                if (response == -1) {
                    // modalModuloAlertHide();
                    mensaje('INFORMACIÓN', "<div style='font-size:1.5em'>" + objMensajeIntentaNuevamente + "</div>");
                }
                else {
                    OnCallBackBorrarCarrito(response);
                }
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function BorrarCarritoTransfer(pSucursal) {
    modalModuloAlertHide();
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/mvc/BorrarCarritoTransfer" + (isCarritoDiferido ? 'Diferido' : ''),
        data: { pSucursal: pSucursal },
        success:
            function (response) {
                hideCargandoBuscador();
                if (response == -1) {
                    // modalModuloAlertHide();
                    mensaje('INFORMACIÓN', "<div style='font-size:1.5em'>" + objMensajeIntentaNuevamente + "</div>");
                }
                else {
                    OnCallBackBorrarCarritoTransfer(response);
                }
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function IsHacerPedidos(pSucursal, pOnCallBack) {
    $.ajax({
        type: "POST",
        url: "/config/IsHacerPedidos",
        data: { pSucursal: pSucursal },
        success:
            function (response) {
                eval(pOnCallBack + '(' + response + ')');
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function IsBanderaUsarDll(pOnCallBack) {
    $.ajax({
        type: "POST",
        url: "/config/IsBanderaUsarDll",
        //data: { },
        success:
            function (response) {
                var resultValue = (String(response).toLowerCase() == 'true');
                //if (pOnCallBack == 'OnCallBackIsBanderaUsarDll_ListaPedidos') {
                //    OnCallBackIsBanderaUsarDll_ListaPedidos(resultValue);
                //}
                eval(pOnCallBack + '(' + resultValue + ')');
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ObtenerHorarioCierreAndSiguiente(pSucursal) {
    $.ajax({
        type: "POST",
        url: "/mvc/ObtenerHorarioCierreAndSiguiente",
        data: { pSucursalDependiente: pSucursal },
        success:
            function (response) {
                OnCallBackObtenerHorarioCierreCuentaRegresiva(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ObtenerHorarioCierre(pSucursal, pOnCallBack) {
    $.ajax({
        type: "POST",
        url: "/mvc/ObtenerHorarioCierre",
        data: { pSucursalDependiente: pSucursal },
        success:
            function (response) {
                //OnCallBackObtenerHorarioCierre(response);
                eval(pOnCallBack + '("' + response + '")');
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function TomarPedidoCarrito(pIdSucursal, pMensajeEnFactura, pMensajeEnRemito, pTipoEnvio, pIsUrgente) {
    $.ajax({
        type: "POST",
        url: "/mvc/TomarPedidoCarrito",
        data: { pIdSucursal: pIdSucursal, pMensajeEnFactura: pMensajeEnFactura, pMensajeEnRemito: pMensajeEnRemito, pTipoEnvio: pTipoEnvio, pIsUrgente: pIsUrgente },
        success:
            function (response) {
                OnCallBackTomarPedidoCarrito(response);
                hideCargando();
            },
        failure: function (response) {
            OnFailBotonEnProceso(response);
            hideCargando();
        },
        error: function (response) {
            OnFailBotonEnProceso(response);
            hideCargando();
        }
    });
}
function TomarPedidoCarritoDiferido(pIdSucursal, pMensajeEnFactura, pMensajeEnRemito, pTipoEnvio, pIsUrgente) {
    $.ajax({
        type: "POST",
        url: "/mvc/TomarPedidoCarritoDiferido",
        data: { pIdSucursal: pIdSucursal, pMensajeEnFactura: pMensajeEnFactura, pMensajeEnRemito: pMensajeEnRemito, pTipoEnvio: pTipoEnvio, pIsUrgente: pIsUrgente },
        success:
            function (response) {
                OnCallBackTomarPedidoCarrito(response);
                hideCargando();
            },
        failure: function (response) {
            OnFailBotonEnProceso(response);
            hideCargando();
        },
        error: function (response) {
            OnFailBotonEnProceso(response);
            hideCargando();
        }
    });
}
function RecuperarTransfer(pNombreProducto) {
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarTransfer",
        data: { pNombreProducto: pNombreProducto },
        success:
            function (response) {
                OnCallBackRecuperarTransfer(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function RecuperarTransferPromotores(pNombreProducto) {
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarTransfer",
        data: { pNombreProducto: pNombreProducto },
        success:
            function (response) {
                OnCallBackRecuperarTransferPromotor(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function TomarTransferPedidoCarrito(pIdSucursal, pMensajeEnFactura, pMensajeEnRemito, pTipoEnvio) {
    $.ajax({
        type: "POST",
        url: "/mvc/TomarTransferPedidoCarrito",
        data: { pIsDiferido: isCarritoDiferido, pIdSucursal: pIdSucursal, pMensajeEnFactura: pMensajeEnFactura, pMensajeEnRemito: pMensajeEnRemito, pTipoEnvio: pTipoEnvio },
        success:
            function (response) {
                OnCallBackTomarTransferPedidoCarrito(response);
                hideCargando();
            },
        failure: function (response) {
            OnFailBotonEnProceso(response);
            hideCargando();
        },
        error: function (response) {
            OnFailBotonEnProceso(response);
            hideCargando();
        }
    });
}
function TomarPedidoCarritoFacturarseFormaHabitual(pIdSucursal, pMensajeEnFactura, pMensajeEnRemito, pTipoEnvio, pIsUrgente, pListaNombreComercial, pListaCantidad) {
    $.ajax({
        type: "POST",
        url: "/mvc/TomarPedidoCarritoFacturarseFormaHabitual",
        data: { pIdSucursal: pIdSucursal, pMensajeEnFactura: pMensajeEnFactura, pMensajeEnRemito: pMensajeEnRemito, pTipoEnvio: pTipoEnvio, pIsUrgente: pIsUrgente, pListaNombreComercial: pListaNombreComercial, pListaCantidad: pListaCantidad },
        success:
            function (response) {
                OnCallBackTomarPedidoCarritoFacturarseFormaHabitual(response);
                hideCargando();
            },
        failure: function (response) {
            OnFailBotonEnProceso(response);
            hideCargando();
        },
        error: function (response) {
            OnFailBotonEnProceso(response);
            hideCargando();
        }
    });
}
function cargarOferta(pIdOferta) {
    $.ajax({
        type: "POST",
        url: "/mvc/cargarOferta",
        data: { pIdOferta: pIdOferta },
        success:
            function (response) {
                OnCallBackcargarOferta(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function RecuperarProductosHomeOferta(pIdOferta) {
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarProductosHomeOferta",
        data: { pIdOferta: pIdOferta },
        success:
            function (response) {
                //OnCallBackRecuperarProductos(response);
                OnCallBackRecuperarProductosConPaginador(response);
                hideCargandoBuscador();
            },
        failure: function (response) {
            OnFailBotonEnProceso(response);
            hideCargandoBuscador();
        },
        error: function (response) {
            OnFailBotonEnProceso(response);
            hideCargandoBuscador();
        }
    });
}
function RecuperarTransferPorId(pIdTransfer) {
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarTransferPorId",
        data: { pIdTransfer: pIdTransfer },
        success:
            function (response) {
                OnCallBackRecuperarTransferPorId_home(response);
                hideCargandoBuscador();
            },
        failure: function (response) {
            OnFailBotonEnProceso(response);
            hideCargandoBuscador();
        },
        error: function (response) {
            OnFailBotonEnProceso(response);
            hideCargandoBuscador();
        }
    });
}
function ActualizarProductoCarritoSubirArchivo(pListaValor) {
    $.ajax({
        type: "POST",
        url: "/mvc/ActualizarProductoCarritoSubirArchivo",
        data: { pListaValor: pListaValor },
        success:
            function (response) {
                if (response == '1') {
                    location.href = '../mvc/Buscador';
                } else {
                    mensaje('INFORMACIÓN', "<div style='font-size:1.5em'>" + objMensajeIntentaNuevamente + "</div>");
                    hideCargandoBuscador();
                }
            },
        failure: function (response) {
            OnFail(response);
            hideCargandoBuscador();
        },
        error: function (response) {
            OnFail(response);
            hideCargandoBuscador();
        }
    });
}
function CargarArchivoPedidoDeNuevo(has_id) {
    $.ajax({
        type: "POST",
        url: "/mvc/CargarArchivoPedidoDeNuevo",
        data: { has_id: has_id },
        success:
            function (response) {
                if (response)
                    location.href = '../mvc/subirpedido';
                else
                    hideCargandoBuscador();
            },
        failure: function (response) {
            OnFail(response);
            hideCargandoBuscador();
        },
        error: function (response) {
            OnFail(response);
            hideCargandoBuscador();
        }
    });
}
function CambiarEstadoMensaje(pIdMensaje, pIdEstado) {
    $.ajax({
        type: "POST",
        url: "/config/CambiarEstadoMensaje",
        data: { pIdMensaje: pIdMensaje, pIdEstado: pIdEstado },
        success:
            function (response) {
                //OnCallBackRecuperarProductosConPaginador(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function funIsMostrarOferta(pIsMostrarOferta) {
    $.ajax({
        type: "POST",
        url: "/mvc/funIsMostrarOferta",
        data: { pIsMostrarOferta: pIsMostrarOferta },
        success:
            function (response) {
                //OnCallBackfunIsMostrarOferta(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function CambiarContraseñaPersonal(pContraseñaVieja, pContraseñaNueva) {
    $.ajax({
        type: "POST",
        url: "/config/CambiarContraseñaPersonal",
        data: { pContraseñaVieja: pContraseñaVieja, pContraseñaNueva: pContraseñaNueva },
        success:
            function (response) {
                //OnCallBackCambiarContraseñaPersonal(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ObtenerRangoFecha_pedidos(pDia) {
    $.ajax({
        type: "POST",
        url: "/mvc/ObtenerRangoFecha_pedidos",
        data: { pDia: pDia },
        success:
            function (response) {
                OnCallBackObtenerRangoFecha_pedidos(response);
                hideCargando();
            },
        failure: function (response) {
            OnFail(response);
            hideCargando();
        },
        error: function (response) {
            OnFail(response);
            hideCargando();
        }
    });
}
function GuardarUsuario(pIdUsuario, pNombre, pApellido, pMail, pLogin, pContraseña, pObservaciones1, pListaPermisos) {
    $.ajax({
        type: "POST",
        url: "/config/GuardarUsuario",
        data: { pIdUsuario: pIdUsuario, pNombre: pNombre, pApellido: pApellido, pMail: pMail, pLogin: pLogin, pContraseña: pContraseña, pObservaciones1: pObservaciones1, pListaPermisos: pListaPermisos },
        success:
            function (response) {
                OnCallBackGuardarUsuario(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function CambiarEstadoUsuario(pIdUsuario) {
    $.ajax({
        type: "POST",
        url: "/config/CambiarEstadoUsuario",
        data: { pIdUsuario: pIdUsuario },
        success:
            function (response) {
                OnCallBackCambiarEstadoUsuario(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function EliminarUsuario(pIdUsuario) {
    $.ajax({
        type: "POST",
        url: "/config/EliminarUsuario",
        data: { pIdUsuario: pIdUsuario },
        success:
            function (response) {
                OnCallBackEliminarUsuario(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function CambiarContraseñaUsuario(pIdUsuario, pPass) {
    $.ajax({
        type: "POST",
        url: "/config/CambiarContraseñaUsuario",
        data: { pIdUsuario: pIdUsuario, pPass: pPass },
        success:
            function (response) {
                OnCallBackCambiarContraseñaUsuario(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ObtenerUsuarios() {
    $.ajax({
        type: "POST",
        url: "/config/ObtenerUsuarios",
        //data: { pIdUsuario: pIdUsuario, pPass: pPass },
        success:
            function (response) {
                OnCallBackObtenerUsuarios(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
//
function RecuperarFaltasProblemasCrediticios(pDia) {
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarFaltasProblemasCrediticios",
        data: { pDia: pDia },
        success:
            function (response) {
                OnCallBackLlenarGrillaFaltasProblemasCrediticios(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function RecuperarFaltasProblemasCrediticiosTodosEstados(pDia) {
    $.ajax({
        type: "POST",
        url: "/mvc/RecuperarFaltasProblemasCrediticiosTodosEstados",
        data: { pDia: pDia },
        success:
            function (response) {
                OnCallBackLlenarGrillaFaltasProblemasCrediticios(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function AgregarProductosDelRecuperardorAlCarrito(pSucursal, pArrayNombreProducto, pArrayCantidad, pArrayOferta) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/mvc/AgregarProductosDelRecuperardorAlCarrito",
        data: { pSucursal: pSucursal, pArrayNombreProducto: pArrayNombreProducto, pArrayCantidad: pArrayCantidad, pArrayOferta: pArrayOferta },
        success:
            function (response) {
                hideCargandoBuscador();
                OnCallBackAgregarProductosDelRecuperardorAlCarrito(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function BorrarPorProductosFaltasProblemasCrediticios(pSucursal, pArrayNombreProducto) {
    $.ajax({
        type: "POST",
        url: "/mvc/BorrarPorProductosFaltasProblemasCrediticios",
        data: { pSucursal: pSucursal, pArrayNombreProducto: pArrayNombreProducto },
        success:
            function (response) {
                OnCallBackBorrarPorProductosFaltasProblemasCrediticios(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ObtenerHistorialSubirArchivo(pDia) {
    $.ajax({
        type: "POST",
        url: "/mvc/ObtenerHistorialSubirArchivo",
        data: { pDia: pDia },
        success:
            function (response) {
                OnCallBackObtenerHistorialSubirArchivo(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ObtenerMovimientosDeFicha(pSemana) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/ObtenerMovimientosDeFicha",
        data: { pSemana: pSemana },
        success:
            function (response) {
                hideCargandoBuscador();
                OnCallBackObtenerMovimientosDeFicha(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function IsExistenciaComprobanteResumenes_todos(pNombreArchivo, pContadorAUX) {
    //showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/IsExistenciaComprobanteResumenes_todos",
        data: { pNombreArchivo: pNombreArchivo, pContadorAUX: pContadorAUX },
        success:
            function (response) {
                //hideCargandoBuscador();
                response = eval('(' + response + ')');
                OnCallBackIsExistenciaComprobanteResumenes_todos(response);
            },
        failure: function (response) {
            //hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            //hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function IsExistenciaComprobanteResumenes(pNombreArchivo, pIndex, pContadorAUX) {
    //showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/IsExistenciaComprobanteResumenes",
        data: { pNombreArchivo: pNombreArchivo, pIndex: pIndex, pContadorAUX: pContadorAUX },
        success:
            function (response) {
                //hideCargandoBuscador();
                response = eval('(' + response + ')');
                OnCallBackIsExistenciaComprobanteResumenes(response);
            },
        failure: function (response) {
            //hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            //hideCargandoBuscador();
            OnFail(response);
        }
    });
}


function IsExistenciaComprobante(pNombreArchivo, pOnCallBack) {
    $.ajax({
        type: "POST",
        url: "/ctacte/IsExistenciaComprobante",
        data: { pNombreArchivo: pNombreArchivo },
        success:
            function (response) {
                eval(pOnCallBack + '("' + response + '")');
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ObtenerRangoFecha(pDia, pPendiente, pCancelado) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/ObtenerRangoFecha",
        data: { pDia: pDia, pPendiente: pPendiente, pCancelado: pCancelado },
        success:
            function (response) {
                //hideCargandoBuscador();
                OnCallBackObtenerRangoFecha(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function ObtenerComprobantesDiscriminadosDePuntoDeVentaEntreFechas(diaDesde, mesDesde, añoDesde, diaHasta, mesHasta, añoHasta) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/ObtenerComprobantesDiscriminadosDePuntoDeVentaEntreFechas",
        data: { diaDesde: diaDesde, mesDesde: mesDesde, añoDesde: añoDesde, diaHasta: diaHasta, mesHasta: mesHasta, añoHasta: añoHasta },
        success:
            function (response) {
                //hideCargandoBuscador();
                OnCallBackObtenerComprobantesDiscriminadosDePuntoDeVentaEntreFechas(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function AgregarVariableSessionConsultaDeComprobantes(pTipo, diaDesde, mesDesde, añoDesde, diaHasta, mesHasta, añoHasta) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/AgregarVariableSessionConsultaDeComprobantes",
        data: { pTipo: pTipo, diaDesde: diaDesde, mesDesde: mesDesde, añoDesde: añoDesde, diaHasta: diaHasta, mesHasta: mesHasta, añoHasta: añoHasta },
        success:
            function (response) {
                //hideCargandoBuscador();
                OnCallBackAgregarVariableSessionConsultaDeComprobantes(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function enviarConsultaCtaCte(pMail, pComentario) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/enviarConsultaCtaCte",
        data: { pMail: pMail, pComentario: pComentario },
        success:
            function (response) {
                //modalModuloHide();
                hideCargandoBuscador();
            },
        failure: function (response) {
            //modalModuloHide();
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            //modalModuloHide();
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function enviarConsultaReclamo(pMail, pComentario, pNombreProducto) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/enviarConsultaReclamos",
        data: {
            pMail,
            pComentario,
            pNombreProducto
        },
        success:
            function (response) {
                //modalModuloHide();
                hideCargandoBuscador();
            },
        failure: function (response) {
            //modalModuloHide();
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            //modalModuloHide();
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function enviarConsultaValePsicotropico(pMail, pComentario, pNombreProducto) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/devoluciones/enviarConsultaValePsicotropico",
        data: {
            pMail,
            pComentario,
            pNombreProducto
        },
        success:
            function (response) {
                //modalModuloHide();
                hideCargandoBuscador();
            },
        failure: function (response) {
            //modalModuloHide();
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            //modalModuloHide();
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function ControlarSesion() {
    $.ajax({
        type: "POST",
        url: "/devoluciones/contralarSesion",
        data: {
        },
        success: function (response) {
            //console.log(response);
            if (response == "False") {
                mensaje("<span style='color: steelblue !important;'><i class='fa fa-exclamation-triangle fa-2x'></i> ATENCIÓN</span>", "<h5 style='text-align:center;line-height:1.5em;font-weight:300;font-size:16px;'>Su sesión ha caducado, por favor vuelva a ingresar.<br><br><button class='btn btn-primary' id='btn_cierre_sesion'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aceptar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></h5>");
                $("#btn_cierre_sesion").focus();
                $('body').keypress(function (e) {
                    if (e.which == 13 || e.which == 9) {
                        window.location.reload();
                    }
                });
                $("#btn_cierre_sesion").click(function () {
                    window.location.reload();
                });
                return false;
            }
        }
    });
}
function ObtenerCreditoDisponible(pCli_login) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/ObtenerCreditoDisponible",
        data: { pCli_login: pCli_login },
        success:
            function (response) {
                hideCargandoBuscador();
                OnCallBackObtenerCreditoDisponible(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function ObtenerComprobantesObrasSocialesDePuntoDeVentaEntreFechas(pLoginWeb, pPlan, diaDesde, mesDesde, añoDesde, diaHasta, mesHasta, añoHasta) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/ObtenerComprobantesObrasSocialesDePuntoDeVentaEntreFechas",
        data: { pLoginWeb: pLoginWeb, pPlan: pPlan, diaDesde: diaDesde, mesDesde: mesDesde, añoDesde: añoDesde, diaHasta: diaHasta, mesHasta: mesHasta, añoHasta: añoHasta },
        success:
            function (response) {
                //hideCargandoBuscador();
                //OnCallBackObtenerCreditoDisponible(response);
                //if (response == 'Ok')
                //{ }
                location.href = '../ctacte/ConsultaDeComprobantesObraSocialResultadoRango';
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function ObtenerSaldoFinalADiciembrePorCliente(pCli_login) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/ObtenerSaldoFinalADiciembrePorCliente",
        data: { pCli_login: pCli_login },
        success:
            function (response) {
                hideCargandoBuscador();
                OnCallBackObtenerSaldoFinalADiciembrePorCliente(response);
            },
        failure: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function enviarSolicitudSobresRemesa() {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/ctacte/enviarSolicitudSobresRemesa",
        //data: { pMail: pMail, pComentario: pComentario },
        success:
            function (response) {
                //modalModuloHide();
                hideCargandoBuscador();
                mensaje_SolicitudSobreRemesa();
            },
        failure: function (response) {
            //modalModuloHide();
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            //modalModuloHide();
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
function enviarReservaVacunas(pValue) {
    showCargandoBuscador();
    $.ajax({
        type: "POST",
        url: "/mvc/funReservaVacunas",
        data: { pListaVacunas: pValue },
        success:
            function (response) {
                hideCargandoBuscador();
                mensaje_ReservaVacunas();
                limpiarReservarVacunas();
            },
        failure: function (response) {
            isOnclickReservarVacunas = false;
            hideCargandoBuscador();
            OnFail(response);
        },
        error: function (response) {
            isOnclickReservarVacunas = false;
            hideCargandoBuscador();
            OnFail(response);
        }
    });
}
//function ObtenerTotalReservasDeVacunasPorClienteEntreFechas() {
//    showCargandoBuscador();
//    $.ajax({
//        type: "POST",
//        url: "/mvc/ObtenerTotalReservasDeVacunasPorClienteEntreFechas",
//        //data: { pListaVacunas: pValue },
//        success:
//            function (response) {
//                hideCargandoBuscador();
//                mensaje_ReservaVacunas();
//                limpiarReservarVacunas();
//            },
//        failure: function (response) {

//            hideCargandoBuscador();
//            OnFail(response);
//        },
//        error: function (response) {

//            hideCargandoBuscador();
//            OnFail(response);
//        }
//    });
//}