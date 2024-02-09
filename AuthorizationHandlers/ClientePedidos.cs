namespace DKweb.AuthorizationHandlers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

public class ClientePedidos : IAuthorizationRequirement
{
    public string State{ get; }

    public ClientePedidos(string cState)
    {
        State = cState;
    }
}