using System.ComponentModel.DataAnnotations; // For attributes like [Required], [Key], etc.
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingAppAPI.Models
{
    public class Transaction
    {
        [Key] // Marks the Id as the primary key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generates the Id upon insert
        public int Id { get; set; }

        [Required] // Ensures Amount cannot be null
        [Column(TypeName = "decimal(18,2)")] // Defines precision and scale for decimal in the database
        public decimal Amount { get; set; }
        
        public DateTime Date { get; set; } = DateTime.UtcNow; //date and time now
        
        [Required] 
        public int FromAccountId { get; set; }
        [Required] 
        public int ToAccountId { get; set; }

        // Foreign key to reference the User initiating the transaction
        [Required]
        public int UserId { get; set; }
    }
}
