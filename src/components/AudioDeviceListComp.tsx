import React, { useState } from 'react';
import { AudioDeviceType } from '../types/AudioDeviceType.ts';

const AudioDeviceListComp: React.FC = () => {
    // Mock-up audio device data
    // @ts-expect-error - This is a mock-up data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [devices, setDevices] = useState<AudioDeviceType[]>([
        { pnpId: 'USB\\VID_1234&PID_5678', name: 'Speakers (High Definition Audio)', volume: 75 },
        { pnpId: 'USB\\VID_8765&PID_4321', name: 'Microphone (USB Audio)', volume: 50 },
    ]);

    // State to track the selected device
    const [selectedDevice, setSelectedDevice] = useState<AudioDeviceType | null>(null);

    return (
        <div>
            <h2>Audio Devices</h2>
            <ul>
                {devices.map((device) => (
                    <li key={device.pnpId}>
                        <button onClick={() => setSelectedDevice(device)}>
                            {device.name}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedDevice && (
                <div>
                    <h3>Selected Device: {selectedDevice.name}</h3>
                    <p><strong>PnP ID:</strong> {selectedDevice.pnpId}</p>
                    <p><strong>Volume:</strong> {selectedDevice.volume}%</p>
                </div>
            )}
        </div>
    );
};

export default AudioDeviceListComp;