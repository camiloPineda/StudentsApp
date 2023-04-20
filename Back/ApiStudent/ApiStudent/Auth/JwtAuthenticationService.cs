using ApiStudent.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiStudent.Auth
{
    public class JwtAuthenticationService : IJwtAuthenticationService
    {
        private readonly string _key;
        public JwtAuthenticationService(string key)
        {
            _key = key;
        }
        public tokenJwt Authenticate(string username, string password)
        {
            tokenJwt tokenJwt = new tokenJwt();

            if (username != "admin" || password != "12345")
            {
                tokenJwt.response = 0;
                tokenJwt.token = "";
            }
            else
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenKey = Encoding.ASCII.GetBytes(_key);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, username)
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);

                tokenJwt.response = 1;
                tokenJwt.token = tokenHandler.WriteToken(token).ToString();
            }
            return tokenJwt;
        }
    }
}
