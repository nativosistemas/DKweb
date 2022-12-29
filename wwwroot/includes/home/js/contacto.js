var strMesajeOk_contacto = 'Su consulta a sido enviada. Gracias por contactarse con nosotros.';
var strMesajeOk_contactoCV = 'Su consulta a sido enviada. Gracias por contactarse con nosotros.';

function GrabarContacto() {
    if ($('#success').html() == strMesajeOk_contacto) {
        window.location = "contacto.aspx";
        return false;
    }
    $('#success').html('');
    if ($('#form1')[0].checkValidity()) {
        var g_recaptcha_response = grecaptcha.getResponse();
        PageMethods.SendContacto($('#txtNombreApellido').val(), $('#r_social').val(), $('#txtEmailContacto').val(), $('#txtAsunto').val(), $('#txtCuerpo').val(), g_recaptcha_response, OnCallBackSendContacto, OnFail);
        return false;
    }
    return true;
}
function OnCallBackSendContacto(args) {
    if (args == 'Ok') {
        $('#form1')[0].reset();

        $('#success').removeClass('alert-danger');
        $('#success').addClass('alert-success');
        $('#success').html(strMesajeOk_contacto);

    }
    else {
        $('#success').removeClass('alert-success');
        $('#success').addClass('alert-danger');
        $('#success').html(args);
    }
}

