using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponsesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResponsesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("SubmitResponses")]
        public async Task<IActionResult> SubmitResponses([FromBody] ResponseDto responseDto)
        {
            try
            {
                if (responseDto == null || responseDto.ResponseValues == null)
                {
                    return BadRequest("Invalid data.");
                }

                // var existingResponse = await _context.Responses.FirstOrDefaultAsync(c => c.UserId == responseDto.UserId);

                // if (existingResponse != null)
                // {
                //     return BadRequest("User already submitted a Response!");
                // }

                var newResponse = new Response
                {
                    UserId = responseDto.UserId,
                    ResponseValues = responseDto.ResponseValues,
                    Result = responseDto.Result
                };

                _context.Responses.Add(newResponse);
                await _context.SaveChangesAsync();

                return Ok("Response successful");
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }

        }

        // private string CalculatePersonalityType(List<ResponseDto> responses)
        // {
        //     var typeScores = new Dictionary<int, int>();
        //     foreach (var response in responses)
        //     {
        //         var question = _context.Questions.Find(response.QuestionId);
        //         if (question != null)
        //         {
        //             if (!typeScores.ContainsKey(question.Category))
        //             {
        //                 typeScores[question.Category] = 0;
        //             }
        //             typeScores[question.Category] += response.ResponseValue;
        //         }
        //     }

        //     var highestScoreCategory = typeScores.Aggregate((l, r) => l.Value > r.Value ? l : r).Key;
        //     return MapCategoryToPersonalityType(highestScoreCategory);
        // }

        // private string MapCategoryToPersonalityType(int category)
        // {
        //     return category switch
        //     {
        //         1 => "Type 1: The Reformer",
        //         2 => "Type 2: The Helper",
        //         3 => "Type 3: The Achiever",
        //         4 => "Type 4: The Individualist",
        //         5 => "Type 5: The Investigator",
        //         6 => "Type 6: The Loyalist",
        //         7 => "Type 7: The Enthusiast",
        //         8 => "Type 8: The Challenger",
        //         9 => "Type 9: The Peacemaker",
        //         _ => "Unknown Type"
        //     };
        // }
    }

}
