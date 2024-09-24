/*
This file is the central place for managing connections 
to DB and defining the tables that will be used in the database.
*/

using Microsoft.EntityFrameworkCore;


//create the class that will be used to interact with the database (CRUD Operations)
public class BankingContext : DbContext{

    //constructor to pass the base options
    public BankingContext(DbContextOptions<BankingContext> options) : base(options)
    {}

    //create tables for entities that will be used in the database
    // public DbSet<Bank> Banks { get; set; }
    // public DbSet<Account> Accounts { get; set; }
    // public DbSet<Customer> Customers { get; set; }

}