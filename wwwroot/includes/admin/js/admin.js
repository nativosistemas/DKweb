function getNamePage() {
    var url = location.href;
    var pagina = url.substring(url.lastIndexOf('/') + 1);
    return pagina;
}

window.addEventListener("load", (event) => {

    var pagina = getNamePage();


    if (pagina == 'admin' || pagina == 'index') {

        var elementoMsgLogin = document.getElementById("hiddenMsgLogin");

        if (elementoMsgLogin !== null && elementoMsgLogin !== undefined) {
            var msg = elementoMsgLogin.value;
            if (msg == 'Ok_ADMINISTRADOR') {
                // alert(msg);
                //  window.location.href = "/admin/usuarios";
                //admin/usuarios
            }
        }
    }


});

document.addEventListener("DOMContentLoaded", function () {
    var oFormAdminLogin = document.querySelector("#formAdminLogin");

    if (oFormAdminLogin != null) {
        oFormAdminLogin.addEventListener("submit", function (event) {
            event.preventDefault();



            //var name =  document.getElementById("admin_usuario").value;
            // var pass =  document.getElementById("admin_contrasena").value;
            //var token = "";

            grecaptcha
                .execute("6LeVNeQoAAAAAB8BX4-pJCSwCfdS7iWes-JQWhJe", {
                    action: "iniciar_sesion",
                }).then(function (tokenResponse) {
                    // token = tokenResponse;
                    document.getElementById("admin_token").value = tokenResponse;
                    //if (resultado) {
                    oFormAdminLogin.removeEventListener("submit", arguments.callee); // Remueve el manejador de eventos para evitar bucles infinitos
                    oFormAdminLogin.submit();
                    //}
                });


            /*validarDatos().then(function (resultado) {
                if (resultado) {
                    oFormAdminLogin.removeEventListener("submit", arguments.callee); // Remueve el manejador de eventos para evitar bucles infinitos
                    oFormAdminLogin.submit();
                }
            });*/
        });
    }

});

async function validarDatos() {
    var usuario = document.getElementById("admin_usuario").value;

    // Realiza la lógica de validación aquí
    // Retorna true si los datos son válidos, false de lo contrario
    if (usuario.trim() === "") {
        alert("El campo de usuario no puede estar vacío.");
        return false;
    }

    // Puedes agregar más lógica de validación según tus necesidades

    return true; // Retorna true si todos los datos son válidos
}
function cerrarSesion() {
    fetchSignOff().then(text => {
        if (text == 'Ok') {
            location.href = '../admin';
        }
    });
}

async function fetchSignOff() {
    const response = await fetch('/Home/SignOff', {
        method: 'POST'
    });
    const text = await response.text();
    return text;
}
