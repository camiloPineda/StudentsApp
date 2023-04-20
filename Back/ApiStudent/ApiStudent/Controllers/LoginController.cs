using ApiStudent.Auth;
using ApiStudent.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiStudent.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IJwtAuthenticationService _jwtAuthentication;

        public LoginController(ILogger<LoginController> logger, IJwtAuthenticationService jwtAuthentication)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _jwtAuthentication = jwtAuthentication;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var token = _jwtAuthentication.Authenticate(login.Username, login.Password);

                if (token == null)
                {
                    return Unauthorized();
                }
                return Ok(token);
            }
        }
    }
}
