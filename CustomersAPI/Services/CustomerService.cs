using CustomersAPI.Models;
using CustomersAPI.Models.CollectionSettings;
using CustomersAPI.Models.Customer_Data;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace CustomersAPI.Services
{
    public class CustomerService
    {
        private readonly IMongoCollection<Customer> collection;
        public CustomerService(IOptions<CustomerDataCollectionSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            this.collection = database.GetCollection<Customer>(options.Value.CollectionName);
        }

        public async Task<List<Customer>> GetAsync()
        {
            return await collection.Find(_=> true).Limit(10).ToListAsync();
        }
        public IQueryable<Customer> Get()
        {
            return collection.AsQueryable();
        }

        public List<string> GetCustomerTypes()
        {
            var customerTypes = (from c in collection.AsQueryable()
                                 select c.Type).Distinct();
            return customerTypes.ToList();
        }

    }
}
