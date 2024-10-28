using System.ComponentModel.DataAnnotations; // For attributes like [Required], [Key], etc.
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingAppAPI.Models
{
    public class Transaction
    {
        [Key] // Marks the Id as the primary key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generates the Id upon insert
        public int Id { get; set; }
        public decimal Amount { get; set; } = 0;
        public DateTime Date { get; set; }
        
        // Foreign key reference to Account

         // Foreign key reference to User
        [Required] // Ensures UserId cannot be null
        [ForeignKey("AccountId")] // Sets up foreign key relationship to User entity
        public int AccountId { get; set; }
        public required Account Account { get; set; }
    }
}
