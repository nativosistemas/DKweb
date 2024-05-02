var isIngresarPageMethods = false;

function ajaxLogin(name, pass, token) {
  if (isNotNullEmpty(name) && isNotNullEmpty(pass)) {
    var parameters = { login: name, pass: pass, token: token };
    $.ajax({
      type: "POST",
      url: "../Home/login",
      data: parameters,
      success: function (response) {
        OnCallBackLogin(response);
      },
      failure: function (response) {
        OnFail(response);
      },
      error: function (response) {
        OnFail(response);
      },
    });
  } else {
    console.log("La validación del captcha falló");
  }
}

function ajaxLoginCarrito(name, pass, pIdOferta) {
  // 
  grecaptcha
    .execute("6LeVNeQoAAAAAB8BX4-pJCSwCfdS7iWes-JQWhJe", {
      action: "iniciar_sesion",
    })
    .then(function (tokenResponse) {
      token = tokenResponse;

      ajaxLoginCarrito_base(name, pass, pIdOferta, token);
    });
}
function ajaxLoginCarrito_base(name, pass, pIdOferta, token) {

  if (isNotNullEmpty(name) && isNotNullEmpty(pass)) {
    loginCarrito_fetch(name, pass, pIdOferta, token).then(response => {
      OnCallBackLoginCarrito(response);

    })
    /*$.ajax({
      type: "POST",
      url: "../Home/loginCarrito",
      data: { pName: name, pPass: pass, pIdOferta: pIdOferta, pToken: token },
      success: function (response) {
        OnCallBackLoginCarrito(response);
      },
      failure: function (response) {
        OnFail(response);
      },
      error: function (response) {
        OnFail(response);
      },
    });*/
  }
}
async function loginCarrito_fetch(name, pass, pIdOferta, token) {
  var datos = { pName: name, pPass: pass, pIdOferta: pIdOferta, pToken: token };


  const response = await fetch('../Home/loginCarrito_model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos) // Convierte los datos a formato JSON
  });



  const text = await response.text();
  return text;
}
function onkeypressIngresar(e) {
  if (!e) e = window.event;
  var keyCode = e.keyCode || e.which;
  if (keyCode == "13") {
    // Enter pressed
    onclickIngresar();
    return false;
  }
}
function onkeypressIngresarAbajo(e) {
  if (!e) e = window.event;
  var keyCode = e.keyCode || e.which;
  if (keyCode == "13") {
    // Enter pressed
    onclickIngresarAbajo();
    return false;
  }
}
function onkeypressIngresarDesdeAgregarCarrito(e) {
  if (!e) e = window.event;
  var keyCode = e.keyCode || e.which;
  if (keyCode == "13") {
    // Enter pressed
    onclickIngresarDesdeAgregarCarrito();
    return false;
  }
}

function onclickIngresar() {
  if (!isIngresarPageMethods) {
    isIngresarPageMethods = true;
    var name = $("#login_name").val();
    var pass = $("#login_password").val();
    var token = "";

    grecaptcha
      .execute("6LeVNeQoAAAAAB8BX4-pJCSwCfdS7iWes-JQWhJe", {
        action: "iniciar_sesion",
      })
      .then(function (tokenResponse) {
        token = tokenResponse;

        ajaxLogin(name, pass, token);
      });
  }
  return false;
}
function onclickIngresarAbajo() {
  if (!isIngresarPageMethods) {
    isIngresarPageMethods = true;
    var name = $("#name_footer").val();
    var pass = $("#password_footer").val();
    var token = "";

    grecaptcha
      .execute("6LeVNeQoAAAAAB8BX4-pJCSwCfdS7iWes-JQWhJe", {
        action: "iniciar_sesion",
      })
      .then(function (tokenResponse) {
        token = tokenResponse;

        ajaxLogin(name, pass, token);
      });
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
  $("#myModal").modal();
}
function onclickIngresarDesdeAgregarCarrito() {
  var name = $("#name_carrito").val();
  var pass = $("#password_carrito").val();
  ajaxLoginCarrito(name, pass, idOferta);
  return false;
}
function OnCallBackLoginCarrito(args) {
  if (args == "Ok") {
    funIrIntranet();
  } else if (args == "OkPromotor") {
    funIrIntranetPromotor();
  } else {
    $.alert({
      title: "Información",
      content: args,
    });
  }
}
function funIrIntranet() {
  location.href = "../mvc/Buscador";
}

function funIrIntranetPromotor() {
  location.href = "../ctacte/composicionsaldo";
}
function funIrIntranetInhabilitado() {
  location.href = "../ctacte/composicionsaldo";
}

function OnCallBackLogin(args) {
  isIngresarPageMethods = false;
  console.log(args);
  if (args == "Ok") {
    funIrIntranet();
  } else if (args == "OkPromotor") {
    funIrIntranetPromotor();
  } else if (args == "INH") {
    funIrIntranetInhabilitado();
  } else if (args == 'Ok_CUENTASCORRIENTES') {
    location.href = "../ctacte/composicionsaldo";
  } else if (args == 'Ok_DESCARGAS') {
    location.href = "../config/catalogo";
  }
  else {
    $.alert({
      title: "Información",
      content: args,
    });
  }
}
