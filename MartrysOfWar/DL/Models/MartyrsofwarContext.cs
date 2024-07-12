using Microsoft.EntityFrameworkCore;


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

        public virtual DbSet<Memory> Memories { get; set; } = null!;
        public virtual DbSet<PersonalVolunteering> PersonalVolunteerings { get; set; } = null!;
        public virtual DbSet<Picture> Pictures { get; set; } = null!;
        public virtual DbSet<Preparation> Preparations { get; set; } = null!;
        public virtual DbSet<ProductsToRecipe> ProductsToRecipes { get; set; } = null!;
        public virtual DbSet<Recipy> Recipies { get; set; } = null!;
        public virtual DbSet<Soldier> Soldiers { get; set; } = null!;
        public virtual DbSet<Tehilim> Tehilims { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Volunteering> Volunteerings { get; set; } = null!;
        public virtual DbSet<VolunteeringOption> VolunteeringOptions { get; set; } = null!;
        public virtual DbSet<Book> Books { get; set; } = null!;
        public virtual DbSet<CompletedPsalm> CompletedPsalms { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("Server=bjiugliblumswycwszk5-mysql.services.clever-cloud.com;Port=3306;Database=bjiugliblumswycwszk5;User=udihxxehk0n2vkjd;Password=jakh9pASvY2GFkbdu6DW;",
                    new MySqlServerVersion(new Version(8, 0, 21)));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Memory>(entity =>
            {
                entity.ToTable("MEMORIES");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("DATE");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.Property(e => e.Remember).HasColumnName("REMEMBER");

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
                entity.ToTable("PERSONAL_VOLUNTEERING");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description).HasColumnName("DESCRIPTION");

                entity.Property(e => e.IdVolunteering).HasColumnName("ID_VOLUNTEERING");

                entity.HasOne(d => d.IdVolunteeringNavigation)
                    .WithMany(p => p.PersonalVolunteerings)
                    .HasForeignKey(d => d.IdVolunteering)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_personal_volunteering_id_volunteering");
            });

            modelBuilder.Entity<Picture>(entity =>
            {
                entity.ToTable("PICTURES");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("DATE");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.Property(e => e.PersonalWords).HasColumnName("PERSONAL_WORDS");

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
                    .WithMany(p => p.Preparations)
                    .HasForeignKey(d => d.IdRec)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PREPARATI__ID_RE__75A278F5");
            });

            modelBuilder.Entity<ProductsToRecipe>(entity =>
            {
                entity.ToTable("PRODUCTS_TO_RECIPE");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description).HasColumnName("DESCRIPTION");

                entity.Property(e => e.IdRec).HasColumnName("ID_REC");

                entity.Property(e => e.Order).HasColumnName("ORDER");

                entity.HasOne(d => d.IdRecNavigation)
                    .WithMany(p => p.ProductsToRecipes)
                    .HasForeignKey(d => d.IdRec)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRODUCTS__ID_REC__76969D2E");
            });

            modelBuilder.Entity<Recipy>(entity =>
            {
                entity.ToTable("RECIPIES");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("DATE");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("NAME");

                entity.Property(e => e.PersonalWords).HasColumnName("PERSONAL_WORDS");

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

            modelBuilder.Entity<Soldier>(entity =>
            {
                entity.ToTable("SOLDIERS");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.AtNova).HasColumnName("at_nova");

                entity.Property(e => e.BurialPlace).HasColumnName("burial_place");

                entity.Property(e => e.City)
                    .HasMaxLength(20)
                    .HasColumnName("city");

                entity.Property(e => e.Classification).HasColumnName("classification");

                entity.Property(e => e.DateOfDeath)
                    .HasColumnType("date")
                    .HasColumnName("date_of_death");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(30)
                    .HasColumnName("first_name");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .HasColumnName("gender");

                entity.Property(e => e.HebrewDate).HasColumnName("hebrew_date");

                entity.Property(e => e.Image).HasColumnName("image");

                entity.Property(e => e.IsApproved).HasColumnName("is_approved");

                entity.Property(e => e.IsChild).HasColumnName("is_child");

                entity.Property(e => e.IsEmergencySquad).HasColumnName("is_emergency_squad");

                entity.Property(e => e.LastName)
                    .HasMaxLength(30)
                    .HasColumnName("last_name");

                entity.Property(e => e.LongDescription).HasColumnName("long_description");

                entity.Property(e => e.PlaceOfDeath).HasColumnName("place_of_death");

                entity.Property(e => e.PlaceOfService).HasColumnName("place_of_service");

                entity.Property(e => e.RankName).HasColumnName("rank_name");

                entity.Property(e => e.RankOrganization).HasColumnName("rank_organization");

                entity.Property(e => e.Role)
                    .HasMaxLength(50)
                    .HasColumnName("role");

                entity.Property(e => e.ShortDescription).HasColumnName("short_description");

                entity.Property(e => e.UrlToArticle).HasColumnName("url_to_article");
            });

            modelBuilder.Entity<Tehilim>(entity =>
            {
                entity.ToTable("TEHILIM");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Count).HasColumnName("COUNT");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("DATE");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.HasOne(d => d.IdSoldierNavigation)
                    .WithMany(p => p.Tehilims)
                    .HasForeignKey(d => d.IdSoldier)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TEHILIM__ID_SOLD__7A672E12");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Tehilims)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TEHILIM__ID_USER__797309D9");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("USERS");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Email)
                    .HasMaxLength(30)
                    .HasColumnName("EMAIL");

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .HasColumnName("NAME");

                entity.Property(e => e.Password)
                    .HasMaxLength(6)
                    .HasColumnName("PASSWORD");

                entity.Property(e => e.Phone).HasColumnName("PHONE");
            });

            modelBuilder.Entity<Volunteering>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("VOLUNTEERING");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("DATE");

                entity.Property(e => e.Description).HasColumnName("DESCRIPTION");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");

                entity.Property(e => e.IdUser).HasColumnName("ID_USER");

                entity.Property(e => e.IdVolunteering).HasColumnName("ID_VOLUNTEERING");
            });

            modelBuilder.Entity<VolunteeringOption>(entity =>
            {
                entity.ToTable("VOLUNTEERING_OPTIONS");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("DATE");

                entity.Property(e => e.Description).HasColumnName("DESCRIPTION");

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

            modelBuilder.Entity<Book>(entity =>
            {
                entity.ToTable("Books");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");
                entity.Property(e => e.Count).HasColumnName("COUNT");

                entity.HasOne(d => d.IdSoldierNavigation)
                      .WithMany(p => p.Books)
                      .HasForeignKey(d => d.IdSoldier)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_Books_Soldier");
            });
            modelBuilder.Entity<CompletedPsalm>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.IdSoldier).HasColumnName("ID_SOLDIER");
                entity.Property(e => e.IdUser).HasColumnName("ID_USER");
                entity.Property(e => e.PsalmNumber).HasColumnName("PSALM_NUMBER");

                entity.HasOne(d => d.IdSoldierNavigation)
                    .WithMany(p => p.CompletedPsalms)
                    .HasForeignKey(d => d.IdSoldier)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMPLETEDPSALMS_SOLDIERS");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.CompletedPsalms)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMPLETEDPSALMS_USERS");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
