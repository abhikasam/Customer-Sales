using MongoDB.Bson.Serialization.Attributes;

namespace CustomersAPI.Models.Books
{
    public class Book
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.Int32)]
        public int _id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Isbn { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Status { get; set; }
        public int PageCount { get; set; }
        public string ThumbnailUrl { get; set; }
        public List<string> Categories { get; set; }
        public List<string> Authors { get; set; }
    }
}
