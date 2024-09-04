using CustomersAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleService roleService;

        public RoleController(RoleService roleService)
        {
            this.roleService = roleService;
        }
    }
}
