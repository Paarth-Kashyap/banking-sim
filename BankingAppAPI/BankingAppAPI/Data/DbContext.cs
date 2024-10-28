using Microsoft.EntityFrameworkCore;
using BankingAppAPI.Models;

namespace BankingAppAPI.Data
{
    public class BankingDbContext : DbContext
    {
        public BankingDbContext(DbContextOptions<BankingDbContext> options) : base(options)
        {
        }

        // Define a DbSet for each model that corresponds to a database table
        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        // Fluent API configuration for entity relationships and constraints
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //create users and transaction tables
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Transaction>().ToTable("Transactions");
            


            // Example: Unique constraint on AccountNumber
            modelBuilder.Entity<Account>()
                .HasIndex(a => a.AccountNumber)
                .IsUnique();

            // Example: Setting up foreign key relationship between User and Account
            modelBuilder.Entity<Account>()
                .HasOne(a => a.User) // Account has one User
                .WithMany(u => u.Accounts) // User has many Accounts
                .HasForeignKey(a => a.UserId) // Foreign key property in Account
                .OnDelete(DeleteBehavior.Cascade); // Delete accounts if user is deleted
        }
    }
}
