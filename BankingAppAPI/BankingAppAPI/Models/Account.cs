using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingAppAPI.Models
{
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, StringLength(15, MinimumLength = 8)]
        public string AccountNumber { get; set; } = string.Empty;

        [Required, Range(0, double.MaxValue)]
        public double Balance { get; set; }

        [Required]
        public int UserId { get; set; } // Foreign key

        public User User { get; set; } // Non-nullable navigation property
    }
}
