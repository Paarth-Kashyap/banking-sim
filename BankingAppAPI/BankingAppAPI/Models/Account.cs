using System.ComponentModel.DataAnnotations; // For attributes like [Required], [Key], etc.
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore; // For attributes like [DatabaseGenerated]

namespace BankingAppAPI.Models
{
    [Index(nameof(Account.AccountNumber), IsUnique = true)] // Ensures AccountNumber is unique (configure in DbContext for EF Core 6+)
    public class Account
    {
        [Key] // Marks the Id as the primary key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generates the Id upon insert
        public int Id { get; set; }

        
        [StringLength(20)] // Sets a max length for AccountNumber (optional, customize as needed)
        public required string AccountNumber { get; set; }


        [Column(TypeName = "decimal(18,2)")] // Sets precision for Balance (18 total digits, 2 after decimal)
        public required decimal Balance { get; set; }

        // Foreign key reference to User
        [Required] // Ensures UserId cannot be null
        [ForeignKey("User")] // Sets up foreign key relationship to User entity
        public int UserId { get; set; }
        
        public required User User { get; set; }
    }
}
