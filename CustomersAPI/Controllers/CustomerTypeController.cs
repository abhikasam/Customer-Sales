using CustomersAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerTypeController : ControllerBase
    {
        private readonly CustomerService customerService;

        public CustomerTypeController(CustomerService customerService)
        {
            this.customerService = customerService;
        }

        [HttpGet]
        public List<string> Get()
        {
            return customerService.GetCustomerTypes();
        }
    }
}
