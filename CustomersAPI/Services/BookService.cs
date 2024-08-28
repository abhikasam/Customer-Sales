using CustomersAPI.Models.Books;
using CustomersAPI.Models.CollectionSettings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace CustomersAPI.Services
{
    public class BookService
    {
        private readonly IMongoCollection<Book> collection;
        public BookService(IOptions<BooksCollectionSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            collection = database.GetCollection<Book>(options.Value.CollectionName);
        }

        public async Task<List<Book>> GetAsync()
        {
            return await collection.Find(_ => true).ToListAsync();
        }

        public async Task<Book> GetBookAsync(int id)
        {
            return await collection.FindSync(x => x._id == id).FirstAsync();
        }
        public List<string> GetAuthors()
        {
            return collection.AsQueryable()
                .SelectMany(i => i.Authors)
                .Where(i => i.Length > 0)
                .Distinct()
                .OrderBy(i => i)
                .ToList();
        }

        public List<string> GetCategories()
        {
            return collection.AsQueryable()
                .SelectMany(i=>i.Categories)
                .Where(i=>i.Length>0)
                .Distinct()
                .OrderBy(i => i)
                .ToList();
        }
        public List<Book> GetAuthorBooks(string author)
        {
            //var bsonDocument = new BsonDocument("authors",author);
            var bsonDocument = Builders<Book>.Filter.AnyEq(c => c.Authors, author);
            return collection.Find(bsonDocument).ToList();
        }


        public bool AddBook(Book book)
        {
            try
            {
                book._id=collection.AsQueryable().Max(i=>i._id)+1;
                collection.InsertOne(book);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Book DeleteBook(int id)
        {
            var book=collection.FindOneAndDelete(i=>i._id==id);
            return book;
        }

        public Book UpdateBook(Book book)
        {
            //var update = Builders<Book>.Update
            //            .Set(book.Isbn, book.Isbn);
            var updated = collection.FindOneAndReplace(x=>x._id==book._id,book);
            return updated;
        }

    }
}
