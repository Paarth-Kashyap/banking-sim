
namespace Users{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }

        private string _password;
        public string Password
        {
            get { return _password; }
            set { _password = HashPassword(value); } // Hash before storing
        }

        private string HashPassword(string password)
        {
            // Implement password hashing here
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}