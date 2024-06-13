using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DL.Models
{
    public partial class Recipy
    {
            public Recipy()
            {
                ProductsToRecipes = new HashSet<ProductsToRecipe>();
                Preparations = new HashSet<Preparation>();
            }

            public int Id { get; set; }
            public int IdSoldier { get; set; }
            public int IdUser { get; set; }
            public DateTime Date { get; set; }
        public string Name { get; set; }
        public virtual Soldier IdSoldierNavigation { get; set; }
            public virtual User IdUserNavigation { get; set; }
            public virtual ICollection<ProductsToRecipe> ProductsToRecipes { get; set; }
        [NotMapped]
        public virtual ICollection<Preparation> Preparations { get; set; }
        }
    }
