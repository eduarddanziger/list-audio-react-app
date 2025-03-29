import { ApiAudioDevice } from './ApiAudioDevice';

export class AudioDevice {
    constructor(
        public pnpId: string,
        public name: string,
        public volume: number,
        public lastSeen: string,
        public hostName: string,
    ) {}

    // Dynamic getter for 'key' (calculated on access)
    get key(): string {
        return `${this.pnpId}_${this.hostName}`; // Example: Combine with a delimiter
    }

    static fromApiData(apiDevice: ApiAudioDevice): AudioDevice {
        return new AudioDevice(
            apiDevice.pnpId,
            apiDevice.name,
            apiDevice.volume,
            apiDevice.lastSeen,
            apiDevice.hostName,
       );
    }
}
