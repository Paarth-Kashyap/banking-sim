using System.ComponentModel.DataAnnotations; // For attributes like [Required], [Key], etc.
using System.ComponentModel.DataAnnotations.Schema; // For attributes like [DatabaseGenerated]

namespace BankingAppAPI.Models // Change "YourNamespace" to your actual project namespace
{
    public class User
    {
        [Key] // Marks the Id as the primary key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generates the key upon insert
        public int Id { get; set; }

        [Required]
        [EmailAddress] // Validates as a valid email format
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }

        //accounts of users
        public List<Account> Accounts { get; set; } = new List<Account>();

        //have blank string as default--> nullable
        public string? FirstName { get; set;} = string.Empty; 
        public string? LastName { get; set; } = string.Empty;
        
    }


}
