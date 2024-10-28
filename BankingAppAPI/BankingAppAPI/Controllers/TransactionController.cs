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
    public class TransactionController : ControllerBase
    {
        private readonly BankingDbContext _context;

        public TransactionController(BankingDbContext context)
        {
            _context = context;
        }

        // GET ALL TRANSACTIONS
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            var transactions = await _context.Transactions.ToListAsync();
            return Ok(transactions); // Return 200 OK with the list of transactions
        }

        // GET ALL TRANSACTIONS OF AN ACCOUNT USING ACCOUNT ID
        [HttpGet("account/{accountId}")] // Clear route for getting transactions by account
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionsByAccountId(int accountId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.AccountId == accountId)
                .ToListAsync();

            if (transactions == null || transactions.Count == 0)
            {
                return NotFound(); // Return 404 if no transactions found
            }

            return Ok(transactions); // Return 200 OK with the list of transactions
        }  

        // ADD TRANSACTION
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {
            if (transaction == null)
            {
                return BadRequest("Transaction is null."); // Handle null input
            }

            // Optionally: Add validation to check if the AccountId exists
            var accountExists = await _context.Accounts.AnyAsync(a => a.Id == transaction.AccountId);
            if (!accountExists)
            {
                return NotFound("Account not found."); // Return 404 if account does not exist
            }

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            // Return 201 Created with a link to the new resource
            return CreatedAtAction(nameof(GetTransactionsByAccountId), new { accountId = transaction.AccountId }, transaction);
        }
    }
}
