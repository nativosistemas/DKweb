var strMesajeOk_registración = 'Su registración se envió satisfactoriamente.';

jQuery(document).ready(function () {
    var RegistracionMsg = $('#hiddenRegistracionMsg').val();
    if (typeof RegistracionMsg == 'undefined') {
        RegistracionMsg = null;
    }
    if (isNotNullEmpty(RegistracionMsg)) {
        if (RegistracionMsg == 'Ok') {
            $('#successOk').removeClass('alert-danger');
            $('#successOk').addClass('alert-success');
            $('#successOk').html(strMesajeOk_registración);
        }
    }
});

function GrabarRegistracion() {
    //if ($('#success').html() == strMesajeOk_registración)
    //{
    //    window.location = "registracion.aspx";
    //    return false;
    //}
    $('#success').html('');
    $('#successOk').removeClass('alert-success');
    $('#successOk').html('');
    if ($('#form1')[0].checkValidity()) {

        if (isNotNullEmpty($('#txtUsuarioWeb').val()) && $('#txtUsuarioWeb').val().length < 6) {
            $('#success').removeClass('alert-success');
            $('#success').addClass('alert-danger');
            $('#success').html('El nombre de usuario web debe poseer al menos 6 caracteres.');

            return false;
        }
        //  $('#success').html();
        var isCliente = true;
        var isEs24 = false;
        if ($('input[name="radioEsCliente"]:checked').val() == 'No')
            isCliente = false;
        if ($('#txtEs24').is(':checked'))
            isEs24 = true;
        var g_recaptcha_response = grecaptcha.getResponse();
        // PageMethods.SendRegistracion(isEs24, isCliente, $('#txtTitularFarmacia').val(), $('#txtUsuarioWeb').val(), $('#txtFechaNacimiento').val(), $('#txtContacto').val(), $('#txtNombreFarmacia').val(), $('#txtEmail').val(), $('#txtTel').val(), $('#txtDireccion').val(), $('#txtCodigoPostal').val(), $('#txtLocalidad').val(), $('#txtProvincia').val(), $('#txtPaginaWeb').val(), g_recaptcha_response, OnCallBackSendRegistracion, OnFail);
        SendRegistracion(isEs24, isCliente, g_recaptcha_response);
        return false;
    }
    return true;
}
function SendRegistracion(isEs24, isCliente, g_recaptcha_response) {
    var txtTitularFarmacia = $('#txtTitularFarmacia').val();
    var txtUsuarioWeb = $('#txtUsuarioWeb').val();
    var txtFechaNacimiento = $('#txtFechaNacimiento').val();
    var txtContacto = $('#txtContacto').val();
    var txtNombreFarmacia = $('#txtNombreFarmacia').val();
    var txtEmail = $('#txtEmail').val();
    var txtTel = $('#txtTel').val();
    var txtDireccion = $('#txtDireccion').val();
    var txtCodigoPostal = $('#txtCodigoPostal').val();
    var txtLocalidad = $('#txtLocalidad').val();
    var txtProvincia = $('#txtProvincia').val();
    var txtPaginaWeb = $('#txtPaginaWeb').val();

    $.ajax({
        type: "POST",
        url: "/home/SendRegistracion",
        data: { isEs24: isEs24, isCliente: isCliente, txtTitularFarmacia: txtTitularFarmacia, txtUsuarioWeb: txtUsuarioWeb, txtFechaNacimiento: txtFechaNacimiento, txtContacto: txtContacto, txtNombreFarmacia: txtNombreFarmacia, txtEmail: txtEmail, txtTel: txtTel, txtDireccion: txtDireccion, txtCodigoPostal: txtCodigoPostal, txtLocalidad: txtLocalidad, txtProvincia: txtProvincia, txtPaginaWeb: txtPaginaWeb, g_recaptcha_response: g_recaptcha_response },
        success:
            function (response) {
                OnCallBackSendRegistracion(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });

}
function OnCallBackSendRegistracion(args) {
    if (args == 'Ok') {
        //$('#form1')[0].reset();

        //$('#success').removeClass('alert-danger');
        //$('#success').addClass('alert-success');
        //$('#success').html(strMesajeOk_registración);
        window.location = "registracion";

    }
    else {
        $('#success').removeClass('alert-success');
        $('#success').addClass('alert-danger');
        $('#success').html(args);
    }
}