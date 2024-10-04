using Microsoft.EntityFrameworkCore;
using Colegio.Models;

namespace Colegio.Data
{
    public class ColegioDbContext : DbContext
    {
        public ColegioDbContext(DbContextOptions<ColegioDbContext> options) : base(options) { }

        public DbSet<Alumno> Alumno { get; set; }
        public DbSet<Profesor> Profesor { get; set; }
        public DbSet<Grado> Grado { get; set; }
        public DbSet<AlumnoGrado> AlumnoGrado { get; set; }
    }
}
