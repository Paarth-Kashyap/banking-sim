using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BankingAppAPI.Data;
using BankingAppAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BankingAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Ensure only authenticated users can access this controller
    public class AccountController : ControllerBase
    {
        private readonly BankingDbContext _context;

        public AccountController(BankingDbContext context)
        {
            _context = context;
        }

        // Helper method to get the logged-in user's ID
        private int GetLoggedInUserId() =>
            int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        // GET: api/account/user (Get all accounts for the logged-in user)
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<Account>>> GetUserAccounts()
        {
            var userId = GetLoggedInUserId();
            var userAccounts = await _context.Accounts
                .Where(a => a.UserId == userId)
                .ToListAsync();

            return Ok(userAccounts);
        }

        // POST: api/account (Create a new account for the logged-in user)
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            if (account == null) return BadRequest("Account data is missing.");

            account.UserId = GetLoggedInUserId();
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserAccounts), new { id = account.Id }, account);
        }
    }
}
