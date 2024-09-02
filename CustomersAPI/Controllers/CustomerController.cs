using CustomersAPI.Code;
using CustomersAPI.Models;
using CustomersAPI.Models.Customer_Data;
using CustomersAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService customerService;

        public CustomerController(CustomerService customerService)
        {
            this.customerService = customerService;
        }

        [HttpGet("api/v1/customers")]
        public async Task<List<Customer>> GetCustomers()
        {
            return await customerService.GetAsync();
        }

        [HttpGet("api/v2/customers")]
        public IEnumerable<Customer> GetCustomers([FromQuery]XPagination xPagination)
        {
            var  customers = customerService.Get().Paginate(xPagination);
            xPagination.SetXPagination(Response);
            return customers;
        }

        [HttpGet("api/customers/types")]
        public List<string> Get()
        {
            return customerService.GetCustomerTypes();
        }

    }
}
