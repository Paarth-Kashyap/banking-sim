using BankingApp.api.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using Users;



var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

//gives access to the dto types
List<BankDto> user_info = new List<BankDto>();


//add the database context to the services
builder.Services.AddDbContext<BankingContext>(options => 
                        options.UseSqlServer(builder.Configuration.GetConnectionString("BankingContext")));

// Create a POST endpoint to test user creation
app.MapPost("/createUser", (User newUser) => 
{
    // Print the user info to the console
    Console.WriteLine($"Username: {newUser.Username}");
    Console.WriteLine($"Password: {newUser.Password}");
    return Results.Ok("User created successfully");
});

// Start the application
app.Run();

