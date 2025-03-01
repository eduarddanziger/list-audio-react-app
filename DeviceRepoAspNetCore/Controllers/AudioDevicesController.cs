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
                new() { PnpId = "USB\\VID_1234&PID_5678", Name = "Speakers (High Definition Audio)", Volume = 775 },
                new() { PnpId = "USB\\VID_8765&PID_4321", Name = "Microphone (USB Audio)", Volume = 50 },
                new() { PnpId = "USB\\VID_8666&PID_1320", Name = "Realtec", Volume = 500 },
            };

            return Ok(audioDevices);
        }
    }
}
