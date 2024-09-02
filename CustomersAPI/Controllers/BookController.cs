using CustomersAPI.Models.Books;
using CustomersAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookService bookService;

        public BookController(BookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpGet("api/books")]
        public async Task<List<Book>> GetAsync()
        {
            return await bookService.GetAsync();
        }

        [HttpGet("api/books/{id}")]
        public async Task<Book> GetBookAsync([FromRoute]int id)
        {
            return await bookService.GetBookAsync(id); 
        }

        [HttpGet("api/books/categories")]
        public List<string> GetCategories()
        {
            return bookService.GetCategories();
        }

        [HttpPost("api/books")]
        public IActionResult Post([FromBody]Book book)
        {
            var bookAdded = bookService.AddBook(book);
            if (bookAdded)
            {
                return Ok(book);
            }
            return NotFound(book);
        }

        [HttpDelete("api/books/{id}")]
        public IActionResult Delete([FromRoute]int id)
        {
            return Ok(bookService.DeleteBook(id));
        }

        [HttpPut("api/books")]
        public IActionResult Put([FromBody]Book book)
        {
            return Ok(bookService.UpdateBook(book));
        }

    }
}
