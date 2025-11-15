import {DeviceFlowType} from "./DeviceFlowType";
import {DeviceMessageType} from "./DeviceMessageType";

export interface ApiAudioDevice {
    pnpId: string;
    name: string;
    renderVolume: number;
    captureVolume: number;
    updateDate: string;
    hostName: string;
    operationSystemName: string;
    flowType: DeviceFlowType;
    deviceMessageType: DeviceMessageType;
}