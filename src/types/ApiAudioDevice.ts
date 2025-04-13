import {DeviceFlowType} from "./DeviceFlowType.ts";
import {DeviceMessageType} from "./DeviceMessageType.ts";

export interface ApiAudioDevice {
    pnpId: string;
    name: string;
    renderVolume: number;
    captureVolume: number;
    updateDate: string;
    hostName: string;
    flowType: DeviceFlowType;
    deviceMessageType: DeviceMessageType;
}