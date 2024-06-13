using System;
using System.Collections.Generic;

namespace DL.Models
{
    public partial class Recipy
    {
        public Recipy()
        {
            Preparations = new HashSet<Preparation>();
            ProductsToRecipes = new HashSet<ProductsToRecipe>();
        }

        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; } = null!;
        public string? PersonalWords { get; set; }

        public virtual Soldier IdSoldierNavigation { get; set; } = null!;
        public virtual User IdUserNavigation { get; set; } = null!;
        public virtual ICollection<Preparation> Preparations { get; set; }
        public virtual ICollection<ProductsToRecipe> ProductsToRecipes { get; set; }
    }
}
