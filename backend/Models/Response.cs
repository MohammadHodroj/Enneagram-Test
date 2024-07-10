namespace backend.Models
{
    public class Response
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<int> ResponseValues { get; set; }
        public string Result { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}