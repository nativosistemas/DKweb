namespace DKweb;

public class BackgroundServiceDK : BackgroundService
{
    public BackgroundServiceDK(ILoggerFactory loggerFactory)
    {
        Logger = loggerFactory.CreateLogger<BackgroundServiceDK>();
    }
    public ILogger Logger { get; }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Logger.LogInformation("BackgroundServiceDK is starting.");

        stoppingToken.Register(() => Logger.LogInformation("BackgroundServiceDK is stopping."));

        while (!stoppingToken.IsCancellationRequested)
        {
            Logger.LogInformation("BackgroundServiceDK is doing background work.");

            await Task.Delay(TimeSpan.FromSeconds(600), stoppingToken);
        } //este bucle deja un registro en el Visor de Eventos cada 5 segundos al establecer el nivel de “Logging” en “Information”. Ajustar a lo requerido.
        Logger.LogInformation("BackgroundServiceDK has stopped.");
    }
}
