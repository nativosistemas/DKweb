
var isIngresarPageMethods = false;
var name = null;
var pass = null;
jQuery(document).ready(function () {
    //        localStorage['name'] = name;
    //localStorage['pass'] = pass;



    var myName = localStorage['name'] || '';
    var myPass = localStorage['pass'] || '';
    $('#login_password').val(myPass);
    $('#login_name').val(myName);

    $('#password_footer').val(myPass);
    $('#name_footer').val(myName);
});

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
        name = $('#login_name').val();
        pass = $('#login_password').val();

        //PageMethods.login(name, pass, OnCallBackLogin, OnFailLogin);
        ajaxLogin(name, pass);
    }
    return false;
}
function onclickIngresarAbajo() {
    if (!isIngresarPageMethods) {
        isIngresarPageMethods = true;
        name = $('#name_footer').val();
        pass = $('#password_footer').val();
        //PageMethods.login(name, pass, OnCallBackLogin, OnFailLogin);
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
    var myName = localStorage['name'] || '';
    var myPass = localStorage['pass'] || '';
    $('#name_carrito').val(myName);
    $('#password_carrito').val(myPass);
    $('#myModal').modal();
}
function onclickIngresarDesdeAgregarCarrito() {
    name = $('#name_carrito').val();
    pass = $('#password_carrito').val();
    //PageMethods.loginCarrito(name, pass, idOferta, OnCallBackLoginCarrito, OnFail);
    ajaxLoginCarrito(name, pass, idOferta);
    return false;
}
function OnCallBackLoginCarrito(args) {
    if (args == 'Ok') {
        localStorage['name'] = name;
        localStorage['pass'] = pass;
        funIrIntranet();
    }
    else if (args == 'OkPromotor') {
        localStorage['name'] = name;
        localStorage['pass'] = pass;
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
        localStorage['name'] = name;
        localStorage['pass'] = pass;
        funIrIntranet();
    }
    else if (args == 'OkPromotor') {
        localStorage['name'] = name;
        localStorage['pass'] = pass;
        funIrIntranetPromotor();
    }
    else {
        $.alert({
            title: 'Información',
            content: args,
        });
    }
}