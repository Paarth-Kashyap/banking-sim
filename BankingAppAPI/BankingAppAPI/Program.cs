using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BankingAppAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Configure the DbContext with Npgsql (PostgreSQL)
builder.Services.AddDbContext<BankingDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container
builder.Services.AddControllers();

// Add Authentication if you plan on using it
builder.Services.AddAuthentication(); // Configure your authentication here

var app = builder.Build();

// Configure the HTTP request pipeline

// Use Authentication before Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
