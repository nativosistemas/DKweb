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
    public IActionResult Index()
    {

        return View();
    }
    public IActionResult descargarArchivo(string t, string n, string inline)
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
    public IActionResult thumbnail(string r, string n, string an, string al, string c, string re)
    {
        var os = Environment.OSVersion;
        if (os.Platform == PlatformID.Unix)
        {
            return thumbnail_unix(r, n, an, al, c, re);
        }
        else
        {
            return thumbnail_original(r, n, an, al, c, re);
        }
    }
    public IActionResult thumbnail_original(string r, string n, string an, string al, string c, string re)
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
    public IActionResult thumbnail_unix(string r, string n, string an, string al, string c, string re)
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

}
