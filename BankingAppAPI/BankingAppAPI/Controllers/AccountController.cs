using Microsoft.AspNetCore.Mvc;
using BankingAppAPI.Data;
using BankingAppAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BankingAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly BankingDbContext _context;

        public AccountController(BankingDbContext context)
        {
            _context = context;
        }

        // GET ALL ACCOUNTS
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            var accounts = await _context.Accounts.ToListAsync();
            return Ok(accounts); // Return 200 OK with the list of accounts
        }

        // GET ACCOUNT BY ID
        [HttpGet("{id}")] // Clear route for getting account by ID
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound(); // Return 404 if account not found
            }

            return Ok(account); // Return 200 OK with the account details
        }

        // GET ACCOUNTS BY USER ID
        [HttpGet("user/{userId}")] // New route for getting accounts by user ID
        public async Task<ActionResult<IEnumerable<Account>>> GetAccountsByUserId(int userId)
        {
            var accounts = await _context.Accounts.Where(a => a.UserId == userId).ToListAsync();

            if (accounts == null || !accounts.Any())
            {
                return NotFound("No accounts found for this user."); // Return 404 if no accounts found
            }

            return Ok(accounts); // Return 200 OK with the list of accounts for the user
        }

        // ADD ACCOUNT
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            if (account == null)
            {
                return BadRequest("Account is null."); // Handle null input
            }

            // Optionally: Check if the UserId exists
            var userExists = await _context.Users.AnyAsync(u => u.Id == account.UserId);
            if (!userExists)
            {
                return NotFound("User not found."); // Return 404 if user does not exist
            }

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            // Return 201 Created with a link to the new resource
            return CreatedAtAction(nameof(GetAccount), new { id = account.Id }, account);
        }
    }
}
