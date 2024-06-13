using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DL.Models
{
    public partial class Recipies
    {
        public Recipies()
        {
            Preparation = new HashSet<Preparation>();
            ProductsToRecipe = new HashSet<ProductsToRecipe>();
        }

        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }

        public virtual Soldiers IdSoldierNavigation { get; set; }
        public virtual Users IdUserNavigation { get; set; }
        public virtual ICollection<Preparation> Preparation { get; set; }
        public virtual ICollection<ProductsToRecipe> ProductsToRecipe { get; set; }
    }
}
