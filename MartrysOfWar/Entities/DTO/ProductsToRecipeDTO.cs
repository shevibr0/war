using DL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class ProductsToRecipeDTO
    {
        public int Id { get; set; }
        public int IdRec { get; set; }
        public string Description { get; set; } = null!;
        public int Order { get; set; }

       // public virtual Recipy IdRecNavigation { get; set; } = null!;
    }
}
