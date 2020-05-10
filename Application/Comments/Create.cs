using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentsDto>
        {
            public string Body { get; set; }

            public Guid ActivityId { get; set; }

            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentsDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<CommentsDto> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities.FindAsync(request.ActivityId);

                if (activity == null) throw new RestExceptions(HttpStatusCode.BadRequest, new
                {
                    activity = "Not found"
                });

                var user = await _context.Users.SingleOrDefaultAsync(r => r.UserName == request.UserName);

                var comment = new Comment
                {
                    AppUser = user,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return _mapper.Map<CommentsDto>(comment);
                }

                throw new Exception("Unable to create Comments");


            }
        }
    }
}