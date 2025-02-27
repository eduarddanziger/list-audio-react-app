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
                    PnpId = "USB\\VID_1234&PID_5678", 
                    Name = "Speakers (High Definition Audio)", 
                    Volume = 775, 
                    LastSeen = DateTime.Parse("2021-07-01T08:00:00"), 
                    HostName = "Host1", 
                    HostIp = "192.168.1.1" 
                },
                new() 
                { 
                    PnpId = "USB\\VID_8765&PID_4321", 
                    Name = "Microphone (USB Audio)", 
                    Volume = 50, 
                    LastSeen = DateTime.Parse("2023-07-01T11:20:00"),
                    HostName = "Host2", 
                    HostIp = "192.168.1.2" 
                },
                new() 
                { 
                    PnpId = "USB\\VID_8666&PID_1320", 
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
