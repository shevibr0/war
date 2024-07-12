using DL.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;



namespace DL
{
    public class SoldierDL : ISoldierDL
    {
        private MartyrsofwarContext _martyrsofwarContext = new MartyrsofwarContext(); 
        public async Task<IEnumerable<Soldier>> GetAllSoldiersAsync(int page)
        {
            try
            {
                int pageSize = 30;
                int startIndex = (page - 1) * pageSize;

                // Using LINQ to skip records based on page number and take the specified page size
                List<Soldier> soldiers = await _martyrsofwarContext.Soldiers
                    .OrderByDescending(s => s.Id)  // Assuming you have an 'Id' property for ordering
                    .Skip(startIndex)
                    .Take(pageSize)
                    .ToListAsync();
                return soldiers.ToArray();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Soldier> GetSoldierByIdAsync(int id)
        {
            try
            {
                return await _martyrsofwarContext.Soldiers.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Soldier> GetSoldierLast()
        {
            try
            {
                return await _martyrsofwarContext.Soldiers
            .OrderBy(s => s.Id) // Order by Id in ascending order
            .LastOrDefaultAsync(); // Get the first item, which is the lowest Id if ordered ascendingly
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task AddSoldierAsync(Soldier soldier)
        {
            try
            {
                _martyrsofwarContext.Soldiers.Add(soldier);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task UpdateSoldierAsync(int soldierId, Soldier updatedSoldier)
        {
            try
            {
                var existingSoldier = await _martyrsofwarContext.Soldiers.FindAsync(soldierId);

                if (existingSoldier != null)
                {
                    _martyrsofwarContext.Entry(existingSoldier).CurrentValues.SetValues(updatedSoldier);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeleteSoldierAsync(int soldierId)
        {
            try
            {
                var soldierToDelete = await _martyrsofwarContext.Soldiers.FindAsync(soldierId);

                if (soldierToDelete != null)
                {
                    _martyrsofwarContext.Soldiers.Remove(soldierToDelete);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int GetCountSoliders()
        {
            if (_martyrsofwarContext.Soldiers.Count() % 30 == 0)
                return _martyrsofwarContext.Soldiers.Count() / 30;
            return _martyrsofwarContext.Soldiers.Count() / 30 + 1;
        }

        public async Task<IEnumerable<Soldier>> GlobalSearchSoldiersAsync(string searchValue)
        {
            try
            {
                // חיפוש חיילים על פי מחרוזת החיפוש
                List<Soldier> result = await _martyrsofwarContext.Soldiers.Where(s =>
                    (s.FirstName != null && s.FirstName.Contains(searchValue)) ||
                    (s.LastName != null && s.LastName.Contains(searchValue)) ||
                    (s.Age.HasValue && s.Age.ToString().Contains(searchValue)) ||
                    (s.City != null && s.City.Contains(searchValue))
                ).OrderByDescending(s => s.Id).ToListAsync();

                return result;
            }
            catch (Exception ex)
            {
                // טיפול בשגיאה או רישום השגיאה
                throw ex;
            }
        }

    }
}


