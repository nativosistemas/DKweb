var l_usuarios = null;
var o_usuario = null;
// paginador
let itemsPorPagina = 10;
let paginaActual = 1;
let paginaMax = 1;
// fin paginador

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
    } else if (pagina == 'usuarios') {
        var divTitle = document.getElementById("divTitle");
        divTitle.innerHTML = "Usuarios";

        GetUsuarios('', '', 0).then(x => {
            l_usuarios = x;
            paginaMax = l_usuarios.length;


        }).then(x => { htmlUsuarios(); });
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

async function GetUsuarios(sortExpression, pFiltro, pAvanzar) {
    const parametros = {
        sortExpression: sortExpression,
        pFiltro: pFiltro,
        pAvanzar: pAvanzar
    };
    const url = '/admin/GetUsuarios?' + new URLSearchParams(parametros);

    const response = await fetch(url, {
        method: 'GET'
    });
    const resultJson = await response.json();

    return resultJson;

}
async function GetUsuario(id) {
    const parametros = {
        id: id
    };
    const url = '/admin/GetUsuario?' + new URLSearchParams(parametros);

    const response = await fetch(url, {
        method: 'GET'
    });
    const resultJson = await response.json();
    return resultJson;

}
function htmlUsuarios() {
    //paginaActual = pagina;
    if (l_usuarios != null) {
        /*   const inicio = (paginaActual - 1) * itemsPorPagina;
           const fin = inicio + itemsPorPagina;
   
           const l_grilla = l_usuarios.slice(inicio, fin);
           if (fin < l_usuarios.length) {
               // if (l_grilla.length > 0) {}
           }
   */


        var strHtml = '';

        strHtml += '<table class="table">';
        strHtml += '<thead>';
        //
        strHtml += '<tr>';
        strHtml += '<th scope="col">ID</th>';
        strHtml += '<th scope="col">Nombre</th>';
        strHtml += '<th scope="col">Apellido</th>';
        strHtml += '<th scope="col">Correo Electrónico</th>';
        strHtml += '<th scope="col"></th>';
        strHtml += '</tr>';
        //
        strHtml += '</thead>';
        strHtml += '<tbody>';
        l_usuarios.forEach(function (elt) {
            strHtml += '<tr>';
            strHtml += '<th scope="row">' + elt.usu_codigo + '</th>';
            strHtml += '<td>' + elt.usu_nombre + '</td>';
            strHtml += '<td>' + elt.usu_apellido + '</td>';
            strHtml += '<td>' + elt.usu_mail + '</td>';
            strHtml += '<td>' + "<button type=\"button\" class=\"btn btn-outline-success\" onclick=\"return EditarUsuaruo(" + elt.usu_codigo + ");\">Modificar</button>&nbsp;&nbsp;" + '</td>';
            strHtml += '</tr>';
        });
        strHtml += '</tbody>';
        strHtml += '</table>';
        strHtml += htmlPaginador();
        document.querySelector("#divContainerGrid").innerHTML = strHtml;

    }
}
function EditarUsuaruo(id) {
    //window.location.href = "https://www.ejemplo.com";
    location.href = '../admin/usuario?id=' + id;
}
function VolverUsuario() {
    location.href = '../admin/usuarios';
    return false;
}
async function GrabarUsuario() {
    // if (o_usuario != null) {
    var nombre = document.getElementById('txt_nombre').value;// = o_usuario.usu_nombre;
    var apellido = document.getElementById('txt_apellido').value;//  = o_usuario.usu_apellido;
    var mail = document.getElementById('txt_mail').value;//  = o_usuario.usu_mail;
    var login = document.getElementById('txt_login').value;//  = o_usuario.usu_login;
    var pass = document.getElementById('txt_pass').value;//  = o_usuario.usu_login;
    var cliente = document.getElementById('txt_cliente').value;//  = o_usuario.usu_codCliente;
    var observaciones = document.getElementById('txt_observaciones').value;//  = o_usuario.usu_observacion;
    var rol = document.getElementById('cmb_rol').value;//  = o_usuario.usu_codRol;
    var url = new URL(window.location.href);
    var usu_codigo = url.searchParams.get("id");
    var resultInsertarActualizarUsuario = await InsertarActualizarUsuario(usu_codigo, rol, cliente, nombre, apellido, mail, login, pass, observaciones);
    if (resultInsertarActualizarUsuario == 'Ok') { location.href = '../admin/usuarios'; }
    //}
}
async function InsertarActualizarUsuario(usu_codigo, usu_codRol, usu_codCliente, usu_nombre, usu_apellido, usu_mail, usu_login, usu_psw, usu_observacion) {
    const parametros = {
        usu_codigo: usu_codigo,
        usu_codRol: usu_codRol,
        usu_codCliente: usu_codCliente,
        usu_nombre: usu_nombre,
        usu_apellido: usu_apellido,
        usu_mail: usu_mail,
        usu_login: usu_login,
        usu_psw: usu_psw,
        usu_observacion: usu_observacion
    };
    const url = '/admin/InsertarActualizarUsuario?' + new URLSearchParams(parametros);

    const response = await fetch(url, {
        method: 'GET'
    });
    const resultJson = await response.text();

    return resultJson;

}
function htmlPaginador() {
    var strHtml = '';
    strHtml += '<div class="container">';
    strHtml += '<div class="row">';
    strHtml += '<div class="col-12 text-center mb-3">';
    strHtml += '<button class="btn btn-primary mx-2"  onclick="onclickPaginador(-1)">Anterior</button>';
    strHtml += '<button class="btn btn-primary mx-2"  onclick="onclickPaginador(1)">Siguiente</button>';
    strHtml += '</div>';
    strHtml += '</div>';
    return strHtml;
}
function onclickPaginador(accion) {

    /* var pagina = paginaActual + accion;
     if (pagina < 1) {
         pagina = 1;
     }
     const inicio = (pagina - 1) * itemsPorPagina;
     const fin = inicio + itemsPorPagina;
     if (paginaMax  < fin){
         pagina = paginaMax;
     }*/

    GetUsuarios('', '', accion).then(x => {
        l_usuarios = x;
        paginaMax = l_usuarios.length;


    }).then(x => { htmlUsuarios(); })



    //htmlUsuarios(pagina);

}

function htmlCargarDatosCliente() {
    if (o_usuario != null) {
        document.getElementById('txt_nombre').value = o_usuario.usu_nombre;
        document.getElementById('txt_apellido').value = o_usuario.usu_apellido;
        document.getElementById('txt_mail').value = o_usuario.usu_mail;
        document.getElementById('txt_login').value = o_usuario.usu_login;
        document.getElementById("form_group_pass").style.display = "none";
        document.getElementById('txt_cliente').value = o_usuario.usu_codCliente;
        document.getElementById('txt_observaciones').value = o_usuario.usu_observacion;
        document.getElementById('cmb_rol').value = o_usuario.usu_codRol;
    }
}