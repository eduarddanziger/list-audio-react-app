using DeviceRepoAspNetCore.Models;

namespace DeviceRepoAspNetCore.Services;

internal class InMemoryAudioDeviceStorage : IAudioDeviceStorage
{
    private readonly List<AudioDevice> _audioDevices =
    [
        new()
        {
            PnpId = "{9FEEEF35-0C6E-4F82-9607-F8F8FE76BD11}",
            Name = "Speakers (High Definition Audio)",
            Volume = 775,
            LastSeen = DateTime.Parse("2021-07-01T08:00:00"),
            HostName = "Host1"
        },

        new()
        {
            PnpId = "{5DDB4DA4-52FF-4175-A061-8071ECBDB55D}",
            Name = "Microphone (USB Audio)",
            Volume = 50,
            LastSeen = DateTime.Parse("2023-07-01T11:20:00"),
            HostName = "Host2"
        },

        new()
        {
            PnpId = "{57F86104-2BA4-4C97-ABCA-4A64B9E496ED}",
            Name = "Realtec",
            Volume = 500,
            LastSeen = DateTime.Parse("2022-01-21T12:20:00"),
            HostName = "Host3"
        }

    ];

    public IEnumerable<AudioDevice> GetAll() => _audioDevices;

    public void Add(AudioDevice device) => _audioDevices.Add(device);

    public void Remove(string pnpId)
    {
        var device = _audioDevices.FirstOrDefault(d => d.PnpId == pnpId);
        if (device != null)
        {
            _audioDevices.Remove(device);
        }
    }

    public void UpdateVolume(string pnpId, int volume)
    {
        var device = _audioDevices.FirstOrDefault(d => d.PnpId == pnpId);
        if (device != null)
        {
            device.Volume = volume;
        }
    }
}
