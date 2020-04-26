using System;
using System.Net;

namespace Application.Errors
{
    public class RestExceptions : Exception
    {
        public RestExceptions(HttpStatusCode code, object error = null)
        {
            Code = code;
            Error = error;
        }

        public HttpStatusCode Code { get; }
        public object Error { get; }
    }
}