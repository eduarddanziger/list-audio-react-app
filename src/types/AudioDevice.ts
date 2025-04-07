import { ApiAudioDevice } from './ApiAudioDevice';
import {DeviceFlowType} from "./DeviceFlowType.ts";

export class AudioDevice {
    constructor(
        public pnpId: string,
        public name: string,
        public renderVolume: number,
        public captureVolume: number,
        public updateDate: string,
        public hostName: string,
        public flowType: DeviceFlowType
    ) {}

    // Dynamic getter for 'key' (calculated on access)
    get key(): string {
        return `${this.pnpId}_${this.hostName}`; // Example: Combine with a delimiter
    }

    static fromApiData(apiDevice: ApiAudioDevice): AudioDevice {
        return new AudioDevice(
            apiDevice.pnpId,
            apiDevice.name,
            apiDevice.renderVolume,
            apiDevice.captureVolume,
            apiDevice.updateDate,
            apiDevice.hostName,
            apiDevice.flowType
       );
    }
}
