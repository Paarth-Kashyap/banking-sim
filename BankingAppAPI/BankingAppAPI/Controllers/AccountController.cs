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

        // GET: api/account/balance/{accountNumber} (get account balance by account number)
        [HttpGet("balance/{accountNumber}")]
        public async Task<ActionResult<decimal>> GetAccountBalance(string accountNumber)
        {
            var userId = GetLoggedInUserId();
            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.AccountNumber == accountNumber && a.UserId == userId);

            if (account == null) 
                return NotFound("Account not found.");

            return Ok(account.Balance); // Return only the account balance
        }

        // GET: api/account/{accountNumber} (get if account exists in database by account number)
        [HttpGet("{accountNumber}")]
        public async Task<ActionResult<bool>> AccountExists(string accountNumber)
        {
            
            bool accountFound = await _context.Accounts
                .AnyAsync(a => a.AccountNumber == accountNumber);

            if (accountFound) 
                return Ok();
            
            return NotFound();
        }

    }
}
