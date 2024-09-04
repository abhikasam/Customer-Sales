using CustomersAPI.Models.CollectionSettings;
using CustomersAPI.Models.Role;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CustomersAPI.Services
{
    public class AuthService
    {
        public readonly IMongoCollection<User> users;
        public AuthService(IOptions<AuthCollectionSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            if (!database.ListCollectionNames().ToList().Contains(options.Value.CollectionName))
            {
                database.CreateCollection(options.Value.CollectionName);
            }
            users = database.GetCollection<User>(options.Value.CollectionName);
        }

        public bool addUser(User user)
        {
            users.InsertOne(user);
            return true;
        }

        public IQueryable<User> GetUsers()
        {
            return users.AsQueryable();
        }

    }
}
