using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Colegio.Data;
using Colegio.Models;

namespace Colegio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnoController: ControllerBase
    {
        private readonly ColegioDbContext _context;

        public AlumnoController(ColegioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alumno>>> GetAlumnos()
        {
            return await _context.Alumno.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Alumno>> GetAlumnoById(int id)
        {
            var alumno = await _context.Alumno.FindAsync(id);

            if (alumno == null)
            {
                return NotFound();
            }

            return Ok(alumno);
        }

        [HttpPost]
        public async Task<ActionResult<Alumno>> AddAlumno(Alumno alumno)
        {
            _context.Alumno.Add(alumno);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAlumnoById), new { id = alumno.Id }, alumno);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult>UpdateAlumno(int id, Alumno alumno)
        {
            if (id != alumno.Id)
            {
                return BadRequest();
            }

            _context.Entry(alumno).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlumnoExists(id))
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
        public async Task<IActionResult> DeleteAlumno(int id)
        {
            // Asegúrate de que el alumno existe
            var alumno = await _context.Alumno.FindAsync(id);
            if (alumno == null)
            {
                return NotFound();
            }

            try
            {
                _context.Alumno.Remove(alumno); // Marca el alumno para eliminación
                await _context.SaveChangesAsync(); 
                return NoContent(); 
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine("Error al eliminar el alumno: " + ex.Message);
                return StatusCode(500, "Error al eliminar el alumno. Por favor, inténtelo de nuevo más tarde.");
            }
        }

        private bool AlumnoExists(int id)
        {
            return _context.Alumno.Any(e => e.Id == id);
        }
    }
}
