using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BankingAppAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Configure the DbContext with Npgsql (PostgreSQL)
builder.Services.AddDbContext<BankingDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Allow CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Change this to match your frontend URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container
builder.Services.AddControllers();

// Add Authentication if you plan on using it
builder.Services.AddAuthentication(); // Configure your authentication here

var app = builder.Build();

// Apply CORS policy
app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline
app.UseAuthentication(); // Use Authentication before Authorization
app.UseAuthorization();

app.MapControllers();

app.Run();
