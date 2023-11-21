namespace DKweb.AuthorizationHandlers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

public class AdminRequisitoHandler : AuthorizationHandler<AdminRequisito>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminRequisito requirement)
    {
        
        if (context.User.HasClaim(c => c.Type == ClaimTypes.Role))
        {
            var IdRol = Convert.ToInt32(context.User.FindFirst(c => c.Type == ClaimTypes.Role).Value);

            if (IdRol == requirement.IdRol)
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}