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
                new() { PnpId = "PNP123", Name = "Device 1", Volume = 50 },
                new() { PnpId = "PNP456", Name = "Device 2", Volume = 75 },
            };

            return Ok(audioDevices);
        }
    }
}
