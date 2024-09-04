using CustomersAPI.Models.Role;
using CustomersAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService authService;
        private readonly RoleService roleService;

        public AuthController(AuthService authService, RoleService roleService)
        {
            this.authService = authService;
            this.roleService = roleService;
        }

        [HttpPost("/api/auth/currentUser")]
        public IActionResult Post()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = new User()
                {
                    UserName = User.Claims.FirstOrDefault(i => i.Type == "preferred_username").Value,
                    FullName = User.Claims.FirstOrDefault(i => i.Type == "name").Value
                };
                authService.addUser(user);  
            }
            return Ok();
        }

        [HttpGet("/api/auth/users")]
        public IActionResult Get()
        {
            return Ok(authService.GetUsers());
        }

        [HttpPut("/api/user/{username}/roles/{roles}")]
        public IActionResult Put(string username, string roles)
        {
            var roleList = roles.ToUpper().Split(",");
            roleService.AddRoles(username, roleList);
            return Ok();
        }

        [HttpGet("/api/user/{username}")]
        public IActionResult Get(string username)
        {
            return Ok(roleService.Get(username).Select(i=>i.RoleName).ToList());
        }

        [HttpDelete("/api/user/{username}/roles/{roles}")]
        public IActionResult Delete(string username,string roles)
        {
            var roleList = roles.ToUpper().Split(",");
            roleService.DeleteRoles(username, roleList);
            return Ok();
        }

    }
}
