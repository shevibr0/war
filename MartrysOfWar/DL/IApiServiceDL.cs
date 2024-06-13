using DL.Models;

namespace DL
{
    public interface IApiServiceDL
    {
        Task<string> FetchDataFromApiAsync(List<Soldier> soldiers);

        Task<string> CreateUrlTheilimFromApiAsync(Tehilim tehilim);
    }
}