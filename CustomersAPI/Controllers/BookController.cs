using CustomersAPI.Models.Books;
using CustomersAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookService bookService;

        public BookController(BookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpGet]
        public async Task<List<Book>> GetAsync()
        {
            return await bookService.GetAsync();
        }

        [HttpGet("{id}")]
        public async Task<Book> GetBookAsync([FromRoute]int id)
        {
            return await bookService.GetBookAsync(id); 
        }

        [HttpGet("categories")]
        public List<string> GetCategories()
        {
            return bookService.GetCategories();
        }

        [HttpPost]
        public IActionResult Post([FromBody]Book book)
        {
            var bookAdded = bookService.AddBook(book);
            if (bookAdded)
            {
                return Ok(book);
            }
            return NotFound(book);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute]int id)
        {
            return Ok(bookService.DeleteBook(id));
        }

        [HttpPut]
        public IActionResult Put([FromBody]Book book)
        {
            return Ok(bookService.UpdateBook(book));
        }

    }
}
