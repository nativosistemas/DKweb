namespace DKweb.AuthorizationHandlers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

public class ClientePedidosHandler : AuthorizationHandler<ClientePedidos>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ClientePedidos requirement)
    {
        var cliEstadoClaim = context.User.FindFirst("cli_estado");
        if (cliEstadoClaim != null)
        {
            var cliEstadoValue = cliEstadoClaim.Value;

            if (cliEstadoValue == requirement.State)
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}