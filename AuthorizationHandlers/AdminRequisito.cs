namespace DKweb.AuthorizationHandlers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

public class AdminRequisito : IAuthorizationRequirement
{
    public int IdRol { get; }

    public AdminRequisito(int pIdRol)
    {
        IdRol = pIdRol;
    }
}
