namespace DKweb.AuthorizationHandlers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

public class PermisoRequisito : IAuthorizationRequirement
{
    public string Permiso { get; }

    public PermisoRequisito(string pPermiso)
    {
        Permiso = pPermiso;
    }
}
