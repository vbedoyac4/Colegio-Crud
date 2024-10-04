namespace Colegio.Models
{
    public class AlumnoGrado
    {
        public int Id { get; set; }
        public int AlumnoId { get; set; }
        public int GradoId { get; set; }
        public string Seccion { get; set; }
    }
}
