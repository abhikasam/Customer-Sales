namespace CustomersAPI.Services
{
    public static class MongoDbCollectionService
    {
        public static void AddMongoDbCollectionServices(this IServiceCollection services)
        {
            services.AddSingleton<CustomerService>();
            services.AddSingleton<BookService>();
        }
    }
}
