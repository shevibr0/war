using System;
using System.Collections.Generic;

namespace DL.Models
{
    public partial class ProductsToRecipe
    {
        public int Id { get; set; }
        public int IdRec { get; set; }
        public string Description { get; set; } = null!;
        public int Order { get; set; }

        public virtual Recipy IdRecNavigation { get; set; } = null!;
    }
}
