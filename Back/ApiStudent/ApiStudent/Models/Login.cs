using Microsoft.Build.Framework;
using RequiredAttribute = System.ComponentModel.DataAnnotations.RequiredAttribute;

namespace ApiStudent.Models
{
    public class Login
    {
        [Required(ErrorMessage = "El usuario o la contraseña estan vacios")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "El usuario o la contraseña estan vacios")]
        public string? Password { get; set; }

    }
}
