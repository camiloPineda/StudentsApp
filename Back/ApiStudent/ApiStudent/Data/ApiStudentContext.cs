using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApiStudent.Models;

namespace ApiStudent.Data
{
    public class ApiStudentContext : DbContext
    {
        public ApiStudentContext (DbContextOptions<ApiStudentContext> options)
            : base(options)
        {
        }

        public DbSet<ApiStudent.Models.Student> Student { get; set; } = default!;
    }
}
