using CustomerApplication.Models.Customer_Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace CustomerApplication.Pages
{
    [Authorize]
    public class PrivacyModel : PageModel
    {
        private readonly ILogger<PrivacyModel> _logger;
        private readonly HttpClient httpClient;

        public PrivacyModel(ILogger<PrivacyModel> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            this.httpClient = httpClientFactory.CreateClient("authClient");
        }

        [BindProperty]
        public List<Customer> Customers { get; set; } = new();

        [BindProperty]
        public List<string> Authors { get; set; } = new();

        public async Task OnGet()
        {
            var responseMessage = await httpClient.GetAsync("https://localhost:7245/api/Customer");
            var response = await responseMessage.Content.ReadAsStringAsync();
            this.Customers = JsonConvert.DeserializeObject<List<Customer>>(response);

            var requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://localhost:7245/api/Author");
            responseMessage=await httpClient.SendAsync(requestMessage);
            response = await responseMessage.Content.ReadAsStringAsync();
            this.Authors = JsonConvert.DeserializeObject<List<string>>(response);
        }
    }

}
