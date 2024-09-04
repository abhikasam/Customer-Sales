using MongoDB.Bson.Serialization.Attributes;

namespace CustomersAPI.Models.Role
{
    public partial class AppUserRole
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string _id { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }
    }
}
