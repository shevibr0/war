using System;
using System.Threading.Tasks;
using BL.Services;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;



[ApiController]
[Route("api/[controller]")]
public class ApiController : ControllerBase
{
    private readonly IApiServiceBL _apiService;

    public ApiController(IApiServiceBL apiServiceBL)
    {
        _apiService = apiServiceBL; ;
    }

    [HttpGet]
    public async Task<ActionResult<string>> FetchDataFromApiAsync()
    {
        try
        {
            var data = await _apiService.FetchDataFromApiAsync();

            if (data != null)
            {
                return Ok(data);
            }
            else
            {
                return NoContent(); // 404 Not Found if data is not available
            }
        }
        catch (Exception ex)
        {
            // Log the exception
            // Consider returning a more specific error message or status code based on the type of exception
            return null;
        }
    }

    [HttpPost]
    public async Task<string> CreateUrlTheilimFromApiAsync(TehilimUrlDTO tehilim)
    {
        try
        {
            return await _apiService.CreateUrlTheilimFromApiAsync(tehilim);

            //if (data != null)
            //{
            //    return Ok(data);
            //}
            //else
            //{
            //    return NotFound(); // 404 Not Found if data is not available
            //}
        }
        catch (Exception ex)
        {
            // Log the exception
            // Consider returning a more specific error message or status code based on the type of exception
            return null;
        }
    }

    [HttpGet]
    [Route("GetTheilmByPart/{part}")]
    public async Task<apiTheilimResponseModel> GetUrlTheilimByPartFromApiAsync(int part)

    {
        try
        {
            return await _apiService.GetUrlTheilimByPartFromApiAsync(part);

            //if (data != null)
            //{
            //    return Ok(data);
            //}
            //else
            //{
            //    return NotFound(); // 404 Not Found if data is not available
            //}
        }
        catch (Exception ex)
        {
            // Log the exception
            // Consider returning a more specific error message or status code based on the type of exception
            return null;
        }
    }
}
