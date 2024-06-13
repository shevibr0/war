using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting; // For BackgroundService
using Microsoft.Extensions.Logging;  // For ILogger
using System.Threading;             // For CancellationToken
using System.Threading.Tasks;
using BL.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BL
{
        public class MyBackgroundService : BackgroundService, IMyBackgroundService
        {
            private readonly ILogger<MyBackgroundService> _logger;
        private readonly IServiceScopeFactory _scopeFactory;

        public MyBackgroundService(ILogger<MyBackgroundService> logger, IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _scopeFactory = scopeFactory;
        }


        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var apiService = scope.ServiceProvider.GetRequiredService<IApiServiceBL>();
                    _logger.LogInformation("Running my background task");
                    await apiService.FetchDataFromApiAsync();
                }
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }

        }

    //private async Task RunMyPeriodicFunction()
    //{
    //    // Your logic here
    //    _logger.LogInformation("Executing periodic task");
    //}
}

}
