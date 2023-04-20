using ApiStudent.Data;
using ApiStudent.Helpers;
using ApiStudent.Mensajes;
using ApiStudent.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiStudent.Services
{
    public class UserService : IUserService
    {
        private ApiStudentContext _context;
        private Constantes constantes = new Constantes();
        public UserService(ApiStudentContext context)
        {
            _context = context;
        }
        public async Task<AppException> DeleteStudent(int id)
        {
            var students = await _context.Student.FindAsync(id);
            if (students == null)
            {
                return new AppException(constantes.estudianteNoexiste);
            }
            _context.Student.Remove(students);
            await _context.SaveChangesAsync();

            return new AppException(constantes.estudianteEliminado);

        }

        public async Task<IEnumerable<Student>> GetAllStudents()
        {
            if (_context.Student == null)
            {
                return Enumerable.Empty<Student>();
            }
            return await _context.Student.ToListAsync();
        }

        public async Task<Student> GetStudent(int id)
        {
            return await _context.Student.FindAsync(id);
        }

        public async Task<AppException> createStudent(Student students)
        {
            if (_context.Student.Any(x => x.Id == students.Id))
            {
                return new AppException(constantes.estudianteExiste);
            }
            else
            {
                _context.Student.Add(students);
                await _context.SaveChangesAsync();
                return new AppException(constantes.estudianteCreado);
            }

        }

        public async Task<AppException> UpdateStudent(int id, Student student)
        {
            _context.Entry(student).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentsExists(id))
                {
                    return new AppException(constantes.estudianteNoexiste);
                }
                else
                {
                    throw;
                }
            }
            return new AppException(constantes.estudianteModificado);
        }

        private bool StudentsExists(int id)
        {
            return (_context.Student?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
