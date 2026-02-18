using Microsoft.EntityFrameworkCore;
using CalChatAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers
builder.Services.AddControllers();

// Add Swagger (Correct way for .NET 8)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add PostgreSQL DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Debug: Print Connection String (optional)
Console.WriteLine("CONNECTION STRING:");
Console.WriteLine(builder.Configuration.GetConnectionString("DefaultConnection"));

var app = builder.Build();

// Enable Swagger (Production + Development)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "CalChat API V1");
    c.RoutePrefix = string.Empty; // Makes Swagger UI available at root "/"
});
app.MapGet("/ping", () => "API Running Successfully");


app.UseAuthorization();

app.MapControllers();

app.Run();
