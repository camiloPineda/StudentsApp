using System.ComponentModel.DataAnnotations;

namespace ApiStudent.Models
{
    public class Student
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Este campo no puede estar vacio")]
        [StringLength(20)]
        public string Username { get; set; } = string.Empty;
        [Required(ErrorMessage = "Este campo no puede estar vacio")]
        [StringLength(20)]
        public string FirstName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Este campo no puede estar vacio")]
        [StringLength(20)]
        public string LastName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Este campo no puede estar vacio")]
        public int Age { get; set; }
        [Required(ErrorMessage = "Este campo no puede estar vacio")]
        [StringLength(50)]
        public string Career { get; set; } = string.Empty;
    }
}
