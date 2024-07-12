

namespace Entities.DTO
{
    public class CompleteRecipeDTO
    {
        public RecipyDTO Recipy { get; set; }
        public List<ProductsToRecipeDTO> ProductsToRecipes { get; set; }
        public List<PreparationDTO> Preparations { get; set; }
    }

}
