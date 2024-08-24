namespace CustomersAPI.Models.CollectionSettings
{
    public class CollectionSettings
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }

        public string CollectionName { get; set; }
    }

    public static class CollectionSettingsExt
    {
        public static void AddMongoDbCollectionSettings(this IServiceCollection services,IConfiguration configuration)
        {
            services.Configure<CustomerDataCollectionSettings>(
                configuration.GetSection("MongoDbCollectionSettings:Customer")
                );
            services.Configure<BooksCollectionSettings>(
                configuration.GetSection("MongoDbCollectionSettings:Book")
                );
        }
    }

}
