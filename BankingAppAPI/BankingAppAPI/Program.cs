using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure the DbContext with Npgsql (PostgreSQL)
builder.Services.AddDbContext<DbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Controllers
builder.Services.AddControllers();

var app = builder.Build();


app.UseAuthentication(); // Ensure authentication is added before authorization
app.UseAuthorization();

app.MapControllers();

app.Run();
