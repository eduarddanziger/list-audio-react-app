import React, { useState, useEffect } from 'react';
import { AudioDevice } from '../types/AudioDevice.ts';

const AudioDeviceListComp: React.FC = () => {
    // Mock-up audio device data
/*
    const [audioDevices] = useState<AudioDevice[]>([
        { pnpId: 'USB\\VID_1234&PID_5678', name: 'Speakers (High Definition Audio)', volume: 75 },
        { pnpId: 'USB\\VID_8765&PID_4321', name: 'Microphone (USB Audio)', volume: 50 },
    ]);
*/
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);

    useEffect(() => {
        fetch('https://localhost:7236/api/AudioDevices') // Update with your API URL
            .then(response => response.json())
            .then(data => setAudioDevices(data))
            .catch(error => console.error('Error fetching audio devices:', error));
    }, []);

    // State to track the selected device
    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);

    return (
        <div>
            <h2>Audio Devices</h2>
            <ul>
                {audioDevices.map((device) => (
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