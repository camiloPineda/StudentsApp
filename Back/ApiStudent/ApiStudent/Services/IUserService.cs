using ApiStudent.Helpers;
using ApiStudent.Models;

namespace ApiStudent.Services
{
    public interface IUserService
    {
        Task<IEnumerable<Student>> GetAllStudents();
        Task<Student> GetStudent(int id);
        Task<AppException> UpdateStudent(int id, Student student);
        Task<AppException> DeleteStudent(int id);
        Task<AppException> createStudent(Student students);


    }
}
