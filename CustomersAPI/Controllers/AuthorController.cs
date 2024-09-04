using CustomersAPI.Models.Books;
using CustomersAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    [ApiController]
    [Authorize]
    public class AuthorController : ControllerBase
    {
        private readonly BookService bookService;

        public AuthorController(BookService bookService)
        {
            this.bookService = bookService;
        }


        [HttpGet]
        [Route("api/authors")]
        public IEnumerable<string> Get()
        {
            return bookService.GetAuthors();
        }

        [HttpGet("api/authors/{author}/books")]
        public List<Book> GetBooks(string author)
        {
            return bookService.GetAuthorBooks(author);
        }
    }
}
