using CustomersAPI.Models.CollectionSettings;
using CustomersAPI.Models.Customer_Data;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace CustomersAPI.Services
{
    public class CustomerService
    {
        private readonly IMongoCollection<Customer> _customerCollection;
        public CustomerService(
            IOptions<CustomerDataCollectionSettings> options
            ) {
            var mongoClient=new MongoClient(options.Value.ConnectionString);
            var database = mongoClient.GetDatabase(options.Value.DatabaseName);
            _customerCollection = database.GetCollection<Customer>(options.Value.CollectionName);
        }

        public async Task<List<Customer>> GetAsync()
        {
            return await _customerCollection.Find(_=> true).ToListAsync();
        }

    }
}
