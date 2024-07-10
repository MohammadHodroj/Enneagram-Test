using backend.Data;
using backend.Models;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;

public static class ExcelData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new ApplicationDbContext(serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
        {
            if (context.Questions.Any())
            {
                return; // Database has been seeded
            }

            var path = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Enneagram_Questions.xlsx");

            if (!File.Exists(path))
            {
                throw new FileNotFoundException($"The file {path} does not exist.");
            }

            try
            {
                // Use ClosedXML to read the Excel file and convert to questions
                using (var workbook = new XLWorkbook(path))
                {
                    var worksheet = workbook.Worksheet(1);
                    var rows = worksheet.RowsUsed().Skip(1); // Skip header row

                    foreach (var row in rows)
                    {
                        var questionText = row.Cell(2).GetString();
                        var personalityTypeStr = row.Cell(3).GetString();

                        var category = ExtractCategory(personalityTypeStr);

                        if (category != null)
                        {
                            context.Questions.Add(new Question
                            {
                                QuestionText = questionText,
                                Category = category.Value
                            });
                        }
                        else
                        {
                            // Log or handle the error appropriately
                            Console.WriteLine($"Invalid personality type value in row {row.RowNumber()}: {personalityTypeStr}");
                        }
                    }
                }

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                // Log the exception (this is a simple example, use a proper logging framework in real applications)
                Console.WriteLine($"An error occurred seeding the DB: {ex.Message}");
                throw;
            }
        }
    }

    private static int? ExtractCategory(string personalityTypeStr)
    {
        // Example: "Type 1: The Reformer"
        if (personalityTypeStr.StartsWith("Type ") && personalityTypeStr.Contains(":"))
        {
            var parts = personalityTypeStr.Split(':');
            if (int.TryParse(parts[0].Replace("Type ", "").Trim(), out int category))
            {
                return category;
            }
        }
        return null;
    }
}
