using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Colegio.Data;
using Colegio.Models;
using Microsoft.Data.SqlClient;

namespace Colegio.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProfesorController: ControllerBase
    {
        private readonly ColegioDbContext _context;

        public ProfesorController(ColegioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profesor>>> GetProfesores()
        {
            return await _context.Profesor.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Profesor>> GetProfesorById(int id)
        {
            var profesor = await _context.Profesor.FindAsync(id);

            if (profesor == null)
            {
                return NotFound();
            }

            return Ok(profesor);
        }

        [HttpPost]
        public async Task<ActionResult<Profesor>> AddProfesor(Profesor profesor)
        {
            _context.Profesor.Add(profesor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProfesorById), new { id = profesor.Id }, profesor);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProfesor(int id, Profesor profesor)
        {
            if (id != profesor.Id)
            {
                return BadRequest();
            }

            _context.Entry(profesor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfesorExists(id))
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
        public async Task<IActionResult> DeleteProfesor(int id)
        {
            var profesor = await _context.Profesor.FindAsync(id);
            if (profesor == null)
            {
                return NotFound();
            }

            try
            {
                _context.Profesor.Remove(profesor);
                await _context.SaveChangesAsync();
                return NoContent(); // Devolver NoContent si se eliminó correctamente
            }
            catch (DbUpdateException ex)
            {
                // Capturar la excepción y verificar el mensaje
                if (ex.InnerException is SqlException sqlEx && sqlEx.Number == 547) // Número de error para conflictos de referencia
                {
                    return BadRequest("El profesor tiene asignado un grado. Debe cambiarlo primero para poder eliminarlo.");
                }
                // Si es otro tipo de excepción, puedes devolver un mensaje genérico o manejarlo de otra manera
                return StatusCode(StatusCodes.Status500InternalServerError, "Error al eliminar el profesor.");
            }
        }

        private bool ProfesorExists(int id)
        {
            return _context.Profesor.Any(e => e.Id == id);
        }

    }
}
