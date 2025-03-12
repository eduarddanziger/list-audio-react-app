using DeviceRepoAspNetCore.Models;

public interface IAudioDeviceStorage
{
    IEnumerable<AudioDevice> GetAll();
    void Add(AudioDevice device);
    void Remove(string pnpId);
    void UpdateVolume(string pnpId, int volume);
}


