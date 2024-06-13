using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DL.Models
{
    public partial class MartyrsofwarContext : DbContext
    {
        public MartyrsofwarContext()
        {
        }

        public MartyrsofwarContext(DbContextOptions<MartyrsofwarContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Memories> Memories { get; set; }
        public virtual DbSet<PersonalVolunteering> PersonalVolunteering { get; set; }
        public virtual DbSet<Pictures> Pictures { get; set; }
        public virtual DbSet<Preparation> Preparation { get; set; }
        public virtual DbSet<ProductsToRecipe> ProductsToRecipe { get; set; }
        public virtual DbSet<Recipies> Recipies { get; set; }
        public virtual DbSet<Soldiers> Soldiers { get; set; }
        public virtual DbSet<Tehilim> Tehilim { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Volunteering> Volunteering { get; set; }
        public virtual DbSet<VolunteeringOptions> VolunteeringOptions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=PF231P12;Database=Martyrs of war;Trusted_Connection=True;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Memories>(entity =>
            {
                entity.ToTable("MEMORIES");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnName("DATE")
                    .HasColumnType("date");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.Property(e => e.Remember)
                    .IsRequired()
                    .HasColumnName("REMEMBER");

                entity.HasOne(d => d.IdSoldierNavigation)
                    .WithMany(p => p.Memories)
                    .HasForeignKey(d => d.IdSoldier)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__MEMORIES__ID_SOL__693CA210");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Memories)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MEMORIES_USERS");
            });

            modelBuilder.Entity<PersonalVolunteering>(entity =>
            {
                entity.ToTable("PERSONAL VOLUNTEERING");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("DESCRIPTION");

                entity.Property(e => e.IdVolunteering).HasColumnName("ID_VOLUNTEERING");

                entity.HasOne(d => d.IdVolunteeringNavigation)
                    .WithMany(p => p.PersonalVolunteering)
                    .HasForeignKey(d => d.IdVolunteering)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_personal_volunteering_id_volunteering");
            });

            modelBuilder.Entity<Pictures>(entity =>
            {
                entity.ToTable("PICTURES");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnName("DATE")
                    .HasColumnType("date");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.Property(e => e.Url).HasColumnName("URL");

                entity.HasOne(d => d.IdSoldierNavigation)
                    .WithMany(p => p.Pictures)
                    .HasForeignKey(d => d.IdSoldier)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PICTURES__ID_SOL__6B24EA82");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Pictures)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PICTURES__ID_USE__6A30C649");
            });

            modelBuilder.Entity<Preparation>(entity =>
            {
                entity.ToTable("PREPARATION");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description).HasColumnName("DESCRIPTION");

                entity.Property(e => e.IdRec).HasColumnName("ID_REC");

                entity.Property(e => e.Order).HasColumnName("ORDER");

                entity.HasOne(d => d.IdRecNavigation)
                    .WithMany(p => p.Preparation)
                    .HasForeignKey(d => d.IdRec)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PREPARATI__ID_RE__75A278F5");
            });

            modelBuilder.Entity<ProductsToRecipe>(entity =>
            {
                entity.ToTable("PRODUCTS TO RECIPE");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("DESCRIPTION");

                entity.Property(e => e.IdRec).HasColumnName("ID_REC");

                entity.Property(e => e.Order).HasColumnName("ORDER");

                entity.HasOne(d => d.IdRecNavigation)
                    .WithMany(p => p.ProductsToRecipe)
                    .HasForeignKey(d => d.IdRec)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRODUCTS __ID_RE__76969D2E");
            });

            modelBuilder.Entity<Recipies>(entity =>
            {
                entity.ToTable("RECIPIES");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnName("DATE")
                    .HasColumnType("date");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdSoldierNavigation)
                    .WithMany(p => p.Recipies)
                    .HasForeignKey(d => d.IdSoldier)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__RECIPIES__ID_SOL__6C190EBB");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Recipies)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__RECIPIES__ID_USE__6D0D32F4");
            });

            modelBuilder.Entity<Soldiers>(entity =>
            {
                entity.ToTable("SOLDIERS");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.AtNova).HasColumnName("at_nova");

                entity.Property(e => e.BurialPlace).HasColumnName("burial_place");

                entity.Property(e => e.City)
                    .HasColumnName("city")
                    .HasMaxLength(20);

                entity.Property(e => e.Classification).HasColumnName("classification");

                entity.Property(e => e.DateOfDeath)
                    .HasColumnName("date_of_death")
                    .HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .HasColumnName("first_name")
                    .HasMaxLength(30);

                entity.Property(e => e.Gender)
                    .HasColumnName("gender")
                    .HasMaxLength(10);

                entity.Property(e => e.HebrewDate).HasColumnName("hebrew_date");

                entity.Property(e => e.Image).HasColumnName("image");

                entity.Property(e => e.IsApproved).HasColumnName("is_approved");

                entity.Property(e => e.IsChild).HasColumnName("is_child");

                entity.Property(e => e.IsEmergencySquad).HasColumnName("is_emergency_squad");

                entity.Property(e => e.LastName)
                    .HasColumnName("last_name")
                    .HasMaxLength(30);

                entity.Property(e => e.LongDescription).HasColumnName("long_description");

                entity.Property(e => e.PlaceOfDeath).HasColumnName("place_of_death");

                entity.Property(e => e.PlaceOfService).HasColumnName("place_of_service");

                entity.Property(e => e.RankName).HasColumnName("rank_name");

                entity.Property(e => e.RankOrganization).HasColumnName("rank_organization");

                entity.Property(e => e.Role)
                    .HasColumnName("role")
                    .HasMaxLength(50);

                entity.Property(e => e.ShortDescription).HasColumnName("short_description");

                entity.Property(e => e.UrlToArticle).HasColumnName("url_to_article");
            });

            modelBuilder.Entity<Tehilim>(entity =>
            {
                entity.ToTable("TEHILIM");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Count).HasColumnName("COUNT");

                entity.Property(e => e.Date)
                    .HasColumnName("DATE")
                    .HasColumnType("date");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.HasOne(d => d.IdSoldierNavigation)
                    .WithMany(p => p.Tehilim)
                    .HasForeignKey(d => d.IdSoldier)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TEHILIM__ID_SOLD__7A672E12");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Tehilim)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TEHILIM__ID_USER__797309D9");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("USERS");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasMaxLength(30);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasMaxLength(20);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("PASSWORD")
                    .HasMaxLength(6);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("PHONE");
            });

            modelBuilder.Entity<Volunteering>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("VOLUNTEERING");

                entity.Property(e => e.Date)
                    .HasColumnName("DATE")
                    .HasColumnType("date");

                entity.Property(e => e.Description).HasColumnName("DESCRIPTION");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.Property(e => e.IdVolunteering).HasColumnName("ID_VOLUNTEERING");
            });

            modelBuilder.Entity<VolunteeringOptions>(entity =>
            {
                entity.ToTable("VOLUNTEERING OPTIONS");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnName("DATE")
                    .HasColumnType("date");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("DESCRIPTION");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.HasOne(d => d.IdSoldierNavigation)
                    .WithMany(p => p.VolunteeringOptions)
                    .HasForeignKey(d => d.IdSoldier)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__VOLUNTEER__ID_SO__778AC167");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.VolunteeringOptions)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__VOLUNTEER__ID_US__787EE5A0");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
