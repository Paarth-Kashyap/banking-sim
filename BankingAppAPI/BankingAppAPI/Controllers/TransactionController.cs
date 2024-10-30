using Microsoft.AspNetCore.Mvc;
using BankingAppAPI.Data;
using BankingAppAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

        // Helper method to get the logged-in user's ID
        private int GetLoggedInUserId() =>
            int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        // get all transactions of logged in user GET: api/transaction/user
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetUserTransactions()
        {
            var userId = GetLoggedInUserId();
            Console.WriteLine("userId");

            var userTransactions = await _context.Transactions
                        .Where(t => t.UserId == userId)
                        .ToListAsync();
            return Ok(userTransactions); // Return 200 OK with the list of transactions
        }

        

        // ADD TRANSACTION POST: api/transaction
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {

            if (transaction == null)
            {
                return BadRequest("Transaction is null."); // Handle null input
            }

            

            // Set the UserId to the logged-in user's ID
            transaction.UserId = GetLoggedInUserId();

            // Check if both FromAccountId and ToAccountId exist
            var fromAccount = await _context.Accounts.FindAsync(transaction.FromAccountId);
            var toAccount = await _context.Accounts.FindAsync(transaction.ToAccountId);

            if (fromAccount == null || toAccount == null)
            {
                return NotFound("One or both accounts do not exist."); // Return 404 if accounts are not found
            }
            // Check if FromAccount has enough balance
            if (fromAccount.Balance < transaction.Amount)
            {
                return BadRequest("Insufficient funds in the from account."); // Return 400 if balance is insufficient
            }

            // Deduct the amount from the fromAccount balance
            fromAccount.Balance -= transaction.Amount;

            // Add the amount to the toAccount balance
            toAccount.Balance += transaction.Amount;
            // Create debit transaction (for fromAccount)
            var debitTransaction = new Transaction
            {
                FromAccountId = transaction.FromAccountId,
                ToAccountId = transaction.ToAccountId, // Set this to a placeholder or null if not applicable
                Amount = -transaction.Amount, // Debit entry
                UserId = transaction.UserId,
                Date = DateTime.UtcNow // Add timestamp
            };


            var creditUserId = _context.Accounts.Where(a => a.Id == transaction.ToAccountId).Select(a => a.UserId).FirstOrDefault();
            // Create credit transaction (for toAccount)
            var creditTransaction = new Transaction
            {
                FromAccountId = transaction.FromAccountId, // Set this to a placeholder or null if not applicable
                ToAccountId = transaction.ToAccountId,
                Amount = transaction.Amount, // Credit entry
                UserId = creditUserId,
                Date = DateTime.UtcNow // Add timestamp
            };

            // Add both transactions to the context
            _context.Transactions.Add(debitTransaction);
            _context.Transactions.Add(creditTransaction);

            // Update the account balances in the context
            _context.Accounts.Update(fromAccount);
            _context.Accounts.Update(toAccount);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return 201 Created with a link to the new resource
            return CreatedAtAction(nameof(GetUserTransactions), new { id = debitTransaction.Id }, debitTransaction);
        }

    }
}
