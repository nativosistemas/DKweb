using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using DKweb.Models;
using DKweb.Codigo;

namespace DKweb.Controllers;

public class serviciosController : Controller
{
    private readonly ILogger<serviciosController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public serviciosController(ILogger<serviciosController> logger, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    public async Task<IActionResult> Index()
    {
        var uriBuilder = new UriBuilder(Request.Scheme, Request.Host.Host, Request.Host.Port ?? -1);
        if (uriBuilder.Uri.IsDefaultPort)
        {
            uriBuilder.Port = -1;
        }

        var baseUri = uriBuilder.Uri.AbsoluteUri;
        return View();
    }
    public async Task<IActionResult> generar_archivo(string factura)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        string pathNameFile = DKbase.Util.generar_archivo(oCliente, factura);
        if (!string.IsNullOrEmpty(pathNameFile))
        {
            try
            {
                string contentType;
                new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider().TryGetContentType(pathNameFile, out contentType);
                contentType = contentType ?? "application/octet-stream";
                string Content_Disposition = "attachment; filename=" + factura + ".txt";
                byte[] bites = System.IO.File.ReadAllBytes(pathNameFile);
                Response.Headers.Add("Content-Disposition", Content_Disposition);
                return File(bites, contentType);
            }
            catch (Exception ex)
            {
                DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
                return BadRequest();
            }
        }
        return NotFound();
    }
    public async Task<IActionResult> generar_factura_csv(string factura)
    {
        DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
        string pathNameFile = DKbase.Util.generar_factura_csv(oCliente, factura);
        if (!string.IsNullOrEmpty(pathNameFile))
        {
            try
            {
                string contentType;
                new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider().TryGetContentType(pathNameFile, out contentType);
                contentType = contentType ?? "application/octet-stream";
                string Content_Disposition = "attachment; filename=" + factura + ".csv";
                byte[] bites = System.IO.File.ReadAllBytes(pathNameFile);
                Response.Headers.Add("Content-Disposition", Content_Disposition);
                return File(bites, contentType);
            }
            catch (Exception ex)
            {
                DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
                return BadRequest();
            }
        }
        return NotFound();
    }
    public async Task<IActionResult> descargarArchivo(string t, string n, string inline)
    {
        string tipo = t;
        string name = n;
        string Content_Disposition = string.Empty;
        if (!string.IsNullOrWhiteSpace(inline))
        {
            Content_Disposition = "inline";
        }
        if (!string.IsNullOrEmpty(tipo) && !string.IsNullOrEmpty(name))
        {
            try
            {
                if (tipo == "catalogo")
                {
                    DKbase.web.capaDatos.capaRecurso_base.spRatingArchivos(tipo, name);
                }
                string nombreArchivo = name;
                String path = System.IO.Path.Combine(DKbase.Helper.getFolder, "archivos", tipo, nombreArchivo);
                string contentType;
                new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider().TryGetContentType(path, out contentType);
                contentType = contentType ?? "application/octet-stream";
                if (string.IsNullOrWhiteSpace(Content_Disposition))
                {
                    Content_Disposition = "attachment; filename=" + name;
                }
                byte[] bites = System.IO.File.ReadAllBytes(path);
                Response.Headers.Add("Content-Disposition", Content_Disposition);
                return File(bites, contentType);
            }
            catch (Exception ex)
            {
                DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
                return BadRequest();//ex.Message
            }
        }
        return NotFound();
    }
    public async Task<IActionResult> thumbnail(string r, string n, string an, string al, string c, string re)
    {
        var os = Environment.OSVersion;
        if (os.Platform == PlatformID.Unix)
        {
            return await thumbnail_unix(r, n, an, al, c, re);
        }
        else
        {
            return await thumbnail_original(r, n, an, al, c, re);
        }
    }
    public async Task<IActionResult> thumbnail_original(string r, string n, string an, string al, string c, string re)
    {

        string ruta = r;//Request.QueryString["r"];
        string nombre = n;//Request.QueryString["n"];
        string strAncho = an;// Request.QueryString["an"];
        string strAlto = al;//Request.QueryString["al"];
        string strColor = string.Empty;
        string Content_Disposition = string.Empty;
        if (!string.IsNullOrWhiteSpace("inline"))
        {
            Content_Disposition = "inline";
        }
        if (c != null)
        {
            if (c.Trim() != string.Empty)
            {
                strColor = "#" + c;
            }
        }
        bool boolAlto = false;
        if (re != null)
        {
            boolAlto = true;
        }
        System.Drawing.Image oImg = DKbase.web.cThumbnail_base.obtenerImagen(ruta, nombre, strAncho, strAlto, strColor, boolAlto);
        if (oImg != null)
        {
            Byte[] b = ImageToByteArray(oImg);
            return File(b, "image/jpeg");
        }
        return Ok("");
    }
    public async Task<IActionResult> thumbnail_unix(string r, string n, string an, string al, string c, string re)
    {

        string ruta = r;//Request.QueryString["r"];
        string nombre = n;//Request.QueryString["n"];
        string strAncho = an;// Request.QueryString["an"];
        string strAlto = al;//Request.QueryString["al"];
        string strColor = string.Empty;
        string Content_Disposition = string.Empty;
        if (!string.IsNullOrWhiteSpace("inline"))
        {
            Content_Disposition = "inline";
        }
        if (c != null)
        {
            if (c.Trim() != string.Empty)
            {
                strColor = "#" + c;
            }
        }
        bool boolAlto = false;
        if (re != null)
        {
            boolAlto = true;
        }
        //
        string RutaCompleta = Path.Combine(DKbase.Helper.getFolder, "archivos", ruta);
        string RutaCompletaNombreArchivo = Path.Combine(RutaCompleta, nombre);
        if (System.IO.File.Exists(RutaCompletaNombreArchivo) && DKbase.web.generales.Validaciones_base.IsNumeric(strAncho) && DKbase.web.generales.Validaciones_base.IsNumeric(strAlto))
        {
            try
            {
                System.Drawing.Color objColor;
                if (strColor != string.Empty)
                {
                    objColor = System.Drawing.ColorTranslator.FromHtml(strColor);
                }
                else
                {
                    objColor = System.Drawing.Color.Empty;//Color.White;
                }
                string[] listaParteNombre = nombre.Split('.');
                string CacheNombreArchivo = string.Empty;
                string CacheExtencionArchivo = string.Empty;
                for (int i = 0; i < listaParteNombre.Length - 1; i++)
                {
                    CacheNombreArchivo += listaParteNombre[i];
                }
                CacheExtencionArchivo = listaParteNombre[listaParteNombre.Length - 1];
                string ChacheRutaDeImagenRedimencionada = Path.Combine(RutaCompleta, "resize");
                string ChacheRutaYNombreArchivoRedimencionado = Path.Combine(ChacheRutaDeImagenRedimencionada, CacheNombreArchivo + "_" + strAncho + "x" + strAlto + "_" + boolAlto.ToString() + "_" + strColor + "." + CacheExtencionArchivo);
                if (System.IO.File.Exists(ChacheRutaYNombreArchivoRedimencionado))
                {
                    string contentType;
                    new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider().TryGetContentType(ChacheRutaYNombreArchivoRedimencionado, out contentType);
                    contentType = contentType ?? "application/octet-stream";
                    if (string.IsNullOrWhiteSpace(Content_Disposition))
                    {
                        Content_Disposition = "attachment; filename=" + nombre;
                    }
                    byte[] bites = System.IO.File.ReadAllBytes(ChacheRutaYNombreArchivoRedimencionado);
                    Response.Headers.Add("Content-Disposition", Content_Disposition);
                    return File(bites, contentType);
                }
            }
            catch (Exception ex)
            {
                DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now, ruta, nombre, strAncho, strAlto, strColor, boolAlto);
            }
        }
        return null;
    }
    public byte[] ImageToByteArray(System.Drawing.Image imageIn)
    {
        MemoryStream ms = new MemoryStream();
        imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
        return ms.ToArray();
    }

    public async Task<IActionResult> generarCSV(string t)
    {
        string tipo = t;
        string nombreTXT = null;
        if (tipo != null)
        {
            DKbase.web.capaDatos.cClientes oCliente = DKweb.Codigo.Util.getSessionCliente(_httpContextAccessor);
            switch (tipo)
            {
                case "deudaVencida":
                    List<DKbase.dll.cCtaCteMovimiento> l_1 = DKweb.Codigo.Util.deudaVencida(_httpContextAccessor);
                    if (l_1 != null)
                    {
                        nombreTXT = DKbase.Util.getDeudaVencidaCSV(oCliente, l_1, DKbase.generales.Constantes.cDeudaVencida);
                    }
                    break;
                case "saldoSinImputar":
                    List<DKbase.dll.cCtaCteMovimiento> l_2 = DKweb.Codigo.Util.saldoSinImputar(_httpContextAccessor);
                    if (l_2 != null)
                    {
                        nombreTXT = DKbase.Util.getDeudaVencidaCSV(oCliente, l_2, DKbase.generales.Constantes.cSaldoSinImputar);
                    }
                    break;
                case "ObraSocialEntreFechas":
                    List<DKbase.dll.cConsObraSocial> l_3 = DKweb.Codigo.Util.ObrasSociales_EntreFechas(_httpContextAccessor);
                    if (l_3 != null)
                    {
                        nombreTXT = DKbase.Util.getObraSocialEntreFechasCSV(oCliente, l_3);
                    }
                    break;
                case "ConsultaDeComprobantesEntreFecha":
                    List<DKbase.dll.cComprobanteDiscriminado> l_4 = DKweb.Codigo.Util.ConsultaDeComprobantes_ComprobantesEntreFecha(_httpContextAccessor);
                    if (l_4 != null)
                    {
                        nombreTXT = DKbase.Util.getConsultaDeComprobantesEntreFechaCSV(oCliente, l_4);
                    }
                    break;
                default:
                    break;
            }

            if (nombreTXT != string.Empty)
            {
                /*   String path = Constantes.cRaizArchivos + @"/archivos/csv/" + nombreTXT;

                   System.IO.FileInfo toDownload = new System.IO.FileInfo(path);

                   if (toDownload.Exists)
                   {
                       Response.Clear();
                       Response.AddHeader("Content-Disposition", "attachment; filename=" + toDownload.Name);
                       Response.AddHeader("Content-Length", toDownload.Length.ToString());
                       Response.ContentType = "application/octet-stream";
                       Response.WriteFile(Constantes.cRaizArchivos + @"/archivos/csv/" + nombreTXT);
                       Response.End();
                   }*/
                //string nombreArchivo = name;
                String path = System.IO.Path.Combine(DKbase.Helper.getFolder, "archivos", "csv", nombreTXT);
                string contentType;
                new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider().TryGetContentType(path, out contentType);
                contentType = contentType ?? "application/octet-stream";
                string Content_Disposition = "attachment; filename=" + nombreTXT;
                byte[] bites = System.IO.File.ReadAllBytes(path);
                Response.Headers.Add("Content-Disposition", Content_Disposition);
                return File(bites, contentType);
            }
        }
        return NotFound();
    }
    public async Task<IActionResult> generar_archivoPdf(string tipo, string nro)
    {
        string Content_Disposition = string.Empty;
        string nombrePDF = tipo + "_" + nro + ".pdf";
        String path = System.IO.Path.Combine(DKbase.Helper.getArchivo_ImpresionesComprobante, nombrePDF);
        try
        {
            System.IO.FileInfo toDownload = new System.IO.FileInfo(path);
            if (!toDownload.Exists)
            {
                DKbase.Util.ImprimirComprobante(tipo, nro);
            }
            string contentType;
            new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider().TryGetContentType(path, out contentType);
            contentType = contentType ?? "application/octet-stream";
            if (string.IsNullOrWhiteSpace(Content_Disposition))
            {
                Content_Disposition = "attachment; filename=" + nombrePDF;
            }
            byte[] bites = System.IO.File.ReadAllBytes(path);
            Response.Headers.Add("Content-Disposition", Content_Disposition);
            return File(bites, contentType);
        }
        catch (Exception ex)
        {
            DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
            return BadRequest();
        }
        return NotFound();
    }

    public async Task<IActionResult> generar_comprobantes_discriminado()
    {
        string rutaTemporal = System.IO.Path.Combine(DKbase.Helper.getFolder, "archivos", "comprobantes");
        string Content_Disposition = string.Empty;
        DirectoryInfo DIR = new DirectoryInfo(rutaTemporal);
        if (!DIR.Exists)
        {
            DIR.Create();
        }
        string nombreTXT = DKweb.Codigo.Util.GrabarComprobantesDiscriminadoCSV(_httpContextAccessor, rutaTemporal);
        if (!string.IsNullOrEmpty(nombreTXT))
        {
            try
            {
                string pathAndFile = System.IO.Path.Combine(rutaTemporal, nombreTXT);
                string contentType;
                new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider().TryGetContentType(pathAndFile, out contentType);
                contentType = contentType ?? "application/octet-stream";
                if (string.IsNullOrWhiteSpace(Content_Disposition))
                {
                    Content_Disposition = "attachment; filename=" + nombreTXT;
                }
                byte[] bites = System.IO.File.ReadAllBytes(pathAndFile);
                Response.Headers.Add("Content-Disposition", Content_Disposition);
                return File(bites, contentType);
            }
            catch (Exception ex)
            {
                DKbase.generales.Log.LogError(System.Reflection.MethodBase.GetCurrentMethod(), ex, DateTime.Now);
                return BadRequest();
            }
        }
        return NotFound();
    }



}
