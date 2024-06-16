using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using AdvancedCalculator.Models;

namespace AdvancedCalculator.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHttpClientFactory _clientFactory;

        public HomeController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Calculate([FromBody] CalculationRequest request)
        {
            if (string.IsNullOrEmpty(request.Expression))
            {
                return BadRequest("Expression cannot be empty.");
            }

            var client = _clientFactory.CreateClient();
            var response = await client.GetStringAsync($"https://api.mathjs.org/v4/?expr={System.Net.WebUtility.UrlEncode(request.Expression)}");

            return Ok(response);
        }

        public IActionResult History()
        {
            return View();
        }
    }
}