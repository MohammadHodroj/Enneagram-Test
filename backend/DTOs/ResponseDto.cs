namespace backend.DTOs
{
    public class ResponseDto
    {
        public int UserId { get; set; }
        public List<int> ResponseValues { get; set; }
        public string Result { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}