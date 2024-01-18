using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);

///
builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.MaxDepth = Int32.MaxValue;
            });
builder.Services.AddMvc(options =>
{
    options.MaxModelBindingCollectionSize = int.MaxValue;
});
builder.Services.Configure<FormOptions>(opt =>
{
    opt.ValueLengthLimit = int.MaxValue;
    opt.MultipartBodyLengthLimit = int.MaxValue;

});
///        
builder.Services.AddControllersWithViews();//.AddRazorRuntimeCompilation();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.MaxValue;
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
// inicio admin
builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("RequiereAdmin", policy =>
            policy.Requirements.Add(new DKweb.AuthorizationHandlers.AdminRequisito(DKbase.generales.Constantes.cROL_ADMINISTRADOR)));//
    });
builder.Services.AddSingleton<Microsoft.AspNetCore.Authorization.IAuthorizationHandler, DKweb.AuthorizationHandlers.AdminRequisitoHandler>();
// fin admin

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
.AddCookie(option =>
{
    option.LoginPath = "/Home/Index";
    option.ExpireTimeSpan = TimeSpan.FromHours(23);
    option.AccessDeniedPath = "/config/sinpermiso";
});

var app = builder.Build();
DKweb.Helper.app = builder.Configuration.GetSection("appSettings")["getTipoApp"];
DKweb.Helper.folder = builder.Configuration.GetSection("appSettings")["getFolder"];

DKbase.Helper.getTipoApp = DKweb.Helper.app;
DKbase.Helper.getFolder = DKweb.Helper.folder;
DKbase.Helper.getUrl_DKdll = builder.Configuration.GetSection("appSettings")["getUrl_DKdll"];
DKbase.Helper.getUrl_DKcore = builder.Configuration.GetSection("appSettings")["getUrl_DKcore"];
DKbase.Helper.getMail_cv = builder.Configuration.GetSection("appSettings")["mail_cv"];
DKbase.Helper.getMailRegistracion = builder.Configuration.GetSection("appSettings")["mailRegistracion"];
DKbase.Helper.getMailRegistracionNoCliente = builder.Configuration.GetSection("appSettings")["mailRegistracionNoCliente"];
DKbase.Helper.getMail_from = builder.Configuration.GetSection("appSettings")["mail_from"];
DKbase.Helper.getMail_pass = builder.Configuration.GetSection("appSettings")["mail_pass"];
DKbase.Helper.getMail_solicitudSobresRemesa = builder.Configuration.GetSection("appSettings")["mail_solicitudSobresRemesa"];
DKbase.Helper.getMail_ctacte = builder.Configuration.GetSection("appSettings")["mail_ctacte"];
DKbase.Helper.getMailContacto = builder.Configuration.GetSection("appSettings")["mailContacto"];
DKbase.Helper.getArchivo_ImpresionesComprobante = builder.Configuration.GetSection("appSettings")["ImpresionesComprobante"];
DKbase.Helper.getConnectionStringSQL = builder.Configuration.GetConnectionString("ConnectionSQL");
DKbase.Helper.getMail_reclamos = builder.Configuration.GetSection("appSettings")["mail_reclamos"];// System.Configuration.ConfigurationManager.AppSettings["mail_reclamos"].ToString();
DKbase.Helper.getReCAPTCHA_ClaveSecreta = builder.Configuration.GetSection("appSettings")["reCAPTCHA_ClaveSecreta"];

var optionsRewrite = new RewriteOptions()
.AddRedirect("home/index.aspx", "home/index")
.AddRedirect("home/empresa.aspx", "home/empresa")
.AddRedirect("home/contacto.aspx", "home/contacto")
.AddRedirect("home/contactocv.aspx", "home/contactocv")
.AddRedirect("home/promociones.aspx", "home/promociones")
.AddRedirect("home/recall.aspx", "home/recall")
.AddRedirect("home/recalls.aspx", "home/recalls")
.AddRedirect("home/contactoCtaCte.aspx", "home/contactoCtaCte")
.AddRedirect("home/registracion.aspx", "home/registracion")
.AddRedirect("servicios/generar_archivo.aspx", "servicios/generar_archivo")
.AddRedirect("servicios/generarCSV.aspx", "servicios/generarCSV")
.AddRedirect("servicios/generar_archivoPdf.aspx", "servicios/generar_archivoPdf")
.AddRedirect("servicios/generar_comprobantes_discriminado.aspx", "servicios/generar_comprobantes_discriminado");

app.UseRewriter(optionsRewrite);
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    //app.UseExceptionHandler("/config/Error");
    app.UseExceptionHandler(exceptionHandlerApp =>
 {

     //exceptionHandlerApp.ex
     //"/Home/Error"
     exceptionHandlerApp.Run(async context =>
     {


         context.Response.StatusCode = StatusCodes.Status500InternalServerError;

         // using static System.Net.Mime.MediaTypeNames;
         context.Response.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;

         await context.Response.WriteAsync("Se produjo un error.");//"/Home/Error"

         var exceptionHandlerPathFeature =
             context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();
         if (exceptionHandlerPathFeature?.Error is Exception)
         {

             DKbase.generales.Log.grabarLog_generico("Program_cs: Excepción no controlada", exceptionHandlerPathFeature?.Error, DateTime.Now, string.Empty, DKbase.Helper.getTipoApp);
         }
         if (exceptionHandlerPathFeature?.Error is FileNotFoundException)
         {
             await context.Response.WriteAsync("El archivo no se encontro.");
         }

         if (exceptionHandlerPathFeature?.Path == "/")
         {

             await context.Response.WriteAsync(" Page: Home.");
         }
     });
 });
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}");

app.MapGet("/cerrar", async (Microsoft.AspNetCore.Http.IHttpContextAccessor _httpContextAccessor) =>
{
    await _httpContextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);  //await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    _httpContextAccessor.HttpContext.Session.Clear();
    _httpContextAccessor.HttpContext.Response.Redirect("/Home/Index");
    return System.Threading.Tasks.Task.CompletedTask;// "Ok"; 
});
app.Run();
