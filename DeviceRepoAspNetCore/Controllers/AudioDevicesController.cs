using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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
                new AudioDevice { PnpId = "PNP123", Name = "Device 1", Volume = 50 },
                new AudioDevice { PnpId = "PNP456", Name = "Device 2", Volume = 75 },
                // Add more devices as needed
            };

            return Ok(audioDevices);
        }
    }
}
