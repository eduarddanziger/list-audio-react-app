import { ApiAudioDevice } from './ApiAudioDevice';
import {DeviceFlowType} from "./DeviceFlowType";
import {DeviceMessageType} from "./DeviceMessageType";

export class AudioDevice {
    constructor(
        public pnpId: string,
        public name: string,
        public renderVolume: number,
        public captureVolume: number,
        public updateDate: string,
        public hostName: string,
        public operationSystemName: string,
        public flowType: DeviceFlowType,
        public deviceMessageType: DeviceMessageType
    ) {}

    get key(): string {
        return `${this.pnpId}/${this.hostName}`;
    }

    static fromApiData(apiDevice: ApiAudioDevice): AudioDevice {
        return new AudioDevice(
            apiDevice.pnpId,
            apiDevice.name,
            apiDevice.renderVolume,
            apiDevice.captureVolume,
            apiDevice.updateDate,
            apiDevice.hostName,
            apiDevice.operationSystemName,
            apiDevice.flowType,
            apiDevice.deviceMessageType
       );
    }
}
