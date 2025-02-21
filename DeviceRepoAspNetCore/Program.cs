var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        corsPolicyBuilder =>
        {
            corsPolicyBuilder.WithOrigins("http://localhost:3000") // Update with your React app's URL
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowReactApp"); // Add this line to use the CORS policy

app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();

app.Run();