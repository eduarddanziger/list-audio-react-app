namespace DeviceRepoAspNetCore;

public class AudioDevice
{
    public required string PnpId { get; set; }
    public required string Name { get; set; }
    public int Volume { get; set; }
}