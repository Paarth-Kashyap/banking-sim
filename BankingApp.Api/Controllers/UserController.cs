using Microsoft.AspNetCore.Mvc;
using Users;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult TestUser()
    {
        User user = new User
        {
            Username = "testUser",
            Password = "testPassword"
        };

        return Ok(new { Username = user.Username, Password = user.Password });
    }
}
