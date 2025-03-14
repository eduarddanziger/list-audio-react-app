using DeviceRepoAspNetCore.Models;
using Microsoft.AspNetCore.Mvc;

namespace DeviceRepoAspNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AudioDevicesController : ControllerBase
    {
        private readonly IAudioDeviceStorage _storage;

        public AudioDevicesController(IAudioDeviceStorage storage)
        {
            _storage = storage;
        }

        [HttpGet]
        public IEnumerable<AudioDevice> GetAll() => _storage.GetAll();

        [HttpPost]
        public IActionResult Add([FromBody] AudioDevice device)
        {
            _storage.Add(device);
            return CreatedAtAction(nameof(GetByKey), new { pnpId = device.PnpId, hostName = device.HostName }, device);
        }

        [HttpGet("{pnpId}/{hostName}")]
        public IActionResult GetByKey(string pnpId, string hostName)
        {
            var device = _storage.GetAll().FirstOrDefault(d => d.PnpId == pnpId && d.HostName == hostName);
            if (device == null)
            {
                return NotFound();
            }
            return Ok(device);
        }

        [HttpDelete("{pnpId}/{hostName}")]
        public IActionResult Remove(string pnpId, string hostName)
        {
            _storage.Remove(pnpId, hostName);
            return NoContent();
        }

        [HttpPut("{pnpId}/{hostName}/volume")]
        public IActionResult UpdateVolume(string pnpId, string hostName, [FromBody] int volume)
        {
            _storage.UpdateVolume(pnpId, hostName, volume);
            return NoContent();
        }
    }
}
