
var isIngresarPageMethods = false;

function ajaxLogin(name, pass) {
    if (isNotNullEmpty(name) && isNotNullEmpty(pass)) {
        var parameter = { login: name, pass: pass }
        $.ajax({
            type: "POST",
            url: "../Home/login",
            data: parameter,//{ pName: name, pPass: pass }
            success:
                function (response) {
                    OnCallBackLogin(response);
                },
            failure: function (response) {
                OnFail(response);
            },
            error: function (response) {
                OnFail(response);
            }
        });
    }
}
function ajaxLoginCarrito(name, pass, pIdOferta) {
    if (isNotNullEmpty(name) && isNotNullEmpty(pass)) {
        $.ajax({
            type: "POST",
            url: "../Home/loginCarrito",
            data: { pName: name, pPass: pass, pIdOferta: pIdOferta },
            success:
                function (response) {
                    OnCallBackLoginCarrito(response);
                },
            failure: function (response) {
                OnFail(response);
            },
            error: function (response) {
                OnFail(response);
            }
        });
    }
}
function onkeypressIngresar(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        // Enter pressed
        onclickIngresar();
        return false;
    }
}
function onkeypressIngresarAbajo(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        // Enter pressed
        onclickIngresarAbajo();
        return false;
    }
}
function onkeypressIngresarDesdeAgregarCarrito(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        // Enter pressed
        onclickIngresarDesdeAgregarCarrito();
        return false;
    }
}

function onclickIngresar() {
    if (!isIngresarPageMethods) {
        isIngresarPageMethods = true;
       var  name = $('#login_name').val();
       var pass = $('#login_password').val();
        ajaxLogin(name, pass);
    }
    return false;
}
function onclickIngresarAbajo() {
    if (!isIngresarPageMethods) {
        isIngresarPageMethods = true;
       var name = $('#name_footer').val();
       var pass = $('#password_footer').val();
        ajaxLogin(name, pass);
    }
    return false;
}
function OnFailLogin(ex) {
    isIngresarPageMethods = false;
    OnFail(ex);
}
var idOferta = null;

function IngresarDsdMobil() {
    idOferta = -1;
    $('#myModal').modal();
}
function onclickIngresarDesdeAgregarCarrito() {
   var name = $('#name_carrito').val();
   var pass = $('#password_carrito').val();
    ajaxLoginCarrito(name, pass, idOferta);
    return false;
}
function OnCallBackLoginCarrito(args) {
    if (args == 'Ok') {
        funIrIntranet();
    }
    else if (args == 'OkPromotor') {
        funIrIntranetPromotor();
    }
    else {
        $.alert({
            title: 'Información',
            content: args,
        });
    }
}
function funIrIntranet() {
    location.href = '../mvc/Buscador';
}

function funIrIntranetPromotor() {
    location.href = '../ctacte/composicionsaldo';
}

function OnCallBackLogin(args) {
    isIngresarPageMethods = false;
    console.log(args);
    if (args == 'Ok') {
        funIrIntranet();
    }
    else if (args == 'OkPromotor') {
        funIrIntranetPromotor();
    }
    else {
        $.alert({
            title: 'Información',
            content: args,
        });
    }
}