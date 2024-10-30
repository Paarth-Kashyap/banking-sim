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

        // API configuration for entity relationships
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //create users and transaction tables
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Account>().ToTable("Accounts");
            modelBuilder.Entity<Transaction>().ToTable("Transactions");
            


            // Unique constraint on AccountNumber
            modelBuilder.Entity<Account>()
                .HasIndex(a => a.AccountNumber)
                .IsUnique();

            // Define one-to-many relationship between User and Account
            modelBuilder.Entity<User>()
                .HasMany(u => u.Accounts)
                .WithOne(a => a.User)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete accounts if user is deleted
        }
    }
}
