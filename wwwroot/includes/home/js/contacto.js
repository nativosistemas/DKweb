var strMesajeOk_contacto = 'Su consulta a sido enviada. Gracias por contactarse con nosotros.';
var strMesajeOk_contactoCV = 'Su consulta a sido enviada. Gracias por contactarse con nosotros.';

function GrabarContacto() {
    if ($('#success').html() == strMesajeOk_contacto) {
        window.location = "contacto";
        return false;
    }
    $('#success').html('');
    if ($('#form1')[0].checkValidity()) {
        var g_recaptcha_response = grecaptcha.getResponse();
        SendContacto(g_recaptcha_response);
        return false;
    }
    return true;
}
function SendContacto(g_recaptcha_response) {
    var txtNombreApellido = $('#txtNombreApellido').val();
    var r_social = $('#r_social').val();
    var txtEmailContacto = $('#txtEmailContacto').val();
    var txtAsunto = $('#txtAsunto').val();
    var txtCuerpo = $('#txtCuerpo').val();
    $.ajax({
        type: "POST",
        url: "/home/SendContacto",
        data: { txtNombreApellido: txtNombreApellido, r_social: r_social, txtEmailContacto: txtEmailContacto, txtAsunto: txtAsunto, txtCuerpo: txtCuerpo, g_recaptcha_response: g_recaptcha_response },
        success:
            function (response) {
                OnCallBackSendContacto(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });

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

