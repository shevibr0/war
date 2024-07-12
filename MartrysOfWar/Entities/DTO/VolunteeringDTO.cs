﻿

namespace Entities.DTO
{
    public class VolunteeringDTO
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }
        public int IdVolunteering { get; set; }
    }
}
