export interface AudioDevice {
    pnpId: string;
    name: string;
    volume: number;
    lastSeen: string; // Assuming the date is returned as a string from the API
    hostName: string;
    hostIp: string;
}