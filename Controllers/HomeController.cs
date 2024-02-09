using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DKweb.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Authorization;

namespace DKweb.Controllers;


public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public HomeController(ILogger<HomeController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    [HttpGet]
    public async Task<IActionResult> Index()
    {
        DKweb.Codigo.Util.htmlCssBodySet(_httpContextAccessor, "bd_home");
        DKweb.Codigo.Util.first_htmlPublicarRevista(_httpContextAccessor);
        return View();
    }
    [HttpGet]
    public async Task<IActionResult> empresa()
    {
        DKweb.Codigo.Util.htmlCssBodySet(_httpContextAccessor, "bd_sec");
        return View();
    }
    [HttpGet]
    public async Task<IActionResult> promociones(int isNuevoLanzamiento = 0)
    {
        DKweb.Codigo.Util.htmlCssBodySet(_httpContextAccessor, "bd_sec");
        bool params_isNuevoLanzamiento = false;
        if (isNuevoLanzamiento == 1)
        {
            params_isNuevoLanzamiento = true;
        }
        DKweb.Codigo.Util.promociones_isNuevoLanzamiento_Set(_httpContextAccessor, params_isNuevoLanzamiento);
        return View();
    }
    public async Task<IActionResult> recall(int id)
    {
        DKweb.Codigo.Util.htmlCssBodySet(_httpContextAccessor, "bd_sec");
        DKweb.Codigo.Util.recall_id_Set(_httpContextAccessor, id);
        return View();
    }
    [HttpGet]
    public async Task<IActionResult> recalls()
    {
        DKweb.Codigo.Util.htmlCssBodySet(_httpContextAccessor, "bd_sec");
        return View();
    }
    public async Task<IActionResult> contacto()
    {
        DKweb.Codigo.Util.htmlCssBodySet(_httpContextAccessor, "bd_sec");
        return View();
    }
    public async Task<IActionResult> contactocv()
    {
        DKweb.Codigo.Util.htmlCssBodySet(_httpContextAccessor, "bd_sec");
        return View();
    }
    [HttpPost]
    public async Task<IActionResult> contactocv_Post()
    {
        //return Content("Hello, " + _httpContextAccessor.HttpContext.Request.Form["nombre_cv"] + ". You are " + _httpContextAccessor.HttpContext.Request.Form["sucursal_cv"] + " years old!");
        string result = string.Empty;
        try
        {
            if (_httpContextAccessor.HttpContext.Request.Form["nombre_cv"] != "" && _httpContextAccessor.HttpContext.Request.Form["email_cv"] != "" && _httpContextAccessor.HttpContext.Request.Form["dni_cv"] != "" && _httpContextAccessor.HttpContext.Request.Form["cuerpo_cv"] != "" && _httpContextAccessor.HttpContext.Request.Form["file_cv"] != ""
                && _httpContextAccessor.HttpContext.Request.Form["puesto_cv"] != "" && _httpContextAccessor.HttpContext.Request.Form["sucursal_cv"] != "" && _httpContextAccessor.HttpContext.Request.Form["g-Recaptcha-Response"] != "")//
            {
                string g_recaptcha_response = _httpContextAccessor.HttpContext.Request.Form["g-Recaptcha-Response"];
                if (DKbase.web.generales.ReCaptchaClass.Validate(g_recaptcha_response))//
                {
                    //_httpContextAccessor.HttpContext.Request.Form.Files
                    IFormFileCollection fileCollection = _httpContextAccessor.HttpContext.Request.Form.Files;//["file_cv"];
                    IFormFile file = fileCollection.FirstOrDefault();

                    if (file != null && file.Length > 0)
                    {
                        DateTime fechaPresentacion = DateTime.Now;
                        int codigoCV = DKbase.Util.InsertarCurriculumVitae(_httpContextAccessor.HttpContext.Request.Form["nombre_cv"], _httpContextAccessor.HttpContext.Request.Form["cuerpo_cv"], _httpContextAccessor.HttpContext.Request.Form["email_cv"], _httpContextAccessor.HttpContext.Request.Form["dni_cv"], _httpContextAccessor.HttpContext.Request.Form["puesto_cv"], _httpContextAccessor.HttpContext.Request.Form["sucursal_cv"], fechaPresentacion);
                        string fname = Path.GetFileName(file.FileName);
                        string extencion = DKbase.web.capaDatos.capaRecurso_base.obtenerExtencion(fname);
                        string pathDestino = Path.Combine(DKbase.Helper.getFolder, "archivos", DKbase.generales.Constantes.cTABLA_CV);
                        if (!Directory.Exists(pathDestino))
                            Directory.CreateDirectory(pathDestino);
                        string nombreArchivo = DKbase.web.capaDatos.capaRecurso_base.nombreArchivoSinRepetir(pathDestino, fname);
                        string destino = Path.Combine(pathDestino, nombreArchivo); //pathDestino + nombreArchivo;
                        using (Stream fileStream = new FileStream(destino, FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);//file.SaveAs(destino);
                        }
                        DKbase.Util.InsertarActualizarArchivo(0, codigoCV, DKbase.generales.Constantes.cTABLA_CV, extencion, file.ContentType, nombreArchivo, string.Empty, string.Empty, string.Empty, 1);
                        result = "Ok";
                        DKweb.Codigo.Util.contactocv_result_Set(_httpContextAccessor, "Ok");//HttpContext.Current.Session["contactocv_result"] = "Ok";
                        RedirectToAction("contactocv");
                    }
                }
                else
                    result = "reCAPTCHA invalido, por favor inténtelo de nuevo.";
            }
        }
        catch (Exception ex)
        {
            DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
            result = "No pudo ser realizada, intente nuevamente en unos minutos.";
        }
        //HttpContext.Current.Session["contactocv_result"] = result;
        return RedirectToAction("contactocv");//?id=" + id
    }
    public async Task<IActionResult> registracion()
    {
        DKweb.Codigo.Util.htmlCssBodySet(_httpContextAccessor, "bd_sec");
        return View();
    }
    [HttpPost]
    public async Task<IActionResult> SendRegistracion(bool isEs24, bool isCliente, string txtTitularFarmacia, string txtUsuarioWeb, string txtFechaNacimiento, string txtContacto, string txtNombreFarmacia, string txtEmail, string txtTel, string txtDireccion, string txtCodigoPostal, string txtLocalidad, string txtProvincia, string txtPaginaWeb, string g_recaptcha_response)
    {
        string result = string.Empty;
        DKweb.Codigo.Util.registracion_msg_Set(_httpContextAccessor, null);
        try
        {
            if (DKbase.web.generales.ReCaptchaClass.Validate(g_recaptcha_response))
            {
                string cuerpo = "<b>Nombre Titular de la Farmacia: </b>" + txtTitularFarmacia + "<br/>";
                cuerpo += "<b> ¿Es cliente?: </b>" + (isCliente ? "Si" : "No") + "<br/>";
                cuerpo += "<b>Usuario para ingresar a la web: </b>" + txtUsuarioWeb + "<br />";
                cuerpo += " <b>Fecha nacimiento: </b>" + txtFechaNacimiento + "<br />";
                cuerpo += " <b>Nombre de Contacto: </b>" + txtContacto + " <br/>";//<br />
                cuerpo += " <b>Nombre de la farmacia: </b>" + txtNombreFarmacia + "<br/>";
                cuerpo += "<b> es 24hs: </b>" + (isEs24 ? "Si" : "No") + "<br/>";
                cuerpo += "<b>E-mail: </b>" + txtEmail + " <br/>";
                cuerpo += "<b> Dirección: </b>" + txtDireccion + "<br/>";
                cuerpo += "<b> Localidad: </b>" + txtLocalidad + " <br/>";
                cuerpo += "<b> Código Postal: </b>" + txtCodigoPostal + "<br/>";
                cuerpo += "<b> Provincia: </b>" + txtProvincia + " <br/>";
                cuerpo += " <b> Teléfono: </b>" + txtTel + "<br/>";

                cuerpo += "<b>Página web: </b>" + txtPaginaWeb + "<br/> ";

                string[] split = null;
                if (isCliente)
                    split = DKbase.Helper.getMailRegistracion.Split(new Char[] { ';' });
                else
                    split = DKbase.Helper.getMailRegistracionNoCliente.Split(new Char[] { ';' });

                List<string> listaMail = split.ToList();

                String mail_from = DKbase.Helper.getMail_from;
                String mail_pass = DKbase.Helper.getMail_pass;


                System.Net.Mail.MailMessage correo = new System.Net.Mail.MailMessage();
                string asunto = "Registración";
                correo.From = new System.Net.Mail.MailAddress(mail_from);
                foreach (string itemMail in listaMail)
                {
                    correo.To.Add(itemMail);
                }
                correo.Subject = asunto;
                correo.Body = cuerpo;
                correo.IsBodyHtml = true;
                correo.Priority = System.Net.Mail.MailPriority.Normal;
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient("186.153.136.19", 25);
                smtp.UseDefaultCredentials = false;
                smtp.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                smtp.Credentials = new System.Net.NetworkCredential(mail_from, mail_pass);
                smtp.Send(correo);
                result = "Ok";
                DKweb.Codigo.Util.registracion_msg_Set(_httpContextAccessor, "Ok");
            }
            else
                result = "reCAPTCHA invalido, por favor inténtelo de nuevo.";
        }
        catch (Exception ex)
        {
            DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
            result = "No pudo ser realizada, intente nuevamente en unos minutos.";

        }
        return Content(result);
    }
    [HttpPost]
    public async Task<IActionResult> SendContacto(string txtNombreApellido, string r_social, string txtEmailContacto, string txtAsunto, string txtCuerpo, string g_recaptcha_response)
    {
        string result = string.Empty;
        try
        {
            if (DKbase.web.generales.ReCaptchaClass.Validate(g_recaptcha_response))
            {
                string cuerpo = "<b>Nombre y Apellido:  </b>" + txtNombreApellido + "<br/>";
                cuerpo += "<b>Empresa: </b>" + r_social + "<br />";
                cuerpo += " <b>Email: </b>" + txtEmailContacto + "<br />";
                cuerpo += " <b>Consulta: </b>" + txtCuerpo + " <br/>";//<br />
                string[] split = DKbase.Helper.getMailContacto.Split(new Char[] { ';' });
                List<string> listaMail = split.ToList();
                String mail_from = DKbase.Helper.getMail_from;
                String mail_pass = DKbase.Helper.getMail_pass;
                System.Net.Mail.MailMessage correo = new System.Net.Mail.MailMessage();
                string asunto = "Consulta - " + txtAsunto;
                correo.From = new System.Net.Mail.MailAddress(mail_from);
                foreach (string itemMail in listaMail)
                    correo.To.Add(itemMail);
                correo.Subject = asunto;
                correo.Body = cuerpo;
                correo.IsBodyHtml = true;
                correo.Priority = System.Net.Mail.MailPriority.Normal;
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient("186.153.136.19", 25);
                smtp.UseDefaultCredentials = false;
                smtp.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                smtp.Credentials = new System.Net.NetworkCredential(mail_from, mail_pass);
                smtp.Send(correo);
                result = "Ok";
            }
            else
                result = "reCAPTCHA invalido, por favor inténtelo de nuevo.";
        }
        catch (Exception ex)
        {
            DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
            result = "No pudo ser realizada, intente nuevamente en unos minutos.";
        }
        return Content(result);// result;
    }
    [HttpPost]
    public async Task<IActionResult> Index(DKbase.Models.AuthenticateRequest pAuthenticateRequest)
    {
        pAuthenticateRequest.login = Request.Form["txtUsuario"];
        pAuthenticateRequest.pass = Request.Form["txtPassword"];
        if (pAuthenticateRequest != null && !string.IsNullOrEmpty(pAuthenticateRequest.login) && !string.IsNullOrEmpty(pAuthenticateRequest.pass))
        {
            var result_login = DKweb.Codigo.Util.login(_httpContextAccessor, pAuthenticateRequest.login, pAuthenticateRequest.pass);// "romanello ", "alberdi"

            if (!string.IsNullOrEmpty(result_login) && (result_login == "Ok" || result_login == "OkPromotor"))
            {
                DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
                if (oUsuario != null)
                {
                    var claims = new List<Claim>{
                    new Claim(ClaimTypes.Name, oUsuario.NombreYApellido),
                    new Claim("dk_login"  as string, oUsuario.usu_login),
                    new Claim(ClaimTypes.Role, oUsuario.idRol.ToString())};
                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                    return RedirectToAction("Buscador", "mvc");
                }
            }
        }
        return View();
    }//    [HttpGet]
    public async Task<string> login(string pLogin, string pPass, string pToken)
    {
        DKbase.Models.AuthenticateRequest pAuthenticateRequest = new DKbase.Models.AuthenticateRequest() { login = pLogin, pass = pPass, token = pToken };
        return await login_general(pAuthenticateRequest);
    }
    private async Task<string> login_general(DKbase.Models.AuthenticateRequest pAuthenticateRequest)
    {
        string result = "!Ok";
        if (pAuthenticateRequest != null && !string.IsNullOrEmpty(pAuthenticateRequest.login) && pAuthenticateRequest.login.Equals("farmacity", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(pAuthenticateRequest.pass))
        {
            return await login_general_reutilizar(pAuthenticateRequest);
        }
        string publicKey = pAuthenticateRequest.token;
        if (DKbase.web.generales.ReCaptchaClass.Validate(publicKey))
        {
            return await login_general_reutilizar(pAuthenticateRequest);
        }
        else
        {
            result = "reCAPTCHA Invalido";
        }
        return result;
    }
    public async Task<string> login_general_reutilizar(DKbase.Models.AuthenticateRequest pAuthenticateRequest)
    {
        string result = "!Ok";
        if (pAuthenticateRequest != null && !string.IsNullOrEmpty(pAuthenticateRequest.login) && !string.IsNullOrEmpty(pAuthenticateRequest.pass))
        {
            result = DKweb.Codigo.Util.login(_httpContextAccessor, pAuthenticateRequest.login, pAuthenticateRequest.pass);
            if (!string.IsNullOrEmpty(result) && (result == "Ok" || result == "OkPromotor"))
            {
                DKbase.web.Usuario oUsuario = DKweb.Codigo.Util.getSessionUsuario(_httpContextAccessor);
                DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
                if (oUsuario != null)
                {
                    var claims = new List<Claim>{
                    new Claim(ClaimTypes.Name, oUsuario.NombreYApellido),
                    new Claim("dk_login"  as string, oUsuario.usu_login),
                    new Claim("cli_estado" as string, oCliente.cli_estado),
                    new Claim(ClaimTypes.Role, oUsuario.idRol.ToString())};
                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                    return result;
                }
            }
        }
        return result;
    }
    [HttpPost]
    public async Task<string> login(DKbase.Models.AuthenticateRequest pAuthenticateRequest)
    {
        return await login_general(pAuthenticateRequest);
    }
    [HttpPost]
    public async Task<string> loginCarrito(string pName, string pPass, int pIdOferta, string pToken)
    {
        string resultado = null;
        resultado = await login(new DKbase.Models.AuthenticateRequest() { login = pName, pass = pPass, token = pToken });
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (resultado == "Ok" && oCliente != null)
        {
            DKbase.Util.InsertarOfertaRating(pIdOferta, oCliente.cli_codigo, true);
            DKbase.web.capaDatos.cOferta o = DKbase.Util.RecuperarOfertaPorId(pIdOferta);
            if (o != null)
            {
                DKweb.Codigo.Util.set_home_Tipo(_httpContextAccessor, o.ofe_tipo);
                if (o.tfr_codigo != null)
                {
                    DKweb.Codigo.Util.set_home_IdTransfer(_httpContextAccessor, o.tfr_codigo.Value);
                }
            }
            DKweb.Codigo.Util.set_home_IdOferta(_httpContextAccessor, pIdOferta);
        }
        return resultado;
    }
    [HttpPost]
    public async Task<string> loginCarrito_model([FromBody]DKweb.Models.LoginModel pLoginModel)
    {
        string resultado = null;
        resultado = await login(new DKbase.Models.AuthenticateRequest() { login = pLoginModel.pName, pass = pLoginModel.pPass, token = pLoginModel.pToken });
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        if (resultado == "Ok" && oCliente != null)
        {
            DKbase.Util.InsertarOfertaRating(pLoginModel.pIdOferta, oCliente.cli_codigo, true);
            DKbase.web.capaDatos.cOferta o = DKbase.Util.RecuperarOfertaPorId(pLoginModel.pIdOferta);
            if (o != null)
            {
                DKweb.Codigo.Util.set_home_Tipo(_httpContextAccessor, o.ofe_tipo);
                if (o.tfr_codigo != null)
                {
                    DKweb.Codigo.Util.set_home_IdTransfer(_httpContextAccessor, o.tfr_codigo.Value);
                }
            }
            DKweb.Codigo.Util.set_home_IdOferta(_httpContextAccessor, pLoginModel.pIdOferta);
        }
        return resultado;
    }
    [HttpPost]
    public async Task<IActionResult> SignOff()
    {
        await _httpContextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);  //await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        _httpContextAccessor.HttpContext.Session.Clear();
        return Content("Ok");//RedirectToAction("Index", "Home");
    }
    public static string RecuperarTodasOfertas(List<DKbase.web.capaDatos.cOfertaHome> pResultado, bool isNuevoLanzamiento = false)
    {
        List<DKbase.web.capaDatos.cOfertaHome> resultado = pResultado;
        if (isNuevoLanzamiento)
        {
            resultado = resultado.Where(x => x.ofh_orden > 4).ToList();

        }
        else
        {
            resultado = resultado.Where(x => x.ofh_orden <= 4).ToList();
        }
        return resultado == null ? string.Empty : DKbase.generales.Serializador_base.SerializarAJson(resultado);
    }
    public async Task<IActionResult> Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public async Task<IActionResult> Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
    public async Task<IActionResult> contactoCtaCte()
    {

        DKweb.Codigo.Util.htmlCssBodySet(_httpContextAccessor, "bd_sec");
        return View();

    }
}



