using DL.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Text.Json;
namespace DL
{
    public class ApiServiceDL : IApiServiceDL
    {
        private MartyrsofwarContext _martyrsofwarContext;//= new MartyrsofwarContext();
        private readonly HttpClient _httpClient;

        public ApiServiceDL(HttpClient httpClient, MartyrsofwarContext martyrsofwarContext)
        {
            _httpClient = httpClient;
            _martyrsofwarContext = martyrsofwarContext;
        }

        public async Task<string> FetchDataFromApiAsync(List<Soldier> soldiers)
        {

            try
            {
                foreach (var soldier in soldiers)
                {
                    _martyrsofwarContext.Soldiers.Add(soldier);
                }
                await _martyrsofwarContext.SaveChangesAsync();
                // HERE I WANT TO ADD THE LIST TO THE SOLIDERS TABLE
                //return await _martyrsofwarContext.Soldiers.ToListAsync();
                return "Insert Success";
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public Task<string> CreateUrlTheilimFromApiAsync(Tehilim tehilim)
        {
            throw new NotImplementedException();
        }
    }
}