using Microsoft.AspNetCore.Mvc;
using CalChatAPI.Models;

namespace CalChatAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(new[]
            {
                new { Id = 1, Name = "Nehi", Email = "nehipatel@gmail.com" }
            });
        }
    }
}