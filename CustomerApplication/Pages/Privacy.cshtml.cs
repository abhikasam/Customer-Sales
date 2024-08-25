using CustomerApplication.Models.Customer_Data;
using Microsoft.AspNetCore.Authorization;
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

        public PrivacyModel(ILogger<PrivacyModel> logger, HttpClient httpClient)
        {
            _logger = logger;
            this.httpClient = httpClient;
        }

        [BindProperty]
        public List<Customer> Customers { get; set; } = new();
        public async Task OnGet()
        {
            HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://localhost:7245/api/Customer");
            HttpResponseMessage responseMessage = await httpClient.SendAsync(requestMessage);
            var response=await responseMessage.Content.ReadAsStringAsync();
            this.Customers = JsonConvert.DeserializeObject<List<Customer>>(response);
        }
    }

}
