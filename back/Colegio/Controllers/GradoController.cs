using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Colegio.Data;
using Colegio.Models;

namespace Colegio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradoController : ControllerBase
    {
        private readonly ColegioDbContext _context;

        public GradoController(ColegioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<GradoDto>> GetGrados()
        {
            var grados = await _context.Grado.ToListAsync();
            var result = new List<GradoDto>();

            foreach (var grado in grados)
            {
                var profesor = await _context.Profesor.FindAsync(grado.ProfesorId);
                result.Add(new GradoDto
                {
                    Id = grado.Id,
                    Nombre = grado.Nombre,
                    Profesor = profesor != null ? profesor.Nombres + " " + profesor.Apellidos : "No asignado"
                });
            }

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GradoDto>> GetGradoById(int id)
        {
            var grado = await _context.Grado.FindAsync(id);

            if (grado == null)
            {
                return NotFound(); 
            }

            var profesor = await _context.Profesor.FindAsync(grado.ProfesorId);

            var result = new GradoDto
            {
                Id = grado.Id,
                Nombre = grado.Nombre,
                Profesor = profesor != null ? profesor.Nombres + " " + profesor.Apellidos : "No asignado"
            };

            return Ok(result);
        }

        [HttpGet("db/{id}")]
        public async Task<ActionResult<Grado>> GetGrado(int id)
        {
            var grado = await _context.Grado.FindAsync(id);

            if (grado == null)
            {
                return NotFound();
            }

            return Ok(grado);
        }

        [HttpPost]
        public async Task<ActionResult<Grado>> AddGrado(Grado grado)
        {
            // Asegúrate de que la entidad grado contiene todos los campos necesarios
            // Por ejemplo, verificar si profesorId es válido
            if (grado.ProfesorId <= 0)
            {
                return BadRequest("El ID del profesor no es válido.");
            }

            // Agregar el grado al contexto
            _context.Grado.Add(grado);
            await _context.SaveChangesAsync();

            // Devolver la acción creada junto con la información del grado
            return CreatedAtAction(nameof(GetGradoById), new { id = grado.Id }, grado);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGrado(int id, [FromBody] Grado grado)
        {
            if (id != grado.Id)
            {
                return BadRequest();
            }

            // Verificar si el profesor existe
            var profesorExists = await _context.Profesor.AnyAsync(p => p.Id == grado.ProfesorId);
            if (!profesorExists)
            {
                return NotFound($"No se encontró un profesor con el ID: {grado.ProfesorId}");
            }

            _context.Entry(grado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradoExists(id))
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
        public async Task<IActionResult> DeleteGrado(int id)
        {
            var grado = await _context.Grado.FindAsync(id);
            if (grado == null)
            {
                return NotFound();
            }

            _context.Grado.Remove(grado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GradoExists(int id)
        {
            return _context.Grado.Any(e => e.Id == id);
        }


    }
}
