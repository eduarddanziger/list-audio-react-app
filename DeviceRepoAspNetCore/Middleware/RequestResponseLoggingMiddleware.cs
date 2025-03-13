namespace DeviceRepoAspNetCore.Middleware;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Text;
using System.Threading.Tasks;

public class RequestResponseLoggingMiddleware(RequestDelegate next, ILogger<RequestResponseLoggingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        // Log the request
        var request = await FormatRequest(context.Request);
        logger.LogInformation("Request: {Request}", request);

        // Copy the original response body stream
        var originalBodyStream = context.Response.Body;

        // ReSharper disable once ConvertToUsingDeclaration
        using (var responseBody = new MemoryStream())
        {
            context.Response.Body = responseBody;

            // Call the next middleware in the pipeline
            await next(context);

            // Log the response
            var response = await FormatResponse(context.Response);
            logger.LogInformation("Response: {Response}", response);

            // Copy the contents of the new memory stream (which contains the response) to the original stream
            await responseBody.CopyToAsync(originalBodyStream);
        }
    }

    private static async Task<string> FormatRequest(HttpRequest request)
    {
        request.EnableBuffering();

        var body = request.Body;
        var buffer = new byte[Convert.ToInt32(request.ContentLength)];
        await request.Body.ReadAsync(buffer, 0, buffer.Length);
        var bodyAsText = Encoding.UTF8.GetString(buffer);
        request.Body.Position = 0;

        return $"{request.Scheme} {request.Host}{request.Path} {request.QueryString} {bodyAsText}";
    }

    private static async Task<string> FormatResponse(HttpResponse response)
    {
        response.Body.Seek(0, SeekOrigin.Begin);
        var text = await new StreamReader(response.Body).ReadToEndAsync();
        response.Body.Seek(0, SeekOrigin.Begin);

        return $"Status Code: {response.StatusCode}; {text}";
    }
}