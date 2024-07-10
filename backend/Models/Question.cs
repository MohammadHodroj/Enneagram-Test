namespace backend.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string QuestionText { get; set; } = "";
        public int Category { get; set; }
    }
}
