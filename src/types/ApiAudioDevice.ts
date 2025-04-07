import {DeviceFlowType} from "./DeviceFlowType.ts";

export interface ApiAudioDevice {
    pnpId: string;
    name: string;
    renderVolume: number;
    captureVolume: number;
    updateDate: string;
    hostName: string;
    flowType: DeviceFlowType;
}