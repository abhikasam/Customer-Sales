﻿using CustomersAPI.Models.CollectionSettings;
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
            return await _customerCollection.Find(_=> true).Limit(10).ToListAsync();
        }
        public List<Customer> Get(int skip,int limit)
        {
            int skipItems=skip*limit;
            var customers = (from c in _customerCollection.AsQueryable()
                             select c).Skip(skipItems).Take(limit);
            return customers.ToList();
        }

        public List<string> GetCustomerTypes()
        {
            var customerTypes=(from c in _customerCollection.AsQueryable()
                               select c.Type).Distinct();
            return customerTypes.ToList();
        }

    }
}
