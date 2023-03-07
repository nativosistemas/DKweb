using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.MaxValue;
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});


builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
.AddCookie(option =>
{
    option.LoginPath = "/Home/Index";
    option.ExpireTimeSpan = TimeSpan.FromHours(23);
    option.AccessDeniedPath = "/config/sinpermiso";
});

var app = builder.Build();

DKbase.Helper.getTipoApp = builder.Configuration.GetSection("appSettings")["getTipoApp"];
DKbase.Helper.getFolder = builder.Configuration.GetSection("appSettings")["getFolder"];
DKbase.Helper.getUrl_DKdll = builder.Configuration.GetSection("appSettings")["getUrl_DKdll"];
DKbase.Helper.getUrl_DKcore = builder.Configuration.GetSection("appSettings")["getUrl_DKcore"];
DKbase.Helper.getMail_cv = builder.Configuration.GetSection("appSettings")["mail_cv"];
DKbase.Helper.getMailRegistracion = builder.Configuration.GetSection("appSettings")["mailRegistracion"];
DKbase.Helper.getMailRegistracionNoCliente = builder.Configuration.GetSection("appSettings")["mailRegistracionNoCliente"];
DKbase.Helper.getMail_from = builder.Configuration.GetSection("appSettings")["mail_from"];
DKbase.Helper.getMail_pass = builder.Configuration.GetSection("appSettings")["mail_pass"];
DKbase.Helper.getMailContacto = builder.Configuration.GetSection("appSettings")["mailContacto"];
DKbase.Helper.getArchivo_ImpresionesComprobante = builder.Configuration.GetSection("appSettings")["ImpresionesComprobante"];
DKbase.Helper.getConnectionStringSQL = builder.Configuration.GetConnectionString("ConnectionSQL");

var optionsRewrite = new RewriteOptions()
.AddRedirect("home/index.aspx", "home/index")
.AddRedirect("home/empresa.aspx", "home/empresa")
.AddRedirect("home/contacto.aspx", "home/contacto")
.AddRedirect("home/contactocv.aspx", "home/contactocv")
.AddRedirect("home/promociones.aspx", "home/promociones")
.AddRedirect("home/recall.aspx", "home/recall")
.AddRedirect("home/recalls.aspx", "home/recalls")
.AddRedirect("home/registracion.aspx", "home/registracion")
.AddRedirect("servicios/generar_archivo.aspx", "servicios/generar_archivo")
.AddRedirect("servicios/generarCSV.aspx", "servicios/generarCSV")
.AddRedirect("servicios/generar_archivoPdf.aspx", "servicios/generar_archivoPdf");

app.UseRewriter(optionsRewrite);
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    //app.UseExceptionHandler("/Home/Error");
    app.UseExceptionHandler(exceptionHandlerApp =>
 {
     exceptionHandlerApp.Run(async context =>
     {


         context.Response.StatusCode = StatusCodes.Status500InternalServerError;

         // using static System.Net.Mime.MediaTypeNames;
         context.Response.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;

         await context.Response.WriteAsync("Se produjo un error.");

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

app.Run();
