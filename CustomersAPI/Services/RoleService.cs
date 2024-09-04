using CustomersAPI.Models.CollectionSettings;
using CustomersAPI.Models.Role;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CustomersAPI.Services
{
    public class RoleService
    {
        public readonly IMongoCollection<AppUserRole> collection;

        public RoleService(IOptions<RoleCollectionSettings> options)
        {
            var client=new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            if(!database.ListCollectionNames().ToList().Contains(options.Value.DatabaseName))
            { 
                database.CreateCollection(options.Value.DatabaseName);
            }
            collection = database.GetCollection<AppUserRole>(options.Value.CollectionName);
        }


        public void AddRoles(string username, string[] roles)
        {
            collection.InsertMany(roles.Select(i=> new AppUserRole()
            {
                UserName=username,
                RoleName = i
            }));
        }

        public IQueryable<AppUserRole> Get(string username)
        {
            return collection.AsQueryable().Where(i => i.UserName == username);
        }

        public void DeleteRoles(string username, string[] roles)
        {
            collection.DeleteMany(i=> i.UserName==username && roles.Contains(i.RoleName));
        }

    }
}
