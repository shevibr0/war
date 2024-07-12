using DL.Models;
using Microsoft.EntityFrameworkCore;


namespace DL
{
    public class TehilimDL : ITehilimDL
    {
        private MartyrsofwarContext _martyrsofwarContext = new MartyrsofwarContext();

        public async Task<IEnumerable<Tehilim>> GetAllTehilimsAsync()
        {
            try
            {
                return await _martyrsofwarContext.Tehilims.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Tehilim> GetTehilimBySoliderIdUserAsync(int userId, int soliderId)
        {
            try
            {
                return await _martyrsofwarContext.Tehilims.FirstOrDefaultAsync(t => t.IdUser == userId && t.IdSoldier == soliderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Tehilim> AddTehilimAsync(Tehilim tehilim)
        {
            try
            {
                _martyrsofwarContext.Tehilims.Add(tehilim);
                await _martyrsofwarContext.SaveChangesAsync();
                return tehilim;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateTehilimAsync(int tehilimId, Tehilim updatedTehilim)
        {
            try
            {
                var existingTehilim = await _martyrsofwarContext.Tehilims.FindAsync(tehilimId);

                if (existingTehilim != null)
                {
                    _martyrsofwarContext.Entry(existingTehilim).CurrentValues.SetValues(updatedTehilim);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteTehilimAsync(int tehilimId)
        {
            try
            {
                var tehilimToDelete = await _martyrsofwarContext.Tehilims.FindAsync(tehilimId);

                if (tehilimToDelete != null)
                {
                    _martyrsofwarContext.Tehilims.Remove(tehilimToDelete);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> GetCountTehilimForSoliderAsync(int soliderId)
        {
            try
            {
                return await _martyrsofwarContext.Tehilims
                    .Where(t => t.IdSoldier == soliderId)
                    .SumAsync(t => t.Count);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<int> GetByUserCountTehilimForSolider(int soliderId)
        {
            try
            {
                return await _martyrsofwarContext.Tehilims
                    .Where(t => t.IdSoldier == soliderId)
                    .Select(t => t.IdUser)
                    .Distinct()
                    .CountAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> GetBooksCountForSoliderAsync(int soliderId)
        {
            try
            {
                var soldierBooks = await _martyrsofwarContext.Books
                    .Where(b => b.IdSoldier == soliderId)
                    .FirstOrDefaultAsync();

                return soldierBooks?.Count ?? 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<int>> GetCompletedPsalmsAsync(int soldierId)
        {
            try
            {
                return await _martyrsofwarContext.CompletedPsalms
                    .Where(cp => cp.IdSoldier == soldierId)
                    .Select(cp => cp.PsalmNumber)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddCompletedPsalmAsync(CompletedPsalm completedPsalm)
        {
            try
            {
                _martyrsofwarContext.CompletedPsalms.Add(completedPsalm);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> AreAllPsalmsCompleted(int soldierId)
        {
            try
            {
                int completedPsalmsCount = await _martyrsofwarContext.CompletedPsalms
                    .Where(cp => cp.IdSoldier == soldierId)
                    .CountAsync();
                return completedPsalmsCount == 150;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task ClearCompletedPsalmsForSoldier(int soldierId)
        {
            try
            {
                var completedPsalms = _martyrsofwarContext.CompletedPsalms
                    .Where(cp => cp.IdSoldier == soldierId);

                _martyrsofwarContext.CompletedPsalms.RemoveRange(completedPsalms);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateBookCountIfNeeded(int soldierId)
        {
            try
            {
                var book = await _martyrsofwarContext.Books.FirstOrDefaultAsync(b => b.IdSoldier == soldierId);

                if (book != null)
                {
                    book.Count += 1;
                }
                else
                {
                    book = new Book { IdSoldier = soldierId, Count = 1 };
                    _martyrsofwarContext.Books.Add(book);
                }

                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeleteCompletedPsalmsBySoldierAsync(int soldierId)
        {
            var completedPsalms = _martyrsofwarContext.CompletedPsalms.Where(cp => cp.IdSoldier == soldierId);
            _martyrsofwarContext.CompletedPsalms.RemoveRange(completedPsalms);
            await _martyrsofwarContext.SaveChangesAsync();
        }
        public async Task<int> GetCountCompletedPsalmsForSoldierAsync(int soldierId)
        {
            try
            {
                return await _martyrsofwarContext.CompletedPsalms
                    .Where(cp => cp.IdSoldier == soldierId)
                    .CountAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
