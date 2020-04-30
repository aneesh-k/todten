using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Register
    {
        public class Command : IRequest<User>
        {

            public string DisplayName { get; set; }

            public string UserName { get; set; }

            public string Email { get; set; }

            public string Password { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IjwtGenerator _jwtGenerator;
            private readonly DataContext _context;

            public Handler(UserManager<AppUser> userManager, DataContext context,
            IjwtGenerator jwtGenerator)
            {
                _context = context;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;

            }


            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {

                if (await _context.Users.Where(r => r.Email == request.Email).AnyAsync())
                    throw new RestExceptions(HttpStatusCode.BadRequest, new { Email = "Email Already exists" });

                if (await _context.Users.Where(r => r.UserName == request.UserName).AnyAsync())
                    throw new RestExceptions(HttpStatusCode.BadRequest, new { Username = "Username Already exists" });


                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Email
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        Image = null,
                        Username = user.UserName
                    };

                }

                throw new RestExceptions(HttpStatusCode.BadRequest, new
                {
                    Errors = "Not saved data"
                });


            }
        }
    }
}