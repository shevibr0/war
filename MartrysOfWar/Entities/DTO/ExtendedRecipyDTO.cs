using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class CompleteRecipeDTO
    {
        public RecipyDTO Recipy { get; set; }
        public List<ProductsToRecipeDTO> ProductsToRecipes { get; set; }
        public List<PreparationDTO> Preparations { get; set; }
    }

}
