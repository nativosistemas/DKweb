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
    //[Authorize]
    public IActionResult thumbnail(string r, string n, string an, string al, string c, string re)
    {

        string ruta = r;//Request.QueryString["r"];
        string nombre = n;//Request.QueryString["n"];
        string strAncho = an;// Request.QueryString["an"];
        string strAlto = al;//Request.QueryString["al"];
        string strColor = string.Empty;
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
    public byte[] ImageToByteArray(System.Drawing.Image imageIn)
    {
        MemoryStream ms = new MemoryStream();
        imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
        return ms.ToArray();
    }

}
