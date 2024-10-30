using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace BankingAppAPI.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public List<Account> Accounts { get; set; } = new List<Account>();

        [StringLength(50, MinimumLength = 2)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(50, MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;
    }
}
