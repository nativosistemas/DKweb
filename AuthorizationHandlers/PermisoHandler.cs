namespace DKweb.AuthorizationHandlers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

public class PermisoRequisitoHandler : AuthorizationHandler<PermisoRequisito>
{
    IHttpContextAccessor _httpContextAccessor = null;

    public PermisoRequisitoHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermisoRequisito requirement)
    {
        bool result = false;
        if (!string.IsNullOrEmpty(requirement.Permiso))
        {
            switch (requirement.Permiso)
            {
                case "PEDIDOS":
                    result = isResultClaim(context.User.FindFirst("isPEDIDOS"));
                    break;
                case "CUENTASCORRIENTES":
                    result = isResultClaim(context.User.FindFirst("isCUENTASCORRIENTES"));
                    break;
                case "DEVOLUCIONES":
                    result = isResultClaim(context.User.FindFirst("isDEVOLUCIONES"));
                    break;
                case "DESCARGAS":
                    result = isResultClaim(context.User.FindFirst("isDESCARGAS"));
                    break;
                default:
                    break;
            }
        }
        if (result)
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
    public bool isResultClaim(Claim? pValue)
    {
        bool result = false;
        if (pValue != null)
        {
            result = Convert.ToBoolean(pValue.Value);
        }
        return result;
    }
}
/*public class PermisoDevolucionesHandler : AuthorizationHandler<PermisoRequisito>
{
    IHttpContextAccessor _httpContextAccessor = null;

    public PermisoDevolucionesHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermisoRequisito requirement)
    {

        var isDEVOLUCIONES = context.User.FindFirst("isDEVOLUCIONES");
        if (isDEVOLUCIONES != null)
        {
            if (Convert.ToBoolean(isDEVOLUCIONES.Value))
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}
public class PermisoCuentasCorrientesHandler : AuthorizationHandler<PermisoRequisito>
{
    IHttpContextAccessor _httpContextAccessor = null;

    public PermisoCuentasCorrientesHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermisoRequisito requirement)
    {

        var isCUENTASCORRIENTES = context.User.FindFirst("isCUENTASCORRIENTES");
        if (isCUENTASCORRIENTES != null)
        {
            if (Convert.ToBoolean(isCUENTASCORRIENTES.Value))
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}
public class PermisoDescargasHandler : AuthorizationHandler<PermisoRequisito>
{
    IHttpContextAccessor _httpContextAccessor = null;

    public PermisoDescargasHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermisoRequisito requirement)
    {

        var isDESCARGAS = context.User.FindFirst("isDESCARGAS");
        if (isDESCARGAS != null)
        {
            if (Convert.ToBoolean(isDESCARGAS.Value))
            {
                context.Succeed(requirement);
            }
        }
        return Task.CompletedTask;
    }
}*/