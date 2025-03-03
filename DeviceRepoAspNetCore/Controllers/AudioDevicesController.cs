using Microsoft.AspNetCore.Mvc;

namespace DeviceRepoAspNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AudioDevicesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<AudioDevice>> GetAudioDevices()
        {
           var audioDevices = new List<AudioDevice>
            {
                new() 
                { 
                    PnpId = "{9FEEEF35-0C6E-4F82-9607-F8F8FE76BD11}", 
                    Name = "Speakers (High Definition Audio)", 
                    Volume = 775, 
                    LastSeen = DateTime.Parse("2021-07-01T08:00:00"), 
                    HostName = "Host1", 
                    HostIp = "192.168.1.1" 
                },
                new() 
                { 
                    PnpId = "{5DDB4DA4-52FF-4175-A061-8071ECBDB55D}", 
                    Name = "Microphone (USB Audio)", 
                    Volume = 50, 
                    LastSeen = DateTime.Parse("2023-07-01T11:20:00"),
                    HostName = "Host2", 
                    HostIp = "192.168.1.2" 
                },
                new() 
                { 
                    PnpId = "{57F86104-2BA4-4C97-ABCA-4A64B9E496ED}", 
                    Name = "Realtec", 
                    Volume = 500, 
                    LastSeen = DateTime.Parse("2022-01-21T12:20:00"),
                    HostName = "Host3", 
                    HostIp = "192.168.1.3" 
                },
            };

            return Ok(audioDevices);
        }
    }
}
