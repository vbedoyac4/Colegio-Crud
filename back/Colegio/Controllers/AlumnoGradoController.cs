using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Colegio.Data;
using Colegio.Models;

namespace Colegio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnoGradoController : ControllerBase
    {
        private readonly ColegioDbContext _context;

        public AlumnoGradoController(ColegioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<AlumnoGradoDto>> GetAlumnosGrados()
        {
            var alumnosgrado = await _context.AlumnoGrado.ToListAsync();
            var result = new List<AlumnoGradoDto>();

            foreach (var ag in alumnosgrado)
            {
                var alumno = await _context.Alumno.FindAsync(ag.AlumnoId);
                var grado = await _context.Grado.FindAsync(ag.GradoId);

                result.Add(new AlumnoGradoDto
                {
                    Id = ag.Id,
                    Alumno = alumno != null ? alumno.Nombres + " " + alumno.Apellidos : "No Encontrado",
                    Grado = grado != null ? grado.Nombre : "No Encontrado",
                    Seccion = ag.Seccion
                });
            }

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlumnoGradoDto>> GetAlumnosGradoById(int id)
        {
            var ag = await _context.AlumnoGrado.FindAsync(id);

            if (ag == null)
            {
                return NotFound();
            }

            var alumno = await _context.Alumno.FindAsync(ag.AlumnoId);
            var grado = await _context.Grado.FindAsync(ag.GradoId);

            var result = new AlumnoGradoDto
            {
                Id = ag.Id,
                Alumno = alumno != null ? alumno.Nombres + " " + alumno.Apellidos : "No Encontrado",
                Grado = grado != null ? grado.Nombre : "No Encontrado",
                Seccion = ag.Seccion
            };

            return Ok(result);
        }

        [HttpGet("db/{id}")]
        public async Task<ActionResult<AlumnoGrado>> GetAlumnoGradoById(int id)
        {
            var ag = await _context.AlumnoGrado.FindAsync(id);

            if (ag == null)
            {
                return NotFound();
            }

            return Ok(ag);
        }

        [HttpPost]
        public async Task<ActionResult<AlumnoGrado>> AddAlumnoGrado(AlumnoGrado alumnoGrado)
        {
            // Verificar si el Alumno existe
            var alumnoExiste = await _context.Alumno.AnyAsync(a => a.Id == alumnoGrado.AlumnoId);
            if (!alumnoExiste)
            {
                return BadRequest($"No se encontró un alumno con el ID {alumnoGrado.AlumnoId}.");
            }

            // Verificar si el Grado existe
            var gradoExiste = await _context.Grado.AnyAsync(g => g.Id == alumnoGrado.GradoId);
            if (!gradoExiste)
            {
                return BadRequest($"No se encontró un grado con el ID {alumnoGrado.GradoId}.");
            }

            // Si ambas validaciones son correctas, se procede a agregar el registro
            _context.AlumnoGrado.Add(alumnoGrado);
            await _context.SaveChangesAsync();

            // Retornar el objeto creado
            return CreatedAtAction(nameof(GetAlumnosGradoById), new { id = alumnoGrado.Id }, alumnoGrado);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAlumnoGrado(int id, AlumnoGrado alumnoGrado)
        {
            if (id != alumnoGrado.Id)
            {
                return BadRequest();
            }

            _context.Entry(alumnoGrado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlumnoGradoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlumnoGrado(int id)
        {
            try
            {
                var alumnoGrado = await _context.AlumnoGrado.FindAsync(id);
                if (alumnoGrado == null)
                {
                    return NotFound();
                }

                _context.AlumnoGrado.Remove(alumnoGrado);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the error (uncomment ex variable name and write a log)
                return StatusCode(500, ex);
            }
        }


        private bool AlumnoGradoExists(int id)
        {
            return _context.AlumnoGrado.Any(e => e.Id == id);
        }

    }
}
