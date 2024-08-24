using CustomersAPI.Models.Books;
using CustomersAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly BookService bookService;

        public AuthorController(BookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpGet]
        public List<string> Get()
        {
            return bookService.GetAuthors();
        }

        [HttpGet("{author}")]
        public List<Book> GetBooks(string author)
        {
            return bookService.GetAuthorBooks(author);
        }
    }
}
