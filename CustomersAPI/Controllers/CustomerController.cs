using CustomersAPI.Models.Customer_Data;
using CustomersAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService customerService;

        public CustomerController(CustomerService customerService)
        {
            this.customerService = customerService;
        }

        [HttpGet]
        public async Task<List<Customer>> GetCustomers()
        {
            return await customerService.GetAsync();
        }
    }
}
