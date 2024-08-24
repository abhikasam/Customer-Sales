
using CustomersAPI.Models.CollectionSettings;
using CustomersAPI.Services;
using MongoDB.Bson.Serialization.Conventions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CustomersAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

            builder.Services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });

            ConventionRegistry.Register("CamelCase",new ConventionPack()
            {
                new CamelCaseElementNameConvention()
            },_=> true);

            builder.Services.Configure<CustomerDataCollectionSettings>(
                builder.Configuration.GetSection("MongoDbCollectionSettings:Customer")
                );

            builder.Services.AddMongoDbCollectionServices();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
