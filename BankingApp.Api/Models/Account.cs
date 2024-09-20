using Users;

namespace Accounts{
    public class Account
    {
        public int Id { get; set; }
        public string AccountNumber { get; set; }
        public decimal Balance { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<Transaction> Transactions { get; set; }
    }
}