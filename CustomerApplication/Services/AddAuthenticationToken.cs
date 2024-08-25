using Azure.Core;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace CustomerApplication.Services
{
    public class AddAuthenticationToken : DelegatingHandler
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public AddAuthenticationToken(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage httpRequestMessage,CancellationToken cancellation)
        {
            var token = httpContextAccessor.HttpContext.Session.GetString("AccessToken");
            if (string.IsNullOrEmpty(token) && httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                // Token is missing or expired; prompt for login
                await httpContextAccessor.HttpContext.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme);
                token = httpContextAccessor.HttpContext.Session.GetString("AccessToken");
            }
            httpRequestMessage.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            return await base.SendAsync(httpRequestMessage, cancellation);
        }

    }
}
