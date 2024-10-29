using System.ComponentModel.DataAnnotations; // For attributes like [Required], [Key], etc.
using System.ComponentModel.DataAnnotations.Schema; // For attributes like [DatabaseGenerated]


namespace BankingAppAPI.Models{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }


}
