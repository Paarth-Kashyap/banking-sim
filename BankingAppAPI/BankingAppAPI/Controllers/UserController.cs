using Microsoft.AspNetCore.Mvc;
using BankingAppAPI.Data;
using BankingAppAPI.Models;
using System.Collections.Generic;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace BankingAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly BankingDbContext _context;

        public UserController(BankingDbContext context)
        {
            _context = context;
        }

        // GET ALL USERS
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users); // Return 200 OK with the list of users
        }

        // GET USER BY ID
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(); // Return 404 if user not found
            }

            return Ok(user); // Return 200 OK with the user details
        }

        // ADD NEW USER
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return 201 Created with a link to the new resource
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // UPDATE USER
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            // Check if the user exists in the database
            var existingUser = await _context.Users.FindAsync(id);
            
            // If the user does not exist, return a NotFound response
            if (existingUser == null)
            {
                return NotFound(); // Return 404 if the user does not exist
            }

            // Update properties of the existing user
            existingUser.Email = user.Email;
            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            // Optionally update other properties as needed...

            // Mark the entry as modified
            _context.Entry(existingUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync(); // Save changes to the database
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(); // Return 404 if user does not exist (for safety)
                }
                else
                {
                    throw; // Re-throw exception if something else went wrong
                }
            }

            return NoContent(); // Return 204 No Content on successful update
        }


        // DELETE USER
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(); // Return 404 if user not found
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content on successful deletion
        }

       [HttpPost("login")]
        public async Task<ActionResult<User>> LoginUser([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return 400 Bad Request if the model state is invalid
            }

            // Find user by email
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            // If user is not found, return 404 Not Found
            if (user == null)
            {
                return NotFound(); // User not found
            }

            // Verify password (assuming you have hashed the password)
            if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return Unauthorized(); // Return 401 Unauthorized if password is incorrect
            }

            return Ok(user); // Return 200 OK with the user details
        }


        [HttpPost("signup")]
        public async Task<ActionResult<User>> Signup([FromBody] User userData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return 400 Bad Request if the model state is invalid
            }

            // Check if the email is already in use
            if (await _context.Users.AnyAsync(u => u.Email == userData.Email))
            {
                return Conflict(); // Return 409 Conflict if email is already in use
            }

            // Hash the password before saving to the database
            userData.Password = BCrypt.Net.BCrypt.HashPassword(userData.Password);

            //set the name
            userData.FirstName = userData.FirstName;
            userData.LastName = userData.LastName;

            _context.Users.Add(userData);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = userData.Id }, userData);
        }
        
        
        
        
        
        // Helper method to check if a user exists
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }


    }
}
