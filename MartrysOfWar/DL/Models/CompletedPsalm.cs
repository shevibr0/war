﻿using System;
using System.Collections.Generic;

namespace DL.Models
{
    public partial class CompletedPsalm
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public int PsalmNumber { get; set; }

      
    }
}
