using Microsoft.AspNetCore.Rewrite;

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

var app = builder.Build();

DKbase.Helper.getTipoApp = "DKweb";
DKbase.Helper.getFolder = @"C:\ArchivosSitioWEB";
DKbase.Helper.getConnectionStringSQL = builder.Configuration.GetConnectionString("ConnectionSQL");

//var optionsRewrite = new RewriteOptions()
//.AddRedirect("servicios/thumbnail", "servicios/thumbnail");
//app.UseRewriter(optionsRewrite);
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
         
             DKbase.generales.Log.grabarLog_generico("Excepción no controlada", exceptionHandlerPathFeature?.Error, DateTime.Now,string.Empty,DKbase.Helper.getTipoApp);
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

app.UseAuthorization();

app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=mvc}/{action=Index}");

app.Run();
