using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace MartrysOfWar.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UploadController : ControllerBase
    {
        private readonly StorageClient _storageClient;

        public UploadController()
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("path/to/your/serviceAccountKey.json")
            });
            _storageClient = StorageClient.Create();
        }

        [HttpGet("generateUploadUrl")]
        public IActionResult GenerateUploadUrl(string fileName)
        {
            var bucketName = "your-bucket-name";
            var objectName = $"images/{fileName}";
            var urlSigner = UrlSigner.FromServiceAccountPath("path/to/your/serviceAccountKey.json");

            var url = urlSigner.Sign(
                bucketName,
                objectName,
                TimeSpan.FromHours(1),
                HttpMethod.Put);

            return Ok(new { url });
        }
    }
}
