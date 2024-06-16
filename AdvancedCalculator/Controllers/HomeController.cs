using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using AdvancedCalculator.Models;
using System;

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
            var client = _clientFactory.CreateClient();
            var response = await client.GetAsync($"https://api.mathjs.org/v4/?expr={Uri.EscapeDataString(request.Expression)}");

            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                return Json(new { result });
            }

            return BadRequest();
        }

        public IActionResult History()
        {
            return View();
        }
    }
}