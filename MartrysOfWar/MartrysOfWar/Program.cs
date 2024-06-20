using BL;
using BL.Services;
using DL;
using DL.Models;
using Entities;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
// Add services to the container.
builder.Services.AddCors(opt => opt.AddPolicy("MyPolicy", policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
}));

builder.Services.AddControllers();
builder.Services.AddScoped<IUserBL, UserBL>();
builder.Services.AddScoped<IUserDL, UserDL>();
builder.Services.AddScoped<IMemoryBL, MemoryBL>();
builder.Services.AddScoped<IMemoryDL, MemoryDL>();
builder.Services.AddScoped<IPictureBL, PictureBL>();
builder.Services.AddScoped<IPictureDL, PictureDL>();
builder.Services.AddScoped<ISoldierBL, SoldierBL>();
builder.Services.AddScoped<ISoldierDL, SoldierDL>();
builder.Services.AddScoped<IRecipyBL, RecipyBL>();
builder.Services.AddScoped<IRecipyDL, RecipyDL>();
builder.Services.AddScoped<ITehilimBL, TehilimBL>();
builder.Services.AddScoped<ITehilimDL, TehilimDL>();
builder.Services.AddScoped<IPreparationBL, PreparationBL>();
builder.Services.AddScoped<IPreparationDL, PreparationDL>();
builder.Services.AddScoped<IPersonalVolunteeringBL, PersonalVolunteeringBL>();
builder.Services.AddScoped<IPersonalVolunteeringDL, PersonalVolunteeringDL>();
builder.Services.AddScoped<IVolunteeringBL, VolunteeringBL>();
builder.Services.AddScoped<IVolunteeringDL, VolunteeringDL>();
builder.Services.AddScoped<IVolunteeringOptionBL, VolunteeringOptionBL>();
builder.Services.AddScoped<IVolunteeringOptionDL, VolunteeringOptionDL>();
builder.Services.AddScoped<IProductsToRecipeBL, ProductsToRecipeBL>();
builder.Services.AddScoped<IProductsToRecipeDL, ProductsToRecipeDL>();
builder.Services.AddScoped<IApiServiceBL, ApiServiceBL>();
builder.Services.AddScoped<IApiServiceDL, ApiServiceDL>();
builder.Services.AddHttpClient<ApiServiceBL>();

// Configure FormOptions
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 6000000; // Set new limit in bytes
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(AutoMapping));
builder.Services.AddControllers()
    .AddXmlSerializerFormatters() // Add support for XML format
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null; // In this example, we will use upper case naming policy
    });

// Update the connection string and use MySQL
builder.Services.AddDbContext<MartyrsofwarContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("MartrysOfWarContext"),
        new MySqlServerVersion(new Version(8, 0, 21))));

var app = builder.Build();

app.UseCors("MyPolicy");

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "EmployeeServer API is running!");

app.Run();
