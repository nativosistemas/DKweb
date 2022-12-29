var strMesajeOk_registración = 'Su registración se envió satisfactoriamente.';

jQuery(document).ready(function () {
    var RegistracionMsg = $('#hiddenRegistracionMsg').val() ;
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
    if ($('#form1')[0].checkValidity())
    {
           
        if (isNotNullEmpty($('#txtUsuarioWeb').val()) && $('#txtUsuarioWeb').val().length < 6)
        {
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
        PageMethods.SendRegistracion(isEs24, isCliente, $('#txtTitularFarmacia').val(), $('#txtUsuarioWeb').val(), $('#txtFechaNacimiento').val(), $('#txtContacto').val(), $('#txtNombreFarmacia').val(), $('#txtEmail').val(), $('#txtTel').val(), $('#txtDireccion').val(), $('#txtCodigoPostal').val(), $('#txtLocalidad').val(), $('#txtProvincia').val(), $('#txtPaginaWeb').val(), g_recaptcha_response, OnCallBackSendRegistracion, OnFail);
        return false;
    }
    return true;   
}
function OnCallBackSendRegistracion(args)
{
    if (args == 'Ok')
    {
        //$('#form1')[0].reset();

        //$('#success').removeClass('alert-danger');
        //$('#success').addClass('alert-success');
        //$('#success').html(strMesajeOk_registración);
        window.location = "registracion.aspx";

    }
    else
    {
        $('#success').removeClass('alert-success');
        $('#success').addClass('alert-danger');
        $('#success').html(args);
    }
}