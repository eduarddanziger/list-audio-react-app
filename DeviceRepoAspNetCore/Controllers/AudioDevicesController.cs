using DeviceRepoAspNetCore.Models;
using Microsoft.AspNetCore.Mvc;

namespace DeviceRepoAspNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AudioDevicesController(IAudioDeviceStorage storage) : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<AudioDevice>> GetAudioDevices()
        {
            var audioDevices = storage.GetAll();
            return Ok(audioDevices);
        }

        [HttpPost]
        public IActionResult AddAudioDevice([FromBody] AudioDevice device)
        {
            storage.Add(device);
            return CreatedAtAction(nameof(GetAudioDevices), new { pnpId = device.PnpId }, device);
        }

        [HttpDelete("{pnpId}")]
        public IActionResult RemoveAudioDevice(string pnpId)
        {
            storage.Remove(pnpId);
            return NoContent();
        }

        [HttpPut("{pnpId}/volume")]
        public IActionResult UpdateVolume(string pnpId, [FromBody] int volume)
        {
            storage.UpdateVolume(pnpId, volume);
            return NoContent();
        }
    }
}
