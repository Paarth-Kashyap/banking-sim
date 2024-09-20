using Accounts;

namespace Transactions{
    public class Transaction
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int FromAccountId { get; set; }
        public int ToAccountId { get; set; }
        public Account FromAccount { get; set; }
        public Account ToAccount { get; set; }
    }
}