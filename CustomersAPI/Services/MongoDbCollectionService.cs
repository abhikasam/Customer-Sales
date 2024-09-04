namespace CustomersAPI.Services
{
    public static class MongoDbCollectionService
    {
        public static void AddMongoDbCollectionServices(this IServiceCollection services)
        {
            services.AddScoped<CustomerService>();
            services.AddScoped<BookService>();
            services.AddScoped<AuthService>();
            services.AddScoped<RoleService>();
        }
    }
}
