using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ApiStudent.Data;
using ApiStudent.Services;
using ApiStudent.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApiStudentContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("ApiStudentContext") ?? throw new InvalidOperationException("Connection string 'ApiStudentContext' not found.")));

var key = "This is the demo key";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(key)),
                        ValidateAudience = false,
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false
                    };
                });

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddAuthorization();
builder.Services.AddSingleton<IJwtAuthenticationService>(new JwtAuthenticationService(key));
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsApi",
        builder => builder.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("CorsApi");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
