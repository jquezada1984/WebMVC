namespace WebMVC.Models
{
    public class Producto
    {
        public int      id { get; set; }
        public string?   codigo { get; set; }
        public string? marca { get; set; }
        public string? modelo { get; set; }
        public int      estado { get; set; }
        public DateTime fecha_registro { get; set; } = DateTime.Now;
    }
}
